import { Namespaced } from '@/types/store'
import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationTypes {
  SET_META = 'SET_META',
  SET_SERVER_INIT_STATUS = 'SET_SERVER_INIT_STATUS',
}

export interface Mutations<S = State> {
  [MutationTypes.SET_META]: (state: S, payload: Record<string, any>) => void
  [MutationTypes.SET_SERVER_INIT_STATUS]: (state: S, payload: boolean) => void
}

export type NamespacedMutations = Namespaced<Mutations, 'context'>

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_META](state, payload) {
    state.meta = payload
  },

  [MutationTypes.SET_SERVER_INIT_STATUS](state, payload) {
    state.serverInitContext = payload
  },
}

export default mutations
