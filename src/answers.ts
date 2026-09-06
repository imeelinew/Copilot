import type { InterviewQuestion } from './types'

const knownSections = new Set(['核心回答', '展开回答', '30 秒回答', '标准回答', '深入回答', '回答要点', '面试官可能追问', '代码证据'])

export function parseAnswerSections(body: string) {
  const sections: Record<string, string> = {}
  const headings = [...body.matchAll(/^## (.+)$/gm)]
  headings.forEach((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length
    const end = headings[index + 1]?.index ?? body.length
    sections[heading[1].trim()] = body.slice(start, end).trim()
  })
  if (!headings.length) sections['正文'] = body.replace(/^# .*\n+/, '').trim()
  return sections
}

export function getAnswerContent(question: InterviewQuestion) {
  const sections = question.sections
  const followups = Object.entries(sections)
    .filter(([name, answer]) => name.startsWith('追问：') && answer.trim())
    .map(([name, answer]) => ({ title: name.slice(3).trim(), answer }))
  const legacyExtra = sections['展开回答'] || sections['深入回答']
  if (legacyExtra) followups.push({ title: '补充说明', answer: legacyExtra })

  return {
    core: sections['核心回答'] || sections['标准回答'] || sections['30 秒回答'] || '',
    followups,
    otherSections: Object.entries(sections).filter(([name]) => !knownSections.has(name) && !name.startsWith('追问：')),
    points: sections['回答要点'],
    prompts: sections['面试官可能追问'],
    evidence: sections['代码证据'],
  }
}

export function filterFollowups<T extends { title: string; answer: string }>(items: T[], query: string) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return items.filter((item) => terms.every((term) => `${item.title} ${item.answer}`.toLocaleLowerCase().includes(term)))
}
