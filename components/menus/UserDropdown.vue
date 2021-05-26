<template lang="pug">
  .dropdown-menu(ref="dropdownMenu" tabindex="0" :class="{ 'active': active }" @click="show" v-click-outside="hide")
    .group.header
      .item(@click="goToMeProfie")
        p ดูโปรไฟล์
      .item(@click="goToMyAnnounces")
        p ดูใบประกาศของฉัน

    .group
      .item.text-error-500(@click="logout")
        ion-icon(icon="log-out-outline")
        p ออกจากระบบ


</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { AuthenticationService } from '@/services'

export default defineComponent({
  name: 'UserDropdown',

  setup() {
    const dropdownMenu = ref<HTMLElement>()

    return {
      dropdownMenu,
    }
  },

  data() {
    return {
      loading: {
        fetching: {
          companies: true,
        },
      },
      active: false,
      lastestEventTimeStamp: 0,
      callerEl: null as Partial<EventTarget & HTMLElement> | null,
    }
  },

  methods: {
    toggle(e?: MouseEvent) {
      const timeStamp = e?.timeStamp ? e.timeStamp : +new Date()
      if (this.active) this.hide({ timeStamp, target: e?.target })
      else this.show({ timeStamp, target: e?.target })
    },

    show(e: Partial<MouseEvent>) {
      if (
        !this.active &&
        (e.timeStamp || 0) - this.lastestEventTimeStamp >= 250
      ) {
        this.dropdownMenu?.focus()
        this.active = true
        this.callerEl = e.target || null
        this.callerEl?.classList?.add('active')
        // this.scrollToSelectedValue()
      }
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    hide(e: Partial<MouseEvent>) {
      if (!this.dropdownMenu) return
      if (
        this.active &&
        (e.timeStamp || 0) - this.lastestEventTimeStamp >= 250
      ) {
        this.dropdownMenu.blur()
        this.active = false
        this.callerEl?.classList?.remove('active')
      }
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    goToMeProfie(e: MouseEvent) {
      this.$router.push({ name: 'lang-users-id', params: { id: 'me' } })
      this.hide(e)
    },

    goToMyAnnounces(e: MouseEvent) {
      this.$router.push('/th/viewpostlist')
      this.hide(e)
    },

    logout() {
      AuthenticationService.logout()
    },
  },
})
</script>

<style lang="scss" scoped>
.dropdown-menu {
  @apply absolute h-auto bg-white shadow-md rounded-lg overflow-auto;

  top: calc(100% + theme('spacing.1'));
  right: 0;
  width: 240px;
  opacity: 0;
  outline: none;
  user-select: none;
  pointer-events: none;
  z-index: 20;
  transform: translateY(-10px);
  transition: all 0.25s ease;

  .group {
    @apply flex flex-col w-full h-auto py-3;

    .item {
      @apply flex w-full h-10 items-center px-4 gap-x-4 font-normal text-black-900;

      transition: all 0.125s ease-in;

      &:hover {
        @apply bg-backdrop;
      }

      ion-icon {
        @apply square-6;
      }
    }

    &.header {
      .item {
        @apply h-16;
      }
    }

    &.companies {
      max-height: 225px;
    }

    &:not(:last-child) {
      @apply border-b border-black-50;
    }
  }

  &.active {
    opacity: 1;
    pointer-events: unset;
    transform: translateY(0);
  }
}
</style>
