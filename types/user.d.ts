export interface IUser {
  id: number
  email: string
  verified: boolean
  firstname: string
  lastname: string
  avatar: string | null
  tel: string
  line: string
  facebook: string
}

export interface IUserPersonalProfile extends Omit<IUser, 'id' | 'email'> {
  firstname: string
  lastname: string
  tel: string
  line: string
  facebook: string
  email: string
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
