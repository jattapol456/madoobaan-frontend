<template lang="pug">
.flex.flex-col.input-wrapper.w-full(
  :class='{ "is-disabled": disabled, "has-prefix-icon": prefixIcon, "has-suffix-icon": suffixIcon, "has-prefix": prefix, "has-suffix": suffix }'
)
  .prefix(v-if='prefix || prefixIcon')
    ion-icon(v-if='prefixIcon', :name='prefixIcon')
    p.font-noto(v-else-if='prefix') {{ prefix }}
  .suffix(v-if='suffix || suffixIcon')
    ion-icon(v-if='suffixIcon', :name='suffixIcon')
    p.font-noto(v-else-if='suffix') {{ suffix }}

  ValidationProvider(
    :name='name',
    :rules='rules',
    :mode='mode',
    :vid='vid',
    v-slot='{ errors }'
  )
    .main-input
      input(
        ref='input',
        v-bind='$attrs',
        v-on='listener',
        :readonly='readonly',
        :name='name',
        :disabled='disabled',
        :class='{ "is-error": error.length || errors.length }',
        v-model='model'
      )
      label.lalabel(:class='{ "is-error": error.length || errors.length }') {{labels}}


    .message(v-if='error || descriptions || errors.length')
      p.font-noto.text-14px.leading-none.text-error-500(
        v-if='error || errors.length'
      ) {{ error || errors[0] }}
      p.font-noto.text-14px.leading-none.text-black-300.ml-auto(
        v-if='descriptions'
      ) {{ descriptions }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { ValidationProvider } from 'vee-validate'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  name: 'Input',

  components: {
    ValidationProvider,
  },

  inheritAttrs: false,

  props: {
    value: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: undefined,
    },

    error: {
      type: String,
      default: '',
    },

    descriptions: {
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

    labels: {
      type: String,
      default: '.',
    },

    vid: {
      type: String,
      default: '',
    },

    prefixIcon: {
      type: String,
      default: null,
    },

    suffixIcon: {
      type: String,
      default: null,
    },

    prefix: {
      type: String,
      default: null,
    },

    suffix: {
      type: String,
      default: null,
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['input', 'delete'],

  setup(props) {
    const input = ref<InstanceType<typeof HTMLFormElement>>()
    const value = ref(props.value)

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      val: value,
      input,
    }
  },

  computed: {
    model: {
      get(): string {
        return this.val
      },

      set(value: string) {
        this.val = value
        this.$emit('input', value)
      },
    },

    listener(): Record<string, Function | Function[]> {
      return {
        ...this.$listeners,
        input: () => {},
      }
    },
  },

  methods: {
    focus() {
      if (this.readonly) return
      this.input?.focus()
    },

    // onDelete() {
    //   this.$emit('delete')
    // }
  },
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  @apply relative mb-3;
  

  input {
    @apply w-full px-3 font-noto border-black-100 border rounded-sm;

    height: 3.5rem;

    &::placeholder {
      @apply text-black-200;
    }

    &:focus {
      @apply border-2 border-black-700 outline-none;
    }

    &:focus + .lalabel {
      color: #171d2a;
    }

    &:disabled {
      @apply text-black-300 bg-disabled border-none;
    }

    &.is-error {
      @apply border-error-500;
    }

    &[readonly] {
      @apply cursor-not-allowed;
    }
  }

  .prefix,
  .suffix {
    @apply absolute flex items-center px-2 h-10 bg-white;

    top: 2px;
    height: calc(theme('spacing.10') - 4px);
    z-index: 1;

    ion-icon {
      @apply text-6;
    }
  }

  .prefix {
    left: 2px;
  }

  .suffix {
    right: 2px;
  }

  .message {
    @apply flex h-14px mt-2;
  }

  &.has-prefix-icon {
    input {
      @apply pl-10;
    }
  }

  &.has-suffix-icon {
    input {
      @apply pr-10;
    }
  }

  &.is-disabled {
    .prefix,
    .suffix {
      @apply text-black-300 bg-disabled;
    }
  }

  .main-input {
    position: relative;
  }
  .lalabel {
    left: 10px;
    top: 1px;
    color: #7e7e7e;
    position: absolute;
    background: #fff;
    transform: translate(0, -50%);
    padding: 1px 5px;
    &.is-error {
      color: red;
    }
  }
}
</style>
