<template lang="pug">
        div.modal-backdrop
          div.modal-scroller
            div.modal
              div.modal-container
                div.flex
                  h2.mb-2.mt-2 เข้าสู่ระบบ
                  buttonclass(class="button square-8 p-0 border-none ml-auto outline-none")
                    ion-icon(name="close-outline" class="w-full h-full md hydrated" role="img" aria-label="close outline")
                div.text-center(style="background-color:rgb(240, 240, 240);h=20;")
                  br
                  img.object-none.h-48.w-full(src="~/static/images/mock-up/avatar/male.png")
                  div
                    h4.mt-2 Fname Lname
                    h5 example@example.com
                  br
                div.block
                  br
                  div
                    label รหัสผ่าน
                    Input.mb-6.w-full
                  button.mb-5.button.button-primary.w-full เข้าสู่ระบบ
                a ใช้บัญชีอื่น
                a.float-right ลืมรหัสผ่าน?
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Input from '@/components/forms/Input.vue'

export default defineComponent({
  components: {
    Input,
  },
})
</script>
