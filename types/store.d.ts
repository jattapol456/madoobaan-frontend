import { NamespacedModule as MeModule } from '@/store/modules/me'
import { NamespacedModule as LangModule } from '@/store/modules/lang'
import { NamespacedModule as ContextModule } from '@/store/modules/context'
import { NamespacedModule as ProjectModule } from '@/store/modules/project'
import { NamespacedModule as AnnounceModule } from '@/store/modules/announce'
import { NamespacedModule as BrandsModule } from '@/store/modules/brands'
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'

export type Namespaced<T, N extends string> = {
  [P in keyof T & string as `modules/${N}/${P}`]: T[P]
}

export type NamespacedModules = {
  me: MeModule
  lang: LangModule
  context: ContextModule
  project: ProjectModule
  announce: AnnounceModule
  brands: BrandsModule
}

export type MapState = {
  [K in keyof NamespacedModules]: NamespacedModules[K]['state']
}

export type MapTypes<
  T extends keyof NamespacedModules,
  N extends keyof NamespacedModules[T]
> = {
  [K in keyof NamespacedModules[T][N]]: NamespacedModules[T][N][K]
}

// TODO: ต้อง nested ใน modules
type State = { modules: MapState }
type Mutations = MapTypes<'me', 'mutations'> &
  MapTypes<'lang', 'mutations'> &
  MapTypes<'context', 'mutations'> &
  MapTypes<'project', 'mutations'> &
  MapTypes<'announce', 'mutations'> &
  MapTypes<'brands', 'mutations'>
type Actions = MapTypes<'me', 'actions'>
type Getters = MapTypes<'me', 'getters'> &
  MapTypes<'lang', 'getters'> &
  MapTypes<'context', 'getters'> &
  MapTypes<'project', 'getters'> &
  MapTypes<'announce', 'getters'> &
  MapTypes<'brands', 'getters'>

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions, P extends Parameters<Actions[K]>[1]>(
    key: K,
    payload: P,
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}
