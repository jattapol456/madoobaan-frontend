<template lang="pug">
.management-page
  section
    .block-content
      h1.mt-24 ลงประกาศ
    .div
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
      RadiosTest(
        :options='mock',
        name="test",
      )
      .mt-5
      span.text-xl ประเภท*
      RadiosTest(
        :options='mock2',
        name="test2",
      )
      .mt-5
        span.text-xl ที่อยู่*
          .grid.grid-cols-4.grid-rows-2.gap-4.mt-2
            Dropdown(placeholder='จังหวัด',name="provi",:options="provi",@input="proviChange($event)")
            Dropdown(placeholder='อำเภอ',name="dis",:options="dis",@input="disChange($event)")
            Dropdown(placeholder='ตำบล',name="sub",:options="sub")
            InputProfile(type=text, labels='รหัสไปรษณีย์*')
            InputProfile(type=text, labels='บ้านเลขที่*')
            InputProfile(type=text, labels='หมู่*')
            InputProfile(type=text, labels='ซอย*')
            InputProfile(type=text, labels='ถนน*')

        span กดเลื่อนหมุดสีแดงไปยังตำแหน่งที่ตั้งทรัพย์ของคุณ

        //- iframe(width='600',height='450',style='border:0',loading='lazy',allowfullscreen='',src='https://www.google.com/maps/embed/v1/place?q=18.808735,98.978646&key=AIzaSyAuk74US5FIghZmImV67P_XE2dTqWtbJEE&zoom=16')
        iframe(width='100%',height='450',style='border:0',loading='lazy',allowfullscreen='',src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64833480.0554912!2d70.63603425!3d7.340240650000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d28e48d9c190b%3A0x30a49660ab9bf318!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4p-C4seC4h-C5gOC4oOC4quC4seC4iuC4n-C4suC4o-C5jOC4oeC4suC4i-C4ueC4leC4tOC4hOC4reC4pSDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1620237644995!5m2!1sth!2sth')
        
        .grid.grid-cols-3.gap-3.mt-5
          InputProfile(type=text, labels='ลำติจูด*')
          InputProfile(type=text, labels='ลองติจูด*')
          button.button.w-full.h-14 แก้ไขละติจูด-ลองติจูด

        span.mt-3 ข้อมูลติดต่อ*
          .grid.grid-cols-2.gap-4.mt-4
            InputProfile(type=text, labels='ข้อมูลผู้ติดต่อ*')
            InputProfile(type=text, labels='เบอร์โทรศัพท์*')
        
          .grid.grid-cols-2.gap-4(v-for="(phone, index) in phone" :key="index")
            .relativeBox
              InputProfile.input(type=text labels="เบอร์โทรศัพท์*")
              .deletePhone(@click="deletePhone()")
                img(src="/delete icn.png",width="30px", alt="alt")
          .addphone(@click="addPhone()",v-if="phone.length < 1")
            span +เพิ่มเบอร์โทรศัพท์*


        .grid.grid-cols-2.grid-rows-2.gap-4.mt-3
          InputProfile(type=text, labels='อีเมล*') 
          InputProfile(type=text, labels='Facebook*')
          h1.text-3 *ตัวอย่าง https://www.facebook.com/profile


        //- InputProfile.input(type=text,labels="เบอร์โทรศัพท์*",v-for="(phone, index) in phone",:key="index")

        .flex.space-x-2(@click="checkboxer()")
          input#vehicle1(type='checkbox',name="cc",:checked="checked")
          label(for="cc") ผูกไอดีไลน์กับเบอร์มือถือ

        InputProfile.mt-4(type=text,v-if="!checked", labels='Line id*') 

        .flex.justify-between.space-x-10.mt-5
          button.button.w-full(onclick="window.location.href='http://localhost:8080/th/';" value="return") ยกเลิก
          button.button.w-full บันทึกแบบร่าง
        .mt-5
        button.button.button-primary.w-full(onclick="window.location.href='http://localhost:8080/th/create_post/announcement_step_2';" value="post2") ต่อไป



</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import Radios, { Option } from '@/components/forms/Radios.vue'
import RadiosTest from '@/components/forms/RadioTest.vue'
import InputProfile from '@/components/forms/InputProfile.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import proviData from '../../../helpers/db/Thailand-Address/provinces.json'
import disData from '../../../helpers/db/Thailand-Address/districts.json'
import subData from '../../../helpers/db/Thailand-Address/subDistricts.json'

export default defineComponent({
  components: {
    Radios,
    Dropdown,
    InputProfile,
    RadiosTest
  },
  data() {
    return {
      mock: [
        {
          label: 'ขาย',
          value: 'sale',
        },
      ],
       mock2: [
        {
          label: 'บ้าน',
          value: 'home',
        },
        {
          label: 'คอนโด',
          value: 'condo',
        },
        {
          label: 'ทาวน์โฮม',
          value: 'townhome',
        },
        {
          label: 'ที่ดิน',
          value: 'earth',
        },
        {
          label: 'อาคารพาณิชย์/สำนักงาน',
          value: 'w',
        },
        {
          label: 'หอพัก/อพาร์ทเม้นท์',
          value: 'hotel',
        },
        {
          label: 'อื่นๆ',
          value: 'more',
        },
        ],
        phone: [] as any,
        checked: false,
        provi: [{
          value:'',
          content: ''
        }] as any,
        dis: [{
          value:'',
          content: ''
        }] as any,
        sub: [{
          value:'asd',
          content: 'asd'
        }] as any,
    }
  },
  mounted() {
    //- console.log(this.provi.find(data => data.value == "sss"))
    //- this.provi = zones.filter((v,i,a)=>a.findIndex(t=>(t.province_id === v.province_id))===i)
    //- this.provi = 
    this.provi = proviData.map((data) => {
      return {
        value: data.PROVINCE_ID,
        content: data.PROVINCE_NAME
      }
    })
  },
   methods: {
    proviChange : function(event){
      console.log('logggggggvgg')
      console.log(event)
      this.dis = disData.filter(data => data.PROVINCE_ID == event)
    },
    disChange: function(event){
      console.log(event)
      this.sub = subData.filter(data => data.DISTRICT_ID == event)
    },
    addPhone: function(){
      this.phone.push(1)
    },
    deletePhone: function(){
      this.phone.pop()
    },
    checkboxer: function() {
      this.checked = !this.checked  
    }
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

.button {
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