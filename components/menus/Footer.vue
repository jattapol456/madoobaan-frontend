<template lang="pug">
  footer(style='background-image: url("https://source.unsplash.com/GA1SuREonwU/1600x900")')
    .footer-top.py-5.space-y-5.flex-col
      h3.text-center สมัครเป็นนายหน้ากับมาดูบ้าน ช่วยเพิ่มโอกาสในการขายให้กับคุณ
      button.button.button-success(@click="showSignUpModal") ลงประกาศฟรี

    .footer-contract.w-full.h-full.py-4.space-y-5.px-5
      .justify-between.w-full.flex
        .justify-start
          img(src="https://www.madoobaan.com/wp-content/uploads/2021/04/sm_long_logo-2.png",width="100px")
        .justify-end
          .contract-link.space-x-5
            a.no-underline(href="#") Terms & Condition
            a.no-underline(href="#") Privacy Policy
            a.no-underline(href="#") Cookie Policy
            .how-to.text-right
              a.no-underline(href="#") วิธีการลงใบประกาศบ้านมือสอง

      .contract
        span Contact Us
        p madoobaan@gmail.com
        p 099-999-9999

      .link.flex.justify-between
        .icons
          a.icon(href="#")
            ion-icon(name="logo-facebook")
          a.icon(href="https://www.instagram.com/madoobaan/")
            ion-icon(name="logo-instagram")
        .email-tel
          p 2021 MadooBaan.com - All rights reserved
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({})
</script>

<style lang="scss" scoped>
p,
a,
span {
  @apply text-white font-noto;
}
footer {
  @apply w-full h-full bg-center bg-cover;
  .footer-bar {
    @apply justify-center;

    height: 4.5rem;
  }
  .footer-top {
    @apply h-full flex justify-center items-center text-center text-white bg-info-500;
  }
  .icons {
    display: flex;
    column-gap: 1rem;

    .icon {
      @apply flex square-8 text-8;
    }
  }
}
</style>
