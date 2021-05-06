<template lang="pug">
.container.min-h-screen.pt-20
  h1 โซนทั้งหมดนะ
  .select-zone.flex.justify-items-center.pt-10
    .select-province.pr-6.pb-2  
      h3 จังหวัด
      Dropdown(:options='dropdownProvince', v-model='seletedProvince', placeholder="เลือกจังหวัด")
    .select-district.pb-2
      h3 อำเภอ
      Dropdown(:options='dropdownDistrict', v-model='seletedDistrict', placeholder="เลือกอำเภอ")

  .zone
      .img-container.pt-5
        figure(v-for='zone in zonePaginate')
          .zone-item.drop-shadow-lg
            img(:src='zone.img')
            .zone-title
              figcaption
                h3 {{ zone.subdistrict_name }}

  .pt-10.flex.justify-center
    Pagination(:value='value', @change='handleChange')
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Dropdown from '@/components/forms/Dropdown.vue'
import Pagination from '@/components/menus/Pagination.vue'

import { getProvinces, getDistricts, getZones } from '@/helpers/getData'

export default defineComponent({
  components: {
    Dropdown,
    Pagination,
  },

  data() {
    return {
      seletedProvince: null,
      dropdownProvince: [
        ...getProvinces().map((e) => ({
          content: e.PROVINCE_NAME,
          value: e.PROVINCE_ID,
        })),
      ],
      dropdownDistrict: [{ content: '', value: 0 }],
      seletedDistrict: null,
      zones: [...getZones(null)],
      perPage: 30,
      value: {
        page: 1,
        totalPages: 1,
      },
    }
  },
  computed: {
    zonePaginate() {
      return this.zones.slice(
        (this.value.page - 1) * this.perPage,
        this.value.page * this.perPage
      )
    },
  },
  watch: {
    seletedProvince(to) {
      this.dropdownDistrict = getDistricts(to).map((e) => ({
        content: e.DISTRICT_NAME,
        value: e.DISTRICT_ID,
      }))
    },
    seletedDistrict(to) {
      ;(this.zones as any) = getZones(to)
    },
  },
  mounted() {
    this.value.totalPages = Math.round(this.zones.length / this.perPage)
  },
  methods: {
    handleChange(newPage) {
      this.value.page = newPage
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  @apply p-64;
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
  .c.container {
    @apply p-10;
  }
  .img-container {
    @apply grid-cols-1;
  }
}
.text-zone {
  @apply;
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
.select-province {
  @apply w-full;
}
.select-district {
  @apply w-full;
}
</style>
