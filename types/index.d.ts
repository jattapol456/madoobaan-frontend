/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { Observable } from 'rxjs'
import { AuthEvent } from '@/constants'
import { Store } from './store'
import { ISimpleUser } from './user'

type AuthEventType<O = AuthEvent> = {
  [K in keyof O]: O[K]
}

export type VueI18nContext = Omit<Context, 'store'> & {
  store: Store
}

export type Plugin = (
  ctx: VueI18nContext,
  inject: Inject
) => Promise<void> | void

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: Store
  }
}

export interface IEditable {
  editable?: boolean
}

export interface IAuthContext {
  type: AuthEvent | AuthEventType
  profile: ISimpleUser | null
}

export interface IGeoLocation {
  latitude: number | null
  longitude: number | null
}

export interface IPaginationQuery {
  page: number
  limit: number
}

export interface IPaginatedResponse<T = any> {
  items: T[]
  total: number
  limit: number
  totalPages: number
  page: number
}

export type ItemState<T = any> = {
  [K in keyof T]: T[K]
} & {
  loading: boolean
  enable: boolean
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store
    profile: ISimpleUser | null
    auth$: Observable<IAuthContext> | undefined
    clearState: () => void
  }
}
