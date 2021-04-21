import { BaseService } from '@/services'
import { Plugin } from '@/types'

const plugin: Plugin = ({ store }) => {
  BaseService.setStoreInstance(store)
}

export default plugin
