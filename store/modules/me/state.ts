import { IAuthContext } from '@/types'
import { ISimpleUser } from '@/types/user'
import { BehaviorSubject } from 'rxjs'

export interface State {
  authenticated: boolean
  authentication$: BehaviorSubject<IAuthContext> | null
  profile: ISimpleUser | null
}

export const state = (): State => ({
  authenticated: false,
  authentication$: null,
  profile: null,
})

export default state
