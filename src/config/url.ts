export let BASE_URL = 'https://getmerlin.ai'

// TODO: switch to API gateway
export let WEBAPP_URL = 'https://replace.me'

function updateUrls() {
  switch (process.env.NEXT_PUBLIC_BASE_URL) {
    case 'https://portal.esgentle.com':
      return
    case 'https://test-esgentle-145236.vercel.app':
      BASE_URL = 'https://test-esgentle-145236.vercel.app'
      WEBAPP_URL = 'https://dev-replace.me'
      return
    default:
      BASE_URL = 'http://localhost:3000'
      WEBAPP_URL = 'http://localhost'
      return
  }
}
updateUrls()
