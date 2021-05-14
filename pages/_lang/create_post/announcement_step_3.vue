<template lang="pug">
.management-page
  section 
    .block-content
    div
      h1.mt-24 ลงประกาศ
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
            .progress-line.bg-dark-grey
            .progress-step
              .dataText 4
              b.textLabel สรุปประกาศ

      .mt-12
      div.mt-4
        br
        h3 คำแนะนำสำหรับการใช้รูปภาพ
        br
        div.flex.w-100.h-100grid.grid-rows-3.grid-flow-col.gap-4
          div.mt-5.w-full
            h5 อนุญาต
            label.mt-3 รูปภาพที่ชัดเจนไม่มืดหรือมัว
            div.border-green.border-redbox-border.h-40.w-60.p-4.border-2.mt-6
              img.object-none.h-full.w-full(src="~/static/images/img-checked-ex-pic-1.svg")
          div.mt-5.ml-20.w-full
            h5 ไม่อนุญาต
            label.mt-3 ไม่อนุญาติรูปภาพที่มีใบหน้าข้อความลายน้ำ
              div.border-red.border-redbox-border.h-40.w-60.p-4.border-2.mt-6
                img.object-none.h-full.w-full(src="~/static/images/img-checked-ex-pic-2.svg")
          div.mt-5.ml-20.w-full
            h5 ไม่อนุญาต
            label.mt-3 รูปที่มีหลายภาพวางซ้อนทับกัน
              div.border-red.border-redbox-border.h-40.w-60.p-4.border-2.mt-6
                img.object-none.h-full.w-full(src="~/static/images/img-checked-ex-pic-3.svg")
        
        div.w-100
          h3.mt-10 เพิ่มรูปภาพปก
          label.label-grey.mt-3 คำแนะนำ : ควรเป็นรูปภาพแนวนอนสัดส่วน 16:9 เพื่อความสวยงาม ขนาดรูปไม่เกิน 5 MB.
          
          input.hidden(type="file" id="myFileInput_1")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_1').click()" 
          value="Select a File").img-box.border-gray.border-redbox-border.border-2.mt-6
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
        
        div.w-100
          h3.mt-8 รูปภาพ
          label.label-grey.mt-3 เพิ่มรูปภาพบรรยากาศ สิ่งอำนวยความสะดวก

        div.flex
          input.hidden(type="file" id="myFileInput_2")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_2').click()" 
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_3")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_3').click()" 
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_4")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_4').click()" 
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_5")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_5').click()"
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_6")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_6').click()"
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_7")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_7').click()" 
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_8")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_8').click()"
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_9")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_9').click()"
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_10")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_10').click()"
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")
          
          input.hidden(type="file" id="myFileInput_11")
          div.input(type="button"
          onclick="document.getElementById('myFileInput_11').click()"
          value="Select a File").img-box-small.border-gray.border-redbox-border.border-2.mt-6.ml-3
            img.ml-1.object-none.object-center.w-full.h-full(src="~/static/images/img-upload.png")

        div.mt-4
          div.flex.w-full.justify-items-center.space-x-4
            div.mt-10.w-full
              button(id="backToStep2" onClick="window.location.href = 'announcement_step_2'").button-secondary ย้อนกลับ
            div.mt-10.w-full
              button.button-secondary บันทึกแบบร่าง
          button(id="nextToStep4" oonClick="window.location.href = 'announcement_step_4'").button-primary.mt-5 ต่อไป

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Radios from '@/components/forms/Radios.vue'
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
.c-green {
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

.img-box {
  width: 220px;
  height: 120px;
}

.img-box-small {
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
}
.button-secondary {
  background-color: white;
  color: #00aeef;
  border: 2px solid;
  padding-left: 10px;
  height: 50px;
}
button {
  @apply border-info-500 text-info-500 w-full;
}
.addphone {
  cursor: pointer;
  &:hover {
    color: red;
  }
}
</style>
