export const DEFAULT_USER_ID = 'default'
export const PROFILE_STORAGE_KEY = 'interview-profiles-v1'

export interface UserProfile {
  id: string
  name: string
  favorites: string[]
  documents: { name: string; raw: string }[]
}

export interface ProfileStore {
  activeUserId: string
  users: UserProfile[]
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

export function loadProfiles(storage: Pick<Storage, 'getItem'>): ProfileStore {
  const saved = storage.getItem(PROFILE_STORAGE_KEY)
  if (saved) {
    const value = JSON.parse(saved) as ProfileStore
    if (!value || !Array.isArray(value.users) || !value.users.length ||
      !value.users.every((user) => user && typeof user.id === 'string' && user.id &&
        typeof user.name === 'string' && user.name.trim() && stringArray(user.favorites) &&
        Array.isArray(user.documents) && user.documents.every((doc) => doc &&
          typeof doc.name === 'string' && typeof doc.raw === 'string')) ||
      new Set(value.users.map((user) => user.id)).size !== value.users.length ||
      !value.users.some((user) => user.id === DEFAULT_USER_ID)) {
      throw new Error('本地用户数据格式不正确')
    }
    return { ...value, activeUserId: value.users.some((user) => user.id === value.activeUserId)
      ? value.activeUserId : DEFAULT_USER_ID }
  }
  let favorites: string[] = []
  try {
    const legacy: unknown = JSON.parse(storage.getItem('interview-favorites') || '[]')
    if (stringArray(legacy)) favorites = legacy
  } catch { /* 旧收藏损坏时仍可打开原题库。 */ }
  return { activeUserId: DEFAULT_USER_ID, users: [{ id: DEFAULT_USER_ID, name: '牛', favorites, documents: [] }] }
}

export function createProfile(users: UserProfile[], name: string): UserProfile {
  const trimmed = name.trim()
  if (!trimmed || trimmed.length > 20) throw new Error('请输入 1–20 个字符的用户名')
  if (users.some((user) => user.name.toLocaleLowerCase() === trimmed.toLocaleLowerCase())) {
    throw new Error('这个用户名已存在')
  }
  return { id: crypto.randomUUID(), name: trimmed, favorites: [], documents: [] }
}
