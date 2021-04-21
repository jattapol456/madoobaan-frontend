import { ServerHelpers } from '@/helpers'
import { MapTypes } from '@/types/store'
import { ISimpleUser } from '@/types/user'
import { Context } from '@nuxt/types'
import cookiesBrowser from 'browser-cookies'

type Mutations = MapTypes<'me', 'mutations'> & MapTypes<'context', 'mutations'>
type Actions = MapTypes<'me', 'actions'>

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>
}

export const actions = {
  async nuxtServerInit(
    { commit }: AugmentedActionContext,
    { $axios, req }: Context
  ) {
    const cookies = ServerHelpers.parseCookies(req.headers.cookie || '')
    if (cookies.firebase_token) {
      try {
        const user = await $axios
          .get('users/me', {
            baseURL: process.env.BASE_URL,
            headers: {
              Authorization: cookies.firebase_token,
            },
          })
          .then((result): ISimpleUser => result.data)

        if (user.verified) {
          commit('modules/me/SET_USER_PROFILE', user)
          commit('modules/me/SET_AUTH_STATUS', true)
          commit('modules/context/SET_SERVER_INIT_STATUS', true)
        } else {
          cookiesBrowser.erase('firebase_token')
        }
      } catch (e) {}
    }
  },
}

export const strict = false
