import { useEffect, useMemo, useRef, useState } from 'react'
import { categories, questions, searchQuestions } from './content'
import type { InterviewQuestion } from './types'
import { filterFollowups, getAnswerContent } from './answers'

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
        {selected ? <AnswerPanel key={selected.id} question={selected} favorite={favorites.includes(selected.id)} toggleFavorite={toggleFavorite} /> : (
          <div className="empty-answer"><span>⌕</span><p>选择一道题查看口语回答</p></div>
        )}
      </aside>
    </div>
  )
}

function AnswerPanel({ question, favorite, toggleFavorite }: {
  question: InterviewQuestion
  favorite: boolean
  toggleFavorite: (id: string) => void
}) {
  const content = getAnswerContent(question)
  const [mode, setMode] = useState<'core' | 'followups'>('core')
  const [filter, setFilter] = useState('')
  const [activeTitle, setActiveTitle] = useState(content.followups[0]?.title || '')
  const scrollRef = useRef<HTMLDivElement>(null)
  const matches = filterFollowups(content.followups, filter)
  const active = matches.find((item) => item.title === activeTitle) || matches[0]
  const hasExtras = content.followups.length > 0 || content.points || content.prompts || content.evidence

  function changeMode(next: 'core' | 'followups') {
    setMode(next)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  function openFollowup(title: string) {
    setActiveTitle(title)
    setFilter('')
    changeMode('followups')
  }

  return (
    <div className="answer-reader">
      <div className="answer-intro">
      <div className="answer-header">
        <div className="answer-meta"><span>{question.categoryLabel}</span><span>{question.difficulty}</span></div>
        <button aria-label={favorite ? '取消收藏' : '收藏题目'} className={favorite ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(question.id)}>{favorite ? '★' : '☆'}</button>
      </div>
      <h2>{question.title}</h2>
      {hasExtras && (
        <div className="answer-modes" role="group" aria-label="回答模式">
          <button aria-pressed={mode === 'core'} onClick={() => changeMode('core')}>核心回答</button>
          <button aria-pressed={mode === 'followups'} onClick={() => changeMode('followups')}>追问速查 <span>{content.followups.length || '补充'}</span></button>
        </div>
      )}
      </div>
      <div ref={scrollRef} className="answer-scroll">

      {mode === 'core' && <>
      {content.core && (
        <section className="answer-card core">
          <div className="section-title"><span className="quote-mark">“</span><strong>先这样回答</strong></div>
          <div className="answer-body">{renderText(content.core)}</div>
        </section>
      )}

      {content.otherSections.map(([name, text]) => (
        <section key={name} className="answer-card">
          <div className="section-title"><strong>{name}</strong></div>
          <div className="answer-body">{renderText(text)}</div>
        </section>
      ))}
      {content.followups.length > 0 && (
        <nav className="quick-followups" aria-label="本题追问入口">
          <div className="section-title"><strong>面试官接着问</strong><span>点问题，直接看回答</span></div>
          {content.followups.map((item) => <button key={item.title} onClick={() => openFollowup(item.title)}>{item.title}<span aria-hidden="true">↗</span></button>)}
        </nav>
      )}
      </>}

      {mode === 'followups' && <>
      {content.followups.length > 0 && <>
        <div className="followup-finder">
          <label htmlFor="followup-search">查本题追问</label>
          <div className="followup-search">
            <input id="followup-search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="输入关键词，如：并发、为什么、失败" />
            {filter && <button aria-label="清空追问搜索" onClick={() => setFilter('')}>×</button>}
          </div>
          <nav className="followup-options" aria-label="选择追问">
            {matches.map((item, index) => <button key={item.title} aria-pressed={active?.title === item.title} onClick={() => {
              setActiveTitle(item.title)
              scrollRef.current?.scrollTo({ top: 0 })
            }}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button>)}
          </nav>
        </div>
        {active ? <section key={active.title} className="answer-card followup-answer" aria-label="追问回答" tabIndex={0}>
          <div className="section-title"><strong>被问到这里，再这样说</strong></div>
          <h3>{active.title}</h3>
          <div className="answer-body">{renderText(active.answer)}</div>
        </section> : <div className="followup-empty" role="status"><p>本题没有匹配的追问，试试更短的关键词。</p><button onClick={() => setFilter('')}>查看全部追问</button></div>}
      </>}
      {content.points && (
        <details className="answer-notes"><summary>回答要点</summary><div>{renderText(content.points)}</div></details>
      )}
      {content.prompts && (
        <details className="answer-notes"><summary>其他待准备的追问</summary><div>{renderText(content.prompts)}</div></details>
      )}
      {content.evidence && <details className="answer-notes"><summary>代码参考</summary><div className="evidence">{renderText(content.evidence)}</div></details>}
      </>}
      </div>
    </div>
  )
}

export default App
