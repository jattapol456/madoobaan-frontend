import Modal from '@/components/modals/base/Modal.vue'
import { Ref, ref } from '@nuxtjs/composition-api'

interface PromiseObject<T = any> {
  resolve: ((value: T | PromiseLike<T>) => void) | null
  reject: ((reason?: T) => void) | null
}

interface ReturnType {
  modal: Ref<InstanceType<typeof Modal> | undefined>
  promise: <T>() => PromiseObject<T>
}

export default function useModalAbility(): ReturnType {
  const modal = ref<InstanceType<typeof Modal>>()
  const promise = () =>
    ({
      resolve: null,
      reject: null,
    } as PromiseObject)

  return {
    modal,
    promise,
  }
}
