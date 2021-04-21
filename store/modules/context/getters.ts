import { Namespaced } from '@/types/store'
import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  meta(state: State): Record<string, any>
  serverInitContext(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  meta: (state) => state.meta,
  serverInitContext: (state) => state.serverInitContext,
}

export type NamespacedGetters = Namespaced<Getters, 'context'>

export default getters
