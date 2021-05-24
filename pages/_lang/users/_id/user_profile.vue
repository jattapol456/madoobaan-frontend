<template lang="pug">
  .management-page
    section
      .block-content
        h1.text-3xl.mt-24 ผู้ใช้ทั่วไป
      
      .mt-10
        li.text-lg ข้อมูลส่วนตัว

        .grid.grid-cols-5.gap-8.mt-10
          .w-32.h-32.rounded-full.bg-black-500.flex.items-center.justify-center.relative
            input.absolute.w-full.h-full.opacity-0(type="file")
            span.text-4xl.text-white J

          .col-span-2(class='md:col-span-12')
            InputProfile.input(type=text,labels="ชื่อ*")
            InputProfile.input(type="tel",labels="กรุณากรอกเบอร์โทรศัพท์*",error="กรอกเบอร์โทรศัพท์")
            
            //- InputProfile.input(type=text,labels="เบอร์โทรศัพท์*",v-for="(phone, index) in phone",:key="index")

            .boxTest(v-for="(phone, index) in phone" :key="index")
              .relativeBox
                InputProfile.input(type=text labels="เบอร์โทรศัพท์*")
                .deletePhone(@click="deletePhone()")
                  img(src="/delete icn.png",width="30px", alt="alt")
            .addphone(@click="addPhone()",v-if="phone.length < 1")
              span +เพิ่มเบอร์โทรศัพท์*

            .flex.items-center.mt-5.space-x-1(@click="checkboxer()")
              input(type='checkbox',name="cc",:checked="checked")
              label(for="cc") ใช้เบอร์โทรศัพท์หลักเป็น Line id

          .col-span-2(class='md:col-span-12')
            InputProfile.input(type=text,labels="อีเมลล์หลัก*")
            InputProfile.input(type=text,labels="Line_Id*",v-if="!checked")
            InputProfile.input(type=text,labels="Facebook")
            h1.text-3 *ตัวอย่าง https://www.facebook.com/profile
            

        .flex.justify-between.space-x-10.mt-20
          button.button.w-full( onclick="window.location.href='http://localhost:8080/th/';" value="return" ) ยกเลิก
          button.button.button-primary.w-full บันทึกข้อมูล
        

</template>

<script lang="ts">
import Input from '@/components/forms/Input.vue'
import InputProfile from '@/components/forms/InputProfile.vue'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    Input,
    InputProfile,
  },
  data() {
    return{
      phone: [] as any,
      checked: false
    }
  },
  methods: {
    addPhone: function(){
      this.phone.push(1)
    },
    checkboxer: function() {
      this.checked = !this.checked  
    },
    deletePhone: function(){
      this.phone.pop()
    },
  }
})
</script>

<style lang="scss" scoped>

.button-primary {
  background: #2C72CF;
  color: white;
}
  button {
    @apply border-info-500 text-info-500 w-full;
  }
  
.addphone {
  cursor: pointer;
  color: #00aeef;
  font-weight: 900;
  text-decoration: none !important;
  &:hover {
    color:rgb(178, 137, 231);
  }
}

.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}

.relativeBox {
  position: relative;
}

.deletePhone {
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 0.7;
}

</style>