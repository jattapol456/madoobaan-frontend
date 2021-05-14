<template lang="pug">
.brandsCard(class="border-black-200 border-2 p-4 bg-white")
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
.brandsCard {
  width: 200px;
  height: 200px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
