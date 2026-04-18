const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const TOKEN_STORAGE_KEY = 'business_for_all_token'

function normalizePath(path) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

function buildUrl(path) {
  const normalizedPath = normalizePath(path)
  return /^https?:\/\//.test(normalizedPath) ? normalizedPath : `${API_BASE_URL}${normalizedPath}`
}

export function getStoredToken() {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setStoredToken(token) {
  if (!token) {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export async function apiRequest(path, options = {}) {
  const token = getStoredToken()
  const headers = new Headers(options.headers || {})
  const isFormData = options.body instanceof FormData

  if (!isFormData && !headers.has('Content-Type') && options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const requestUrl = buildUrl(path)
  const response = await fetch(requestUrl, {
    credentials: 'include',
    ...options,
    headers,
  })

  const responseText = await response.text()
  let data = {
    success: response.ok,
    message: response.ok ? 'Request successful' : 'Request failed',
    data: {},
  }

  if (responseText) {
    try {
      data = JSON.parse(responseText)
    } catch {
      data = {
        success: false,
        message: `Invalid server response from ${requestUrl}`,
        data: {
          raw: responseText.slice(0, 200),
        },
      }
    }
  }

  if (!response.ok || data.success === false) {
    const error = new Error(data.message || 'Request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export { API_BASE_URL, TOKEN_STORAGE_KEY, buildUrl }
