import { BehaviorSubject } from 'rxjs'
import cookies from 'browser-cookies'
import firebase from 'firebase/app'
import 'firebase/auth'
import { debounce } from 'lodash'

import { EnvironmentHelpers } from '@/helpers'
import UserService from '@/services/modules/User'

import { IAuthContext, Plugin } from '@/types'
import { AuthEvent } from '@/constants'

const plugin: Plugin = async ({ store, $axios }) => {
  const config = EnvironmentHelpers.getFirebaseConfig()

  if (!firebase.apps.length) firebase.initializeApp(config)
  else firebase.app()

  firebase.auth().languageCode = store.getters['modules/lang/locale']

  const auth$ = await store.dispatch(
    'modules/me/SET_AUTH_SUBJECT',
    new BehaviorSubject<IAuthContext>({
      type: AuthEvent.INIT,
      profile: store.getters['modules/me/profile'],
    })
  )

  const getMeProfile = debounce(async function () {
    if (
      store.getters['modules/context/serverInitContext'] &&
      store.getters['modules/me/authenticated'] &&
      store.getters['modules/me/profile']
    ) {
      store.commit('modules/context/SET_SERVER_INIT_STATUS', false)
      auth$.next({
        type: AuthEvent.INIT,
        profile: store.getters['modules/me/profile'],
      })
    } else {
      try {
        const profile = await UserService.getMe()
        store.dispatch('modules/me/SET_AUTH_STATUS', profile.verified)
        if (profile && profile.verified) {
          store.dispatch('modules/me/SET_USER_PROFILE', profile)
        }
        auth$.next({
          type: AuthEvent.CHANGED,
          profile,
        })
      } catch (e) {
        console.log(e)
        store.commit('modules/me/SET_AUTH_STATUS', false)
        cookies.erase('firebase_token')
        $axios.setToken(false, 'Bearer')
        auth$.next({
          type: AuthEvent.CHANGED,
          profile: null,
        })
      }
    }
  }, 250)

  firebase.auth().onIdTokenChanged((user) => {
    user?.getIdToken().then((token) => {
      console.log('[+] onIdTokenChanged')
      cookies.set('firebase_token', token)
      $axios.setToken(token, 'Bearer')
      getMeProfile()
    })
  })

  firebase.auth().onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const token = await user.getIdToken()
        console.log('[+] onAuthStateChanged')
        cookies.set('firebase_token', token)
        $axios.setToken(token, 'Bearer')
        store.dispatch('modules/me/SET_AUTH_STATUS', true)
        getMeProfile()
      } else throw new Error('Firebase user not found')
    } catch (e) {
      console.log(e)
      cookies.erase('firebase_token')
      $axios.setToken(false, 'Bearer')
      store.dispatch('modules/me/SET_AUTH_STATUS', false)
      auth$.next({
        type: AuthEvent.CHANGED,
        profile: null,
      })
    }
  })
}

export default plugin
