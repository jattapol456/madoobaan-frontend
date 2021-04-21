import { ItemState } from '@/types'
import { parse, format as fnsFormat } from 'date-fns'

export function parseDatetime(date: string, format: string) {
  return parse(date, format, new Date())
}

export function formatDatetime(
  date: Date,
  format: string,
  options?: Record<string, any>
) {
  return fnsFormat(date, format, options)
}

export function mapItemStateList<T = any>(list: T[]): Array<ItemState<T>> {
  return list.map((item) => ({
    ...item,
    loading: false,
    enable: true,
  }))
}
