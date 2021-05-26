<template lang="pug">
.management-page
  section.mt-20
    .block-content
      .flex.flex-col.w-full
        .flex.items-center.justify-center.bg-primary-100.w-full.p-3
          div(class="w-full grid grid-cols-4 gap-4 md:grid-cols-1 sm:grid-cols-1")
            .search-project.flex
              Input(placeholder="ชื่อใบประกาศ" v-model="topicName" :value="topicName")
              .w-10.h-10.bg-info-900.right-0
                ion-icon(class="m-3" style="color: #FFFFFF" name="search")
            Dropdown.type(placeholder='ประเภทอสังหาริมทรัพย์' :options='dropdownType' v-model='seletedType')
            Dropdown(placeholder='จังหวัด' :options='dropdownProvinces' v-model='seletedProvinces')
            button.button.button-primary(@click='fetchSearch()') ค้นหา


      .card.mt-5(v-if="loading.fetching.announce == false")
        .grid.grid-cols-4.gap-6(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4')
          Card(
            v-for='item in announceList2',
            :key='item.id',
            :idCard='item.id',
            :logo='item.logo',
            :bedroom='item.bedroom',
            :bathroom='item.bathroom',
            :review='item.review',
            :ads='item.ads',
            :likeIcon='item.likeIcon',
            :coverPhoto='item.coverPhoto',
            :type='item.type',
            :topicName='item.topicName',
            :salePrice='item.salePrice',
            :startPrice='item.startPrice',
            :subDistrictName='item.subDistrictName'
            :districtName='item.districtName'
            :provinceName='item.provinceName')

  section.mt-8
  .block-content
    .ads-carousel(class='flex-row flex justify-center items-center w-full h-full sm:flex-col xs:flex-col')
      .first-ad
        img(src='https://source.unsplash.com/mIqyYpSNq3o/1600x900')
      .second-ad
        img(src='https://source.unsplash.com/FWqWJC6leOA/1600x900')

  .section-Pagination.pt-10.flex.justify-center
    Pagination(:value='value', @change='handleChangeAnnounce')


</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { DropdownOption } from '@/components/menus/Dropdown.vue'

import Pagination from '@/components/menus/Pagination.vue'
import Card from '@/components/menus/Card.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import Input from '@/components/forms/Input.vue'
import { AnnouncesService } from '@/services'
import { IinsertAnnounce } from '@/types/announces'

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
      perPage: 16,
      value: {
        page: 1,
        totalPages: 1,
      },
      topicName: '',
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
      seletedProvinces: '',
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
      seletedType: '',
      announceList: [] as IinsertAnnounce[],
      announceList2: [] as IinsertAnnounce[],
      loading: {
        fetching: {
          announce: false,
        },
      },
    }
  },
  mounted() {
    console.log(this.$route.query.name)

    if (this.$route.query.type !== 'null') {
      this.seletedType = this.$route.query.type.toString()
    }
    if (this.$route.query.provinceName !== 'null') {
      this.seletedProvinces = this.$route.query.provinceName.toString()
    }
    if (this.$route.query.name) {
      this.topicName = this.$route.query.name.toString()
    }
    this.fetchSearch()
  },
  methods: {
    handleChangeAnnounce(newPage) {
      this.value.page = newPage
      this.announceList2 = this.announceList.slice(
        (this.value.page - 1) * this.perPage,
        this.value.page * this.perPage
      )
    },
    fetchSearch() {
      console.log(this.topicName)
      AnnouncesService.searchAnnounces(
        this.seletedType,
        this.seletedProvinces,
        this.topicName
      ).then((res) => {
        this.announceList = res.map((item) => {
          return {
            ...item,
            likeIcon: 'like',
            startPrice: 'เริ่มต้นที่',
          }
        })
        this.value.totalPages = Math.ceil(
          this.announceList.length / this.perPage
        )
        this.announceList2 = this.announceList.slice(
          (this.value.page - 1) * this.perPage,
          this.value.page * this.perPage
        )
        this.loading.fetching.announce = false
      })
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
