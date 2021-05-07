<template lang="pug">
.management-page
  section 
    .block-content
    
    div
      h1.mt-10 ลงประกาศโครงการใหม่
      .mt-8.step-bar
        .rower.mx-0.h-100
          .step.px-0.coler
            .progress-line.progress-active
            .progress-step
              .dataText.active 1
              b.textLabel.active ข้อมูลสำคัญ
          .step.px-0.coler
            .progress-line.progress-active
            .progress-step
              .dataText.active 2
              b.textLabel.active ข้อมูลเพิ่มเติม
          .step.px-0.coler
            .progress-step
              .dataText.active 3
              b.textLabel.active รูปภาพและวิดีโอ
            .progress-line.progress-active
            .progress-step
              .dataText.active 4
              b.textLabel.active สรุปประกาศ

      
      div.mt-16
        br
        h3 คุณภาพใบประกาศ
        br

        div.gird.grid-cols-2.flex
          img.ml-5.mr-8(src="~/static/images/rate.png")
          div.grid.grid-cols-1.w-full.mt-12
            label.label-grey เว็บไซต์ของเราใช้ระบบคะแนนเพื่อประเมินคุณภาพใบประกาศ<br><br>ซึ่งคะแนนดังกล่าวขึ้นอยู่กับรายละเอียดประกาศของคุณ ยิ่งคะแนนประกาศมากลำดับประกาศของคุณในหน้าค้นหาจะดียิ่งขึ้น
        div.grid.grid-cols-4.h-full.w-full
          div.mt-8
            div
              div.border.border-small.border-gray.mt-4.grid.justify-items-center
                div.mt-4
                  div.flex
                    label +5%
                    label.ml-2 เมื่อมีรูปตั้งแต่ 3 รูปขึ้นไป
                  div.flex.mt-2
                    label +10%
                    label.ml-2 เมื่อมี 6 รูปขึ้นไป
              div.border.border-small2.border-gray.grid.justify-items-center
                a.active.mt-1.no-underline(href="/th/create_post/announcement_step_3") เพิ่มจำนวนรูปภาพ
                  div.mt-4
            div
              div.border.border-small.border-gray.mt-4.grid.justify-items-center
                div.mt-4
                  div.flex
                    label +10%
                    label.ml-2 เมื่อมีวิดีโอ
              div.border.border-small2.border-gray.grid.justify-items-center
                a.active.mt-1.no-underline(href="/th/create_post/announcement_step_3") เพิ่มวิดีโอ
                  div.mt-4
          
          div.col-span-2.justify-items-center.text-center.mr-12
            h5 ตัวอย่างใบประกาศในหน้าค้นหา
            img.transform-scale-75(src="~/static/images/exam.png")
          div.mt-16.justify-items-center
              button.button-secondary.mt-5 ดูใบประกาศ
              button.button-secondary.mt-5 แก้ไขอีกครั้ง
              button.button-primary.mt-5 ลงประกาศ

</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import Radios, { Option } from '@/components/forms/Radios.vue'
import InputProfile from '@/components/forms/InputProfile.vue'

export default defineComponent({
  components: {
    Radios,
    InputProfile,
  },
  data() {
    return {
      mock: [
        {
          label: 'ขาย',
          value: 'sale',
        },
        {
          label: 'เช่า',
          value: 'buy',
        },
        {
          label: 'ขายและเช่า',
          value: 'test1',
        },
        {
          label: 'หอพัก/อพาร์ทเม้นท์ (สำหรับเจ้าของตึก)',
          value: 'test2',
        },
      ],
      mockValue: 'sale',
    }
  },
  methods: {
    onRadioChange(value) {
      this.mockValue = value
    },
  },
})

</script>

<style lang="scss" scoped>
.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}

.step-bar {
  height: 56px;
}
.c-green{
  color: rgb(39, 133, 101);
}

.border-green {
  border-color: rgb(27, 185, 103);
}

.border-red {
  border-color: red;
}

.border-gray {
  border-color: rgb(202, 202, 202);
}

.border-small{
  width: 220px;
  height: 80px;
}

.border-small2{
  width: 220px;
  height: 40px;
}

.img-box{
  width: 220px;
  height: 120px;
}

.img-box-small{
  width: 110px;
  height: 95px;
}

.label-grey {
  color: #999;
}

.progress-line {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  height: 1px;
  margin: auto;
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

.progress-active {
  background: #00aeef;
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

.search {
  @apply border-2 border-black-400 p-3;
}

.button-primary {
  background: #00aeef;
  color: white;
  height: 50px;
  padding-left: 10px;
  width: 85%;
}
.button-secondary {
  background-color: white;
  color: #00aeef;
  border: 2px solid;
  padding-left: 10px;
  height: 50px;
  width: 85%;
}
  button {
    @apply border-info-500 text-info-500 w-full;
  }
.addphone {
  cursor: pointer;
  &:hover {
    color:red;
  }
}

</style>