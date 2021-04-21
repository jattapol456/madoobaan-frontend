import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'

interface PromiseObject {
  resolve: ((value: unknown) => void) | null
  reject: ((reason?: unknown) => void) | null
}

interface ReturnType {
  promise: PromiseObject
  display: Ref<boolean>
}

export default function useDialog(): ReturnType {
  const display = ref(false)
  const promise = reactive({
    resolve: null,
    reject: null,
  })

  watch(display, (bool) => {
    const html = document.querySelector('html')!

    if (bool) {
      html.style.margin = '0'
      html.style.height = '100%'
      html.style.overflow = 'hidden'
    } else {
      html.style.margin = ''
      html.style.height = ''
      html.style.overflow = ''
    }
  })

  return {
    promise,
    display,
  }
}
