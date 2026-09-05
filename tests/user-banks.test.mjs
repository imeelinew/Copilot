import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readdirSync, readFileSync } from 'node:fs'
import { buildQuestionBank, getCategories, searchQuestions } from '../src/question-bank.ts'
import { createProfile, loadProfiles, PROFILE_STORAGE_KEY } from '../src/profiles.ts'

const document = (id, title = id, category = 'react') => ({ name: `${id}.md`, raw: `---\nid: ${id}\ntitle: ${title}\ncategory: ${category}\n---\n\n## 核心回答\n\n${title} 的答案。` })
const storage = (values) => ({ getItem: (key) => values[key] ?? null })

test('137 original questions remain valid and unique', () => {
  const files = readdirSync(new URL('../content/', import.meta.url), { recursive: true }).filter((name) => name.endsWith('.md'))
  const bank = buildQuestionBank([], files.map((name) => ({ name, raw: readFileSync(new URL(`../content/${name}`, import.meta.url), 'utf8') })))
  assert.equal(bank.length, 137)
  assert.equal(new Set(bank.map((question) => question.id)).size, 137)
})

test('migrates legacy favorites only into the default user', () => {
  const store = loadProfiles(storage({ 'interview-favorites': '["old-question"]' }))
  assert.deepEqual(store.users[0].favorites, ['old-question'])
  const second = createProfile(store.users, ' 第二位用户 ')
  assert.equal(second.name, '第二位用户')
  assert.deepEqual(second.favorites, [])
  assert.deepEqual(second.documents, [])
  assert.throws(() => createProfile([...store.users, second], '第二位用户'), /已存在/)
  assert.throws(() => createProfile(store.users, '   '))
})

test('switch and refresh preserve separate banks, favorites and active user', () => {
  const store = loadProfiles(storage({}))
  const second = createProfile(store.users, '测试用户')
  second.documents = [document('custom', '独有测试题')]
  second.favorites = ['custom']
  store.users.push(second)
  store.activeUserId = second.id
  const restored = loadProfiles(storage({ [PROFILE_STORAGE_KEY]: JSON.stringify(store) }))
  assert.deepEqual(restored, store)
  const originalBank = buildQuestionBank([], [document('original', '原用户问题', 'javascript')])
  const secondBank = buildQuestionBank([], restored.users[1].documents)
  assert.equal(searchQuestions(secondBank, '独有测试题')[0].question.id, 'custom')
  assert.equal(searchQuestions(originalBank, '独有测试题').some(({ question }) => question.id === 'custom'), false)
  assert.deepEqual(getCategories(secondBank).map((item) => item.id), ['all', 'react'])
  assert.deepEqual(restored.users[0].favorites, [])
  assert.deepEqual(searchQuestions([], ''), [])
})

test('import rejects duplicates and invalid Markdown without mutating existing bank', () => {
  const original = buildQuestionBank([], [document('same')])
  assert.throws(() => buildQuestionBank(original, [document('same')]), /已存在/)
  assert.throws(() => buildQuestionBank([], [document('same'), document('same')]), /已存在/)
  assert.throws(() => buildQuestionBank(original, [{ name: 'invalid.md', raw: '# missing metadata' }]), /需要/)
  assert.equal(original.length, 1)
  const crlf = document('windows')
  crlf.raw = '\uFEFF' + crlf.raw.replaceAll('\n', '\r\n')
  assert.equal(buildQuestionBank([], [crlf])[0].id, 'windows')
})

test('damaged profile store is rejected; unknown active user falls back safely', () => {
  assert.throws(() => loadProfiles(storage({ [PROFILE_STORAGE_KEY]: '{broken' })))
  assert.throws(() => loadProfiles(storage({ [PROFILE_STORAGE_KEY]: '{"users":[]}' })))
  const store = loadProfiles(storage({ 'interview-favorites': '{broken' }))
  store.activeUserId = 'missing'
  assert.equal(loadProfiles(storage({ [PROFILE_STORAGE_KEY]: JSON.stringify(store) })).activeUserId, 'default')
})
