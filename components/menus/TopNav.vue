<template lang="pug">
  .top-navigation-bar(:class="{'sticky-header': isSticky}")
    SignInUpModal(ref="signInUpModal")
    .nav-container
      .menu.flex.space-x-5
        .logo.flex-none.px-3
          img(src="https://www.madoobaan.com/wp-content/uploads/2021/04/sm_long_logo-2.png",width="300px")
        .search.flex.justify-between
          Input(placeholder="พิมพ์โซน ชื่อโครงการ")
          .w-auto.bg-info-400.right-0.cursor-pointer
            .icon.items-center.mt-2.px-3
              ion-icon(name="search")

        .right-menu
          .item.space-x-4.flex.text-white.justify-items-center.items-center.flex-wrap
            a(href="#" class="no-underline") ซื้อโครงการใหม่
            a(href="#" class="no-underline") ซื้อบ้านมือสอง
            a(href="#" class="no-underline") เช่า/หอพัก
            a(href="#" class="no-underline") บทความ
            a(class="dropdown no-underline")
              input(type="checkbox",id="dropdownMenu",name="dropdownCheck",value="")
              .flex
                label.cursor-pointer(for="dropdownMenu",data-toggle="dropdown",class="") บริการอื่นๆ
                ion-icon(class="mt-4" name="chevron-down")
              div(class="dropdown-content")
                ul
                  li
                    a(href="#" class="no-underline") ค้นหาตัวแทนอสังหาฯ
                  li
                    a(href="#" class="no-underline") ค้นหาเจ้าของโครงการ

            a(href="#" class="no-underline" @click="showSignUpModal") เข้าสู่ระบบ
        button.rbtn.bg-success-500(@click="showSignUpModal") ลงประกาศฟรี
        ion-icon.menubar(name="menu" @click="showMenus")

        template(v-if="authenticated")
          .item.user-dropdown(@click="showUserDropdown")
            .button-wrapper
              img.square-12.rounded-lg.overflow-hidden(:src="profile && profile.imageProfileUrl ? profile.imageProfileUrl : '/images/mock-up/avatar/male.png'")
              button.button.bg-transparent.square-6.p-0.border-0.ml-2.pointer-events-none
                ion-icon(name="caret-down")
            UserDropdown(ref="userDropdown")
    div.bg-white.w-full.absolute.mt-16.top-0(v-if="isShow")
      div.flex.flex-col.items-center.h-full.justify-around.space-y-5.py-5
        div ซื้อโครงการใหม่
        div ซื้อบ้านมือสอง
        div เช่า/หอพัก
        div บทความ
        hr.w-full
        div ค้นหาตัวแทนอสังหาฯ
        div ค้นหาเจ้าของโครงการ
        div เข้าสู่ระบบ
        button.rbtn.bg-success-500(@click="showSignUpModal") ลงประกาศฟรี



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
.top-navigation-bar {
  @apply fixed py-5 top-0 left-0 w-full h-16 px-16 z-50 bg-navColor transition duration-500 shadow-md items-center justify-center flex;

  .nav-container {
    @apply w-full h-full max-w-7xl;

    > .menu {
      @apply flex items-center justify-center w-full h-full;

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

  .logo {
    @apply left-0 top-0 cursor-pointer;

    img {
      @apply w-40 py-5 bg-center;
    }
  }

  .search {
    @apply w-48;
  }

  .rbtn {
    @apply font-semibold p-3;

    display: inline-block;
    white-space: nowrap;
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
    .myPadding {
      padding-right: 25px;
    }
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
