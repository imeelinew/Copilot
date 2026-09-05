import { useEffect, useMemo, useRef, useState } from 'react'
import { categories, questions, searchQuestions } from './content'
import type { AnswerLength, InterviewQuestion } from './types'

const sectionForLength: Record<AnswerLength, string> = {
  short: '30 秒回答',
  standard: '标准回答',
  deep: '深入回答',
}

const knownSectionNames = new Set(['30 秒回答', '标准回答', '深入回答', '回答要点', '面试官可能追问', '代码证据'])

function renderText(text = '') {
  return text.split('\n').map((line, index) => {
    const heading = line.match(/^#{1,6} (.+)$/)
    const content = line
      .replace(/^([-*] |#{1,6} )/, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
    if (!content.trim()) return <br key={index} />
    if (heading) return <p key={index}><strong>{content}</strong></p>
    return line.startsWith('- ') || line.startsWith('* ') ? <li key={index}>{content}</li> : <p key={index}>{content}</p>
  })
}

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '')
  const [answerLength, setAnswerLength] = useState<AnswerLength>('standard')
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('interview-favorites') || '[]') }
    catch { return [] }
  })
  const [agentState, setAgentState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [agentAnswer, setAgentAnswer] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchQuestions(query, category), [query, category])
  const selected = questions.find((question) => question.id === selectedId) || results[0]?.question
  const hasReliableMatch = !query.trim() || (results[0]?.score ?? 0) >= 38

  useEffect(() => {
    if (results.length && !results.some(({ question }) => question.id === selectedId)) {
      setSelectedId(results[0].question.id)
    }
  }, [results, selectedId])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]
    setFavorites(next)
    localStorage.setItem('interview-favorites', JSON.stringify(next))
  }

  async function askAgent() {
    if (!query.trim()) return
    setAgentState('loading')
    setAgentAnswer('')
    try {
      const endpoint = import.meta.env.VITE_AGENT_ENDPOINT || '/api/answer'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      })
      if (!response.ok) throw new Error('Agent 服务暂未连接')
      const data = await response.json() as { answer?: string }
      setAgentAnswer(data.answer || 'Agent 没有返回有效回答。')
      setAgentState('done')
    } catch (error) {
      setAgentAnswer(error instanceof Error ? error.message : 'Agent 请求失败')
      setAgentState('error')
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">答</span>
          <div><strong>面试话术库</strong><small>Interview Copilot</small></div>
        </div>

        <nav className="category-nav" aria-label="题目分类">
          <p className="nav-label">题库</p>
          {categories.map((item) => {
            const count = item.id === 'all' ? questions.length : questions.filter((q) => q.category === item.id).length
            return (
              <button className={category === item.id ? 'active' : ''} key={item.id} onClick={() => setCategory(item.id)}>
                <span>{item.label}</span><em>{count}</em>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-note">
          <span className="status-dot" />
          <div><strong>{questions.length} 道已整理</strong><small>答案均以口语表达为主</small></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">FRONTEND INTERVIEW</span>
            <h1>你现在想复习什么？</h1>
          </div>
          <button className="avatar" title="个人题库">牛</button>
        </header>

        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setAgentState('idle') }}
            placeholder="搜索知识点、项目难点或面试官的问法…"
            autoFocus
          />
          {query && <button className="clear-search" onClick={() => setQuery('')}>×</button>}
          <kbd>⌘ K</kbd>
        </div>

        <div className="result-heading">
          <span>{query ? `找到 ${results.length} 个相关回答` : '优先复习'}</span>
          {query && <small>按匹配程度排序</small>}
        </div>

        <div className="question-list">
          {results.map(({ question, score }) => (
            <button
              key={question.id}
              className={`question-row ${selected?.id === question.id ? 'selected' : ''}`}
              onClick={() => { setSelectedId(question.id); setAgentState('idle') }}
            >
              <span className="question-priority">{question.priority === 'high' ? '重点' : question.difficulty}</span>
              <span className="question-copy"><strong>{question.title}</strong><small>{question.categoryLabel} · {question.keywords.slice(0, 3).join(' · ')}</small></span>
              {query && <span className="match-score">{Math.min(99, Math.round(score))}%</span>}
              <span className="row-arrow">›</span>
            </button>
          ))}

          {query && !hasReliableMatch && (
            <div className="fallback-card">
              <div className="agent-orb">✦</div>
              <div><strong>题库里暂时没有可靠答案</strong><p>让 Agent 只读分析简历和三个项目，生成一次性的定制回答。</p></div>
              <button onClick={askAgent} disabled={agentState === 'loading'}>{agentState === 'loading' ? '正在分析…' : '询问 Agent'}</button>
            </div>
          )}

          {agentState !== 'idle' && agentState !== 'loading' && (
            <div className={`agent-result ${agentState}`}>
              <span>AGENT 临时回答</span>
              <p>{agentAnswer}</p>
            </div>
          )}
        </div>
      </main>

      <aside className="answer-panel">
        {selected ? <AnswerPanel question={selected} answerLength={answerLength} setAnswerLength={setAnswerLength} favorite={favorites.includes(selected.id)} toggleFavorite={toggleFavorite} /> : (
          <div className="empty-answer"><span>⌕</span><p>选择一道题查看口语回答</p></div>
        )}
      </aside>
    </div>
  )
}

function AnswerPanel({ question, answerLength, setAnswerLength, favorite, toggleFavorite }: {
  question: InterviewQuestion
  answerLength: AnswerLength
  setAnswerLength: (value: AnswerLength) => void
  favorite: boolean
  toggleFavorite: (id: string) => void
}) {
  const preferredSection = sectionForLength[answerLength]
  const answer = question.sections[preferredSection]
    || question.sections['标准回答']
    || question.sections['30 秒回答']
    || ''
  // 非标准格式的题目（如整份简历）没有固定小节名，按原文小节顺序展示。
  const extraSections = answer
    ? []
    : Object.entries(question.sections).filter(([name]) => !knownSectionNames.has(name))

  return (
    <div className="answer-scroll">
      <div className="answer-header">
        <div className="answer-meta"><span>{question.categoryLabel}</span><span>{question.difficulty}</span></div>
        <button className={favorite ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(question.id)}>{favorite ? '★' : '☆'}</button>
      </div>
      <h2>{question.title}</h2>

      {answer && (
        <div className="length-switcher">
          {([['short', '30 秒'], ['standard', '标准'], ['deep', '深入']] as const).map(([value, label]) => (
            <button key={value} className={answerLength === value ? 'active' : ''} onClick={() => setAnswerLength(value)}>{label}</button>
          ))}
        </div>
      )}

      {answer && (
        <section className="answer-card spoken">
          <div className="section-title"><span className="quote-mark">“</span><strong>可以这样说</strong></div>
          <div className="answer-body">{renderText(answer)}</div>
        </section>
      )}

      {extraSections.map(([name, text]) => (
        <section key={name} className="answer-card spoken">
          <div className="section-title"><strong>{name}</strong></div>
          <div className="answer-body">{renderText(text)}</div>
        </section>
      ))}

      {question.sections['回答要点'] && (
        <section className="answer-card points"><div className="section-title"><span>✓</span><strong>回答要点</strong></div><ul>{renderText(question.sections['回答要点'])}</ul></section>
      )}
      {question.sections['面试官可能追问'] && (
        <section className="answer-card followups"><div className="section-title"><span>↳</span><strong>面试官可能追问</strong></div><ul>{renderText(question.sections['面试官可能追问'])}</ul></section>
      )}
      {question.sections['代码证据'] && (
        <section className="evidence"><span>CODE EVIDENCE</span><div>{renderText(question.sections['代码证据'])}</div></section>
      )}
    </div>
  )
}

export default App
