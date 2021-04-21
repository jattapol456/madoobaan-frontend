import qs from 'querystring'

export default function useReplaceQueryString(
  query: Record<string, any>
): void {
  if (process.browser) {
    const baseUrl = location.href.replace(/\?.+/, '')
    const params = qs.stringify(query)
    history.pushState(null, '', `${baseUrl}?${params}`)
  }
}
