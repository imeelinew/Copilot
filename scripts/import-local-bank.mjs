import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildQuestionBank, buildRepositoryBanks } from '../src/question-bank.ts'

export function importLocalBank(contentDir, backup, sourceId, targetId) {
  const users = JSON.parse(readFileSync(join(contentDir, 'users.json'), 'utf8'))
  const documents = readdirSync(contentDir, { recursive: true }).filter((name) => name.endsWith('.md'))
    .map((name) => ({ name: name.replaceAll('\\', '/'), raw: readFileSync(join(contentDir, name), 'utf8') }))
  const target = buildRepositoryBanks(users, documents).find((user) => user.id === targetId)
  if (!target) throw new Error('目标用户不存在，请先在 content/users.json 中添加用户')
  const source = backup?.users?.find((user) => user.id === sourceId)
  if (!source || !Array.isArray(source.documents) || source.documents.some((doc) =>
    !doc || typeof doc.name !== 'string' || typeof doc.raw !== 'string')) throw new Error('备份中找不到有效的源用户题库')
  buildQuestionBank([], source.documents)
  buildQuestionBank(target.questions, source.documents)
  const directory = join(contentDir, targetId, 'imported')
  const files = source.documents.map((doc) => ({
    path: join(directory, `${createHash('sha256').update(importedId(doc)).digest('hex')}.md`),
    raw: doc.raw,
  }))
  function importedId(doc) { return buildQuestionBank([], [doc])[0].id }
  if (files.some((file) => existsSync(file.path))) throw new Error('目标文件已存在，未覆盖任何文件')
  if (files.length) mkdirSync(directory, { recursive: true })
  for (const file of files) writeFileSync(file.path, file.raw, { flag: 'wx' })
  return files.length
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [backupPath, sourceId, targetId] = process.argv.slice(2)
    if (!backupPath) throw new Error('用法：node scripts/import-local-bank.mjs <备份.json> [源用户ID 目标仓库用户ID]')
    const backup = JSON.parse(readFileSync(resolve(backupPath), 'utf8'))
    if (!sourceId || !targetId) {
      if (!Array.isArray(backup?.users)) throw new Error('不是有效的本地用户备份')
      console.table(backup.users.map((user) => ({ id: user.id, name: user.name, questions: user.documents?.length ?? 0 })))
      console.log('请从上表选择源用户 ID，再指定 content/users.json 中的目标用户 ID。')
    } else {
      const count = importLocalBank(fileURLToPath(new URL('../content/', import.meta.url)), backup, sourceId, targetId)
      console.log(`已迁移 ${count} 道题到 content/${targetId}/imported/。请检查文件、运行测试，再提交和部署。`)
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
