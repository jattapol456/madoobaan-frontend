import { EventEmitter } from 'events'
import { IPaginatedResponse } from '@/types'
import {
  computed,
  ComputedRef,
  onBeforeMount,
  reactive,
  toRef,
  UnwrapRef,
  useContext,
  useRouter,
  watch,
  watchEffect,
} from '@nuxtjs/composition-api'

type ReturnType<T> = {
  pagination: UnwrapRef<IPaginatedResponse<T>>
  paginationSummary: ComputedRef<string>
  pageChangeListener: (cb: (page?: number) => void) => void
  onPageChange: (page: number) => void
}

export default function usePagination<T>(
  pagination: UnwrapRef<IPaginatedResponse<T>> = reactive({
    items: [],
    page: 1,
    totalPages: Infinity,
    total: 0,
    limit: 15,
  }),
  cb?: (page: number) => void
): ReturnType<T> {
  const event = new EventEmitter()

  const { query, route } = useContext()
  const router = useRouter()

  pagination.page = parseInt(query.value.page as string) || 1

  const paginationSummary = computed(
    () =>
      `${pagination?.page} - ${
        (pagination!.page - 1) * pagination!.limit + pagination!.items.length
      } จาก ${pagination?.total} รายการ`
  )

  function onPageChange(page: number) {
    pagination.page = page
  }

  const pageChangeListener = (cb: (page?: number) => void) => {
    event.on('pageChange', cb)
  }

  watchEffect(() => {
    pagination.page = Math.max(
      Math.min(pagination.totalPages, pagination.page),
      1
    )
  })

  watch(toRef(pagination, 'page'), (page) => {
    event.emit('pageChange', page)
    router.push({
      path: route.value.path,
      query: { page: page.toString() },
    })
    cb?.(page)
  })

  watch(query, (value, oldValue) => {
    if (value.page !== oldValue.page)
      pagination.page = parseInt(value.page as string) || 1
  })

  onBeforeMount(() => {
    event.removeAllListeners('pageChange')
  })

  return {
    pagination,
    paginationSummary,
    pageChangeListener,
    onPageChange,
  }
}
