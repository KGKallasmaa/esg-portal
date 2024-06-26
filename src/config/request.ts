import axios from 'axios'

export async function makeRequest(
  url: URL,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  shouldUseToken: boolean,
  payload?: any
) {
  const headers = {}
  if (shouldUseToken) {
    try {
      const response = await axios.get('/api/token')
      const { accessToken } = response.data
      // @ts-ignore
      headers.Authorization = `Bearer ${accessToken}`
    } catch (error) {
      console.error(error)
      window.location.href = `/api/auth/login?returnTo=${window?.location.href}`
    }
  }

  if (payload) {
    headers['Content-Type'] = 'application/json'
  }

  const config = {
    method,
    url: url.href,
    headers: headers,
    data: payload,
    timeout: 15_000,
  }

  if (!payload) {
    delete config.data
  }

  // @ts-ignore
  const { data } = await axios.request(config)
  return data
}

async function makeRequestForm(
  url: URL,
  method: string,
  shouldUseToken: boolean,
  payload?: any
) {
  method = method.toLowerCase()
  const config = {
    method,
    url: url.href,
    headers: {},
    data: payload,
    timeout: 15_000,
  }
  const headers = {}
  if (shouldUseToken) {
    try {
      const response = await axios.get('/api/token')
      const { accessToken } = response.data
      // @ts-ignore
      headers.Authorization = `Bearer ${accessToken}`
    } catch (error) {
      console.error(error)
      window.location.href = `/api/auth/login?returnTo=${window?.location.href}`
    }
  }
  if (payload) {
    headers['Content-Type'] = 'multipart/form-data'
  }

  config.headers = headers

  // @ts-ignore
  const { data } = await axios.request(config)
  return data
}
