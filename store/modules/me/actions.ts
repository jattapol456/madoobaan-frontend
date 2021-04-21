import { IAuthContext } from '@/types'
import { Namespaced } from '@/types/store'
import { ISimpleUser } from '@/types/user'
import { BehaviorSubject } from 'rxjs'
import { ActionContext, ActionTree } from 'vuex'
import { MutationTypes, Mutations } from './mutations'
import { State } from './state'

export enum ActionTypes {
  RESET_ME_STATE = 'RESET_ME_STATE',
  SET_AUTH_STATUS = 'SET_AUTH_STATUS',
  SET_AUTH_SUBJECT = 'SET_AUTH_SUBJECT',
  SET_USER_PROFILE = 'SET_USER_PROFILE',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.SET_AUTH_STATUS](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void

  [ActionTypes.SET_AUTH_SUBJECT](
    { commit }: AugmentedActionContext,
    payload: BehaviorSubject<IAuthContext>
  ): BehaviorSubject<IAuthContext>

  [ActionTypes.RESET_ME_STATE]({ commit }: AugmentedActionContext): void

  [ActionTypes.SET_USER_PROFILE](
    { commit }: AugmentedActionContext,
    payload: ISimpleUser
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SET_AUTH_STATUS]({ commit }, payload) {
    commit(MutationTypes.SET_AUTH_STATUS, payload)
  },

  [ActionTypes.SET_AUTH_SUBJECT]({ commit }, payload) {
    commit(MutationTypes.SET_AUTH_SUBJECT, payload)

    return payload
  },

  [ActionTypes.SET_USER_PROFILE]({ commit }, payload) {
    commit(MutationTypes.SET_USER_PROFILE, payload)
  },

  [ActionTypes.RESET_ME_STATE]({ commit }) {
    commit(MutationTypes.SET_AUTH_STATUS, false)
    commit(MutationTypes.SET_USER_PROFILE, null)
  },
}

export type NamespacedActions = Namespaced<Actions, 'me'>

export default actions
