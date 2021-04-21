import { Store } from '@/types/store'
import { Context } from '@nuxt/types'
import { reduce } from 'lodash'

type MiddlewareContext = Omit<Context, 'store'> & {
  store: Store
}

export default function ({ route, store, redirect }: MiddlewareContext) {
  const meta = reduce(
    route.meta,
    (meta, each) => ({
      ...meta,
      ...each,
    }),
    {}
  ) as Record<string, any>

  const push = (path: string) => {
    if (path !== route.fullPath) {
      redirect(path)
    }
  }

  const lang = store.getters['modules/lang/locale']
  const { authenticated } = store.state.modules.me
  const profileSetupStatus = store.getters['modules/me/profileSetup']

  store.commit('modules/context/SET_META', meta)

  if (process.server) {
    if (authenticated) {
      if (!meta.setupProfile && !profileSetupStatus) {
        push(`/${lang}/users/me/setup`)
      } else if (meta.setupProfile && profileSetupStatus) push(`/${lang}`)
    } else if (meta.requireAuth) {
      push(`/${lang}`)
    }
  } else {
    const auth$ = store.getters['modules/me/authentication$']

    auth$?.subscribe(
      function () {
        if (!meta.setupProfile && !profileSetupStatus) {
          push(`/${lang}/users/me/setup`)
        } else if (meta.setupProfile && profileSetupStatus) push(`/${lang}`)
      },
      function () {
        if (meta.requireAuth) push(`/${lang}`)
      }
    )
  }
}
