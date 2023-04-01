import cookies from './cookieUtil'

const options = {
  path: '/',
  maxAge: 10 * 24 * 3600,
  sameSite: 'lax',
}

export const storeUserInfo = (value, payload) => {
  cookies.set(value, payload, options)
}

export const removeUserInfo = (value) => {
  cookies.remove(value)
}

export const getUserInfo = (cookieName) => {
  return cookies.get(cookieName)
}
