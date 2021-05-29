import firebase from 'firebase/app'
import 'firebase/auth'
import cookies from 'browser-cookies'

import BaseService from './Base'

interface ILogin {
  email: string
  password: string
}

interface IRegister extends ILogin {}

export default class AuthenticationService extends BaseService {
  static login(data: ILogin) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (res) => {
        console.log(res)
        cookies.set('firebase_token', await res.user?.getIdToken()!)
        return Promise.resolve(res)
      })
  }

  static decodeToken(){
    const cookie = cookies.get('firebase_token')?.split('.')[1]
    let b = new Buffer(cookie, 'base64')
    return b.toString();
  }

  static fetchSignInMethods(email: string) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
  }

  static registerUser(data: IRegister) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
  }

  static loginWithGoogleAccount() {
    const provide = new firebase.auth.GoogleAuthProvider().addScope('email')
    return firebase.auth().signInWithPopup(provide)
  }

  static loginWithFacebook() {
    const provide = new firebase.auth.FacebookAuthProvider().addScope('email')
    return firebase.auth().signInWithPopup(provide)
  }

  static logout() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        this.$store.dispatch('modules/me/RESET_ME_STATE', undefined)
        cookies.erase('cid')
        cookies.erase('perspective')
        return Promise.resolve()
      })
  }
}
