<template lang="pug">
.management-page
  section.section-hero.h-screen.bg-hero(style="background-image: url('https://www.madoobaan.com/wp-content/uploads/2021/03/bg-Header-3.jpg');")
    .block-content
      .title.h-full.w-full.flex.flex-col.justify-center
        .text-white.text-center
          h1 เว็บประกาศ ขาย เช่า บ้าน ที่ดิน ภาคเหนือ เชียงใหม่ เชียงราย
          h4 หากคุณกำลังมองหาบ้าน ที่ดิน ภาคเหนือ เชียงใหม่ เชียงราย เราช่วยคุณได้!
        .flex.mt-8.justify-center
          .flex.flex-col
            .flex.items-center.items-center.justify-items-center.justify-center
              .button-group.flex.text-white.bg-black-900.rounded-full.py-1.px-3
                .button.rounded-full.py-3.px-6 ซื้อโครงการใหม่
                .button(class="button-house transform hover:scale-110 motion-reduce:transform-none bg-success-500 rounded-full py-3 px-6") ซื้อบ้านมือสอง
                .button.rounded-full.py-3.px-6 เช่า/หอพัก
            .search-zone
              .bg-primary-500.h-auto.w-auto.p-3.mt-3
                grid(class="h-20 grid grid-flow-col grid-cols-3 grid-rows-2 gap-3")
                  Dropdown(placeholder="จังหวัด" :options="dropdownProvinces" v-model="seletedProvinces")
                  Dropdown(placeholder="ประเภทอสังหาริมทรัพย์")
                  Dropdown(placeholder="อำเภอ")
                  Dropdown(placeholder="จำนวนห้องนอน")
                  Dropdown(placeholder="ตำบล")
                  Input(placeholder="ราคา")
                .button.mt-5 ค้นหา

  section.section-zone.mt-8
    .block-content
      .title-text
        h3 ค้นหาตามโซน
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .img-container.justify-between.flex.flex-none.gap-3.mt-10
        .left-container(class="grid grid-cols-3 gap-3")
          figure.col-span-2
            .zone-item.drop-shadow-lg
              img(src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03002390_1.jpeg")
              .zone-title
                figcaption
                  p วัดร่องขุ่น จ.เชียงราย
          figure
            .zone-item.drop-shadow-lg
              img(src="https://eqgroup.co.th/wp-content/uploads/2020/08/48.%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84-%E0%B8%9B%E0%B8%81-scaled-1-980x551.jpg")
              .zone-title
                figcaption
                  p ไร่บุญรอด จ.เชียงราย
          figure
            .zone-item.drop-shadow-lg
              img(src="https://eqgroup.co.th/wp-content/uploads/2020/08/%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9E%E0%B8%A4%E0%B8%81%E0%B8%A9%E0%B9%8C.jpg")
              .zone-title
                figcaption
                  p อุทยานหลวงราชพฤกษ์ จ.เชียงใหม่
          figure.col-span-2
            .zone-item.drop-shadow-lg
              img(src="https://eqgroup.co.th/wp-content/uploads/2020/08/%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%A1%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7.jpg")
              .zone-title
                figcaption
                  p หล่มภูเขียว จ.ลำปาง
        .right-container(class="grid grid-cols-3 gap-3")
          figure.col-span-2
            .zone-item.drop-shadow-lg
              img(src="https://eqgroup.co.th/wp-content/uploads/2020/08/Pang-Ung-9.jpg")
              .zone-title
                figcaption
                  p ปางอุ๋ง จ.แม่ฮ่องสอน
          figure
            .zone-item.drop-shadow-lg
              img(src="https://eqgroup.co.th/wp-content/uploads/2020/08/Doi-Inthanon-ChiangMai-Traveloka-1.jpg")
              .zone-title
                figcaption
                  p อุทยานแห่งชาติดอยอินทนนท์ จ.เชียงใหม่

          figure
            .zone-item.drop-shadow-lg
              img(src="https://eqgroup.co.th/wp-content/uploads/2020/08/55555.jpg")
              .zone-title
                figcaption
                  p ล่องแก่งลำน้ำว้า จ.น่าน

          figure.col-span-2
            .zone-item.drop-shadow-lg
              img(src="https://s359.kapook.com/pagebuilder/fc39e1ff-f08f-485a-bdd9-78040adbb0bb.jpg")
              .zone-title
                figcaption
                  p บ้านแม่กำปอง จ.เชียงใหม่

  section.ads-carousel
    .block-content.flex.justify-center.items-center
      .banner
        splide(:options="options")
          splide-slide
            img(src="https://s359.kapook.com/pagebuilder/fc39e1ff-f08f-485a-bdd9-78040adbb0bb.jpg")
          splide-slide
            img(src="https://s359.kapook.com/pagebuilder/db8f6318-2de0-4162-871b-b4a77e2d81c3.jpg")
          splide-slide
            img(src="https://s359.kapook.com/pagebuilder/6d43f6bc-537f-404f-9cac-d51f43a6e679.jpg")

  section.project.mt-8
    .block-content
      .title-text
        h3 โครงการแนะนำ
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .card
        .grid.grid-cols-4.gap-6(class="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4")
          Card(v-for="item in projectCards" :key="item.id"
            :logo="item.logo"
            :review="item.review"
            :ads="item.ads"
            :likeIcon="item.likeIcon"
            :img="item.img"
            :type="item.type"
            :estateName="item.estateName"
            :startPrice="item.startPrice"
            :price="item.price"
            :location="item.location")

  section.announce.mt-8
    .block-content
      .title-text
        h3 ประกาศมือสอง
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .card
        .grid.grid-cols-4.gap-6(class="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4")
          Card(v-for="item in announceCards" :key="item.id"
            :description="item.description"
            :img="item.img"
            :ads="item.ads"
            :likeIcon="item.likeIcon"
            :type="item.type"
            :estateName="item.estateName"
            :price="item.price"
            :location="item.location")

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

  section.projectBrand.mt-8
    .block-content
      .title-text
        h3 แบรนด์โครงการ
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .card
        splide(:options="brandsOptions")
          splide-slide(v-for="item in brandsCards" :key="item.id")
            BrandsCard(
              :img="item.img")

  section.mt-8
    .block-content
      .ads-carousel.flex.justify-center.items-center.w-full.h-full
        .first-ad
          img(src="https://source.unsplash.com/mIqyYpSNq3o/1600x900")
        .second-ad
          img(src="https://source.unsplash.com/FWqWJC6leOA/1600x900")

  section.mt-8
    .block-content
      .title-text
        h3 บทความ
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .card
        LandingBlogsSection

  section.mt-8
    .block-content
      .title-text
        h3 วิดีโอรีวิวโครงการ
        .flex
          a ดูทั้งหมด
          ion-icon(class="mt-2" name="chevron-forward")
      .card
        .grid.grid-cols-4.gap-6(class="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4")
          Card(v-for="item in articleCards" :key="item.id"
            :img="item.img"
            :type="item.type"
            :title="item.title"
            :dateCreated="item.dateCreated")

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Input from '@/components/forms/Input.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import Card from '@/components/menus/Card.vue'
import BrandsCard from '@/components/menus/BrandsCard.vue'
import LandingBlogsSection from '@/components/sections/landing/LandingBlogsSection.vue'

import {
  PROJECT_CARDS,
  ANNOUNCE_CARDS,
  BRAND_CARDS,
  ARTICLE_CARDS,
  HOMEREVIEW_CARDS,
  KNOWLEDGE_CARDS,
  LIFESTYLE_CARDS,
} from '@/mocks/landing'
import { ZonesService } from '@/services'

export default defineComponent({
  components: {
    Input,
    Dropdown,
    Card,
    BrandsCard,
    LandingBlogsSection,
  },

  data() {
    return {
      options: {
        rewind: true,
        width: 800,
        perPage: 1,
        autoplay: false,
        pauseOnHover: false,
        arrows: 'slider',
      },
      brandsOptions: {
        rewind: false,
        width: 1000,
        perPage: 4,
        pauseOnHover: false,
        arrows: 'slider',
        pagination: false,
      },
      tabs: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'],
      currentTab: 'tab1',
    }
  },

  computed: {
    projectCards() {
      return PROJECT_CARDS
    },
    announceCards() {
      return ANNOUNCE_CARDS
    },
    brandsCards() {
      return BRAND_CARDS
    },
    articleCards() {
      return ARTICLE_CARDS
    },
    homeReviewCards() {
      return HOMEREVIEW_CARDS
    },
    knowledgeCards() {
      return KNOWLEDGE_CARDS
    },
    lifestyleCards() {
      return LIFESTYLE_CARDS
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

<style lang="scss" scoped>
.bg-hero {
  @apply bg-cover bg-center h-full w-full inset-0 z-10;
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
    @apply w-full h-56 bg-center bg-cover rounded-md;

    object-fit: cover;
  }
}
.first-ad img {
  @apply p-2 h-64 object-cover;

  width: 500px;
}
.second-ad img {
  @apply p-2 h-64 object-cover;

  width: 500px;
}
@media only screen and (max-width: 1250px) {
  .right-container {
    figure {
      @apply hidden;
    }
  }
}
.splide {
  @apply mt-12;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    justify-content: center;
    align-content: center;
    background-position: center;
  }
}
.splide__slide {
  @apply flex justify-center items-center;

  height: 200px;
  margin-top: 8px;
}
.splide__pagination {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
