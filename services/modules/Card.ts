// import { IinsertAnnounce } from '@/types/announces'

import BaseService from './Base'

export default class CardService extends BaseService {
  static deleteCard(idCard: number) {
    return this._delete(`http://127.0.0.1:3000/announces/${idCard}`).then(
      (res) => {
        return res
      }
    )
  }
}
