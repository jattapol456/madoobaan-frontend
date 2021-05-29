<template lang="pug">
.management-page
  section.Rent-dorm.mt-8
    .block-content
    div.flex.w-full.space-x-4.items-center
      img.img-profile.mt-24(:src="form.avatar")
      div
        div.mt-20.flex.space-x-4
          h3 {{form.firstname}}
          h3 {{form.lastname}}
        div.flex.space-x-1.mt-3
          label.label-grey {{form.email}}
          label.label-blue.cursor-pointer(@click="goToMeProfie") แก้ไขโปรไฟล์

    .w-full.mt-16
      UserViewpostBlogSection

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserViewpostBlogSection from '@/components/sections/user/UserViewpostBlogSection.vue'
import Radios from '@/components/forms/Radios.vue'
import InputProfile from '@/components/forms/InputProfile.vue'
import { omit } from 'lodash'
import { id } from 'date-fns/locale'

export default defineComponent({
  components: {
    Radios,
    InputProfile,
    UserViewpostBlogSection,
  },
  posts: {},
  layout: 'post',
  data() {
    return {
      form: {},
    }
  },
  async mounted() {
    const data = await fetch(`http://127.0.0.1:3000/users/${id}`)
    const raw = await data.clone().json()
    // - console.log(raw.topicName)
    this.posts = raw
  },
  created() {
    this.form =
      omit(this.$store.getters['modules/me/profile'], ['id']) || this.form

    console.log(this.form)
  },
  methods: {
    goToMeProfie() {
      this.$router.push({ name: 'lang-users-id', params: { id: 'me' } })
    },
  },
})
</script>

<style lang="scss" scoped>
.management-page {
  @apply flex w-full h-full max-w-7xl m-auto;
}
.ulgrey {
  border-color: rgba(229, 231, 235);
}

.activeborder {
  background-color: white;
  display: inline-block;
  border-left-width: 2px;
  border-top-width: 2px;
  border-right-width: 2px;
  border-top-left-radius: 0.25rem /* 4px */;
  border-top-right-radius: 0.25rem /* 4px */;
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  font-weight: 600;
  border-color: rgba(229, 231, 235);
  color: rgb(59, 69, 85);
}

h5 {
  color: gray;
}

.step-bar {
  height: 56px;
}
.c-green {
  color: rgb(39, 133, 101);
}

.img-profile {
  @apply rounded-full object-cover;

  height: 110px;
  width: 110px;
}

.border-green {
  border-color: rgb(27, 185, 103);
}

.border-red {
  border-color: red;
}

.border-gray {
  border-color: gray;
}

.border-small {
  width: 220px;
  height: 80px;
}

.border-small2 {
  width: 220px;
  height: 40px;
}

.img-box {
  width: 220px;
  height: 120px;
}

.img-box-small {
  width: 110px;
  height: 100px;
}

.label-grey {
  color: #999;
}

.label-blue {
  color: #00aeef;
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

.search {
  @apply border-2 border-black-400 p-3;
}

.button-primary {
  background: #00aeef;
  color: white;
  height: 20px;
  padding-left: 10px;
  width: 30px;
  text-align: center;
  font-size: 6px;
}
.button-secondary {
  background-color: white;
  color: gray;
  border: 2px solid;
  padding-left: 10px;
  height: 22px;
  width: auto;
  text-align: center;
  font-size: 6px;
}
button {
  @apply border-info-500 text-info-500 w-full;
}
</style>
