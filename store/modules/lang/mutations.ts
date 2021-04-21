import { Namespaced } from '@/types/store'
import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationTypes {
  SET_LANG = 'SET_LANG',
}

export interface Mutations<S = State> {
  [MutationTypes.SET_LANG]: (state: S, payload: string) => void
}

export type NamespacedMutations = Namespaced<Mutations, 'lang'>

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LANG](state, payload) {
    state.locale = payload
  },
}

export default mutations
