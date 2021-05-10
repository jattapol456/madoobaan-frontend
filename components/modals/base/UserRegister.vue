<template lang="pug">
.management-page
  section
    .block-content
      div.modal-backdrop
        div.modal-scroller
          div.modal
            div.modal-container
              div.flex
                h2.mb-2.mt-2 สร้างบัญชีใหม่
                buttonclass(class="button square-8 p-0 border-none ml-auto outline-none")
                  ion-icon(name="close-outline" class="w-full h-full md hydrated" role="img" aria-label="close outline")
              div.block-content.mt-2
                label อีเมล
                Input.mb-6.w-full
              div.block-content
                label รหัสผ่าน
                Input.mb-6.w-full
              div.block-content
                label ยืนยันรหัสผ่าน
                Input.mb-6.w-full
              div.flex
                Checkbox.ml-1
                div.block-content.ml-1.space-y-2.mt-1
                  label ฉันได้อ่านและยอมรับ <a href="#">เงื่อนไขการให้บริการ</a> และ
                  label <a href="#"> เงื่อนไขการเปิดเผยข้อมูล</a>
              div.block-content.mt-8
                button.button-primary.w-full ดำเนินการต่อ
              div.text-center.mt-5.mb-3
                label <a>ลงชื่อเข้าใช้</a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Input from '@/components/forms/Input.vue'
import Checkbox from '@/components/forms/Checkbox.vue'

export default defineComponent({

  components: {
    Checkbox,
    Input,
  },
})
</script>

<style lang="scss" scoped>

.button-primary {
  font-weight: 900;
  height: 40px;
  padding-left: 10px;
  width: 100%;
}

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

