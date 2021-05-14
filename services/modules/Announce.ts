import { IinsertAnnounce } from '@/types/announce'

import BaseService from './Base'

export default class AnnounceService extends BaseService {
  /**
   * [GET] get all
   */
  static getSubDistrict(): Promise<IinsertAnnounce[]> {
    return this._get(`http://127.0.0.1:3000/zones?limit=1000`)
  }
}
