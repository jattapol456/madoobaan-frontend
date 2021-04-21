import { Namespaced } from '@/types/store'
import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  locale(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
  locale: (state) => state.locale,
}

export type NamespacedGetters = Namespaced<Getters, 'lang'>

export default getters
