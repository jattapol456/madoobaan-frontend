<template lang="pug">
.management-page
  section.mt-20
    .block-content
      .card
        AnnounceBlogsSection

  section.mt-8
  .block-content(class="sm:grid-cols-1 md:grid-cols-1")
    .ads-carousel.flex.justify-center.items-center.w-full.h-full.grid
      .first-ad
        img(src="https://source.unsplash.com/mIqyYpSNq3o/1600x900")
      .second-ad
        img(src="https://source.unsplash.com/FWqWJC6leOA/1600x900")

  .section-Pagination.pt-10.flex.justify-center
    Pagination(:value='value', @change='handleChange')
      

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Pagination from '@/components/menus/Pagination.vue'
import Card from '@/components/menus/Card.vue'
import AnnounceBlogsSection from '@/components/sections/landing/AnnounceBlogsSection.vue'

import {
  PROJECT_CARDS,
  ANNOUNCE_CARDS,
  BRAND_CARDS,
  ARTICLE_CARDS,
  HOMEREVIEW_CARDS,
  KNOWLEDGE_CARDS,
  LIFESTYLE_CARDS,
} from '@/mocks/landing'

export default defineComponent({
  components: {
    Card,
    AnnounceBlogsSection,
    Pagination,
  },

  tabs: ['tab1', 'tab2', 'tab3'],
  currentTab: 'tab1',

  computed: {
    projectCards() {
      return PROJECT_CARDS
    },
    announceCards() {
      return ANNOUNCE_CARDS
    },
    brandsCards() {
      return BRAND_CARDS
    },
    articleCards() {
      return ARTICLE_CARDS
    },
    homeReviewCards() {
      return HOMEREVIEW_CARDS
    },
    knowledgeCards() {
      return KNOWLEDGE_CARDS
    },
    lifestyleCards() {
      return LIFESTYLE_CARDS
    },
  },

  methods: {
    onTabChange(tab) {
      console.log(tab)
      this.currentTab = tab
    },
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