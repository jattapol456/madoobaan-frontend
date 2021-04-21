import { Getters, NamespacedGetters } from './getters'
import { Mutations, NamespacedMutations } from './mutations'
import { State } from './state'

export interface NamespacedModule {
  state: State
  getters: NamespacedGetters
  mutations: NamespacedMutations
}

export interface Module {
  state: State
  getters: Getters
  mutations: Mutations
}
