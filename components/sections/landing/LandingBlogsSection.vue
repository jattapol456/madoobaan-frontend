<template lang="pug">
  Tab(@change="onTabChange" :currentTab="currentTab")
    template(v-slot:content)
      transition(name="fade")
        .grid.grid-cols-4.gap-6
          template(v-if="currentTab === 'อัพเดทล่าสุด'")
            Card(v-for="item in articleCards" :key="item.id"
              :img="item.img"
              :type="item.type"
              :title="item.title"
              :dateCreated="item.dateCreated")

          template(v-if="currentTab === 'รีวิวบ้าน'")
            Card(v-for="item in homeReviewCards" :key="item.id"
              :img="item.img"
              :type="item.type"
              :title="item.title"
              :dateCreated="item.dateCreated")

          template(v-if="currentTab === 'สาระน่ารู้'")
            Card(v-for="item in knowledgeCards" :key="item.id"
              :img="item.img"
              :type="item.type"
              :title="item.title"
              :dateCreated="item.dateCreated")

          template(v-if="currentTab === 'ไลฟ์สไตล์'")
            Card(v-for="item in lifestyleCards" :key="item.id"
              :img="item.img"
              :type="item.type"
              :title="item.title"
              :dateCreated="item.dateCreated")

          template(v-if="currentTab === 'ข่าวสาร'")
            Card(v-for="item in articleCards" :key="item.id"
              :img="item.img"
              :type="item.type"
              :title="item.title"
              :dateCreated="item.dateCreated")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Tab from '@/components/menus/Tab.vue'
import Card from '@/components/menus/Card.vue'

import {
  ARTICLE_CARDS,
  HOMEREVIEW_CARDS,
  KNOWLEDGE_CARDS,
  LIFESTYLE_CARDS,
} from '@/mocks/landing'

export default defineComponent({
  components: {
    Tab,
    Card,
  },

  data() {
    return {
      currentTab: 'อัพเดทล่าสุด',
    }
  },

  computed: {
    articleCards() {
      return ARTICLE_CARDS.slice(0, 4)
    },
    homeReviewCards() {
      return HOMEREVIEW_CARDS.slice(0, 4)
    },
    knowledgeCards() {
      return KNOWLEDGE_CARDS.slice(0, 4)
    },
    lifestyleCards() {
      return LIFESTYLE_CARDS.slice(0, 4)
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
