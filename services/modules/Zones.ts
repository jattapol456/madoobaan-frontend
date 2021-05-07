import { IinsertZone } from '@/types/zone'

import BaseService from './Base'

export default class ZonesService extends BaseService {
  /**
   * [GET] get all
   */
  static getSubDistrict(): Promise<IinsertZone[]> {
    return this._get(`http://127.0.0.1:3000/zones?limit=1000`)
  }
}
