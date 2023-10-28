import { useAuthStore } from '@/stores/AuthStore'

const createRequest = (method: string) => async (url: string, body?: any) => {
  const requestOptions: RequestInit = {
    method,
    headers: authHeader(url)
  }

  if (body) {
    ;(requestOptions.headers as Record<string, string>)['Content-Type'] = 'application/json'
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(url, requestOptions)
  console.log(response)
  return handleResponse(response)
}

export const fetchWrapper = {
  get: createRequest('GET'),
  post: createRequest('POST'),
  put: createRequest('PUT'),
  delete: createRequest('DELETE')
}

const authHeader = (url: string): Record<string, string> => {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL)

  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

const handleResponse = async (response: Response) => {
  console.log(response)
  const text = await response.text()
  console.log(text)
  const data = text && JSON.parse(text)
  console.log(data)

  if (!response.ok) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status) && user) {
      logout()
    }

    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }

  return data
}
