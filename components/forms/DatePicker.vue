<template lang="pug">
  .flex.relative.input-wrapper.outline-none.w-full(:tabindex="disabled ? 1 : 0" :disabled="disabled" :class="$attrs.class" @focus="show" @blur="hide" v-click-outside="hide")
    ValidationProvider.w-full(:name="name" :rules="rules" :mode="mode" :vid="vid" v-slot="{ errors }")
      .calendar-input(:class="{ 'is-error': error.length || errors.length }")
        p(:class="{ 'text-black-200': !strValue }") {{ strValue || placeholder }}
        ion-icon(name="chevron-down")

      .calendar-picker-wrapper(ref="calendarWrapper" :class="{ 'active': display, 'left': position.includes('left'), 'right': position.includes('right') }")
        CalendarPicker(ref="calendarPicker" v-model="val")
      
      .message(v-if="error || descriptions || errors.length")
        p.font-noto.text-14px.leading-none.text-error-500(v-if="error || errors.length") {{ error || errors[0] }}
        p.font-noto.text-14px.leading-none.text-black-300.ml-auto(v-if="descriptions") {{ descriptions }}
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'

import Input from '@/components/forms/Input.vue'
import CalendarPicker from '@/components/misc/calendar/CalendarPicker.vue'
import { ValidationProvider } from 'vee-validate'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import { format } from 'date-fns'

export default defineComponent({
  name: 'DatePicker',

  components: {
    Input,
    CalendarPicker,
    ValidationProvider,
  },

  props: {
    name: {
      type: String,
      default: undefined,
    },

    value: {
      type: [Date, String],
      default: undefined,
    },

    format: {
      type: String,
      default: 'dd/MM/y',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: 'Pick the date',
    },

    position: {
      type: String,
      default: 'bottom-left',
    },

    descriptions: {
      type: String,
      default: '',
    },

    error: {
      type: String,
      default: '',
    },

    mode: {
      type: String,
      default: 'eager',
    },

    rules: {
      type: String,
      default: '',
    },

    vid: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const input = ref<HTMLFormElement>()
    const calendarWrapper = ref<HTMLElement>()
    const calendarPicker = ref<InstanceType<typeof CalendarPicker>>()
    const value = ref<Date>(
      typeof props.value === 'string' ? new Date(props.value) : props.value
    )

    useExtractModelValue(props, (payload) => {
      console.log(payload)
      value.value = typeof payload === 'string' ? new Date(payload) : payload
    })

    return {
      val: value,
      input,
      calendarWrapper,
      calendarPicker,
    }
  },

  data() {
    return {
      display: false,
      lastestEventTimeStamp: 0,
      caller: null as Partial<EventTarget & HTMLElement> | null,
    }
  },

  computed: {
    strValue(): string | undefined {
      return this.val ? format(this.val, this.format) : undefined
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
    toggle() {
      const timeStamp = +new Date()

      if (this.display) this.hide({ timeStamp })
      else this.show({ timeStamp })
    },

    show(e: Partial<MouseEvent>) {
      // debugger
      if (this.disabled) return
      if (
        !this.display &&
        (e.timeStamp || 0) - this.lastestEventTimeStamp >= 250
      ) {
        this.calendarPicker?.resetNavigation()
        this.display = true
        this.caller = e.target || null
        this.caller?.classList?.add('active')
      }
      this.val = this.val || new Date()
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    hide(e: Partial<MouseEvent>) {
      // debugger
      if (!this.calendarWrapper) return
      this.display = false
      this.caller?.classList?.remove('active')
      this.lastestEventTimeStamp = e.timeStamp || 0
    },
  },
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  ::v-deep input {
    @apply pointer-events-none;
  }

  .calendar-input {
    @apply flex items-center w-full h-10 px-3 font-noto border-black-100 border rounded-sm cursor-pointer;

    p {
      @apply select-none;
    }

    ion-icon {
      @apply w-6 h-6 ml-auto;

      transition: transform ease-in-out 0.25s;
    }

    &.is-error {
      @apply border-error-500 bg-error-100;
    }
  }

  .calendar-picker-wrapper {
    @apply absolute p-3 bg-white rounded-sm shadow-lg;

    top: calc(100% + theme('spacing.1'));
    width: 296px; // 32 * 7 + 48 + 12 + 12
    opacity: 0;
    z-index: 10;
    outline: none;
    user-select: none;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.25s ease;

    &.active {
      opacity: 1;
      pointer-events: unset;
      transform: translateY(0);
    }

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }

  .message {
    @apply mt-2;
  }

  &:focus:not([disabled]) {
    .calendar-input {
      @apply border-black-900 border-2;

      ion-icon {
        transform: rotate(-180deg);
      }
    }
  }

  &[disabled] {
    @apply pointer-events-none;

    .calendar-input {
      @apply text-black-300 bg-disabled border-none;

      p,
      ion-icon {
        @apply text-black-300;
      }
    }
  }
}
</style>
