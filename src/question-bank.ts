import type { InterviewQuestion, SearchResult } from './types'

export interface RepositoryUser {
  id: string
  name: string
  questions: InterviewQuestion[]
}

export function buildRepositoryBanks(users: { id: string; name: string }[], documents: { name: string; raw: string }[]): RepositoryUser[] {
  if (!Array.isArray(users) || !users.length || users.some((user) => !user ||
    typeof user.id !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/.test(user.id) ||
    typeof user.name !== 'string' || !user.name.trim()) ||
    new Set(users.map((user) => user.id)).size !== users.length) {
    throw new Error('content/users.json 需要唯一的用户 ID 和非空名称；ID 仅支持小写字母、数字、连字符和下划线')
  }
  const grouped = new Map(users.map((user) => [user.id, [] as typeof documents]))
  for (const document of documents) {
    const parts = document.name.split('/')
    const bank = grouped.get(parts[0])
    if (!bank || parts.length < 2 || parts.some((part) => !part || part === '.' || part === '..')) {
      throw new Error(`${document.name}：题目必须放在 content/<已配置的用户 ID>/ 目录中`)
    }
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
  return [...bank.values()].sort((a, b) => Number(b.priority === 'high') - Number(a.priority === 'high'))
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
  const sections: Record<string, string> = {}
  const headingPattern = /^## (.+)$/gm
  const headings = [...body.matchAll(headingPattern)]

  headings.forEach((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length
    const end = headings[index + 1]?.index ?? body.length
    sections[heading[1].trim()] = body.slice(start, end).trim()
  })

  // 没有 ## 小节的文件（如整篇自我介绍）把正文整体作为一个小节展示。
  if (!headings.length) sections['正文'] = body.replace(/^# .*\n+/, '').trim()

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
    return candidates.slice(0, 12).map((question) => ({ question, score: 1 }))
  }

  return candidates
    .map((question) => {
      const titleScore = similarity(query, question.title)
      const aliasScore = Math.max(0, ...question.aliases.map((alias) => similarity(query, alias) + 8))
      // 短关键词（如“缓存”）只能召回候选，不能单独形成高置信度命中。
      const keywordScore = Math.max(0, ...question.keywords.map((keyword) => similarity(query, keyword) * 0.45))
      const projectScore = Math.max(0, ...question.projects.map((project) => similarity(query, project) * 0.55))
      const bodyScore = similarity(query, Object.values(question.sections).join(' ')) * 0.35
      return { question, score: Math.max(titleScore, aliasScore, keywordScore, projectScore, bodyScore) }
    })
    .filter((result) => result.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
}

export function getCategories(questions: InterviewQuestion[]) {
  return [
    { id: 'all', label: '全部题目' },
    ...Array.from(new Set(questions.map((question) => question.category)))
      .map((id) => ({ id, label: categoryLabels[id] || id })),
  ]
}
