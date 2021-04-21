<template lang="pug">
  .checkboxes(role="radiogroup")
    Checkbox(v-for="(option, i) in options" :key="i" :name="name" :id="`${name}-${option.value}`" :value="option.value" :disabled="disabled" v-model="val") {{ option.label }}
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import Checkbox from '@/components/forms/Checkbox.vue'
import { uniqueId } from 'lodash'
import { Option } from './Radios.vue'

export default defineComponent({
  name: 'Checkboxes',

  components: {
    Checkbox,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Array as PropType<string[]>,
      default: false,
    },

    name: {
      type: String,
      default: `${uniqueId('checkbox-')}`,
    },

    options: {
      type: Array as PropType<Option[]>,
      default: () => [
        {
          label: 'Check 1',
          value: 'check-1',
        },
        {
          label: 'Check 2',
          value: 'check-2',
        },
      ],
    },
  },

  data() {
    return {
      val: 'check-1',
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
