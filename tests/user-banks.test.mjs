import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildQuestionBank, buildRepositoryBanks, getCategories, searchQuestions } from '../src/question-bank.ts'
import { loadProfiles, PROFILE_STORAGE_KEY, LEGACY_STORAGE_KEY } from '../src/profiles.ts'
import { importLocalBank } from '../scripts/import-local-bank.mjs'

const document = (id, title = id, category = 'react') => ({ name: `${id}.md`, raw: `---\nid: ${id}\ntitle: ${title}\ncategory: ${category}\n---\n\n## 核心回答\n\n${title} 的答案。` })
const storage = (values = {}) => ({ getItem: (key) => values[key] ?? null })
const users = [{ id: 'default', name: '牛' }, { id: 'aaron', name: 'Aaron' }]
const ids = users.map((user) => user.id)
const docs = [
  { ...document('same', '原用户问题', 'javascript'), name: 'default/same.md' },
  { ...document('same', '独有测试题'), name: 'aaron/react/same.md' },
]

test('repository content has 137 original questions and a separate Aaron bank', () => {
  const root = new URL('../content/', import.meta.url)
  const registry = JSON.parse(readFileSync(new URL('users.json', root), 'utf8'))
  const documents = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.md'))
    .map((name) => ({ name, raw: readFileSync(new URL(name, root), 'utf8') }))
  const banks = buildRepositoryBanks(registry, documents)
  assert.equal(banks.find((user) => user.id === 'default').questions.length, 137)
  assert.ok(banks.some((user) => user.id === 'aaron'))
})

test('two clean browser stores resolve identical users and banks without importing', () => {
  const first = loadProfiles(storage(), ids)
  const second = loadProfiles(storage(), ids)
  assert.deepEqual(first, second)
  const banks = buildRepositoryBanks(users, docs)
  assert.equal(banks[0].questions.length, 1)
  assert.equal(banks[1].questions.length, 1)
  assert.equal(searchQuestions(banks[1].questions, '独有测试题')[0].question.title, '独有测试题')
  assert.equal(banks[0].questions.some((q) => q.title === '独有测试题'), false)
  assert.deepEqual(getCategories(banks[1].questions).map((item) => item.id), ['all', 'react'])
  assert.deepEqual(buildRepositoryBanks(users, []).map((user) => user.questions), [[], []])
})

test('repository user search matches an answered follow-up heading', () => {
  const followup = {
    ...document('request-failure', '请求策略'),
    name: 'aaron/react/request-failure.md',
  }
  followup.raw += '\n\n## 追问：请求失败怎么办？\n\n取消旧请求并展示可重试的错误状态。'
  const banks = buildRepositoryBanks(users, [followup])
  const results = searchQuestions(banks[1].questions, '请求失败怎么办')
  assert.equal(results[0].question.id, 'request-failure')
})

test('registry rejects unknown folders, duplicate users and duplicate IDs within one bank', () => {
  assert.throws(() => buildRepositoryBanks(users, [{ ...docs[0], name: 'unknown/q.md' }]), /已配置/)
  assert.throws(() => buildRepositoryBanks(users, [{ ...docs[0], name: 'default/../aaron/q.md' }]))
  assert.throws(() => buildRepositoryBanks([...users, users[0]], []), /唯一/)
  assert.throws(() => buildRepositoryBanks([{ id: '../escape', name: 'bad' }], []))
  assert.throws(() => buildRepositoryBanks(users, [docs[0], { ...docs[0], name: 'default/another.md' }]), /已存在/)
})

test('legacy preferences migrate without importing local users or overwriting repository data', () => {
  const legacy = JSON.stringify({ activeUserId: 'old-local-user', users: [
    { id: 'default', name: '旧名称', favorites: ['same'], documents: [document('local-only')] },
    { id: 'old-local-user', name: '本地用户', favorites: ['same'], documents: [] },
  ] })
  const values = { [LEGACY_STORAGE_KEY]: legacy }
  const restored = loadProfiles(storage(values), ids)
  assert.equal(restored.activeUserId, 'default')
  assert.deepEqual(restored.favorites.default, ['same'])
  assert.equal(restored.favorites.aaron, undefined)
  assert.equal(values[LEGACY_STORAGE_KEY], legacy)
  assert.equal(buildRepositoryBanks(users, docs)[0].name, '牛')
  assert.deepEqual(loadProfiles(storage({ 'interview-favorites': '["old-question"]' }), ids).favorites.default, ['old-question'])
})

test('current user and separate favorites survive reload; unavailable storage does not block banks', () => {
  const preferences = { activeUserId: 'aaron', favorites: { default: [], aaron: ['same'] } }
  assert.deepEqual(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: JSON.stringify(preferences) }), ids), preferences)
  for (const bad of ['{broken', 'null', '{"favorites":[]}']) {
    assert.equal(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: bad }), ids).activeUserId, 'default')
  }
  assert.equal(loadProfiles({ getItem() { throw new Error('blocked') } }, ids).activeUserId, 'default')
  assert.equal(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: '{"activeUserId":"removed","favorites":{}}' }), ids).activeUserId, 'default')
})

test('invalid Markdown is rejected and Windows line endings are supported', () => {
  assert.throws(() => buildQuestionBank([], [{ name: 'invalid.md', raw: '# missing metadata' }]), /需要/)
  const crlf = document('windows')
  crlf.raw = '\uFEFF' + crlf.raw.replaceAll('\n', '\r\n')
  assert.equal(buildQuestionBank([], [crlf])[0].id, 'windows')
})

test('migration writes original Markdown to the chosen bank and refuses repeat imports', () => {
  const directory = mkdtempSync(join(tmpdir(), 'copilot-migration-'))
  try {
    writeFileSync(join(directory, 'users.json'), JSON.stringify(users))
    const backup = { users: [{ id: 'legacy-id', documents: [document('first'), document('second')] }] }
    assert.equal(importLocalBank(directory, backup, 'legacy-id', 'aaron'), 2)
    const files = readdirSync(join(directory, 'aaron/imported'))
    assert.equal(files.length, 2)
    const contents = files.map((file) => readFileSync(join(directory, 'aaron/imported', file), 'utf8')).sort()
    assert.deepEqual(contents, backup.users[0].documents.map((doc) => doc.raw).sort())
    assert.throws(() => importLocalBank(directory, backup, 'legacy-id', 'aaron'), /已存在/)
    assert.throws(() => importLocalBank(directory, backup, 'legacy-id', '../outside'), /不存在/)
    assert.deepEqual(files, readdirSync(join(directory, 'aaron/imported')))
  } finally { rmSync(directory, { recursive: true, force: true }) }
})
