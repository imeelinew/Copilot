import { parseMarkdown } from './question-bank'

const markdownModules = import.meta.glob('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const questions = Object.entries(markdownModules)
  .map(([path, raw]) => parseMarkdown(path, raw))
  .sort((a, b) => Number(b.priority === 'high') - Number(a.priority === 'high'))
