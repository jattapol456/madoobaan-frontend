<template lang="pug">
.management-page
  section
    .mt-16.flex.justify-between
      .bg.object-cover
        img.imgCover(:src='posts.coverPhoto')
      .row.grid.grid.grid-cols-2.grid-rows-2
        //- img(:src='posts.photo')
        img(:src='posts.coverPhoto')
        img(:src='posts.coverPhoto')
        img(:src='posts.coverPhoto')
        img(:src='posts.coverPhoto')

  section.mt-8
    .block-content

    .header.mt-5.grid.grid-cols-3
      .showdetail.col-start-1.col-span-2
        h1.text-2xl {{ posts.topicName }}
        span.colortext.text-xl.mt-2 {{ posts.salePrice }} ฿
        h2.text-2xl.mt-5 ข้อมูลเบื้องต้น
          .flex.grid.grid-cols-2.grid-rows-4.gap-4
            .div
              h3.text-4.text-black-400 ประเภท
              sapn.text-4 {{ posts.type }}
            .div
              h3.text-4.text-black-400 ห้องนอน
              span.text-4 {{ posts.bedroom }}
            .div
              h3.text-4.text-black-400 ห้องน้ำ
              sapn.text-4 {{ posts.bathroom }}
            .div
              h3.text-4.text-black-400 ที่จอดรถ
              span.text-4 {{ posts.parking }}
            .div
              h3.text-4.text-black-400 ขนาดที่ดิน
              span.text-4 {{ posts.squareMeter }} ตร.วา
            .div
              h3.text-4.text-black-400 พื้นที่ใช้สอย
              span.text-4 {{ posts.squareWa }} ตร.ม
            .div
              h3.text-4.text-black-400 สถานะ
              span.text-4 {{ posts.roomStatus }}
            .div
              h3.text-4.text-black-400 ทิศของบ้าน
              span.text-4 {{ posts.direction }}
          h1.mt-5.text-3xl รายละเอียด
            .space-y-3.mt-3.text-4
              p.text-black-400 {{ posts.moreDetails }}

          h1.mt-5.space-y-3.text-2xl สิ่งอำนวยความสะดวก
          .flex.grid.grid-cols-3.px-3
            .div.space-x-1
              span.text-xl สิ่งอำนวยความสะดวก
              li.text-black-400.text-4 {{ posts.commonFee }}
            .div.space-x-1
              span.text-xl ส่วนกลาง
              li.text-black-400.text-4 {{ posts.facilities }}
            .div.space-x-1
              span.text-xl ระบบความปลอดภัย
              li.text-black-400.text-4 {{ posts.security }}

          h1.mt-8.text-2xl ติดต่อโครงการ
          .flex.space-y-3.mt-3.justify-between.w-full
            .space-y-1.grid.grid-rows-6.contact
              span ชื่อ {{ posts.firstname }}
              span นามสกุล {{ posts.lastname }}
              span Facebook {{ posts.facebook }}
              span Email {{ posts.email }}
              span เบอร์โทรศัพท์ {{ posts.tel }}
              span Line Id {{ posts.line }}

            .space-y-3.text-center.text-4
              .div.ml-16
                img.avatar(src='/icon.png')
              .div.text-4
                span บริษัท สินอริยะ จำกัด
              .div.text
                small.text-dark-grey บริษัทอสังหาริมทรัพย์
              .div
                span ดูโปรไฟล์
              .div.text-5
              button.button.w-full.justify-between
                ion-icon(name="call-outline")
                labes.w-full.left-0.mr-4 โทรหาผู้ขาย
              button.button.w-full.justify-between
                ion-icon(name="chatbox-ellipses-outline")
                labes.ml-4 แชทกับผู้ปล่อยเช่า
              .div.text-5
              span(class="text-error-900 text-4") แจ้งไม่เหมาะสม

      .showmore.text-center.col-end-4.space-y-2
        .div.ml-24
          img.avatar(src='/icon.png')
        .div.text-5
          span บริษัท สินอริยะ จำกัด
        .div.text-4
          small.text-dark-grey บริษัทอสังหาริมทรัพย์
        .div.text-5
          span ดูโปรไฟล์
        .text-5
        button.button.bg-info-500.text-primary-50.w-full.justify-between
          ion-icon(name="mail-outline")
          labels.mr-20 ส่งข้อความ
        button.button.w-full.justify-between
          ion-icon(name="call-outline")
          labes.w-full.left-0.mr-8 โทรหาผู้ขาย
        button.button.w-full.justify-between
          ion-icon(name="chatbox-ellipses-outline")
          labes.mr-8 แชทกับผู้ปล่อยเช่า



  section.mt-8
    .block-content
      h1.text-2xl.mt-5 โครงการแนะนำ
      .recommend
        .grid.grid-cols-4.gap-6(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4')
          Card(
            v-for='item in recommendAnnounceList',
            :key='item.id',
            :idCard='item.id',
            :logo='item.logo',
            :review='item.review',
            :ads='item.ads',
            :likeIcon='item.likeIcon',
            :coverPhoto='item.coverPhoto',
            :type='item.type',
            :topicName='item.topicName',
            :salePrice='item.salePrice',
            :startPrice='item.startPrice',
            :subdistrict='item.subdistrict',
            :district='item.district',
            :province='item.province'
          )

      .secondHandAnnouncement
        .grid.grid-cols-4.gap-6(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4')
          Card(
            v-for='item in allAnnounceList',
            :key='item.id',
            :idCard='item.id',
            :logo='item.logo',
            :bedroom='item.bedroom',
            :bathroom='item.bathroom',
            :ads='item.ads',
            :likeIcon='item.likeIcon',
            :coverPhoto='item.coverPhoto',
            :type='item.type',
            :topicName='item.topicName',
            :salePrice='item.salePrice',
            :subdistrict='item.subdistrict',
            :district='item.district',
            :province='item.province'
          )

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AnnouncesService } from '@/services'
import { IinsertAnnounce } from '@/types/announces'

import InputProfile from '@/components/forms/InputProfile.vue'
import Textarea from '@/components/forms/TextArea.vue'
import LandingBlogsSection from '@/components/sections/landing/LandingBlogsSection.vue'
import Card from '@/components/menus/Card.vue'

export default defineComponent({
  components: {
    InputProfile,
    Textarea,
    LandingBlogsSection,
    Card,
  },
  layout: 'post',
  data() {
    return {
      posts: {},

      recommendAnnounceList: [] as IinsertAnnounce[],
      allAnnounceList: [] as IinsertAnnounce[],

      loading: {
        fetching: {
          recommendAnnounce: false,
          allAnnounce: false,
        },
      },
    }
  },
  async mounted() {
    const data = await fetch(
      `http://127.0.0.1:3000/announces/${this.$route.params.id}`
    )
    const raw = await data.clone().json()
    // - console.log(raw.topicName)
    this.posts = raw

    this.fetchAnnounce()
  },
  methods: {
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
        this.allAnnounceList = res.slice(0, 4).map((item) => {
          return {
            ...item,
            likeIcon: 'like',
          }
        })
      })
      this.loading.fetching.allAnnounce = false
    },
  },
})
</script>

<style lang="scss" scoped>
.colortext {
  color: #00aeef;
  font-weight: 500;
  text-decoration: none !important;
  font-size: 25px;
}

.button-primary {
  background: #2c72cf;
  color: white;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  border: 1px solid #ebeceb;
}

.button {
  @apply border-info-50 text-info-500 w-full;
}

.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}

.imgCover {
  height: 100% !important;
  width: 100%;
}

.showmore {
  max-width: 63%;
}

.send {
  width: 350px;
  height: 45px;
  color: #fff;
  background-color: #00aeef;
  padding: 0.5rem;
}
.row img {
  width: 800px;
  height: 200px;
}
.contact {
  font-size: 1rem;
}
</style>
