export const PROFILE_STORAGE_KEY = 'interview-preferences-v2'
export const LEGACY_STORAGE_KEY = 'interview-profiles-v1'

export interface ProfileStore {
  activeUserId: string
  favorites: Record<string, string[]>
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

// 这里只保存浏览偏好；用户列表与题库始终来自仓库。
export function loadProfiles(storage: Pick<Storage, 'getItem'>, userIds: string[]): ProfileStore {
  const fallback = { activeUserId: userIds[0], favorites: {} }
  try {
    const saved = storage.getItem(PROFILE_STORAGE_KEY)
    if (saved) {
      const value = JSON.parse(saved)
      if (!value || typeof value.favorites !== 'object' || !value.favorites || Array.isArray(value.favorites)) return fallback
      return {
        activeUserId: userIds.includes(value.activeUserId) ? value.activeUserId : userIds[0],
        favorites: Object.fromEntries(Object.entries(value.favorites).filter((entry) => stringArray(entry[1]))) as Record<string, string[]>,
      }
    }
    const legacy = JSON.parse(storage.getItem(LEGACY_STORAGE_KEY) || 'null')
    if (legacy && Array.isArray(legacy.users)) {
      return {
        activeUserId: userIds.includes(legacy.activeUserId) ? legacy.activeUserId : userIds[0],
        favorites: Object.fromEntries(legacy.users
          .filter((user: { id?: unknown; favorites?: unknown } | null) => user &&
            typeof user.id === 'string' && stringArray(user.favorites))
          .map((user: { id: string; favorites: string[] }) => [user.id, user.favorites])),
      }
    }
    const oldFavorites: unknown = JSON.parse(storage.getItem('interview-favorites') || '[]')
    return { ...fallback, favorites: stringArray(oldFavorites) ? { default: oldFavorites } : {} }
  } catch {
    // 损坏或被禁用的本地存储不应阻止读取已发布题库，也不删除旧数据。
    return fallback
  }
}
