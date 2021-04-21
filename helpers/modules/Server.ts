export default class ServerHelpers {
  static parseCookies(rawCookies: string) {
    const cookies: Record<string, string> = {}
    rawCookies.split(';').forEach((cookie) => {
      const parts = cookie.split('=')
      cookies[parts.shift()?.trim()!] = decodeURI(parts.join('='))
    })

    return cookies
  }
}
