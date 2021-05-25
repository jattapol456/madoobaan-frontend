<template lang="pug">
.management-page
  section
    .div.mt-16.grid.grid-cols-2
      .div.h-full
        .body.h-full
          img.imgCover(src='https://d35q2c276lvyi.cloudfront.net/hPjRedEqCiUW7DkonKg01VVKHIq8P1gB30TUBg-QJaU/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcHJvamVjdHMvNTMvY292ZXIvaHJUSnpNVVU3YmRKSjAwaGxjb3dJRHVSMlJaeUJGVDMxU1JZTFVGeS5qcGVn')
      .div.grid-cols-2.grid-rows-2.w-full
        .row
          .body
            img(src='https://d35q2c276lvyi.cloudfront.net/VIg67zBH4fVcDPMd5Fvg9cgVpJVkH1hwD2YmXt3Uj2k/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS85NmQ1ZWZjYTY2ZTJmNzgzNjAxNjhjMjUyN2ZmZjIxNC5qcGVn')
          .body
            img(src='https://d35q2c276lvyi.cloudfront.net/U8s2SQ5hpW2TrF-m211RxbygGCZt_xMM_BZbIdoYhX8/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS9zMkhjc0I4c1RwaVJkV2NXSmozV3pvOUw0dEQ0WDJNMFlhV2ZJRTdZLmpwZWc')
        .row
          .body
            img(src='https://d35q2c276lvyi.cloudfront.net/voacLPBqhr8lNZiMo80cAbrAT9d90HtPZCY4upmkZjc/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS9QZW1JU3NaQVZqeUNST3l1REJGZHpIUEpMcWtsTHFHS1hHeGZRbktCLmpwZWc')
          .body
            img(src='https://d35q2c276lvyi.cloudfront.net/GrllBxXNGQwM2uk-PCNSwIziqwutJTdj9TFugac4peA/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS9iODM4Y2VlMmZlYjUwOTE2Y2MzZWI4ZTQ4MDJmNzc2NS5qcGVn')

  section.mt-8
    .block-content

    .header.mt-5.grid.grid-cols-3
      .showdetail.col-start-1.col-span-2
        h1.text-2xl {{$route.params.id}} {{ posts.topicName }}
        span.colortext.text-xl.mt-2 {{ salePrice }} ฿
        h2.text-2xl.mt-5 ข้อมูลเบื้องต้น
          .flex.grid.grid-cols-2.grid-rows-4.gap-4
            .div
              h3.text-4.text-black-400 ประเภท
              sapn.text-4 ทาวน์โฮม เช่า
            .div
              h3.text-4.text-black-400 ห้องนอน
              span.text-4 3
            .div
              h3.text-4.text-black-400 ห้องน้ำ
              sapn.text-4 3
            .div
              h3.text-4.text-black-400 ที่จอดรถ
              span.text-4 3
            .div
              h3.text-4.text-black-400 ขนาดที่ดิน
              span.text-4 24 ตร.วา
            .div
              h3.text-4.text-black-400 พื้นที่ใช้สอย
              span.text-4 140 ตร.ม
            .div
              h3.text-4.text-black-400 สถานะ
              span.text-4 ว่าง
            .div
              h3.text-4.text-black-400 ทิศของบ้าน
              span.text-4 ใต้
          h1.mt-5.text-3xl รายละเอียด
            .space-y-3.mt-3.text-4
              p.text-black-400 {{ moreDetails }}

          h1.mt-5.space-y-3.text-2xl สิ่งอำนวยความสะดวก
          .flex.grid.grid-cols-2.px-3
            .div.space-x-1
              span.text-xl ส่วนกลาง
              li.text-black-400.text-4 สวนหย่อม
            .div.space-x-1
              span.text-xl ระบบความปลอดภัย
              li.text-black-400.text-4 เจ้าหน้าที่รักษาความปลอดภัย

          h1.mt-8.text-2xl ติดต่อโครงการ
          .flex.space-y-3.mt-3.justify-between
            .div.space-y-3
              InputProfile(type="text", labels='*ชื่อ' disabled)
              InputProfile(type="text", labels='*เบอร์โทรติดต่อ' disabled)
              InputProfile(type="text", labels='อีเมล' disabled)
              InputProfile(type="text", labels='Line ID' disabled)
              span.text-4.opacity-50 *ข้อความ
              Textarea
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
            .div
          button.send.text-4 ส่งข้อความ

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
  props: {
    coverPhoto: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    moreDetails: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    topicName: {
      type: String,
      default: null,
    },
    salePrice: {
      type: String,
      default: null,
    },
    subdistrict: {
      type: String,
      default: null,
    },
    district: {
      type: String,
      default: null,
    },
    province: {
      type: String,
      default: null,
    },
    bedroom: {
      type: String,
      default: null,
    },
    bathroom: {
      type: String,
      default: null,
    },
  },
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
    this.posts = await data.json()

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

.row {
  display: flex;
}

.test {
  height: 55px;
  width: 200px;
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
</style>
