<template lang="pug">
.management-page
  h1 ลงประกาศ
  .mt-5.step-bar
    .rower.mx-0.h-100
      .step.px-0.coler
        .progress-line.bg-dark-grey
        .progress-step
          .dataText.active 1
          b.textLabel.active ข้อมูลสำคัญ
      .step.px-0.coler
        .progress-line.bg-dark-grey
        .progress-step
          .dataText 2
          b.textLabel ข้อมูลเพิ่มเติม
      .step.px-0.coler
        .progress-step
          .dataText 3
          b.textLabel รูปภาพและวิดีโอ
        .progress-line.bg-dark-grey
        .progress-step
          .dataText 4
          b.textLabel สรุปประกาศ

  .mt-10
  span.text-xl ประเภทประกาศ*

  template(v-for='(item, index) in mock')
    label {{ item.label }}
    input(
      type='radio',
      name='custom-radio',
      :value='item.value',
      :checked='mockValue === item.value',
      @input='onRadioChange(item.value)'
    )

  .mt-5
  span.text-xl ประเภท*
  Radios(
    :options='mock',
    v-model='mockValue',
    name='a',
    @change='onRadioChange'
  )

  .mt-5 
  span.text-xl ประเภท*

  .mt-5
  Input#asd.search(type='search', name='search', placeholder='search...') 

  .flex.space-x-2.mt-5
    input#vehicle1(type='checkbox')
    label ฉันต้องการใส่ชื่อโครงการ (กรณีไม่พบโครงการ)
  br

  .mt-5
    span.text-xl ที่อยู่*
      .grid.grid-cols-4.grid-rows-2.gap-4.mt-2
        Dropdown(placeholder='จังหวัด')
        Dropdown(placeholder='อำเภอ')
        Dropdown(placeholder='ตำบล')
        InputProfile(type=text, labels='รหัสไปรษณีย์*')
        InputProfile(type=text, labels='บ้านเลขที่*')
        InputProfile(type=text, labels='หมู่*')
        InputProfile(type=text, labels='ซอย*')
        InputProfile(type=text, labels='ถนน*')

    span กดเลื่อนหมุดสีแดงไปยังตำแหน่งที่ตั้งทรัพย์ของคุณ

    span ข้อมูลติดต่อ*
      .grid.grid-cols-2.grid-rows-2.gap-4.mt-2
        InputProfile(type=text, labels='ข้อมูลผู้ติดต่อ*')
        InputProfile(type=text, labels='เบอร์โทรศัพท์*')
        span.text-info-400 + เพิ่มเบอร์โทรศัพท์*


    .flex.grid.grid-cols-2.grid-rows-2.gap-4.mt-2
      InputProfile(type=text, labels='อีกเมลล์*') 
      InputProfile(type=text, labels='Facebook*')
      h1.text-3 *ตัวอย่าง https://www.facebook.com/profile

    .flex.space-x-2
      input#vehicle1(type='checkbox')
      label ผูกไอดีไลน์กับเบอร์มือถือ

    .flex.mt-5
    InputProfile.Line(type=text, labels='Line id*') 

    .flex.justify-between.space-x-10.mt-5
          button.button.w-full ยกเลิก
          button.button.w-full บันทึกแบบร่าง
    .mt-5
    button.button.button-primary.w-full ต่อไป



</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import Radios, { Option } from '@/components/forms/Radios.vue'
import InputProfile from '@/components/forms/InputProfile.vue'
import Dropdown from '@/components/forms/Dropdown.vue'

export default defineComponent({
  components: {
    Radios,
    Dropdown,
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
  background: #2C72CF;
  color: white;
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