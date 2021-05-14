<template lang="pug">
.management-page
  section.h-screen.bg-hero(style='background-image: url("https://www.madoobaan.com/wp-content/uploads/2021/03/bg-Header-3.jpg")')
    .block-content
      .title.h-full.w-full.flex.flex-col.justify-center
        .text-white.text-center
          h1 เว็บประกาศ ขาย เช่า บ้าน ที่ดิน ภาคเหนือ เชียงใหม่ เชียงราย
          h4 หากคุณกำลังมองหาบ้าน ที่ดิน ภาคเหนือ เชียงใหม่ เชียงราย เราช่วยคุณได้!
        .flex.mt-8.justify-center
          div(class="flex flex-col w-3/4")
            .flex.items-center.justify-center
            .search-zone.bg-white.w-full.p-3
              .grid.grid-cols-4.gap-4
                .search-project.flex.justify-between
                  Input(placeholder="พิมพ์โซน ชื่อโครงการ")
                  .w-10.h-10.bg-info-900.right-0
                    ion-icon(class="m-3" style="color: #FFFFFF" name="search")
                Dropdown(placeholder='ประเภทอสังหาริมทรัพย์' :options='dropdownType' v-model='seletedType')
                Dropdown(placeholder='จังหวัด' :options='dropdownProvinces' v-model='seletedProvinces')
                button.button.button-primary ค้นหา

  section.section-zones.mt-8
    .block-content
      .title-text
        h3 ค้นหาตามโซน
        .flex
          nuxt-link(to="/zones") ดูทั้งหมด
          ion-icon.mt-2(name='chevron-forward')
      .zones
        .img-container.max-w-full.flex.grid.grid-cols-6.grid-rows-2.gap-3.mt-10
          figure(v-for="item in subdistrictList")
            .zone-item.drop-shadow-lg
              img(:src='item.img')
              .zone-title
                figcaption
                  p {{ item.subdistrictName }}

  section.ads-carousel.mt-8
    .block-content.flex.justify-center.items-center
      .swiper-container
        swiper.swiper(:options="swiperOption")
          swiper-slide
            img(src='https://s359.kapook.com/pagebuilder/fc39e1ff-f08f-485a-bdd9-78040adbb0bb.jpg')
          swiper-slide
            img(src='https://s359.kapook.com/pagebuilder/db8f6318-2de0-4162-871b-b4a77e2d81c3.jpg')
          swiper-slide
            img(src='https://s359.kapook.com/pagebuilder/6d43f6bc-537f-404f-9cac-d51f43a6e679.jpg')
          .swiper-pagination(slot="pagination")


  section.recommend.mt-8
    .block-content
      .title-text
        h3 ประกาศแนะนำ
        .flex
          a ดูทั้งหมด
          ion-icon.mt-2(name='chevron-forward')
      .recommend
        .grid.grid-cols-4.gap-6(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4')
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

  section.announce.mt-8
    .block-content
      .title-text
        h3 ประกาศทั้งหมด
        .flex
          a ดูทั้งหมด
          ion-icon.mt-2(name='chevron-forward')
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
      .ads-carousel.flex.justify-center.items-center.w-full.h-full
        .first-ad
          img(src='https://source.unsplash.com/mIqyYpSNq3o/1600x900')
        .second-ad(class='block sm:hidden')
          img(src='https://source.unsplash.com/FWqWJC6leOA/1600x900')

  section.mt-8
    .block-content
      .ads-carousel.flex.justify-center.items-center.w-full.h-full
        .second-ad(class='hidden sm:block')
          img(src='https://source.unsplash.com/FWqWJC6leOA/1600x900')

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { DropdownOption } from '@/components/menus/Dropdown.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import Input from '@/components/forms/Input.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import Card from '@/components/menus/Card.vue'
import { AnnouncesService, ZonesService } from '@/services'
import { IinsertZone } from '@/types/zone'
import { IinsertAnnounce } from '@/types/announces'

export default defineComponent({
  components: {
    Input,
    Dropdown,
    Card,
    Swiper,
    SwiperSlide,
  },

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
          content: 'ที่ดิน',
          value: 'ที่ดิน',
        },
      ] as DropdownOption[],
      seletedType: null,

      subdistrictList: [] as IinsertZone[],
      recommendAnnounceList: [] as IinsertAnnounce[],
      allAnnounceList: [] as IinsertAnnounce[],

      loading: {
        fetching: {
          subdistrict: false,
          recommendAnnounce: false,
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
    this.fetchSubdistrict()
    this.fetchAnnounce()
  },

  methods: {
    fetchSubdistrict() {
      this.loading.fetching.subdistrict = true

      ZonesService.getSubDistrict().then((res) => {
        this.subdistrictList = res.slice(0, 8)

        this.loading.fetching.subdistrict = false
        console.log(this.subdistrictList)
      })
    },
    fetchAnnounce() {
      this.loading.fetching.recommendAnnounce = true
      this.loading.fetching.allAnnounce = true

      AnnouncesService.getAllAnnounces().then((res) => {
        this.recommendAnnounceList = res.slice(0, 4).map((item) => {
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

      AnnouncesService.getAllAnnounces().then((res) => {
        this.allAnnounceList = res.slice(0, 4)
      })
      this.loading.fetching.allAnnounce = false
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-hero {
  @apply bg-cover bg-center h-full w-full inset-0;
}
.block-content {
  height: 100%;
  align-items: center;
}
.title-text {
  @apply cursor-pointer flex items-center justify-between w-full;
  a {
    @apply no-underline text-5;
  }
}
figcaption {
  @apply absolute w-full bottom-0 bg-black-900 h-10 bg-opacity-50 rounded-b-md;
  p {
    @apply text-4 m-2 text-white whitespace-no-wrap overflow-hidden;

    text-overflow: ellipsis;
  }
}
figure figcaption {
  vertical-align: middle;
  border-style: none;
}
.zone-item {
  @apply relative;
  img {
    @apply w-full h-56 bg-center object-cover rounded-md;

    object-fit: cover;
  }
}
.first-ad img {
  @apply p-2 object-contain;

  width: 100%;
  height: 30vh;
}
.second-ad img {
  @apply p-2 object-contain;

  width: 100%;
  height: 30vh;
}
.img-container {
  min-width: 100px;
  overflow-x: auto;
  scroll-behavior: smooth;
  figure:nth-child(1) {
    @apply col-span-2;
  }

  figure:nth-child(3) {
    @apply col-span-2;
  }

  figure:nth-child(6) {
    @apply col-span-2;
  }

  figure:nth-child(8) {
    @apply col-span-2;
  }
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper {
  display: flex;
  width: 600px;
  height: 200px;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
