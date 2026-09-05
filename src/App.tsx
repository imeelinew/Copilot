import { useEffect, useMemo, useRef, useState } from 'react'
import { questions as defaultQuestions } from './content'
import { buildQuestionBank, getCategories, searchQuestions } from './question-bank'
import { createProfile, DEFAULT_USER_ID, loadProfiles, PROFILE_STORAGE_KEY } from './profiles'
import type { ProfileStore, UserProfile } from './profiles'
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
  const [initial] = useState(() => {
    try {
      const store = loadProfiles(localStorage)
      store.users.forEach((user) => buildQuestionBank(user.id === DEFAULT_USER_ID ? defaultQuestions : [], user.documents))
      return { store, error: '' }
    } catch {
      return { store: null, error: '无法读取本地用户数据。请检查浏览器存储设置或备份数据后重试，现有数据未被覆盖。' }
    }
  })
  const [store, setStore] = useState(initial.store)
  const [error, setError] = useState(initial.error)
  if (!store) return <div className="storage-error" role="alert">{error}</div>
  const user = store.users.find((item) => item.id === store.activeUserId)!
  function save(next: ProfileStore) {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next))
      setStore(next)
      setError('')
      return true
    } catch {
      setError('保存失败：浏览器存储不可用或空间不足，本次修改未保存。')
      return false
    }
  }
  return <>
    {error && <div className="storage-error" role="alert">{error}</div>}
    <UserWorkspace key={user.id} user={user} users={store.users}
      switchUser={(id) => save({ ...store, activeUserId: id })}
      addUser={(name) => {
        const created = createProfile(store.users, name)
        return save({ users: [...store.users, created], activeUserId: created.id })
      }}
      updateUser={(update) => save({ ...store, users: store.users.map((item) => item.id === user.id ? update(item) : item) })}
    />
  </>
}

function UserWorkspace({ user, users, switchUser, addUser, updateUser }: {
  user: UserProfile
  users: UserProfile[]
  switchUser: (id: string) => boolean
  addUser: (name: string) => boolean
  updateUser: (update: (user: UserProfile) => UserProfile) => boolean
}) {
  const questions = useMemo(() => buildQuestionBank(user.id === DEFAULT_USER_ID ? defaultQuestions : [], user.documents), [user.id, user.documents])
  const categories = useMemo(() => getCategories(questions), [questions])
  const favorites = user.favorites
  const [menuOpen, setMenuOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [profileError, setProfileError] = useState('')
  const [importMessage, setImportMessage] = useState('')
  const [importing, setImporting] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLButtonElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const agentRequest = useRef<AbortController | null>(null)
  const latestUpdateUser = useRef(updateUser)
  latestUpdateUser.current = updateUser
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; agentRequest.current?.abort() }
  }, [])
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

  async function importQuestions(files: File[]) {
    if (!files.length) return
    setImporting(true)
    setImportMessage('')
    try {
      if (files.some((file) => !file.name.toLowerCase().endsWith('.md'))) throw new Error('请选择 Markdown（.md）文件')
      if (files.reduce((total, file) => total + file.size, 0) > 2 * 1024 * 1024) throw new Error('每批导入请控制在 2 MB 以内')
      const documents = await Promise.all(files.map(async (file) => ({ name: file.name, raw: await file.text() })))
      if (!mounted.current) return
      buildQuestionBank(questions, documents)
      if (latestUpdateUser.current((current) => ({ ...current, documents: [...current.documents, ...documents] }))) {
        setImportMessage(`已为 ${user.name} 导入 ${documents.length} 道题`)
      }
    } catch (error) {
      if (mounted.current) setImportMessage(error instanceof Error ? error.message : '导入失败')
    } finally {
      if (mounted.current) setImporting(false)
    }
  }

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
    updateUser((current) => ({ ...current, favorites: next }))
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
              <p className="user-menu-title">切换用户<span>题库与收藏独立保存</span></p>
              <div className="user-options">
                {users.map((item) => <button className={`user-option ${item.id === user.id ? 'active' : ''}`} key={item.id}
                  aria-pressed={item.id === user.id} onClick={() => { if (switchUser(item.id)) setMenuOpen(false) }}>
                  <span className="user-initial">{Array.from(item.name)[0]}</span>
                  <span className="user-detail"><strong>{item.name}</strong><small>{(item.id === DEFAULT_USER_ID ? defaultQuestions.length : 0) + item.documents.length} 道题</small></span>
                  {item.id === user.id && <span className="user-check">✓</span>}
                </button>)}
              </div>
              <form className="create-user" onSubmit={(event) => {
                event.preventDefault()
                try { if (addUser(newName)) setMenuOpen(false) }
                catch (error) { setProfileError(error instanceof Error ? error.message : '创建失败') }
              }}>
                <label htmlFor="new-user-name">新建用户</label>
                <div><input id="new-user-name" value={newName} maxLength={20} placeholder="输入用户名"
                  onChange={(event) => { setNewName(event.target.value); setProfileError('') }} />
                  <button type="submit" disabled={!newName.trim()}>创建</button></div>
                {profileError && <p role="alert">{profileError}</p>}
                <small>新用户从空题库开始，可导入自己的题目。</small>
              </form>
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

        <div className="result-heading">
          <span>{query ? `找到 ${results.length} 个相关回答` : `${user.name} 的题库 · 优先复习`}</span>
          <button className="import-button" disabled={importing} onClick={() => fileRef.current?.click()}>{importing ? '导入中…' : '导入题目'}</button>
          <input ref={fileRef} type="file" hidden multiple accept=".md" aria-label="导入 Markdown 题目"
            onChange={(event) => { void importQuestions(Array.from(event.target.files || [])); event.target.value = '' }} />
          {query && <small>按匹配程度排序</small>}
        </div>

        {importMessage && <p className="import-message" role="status">{importMessage}</p>}
        <div className="question-list">
          {!questions.length && <div className="empty-bank">
            <span className="empty-bank-mark">题</span>
            <h2>{user.name} 的题库，等你填满</h2>
            <p>导入自己的 Markdown 题目，即可开始检索和复习。<br />每道题需包含 id、title 和答案正文。</p>
            <button disabled={importing} onClick={() => fileRef.current?.click()}>导入 Markdown 题目</button>
            <small>仅保存在当前浏览器，请保留原始文件。</small>
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
