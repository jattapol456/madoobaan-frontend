<template lang="pug">
  button.button.is-square(@click="onClick" :class="{ 'bg-white': !active, 'bg-black-50': active, 'border-none': active }")
    ion-icon(v-if="!active" name="bookmark-outline")
    ion-icon.text-primary-500(v-else name="bookmark")
</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const active = ref(props.value)

    useExtractModelValue(props, (payload) => {
      active.value = payload
    })

    return {
      active,
    }
  },

  methods: {
    onClick() {
      this.active = !this.active
      this.$emit('input', this.active)
    },
  },
})
</script>
