import { MutationTree } from 'vuex'
import { Namespaced } from '@/types/store'
import { IinsertAnnounce } from '@/types/announces'
import { State } from './state'

export enum MutationTypes {
  SET_META = 'SET_META',
  SET_SERVER_INIT_STATUS = 'SET_SERVER_INIT_STATUS',
  SETUP_POST = 'SETUP_POST',
}

export interface Mutations<S = State> {
  [MutationTypes.SET_META]: (state: S, payload: Record<string, any>) => void
  [MutationTypes.SET_SERVER_INIT_STATUS]: (state: S, payload: boolean) => void
  [MutationTypes.SETUP_POST]: (state: S, payload: IinsertAnnounce) => void
}

export type NamespacedMutations = Namespaced<Mutations, 'context'>

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_META](state, payload) {
    state.meta = payload
  },

  [MutationTypes.SET_SERVER_INIT_STATUS](state, payload) {
    state.serverInitContext = payload
  },

  [MutationTypes.SETUP_POST](state, payload) {
    state.post = payload
  },
}

export default mutations
