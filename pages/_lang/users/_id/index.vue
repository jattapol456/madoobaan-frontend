<template lang="pug">
  .management-page
    section
      .block-content
        UserProfile

</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

import { Store } from '@/types/store'
import UserProfile from '@/components/forms/UserProfile.vue'

export default defineComponent({
  components: {
    UserProfile,
  },
  layout: 'post',
  setup() {
    const { route, store } = useContext()

    const paramId = route.value.params.id
    const id = computed(() => {
      return paramId !== 'me'
        ? parseInt(paramId)
        : (store as Store).getters['modules/me/profile']?.id
    })

    return {
      id,
    }
  },

  mounted() {
    this.auth$?.subscribe(
      () => {
        // Do something
      },
      () => {
        if (!this.id) this.$router.push({ name: 'lang' })
      }
    )
  },
})
</script>
