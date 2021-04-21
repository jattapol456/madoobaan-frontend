import { Plugin } from '@/types'
import cookies from 'browser-cookies'
import { BaseService } from '@/services'
import { ServerHelpers } from '@/helpers'

const plugin: Plugin = ({ $axios, req }) => {
  if (process.client) {
    BaseService.setAxiosInstance($axios)
    $axios.setToken(cookies.get('firebase_token') || false, 'Bearer')
    $axios.setBaseURL(process.env.BASE_URL || '')
    $axios.onResponseError((e) => {
      console.log(e)
    })
  } else if (process.server) {
    BaseService.setAxiosInstance($axios)
    $axios.setBaseURL(process.env.BASE_URL || '')
    const cookies = ServerHelpers.parseCookies(req.headers.cookie || '')
    if (cookies.firebase_token) {
      $axios.setToken(cookies.firebase_token)
    }
  }
}

export default plugin
