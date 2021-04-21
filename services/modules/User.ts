import {
  ISimpleUser,
  IUpdatableUser,
  IVerifyEmail,
  IResetPassword,
  ISetNewPassword,
} from '@/types/user'
import { AxiosRequestConfig } from 'axios'

import BaseService from './Base'

export default class UserService extends BaseService {
  static getMe(config?: AxiosRequestConfig): Promise<ISimpleUser> {
    return this._get('users/me', config)
  }

  static updateMeProfile(profile: IUpdatableUser): Promise<ISimpleUser> {
    return this._put('users/me', profile)
  }

  static getVerifyEmail() {
    return this._get('users/verify')
  }

  static updateVerifyEmail(config: IVerifyEmail) {
    return this._put('users/verify', config)
  }

  static sendResetPassword(
    dataResetpass: Partial<IResetPassword>
  ): Promise<IResetPassword> {
    return this._post('users/forgot-password', dataResetpass).then((res) => {
      return res
    })
  }

  static postNewPassword(
    dataNewpassword: Partial<ISetNewPassword>
  ): Promise<ISetNewPassword> {
    return this._post('users/reset-password', dataNewpassword).then((res) => {
      return res
    })
  }
}
