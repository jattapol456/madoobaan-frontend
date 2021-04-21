import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { GetterTree } from 'vuex'

import { Namespaced } from '@/types/store'
import { ISimpleUser } from '@/types/user'
import { pick } from 'lodash'
import { IAuthContext } from '@/types'
import { State } from './state'

export type Getters = {
  authenticated(state: State): boolean
  authentication$(state: State): Observable<IAuthContext> | undefined
  profile(state: State): ISimpleUser | null
  profileSetup(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  authenticated: (state) => state.authenticated && !!state.profile,
  authentication$: (state) =>
    state.authentication$
      ?.asObservable()
      .pipe(
        distinctUntilChanged(
          (prev, current) => prev.profile?.id === current.profile?.id
        )
      ),
  profile: (state) => state.profile,
  profileSetup: (state) =>
    (Object.keys(
      pick(state.profile!, ['firstname', 'lastname', 'tel', 'gender'])
    ) as []).every((key) => state.profile?.[key]),
}

export type NamespacedGetters = Namespaced<Getters, 'me'>

export default getters
