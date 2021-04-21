<template lang="pug">
  .top-navigation-bar
    SignInUpModal(ref="signInUpModal")

    .nav-container
      nuxt-link(:to="{ name: 'lang' }")
        .logo
          img(src="/icon.png")

      .menu
        .item
          nuxt-link.no-underline(:to="{ name: 'lang' }") หน้าแรก
        .item
          a.no-underline บทความ

        template(v-if="authenticated")
          .item.user-dropdown(@click="showUserDropdown")
            .button-wrapper
              img.square-12.rounded-lg.overflow-hidden(:src="profile && profile.imageProfileUrl ? profile.imageProfileUrl : '/images/mock-up/avatar/male.png'")
              button.button.bg-transparent.square-6.p-0.border-0.ml-2.pointer-events-none
                ion-icon(name="caret-down")
            UserDropdown(ref="userDropdown")

        template(v-else)
          .item
            button.button(@click="showSignUpModal") เข้าสู่ระบบ/สมัครสมาชิก
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import SignInUpModal from '@/components/modals/base/SignInUpModal.vue'
import UserDropdown from '@/components/menus/UserDropdown.vue'

export default defineComponent({
  name: 'TopNavigator',

  components: {
    SignInUpModal,
    UserDropdown,
  },

  setup() {
    const signInUpModal = ref<InstanceType<typeof SignInUpModal>>()
    const userDropdown = ref<InstanceType<typeof UserDropdown>>()

    return {
      signInUpModal,
      userDropdown,
    }
  },

  methods: {
    showSignUpModal() {
      this.signInUpModal?.show('signin')
    },

    showUserDropdown(e: MouseEvent) {
      this.userDropdown?.toggle(e)
    },
  },
})
</script>

<style lang="scss" scoped>
.top-navigation-bar {
  @apply flex items-center justify-center w-full h-20 px-16 bg-white shadow-md border border-black-50;

  .nav-container {
    @apply flex w-full h-full max-w-7xl;

    > .menu {
      @apply flex items-center justify-center w-auto h-full ml-auto gap-x-8;

      > .item {
        @apply font-noto font-bold;

        &.user-dropdown {
          @apply relative cursor-pointer;

          .button-wrapper {
            @apply flex items-center rounded-md p-2 pointer-events-none;

            transition: all 0.125s ease-in;
          }

          &:hover,
          &.active {
            .button-wrapper {
              @apply bg-black-50;
            }
          }
        }
      }
    }
  }

  .logo {
    @apply w-full h-full;

    max-width: 160px;

    img {
      @apply w-full h-full object-contain;
    }
  }
}
</style>
