import { useEffect, useMemo, useRef, useState } from 'react'
import { repositoryUsers } from './content'
import { getCategories, searchQuestions } from './question-bank'
import type { RepositoryUser } from './question-bank'
import { LEGACY_STORAGE_KEY, loadProfiles, PROFILE_STORAGE_KEY } from './profiles'
import type { ProfileStore } from './profiles'
import type { InterviewQuestion } from './types'

// 旧格式（30 秒/标准/深入）通过 AnswerPanel 里的回退映射到新结构。
const knownSectionNames = new Set(['核心回答', '展开回答', '30 秒回答', '标准回答', '深入回答', '回答要点', '面试官可能追问', '代码证据'])

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
  const [store, setStore] = useState(() => {
    try { return loadProfiles(localStorage, repositoryUsers.map((user) => user.id)) }
    catch { return { activeUserId: repositoryUsers[0].id, favorites: {} } as ProfileStore }
  })
  const [legacyBackup] = useState(() => {
    try { return localStorage.getItem(LEGACY_STORAGE_KEY) || '' }
    catch { return '' }
  })
  const [error, setError] = useState('')
  const user = repositoryUsers.find((item) => item.id === store.activeUserId) || repositoryUsers[0]
  function save(next: ProfileStore) {
    setStore(next)
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next))
      setError('')
    } catch {
      setError('本次选择或收藏仅在当前页面有效：浏览器存储不可用。已发布题库仍可正常浏览。')
    }
  }
  function exportLegacy() {
    const url = URL.createObjectURL(new Blob([legacyBackup], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'interview-local-backup.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <>
    {error && <div className="storage-error" role="alert">{error}</div>}
    {legacyBackup && <div className="legacy-notice">
      <span>检测到旧版本地数据，尚未自动加入仓库。请导出备份后按 README 迁移题目；原数据仍保留在此浏览器。</span>
      <button onClick={exportLegacy}>导出旧数据</button>
    </div>}
    <UserWorkspace key={user.id} user={user} favorites={Array.isArray(store.favorites[user.id]) ? store.favorites[user.id] : []}
      switchUser={(id) => save({ ...store, activeUserId: id })}
      updateFavorites={(favorites) => save({ ...store, favorites: { ...store.favorites, [user.id]: favorites } })}
    />
  </>
}

function UserWorkspace({ user, favorites, switchUser, updateFavorites }: {
  user: RepositoryUser
  favorites: string[]
  switchUser: (id: string) => void
  updateFavorites: (favorites: string[]) => void
}) {
  const questions = user.questions
  const categories = useMemo(() => getCategories(questions), [questions])
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLButtonElement>(null)
  const agentRequest = useRef<AbortController | null>(null)
  useEffect(() => () => agentRequest.current?.abort(), [])
  useEffect(() => {
    if (!menuOpen) return
    menuRef.current?.querySelector<HTMLButtonElement>('.user-option')?.focus()
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); avatarRef.current?.focus() }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? '')
  const [agentState, setAgentState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [agentAnswer, setAgentAnswer] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchQuestions(questions, query, category), [questions, query, category])
  const selected = results.find(({ question }) => question.id === selectedId)?.question || results[0]?.question
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
    updateFavorites(next)
  }

  async function askAgent() {
    if (!query.trim()) return
    agentRequest.current?.abort()
    const controller = new AbortController()
    agentRequest.current = controller
    setAgentState('loading')
    setAgentAnswer('')
    try {
      const endpoint = import.meta.env.VITE_AGENT_ENDPOINT || '/api/answer'
      const response = await fetch(endpoint, {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, userId: user.id, userName: user.name }),
      })
      if (!response.ok) throw new Error('Agent 服务暂未连接')
      const data = await response.json() as { answer?: string }
      if (controller.signal.aborted) return
      setAgentAnswer(data.answer || 'Agent 没有返回有效回答。')
      setAgentState('done')
    } catch (error) {
      if (controller.signal.aborted) return
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
          <div><strong>{questions.length} 道已整理</strong><small>{user.name} 的独立题库</small></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">FRONTEND INTERVIEW</span>
            <h1>你现在想复习什么？</h1>
          </div>
          <div className="user-switcher" ref={menuRef}>
            <button ref={avatarRef} className="avatar" title={`当前用户：${user.name}，点击切换用户`}
              aria-label={`切换用户，当前：${user.name}`} aria-expanded={menuOpen} aria-controls="user-menu"
              onClick={() => setMenuOpen(!menuOpen)}>{Array.from(user.name)[0]}</button>
            {menuOpen && <div className="user-menu" id="user-menu" aria-label="用户切换">
              <p className="user-menu-title">切换用户<span>题库随网站发布 · 收藏仅限本机</span></p>
              <div className="user-options">
                {repositoryUsers.map((item) => <button className={`user-option ${item.id === user.id ? 'active' : ''}`} key={item.id}
                  aria-pressed={item.id === user.id} onClick={() => { switchUser(item.id); setMenuOpen(false) }}>
                  <span className="user-initial">{Array.from(item.name)[0]}</span>
                  <span className="user-detail"><strong>{item.name}</strong><small>{item.questions.length} 道题</small></span>
                  {item.id === user.id && <span className="user-check">✓</span>}
                </button>)}
              </div>
              <p className="repository-note">用户和题库由仓库统一维护，发布后在各浏览器中可见。</p>
            </div>}
          </div>
        </header>

        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => { agentRequest.current?.abort(); setQuery(event.target.value); setAgentState('idle') }}
            placeholder="搜索知识点、项目难点或面试官的问法…"
            autoFocus
          />
          {query && <button className="clear-search" onClick={() => { agentRequest.current?.abort(); setQuery(''); setAgentState('idle') }}>×</button>}
          <kbd>⌘ K</kbd>
        </div>

        <p className="bank-origin">已发布题库 · 各浏览器均可访问</p>
        <div className="result-heading">
          <span>{query ? `找到 ${results.length} 个相关回答` : `${user.name} 的题库 · 优先复习`}</span>
          {query && <small>按匹配程度排序</small>}
        </div>

        <div className="question-list">
          {!questions.length && <div className="empty-bank">
            <span className="empty-bank-mark">题</span>
            <h2>{user.name} 的题库，等你填满</h2>
            <p>这位用户还没有发布题目。<br />维护者添加题目并更新网站后，即可在这里复习。</p>
          </div>}
          {!!questions.length && !query && !results.length && <p className="import-message">当前分类暂无题目。</p>}
          {results.map(({ question, score }) => (
            <button
              key={question.id}
              className={`question-row ${selected?.id === question.id ? 'selected' : ''}`}
              onClick={() => { agentRequest.current?.abort(); setSelectedId(question.id); setAgentState('idle') }}
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
              <div><strong>题库里暂时没有可靠答案</strong><p>向已配置的 Agent 请求一次性回答，个性化内容取决于服务端配置。</p></div>
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
        {selected ? <AnswerPanel question={selected} favorite={favorites.includes(selected.id)} toggleFavorite={toggleFavorite} /> : (
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
  const coreAnswer = question.sections['核心回答']
    || question.sections['标准回答']
    || question.sections['30 秒回答']
    || ''
  const extraAnswer = question.sections['展开回答'] || question.sections['深入回答'] || ''
  // 非标准格式的题目（如整份简历）没有固定小节名，按原文小节顺序展示。
  const extraSections = coreAnswer || extraAnswer
    ? []
    : Object.entries(question.sections).filter(([name]) => !knownSectionNames.has(name))

  return (
    <div className="answer-scroll">
      <div className="answer-header">
        <div className="answer-meta"><span>{question.categoryLabel}</span><span>{question.difficulty}</span></div>
        <button className={favorite ? 'favorite active' : 'favorite'} aria-label={favorite ? '取消收藏' : '收藏题目'} onClick={() => toggleFavorite(question.id)}>{favorite ? '★' : '☆'}</button>
      </div>
      <h2>{question.title}</h2>

      {coreAnswer && (
        <section className="answer-card core">
          <div className="section-title"><span className="quote-mark">“</span><strong>核心回答</strong></div>
          <div className="answer-body">{renderText(coreAnswer)}</div>
        </section>
      )}

      {extraAnswer && (
        <section className="answer-card extra">
          <div className="section-title"><strong>展开回答</strong></div>
          <div className="answer-body">{renderText(extraAnswer)}</div>
        </section>
      )}

      {extraSections.map(([name, text]) => (
        <section key={name} className="answer-card">
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
