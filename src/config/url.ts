export let BASE_URL = 'https://getmerlin.ai'

// TODO: switch to API gateway
export let WEBAPP_URL = 'https://webapp-annkq7cv6a-ew.a.run.app'
export let ADVISOR_URL = 'https://example.com'

function updateUrls() {
  switch (process.env.NEXT_PUBLIC_BASE_URL) {
    case 'https://getmerlin.ai':
      return
    case 'https://test-merlin-145236.vercel.app':
      BASE_URL = 'https://test-merlin-145236.vercel.app'
      WEBAPP_URL = 'https://dev-webapp-annkq7cv6a-ew.a.run.app'
      ADVISOR_URL = 'https://dev-example.com'
      return
    default:
      BASE_URL = 'http://localhost:3000'
      WEBAPP_URL = 'http://localhost'
      ADVISOR_URL = 'http://localhost:8080'
      return
  }
}
updateUrls()
