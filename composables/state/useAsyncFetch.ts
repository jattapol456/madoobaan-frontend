import { Ref, useAsync, ssrRef } from '@nuxtjs/composition-api'

export default function useAsyncFetch<T = any>(
  fetch: () => Promise<T>,
  key: string,
  cb?: (payload: T | null) => void
): Ref<T | null> {
  let result = ssrRef<T | null>(null, key)

  if (process.server)
    result = useAsync(
      () =>
        fetch().then((res) => {
          cb?.(res)
          return res
        }),
      key
    )
  else cb?.(result.value)
  return result
}
