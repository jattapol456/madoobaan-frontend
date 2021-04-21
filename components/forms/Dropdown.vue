<template lang="pug">
  .flex.flex-col.input-wrapper.w-full(ref="wrapper" :tabindex="disabled ? -1 : 0" :disabled="disabled" @focus="scrollToSelectedValue" @blur="hide")
    ValidationProvider(ref="provider" :name="name" :rules="rules" :mode="mode" :vid="vid" v-slot="{ errors }")
      input.hidden(:id="$attrs.id" :name="name" v-model="val")
      .dropdown-input(ref="dropdownInput" :class="{ 'is-error': error.length || errors.length }" @click.stop="toggle")
        p.whitespace-no-wrap(:class="{ 'text-black-200': !selectedItem }") {{ selectedItem ? selectedItem.content : placeholder }}
        ion-icon(name="chevron-down")
      
      .dropdown-menu(ref="dropdownMenu" :class="{ 'bottom': position.includes('bottom'), 'right': position.includes('right'), 'left': position.includes('left') }")
        .item(v-for="(option, i) in options" :key="i" :class="{ 'active': value == option.value }" @click="select(option)")
          p.font-normal {{ option.content }}

      .message(v-if="error || errors.length")
        p.font-noto.text-14px.leading-none.text-error-500(v-if="error || errors.length") {{ error || errors[0] }}

</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

import { ValidationProvider } from 'vee-validate'
import Dropdown, { DropdownOption } from '@/components/menus/Dropdown.vue'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  name: 'DropdownInput',

  components: {
    Dropdown,
    ValidationProvider,
  },

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

    placeholder: {
      type: String,
      default: 'Select Item',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    name: {
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

  emits: ['input'],

  setup(props) {
    const wrapper = ref<HTMLElement>()
    const dropdownInput = ref<HTMLElement>()
    const dropdownMenu = ref<HTMLElement>()
    const provider = ref<InstanceType<typeof ValidationProvider>>()
    const value = ref(props.value)

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      wrapper,
      dropdownInput,
      dropdownMenu,
      provider,
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

  computed: {
    selectedItem(): DropdownOption | undefined {
      return this.options.find((value) => value.value === this.val)
    },
  },

  methods: {
    select(option: DropdownOption) {
      this.val = option.value
      this.$emit('input', option.value)
      this.hide({ timeStamp: +new Date() })
    },

    toggle(e?: MouseEvent) {
      const timeStamp = e?.timeStamp ? e.timeStamp : +new Date()
      if (this.active) this.hide({ timeStamp, target: e?.target })
      else this.show({ timeStamp, target: e?.target })
    },

    show(e: Partial<MouseEvent>) {
      if (this.disabled) return

      if (
        !this.active &&
        (e.timeStamp || 0) - this.lastestEventTimeStamp >= 250
      ) {
        this.wrapper?.focus()
        this.active = true
        this.callerEl = e.target || null
      }
      this.lastestEventTimeStamp = e.timeStamp || 0
    },

    hide(e: Partial<MouseEvent>) {
      if (!this.wrapper) return
      this.wrapper.blur()
      this.active = false
      this.lastestEventTimeStamp = e.timeStamp || 0
      this.$nextTick().then(() => {
        this.provider?.validate()
      })
    },

    scrollToSelectedValue() {
      const activeItem =
        this.dropdownMenu?.querySelector('.active') ||
        this.dropdownMenu?.querySelector(':first-child')

      if (!activeItem) return

      this.dropdownMenu?.scrollTo({
        top:
          this.dropdownMenu?.scrollTop +
          activeItem!.getBoundingClientRect().top -
          this.dropdownMenu?.getBoundingClientRect().top -
          8,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  @apply relative;

  .dropdown-input {
    @apply flex items-center w-full h-10 px-3 font-noto bg-white border-black-100 border rounded-sm cursor-pointer;

    p {
      @apply select-none;
    }

    ion-icon {
      @apply w-6 h-6 ml-auto;

      transition: transform ease-in-out 0.25s;
    }

    &.is-error {
      @apply border-error-500 bg-error-100 #{!important};
    }
  }

  .message {
    @apply flex h-14px mt-2;

    top: 100%;
  }

  .dropdown-menu {
    @apply absolute h-auto max-h-64 bg-white shadow-lg rounded-sm overflow-auto;

    width: 100%;
    min-width: 200px;
    opacity: 0;
    outline: none;
    user-select: none;
    pointer-events: none;
    z-index: 11;
    transform: translateY(-10px);
    transition: all 0.25s ease;

    .item {
      @apply flex w-full h-10 px-4 items-center font-noto bg-white cursor-pointer;

      &:first-child {
        @apply mt-2;
      }

      &:last-child {
        @apply mb-2;
      }

      &:hover,
      &.active {
        @apply bg-backdrop;
      }

      &:active {
        @apply bg-disabled;
      }
    }

    &.right {
      right: 0;
    }

    &.left {
      left: 0;
    }

    &.bottom {
      top: calc(theme('spacing.10'));
    }
  }

  &:focus {
    @apply outline-none;

    .dropdown-input {
      @apply border-2 border-black-700 outline-none;

      ion-icon {
        transform: rotate(-180deg);
      }
    }

    .dropdown-menu {
      opacity: 1;
      pointer-events: unset;
      transform: translateY(0);
    }
  }

  &[disabled] {
    @apply pointer-events-none;

    .dropdown-input {
      @apply text-black-300 bg-disabled border-none;

      p,
      ion-icon {
        @apply text-black-300;
      }
    }
  }
}
</style>
