import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { filterFollowups, getAnswerContent, parseAnswerSections } from '../src/answers.ts'

const question = (body) => ({ sections: parseAnswerSections(body) })

test('核心、逐条追问和代码参考不混入彼此', () => {
  const content = getAnswerContent(question('# 题目\n\n## 核心回答\n简短回答\n\n## 追问：为什么？\n原因\n\n## 追问：失败呢？\n处理方法\n\n## 代码证据\nsrc/example.ts'))
  assert.equal(content.core, '简短回答')
  assert.deepEqual(content.followups, [{ title: '为什么？', answer: '原因' }, { title: '失败呢？', answer: '处理方法' }])
  assert.deepEqual(content.otherSections, [])
  assert.equal(content.evidence, 'src/example.ts')
})

test('兼容旧回答和没有小节的正文，不把问题清单当作答案', () => {
  const content = getAnswerContent(question('## 30 秒回答\n短\n## 标准回答\n标准\n## 深入回答\n补充\n## 面试官可能追问\n- 为什么？'))
  assert.equal(content.core, '标准')
  assert.deepEqual(content.followups, [{ title: '补充说明', answer: '补充' }])
  assert.equal(content.prompts, '- 为什么？')
  assert.deepEqual(getAnswerContent(question('# 自我介绍\n\n正文')).otherSections, [['正文', '正文']])
})

test('追问筛选支持标题、正文、大小写、多关键词与清空', () => {
  const items = [{ title: '请求失败怎么办？', answer: 'AbortController 取消旧请求' }, { title: '缓存呢？', answer: '保留五分钟' }]
  assert.deepEqual(filterFollowups(items, '失败'), [items[0]])
  assert.deepEqual(filterFollowups(items, ' abortcontroller  取消 '), [items[0]])
  assert.deepEqual(filterFollowups(items, '不存在'), [])
  assert.deepEqual(filterFollowups(items, ''), items)
})

const root = resolve('content')
const filesUnder = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? filesUnder(resolve(dir, entry.name)) : [resolve(dir, entry.name)])
const related = ['00-profile/self-introduction.md', '00-profile/project-ownership.md', '00-profile/open-source-blog.md', '06-ai-agent/ai-workflow.md', '06-ai-agent/ai-code-ownership.md'].map((name) => resolve(root, name))

test('全部项目题及关联题都有独立核心和已作答追问，标题不重复', () => {
  const files = [...filesUnder(resolve(root, '05-projects')), ...related]
  for (const file of files) {
    const raw = readFileSync(file, 'utf8')
    const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '')
    const headings = [...body.matchAll(/^## (.+)$/gm)].map((match) => match[1])
    assert.equal(new Set(headings).size, headings.length, `小节重复：${file}`)
    const sections = parseAnswerSections(body)
    for (const heading of headings.filter((name) => name.startsWith('追问：'))) {
      assert.ok(heading.slice(3).trim() && sections[heading].length >= 30, `追问未完整作答：${file} ${heading}`)
    }
    const content = getAnswerContent(question(body))
    assert.ok(content.core.trim(), `缺少核心：${file}`)
    assert.ok(content.followups.length >= 2, `缺少追问：${file}`)
    assert.equal(content.prompts, undefined, `存在未回答清单：${file}`)
    assert.ok(!headings.includes('展开回答') && !headings.includes('深入回答'), `仍有混合扩展：${file}`)
    for (const item of content.followups) {
      assert.ok(item.title.trim() && item.answer.length >= 30, `空标题或未作答：${file}`)
    }
    if (file.includes('/05-projects/')) assert.ok(content.core.length <= 400, `核心过长：${file}`)
  }
})
