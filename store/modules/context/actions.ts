import { IinsertAnnounce } from '@/types/announces'
import { Namespaced } from '@/types/store'
import { ActionContext, ActionTree } from 'vuex'
import { MutationTypes, Mutations } from './mutations'
import { State } from './state'

export enum ActionTypes {
  SETUP_POST = 'SETUP_POST',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.SETUP_POST](
    { commit }: AugmentedActionContext,
    payload: IinsertAnnounce
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SETUP_POST]({ commit }, payload) {
    commit(MutationTypes.SETUP_POST, payload)
  },
}

export type NamespacedActions = Namespaced<Actions, 'context'>

export default actions
