<template lang="pug">
  .time-picker(ref="timePicker" :class="{ 'active': active, 'bottom': position.includes('bottom'), 'right': position.includes('right'), 'left': position.includes('left') }")
    .grid.grid-cols-2
      .block
        .flex.items-center.justify-center.h-10.font-noto.font-semibold.text-14px.border-b.border-black-50 Hours
        .scroller
          .item(v-for="item in hours" :key="item.value" :class="{ 'active': item.value == hour }" @click="selectHour(item.value)") {{ item.content }}
      .block
        .flex.items-center.justify-center.h-10.font-noto.font-semibold.text-14px.border-b.border-black-50 Minutes
        .scroller.border-l.border-black-50
          .item(v-for="item in minutes" :key="item.value" :class="{ 'active': item.value == minute }" @click="selectMinute(item.value)") {{ item.content }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { range } from 'lodash'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { DropdownOption } from '@/components/menus/Dropdown.vue'
import { format, setHours, setMinutes } from 'date-fns'

export default defineComponent({
  name: 'TimePickerMenu',

  props: {
    value: {
      type: Date,
      default: undefined,
    },

    position: {
      type: String,
      default: 'bottom-left',
    },
  },

  setup(props) {
    const timePicker = ref<HTMLElement>()
    const value = ref<Date | undefined>(props.value)

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      val: value,
      timePicker,
    }
  },

  data() {
    return {
      active: false,
      lastestEventTimeStamp: 0,
    }
  },

  computed: {
    hours(): DropdownOption[] {
      return range(0, 24).map((i) => ({
        content: i.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        value: i,
      }))
    },

    minutes(): DropdownOption[] {
      return range(0, 60).map((i) => ({
        content: i.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        value: i,
      }))
    },

    hour: {
      get(): number | undefined {
        return this.val ? parseInt(format(this.val, 'H')) : undefined
      },

      set(value: number) {
        this.$emit('input', setHours(this.val!, value))
      },
    },

    minute: {
      get(): number | undefined {
        return this.val ? parseInt(format(this.val, 'm')) : undefined
      },

      set(value: number) {
        this.$emit('input', setMinutes(this.val!, value))
      },
    },
  },

  methods: {
    selectHour(value: number) {
      this.hour = value
    },

    selectMinute(value: number) {
      this.minute = value
    },

    scrollToSelectedValue() {
      this.$nextTick().then(() => {
        const scrollers = this.$el.querySelectorAll('.scroller')

        scrollers?.forEach((scroller) => {
          const activeItem = scroller.querySelector('.active')
          if (!activeItem) return

          scroller.scrollTo({
            top:
              scroller.scrollTop +
              activeItem!.getBoundingClientRect().top -
              scroller.getBoundingClientRect().top,
          })
        })
      })
    },

    toggle(e?: MouseEvent) {
      const timeStamp = e?.timeStamp || +new Date()
      if (this.active) this.hide({ timeStamp, target: e?.target })
      else this.show({ timeStamp, target: e?.target })
    },

    show(e: Partial<MouseEvent>) {
      if (
        !this.active &&
        (e.timeStamp || 0) - this.lastestEventTimeStamp >= 250
      ) {
        this.active = true
        this.scrollToSelectedValue()
      }
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    hide(e: Partial<MouseEvent>) {
      if (!this.timePicker) return
      this.timePicker.blur()
      this.active = false
      this.lastestEventTimeStamp = e.timeStamp || 0
    },
  },
})
</script>

<style lang="scss" scoped>
.time-picker {
  @apply absolute flex w-auto min-h-10 bg-white shadow-lg rounded-sm overflow-hidden;

  top: calc(100% - theme('spacing.1'));
  opacity: 0;
  outline: none;
  user-select: none;
  pointer-events: none;
  z-index: 11;
  transform: translateY(-10px);
  transition: all 0.25s ease;

  .scroller {
    @apply relative w-20 min-h-10 max-h-64 overflow-auto;

    .item {
      @apply flex items-center justify-center w-full h-10 px-4 cursor-pointer;

      transition: all 0.25s ease-in;

      &:hover,
      &.active {
        @apply bg-black-50;
      }

      &:active {
        @apply bg-black-100;
      }

      // &:first-child {
      //   @apply mt-2;
      // }

      &:last-child {
        @apply mb-2;
      }
    }

    &:not(:last-child) {
      @apply border-r border-black-50;
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
