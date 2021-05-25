<template lang="pug">
.management-page
  section.mt-20
    .block-content
      .flex.flex-col.w-full
        .flex.items-center.justify-center.bg-primary-100.w-full.p-3
          div(class="w-full grid grid-cols-4 gap-4 md:grid-cols-1 sm:grid-cols-1")
            .search-project.flex
              Input(placeholder="ชื่อใบประกาศ")
              .w-10.h-10.bg-info-900.right-0
                ion-icon(class="m-3" style="color: #FFFFFF" name="search")
            Dropdown.type(placeholder='ประเภทอสังหาริมทรัพย์' :options='dropdownType' v-model='seletedType')
            Dropdown(placeholder='จังหวัด' :options='dropdownProvinces' v-model='seletedProvinces')
            button.button.button-primary(@click='searchPage') ค้นหา
      .card.mt-5

  section.announce.mt-8
    .block-content
      .title-text
        h3 ประกาศ
      .secondHandAnnouncement
        .grid.grid-cols-4.gap-6(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4')
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
            :subdistrict='item.subdistrict'
            :district='item.district'
            :province='item.province')

  section.mt-8
  .block-content
    .ads-carousel(class='flex-row flex justify-center items-center w-full h-full sm:flex-col xs:flex-col')
      .first-ad
        img(src='https://source.unsplash.com/mIqyYpSNq3o/1600x900')
      .second-ad
        img(src='https://source.unsplash.com/FWqWJC6leOA/1600x900')

  .section-Pagination.pt-10.flex.justify-center
    Pagination(:value='value', @change='handleChange')


</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { DropdownOption } from '@/components/menus/Dropdown.vue'

import Pagination from '@/components/menus/Pagination.vue'
import Card from '@/components/menus/Card.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import Input from '@/components/forms/Input.vue'
import { IinsertAnnounce } from '@/types/announces'
// import { AnnouncesService } from '@/services'
import { IinsertZone } from '@/types/zone'
import { AnnouncesService } from '@/services'

export default defineComponent({
  components: {
    Card,
    Pagination,
    Dropdown,
    Input,
  },
  layout: 'post',
  data() {
    return {
      dropdownProvinces: [
        {
          content: 'น่าน',
          value: 'น่าน',
        },
        {
          content: 'พะเยา',
          value: 'พะเยา',
        },
        {
          content: 'ลำปาง',
          value: 'ลำปาง',
        },
        {
          content: 'ลำพูน',
          value: 'ลำพูน',
        },
        {
          content: 'อุตรดิตถ์',
          value: 'อุตรดิตถ์',
        },
        {
          content: 'เชียงราย',
          value: 'เชียงราย',
        },
        {
          content: 'เชียงใหม่',
          value: 'เชียงใหม่',
        },
        {
          content: 'แพร่',
          value: 'แพร่',
        },
        {
          content: 'แม่ฮ่องสอน',
          value: 'แม่ฮ่องสอน',
        },
      ] as DropdownOption[],
      seletedProvinces: null,
      dropdownType: [
        {
          content: 'บ้าน',
          value: 'บ้าน',
        },
        {
          content: 'คอนโด',
          value: 'คอนโด',
        },
        {
          content: 'ที่ดิน',
          value: 'ที่ดิน',
        },
        {
          content: 'อพาร์ทเม้นท์',
          value: 'อพาร์ทเม้นท์',
        },
        {
          content: 'อาคาร',
          value: 'อาคาร',
        },
        {
          content: 'ทาวน์โฮม',
          value: 'ทาวน์โฮม',
        },
      ] as DropdownOption[],
      seletedType: null,

      subdistrictList: [] as IinsertZone[],
      allAnnounceList: [] as IinsertAnnounce[],

      loading: {
        fetching: {
          subdistrict: false,
          allAnnounce: false,
        },
      },

      swiperOption: {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          375: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        },
      },
      tabs: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'],
      currentTab: 'tab1',
    }
  },

  mounted() {
    this.fetchAnnounce()
  },

  methods: {
    fetchAnnounce() {
      this.loading.fetching.allAnnounce = true

      AnnouncesService.getAllAnnounces().then((res) => {
        this.allAnnounceList = res.slice()
      })
      this.loading.fetching.allAnnounce = false
    },
    searchPage() {
      this.$router.push('/th/announces')
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
