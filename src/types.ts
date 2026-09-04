export type AnswerLength = 'short' | 'standard' | 'deep'

export interface InterviewQuestion {
  id: string
  title: string
  aliases: string[]
  category: string
  categoryLabel: string
  difficulty: string
  priority: string
  projects: string[]
  keywords: string[]
  sections: Record<string, string>
  sourcePath: string
}

export interface SearchResult {
  question: InterviewQuestion
  score: number
}
