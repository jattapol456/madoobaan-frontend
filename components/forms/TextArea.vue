<template lang="pug">
  .flex.flex-col.input-wrapper.w-full(:class="$attrs.class")
    ValidationProvider(:name="name" :rules="rules" :mode="mode" :vid="vid" v-slot="{ errors }")
      textarea(ref="textarea" v-bind="$attrs" :name="name" :class="{ 'is-error': error.length || errors.length }" v-model="model")

      .message(v-if="error || descriptions || errors.length")
        p.font-noto.text-14px.leading-none.text-error-500(v-if="error || errors.length") {{ error || errors[0] }}
        p.font-noto.text-14px.leading-none.text-black-300.ml-auto(v-if="descriptions") {{ descriptions }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { ValidationProvider } from 'vee-validate'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  name: 'Textarea',

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
      default: '',
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

    vid: {
      type: String,
      default: '',
    },
  },

  emits: ['input'],

  setup(props) {
    const textarea = ref<InstanceType<typeof HTMLElement>>()
    const value = ref(props.value)

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      val: value,
      textarea,
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
  },

  methods: {
    focus() {
      this.textarea?.focus()
    },
  },
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  @apply relative;

  textarea {
    @apply w-full h-10 px-3 py-2 font-noto border-black-100 border rounded-sm min-h-24;

    &::placeholder {
      @apply text-black-200;
    }

    &:focus {
      @apply border-2 border-black-700 outline-none;
    }

    &:disabled {
      @apply text-black-300 bg-disabled border-none;
    }

    &.is-error {
      @apply border-error-500 bg-error-100;
    }
  }

  .message {
    @apply flex h-14px;
  }
}
</style>
