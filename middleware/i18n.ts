import { VueI18nContext } from '@/plugins/i18n'
import { localeChanged } from 'vee-validate'

type I18nMiddleware = (
  ctx: VueI18nContext,
  cb: Function
) => Promise<void> | void

const middleware: I18nMiddleware = ({
  app,
  isHMR,
  route,
  params,
  res,
  redirect,
  store,
  error,
}) => {
  const defaultLocale = app.i18n.fallbackLocale.toString()

  if (
    isHMR ||
    route.fullPath.endsWith('.map') ||
    route.fullPath.endsWith('.json') ||
    route.fullPath.endsWith('.js')
  )
    return

  const locale = params.lang || defaultLocale
  if (!store.state.modules.lang.locales.includes(locale))
    return error({ message: 'This page could not be found.', statusCode: 404 })

  store.commit('modules/lang/SET_LANG', locale)

  app.i18n.locale = store.state.modules.lang.locale
  localeChanged()

  if (process.server) {
    res.setHeader('Set-Cookie', [`lang=${locale}; Path=/`])
  }

  if (!params.lang) {
    const routes = route.fullPath.split('/')
    routes[1] = locale

    return redirect(routes.join('/'))
  }

  return Promise.resolve()
}

export default middleware
