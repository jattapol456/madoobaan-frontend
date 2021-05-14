<template lang="pug">
.management-page
  section
    .block-content
      h1.mt-24 ลงประกาศ
    .div
      .mt-5.step-bar
        .rower.mx-0.h-100
          .step.px-0.coler
            .progress-line.progress-active
            .progress-step
              .dataText.active 1
              b.textLabel.active ข้อมูลสำคัญ
          .step.px-0.coler
            .progress-line.bg-dark-grey
            .progress-step
              .dataText.active 2
              b.textLabel.active ข้อมูลเพิ่มเติม
          .step.px-0.coler
            .progress-step
              .dataText 3
              b.textLabel รูปภาพและวิดีโอ
            .progress-line.bg-dark-grey
            .progress-step
              .dataText 4
              b.textLabel สรุปประกาศ

    .test.grid.grid-cols-2.grid-rows-2.mt-8
      .flex-col
        span.text-xl จำนวนชั้น
        RadiosTest(:options='mock', name='number')
      .flex-col
        span.text-xl จำนวนห้องนอน
        RadiosTest(:options='mock1', name='number1')
      .flex-col
        span.text-xl จำนวนห้องน้ำ
        RadiosTest(:options='mock2', name='number2')
      .flex-col
        span.text-xl จำนวนที่จอดรถ
        RadiosTest(:options='mock3', name='number3')

    .text1.grid.grid-cols-4.gap-3
      span ทิศของหน้าบ้าน
        Dropdown.dropdownP2(placeholder='ไม่แสดง')
      span เฟอร์นิเจอร์
        Dropdown.dropdownP2(placeholder='ไม่แสดง')

    .flex.grid.grid-col-4.mt-5
      span.col-start-1 ขนาดที่ดิน*
      span.col-end-6 พื้นที่ใช้สอย*
    .flex.grid.grid-cols-4.gap-3.mt-5 
      InputProfile(type=text, labels='จำนวนไร่*')
      InputProfile(type=text, labels='จำนวนงาน*')
      InputProfile(type=text, labels='จำนวนตารางวา*')
      InputProfile(type=text, labels='จำนวนตารางเมตร*')

    span ราคา(บาท)*
    .grid.grid-cols-4.gap-3.mt-5
      InputProfile(type=text, labels='ราคาขาย*')
      InputProfile(type=text, labels='ราคาส่วนกลาง/เดือน*')

    .test2.grid.grid-cols-3
      .div.col-start-1
        span สถานะบ้าน/ห้องปัจจุบัน
        Dropdown(placeholder='ว่าง')
      .div.col-end-4
        span เปิดรับตัวแทนจำหน่าย
        RadiosTest(:options='mock112', name='open') 

    
    h4 สิ่งอำนวยความสะดวก
    span ส่วนกลาง
    .central.grid.grid.row-gap-5.grid-cols-2.mt-2.border.border-solid.border-black-200.p-5
      .flex
        input(type="checkbox")
        label.ml-2 ลิฟต์
      .flex
        input(type="checkbox")
        label.ml-2 ห้องประชุม
      .flex
        input(type="checkbox")
        label.ml-2 ห้องอ่านหนังสือ
      .flex
        input(type="checkbox")
        label.ml-2 สวนหย่อม
      .flex
        input(type="checkbox")
        label.ml-2 มินิมาร์ท
      .flex
        input(type="checkbox")
        label.ml-2 รถรับส่ง
      .flex
        input(type="checkbox")
        label.ml-2 ลานจอดรถ
      .flex
        input(type="checkbox")
        label.ml-2 ลานจอดรถใต้ดิน
      .grid.grid-cols-2.gap-4(v-for="(data, index) in dataOne" :key="index")
        .relativeBox
          InputProfile.input(type=text labels="ส่วนกลาง*")
          .deletePhone(@click="deleteData()")
            img(src="/delete icn.png",width="30px", alt="alt")
      .addphone(@click="addData()",v-if="dataOne.length < 1")
        span +เพิ่มอื่นๆ  

    span.mt-5 ความปลอดภัย
    .Safety.grid.grid.row-gap-5.grid-cols-2.mt-2.border.border-solid.border-black-200.p-5
      .flex
        input(type="checkbox")
        label.ml-2 เจ้าหน้าที่รักษาความปลอดภัย ตลอด 24 ชม.
      .flex
        input(type="checkbox")
        label.ml-2 ระบบ Easy Pass เข้า-ออก
      .flex
        input(type="checkbox")
        label.ml-2 กล้องวงจรปิด(CC TV)
      .flex
        input(type="checkbox")
        label.ml-2 ระบบ Key Card
      .flex
        input(type="checkbox")
        label.ml-2 ระบบเตือนไฟไหม้(Fire alarm system)
      .flex
        input(type="checkbox")
        label.ml-2 ระบบแสกนนิ้วมือ
      .flex
        input(type="checkbox")
        label.ml-2 ระบบตรวจสอบจับควันไฟ(Smoke detector)  
      .grid.grid-cols-2.gap-4(v-for="(data, index) in dataTwo" :key="index")
        .relativeBox
          InputProfile.input(type=text labels="ความปลอดภัย*")
          .deletePhone(@click="deleteDataTwo()")
            img(src="/delete icn.png",width="30px", alt="alt")
      .addphone(@click="addDataTwo()",v-if="dataTwo.length < 1")
        span +เพิ่มอื่นๆ  


    span.mt-3 สิ่งอำนวยความสะดวก
    .Convenient.grid.grid.row-gap-5.grid-cols-2.mt-2.border.border-solid.border-black-200.p-5
      .flex
        input(type="checkbox")
        label.ml-2 สระว่ายน้ำ
      .flex
        input(type="checkbox")
        label.ml-2 สระว่ายน้ำเด็ก 
      .flex
        input(type="checkbox")
        label.ml-2 ห้องอบซาวน่า
      .flex
        input(type="checkbox")
        label.ml-2 ห้องฟิตเนส
      .flex
        input(type="checkbox")
        label.ml-2 ห้องบาสเก็ตบอล
      .flex
        input(type="checkbox")
        label.ml-2 สนามเด็กเล่น
      .flex
        input(type="checkbox")
        label.ml-2 สโมสร
      .flex
        input(type="checkbox")
        label.ml-2 สนามไดร์กลอฟ
      .flex
        input(type="checkbox")
        label.ml-2 ลู่จ๊อกกิ้ง
      .grid.grid-cols-2.gap-4(v-for="(data, index) in dataTree" :key="index")
        .relativeBox
          InputProfile.input(type=text labels="สิ่งอำนวยความสะดวกในการออกกำลังกาย*")
          .deletePhone(@click="deleteDataTree()")
            img(src="/delete icn.png",width="30px", alt="alt")
      .addphone(@click="addDataTree()",v-if="dataTree.length < 1")
        span +เพิ่มอื่นๆ  

    h4.mt-4 หัวข้อประกาศ*
      .mt-3.grid.grid-cols-12.gap-3
        InputProfile.col-span-10(type=text, labels='หัวข้อภาษาไทย*', placeholder="ขายบ้าน โครงการที่ สเปซ โนนม่วง")  
        InputProfile.col-span-2(type=text, labels='รหัสประกาศ*')

    h4 รายละเอียดเพิ่มเติม*
      Textarea
      
      flex.space-x-2.grid.grid-cols-2.mt-5.w-full
        button.button( onclick="window.location.href='http://localhost:8080/th/create_post/announcement_step_1';" value="return" ) ย้อนกลับ
        button.button บันทึกแบบร่าง
      .mt-5
        button.button.button-primary.w-full( onclick="window.location.href='http://localhost:8080/th/create_post/announcement_step_3';" value="nextpage" ) ต่อไป

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import InputProfile from '@/components/forms/InputProfile.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import RadiosTest from '@/components/forms/RadioTest.vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import Textarea from '@/components/forms/TextArea.vue'

export default defineComponent({
  components: {
    InputProfile,
    Dropdown,
    RadiosTest,
    Checkbox,
    Textarea,
  },
  data() {
    return {
      mock: [
        {
          label: '0',
          value: '0',
        },
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: 'ระบุเอง',
          value: 'custom',
        },
      ],
      mock1: [
        {
          label: '0',
          value: '0',
        },
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: 'ระบุเอง',
          value: 'custom',
        },
      ],
      mock2: [
        {
          label: '0',
          value: '0',
        },
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: 'ระบุเอง',
          value: 'custom',
        },
      ],
      mock3: [
        {
          label: '0',
          value: '0',
        },
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: 'ระบุเอง',
          value: 'custom',
        },
      ],
      mock112: [
        {
          label: 'ไม่เปิดรับ',
          value: 'close',
        },
        {
          label: 'เปิดรับ',
          value: 'open',
        },
      ],
      dataOne: [] as any,
      dataTwo: [] as any,
      dataTree: [] as any,
    }
  },
  methods: {
    addData: function(){
      this.dataOne.push(1)
    },
    deleteData: function(){
      this.dataOne.pop()
    },
    addDataTwo: function(){
      this.dataTwo.push(1)
    },
    deleteDataTwo: function(){
      this.dataTwo.pop()
    },
     addDataTree: function(){
      this.dataTree.push(1)
    },
    deleteDataTree: function(){
      this.dataTree.pop()
    },
  }
})
</script>

<style lang="scss" scoped>
.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}

.step-bar {
  height: 56px;
}

.progress-line {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  height: 1px;
  margin: auto;
}

.progress-active {
  background: #00aeef;
}

.bg-dark-grey {
  background: #999;
}

.rower {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px !important;
}

.coler {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.progress-step {
  position: absolute;
  width: 56px;
  left: -14px;
  z-index: 2;
}

.dataText {
  height: 56px;
  width: 56px;
  line-height: 56px;
  text-align: center;
  border-radius: 100%;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  font-size: 20px !important;
  font-weight: 500 !important;
  background-color: #fff !important;
  color: #999 !important;
  border-color: #999 !important;
}
.active {
  border-color: #00aeef !important;
  color: #00aeef !important;
}

.textLabel {
  display: inline-block;
  margin-bottom: 0.5rem;
  margin-left: -15px;
  white-space: nowrap;
  font-weight: 500 !important;
  text-align: center;
}

.step:last-child .progress-step:last-child {
  left: unset;
  right: 0;
}
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

