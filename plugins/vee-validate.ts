import { configure, extend } from 'vee-validate'
import { confirmed, email, required } from 'vee-validate/dist/rules'
import { VueI18nPlugin } from './i18n'

const plugins: VueI18nPlugin = ({ app }) => {
  configure({
    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`fields.${field}`)

      return app.i18n.t(`validation.${values._rule_}`, values) as string
    },
  })
}

extend('required', required)
extend('email', email)
extend('confirmed', confirmed)

export default plugins
