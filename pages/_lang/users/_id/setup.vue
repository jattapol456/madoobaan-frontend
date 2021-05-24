<template lang="pug">
  .management-page
    section
      .block-content
        UserProfile

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import UserProfile from '@/components/forms/UserProfile.vue'

export default defineComponent({
  components: {
    UserProfile,
  },
  layout: 'post',
})
</script>

<style lang="scss" scoped>
.button-primary {
  background: #2c72cf;
  color: white;
}
button {
  @apply border-info-500 text-info-500 w-full;
}

.addphone {
  cursor: pointer;
  color: #00aeef;
  font-weight: 900;
  text-decoration: none !important;
  &:hover {
    color: rgb(178, 137, 231);
  }
}

.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}
.relativeBox {
  position: relative;
}

.deletePhone {
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 0.7;
}
</style>
