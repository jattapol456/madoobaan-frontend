<template lang="pug">
.management-page
  section
    .block-content
      h1.mt-24 ลงประกาศ
    div
      .mt-5.step-bar
        .rower.mx-0
          .step.px-0.color
            .progress-line.bg-dark-grey
            .progress-step
              .dataText.active 1
              b.textLabel.active ข้อมูลสำคัญ
          .step.px-0.color
            .progress-line.bg-dark-grey
            .progress-step
              .dataText 2
              b.textLabel ข้อมูลเพิ่มเติม
          .step.px-0.color
            .progress-step
              .dataText 3
              b.textLabel รูปภาพและวิดีโอ
            .progress-line.bg-dark-grey
            .progress-step
              .dataText 4
              b.textLabel สรุปประกาศ

      .mt-10
      span.text-xl ประเภทประกาศ*
      RadioForm(
        :options='announceType',
        name='announceType',
        :value="form.announceType"
        @input='onAnnounceTypeChange'
      )
      .mt-5
      span.text-xl ประเภทอสังหาริมทรัพย์*
      RadioForm(
        :options='type',
        name='type',
        :value="form.type"
        @input='onTypeChange'
      )
      .mt-5
        span.text-xl ที่อยู่*
          .grid.grid-cols-4.grid-rows-2.gap-4.flex.items-center
            Dropdown#province(
              placeholder='จังหวัด',
              name='province',
              :value='form.province'
              :options='province',
              @input='provinceChange($event)',
            )
            Dropdown#district(
              placeholder='อำเภอ',
              :value='form.district'
              name='district',
              :options='district',
              @input='districtChange($event)',
            )
            Dropdown#subDistrict(
              placeholder='ตำบล',
              :value='form.subDistrict'
              name='subDistrict',
              :options='subDistrict',
              @input='subDistrictChange($event)',
            )
            Dropdown#zipcode(
              placeholder='รหัสไปรษณีย์',
              :value='form.zipcode'
              name='zipcode',
              :options='zipcode',
              @input='zipCodeChange($event)',
            )
            InputProfile#houseNumber(
              type="text",
              labels='บ้านเลขที่*',
              v-model='form.houseNumber'
            )
            InputProfile#moo(
              type="text",
              labels='หมู่*',
              v-model='form.moo'
            )
            InputProfile#soi(
              type="text",
              labels='ซอย*',
              v-model='form.soi'
            )
            InputProfile#road(
              type="text",
              labels='ถนน*',
              v-model='form.road'
            )

        span กดเลื่อนหมุดสีแดงไปยังตำแหน่งที่ตั้งทรัพย์ของคุณ

        iframe(
          width='100%',
          height='450',
          style='border: 0',
          loading='lazy',
          allowfullscreen='',
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64833480.0554912!2d70.63603425!3d7.340240650000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d28e48d9c190b%3A0x30a49660ab9bf318!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4p-C4seC4h-C5gOC4oOC4quC4seC4iuC4n-C4suC4o-C5jOC4oeC4suC4i-C4ueC4leC4tOC4hOC4reC4pSDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1620237644995!5m2!1sth!2sth'
        )

        .grid.grid-cols-3.gap-3.mt-5.items-center
          InputProfile(type="text", labels='ละติจูด*')
          InputProfile(type="text", labels='ลองติจูด*')
          button.button แก้ไขละติจูด-ลองติจูด

        span ข้อมูลติดต่อ*
          .grid.grid-cols-2.gap-4.mt-4
            InputProfile(type="text", labels='เบอร์โทรศัพท์*')
            InputProfile(type="text", labels='ข้อมูลผู้ติดต่อ*')

        .grid.grid-cols-2.grid-rows-2.gap-4.mt-3
          InputProfile(type="text", labels='Facebook*')
          InputProfile(type="text", labels='อีเมล*')
          h1.text-3 *ตัวอย่าง https://www.facebook.com/profile

        .flex.space-x-2(@click='checkboxer()')
          input#vehicle1(type='checkbox', name='cc', :checked='checked')
          label(for='cc') ผูกไอดีไลน์กับเบอร์มือถือ

        InputProfile.mt-4(type="text", v-if='!checked', labels='Line id*')

        .flex.justify-between.space-x-2.mt-5
          button.button(@click="backPage") ยกเลิก
          button.button.button-next(@click='nextPage') ต่อไป

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RadioForm from '@/components/forms/RadioForm.vue'
import InputProfile from '@/components/forms/InputProfile.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import provinceData from '../../helpers/db/Thailand-Address/provinces.json'
import districtData from '../../helpers/db/Thailand-Address/districts.json'
import subDistrictData from '../../helpers/db/Thailand-Address/subDistricts.json'
import zipcodeData from '../../helpers/db/Thailand-Address/zipcodes.json'

export default defineComponent({
  components: {
    Dropdown,
    InputProfile,
    RadioForm,
  },
  layout: 'post',
  data() {
    return {
      form: {
        houseNumber: '',
        moo: '',
        soi: '',
        road: '',
        province: '',
        district: '',
        subDistrict: '',
        provinceName: '',
        districtName: '',
        subDistrictName: '',
        zipcode: '',
        zipcodeName: '',
        announceType: '',
        type: '',
      } as any,
      announceType: [
        {
          label: 'ขาย',
          content: 'ขาย',
          value: 'ขาย',
        } as any,
      ],
      type: [
        {
          label: 'บ้าน',
          content: 'บ้าน',
          value: 'บ้าน',
        },
        {
          label: 'คอนโด',
          content: 'คอนโด',
          value: 'คอนโด',
        },
        {
          label: 'ทาวน์โฮม',
          content: 'ทาวน์โฮม',
          value: 'ทาวน์โฮม',
        },
        {
          label: 'ที่ดิน',
          content: 'ที่ดิน',
          value: 'ที่ดิน',
        },
        {
          label: 'อพาร์ทเม้นท์',
          content: 'อพาร์ทเม้นท์',
          value: 'อพาร์ทเม้นท์',
        },
        {
          label: 'อาคาร',
          content: 'อาคาร',
          value: 'อาคาร',
        },
      ] as any,
      checked: false,
      province: [
        {
          value: '',
          content: '',
        },
      ] as any,
      district: [
        {
          value: '',
          content: '',
        },
      ] as any,
      subDistrict: [
        {
          value: '',
          content: '',
        },
      ] as any,
      zipcode: [
        {
          value: '',
          content: '',
        },
      ] as any,
    }
  },
  mounted() {
    const post = this.$store.getters['modules/context/post']

    if (post) {
      this.form = {
        ...this.form,
        ...post,
      }
      this.provinceChange(this.form.province)
      this.districtChange(this.form.district)
      this.subDistrictChange(this.form.subDistrict)
      this.zipCodeChange(this.form.zipcode)

      console.log('STEP 1 form: ', this.form)
      console.log('STEP 1 post: ', post)
    }

    this.province = provinceData.map((data) => {
      return {
        value: data.PROVINCE_ID,
        content: data.PROVINCE_NAME,
      }
    })
  },
  methods: {
    nextPage() {
      this.form = {
        ...this.form,
        announceType: this.form.announceType,
        type: this.form.type,
        provinceName: this.province.find((e) => e.value === this.form.province)
          ?.content,
        districtName: this.district.find((e) => e.value === this.form.district)
          ?.content,
        subDistrictName: this.subDistrict.find(
          (e) => e.value === this.form.subDistrict
        )?.content,
        zipcodeName: this.zipcode.find((e) => e.value === this.form.zipcode)
          ?.content,
      }
      // console.log(this.form)
      console.log('next form : ', this.form)
      this.$store.dispatch('modules/context/SETUP_POST', this.form)
      this.$router.push('/th/announcement_step_2')
    },
    backPage() {
      this.$router.push('/')
    },
    provinceChange(event) {
      console.log(event)
      if (event) {
        this.form.province = event
        this.district = districtData.filter(
          (data) => data.PROVINCE_ID === event
        )
      }
    },
    districtChange(event) {
      console.log(event)
      if (event) {
        this.form.district = event
        this.subDistrict = subDistrictData.filter(
          (data) => data.DISTRICT_ID === event
        )
      }
    },
    subDistrictChange(event) {
      console.log(event)
      if (event) {
        this.form.subDistrict = event
        this.zipcode = zipcodeData.filter(
          (data) => data.SUB_DISTRICT_ID === event
        )
      }
    },
    zipCodeChange(event) {
      console.log(event)
      if (event) {
        this.form.zipcode = parseInt(event)
      }
    },
    checkboxer() {
      this.checked = !this.checked
    },

    onAnnounceTypeChange(announceType) {
      if (announceType) {
        this.form.announceType = announceType
      }
    },
    onTypeChange(type) {
      if (type) {
        this.form.type = type
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

.relativeBox {
  position: relative;
}
</style>
