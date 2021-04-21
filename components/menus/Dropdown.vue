<template lang="pug">
  .dropdown-menu(ref="dropdownMenu" :tabindex="tabindex" :class="{ 'active': active, 'bottom': position.includes('bottom'), 'right': position.includes('right'), 'left': position.includes('left') }" @click.stop="show" @blur="hide")
    .item(v-for="(option, i) in options" :key="i" :class="{ 'active': value == option.value }" @click="select(option)")
      p.font-normal {{ option.content }}
</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

export interface DropdownOption<T = number | string> {
  content: string
  value: T
}

export default defineComponent({
  name: 'DropdownMenu',

  props: {
    value: {
      type: [String, Number],
      default: null,
    },

    options: {
      type: Array as PropType<DropdownOption[]>,
      default: () => [],
    },

    position: {
      type: String,
      default: 'bottom-left',
    },

    tabindex: {
      type: String,
      default: '0',
    },
  },

  emits: ['input'],

  setup(props) {
    const dropdownMenu = ref<HTMLElement>()
    const value = ref()

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      dropdownMenu,
      val: value,
    }
  },

  data() {
    return {
      active: false,
      lastestEventTimeStamp: 0,
      callerEl: null as Partial<EventTarget & HTMLElement> | null,
    }
  },

  methods: {
    select(option: DropdownOption) {
      this.$emit('input', option.value)
      this.hide({ timeStamp: +new Date() })
    },

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
        this.scrollToSelectedValue()
      }
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    hide(e: Partial<MouseEvent>) {
      if (!this.dropdownMenu) return
      this.dropdownMenu.blur()
      this.active = false
      this.callerEl?.classList?.remove('active')
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    scrollToSelectedValue() {
      const activeItem = this.dropdownMenu?.querySelector('.active')
      if (!activeItem) return

      this.dropdownMenu?.scrollTo({
        top:
          this.dropdownMenu.scrollTop +
          activeItem!.getBoundingClientRect().top -
          this.dropdownMenu.getBoundingClientRect().top -
          8,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities/_misc.scss';

.dropdown-menu {
  @apply absolute h-auto max-h-64 bg-white shadow-md rounded-sm overflow-auto;

  width: 200px;
  opacity: 0;
  outline: none;
  user-select: none;
  pointer-events: none;
  z-index: 11;
  transform: translateY(-10px);
  transition: all 0.25s ease;

  .item {
    @apply flex w-full h-10 px-4 items-center bg-white;

    &:first-child {
      @apply mt-2;
    }

    &:last-child {
      @apply mb-2;
    }

    &:hover,
    &.active {
      @apply bg-black-100;
    }

    &:active {
      @apply bg-black-200;
    }
  }

  &.right {
    right: 0;
  }

  &.left {
    left: 0;
  }

  &.bottom {
    top: calc(100% + theme('spacing.1'));
  }

  &.active {
    opacity: 1;
    pointer-events: unset;
    transform: translateY(0);
  }
}
</style>
