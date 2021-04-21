<template lang="pug">
  .management-page
    section.mt-12
      .block-content
        h1.font-noto กรอกข้อมูลส่วนตัวของคุณ

      .block-content.mt-8(v-if="authenticated")
        validation-observer.w-full(ref="setupForm" v-slot="{ handleSubmit }")
          form.w-full(@submit.prevent="handleSubmit(submit)")
            button.hidden(type="submit")

            .grid.grid-cols-2.gap-6.mt-12
              .block
                label.is-required(for="firstname") ชื่อ ภาษาไทย
                Input(id="firstname" placeholder="ชื่อ ภาษาไทย" max-length="40" rules="required" :disabled="loading.updating" :descriptions="`${form.firstname.length}/40`" v-model="form.firstname")

              .block
                label.is-required(for="lastname") นามสกุล ภาษาไทย
                Input(id="lastname" placeholder="นามสกุล ภาษาไทย" max-length="40" rules="required" :disabled="loading.updating" :descriptions="`${form.lastname.length}/40`" v-model="form.lastname")

              .block
                label.is-required(for="tel") เบอร์โทรติดต่อ
                Input(id="tel" placeholder="เบอร์โทรติดต่อ" rules="required" :disabled="loading.updating" v-model="form.tel")

              .block
                label.is-required(for="gender") เพศ
                Dropdown(id="gender" placeholder="กรุณาเลือก" rules="required" :options="genders" :disabled="loading.updating" v-model="form.gender")

    section.section-bottom-bar
      .block-content
        button.button.button-primary.ml-auto(:class="{ 'is-loading': loading.updating }" @click="validate") ต่อไป



</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { omit } from 'lodash'

import Input from '@/components/forms/Input.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import { ValidationObserver } from 'vee-validate'
import { DropdownOption } from '@/components/menus/Dropdown.vue'

import UserService from '@/services/modules/User'

import { ISimpleUser } from '@/types/user'
import { Gender } from '@/constants'

export default defineComponent({
  meta: {
    setupProfile: true,
    requireAuth: true,
  },

  components: {
    Input,
    Dropdown,
    ValidationObserver,
  },

  setup() {
    const setupForm = ref<InstanceType<typeof ValidationObserver>>()

    return {
      setupForm,
    }
  },

  data(): {
    form: Omit<ISimpleUser, 'id' | 'email' | 'verified'>
    genders: DropdownOption<Gender>[]
    loading: {
      updating: boolean
      updateProfile: boolean
      uploadProfileImage: boolean
    }
  } {
    return {
      form: {
        firstname: '',
        lastname: '',
        avatar: null,
        gender: null,
        tel: '',
      },
      genders: [
        {
          value: Gender.MALE,
          content: 'ชาย',
        },
        {
          value: Gender.FEMALE,
          content: 'หญิง',
        },
        {
          value: Gender.OTHER,
          content: 'อื่นๆ',
        },
      ],
      loading: {
        updating: false,
        updateProfile: false,
        uploadProfileImage: false,
      },
    }
  },

  created() {
    this.form =
      omit(this.$store.getters['modules/me/profile'], ['id', 'email']) ||
      this.form
  },

  mounted() {
    this.auth$?.subscribe(({ profile }) => {
      this.form = omit(profile, ['id', 'email']) || this.form
    })
  },

  methods: {
    validate() {
      this.setupForm?.validate().then((result) => {
        if (result) this.submit()
      })
    },

    submit() {
      this.loading.updating = true

      UserService.updateMeProfile(this.form).then((profile) => {
        this.$store.dispatch('modules/me/SET_USER_PROFILE', profile)
        this.loading.updating = false
        this.$router.push({ name: 'lang' })
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.management-page {
  section {
    .block-content {
      max-width: 640px;
    }

    &.section-bottom-bar {
      @apply fixed left-0 right-0 bottom-0 bg-white;

      margin-top: 72px;
      box-shadow: 0 0 8px rgba(52, 73, 85, 0.08),
        0 8px 16px rgba(52, 73, 85, 0.08);

      .block-content {
        @apply flex py-4;
      }
    }
  }
}

.profile-pic {
  @apply w-48 h-48 rounded-md border border-black-50 overflow-hidden;

  img {
    @apply w-full h-full object-cover;
  }
}
</style>
