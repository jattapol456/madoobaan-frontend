<template lang="pug">
.management-page
  section.section-hero.h-screen.bg-hero(style="background-image: url('https://www.madoobaan.com/wp-content/uploads/2021/03/bg-Header-3.jpg');")
    .block-content
      .title.h-full.w-full.flex.flex-col.justify-center
        .text-white.text-center
          h1 เว็บประกาศ ขาย เช่า บ้าน ที่ดิน ภาคเหนือ เชียงใหม่ เชียงราย
          h4 หากคุณกำลังมองหาบ้าน ที่ดิน ภาคเหนือ เชียงใหม่ เชียงราย เราช่วยคุณได้!

  section.section-zones
    .block-content
      .container.pt-10
        h1 โซนทั้งหมด

    .zone(v-if="loading.fetching.subdistrict == false")
        .img-container.pt-5
          figure(v-for="(item) in subdistrictList2")
            .zone-item.drop-shadow-lg
              img(:src='item.img')
              .zone-title
                figcaption
                  h3 {{ item.subDistrictName }}

    .section-Pagination.pt-10.flex.justify-center
      Pagination(:value='value', @change='handleChange')
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Pagination from '@/components/menus/Pagination.vue'
import { ZonesService } from '@/services'
import { IinsertZone } from '@/types/zone'

export default defineComponent({
  components: {
    Pagination,
  },

  data() {
    return {
      perPage: 30,
      value: {
        page: 1,
        totalPages: 1,
      },
      subdistrictList: [] as IinsertZone[],
      subdistrictList2: [] as IinsertZone[],
      loading: {
        fetching: {
          subdistrict: false,
        },
      },
    }
  },
  mounted() {
    this.fetchSubdistrict()
  },
  methods: {
    handleChange(newPage) {
      this.value.page = newPage
      this.subdistrictList2 = this.subdistrictList.slice(
        (this.value.page - 1) * this.perPage,
        this.value.page * this.perPage
      )
    },

    fetchSubdistrict() {
      this.loading.fetching.subdistrict = true

      ZonesService.getSubDistrict().then((res) => {
        this.subdistrictList = res
        this.value.totalPages = Math.ceil(
          this.subdistrictList.length / this.perPage
        )
        this.subdistrictList2 = this.subdistrictList.slice(
          (this.value.page - 1) * this.perPage,
          this.value.page * this.perPage
        )
        this.loading.fetching.subdistrict = false
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-hero {
  @apply bg-cover bg-center h-full w-full inset-0 z-10;
}
.block-content {
  height: 100%;
  align-items: center;
}
.img-container {
  @apply grid grid-cols-3 gap-3;
}

@screen md {
  .img-container {
    @apply grid-cols-2;
  }
  .container {
    @apply p-12;
  }
}

@screen sm {
  .img-container {
    @apply grid-cols-1;
  }
  .container {
    @apply p-10;
  }
  .section-Pagination {
    @apply p-5;
  }
}
.zone-item {
  @apply relative;
}

figcaption {
  @apply text-white absolute w-full bottom-0 bg-black-900 h-8 bg-opacity-50 rounded-b-md;

  h3 {
    @apply text-4 font-noto font-bold m-1 whitespace-no-wrap overflow-hidden;

    text-overflow: ellipsis;
  }
}
figure figcaption {
  vertical-align: middle;
  border-style: none;
}
img {
  @apply w-full h-40 rounded-md object-cover;
}
</style>
