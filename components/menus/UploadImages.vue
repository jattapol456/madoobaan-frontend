<template lang="pug">
span(@click="openUpload")
  img(class="object-cover" ref="preview" :src="showImage" style="width: 200px; height: 200px")
  input#file-field(ref="input" @change="previewImage" type="file" accept="image/*" style="display: none")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data: () => {
    return {
      showImage: 'https://semantic-ui.com/images/wireframe/square-image.png',
    }
  },

  methods: {
    openUpload() {
      this.$refs.input.click()
    },

    previewImage() {
      const reader = new FileReader()
      reader.readAsDataURL(this.$refs.input.files[0])

      reader.onload = (e) => {
        this.showImage = e.target.result
      }
    },
  },
})
</script>
