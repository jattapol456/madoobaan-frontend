<template lang="pug">
  .profile-pic.relative
    .ratio.ratio-1by1
      img(:src="preview")

    input.file-input(ref="fileInput" type="file" @change="onChange" accept=".png, .jpg, .jpeg")

    .loader-overlay.absolute.z-0(v-if="loading")
      div
        .loader.is-primary

    button.button.is-square.outline-none.button-img(type="button" @click="click" :disabled="loading")
      ion-icon(name="camera-outline" )
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UploadProfile',

  inheritAttrs: false,

  props: {
    initPreview: {
      type: String,
      default: '',
    },

    loading: {
      type: (Boolean as unknown) as PropType<boolean | null>,
      default: null,
    },
  },

  emits: ['change', 'input'],

  setup() {
    const fileInput = ref()

    return {
      fileInput,
    }
  },

  data() {
    return {
      preview: null as string | ArrayBuffer | null | undefined,
    }
  },

  watch: {
    initPreview(val) {
      this.preview = val
    },
  },

  mounted() {
    if (this.initPreview && this.initPreview.length > 0) {
      this.preview = this.initPreview
    } else {
      this.preview = `/images/mock-up/avatar/company.png`
    }
  },

  methods: {
    onChange(e) {
      const files = this.fileInput.files

      if (typeof this.loading !== 'boolean') {
        this.readFileURL(files)
      }

      this.$emit('input', files)
      this.$emit('change', e)
    },

    click() {
      this.fileInput.click()
    },

    readFileURL(files) {
      if (files && files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => (this.preview = e.target?.result)
        reader.readAsDataURL(files[0])

        return
      }

      this.preview = null
    },
  },
})
</script>

<style lang="scss" scoped>
.profile-pic {
  @apply w-full rounded-md border border-black-50 overflow-hidden;

  image {
    @apply w-full h-full;
  }

  input {
    @apply absolute opacity-0 pointer-events-none;
  }

  .button-img {
    @apply absolute bottom-0 right-0 m-2 border-0 shadow-hard;
  }
}
</style>
