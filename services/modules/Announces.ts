import { IinsertAnnounce } from '@/types/announces'

import BaseService from './Base'

export default class AnnouncesService extends BaseService {
  /**
   * [GET] get all announces
   */
  static getAllAnnounces(): Promise<IinsertAnnounce[]> {
    return this._get(`http://127.0.0.1:3000/announces`)
  }

  /**
   * [POST] post announces
   */
  static postAnnounces(
    newAnnounces: Partial<IinsertAnnounce>
  ): Promise<IinsertAnnounce> {
    return this._post(`http://127.0.0.1:3000/announces`, newAnnounces).then(
      (res) => {
        return res
      }
    )
  }

  /**
   * [GET] get announces by ID
   */
  static getAnnounceById(id: number): Promise<IinsertAnnounce> {
    return this._get(`http://127.0.0.1:3000/announces/${id}`)
  }

  /**
   * [GET] get announces by ID
   */
  static searchAnnounces(
    type: string,
    provinceName: string,
    topicName: string
  ): Promise<IinsertAnnounce> {
    return this._get(
      `http://127.0.0.1:3000/announces/search?type=${type}&provinceName=${provinceName}&topicName=${topicName}`
    )
  }
}
