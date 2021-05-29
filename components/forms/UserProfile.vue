<template lang="pug">
.block-content(v-if='authenticated')
  h1.text-3xl.mt-24 ผู้ใช้ทั่วไป
  .mt-10
    li.text-lg.font-noto ข้อมูลส่วนตัว

  validation-observer.w-full(ref='setupForm', v-slot='{ handleSubmit }')
    form.w-full(@submit.prevent='handleSubmit(submit)')
      button.hidden(type='submit')
      .grid.grid-cols-5.gap-8.mt-10

        .img
          img.imagePreviewWrapper(:src="previewImage" v-if="previewImage" :style="{ 'background-image': `url(${previewImage})` }")
          input(type="file" @change="previewFiles" multiple="")

        .col-span-2.space-y-5(class='md:col-span-12')
          InputProfile#firstname(
            labels='ชื่อ*',
            maxlength='40',


            v-model='form.firstname'
          )
          InputProfile#tel(
            labels='กรุณากรอกเบอร์โทรศัพท์*',
            maxlength='10',


            v-model='form.tel',
          )
          InputProfile#email(
            labels='email*',
            maxlength='10',
            disabled,
            v-model='form.email',
          )

          .flex.items-center.mt-5.space-x-1(@click='checkboxer()')
            input(type='checkbox', name='cc', :checked='checked')
            label(for='cc') ใช้เบอร์โทรศัพท์หลักเป็น Line id

        .col-span-2.space-y-5(class='md:col-span-12')
          InputProfile#lastname(
            labels='นามสกุล*',
            maxlength='40',


            v-model='form.lastname'
          )
          InputProfile#line(
            labels='line_Id*',
            maxlength='20',


            v-if='!checked',
            v-model='form.line'
          )
          InputProfile#facebook(
            labels='facebook*',


            v-model='form.facebook'
          )
          h1.text-3 *ตัวอย่าง https://www.facebook.com/profile

      .flex.justify-between.space-x-10.mt-20
        button.button.w-full(to="/th") ยกเลิก
        button.button.button-primary(:class='{ "is-loading": loading.updating }',@click='validate') บันทึกข้อมูล
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { omit } from 'lodash'

import Input from '@/components/forms/Input.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import { ValidationObserver } from 'vee-validate'
import UserService from '@/services/modules/User'
import { IUserPersonalProfile } from '@/types/user'
import InputProfile from '@/components/forms/InputProfile.vue'
import firebase from '@/node_modules/firebase'

export default defineComponent({
  meta: {
    setupProfile: true,
    requireAuth: true,
  },

  components: {
    Input,
    Dropdown,
    ValidationObserver,
    InputProfile,
  },

  setup() {
    const setupForm = ref<InstanceType<typeof ValidationObserver>>()

    return {
      setupForm,
    }
  },
  data() {
    return {
      previewImage: '',
      phone: [] as number[],
      checked: false,
      form: {
        firstname: '',
        lastname: '',
        avatar: '',
        tel: '',
        facebook: '',
        line: '',
        email: '',
      } as IUserPersonalProfile,
      loading: {
        updating: false,
        updateProfile: false,
        uploadProfileImage: false,
      },
    }
  },
  created() {
    this.form =
      omit(this.$store.getters['modules/me/profile'], ['id']) || this.form
  },
  methods: {
    checkboxer() {
      this.checked = !this.checked
    },
    validate() {
      this.setupForm?.validate().then((result) => {
        if (result) this.submit()
      })
    },

    submit() {
      this.loading.updating = true
      UserService.updateMeProfile(this.form).then((profile) => {
        console.log(this.form)
        this.$store.dispatch('modules/me/SET_USER_PROFILE', profile)
        this.loading.updating = false
        this.$router.push({ name: 'lang' })
      })
    },
    previewFiles(event) {
      this.previewImage = URL.createObjectURL(event.target.files[0])
      console.log(this.previewImage)
      console.log(event.target.files)

      const ref = firebase
        .storage()
        .ref('avatars/' + event.target.files[0].name)

      const task = ref.put(event.target.files[0])

      task.on(
        'state_change',
        (_snap) => {},
        (_e) => {},
        async () => (this.form.avatar = await ref.getDownloadURL())
      )
    },

    // selectImage() {
    //   this.$refs.fileInput.click()
    // },
    // pickFile() {
    //   const input = this.$refs.fileInput
    //   const file = input.files
    //   if (file && file[0]) {
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       this.previewImage = e.target.result
    //     }
    //     reader.readAsDataURL(file[0])
    //     this.$emit('input', file[0])
    //   }
    // },
  },
})
</script>

<style lang="scss" scoped>
.button-primary {
  background: #2c72cf;
  color: white;
}
button {
  @apply border-info-500 text-info-500 w-full;
}
.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}
.relativeBox {
  position: relative;
}
.imagePreviewWrapper {
  @apply rounded-full object-cover;

  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
