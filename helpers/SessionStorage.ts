export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    if (sessionStorage.getItem(key)) {
      const weatherSessionData = sessionStorage.getItem(key)
      return weatherSessionData != null ? JSON.parse(weatherSessionData) : ''
    }
  }

  return undefined
}

export const setItem = (key: string, data: Record<string, unknown>): void => {
  sessionStorage.setItem(key, JSON.stringify(data))
}
