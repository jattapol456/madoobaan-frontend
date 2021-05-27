<template lang="pug">
.management-page
  section
    .block-content
    .step-bar-container
      h1.mt-24 ลงประกาศ
      .mt-8.step-bar
        .rower.mx-0
          .step.px-0.color
            .progress-line.progress-active
            .progress-step
              .dataText.active 1
              b.textLabel.active ข้อมูลสำคัญ
          .step.px-0.color
            .progress-line.progress-active
            .progress-step
              .dataText.active 2
              b.textLabel.active ข้อมูลเพิ่มเติม
          .step.px-0.color
            .progress-step
              .dataText.active 3
              b.textLabel.active รูปภาพและวิดีโอ
            .progress-line.bg-dark-grey
            .progress-step
              .dataText 4
              b.textLabel สรุปประกาศ

      .mt-16
        h3.py-10 คำแนะนำสำหรับการใช้รูปภาพ
        .flex.grid.grid-cols-3.gap-4
          .mt-5.w-full
            h5 อนุญาต
            label.mt-3 รูปภาพที่ชัดเจนไม่มืดหรือมัว
            .border-green.border-redbox-border.h-40.w-60.p-4.border-2.mt-6
              img.object-none.h-full.w-full(
                src='~/static/images/img-checked-ex-pic-1.svg'
              )
          .mt-5.w-full
            h5 ไม่อนุญาต
            label.mt-3 ไม่อนุญาติรูปภาพที่มีใบหน้าข้อความลายน้ำ
              .border-red.border-redbox-border.h-40.w-60.p-4.border-2.mt-6
                img.object-none.h-full.w-full(
                  src='~/static/images/img-checked-ex-pic-2.svg'
                )
          .mt-5.w-full
            h5 ไม่อนุญาต
            label.mt-3 รูปที่มีหลายภาพวางซ้อนทับกัน
              .border-red.border-redbox-border.h-40.w-60.p-4.border-2.mt-6
                img.object-none.h-full.w-full(
                  src='~/static/images/img-checked-ex-pic-3.svg'
                )

        .w-full
          h3.mt-10 เพิ่มรูปภาพปก
          label.label-grey.mt-3 คำแนะนำ : ควรเป็นรูปภาพแนวนอนสัดส่วน 16:9 เพื่อความสวยงาม ขนาดรูปไม่เกิน 5 MB.

          .img.mt-10
            img.imagePreviewWrapper(
              :src='previewImage',
              :style='{ "background-image": `url(${previewImage})` }'
            )
            input(type='file', @change='previewFiles', multiple='')

        .w-full
          h3.mt-8 รูปภาพ
          label.label-grey.mt-3 เพิ่มรูปภาพบรรยากาศ สิ่งอำนวยความสะดวก

        .mt-5.flex.justify-between
          label(
            :forHtml='`upload_${index}`',
            v-for='(item, index) in [...Array(4)]',
            :key='index'
          )
            img.imagePreviewWrapper(
              :src='`${previewImage2[index] ? previewImage2[index] : "https://semantic-ui.com/images/wireframe/square-image.png"}`',
              :style='{ "background-image": "https://semantic-ui.com/images/wireframe/square-image.png" }'
            )
            input.hidden.cursor-pointer(
              type='file',
              :id='`upload_${index}`',
              @change='previewFiles2($event, index)',
              multiple=''
            )

    .flex.justify-between.space-x-2.mt-5
      button.button(@click='backPage') ย้อนกลับ
      button.button.button-next(@click='nextPage') ต่อไป
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Radios from '@/components/forms/Radios.vue'
import InputProfile from '@/components/forms/InputProfile.vue'
import firebase from 'firebase'

export default defineComponent({
  components: {
    Radios,
    InputProfile,
  },
  layout: 'post',
  data() {
    return {
      previewImage: '',
      form: {
        coverPhoto: '',
        photo: [],
      } as any,
      previewImage2: [] as any,
    }
  },
  mounted() {
    const post = this.$store.getters['modules/context/post']

    if (post) {
      this.form = {
        ...this.form,
        ...post,
      }

      console.log('STEP 3: ', this.form)
    }
  },
  methods: {
    nextPage() {
      this.$store.dispatch('modules/context/SETUP_POST', this.form)
      this.$router.push('/th/announcement_step_4')
      console.log(this.form)
    },
    backPage() {
      this.$router.push('/th/announcement_step_2')
    },
    previewFiles(event) {
      this.previewImage = URL.createObjectURL(event.target.files[0])
      console.log(this.previewImage)
      console.log(event.target.files)

      const ref = firebase
        .storage()
        .ref('coverPhotos/' + event.target.files[0].name)

      const task = ref.put(event.target.files[0])

      task.on(
        'state_change',
        (_snap) => {},
        (_e) => {},
        async () => (this.form.coverPhoto = await ref.getDownloadURL())
      )
    },
    previewFiles2(event, index: any) {
      const listFile = this.previewImage2
      listFile[index] = URL.createObjectURL(event.target.files[0])
      this.previewImage2 = [...listFile]
      console.log('event: ', this.previewImage2)
      console.log(event.target.files)

      const ref = firebase.storage().ref('photos/' + event.target.files[0].name)

      const task = ref.put(event.target.files[0])

      task.on(
        'state_change',
        (_snap) => {},
        (_e) => {},
        async () =>
          (this.form.photo = [...this.form.photo, await ref.getDownloadURL()])
      )
    },
    previewArray(event) {
      this.previewImage = URL.createObjectURL(event.target.files[0])
      console.log(this.previewImage)
      console.log(event.target.files)

      const ref = firebase.storage().ref('photos/' + event.target.files[0].name)

      const task = ref.put(event.target.files[0])

      task.on(
        'state_change',
        (_snap) => {},
        (_e) => {},
        async () => (this.form.coverPhoto = await ref.getDownloadURL())
      )
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

.button-next {
  @apply bg-info-500 text-white;
}
button {
  @apply border-info-500 text-info-500 w-full;
}
.imagePreviewWrapper {
  @apply left-0 object-contain;

  width: 400px;
  height: 200px;
  display: block;
  margin: 0 auto 30px;
  background-size: cover;
}
</style>
