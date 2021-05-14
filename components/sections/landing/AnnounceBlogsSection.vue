<template lang="pug">
  TabToPageAnnounce(@change="onTabChange" :currentTab="currentTab")
    template(v-slot:content)
      transition(name="fade")
        .section-card.grid.grid-cols-4.gap-6(class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4")
          template(v-if="currentTab === 'ประกาศแนะนำ'")
            card(v-for="item in projectCards" :key="item.id" 
              :review="item.review"
              :ads="item.ads"
              :likeIcon="item.likeIcon"
              :img="item.img"
              :type="item.type"
              :estateName="item.estateName"
              :startPrice="item.startPrice"
              :price="item.price"
              :location="item.location")

          template(v-if="currentTab === 'ซื้อบ้านมือสอง'")
            Card(v-for="item in announceCards" :key="item.id" 
              :description="item.description"
              :img="item.img"
              :ads="item.ads"
              :likeIcon="item.likeIcon"
              :type="item.type"
              :estateName="item.estateName"
              :price="item.price"
              :location="item.location")

          template(v-if="currentTab === 'เช่า/หอพัก'")
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

import TabToPageAnnounce from '@/components/menus/TabToPageAnnounce.vue'
import Card from '@/components/menus/Card.vue'

import { ANNOUNCE_CARDS, PROJECT_CARDS } from '@/mocks/landing'

export default defineComponent({
  components: {
    TabToPageAnnounce,
    Card,
  },

  data() {
    return {
      currentTab: 'ประกาศแนะนำ',
    }
  },

  computed: {
    announceCards() {
      return ANNOUNCE_CARDS.slice()
    },
    projectCards() {
      return PROJECT_CARDS.slice()
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
