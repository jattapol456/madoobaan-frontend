import { ref, computed } from '@nuxtjs/composition-api'
import { take } from 'lodash'

import GeoHelpers, { IAddress } from '@/helpers/modules/Geo'

interface Props {
  [key: string]: unknown
  value: string
}

export default function useGeoInput(props: Props) {
  const input = ref<InstanceType<typeof HTMLFormElement>>()
  const suggestion = ref<InstanceType<typeof HTMLElement>>()
  const content = ref<string>(props.value)
  const active = ref(false)
  const selected = ref<IAddress | null>(null)
  const selector = ref(0)

  const matchReplace = (text: string, match: string) => {
    return match?.length
      ? text.replace(new RegExp(match), `<b>${match}</b>`)
      : text
  }

  const onClick = () => {
    input.value?.focus()
  }

  const onFocus = () => {
    active.value = true
  }

  const onBlur = (e: MouseEvent) => {
    e.preventDefault()
    active.value = false
  }

  const onBackspace = () => {
    if (!active.value) active.value = true
  }

  const scrollToSelected = () => {
    const activeItem =
      suggestion.value?.querySelector('.active') ||
      suggestion.value?.querySelector(':first-child')

    if (!activeItem) return

    suggestion.value?.scrollTo({
      top:
        suggestion.value.scrollTop +
        activeItem.getBoundingClientRect().top -
        suggestion.value.getBoundingClientRect().top -
        8,
    })
  }

  const keywords = computed(() => {
    return GeoHelpers.initDB()
  })

  return {
    take,
    matchReplace,
    onClick,
    onFocus,
    onBlur,
    onBackspace,
    scrollToSelected,
    input,
    suggestion,
    content,
    active,
    selected,
    selector,
    keywords,
  }
}
