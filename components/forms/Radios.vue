<template lang="pug">
  .radios.w-full
    Radio(v-for="(option, i) in options" :key="i" :name="name" :id="`${name}-${option.value}`" :value="option.value" :disabled="disabled" v-model="val") {{ option.label }}
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { uniqueId } from 'lodash'

import Radio from '@/components/forms/Radio.vue'

export type Option<T = string | number> = {
  label: string
  value: T
}

export default defineComponent({
  name: 'Radios',

  components: {
    Radio,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: [String, Boolean],
      default: 'option-1',
    },

    name: {
      type: String,
      default: `${uniqueId('radio-')}`,
    },

    options: {
      type: Array as PropType<Option[]>,
      default: () => [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
  },

  data() {
    return {
      val: 'option-1',
    }
  },

  watch: {
    val() {
      this.$emit('input', this.val)
      this.$emit('change')
    },

    value: {
      handler(value) {
        this.val = value
      },

      immediate: true,
    },
  },
})
</script>
