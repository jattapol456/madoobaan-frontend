<template lang="pug">
  Input(ref="input" v-bind="$attrs" :name="name" :error="error" :descriptions="descriptions" :mode="mode" :rules="rules" :vid="vid" v-model="model")
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Cleave from 'cleave.js'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import Input from './Input.vue'

export default defineComponent({
  name: 'PriceInput',

  components: {
    Input,
  },

  props: {
    value: {
      type: Number,
      default: 0,
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

  setup(props) {
    const input = ref<InstanceType<typeof Input>>()
    const value = ref(props.value.toLocaleString())

    useExtractModelValue(props, (payload) => {
      value.value = payload.toLocaleString()
    })

    return {
      input,
      val: value,
    }
  },

  data() {
    return {
      cleave: null as Cleave | null,
    }
  },

  computed: {
    model: {
      get(): string {
        return this.val
      },

      set(value: string) {
        this.val = value
        this.$emit('input', parseFloat(value.split(',').join('')) || 0)
      },
    },
  },

  mounted() {
    this.cleave = new Cleave(this.input?.input!, {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
    })
  },
})
</script>
