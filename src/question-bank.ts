import type { InterviewQuestion, SearchResult } from './types'
import { parseAnswerSections } from './answers.ts'

export interface RepositoryUser {
  id: string
  name: string
  questions: InterviewQuestion[]
}

export interface RepositoryUserDefinition {
  id: string
  name: string
  projects?: string[]
  identityMarkers?: string[]
}

// Ownership is explicit: copying a document must not copy another user's experience.
export function validateOwnership(user: RepositoryUserDefinition, users: RepositoryUserDefinition[], document: { name: string; raw: string }) {
  const question = parseMarkdown(document.name, document.raw)
  const projects = user.projects
  if (projects && question.projects.some((project) => !projects.includes(project))) {
    throw new Error(`${document.name}：项目不属于用户「${user.name}」`)
  }
  for (const other of users.filter((item) => item.id !== user.id)) {
    for (const marker of [...(other.projects || []), ...(other.identityMarkers || [])]) {
      if (document.raw.toLocaleLowerCase().includes(marker.toLocaleLowerCase())) {
        throw new Error(`${document.name}：混入用户「${other.name}」的内容「${marker}」`)
      }
    }
  }
}

export function buildRepositoryBanks(users: RepositoryUserDefinition[], documents: { name: string; raw: string }[]): RepositoryUser[] {
  if (!Array.isArray(users) || !users.length || users.some((user) => !user ||
    typeof user.id !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/.test(user.id) ||
    typeof user.name !== 'string' || !user.name.trim() ||
    [user.projects, user.identityMarkers].some((list) => list !== undefined &&
      (!Array.isArray(list) || list.some((item) => typeof item !== 'string' || !item.trim())))) ||
    new Set(users.map((user) => user.id)).size !== users.length) {
    throw new Error('content/users.json 需要唯一的用户 ID 和非空名称；ID 仅支持小写字母、数字、连字符和下划线；归属规则必须是非空字符串组成的数组')
  }
  const grouped = new Map(users.map((user) => [user.id, [] as typeof documents]))
  for (const document of documents) {
    const parts = document.name.split('/')
    const bank = grouped.get(parts[0])
    if (!bank || parts.length < 2 || parts.some((part) => !part || part === '.' || part === '..')) {
      throw new Error(`${document.name}：题目必须放在 content/<已配置的用户 ID>/ 目录中`)
    }
    validateOwnership(users.find((user) => user.id === parts[0])!, users, document)
    bank.push(document)
  }
  return users.map((user) => ({ ...user, questions: buildQuestionBank([], grouped.get(user.id)!) }))
}

export function buildQuestionBank(base: InterviewQuestion[], documents: { name: string; raw: string }[]) {
  const bank = new Map(base.map((question) => [question.id, question]))
  for (const document of documents) {
    const question = parseMarkdown(document.name, document.raw)
    if (bank.has(question.id)) throw new Error(`${document.name}：题目 ID「${question.id}」已存在`)
    bank.set(question.id, question)
  }
  return [...bank.values()]
}

const categoryLabels: Record<string, string> = {
  profile: '个人与求职',
  'html-css': 'HTML / CSS',
  javascript: 'JavaScript',
  vue: 'Vue',
  react: 'React',
  engineering: '网络与工程化',
  'mobile-shop': '轻购',
  datapilot: '城市视图',
  'after-sales': '智服工单',
  'ai-agent': 'AI 与 Agent',
  coding: '代码题',
  testing: '测试与质量',
  'system-design': '前端设计题',
  'shiguangji-shop': '拾光集移动商城',
  'yingke-movies': '映刻影视',
  'yunshu-smart-city': '云枢智慧城市数据平台',
}

function parseList(value = '') {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '[]') return []
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }
  return [trimmed.replace(/^['"]|['"]$/g, '')]
}

export function parseMarkdown(sourcePath: string, raw: string): InterviewQuestion {
  raw = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/)
  const frontmatter = frontmatterMatch?.[1] ?? ''
  const meta: Record<string, string> = {}

  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    meta[line.slice(0, separator).trim()] = line.slice(separator + 1).trim()
  }

  const body = raw.slice(frontmatterMatch?.[0].length ?? 0)
  const sections = parseAnswerSections(body)

  if (!meta.id?.trim() || !meta.title?.trim() || !body.trim()) {
    throw new Error(`${sourcePath}：需要 id、title 和答案正文`)
  }
  const category = meta.category || 'engineering'
  return {
    id: meta.id,
    title: meta.title,
    aliases: parseList(meta.aliases),
    category,
    categoryLabel: categoryLabels[category] || category,
    difficulty: meta.difficulty || '基础',
    priority: meta.priority || 'normal',
    projects: parseList(meta.projects),
    keywords: parseList(meta.keywords),
    sections,
    sourcePath,
  }
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s`'"，。！？、/\-_:：]/g, '')
}

function bigrams(value: string) {
  const text = normalize(value)
  if (text.length < 2) return [text]
  return Array.from({ length: text.length - 1 }, (_, index) => text.slice(index, index + 2))
}

function similarity(query: string, target: string) {
  const q = normalize(query)
  const t = normalize(target)
  if (!q || !t) return 0
  if (q === t) return 120
  if (t.includes(q)) return 90 + Math.min(q.length, 20)
  if (q.includes(t)) return 70 + Math.min(t.length, 20)
  const targetPairs = new Set(bigrams(t))
  const overlap = bigrams(q).filter((pair) => targetPairs.has(pair)).length
  return (overlap / Math.max(bigrams(q).length, targetPairs.size, 1)) * 60
}

export function searchQuestions(questions: InterviewQuestion[], query: string, category = 'all'): SearchResult[] {
  const candidates = category === 'all'
    ? questions
    : questions.filter((question) => question.category === category)

  if (!query.trim()) {
    return candidates.map((question) => ({ question, score: 1 }))
  }

  return candidates
    .map((question) => {
      const titleScore = similarity(query, question.title)
      const aliasScore = Math.max(0, ...question.aliases.map((alias) => similarity(query, alias) + 8))
      // 短关键词（如“缓存”）只能召回候选，不能单独形成高置信度命中。
      const keywordScore = Math.max(0, ...question.keywords.map((keyword) => similarity(query, keyword) * 0.45))
      const projectScore = Math.max(0, ...question.projects.map((project) => similarity(query, project) * 0.55))
      const followupScore = Math.max(0, ...Object.keys(question.sections)
        .filter((name) => name.startsWith('追问：'))
        .map((name) => similarity(query, name.slice(3)) * 0.85))
      const bodyScore = similarity(query, Object.values(question.sections).join(' ')) * 0.35
      return { question, score: Math.max(titleScore, aliasScore, keywordScore, projectScore, bodyScore, followupScore) }
    })
    .filter((result) => result.score >= 12)
    .sort((a, b) => b.score - a.score)
}

export function getCategories(questions: InterviewQuestion[]) {
  return [
    { id: 'all', label: '全部题目' },
    ...Array.from(new Set(questions.map((question) => question.category)))
      .map((id) => ({ id, label: categoryLabels[id] || id })),
  ]
}
