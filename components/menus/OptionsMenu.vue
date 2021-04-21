<template lang="pug">
  .dropdown-menu(ref="dropdownMenu" tabindex="0" :class="{ 'active': active }" @click="show" v-click-outside="hide")
    .group(v-for="(group, i) in groups" :key="i")
      .item(v-for="item in group" :key="item.value" :class="{ 'text-error-500': item.type === 'error' }" @click="select($event, item)")
        ion-icon(v-if="item.icon" :icon="item.icon")
        p {{ item.content }}
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { groupBy } from 'lodash'

export interface IMenuOption<T = number | string> {
  content: string
  value: T
  group?: string | number
  type?: 'default' | 'error'
  icon?: string
}

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<IMenuOption[]>,
      default: () => [],
    },
  },

  setup() {
    const dropdownMenu = ref<HTMLElement>()

    return {
      dropdownMenu,
    }
  },

  data() {
    return {
      active: false,
      lastestEventTimeStamp: 0,
      callerEl: null as Partial<EventTarget & HTMLElement> | null,
    }
  },

  computed: {
    groups(): Array<IMenuOption[]> {
      return Object.values(groupBy(this.options, (each) => each.group))
    },
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

    select(ev: MouseEvent, item: IMenuOption) {
      this.$emit('select', item)
      this.hide(ev)
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
  z-index: 15;
  transform: translateY(-10px);
  transition: all 0.25s ease;

  .group {
    @apply flex flex-col w-full h-auto py-3;

    .item {
      @apply flex w-full h-10 items-center px-4 gap-x-4 font-normal text-black-900;

      transition: all 0.125s ease-in;

      ion-icon {
        @apply square-6;
      }

      &:hover {
        @apply bg-backdrop;
      }
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
