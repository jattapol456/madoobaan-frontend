<template lang="pug">
  section.mt-8.flex.space-x-5
    Card(v-for="item in announceCard.slice(0,3)" :key="item.id"
      :img="item.img"
      :title="item.title"
      :subtitle="item.subtitle"
      :startPrice="item.startPrice"
      :price="item.price"
      :location="item.location")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Card from '@/components/menus/Card.vue'
import { mapState } from 'vuex'
export default defineComponent({
  components: {
    Card,
  },
  computed: {
    ...mapState({
      brandsCard: (state) => state.base.brandsCard,
      announceCard: (state) => state.base.announceCard,
      projectCard: (state) => state.base.projectCard,
    }),
  },
})
</script>
