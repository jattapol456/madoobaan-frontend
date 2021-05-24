<template lang="pug">
  //- .management-page
  //-   section.mt-8
  //-     .block-content
  //-       .section-card.grid.grid-cols-4.gap-6(class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4")
  //-         Card(
  //-             v-for='item in recommendAnnounceList',
  //-             :key='item.id',
  //-             :logo='item.logo',
  //-             :review='item.review',
  //-             :ads='item.ads',
  //-             :likeIcon='item.likeIcon',
  //-             :coverPhoto='item.coverPhoto',
  //-             :type='item.type',
  //-             :topicName='item.topicName',
  //-             :salePrice='item.salePrice',
  //-             :startPrice='item.startPrice',
  //-             :subdistrict='item.subdistrict'
  //-             :district='item.district'
  //-             :province='item.province')
              
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Card from '@/components/menus/Card.vue'

export default defineComponent({
  // components: {
  //   Card,
  // },
})
</script>

