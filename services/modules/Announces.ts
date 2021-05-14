import { IinsertAnnounce } from '@/types/announces'

import BaseService from './Base'

export default class AnnouncesService extends BaseService {
  /**
   * [GET] get all announces
   */
  static getAllAnnounces(): Promise<IinsertAnnounce[]> {
    return this._get(`http://127.0.0.1:3000/announces`)
  }
}
