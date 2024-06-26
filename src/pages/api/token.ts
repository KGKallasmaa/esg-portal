import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function products(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile', 'read:current_user'],
    })
    res.status(200).json({
      accessToken,
    })
  } catch (err) {
    console.error(`Problem getting access token ${err}`)
    res.status(500).json({
      accessToken: '500 Error',
    })
  }
})
