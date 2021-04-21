import { MutationTree } from 'vuex'
import { Namespaced } from '@/types/store'
import { BehaviorSubject } from 'rxjs'
import { ISimpleUser } from '@/types/user'
import { IAuthContext } from '@/types'
import { State } from './state'

export enum MutationTypes {
  SET_AUTH_STATUS = 'SET_AUTH_STATUS',
  SET_AUTH_SUBJECT = 'SET_AUTH_SUBJECT',
  SET_USER_PROFILE = 'SET_USER_PROFILE',
}

export interface Mutations<S = State> {
  [MutationTypes.SET_AUTH_STATUS]: (state: S, payload: boolean) => void
  [MutationTypes.SET_AUTH_SUBJECT]: (
    state: S,
    payload: BehaviorSubject<IAuthContext> | null
  ) => void
  [MutationTypes.SET_USER_PROFILE]: (
    state: S,
    payload: ISimpleUser | null
  ) => void
}

export type NamespacedMutations = Namespaced<Mutations, 'me'>

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_AUTH_STATUS](state, payload) {
    state.authenticated = payload
  },
  [MutationTypes.SET_AUTH_SUBJECT](state, payload) {
    state.authentication$ = payload
  },

  [MutationTypes.SET_USER_PROFILE](state, payload) {
    state.profile = payload
  },
}

export default mutations
