<template lang="pug">
.management-page
  section.Rent-dorm.mt-8
    .block-content
      .title-text
        h3 เช่า/หอพัก
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .card
        .grid.grid-cols-4.gap-6(class="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4")
          Card(v-for="item in announceCards" :key="item.id"
            :img="item.img"
            :likeIcon="item.likeIcon"
            :estateName="item.estateName"
            :startPrice="item.startPrice"
            :price="item.price"
            :location="item.location")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Card from '@/components/menus/Card.vue'

export default defineComponent({
  components: {
    Card,
  },
})
</script>
