import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0'

export default handleAuth({
  signup: handleLogin({ authorizationParams: { screen_hint: 'signup' } }),
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile read:current_user  offline_access',
    },
  }),
  logout: handleLogout({ returnTo: process.env.NEXT_PUBLIC_BASE_URL }),
})
