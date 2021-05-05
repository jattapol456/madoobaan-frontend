<template lang="pug">
  footer
    .footer-top.h-auto.py-5.space-y-5
      h3 สมัครเป็นนายหน้ากับน่าอยู่ ช่วยเพิ่มโอกาสในการขายให้กับคุณ
      button.announce-button.bg-success-500(@click="showSignUpModal") ลงประกาศฟรี

    .footer-contract.h-auto.py-4.space-y-5
      .block-content.justify-between
        .justify-start
          p.uppercase logo
        .justify-end
          .contract-link.space-x-5.font-semibold
            a.no-underline Terms & Condition
            a.no-underline Privacy Policy
            .text-right
              a.no-underline วิธีการลงใบประกาศบ้านมือสอง

      .contract
        p Contact Us
        p Khonkaen@NaYoo.co
        p 061-635-8542

    .footer-bar
      .block-content
        p 2021 MadooBaan.com - All rights reserved

        .icons.ml-auto
          a.icon
            ion-icon(name="logo-facebook")
          a.icon
            ion-icon(name="logo-instagram")


</template>

<style lang="scss" scoped>
footer {
  @apply w-full bg-white text-black-700;
  .footer-contract,
  .footer-bar {
    @apply flex flex-col items-center w-full px-64;

    .block-content {
      @apply flex w-full max-w-7xl font-noto;
    }
  }

  .footer-bar {
    @apply justify-center bg-white;

    height: 4.5rem;

    .block-content {
      @apply items-center;

      .icons {
        display: flex;
        column-gap: 1rem;

        .icon {
          @apply flex square-8 text-8;
        }
      }
    }
  }
  .footer-top {
    @apply text-center text-white bg-info-400;

    height: 4.5rem;

    .block-content {
      @apply items-center w-full max-w-7xl;
    }
  }

  .footer-contract {
    @apply justify-center bg-white;

    height: 4.5rem;

    .block-content {
      @apply items-center w-full max-w-7xl;
    }
  }

  .contract {
    @apply items-center w-full max-w-7xl;
  }

  .announce-button {
    @apply font-semibold p-3;
  }
}
</style>
