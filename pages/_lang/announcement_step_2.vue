<template lang="pug">
.management-page
  section
    .block-content
      h1.mt-24 ลงประกาศ
    div
      .div
        .mt-5.step-bar
          .rower.mx-0
            .step.px-0.color
              .progress-line.progress-active
              .progress-step
                .dataText.active 1
                b.textLabel.active ข้อมูลสำคัญ
            .step.px-0.color
              .progress-line.bg-dark-grey
              .progress-step
                .dataText.active 2
                b.textLabel.active ข้อมูลเพิ่มเติม
            .step.px-0.color
              .progress-step
                .dataText 3
                b.textLabel รูปภาพและวิดีโอ
              .progress-line.bg-dark-grey
              .progress-step
                .dataText 4
                b.textLabel สรุปประกาศ

      .Form.grid.grid-cols-2.grid-rows-2.mt-8
        .flex-col
          span.text-xl จำนวนชั้น
          RadioForm(:options='floor' :value="form.floor" type="custom" name='floor' @input='onFloorChange')
        .flex-col
          span.text-xl จำนวนห้องนอน
          RadioForm(:options='bedroom' :value="form.bedroom" type="custom" name='bedroom' @input='onBedroomChange')
        .flex-col
          span.text-xl จำนวนห้องน้ำ
          RadioForm(:options='bathroom' :value="form.bathroom" type="custom" name='bathroom' @input='onBathroomChange')
        .flex-col
          span.text-xl จำนวนที่จอดรถ
          RadioForm(:options='parking' :value="form.parking" type="custom" name='parking' @input='onParkingChange')

      .text1.grid.grid-cols-4.gap-3
        span ทิศของหน้าบ้าน
          Dropdown.direction(placeholder='ไม่แสดง' name='direction' :options='direction' v-model='form.direction')
        span เฟอร์นิเจอร์
          Dropdown.furniture(placeholder='ไม่แสดง' name='furniture' :options="furniture" v-model='form.furniture')

      .flex.grid.grid-col-4.mt-5
        span.col-start-1 ขนาดที่ดิน*
        span.col-end-6 พื้นที่ใช้สอย*
      .flex.grid.grid-cols-4.gap-3.mt-5
        InputProfile(type="text", labels='จำนวนไร่*' v-model='form.rai')
        InputProfile(type="text", labels='จำนวนงาน*' v-model='form.ngan')
        InputProfile(type="text", labels='จำนวนตารางวา*' v-model='form.squareWa')
        InputProfile(type="text", labels='จำนวนตารางเมตร*' v-model='form.squareMeter')

      span ราคา(บาท)*
      .grid.grid-cols-4.gap-3.mt-5
        InputProfile(type="text", labels='ราคาขาย*' v-model="form.salePrice")
        InputProfile(type="text", labels='ราคาส่วนกลาง/เดือน*' v-model="form.rentalCommonfee")

      .Form2.grid.grid-cols-3
        .div.col-start-1
          span สถานะบ้าน/ห้องปัจจุบัน
          Dropdown.roomStatus(placeholder='ไม่แสดง' name="roomStatus" :options="roomStatus" v-model='form.roomStatus')
        .div.col-end-4
          span เปิดรับตัวแทนจำหน่าย
          RadioForm(:options='agent', name='agent' :value="form.agent" @input='onAgentChange')

      h4 สิ่งอำนวยความสะดวก
      span ส่วนกลาง
      .central.grid.grid.row-gap-5.grid-cols-2.mt-2.border.border-solid.border-black-200.p-5
        .flex
          input(type="checkbox" value="ลิฟต์" v-model="form.commonFee")
          label.ml-2 ลิฟต์
        .flex
          input(type="checkbox" value="ห้องประชุม" v-model="form.commonFee")
          label.ml-2 ห้องประชุม
        .flex
          input(type="checkbox" value="ห้องอ่านหนังสือ" v-model="form.commonFee")
          label.ml-2 ห้องอ่านหนังสือ
        .flex
          input(type="checkbox" value="สวนหย่อม" v-model="form.commonFee")
          label.ml-2 สวนหย่อม
        .flex
          input(type="checkbox" value="มินิมาร์ท" v-model="form.commonFee")
          label.ml-2 มินิมาร์ท
        .flex
          input(type="checkbox" value="รถรับส่ง" v-model="form.commonFee")
          label.ml-2 รถรับส่ง
        .flex
          input(type="checkbox" value="ลานจอดรถ" v-model="form.commonFee")
          label.ml-2 ลานจอดรถ
        .flex
          input(type="checkbox" value="ลานจอดรถใต้ดิน" v-model="form.commonFee")
          label.ml-2 ลานจอดรถใต้ดิน
        .grid.grid-cols-2.gap-4(v-for="(data, index) in commonFee" :key="index")
          .relativeBox
            InputProfile.input(type="text" labels="ส่วนกลาง*" v-model="form.commonFeeCustom")
            .deleteInput(@click="deleteDetailCommonFee()")
              img(src="/delete icn.png",width="30px", alt="alt")
        .addInput(@click="addDetailCommonFee()",v-if="commonFee.length < 1")
          span +เพิ่มอื่นๆ

      span.mt-5 ความปลอดภัย
      .safety.grid.grid.row-gap-5.grid-cols-2.mt-2.border.border-solid.border-black-200.p-5
        .flex
          input(type="checkbox" value="เจ้าหน้าที่รักษาความปลอดภัย" v-model="form.security")
          label.ml-2 เจ้าหน้าที่รักษาความปลอดภัย
        .flex
          input(type="checkbox" value="ระบบ Easy Pass เข้า-ออก" v-model="form.security")
          label.ml-2 ระบบ Easy Pass เข้า-ออก
        .flex
          input(type="checkbox" value="กล้องวงจรปิด(CC TV)" v-model="form.security")
          label.ml-2 กล้องวงจรปิด(CC TV)
        .flex
          input(type="checkbox" value="ระบบ Key Card" v-model="form.security")
          label.ml-2 ระบบ Key Card
        .flex
          input(type="checkbox" value="ระบบเตือนไฟไหม้" v-model="form.security")
          label.ml-2 ระบบเตือนไฟไหม้(Fire alarm system)
        .flex
          input(type="checkbox" value="ระบบแสกนนิ้วมือ" v-model="form.security")
          label.ml-2 ระบบแสกนนิ้วมือ
        .flex
          input(type="checkbox" value="ระบบตรวจสอบจับควันไฟ" v-model="form.security")
          label.ml-2 ระบบตรวจสอบจับควันไฟ(Smoke detector)
        .grid.grid-cols-2.gap-4(v-for="(data, index) in security" :key="index")
          .relativeBox
            InputProfile.input(type="text" labels="ความปลอดภัย*" v-model="form.securityCustom")
            .deleteInput(@click="deleteDetailSecurity()")
              img(src="/delete icn.png",width="30px", alt="alt")
        .addInput(@click="addDetailSecurity()",v-if="security.length < 1")
          span +เพิ่มอื่นๆ


      span.mt-3 สิ่งอำนวยความสะดวก
      .convenient.grid.grid.row-gap-5.grid-cols-2.mt-2.border.border-solid.border-black-200.p-5
        .flex
          input(type="checkbox" value="สระว่ายน้ำ" v-model="form.facilities")
          label.ml-2 สระว่ายน้ำ
        .flex
          input(type="checkbox" value="สระว่ายน้ำเด็ก" v-model="form.facilities")
          label.ml-2 สระว่ายน้ำเด็ก
        .flex
          input(type="checkbox" value="ห้องอบซาวน่า" v-model="form.facilities")
          label.ml-2 ห้องอบซาวน่า
        .flex
          input(type="checkbox" value="ห้องฟิตเนส" v-model="form.facilities")
          label.ml-2 ห้องฟิตเนส
        .flex
          input(type="checkbox" value="ห้องบาสเก็ตบอล" v-model="form.facilities")
          label.ml-2 ห้องบาสเก็ตบอล
        .flex
          input(type="checkbox" value="สนามเด็กเล่น" v-model="form.facilities")
          label.ml-2 สนามเด็กเล่น
        .flex
          input(type="checkbox" value="สโมสร" v-model="form.facilities")
          label.ml-2 สโมสร
        .flex
          input(type="checkbox" value="สนามไดร์กลอฟ" v-model="form.facilities")
          label.ml-2 สนามไดร์กลอฟ
        .flex
          input(type="checkbox" value="ลู่จ๊อกกิ้ง" v-model="form.facilities")
          label.ml-2 ลู่จ๊อกกิ้ง
        .grid.grid-cols-2.gap-4(v-for="(data, index) in facilities" :key="index")
          .relativeBox
            InputProfile.input(type="text" labels="สิ่งอำนวยความสะดวกในการออกกำลังกาย*" v-model="form.facilitiesCustom")
            .deleteInput(@click="deleteDetailFacilities()")
              img(src="/delete icn.png",width="30px", alt="alt")
        .addInput(@click="addDetailFacilities()",v-if="facilities.length < 1")
          span +เพิ่มอื่นๆ

      h4.mt-4 หัวข้อประกาศ*
        .mt-3.grid.grid-cols-12.gap-3
          InputProfile.col-span-10(type="text", labels='หัวข้อภาษาไทย*', placeholder="เช่น พี่เบิร์นสุดจ๊าบอยากขายบ้าน" v-model="form.topicName")

      h4 รายละเอียดเพิ่มเติม*
        Textarea(type="text" v-model="form.moreDetails")

        .flex.justify-between.space-x-2.mt-5
          button.button(@click="backPage") ย้อนกลับ
          button.button.button-next(to="/th/announcement_step_3" @click='nextPage') ต่อไป


</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import InputProfile from '@/components/forms/InputProfile.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import RadioForm from '@/components/forms/RadioForm.vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import Textarea from '@/components/forms/TextArea.vue'

export default defineComponent({
  components: {
    InputProfile,
    Dropdown,
    RadioForm,
    Checkbox,
    Textarea,
  },
  layout: 'post',
  data() {
    return {
      form: {
        bathroom: '',
        bedroom: '',
        floor: '',
        parking: '',
        agent: '',
        direction: '',
        furniture: '',
        roomStatus: '',
        rai: '',
        ngan: '',
        squareWa: '',
        squareMeter: '',
        salePrice: '',
        rentalCommonfee: '',
        commonFee: [],
        commonFeeCustom: '',
        security: [],
        securityCustom: '',
        facilities: [],
        facilitiesCustom: '',
        topicName: '',
        moreDetails: '',
      } as any,
      direction: [
        {
          content: 'เหนือ',
          value: 'เหนือ',
        },
        {
          content: 'ตะวันออกเฉียงเหนือ',
          value: 'ตะวันออกเฉียงเหนือ',
        },
        {
          content: 'ตะวันออก',
          value: 'ตะวันออก',
        },
        {
          content: 'ตะวันออกเฉียงใต้',
          value: 'ตะวันออกเฉียงใต้',
        },
        {
          content: 'ใต้',
          value: 'ใต้',
        },
        {
          content: 'ตะวันตกเฉียงใต้',
          value: 'ตะวันตกเฉียงใต้',
        },
        {
          content: 'ตะวันตก',
          value: 'ตะวันตก',
        },
        {
          content: 'ตะวันตกเฉียงเหนือ',
          value: 'ตะวันตกเฉียงเหนือ',
        },
      ] as any,
      furniture: [
        {
          content: 'ไม่มี',
          value: 'ไม่มี',
        },
        {
          content: 'มีบางส่วน',
          value: 'มีบางส่วน',
        },
        {
          content: 'ตกแต่งครบ',
          value: 'ตกแต่งครบ',
        },
      ] as any,
      floor: [
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
      ],
      bedroom: [
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
      ],
      bathroom: [
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
      ],
      parking: [
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
      ],
      agent: [
        {
          label: 'ไม่เปิดรับ',
          value: 'ไม่เปิดรับ',
        },
        {
          label: 'เปิดรับ',
          value: 'เปิดรับ',
        },
      ],
      roomStatus: [
        {
          content: 'ว่าง',
          value: 'ว่าง',
        },
        {
          content: 'ไม่ว่าง',
          value: 'ไม่ว่าง',
        },
        {
          content: 'อยู่ในช่วงก่อสร้าง',
          value: 'อยู่ในช่วงก่อสร้าง',
        },
      ] as any,
      commonFee: [] as any,
      security: [] as any,
      facilities: [] as any,
    }
  },

  mounted() {
    const post = this.$store.getters['modules/context/post']

    if (post) {
      this.form = {
        ...post,
      }

      console.log('STEP 2 form: ', this.form)
      console.log('STEP 2 post: ', post)
    }
  },

  methods: {
    nextPage() {
      this.form.commonFee = [...this.form.commonFee, this.form.commonFee]
      delete this.form.commonFee
      this.form.security = [...this.form.security, this.form.security]
      delete this.form.security
      this.form.facilities = [...this.form.facilities, this.form.facilities]
      delete this.form.facilities
      this.$store.dispatch('modules/context/SETUP_POST', this.form)
      this.$router.push('/th/announcement_step_3')
    },
    backPage() {
      this.$router.push('/th/announcement_step_1')
    },

    addDetailCommonFee() {
      this.commonFee.push(1)
    },
    deleteDetailCommonFee() {
      this.commonFee.pop()
    },
    addDetailSecurity() {
      this.security.push(1)
    },
    deleteDetailSecurity() {
      this.security.pop()
    },
    addDetailFacilities() {
      this.facilities.push(1)
    },
    deleteDetailFacilities() {
      this.facilities.pop()
    },

    onFloorChange(floor) {
      if (floor) {
        this.form.floor = floor
      }
    },
    onBedroomChange(bedroom) {
      if (bedroom) {
        this.form.bedroom = bedroom
      }
    },
    onBathroomChange(bathroom) {
      if (bathroom) {
        this.form.bathroom = bathroom
      }
    },
    onParkingChange(parking) {
      if (parking) {
        this.form.parking = parking
      }
    },
    onAgentChange(agent) {
      if (agent) {
        this.form.agent = agent
      }
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

.color {
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
.button-next {
  @apply bg-info-500 text-white;
}
button {
  @apply border-info-500 text-info-500 w-full;
}

.addInput {
  cursor: pointer;
  color: #00aeef;
  font-weight: 900;
  text-decoration: none !important;
  &:hover {
    color: rgb(178, 137, 231);
  }
}
.relativeBox {
  position: relative;
}
.deleteInput {
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 0.7;
}
</style>
