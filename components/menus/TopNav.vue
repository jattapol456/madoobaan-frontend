<template lang="pug">
  .top-navigation-bar(:class="{'sticky-header': isSticky}")
    SignInUpModal(ref="signInUpModal")

    .nav-container
      .menus
        nuxt-link(to="/").logo.flex-none
          img(class="w-full h-full object-none sm:object-right sm:w-16 sm:h-24" src="https://www.madoobaan.com/wp-content/uploads/2021/04/sm_long_logo-2.png",width="300px")
        .right-menu
          .item-menu.space-x-10.flex.text-white.justify-items-center.items-center.flex-wrap
            a ซื้อโครงการใหม่
            a ซื้อบ้านมือสอง
            a เช่า/หอพัก
            a บทความ
            a(class="dropdown no-underline")
              input(type="checkbox",id="dropdownMenu",name="dropdownCheck",value="")
              .flex
                label.cursor-pointer(for="dropdownMenu",data-toggle="dropdown",class="") บริการอื่นๆ
                ion-icon(class="mt-4" name="chevron-down")
              div(class="dropdown-content")
                ul
                  li
                    a ค้นหาตัวแทนอสังหาฯ
                  li
                    a ค้นหาเจ้าของโครงการ

        template(v-if="authenticated")
          nuxt-link(to="/th/announcement_step_1").button.button-success.text-white ลงประกาศฟรี
          .item.user-dropdown(@click="showUserDropdown")
            .button-wrapper.flex.items-center.pointer-events-none
              img.rounded-full.square-12.overflow-hidden(:src="profile && profile.imageProfileUrl ? profile.imageProfileUrl : '/images/mock-up/avatar/male.png'")
              button.button.bg-transparent.square-6.p-0.border-0.ml-2
            UserDropdown(ref="userDropdown")

        template(v-else)
          .item
            button.button.button-success.text-white(@click="showSignUpModal") ลงประกาศฟรี

        ion-icon.menubar(name="menu" @click="showMenus")
    .menu-list(class="bg-white w-full absolute mt-16 top-0 lg:hidden md:hidden sm:hidden" v-if="isShow")
      .flex.flex-col.items-center.h-full.justify-around.space-y-5.py-5
        a ซื้อโครงการใหม่
        a ซื้อบ้านมือสอง
        a เช่า/หอพัก
        a บทความ
        .bg-black-900.h-1.w-full
        a ค้นหาตัวแทนอสังหาฯ
        a ค้นหาเจ้าของโครงการ

</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import SignInUpModal from '@/components/modals/base/SignInUpModal.vue'
import UserDropdown from '@/components/menus/UserDropdown.vue'
import Input from '@/components/forms/Input.vue'

export default defineComponent({
  name: 'TopNavigator',

  components: {
    SignInUpModal,
    UserDropdown,
    Input,
  },
  setup() {
    const signInUpModal = ref<InstanceType<typeof SignInUpModal>>()
    const userDropdown = ref<InstanceType<typeof UserDropdown>>()

    return {
      signInUpModal,
      userDropdown,
    }
  },
  data() {
    return {
      isShow: false,
      isSticky: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkScrollTop()

      document.addEventListener('scroll', () => {
        this.checkScrollTop()
      })
    })
  },
  methods: {
    showSignUpModal() {
      this.signInUpModal?.show('signin')
    },

    showUserDropdown(e: MouseEvent) {
      this.userDropdown?.toggle(e)
    },

    showMenus() {
      this.isShow = !this.isShow
    },

    checkScrollTop() {
      const firstDocH = document.querySelectorAll('section')
      const scrollY = window.scrollY
      if (firstDocH.length === 0) return
      if (scrollY >= firstDocH[0].getBoundingClientRect().height - 400) {
        this.isSticky = true
        return
      }
      this.isSticky = false
    },
  },
})
</script>

<style lang="scss" scoped>
a {
  @apply no-underline;
}
.top-navigation-bar {
  @apply fixed py-5 top-0 left-0 w-full h-16 px-16 z-50 transition duration-500 items-center justify-center flex;

  &.nav-post {
    @apply bg-black-500 bg-opacity-75 shadow-xl;
    .item-menu a {
      color: #fff;
    }
    .menubar {
      color: #000;
    }
  }

  &.sticky-header {
    @apply bg-info-500;

    .item-menu {
      &:last-child {
        .menu-item {
          @apply text-white;
        }
      }
    }
  }

  .nav-container {
    @apply w-full h-full max-w-7xl;

    > .menus {
      @apply flex items-center justify-between w-full h-full;

      > .right-menu {
        @apply font-noto font-bold;

        &.user-dropdown {
          @apply relative cursor-pointer;

          .button-wrapper {
            @apply flex items-center p-2 pointer-events-none;

            transition: all 0.125s ease-in;
          }
          &:hover,
          &.active {
            .button-wrapper {
              @apply bg-white;
            }
          }
        }
      }
    }
  }

  .menubar {
    @apply hidden;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  li a {
    padding: 10px 20px;
    display: inline-block;
    white-space: nowrap;
    color: black;
  }

  .dropdown-content {
    border-radius: 5px;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    z-index: 1;
  }
  input[type='checkbox'] {
    display: none;
  }

  label {
    font-size: 16px;
    line-height: 3;
    user-select: none;
  }

  input[type='checkbox']:checked ~ .dropdown-content {
    display: block;
  }

  @media only screen and (max-width: 1250px) {
    .menubar {
      @apply block cursor-pointer flex-none;

      font-size: 60px;
      color: white;
    }
    .right-menu {
      @apply hidden;

      &::after {
        @apply block;
      }
    }
    .search {
      @apply w-auto;
    }
  }
}
</style>
