import { Gender } from '@/constants'

export interface IUser {
  id: number
  email: string
  verified: boolean
  firstname: string
  lastname: string
  avatar: string | null
  tel: string
  gender: Gender | null
  descriptions?: string
}

export interface IUserPersonalProfile extends Omit<IUser, 'id' | 'email'> {
  firstname: string
  lastname: string
  firstnameEN: string
  lastnameEN: string
  tel: string
  displayEmail: string
  gender: Gender | null
  birthdate: Date | null
  nationality: string
  district: string
  subDistrict: string
  province: string
  zipcode: string
  workCities: string[]
  expectedSalary: number
}

export interface IResetPassword {
  email: string
  lang: string
}
export interface IVerifyEmail {
  verifyCode: string
}
export interface ISetNewPassword {
  uid: string
  newPassword: string
}

export interface ISimpleUser extends IUser {}

export interface IUpdatableUser
  extends Omit<ISimpleUser, 'id' | 'email' | 'verified'> {}
