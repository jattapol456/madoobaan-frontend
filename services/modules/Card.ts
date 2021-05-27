// import { IinsertAnnounce } from '@/types/announces'

import BaseService from './Base'

export default class CardService extends BaseService {
  static deleteCard(
    idcard: string
  ) {
    return this._delete(`http://127.0.0.1:3000/announces/${idcard}`).then(
      (res) => {
        return res
      }
    )
  }
}
