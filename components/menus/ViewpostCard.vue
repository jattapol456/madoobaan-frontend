<template lang="pug">
NuxtLink.card-section.mt-12.text-decoration-none(
  v-if='alive',
  :to='`/th/announces_detail/${idCard}`'
)
  .card.bg-white.w-full.h-full.border-black-200.border-2.mt-2
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
import {CardService} from '@/services'
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
      //- const data = await fetch(
      //-   `http://127.0.0.1:3000/announces/${this.idCard}`,
      //-   {
      //-     method: 'DELETE',
      //-     headers: {
      //-       'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFkb29iYWFuLWRldiIsImF1ZCI6Im1hZG9vYmFhbi1kZXYiLCJhdXRoX3RpbWUiOjE2MjIxMjE3MTUsInVzZXJfaWQiOiJhUmUybzN0OW5GYjBPNDhscm84WlF1bkxpcFUyIiwic3ViIjoiYVJlMm8zdDluRmIwTzQ4bHJvOFpRdW5MaXBVMiIsImlhdCI6MTYyMjEyMTcxNSwiZXhwIjoxNjIyMTI1MzE1LCJlbWFpbCI6InJvbWVvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJyb21lb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.WcT7BwdbD4S_woXt0H-7nKVqjUxl9jsrfE9o_62L4HPpZxnIlSkMsO2yANs339i_a3p5KktY7a7ysrZ_Rl7oxoRIS4QBwboIGPQ5OQony0MLU6q6ukzdC94WZw_QPSLLitOLssDTIqONqo9YVaGYblIjiMzeso9BlKFje-jQo-Ok6ibwqOHDB6Mgk1hwNJ7Qi9jbtLZTyYba16VQZvA5PPD7frSu8FfM5NHO18HcHAvHEtQCq_CA51_XyBh-a6z6zfC7rJ9FCPJoOPUAULLT4yeGMUqvo0EyAiFnG0yn89Qj-ox9VglovsZgvdedbzDloYzOMNqzaoe89rhz_Bp38w',
      //-       'Content-Type': 'application/json',
      //-     },
      //-   }
      //- )
      //- const raw = await data.clone().json()
      if (confirm('are you sure?')) {
        //- const deletedata = await this.$axios.delete(
        //-   `http://127.0.0.1:3000/announces/${this.idCard}`
        //- )
        const deletedata = await CardService.deleteCard(this.idCard)
        this.alive = false
        //- console.log(deletedata)
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
    object-fit: cover;
  }
}
</style>
