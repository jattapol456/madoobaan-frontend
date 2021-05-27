<template lang="pug">
  TabViewPost(@change="onTabChange" :currentTab="currentTab")
    template(v-slot:content)
      transition(name="fade")
        .mt-5
          template(v-if="currentTab === 'ประกาศของฉัน'")
            .menus.flex.justify-between.w-full
              .radios
                RadioForm(
                  :options='online',
                  name='online',
                  :value="form.online"
                  @input='onOnlineChange'
                )
              .dropdown
                .grid.grid-cols-3.gap-3
                  Dropdown(placeholder="ทั้งหมด" :options='dropdownAnnounceType' v-model='seletedAnnounceType')
                  Dropdown(placeholder="อสังหาฯทั้งหมด" :options='dropdownType' v-model='seletedType')
                  Dropdown(placeholder="เรียงจากค่าเริ่มต้น" :options='dropdownSort' v-model='seletedSort')
            .w-full
              ViewpostCard(
                v-for='item in allAnnounceList2',
                :key='item.id',
                :idCard='item.id',
                :coverPhoto='item.coverPhoto',
                :type='item.type',
                :topicName='item.topicName',
                :salePrice='item.salePrice',)

            .section-Pagination.pt-10.flex.justify-center
              Pagination(:value='value', @change='handleChangeAnnounce')

          template(v-if="currentTab === 'ประกาศที่ดูล่าสุด'")
          template(v-if="currentTab === 'ประกาศที่ชื่นชอบ'")

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import TabViewPost from '@/components/menus/TabViewPost.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import ViewpostCard from '@/components/menus/ViewpostCard.vue'
import RadioForm from '@/components/forms/RadioForm.vue'
import Pagination from '@/components/menus/Pagination.vue'
import { IinsertAnnounce } from '@/types/announces'
import { AnnouncesService } from '@/services'
import { DropdownOption } from '@/components/menus/Dropdown.vue'

export default defineComponent({
  components: {
    TabViewPost,
    ViewpostCard,
    Dropdown,
    RadioForm,
    Pagination,
  },
  data() {
    return {
      form: {
        online: '',
      },
      perPage: 5,
      value: {
        page: 1,
        totalPages: 1,
      },
      online: [
        {
          label: 'ออนไลน์',
          content: 'ออนไลน์',
          value: 'ออนไลน์',
        } as any,
      ],
      dropdownAnnounceType: [
        {
          content: 'ทั้งหมด',
          value: 'ทั้งหมด',
        },
        {
          content: 'ขาย',
          value: 'ขาย',
        },
      ] as DropdownOption[],
      seletedAnnounceType: null,
      dropdownType: [
        {
          content: 'อสังหาฯทั้งหมด',
          value: 'อสังหาฯทั้งหมด',
        },
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
      dropdownSort: [
        {
          content: 'เรียงจากค่าเริ่มต้น',
          value: 'เรียงจากค่าเริ่มต้น',
        },
        {
          content: 'ราคาต่ำสุด',
          value: 'ราคาต่ำสุด',
        },
      ] as DropdownOption[],
      seletedSort: null,
      currentTab: 'ประกาศของฉัน',

      allAnnounceList: [] as IinsertAnnounce[],
      allAnnounceList2: [] as IinsertAnnounce[],

      loading: {
        fetching: {
          allAnnounce: false,
        },
      },
    }
  },
  mounted() {
    this.fetchAnnounce()
  },
  methods: {
    onTabChange(tab) {
      console.log(tab)
      this.currentTab = tab
    },
    handleChangeAnnounce(newPage) {
      this.value.page = newPage
      this.allAnnounceList2 = this.allAnnounceList.slice(
        (this.value.page - 1) * this.perPage,
        this.value.page * this.perPage
      )
    },
    fetchAnnounce() {
      this.loading.fetching.allAnnounce = true

      AnnouncesService.getAllAnnounces().then((res) => {
        this.allAnnounceList = res
        this.value.totalPages = Math.ceil(
          this.allAnnounceList.length / this.perPage
        )
        this.allAnnounceList2 = this.allAnnounceList.slice(
          (this.value.page - 1) * this.perPage,
          this.value.page * this.perPage
        )
        this.loading.fetching.allAnnounce = false
      })
    },
  },
})
</script>
<style lang="scss" scoped>
.dropdown {
  width: 70%;
}
</style>
