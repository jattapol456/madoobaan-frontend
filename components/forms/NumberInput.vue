<template lang="pug">
  Input(ref="input" :maxlength="maxlength" :min="min" :max="max" :name="name" :error="error" :descriptions="descriptions" :mode="mode" :rules="rules" :vid="vid" v-model="model")
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import Input from './Input.vue'

export default defineComponent({
  name: 'NumberInput',

  components: {
    Input,
  },

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

    maxlength: {
      type: String,
      default: '10',
    },

    min: {
      type: Number,
      default: -Infinity,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  setup(props) {
    const input = ref<InstanceType<typeof Input>>()
    const value = ref(props.value.toString())

    useExtractModelValue(props, (payload) => {
      value.value = payload.toString()
    })

    return {
      input,
      val: value,
    }
  },

  computed: {
    model: {
      get(): string {
        return this.val
      },

      set(value: string) {
        if (value === this.val) return

        try {
          this.val = value.replace(/\D/g, '')
          this.input!.model = this.val
        } catch {}

        this.$emit('input', this.val)
      },
    },
  },
})
</script>
