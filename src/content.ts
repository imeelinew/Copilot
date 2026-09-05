import users from '../content/users.json'
import { buildRepositoryBanks } from './question-bank'

const markdownModules = import.meta.glob('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const repositoryUsers = buildRepositoryBanks(users,
  Object.entries(markdownModules).map(([path, raw]) => ({ name: path.replace('../content/', ''), raw })))
