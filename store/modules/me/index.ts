import { State } from './state'
import { Getters, NamespacedGetters } from './getters'
import { Mutations, NamespacedMutations } from './mutations'
import { Actions, NamespacedActions } from './actions'

export interface NamespacedModule {
  state: State
  getters: NamespacedGetters
  mutations: NamespacedMutations
  actions: NamespacedActions
}

export interface Module {
  state: State
  getters: Getters
  mutations: Mutations
  actions: Actions
}
