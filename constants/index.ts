export enum Gender {
  NOT_SPECIFIED = 'not_specified',
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum AuthEvent {
  INIT = 'init',
  CHANGED = 'changed',
  RESET = 'reset',
}

export enum MessageVerifyEmail {
  VERIFY_CODE_NOT_MATCH = 'รหัสยืนยันไม่ถูกต้อง',
  VERIFY_CODE_EXPIRES = 'รหัสยืนยันนี้หมดอายุแล้ว',
}

export enum MessageResetPassword {
  RESET_PASSWORD_NOT_MATCH = 'รหัสผ่านไม่ตรงกัน',
  RESET_PASSWORD_EXPIRES = 'ระยะเวลาเกินกำหนด',
  RESET_PASSWORD_SUCCESS = 'เปลี่ยนรหัสผ่านสำเร็จ',
}
