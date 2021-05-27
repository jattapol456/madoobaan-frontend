<template lang="pug">
  #app
    portal-target(name="modal")
    portal-target(name="editable-modal")
    TopNav.nav-post
    Nuxt
    Footer
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import TopNav from '@/components/menus/TopNav.vue'
import Footer from '@/components/menus/Footer.vue'

export default defineComponent({
  components: {
    TopNav,
    Footer,
  },
})
</script>

<style lang="scss" scoped>
.layout-content {
  display: flex;
  justify-content: center;
}
</style>
