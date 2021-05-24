<template lang="pug">
  TabToPageAnnounce(@change="onTabChange" :currentTab="currentTab")
    template(v-slot:content)
      transition(name="fade")
        .section-card.grid.grid-cols-4.gap-6(class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4")
          template(v-if="currentTab === 'ประกาศแนะนำ'")
            Card(
              v-for='item in recommendAnnounceList',
              :key='item.id',
              :logo='item.logo',
              :review='item.review',
              :ads='item.ads',
              :likeIcon='item.likeIcon',
              :coverPhoto='item.coverPhoto',
              :type='item.type',
              :topicName='item.topicName',
              :salePrice='item.salePrice',
              :startPrice='item.startPrice',
              :subdistrict='item.subdistrict'
              :district='item.district'
              :province='item.province')

          template(v-if="currentTab === 'ประกาศทั้งหมด'")
            Card(
              v-for='item in allAnnounceList',
              :key='item.id',
              :logo='item.logo',
              :bedroom='item.bedroom',
              :bathroom='item.bathroom',
              :ads='item.ads',
              :likeIcon='item.likeIcon',
              :coverPhoto='item.coverPhoto',
              :type='item.type',
              :topicName='item.topicName',
              :salePrice='item.salePrice',
              :startPrice='item.startPrice',
              :subdistrict='item.subdistrict'
              :district='item.district'
              :province='item.province')

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { ANNOUNCE_CARDS, PROJECT_CARDS } from '@/mocks/landing'
import { IinsertAnnounce } from '@/types/announces'
import { AnnouncesService } from '@/services'

import TabToPageAnnounce from '@/components/menus/TabToPageAnnounce.vue'
import Card from '@/components/menus/Card.vue'

export default defineComponent({
  components: {
    TabToPageAnnounce,
    Card,
  },

  data() {
    return {
      currentTab: 'ประกาศแนะนำ',
      perPage: 16,
      value: {
        page: 1,
        totalPages: 1,
      },

      recommendAnnounceList: [] as IinsertAnnounce[],
      recommendAnnounceList2: [] as IinsertAnnounce[],
      allAnnounceList: [] as IinsertAnnounce[],

      loading: {
        fetching: {
          recommendAnnounce: false,
          allAnnounce: false,
        },
      },
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

  mounted() {
    this.fetchAnnounce()
    this.fetchPaginationAnnounce()
    this.fetchAllAnnounce()
  },

  methods: {
    onTabChange(tab) {
      console.log(tab)
      this.currentTab = tab
    },
    fetchAnnounce() {
      this.loading.fetching.recommendAnnounce = true

      AnnouncesService.getAllAnnounces().then((res) => {
        this.recommendAnnounceList = res.slice().map((item) => {
          return {
            ...item,
            likeIcon: 'like',
            ads: 'Top Ad',
            review: 'มาดูบ้านรีวิว',
            startPrice: 'เริ่มต้นที่',
          }
        })
        this.loading.fetching.recommendAnnounce = false
      })
    },
    fetchAllAnnounce() {
      this.loading.fetching.allAnnounce = true

      AnnouncesService.getAllAnnounces().then((res) => {
        this.allAnnounceList = res.slice().map((item) => {
          return {
            ...item,
            likeIcon: 'like',
            review: 'มาดูบ้านรีวิว',
            startPrice: 'เริ่มต้นที่',
          }
        })
        this.loading.fetching.allAnnounce = false
      })
    },
  },
})
</script>
