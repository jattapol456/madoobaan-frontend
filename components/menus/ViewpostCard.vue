<template lang="pug">
NuxtLink.card-section.mt-12.text-decoration-none(
  v-if='alive',
  :to='`/th/announces_detail/${idCard}`'
)
  .card-container.bg-white.w-full.h-full.border-black-200.border-2.mt-2
    .grid.grid-cols-5.items-center
      .card-image.text-decoration-none
        .img-card
          img(:src='coverPhoto')
      .card-header.p-4.col-span-3
        .card-type.h5
          p {{ type }}
        .card-topicName
          h4 {{ topicName }}
        .price(v-if='salePrice')
          h4.text-info-500 {{ salePrice }} ฿
      .card-footer.flex.space-x-2
        button.button แก้ไข
        button.button(@click.stop.prevent='deleteCard') ลบ
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CardService } from '@/services'
export default defineComponent({
  props: {
    coverPhoto: {
      type: String,
      default: null,
    },
    idCard: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    topicName: {
      type: String,
      default: null,
    },
    salePrice: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      alive: true,
    }
  },
  methods: {
    async deleteCard() {
      console.log('delete', this.idCard)
      if (confirm('are you sure?')) {
        const deletedata = await CardService.deleteCard(this.idCard)
        this.alive = false
      }
      console.log(this.alive)
    },
    inCard(string) {
      console.log(string)
    },
  },
})
</script>
<style lang="scss" scoped>
.card-section {
  @apply w-full;
}
p {
  @apply text-black-300;
}

.card-body {
  p {
    margin: 0;
  }
}
.text-decoration-none {
  text-decoration: none !important;
}

.card-image {
  .img-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
