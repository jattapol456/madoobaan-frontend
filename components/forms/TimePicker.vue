<template lang="pug">
  .flex.relative.input-wrapper.outline-none.w-full(:tabindex="disabled ? 1 : 0" :disabled="disabled" @focus="show" @blur="hide")
    .timepicker-input
      p(:class="{ 'text-black-200': !strValue }") {{ strValue || placeholder }}
      ion-icon(name="chevron-down")

    TimePickerMenu(ref="timePickerMenu" v-model="val")
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import TimePickerMenu from '@/components/misc/time/TimePickerMenu.vue'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import { format } from 'date-fns'

export default defineComponent({
  name: 'TimePicker',

  components: {
    TimePickerMenu,
  },

  props: {
    value: {
      type: Date,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: 'Pick the Time',
    },
  },

  setup(props) {
    const timePickerMenu = ref<InstanceType<typeof TimePickerMenu>>()
    const value = ref(props.value)

    useExtractModelValue(props, (payload) => {
      value.value = payload || new Date()
    })

    return {
      val: value,
      timePickerMenu,
    }
  },

  data() {
    return {
      display: false,
      lastestEventTimeStamp: 0,
      callerEl: null as Partial<EventTarget & HTMLElement> | null,
    }
  },

  computed: {
    strValue(): string | undefined {
      return this.val ? format(this.val, 'HH:mm') : undefined
    },
  },

  watch: {
    val(date: Date) {
      this.$emit('input', date)
    },
  },

  mounted() {
    this.$nextTick().then(() => {
      this.$emit('input', this.val)
    })
  },

  methods: {
    toggle(e: MouseEvent) {
      this.timePickerMenu?.toggle(e)
    },

    show(e: MouseEvent) {
      if (this.disabled) return
      this.val = this.val || new Date()
      this.timePickerMenu?.show(e)
    },

    hide(e: MouseEvent) {
      this.timePickerMenu?.hide(e)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  .timepicker-input {
    @apply flex items-center w-full h-10 px-3 font-noto border-black-100 border rounded-sm cursor-pointer;

    p {
      @apply select-none;
    }

    ion-icon {
      @apply w-6 h-6 ml-auto;

      transition: transform ease-in-out 0.25s;
    }
  }

  &:focus:not([disabled]) {
    .timepicker-input {
      @apply border-2 border-black-900;

      ion-icon {
        transform: rotate(-180deg);
      }
    }
  }

  &[disabled] {
    @apply pointer-events-none;

    .timepicker-input {
      @apply text-black-300 bg-disabled border-none;

      p,
      ion-icon {
        @apply text-black-300;
      }
    }
  }
}
</style>
