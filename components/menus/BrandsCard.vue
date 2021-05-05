<template lang="pug">
section.card-section.overflow-hidden.h-full
  .card(class="bg-white border-black-200 border-2 p-5 w-full h-full")
    .card-image.w-full.h-full
      img(:src="img")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    img: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.card-image {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
