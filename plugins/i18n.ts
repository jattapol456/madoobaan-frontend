import Vue from 'vue'
import VueI18n from 'vue-i18n'
import th from 'vee-validate/dist/locale/th.json'

import { Context, NuxtAppOptions } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { Store } from '@/types/store'

Vue.use(VueI18n)

export type VueI18nContext = Omit<Context, 'store'> & {
  app: NuxtAppOptions & {
    i18n: VueI18n & {
      [key: string]: any
    }
  }
  store: Store
}

export type VueI18nPlugin = (
  ctx: VueI18nContext,
  inject: Inject
) => Promise<void> | void

const plugin: VueI18nPlugin = ({ app, store }) => {
  const i18n = new VueI18n({
    locale: store.state.modules.lang.locale,
    fallbackLocale: 'th',
    messages: {
      th: {
        fields: {
          email: 'อีเมล',
          password: 'รหัสผ่าน',
          'confirm-password': 'ยืนยันรหัสผ่าน',
        },
        validation: th.messages,
      },
    },
  })

  app.i18n = i18n
  app.i18n.path = (link: string) => {
    return `/${app?.i18n?.locale}/${link}`
  }
}

export default plugin
