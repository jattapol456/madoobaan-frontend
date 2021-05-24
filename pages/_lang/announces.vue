<template lang="pug">
.management-page
  section.mt-20
    .block-content
      .card
        AnnounceBlogsSection

  section.mt-8
    .block-content
      .ads-carousel.flex.justify-center.items-center.w-full.h-full
        .first-ad
          img(src='https://source.unsplash.com/mIqyYpSNq3o/1600x900')
        .second-ad(class='block sm:hidden')
          img(src='https://source.unsplash.com/FWqWJC6leOA/1600x900')

  .section-Pagination.pt-10.flex.justify-center
    Pagination(:value='value', @change='handleChange')
      

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Pagination from '@/components/menus/Pagination.vue'
import Card from '@/components/menus/Card.vue'
import AnnounceBlogsSection from '@/components/sections/landing/AnnounceBlogsSection.vue'

export default defineComponent({
  components: {
    Card,
    AnnounceBlogsSection,
    Pagination,
  },
})
</script>

<style lang="scss" scoped>
.second-ad img {
  @apply p-2 h-64 object-cover;

  width: 500px;
}
.first-ad img {
  @apply p-2 h-64 object-cover;

  width: 500px;
}
</style>