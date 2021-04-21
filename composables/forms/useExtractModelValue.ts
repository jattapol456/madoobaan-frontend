import { ref, Ref, toRefs, watch } from '@nuxtjs/composition-api'

interface Props<T> {
  [key: string]: unknown
  value: T
}

interface ReturnType<T> {
  value: Ref<T>
}

export default function useExtractModelValue<T>(
  props: Props<T>,
  onChanged?: (value: T) => void
): ReturnType<T> {
  const { value } = toRefs(props)

  watch(
    value,
    (val) => {
      onChanged?.(val)
    },
    {
      flush: 'sync',
      deep: true,
    }
  )

  return {
    value: ref(value),
  }
}
