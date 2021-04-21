<template lang="pug">
  portal(to="modal" slim)
    transition(name="modal-box" mode="out-in")
      .modal-backdrop(v-if="display" v-bind="$attrs")
        .modal-scroller
          .modal
            .modal-container
              .flex
                h3 {{ mode === 'signin' ? 'เข้าสู่ระบบ' : mode === 'verify' ? 'ยืนยันตัวตน' : mode === 'resetPass' ? 'ลืมรหัสผ่าน' : 'สร้างบัญชีใหม่'}}
                button.button.square-8.p-0.border-none.ml-auto.outline-none(@click="close" :disabled="loading.signin.email || loading.signin.google || loading.signin.facebook || loading.signup.email")
                  ion-icon.w-full.h-full(name="close-outline")

              transition(name="fade-group" mode="out-in" tag="div")
                .flex.flex-col.mt-4(v-if="mode === 'signin' && !signInData.verified" key="signin-not-verified")
                  p.font-noto By continuing, you agree to our <br>
                    a.underline User Agreement
                    |  and 
                    a.underline Privacy Policy.

                  .button-group.mt-6
                    button.button.text-facebook(:disabled="loading.signin.email || loading.signin.google || loading.signin.facebook" @click="signInWithFacebook")
                      img(src="/images/logo/logo-facebook.svg")
                      | เข้าสู่ระบบด้วย Facebook

                    button.button.text-black-300(:disabled="loading.signin.email || loading.signin.google || loading.signin.facebook" @click="signInWithGoogleAccount")
                      img(src="/images/logo/logo-google.svg")
                      | เข้าสู่ระบบด้วย Google
                  
                  .divider.mt-4(data-text="หรือ")

                  validation-observer.mt-4(ref="signInForm" v-slot="{ handleSubmit }")
                    form(@submit.prevent="handleSubmit(fetchSignInMethods)")
                      label(for="email") อีเมล
                      Input(id="email" name="email" rules="required|email" :disabled="loading.signin.email || loading.signin.google || loading.signin.facebook" v-model="signInData.email")

                      button.button.button-primary.w-full.mt-6(:disabled="loading.signin.google" :class="{ 'is-loading': loading.signin.email }") ดำเนินการต่อ

                  .flex.flex-col.items-center.mt-6
                    a.font-noto(@click="updateMode('signup')" :disabled="loading.signin.email || loading.signin.google || loading.signin.facebook") สร้างบัญชีใหม่

                .flex.flex-col.mt-4(v-if="mode === 'signin' && signInData.verified" key="signin-verified")
                  validation-observer(ref="signInForm" v-slot="{ handleSubmit }")
                    form(@submit.prevent="handleSubmit(signIn)")
                      label(for="password") รหัสผ่าน
                      Input(id="password" name="password" type="password" rules="required" :disabled="loading.signin.email" v-model="signInData.password")

                      button.button.button-primary.w-full.mt-6(:class="{ 'is-loading': loading.signin.email }") เข้าสู่ระบบ
                
                  .flex.items-center.mt-6.justify-between
                    a.font-noto(@click="clearSignInData" :disabled="loading.signin.email") ใช้บัญชีอื่น
                    a.font-noto(:disabled="loading.signin.email" @click="updateMode('resetPass')") ลืมรหัสผ่าน?

                .flex.flex-col.mt-4(v-if="mode === 'signup'" key="signup")
                  validation-observer(ref="signUpForm" v-slot="{ handleSubmit, invalid }")
                    form(@submit.prevent="handleSubmit(signUp)")
                      label(for="email") อีเมล
                      Input(id="email" rules="required|email" :disabled="loading.signup.email" v-model="signUpData.email")

                      label.mt-6(for="password") รหัสผ่าน
                      Input(id="password" rules="required" type="password" vid="password" :disabled="loading.signup.email" v-model="signUpData.password")

                      label.mt-6(for="confirm-password") ยืนยันรหัสผ่าน
                      Input(id="confirm-password" mode="aggressive" rules="required|confirmed:password" type="password" vid="confirmPassword" :error="passwordWrong" @input="passwordWrong = ''" :disabled="loading.signup.email" v-model="signUpData.confirmPassword")

                      Checkbox.mt-6(name="accept-terms-and-conditions" id="accept-terms-and-conditions" :disabled="invalid || loading.signup.email" v-model="signUpData.acceptTermsAndConditions") ฉันได้อ่านและยอมรับ 
                        a เงื่อนไขการให้บริการ
                        |  และ 
                        a เงื่อนไขการเปิดเผยข้อมูล
                      
                      button.button.button-primary.w-full.mt-6(:disabled="!signUpData.acceptTermsAndConditions" :class="{ 'is-loading': loading.signup.email }") ดำเนินการต่อ

                  .flex.flex-col.items-center.mt-6
                    a.font-noto(:disabled="loading.signup.email" @click="updateMode('signin')") ลงชื่อเข้าใช้

                .flex.flex-col.mt-4(v-if="mode === 'verify' && !signInData.verified" key="verify")
                  p.font-noto.text-black-900 กรุณาป้อนรหัสยืนยัน 6 หลักที่ส่งไปยัง <br>
                  p.font-noto {{signInData.email || signUpData.email}}

                  validation-observer.mt-6(ref="verifyForm" v-slot="{ handleSubmit }")
                    form(@submit.prevent="handleSubmit(verifyEmail)")
                      label(for="verifyCode") รหัสยืนยันจากอีเมล
                      NumberInput(id="verifyCode" name="verifyCode" :maxlength="'6'" rules="required" :disabled="loading.signin.verifyCode" v-model="verify.verifyCode" :error="veriCodeWrong" @input="veriCodeWrong = ''")

                      button.button.button-primary.w-full.mt-8(:class="{ 'is-loading': loading.signin.verifyCode }") ยืนยัน

                  .flex.flex-col.items-center.mt-6
                    a.font-noto(@click="sendVerifyEmail()" :disabled="loading.signin.countTime") ส่งอีกครั้ง {{countTime > 0 ? '('+ countTime +'s)' : ''}}

                .flex.flex-col.mt-4(v-if="mode === 'resetPass'" key="resetPass")
                  .w-full.mb-6.flex.flex-col.items-center.bg-backdrop.p-6
                    img.square-20.rounded-lg.overflow-hidden.mb-4(:src="'/images/mock-up/avatar/male.png'")
                    label.font-semibold.mb-1 Name Surname
                    label.font-normal {{ signInData.email || signUpData.email }}
                  .mb-4.w-full.h-auto
                    p.font-noto เราได้ส่งลิ้งค์สำหรับเปลี่ยนรหัสผ่านไปยังอีเมล
                    span.font-noto.font-bold.space-x-1 {{signInData.email || signUpData.email}}
                    span {{' '}}
                    span.font-noto แล้ว

                  button.button.button-primary.w-full.mt-6(:class="{ 'is-loading': loading.signin.resetPass }" @click="updateMode('signin')") เข้าสู่ระบบใหม่

                  .flex.flex-col.items-center.mt-6
                    a.font-noto(@click="resetPassword()" :disabled="loading.signin.countTime") ส่งอีกครั้ง {{countTime > 0 ? '('+ countTime +'s)' : ''}}
                    
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import Input from '@/components/forms/Input.vue'
import NumberInput from '@/components/forms/NumberInput.vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import { ValidationObserver } from 'vee-validate'

import useDialog from '@/composables/interactive/useDialog'
import { AuthenticationService, UserService } from '@/services'
import { IResetPassword, IVerifyEmail } from '@/types/user'
import { mapGetters } from 'vuex'
import { MessageVerifyEmail } from '@/constants'

type Mode = 'signin' | 'signup' | 'verify' | 'resetPass'
enum Errors {
  AUTH_NO_SIGNIN_METHODS = 'auth/no-signin-methods',
}
export default defineComponent({
  name: 'SignInUpModal',

  components: {
    Input,
    NumberInput,
    Checkbox,
    ValidationObserver,
  },

  setup() {
    const signInForm = ref<InstanceType<typeof ValidationObserver>>()

    return {
      signInForm,
      ...useDialog(),
    }
  },

  data() {
    return {
      mode: 'signin' as Mode,
      signInData: {
        email: '',
        password: '',
        verified: false,
      },
      signUpData: {
        email: '',
        password: '',
        confirmPassword: '',
        acceptTermsConditions: false,
      },
      loading: {
        signin: {
          email: false,
          facebook: false,
          google: false,
          verifyCode: false,
          resetPass: false,
          countTime: false,
        },
        signup: {
          email: false,
        },
      },
      verify: {
        verifyCode: '',
      } as IVerifyEmail,
      dataResetPassword: {
        email: '',
        lang: '',
      } as IResetPassword,
      countTime: 0,
      veriCodeWrong: '',
      passwordWrong: '',
      countTimeInterval: null as any,
    }
  },

  computed: {
    ...mapGetters({
      lang: 'modules/lang/locale',
    }),
  },

  methods: {
    show(mode: Mode = 'signin') {
      this.updateMode(mode)
      this.clearSignInData()
      this.clearSignUpData()
      this.display = true

      return new Promise((resolve, reject) => {
        this.promise = { resolve, reject }
      })
    },

    updateMode(mode: Mode) {
      this.mode = mode

      if (this.mode === 'signin') this.clearSignUpData()
      else if (this.mode === 'signup') this.clearSignInData()
      else if (this.mode === 'resetPass') this.resetPassword()
    },

    fetchSignInMethods() {
      this.loading.signin.email = true
      AuthenticationService.fetchSignInMethods(this.signInData.email)
        .then((res) => {
          if (res.length < 1) throw new Error(Errors.AUTH_NO_SIGNIN_METHODS)

          switch (res[0]) {
            case 'password':
              this.signInData.verified = true
              return Promise.resolve()

            case 'google.com':
              return this.signInWithGoogleAccount()

            case 'facebook.com':
              return this.signInWithFacebook()
          }
        })
        .then(() => {
          this.loading.signin.email = false
        })
        .catch((err: Error) => {
          this.loading.signin.email = false
          this.loading.signin.google = false
          this.loading.signin.facebook = false

          switch (err.message as Errors) {
            case Errors.AUTH_NO_SIGNIN_METHODS:
              this.signUpData.email = this.signInData.email
              this.updateMode('signup')
              this.clearSignInData()

              break
          }
        })
    },

    signIn() {
      this.loading.signin.email = true
      AuthenticationService.login({
        email: this.signInData.email,
        password: this.signInData.password,
      })
        .then(async () => {
          this.loading.signin.email = false
          const profile = await UserService.getMe()
          if (profile.verified) {
            this.close()
          } else {
            this.signInData.verified = false
            this.updateMode('verify')
            this.sendVerifyEmail()
          }
        })
        .catch(() => {
          this.loading.signin.email = false
          this.passwordWrong = 'รหัสผ่านไม่ถูกต้อง'
        })
    },

    sendVerifyEmail() {
      this.loading.signin.countTime = false
      if (!this.loading.signin.countTime) {
        UserService.getVerifyEmail().then(() => {
          this.updateMode('verify')
        })
        this.countTimer()
      }
    },

    verifyEmail() {
      this.loading.signin.verifyCode = true
      UserService.updateVerifyEmail(this.verify)
        .then(async () => {
          const profile = await UserService.getMe()
          this.$store.commit('modules/me/SET_USER_PROFILE', profile)
          this.$store.commit('modules/me/SET_AUTH_STATUS', true)
          this.$store.commit('modules/context/SET_SERVER_INIT_STATUS', true)
          this.loading.signin.verifyCode = false
          this.$router.push(`/${this.lang}/users/me/setup`)
          this.close()
        })
        .catch((error) => {
          this.veriCodeWrong = MessageVerifyEmail[error.response.data.message]
          this.loading.signin.verifyCode = false
        })
    },

    resetPassword() {
      this.loading.signin.countTime = false
      if (!this.loading.signin.countTime) {
        this.dataResetPassword.email = this.signInData.email
        this.dataResetPassword.lang = this.lang
        UserService.sendResetPassword(this.dataResetPassword)
        this.countTimer()
      }
    },

    countTimer() {
      let timeleft = 60
      this.countTimeInterval = setInterval(() => {
        if (timeleft < 0) {
          clearInterval(this.countTimeInterval)
          this.loading.signin.countTime = false
        } else {
          this.loading.signin.countTime = true
          this.countTime = timeleft
        }
        timeleft -= 1
      }, 1000)
    },

    signUp() {
      this.loading.signup.email = true

      AuthenticationService.registerUser({
        email: this.signUpData.email,
        password: this.signUpData.password,
      })
        .then(async () => {
          this.loading.signup.email = false
          const profile = await UserService.getMe()
          if (profile.verified) {
            this.close()
          } else {
            this.signInData.verified = false
            this.updateMode('verify')
            this.sendVerifyEmail()
          }
        })
        .catch((error) => {
          this.loading.signup.email = false
          this.passwordWrong = error.message
          console.log(error, error.message)
        })
    },

    signInWithGoogleAccount() {
      this.loading.signin.google = true

      return AuthenticationService.loginWithGoogleAccount()
        .then(async () => {
          const profile = await UserService.getMe()
          if (profile.verified) {
            this.loading.signin.google = false
            if (profile.firstname === '' || profile.lastname === '') {
              this.$router.push(`/${this.lang}/users/me/setup`)
            }
            this.close()
          } else {
            this.loading.signin.google = false
            this.updateMode('verify')
            this.sendVerifyEmail()
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading.signin.google = false
        })
    },

    signInWithFacebook() {
      this.loading.signin.facebook = true
      return AuthenticationService.loginWithFacebook()
        .then(async () => {
          const profile = await UserService.getMe()
          if (profile.verified) {
            this.loading.signin.facebook = false
            if (profile.firstname === '' || profile.lastname === '') {
              this.$router.push(`/${this.lang}/users/me/setup`)
            }
            this.close()
          } else {
            this.loading.signin.facebook = false
            this.updateMode('verify')
            this.sendVerifyEmail()
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading.signin.facebook = false
        })
    },

    clearSignInData() {
      this.signInData = {
        email: '',
        password: '',
        verified: false,
      }
    },

    clearSignUpData() {
      this.signUpData = {
        email: '',
        password: '',
        confirmPassword: '',
        acceptTermsConditions: false,
      }
    },

    close() {
      this.display = false
      clearInterval(this.countTimeInterval)
      this.promise.reject?.()
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.modal {
  max-width: 360px !important;

  .button-group {
    @apply flex flex-col w-full gap-y-4;

    button {
      @apply flex justify-start w-full px-3 border-black-100;

      img {
        @apply mr-2;
      }

      &:hover {
        @apply border-black-300 bg-white;
      }

      &.text-facebook {
        color: #1877f2;
      }
    }
  }
}
</style>
