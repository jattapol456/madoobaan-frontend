<template lang="pug">
.management-page
  section
    .div.mt-16.grid.grid-cols-2
      .div.h-full
        .body.h-full
          img.imgCover(src="https://d35q2c276lvyi.cloudfront.net/hPjRedEqCiUW7DkonKg01VVKHIq8P1gB30TUBg-QJaU/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcHJvamVjdHMvNTMvY292ZXIvaHJUSnpNVVU3YmRKSjAwaGxjb3dJRHVSMlJaeUJGVDMxU1JZTFVGeS5qcGVn")
      .div.grid-cols-2.grid-rows-2.w-full
        .row
          .body
            img(src="https://d35q2c276lvyi.cloudfront.net/VIg67zBH4fVcDPMd5Fvg9cgVpJVkH1hwD2YmXt3Uj2k/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS85NmQ1ZWZjYTY2ZTJmNzgzNjAxNjhjMjUyN2ZmZjIxNC5qcGVn")
          .body
            img(src="https://d35q2c276lvyi.cloudfront.net/U8s2SQ5hpW2TrF-m211RxbygGCZt_xMM_BZbIdoYhX8/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS9zMkhjc0I4c1RwaVJkV2NXSmozV3pvOUw0dEQ0WDJNMFlhV2ZJRTdZLmpwZWc")
        .row
          .body
            img(src="https://d35q2c276lvyi.cloudfront.net/voacLPBqhr8lNZiMo80cAbrAT9d90HtPZCY4upmkZjc/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS9QZW1JU3NaQVZqeUNST3l1REJGZHpIUEpMcWtsTHFHS1hHeGZRbktCLmpwZWc")
          .body
            img(src="https://d35q2c276lvyi.cloudfront.net/GrllBxXNGQwM2uk-PCNSwIziqwutJTdj9TFugac4peA/fill/0/540/sm/1/aHR0cHM6Ly9hcGkubmF5b28uY28vYXR0YWNobWVudHMvcG9zdHMvNTMvZ2FsbGVyeS9iODM4Y2VlMmZlYjUwOTE2Y2MzZWI4ZTQ4MDJmNzc2NS5qcGVn")

  section.mt-8
    .block-content
      h1.text-2xl รังหมาป่า
      span.colortext.text-xl.mt-2 ฿ 5,500/เดือน

      div.text-center.justify-items-center
      h2.text-xl.mt-5 ข้อมูลเบื้องต้น
        div
          .flex.grid.grid-cols-2.grid-rows-4.gap-4
            .div
              h3.text-4 ประเภท
              sapn.text-4 ทาวน์โฮม เช่า
            .div
              h3.text-4 ห้องนอน
              span.text-4 3
            .div
              h3.text-4 ห้องน้ำ
              sapn.text-4 3
            .div
              h3.text-4 ที่จอดรถ
              span.text-4 3
            .div
              h3.text-4 ขนาดที่ดิน
              span.text-4 24 ตร.วา
            .div
              h3.text-4 พื้นที่ใช้สอย
              span.text-4 140 ตร.ม
            .div
              h3.text-4 สถานะ
              span.text-4 ว่าง
            .div
              h3.text-4 ทิศของบ้าน
              span.text-4 ใต้
      div
      h1.text-xl.mt-5.space-y-3 สิ่งอำนวยความสะดวก
        .flex.grid.grid-cols-2.mt-4
          .div
            span ส่วนกลาง
            li.text-4 สวนหย่อม
          .div
            span ระบบความปลอดภัย
            li.text-4 เจ้าหน้าที่รักษาความปลอดภัย

      h1.mt-3.text-xl.space-x-20 ติดต่อโครงการ
      .flex.justify-between.w-full.px-40.space-y-3.mt-3
        .div
          InputProfile.input.test(type="text", labels='ชื่อ*')
          InputProfile.input.test(type="text", labels='เบอร์โทรติดต่อ*')
          InputProfile.input.test(type="text", labels='อีเมล*')
          InputProfile.input.test(type="text", labels='Line ID*')
          span.text-4.opacity-50 ข้อความ*
          Textarea

        .space-y-4.text-center
          .div
            img.avatar.w-12.h-12(src="/icon.png")
          .div
            span.fw-500 บริษัท สินอริยะ จำกัด
          .div
            small.text-dark-grey บริษัทอสังหาริมทรัพย์
          .div
            span ดูโปรไฟล์
          .div
          button.button.w-full โทรหาผู้ปล่อยเช่า
          button.button.w-full เพิ่มไลน์กับผู้ปล่อยเช่า
          button.button.w-full แชทกับผู้ปล่อยเช่า
          .div
          span แจ้งไม่เหมาะสม



          //- h1.text-xl.mt-5 โครงการแนะนำ
          //- LandingBlogsSection






</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import InputProfile from '@/components/forms/InputProfile.vue'
import Textarea from '@/components/forms/TextArea.vue'
import LandingBlogsSection from '@/components/sections/landing/LandingBlogsSection.vue'

export default defineComponent({
  components: {
    InputProfile,
    Textarea,
    LandingBlogsSection,
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
  @apply border-info-500 text-info-500 w-full;
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
</style>
