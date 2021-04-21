import EditableModal from '@/components/modals/base/EditableModal.vue'
import { Ref, ref } from '@nuxtjs/composition-api'

interface PromiseObject<T = any> {
  resolve: ((value: T | PromiseLike<T>) => void) | null
  reject: ((reason?: T) => void) | null
}

interface ReturnType {
  modal: Ref<InstanceType<typeof EditableModal> | undefined>
  promise: <T>() => PromiseObject<T>
}

export default function useEditableModalAbility(): ReturnType {
  const modal = ref<InstanceType<typeof EditableModal>>()
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
