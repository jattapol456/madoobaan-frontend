<template lang="pug">
NuxtLink.card-section.mt-12.text-decoration-none(:to="`/th/announces_detail/${ idCard }`")
  .card.bg-white.w-full.h-full.border-black-200.border-2
    .card-image.relative.text-decoration-none
      .ads(v-if='ads') {{ ads }}
      .likeIcon(v-if='likeIcon')
        ion-icon(:src='likeIcon', name='heart-outline')
      .review(v-if='review')
        p {{ review }}
      .description(v-if='bedroom')
        p.absolute.text-white.text-sm.mb-2.ml-2.left-0.bottom-0 {{ bedroom }} ห้องนอน {{ bathroom }} ห้องน้ำ
      .logo(v-if='logo')
        img(:src='logo')
      .img-card
        img(:src='coverPhoto')
    .card-header.p-4
      .card-type.h5
        p {{ type }}
      .card-topicName
        h4 {{ topicName }}
    .card-body.p-4
      p {{ startPrice }}
      .price(v-if='salePrice')
        h4.text-info-500 {{ salePrice }} ฿
    .card-footer.p-4
      .location.flex.items-center.text-center.space-x-2
        ion-icon.left-0.w-4.h-4(name='location-sharp')
        .locationDetail.space-x-2
          p {{ subDistrictName }}
          p {{ districtName }}
          p {{ provinceName }}
      p.mt-1 {{ dateCreated }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
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
    logo: {
      type: String,
      default: null,
    },
    ads: {
      type: String,
      default: null,
    },
    likeIcon: {
      type: String,
      default: null,
    },
    review: {
      type: String,
      default: null,
    },
    description: {
      type: String,
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
    startPrice: {
      type: String,
      default: null,
    },
    subDistrictName: {
      type: String,
      default: null,
    },
    districtName: {
      type: String,
      default: null,
    },
    provinceName: {
      type: String,
      default: null,
    },
    dateCreated: {
      type: String,
      default: null,
    },
    bedroom: {
      type: String,
      default: null,
    },
    bathroom: {
      type: String,
      default: null,
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
.location {
  .locationDetail {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
  .ads {
    @apply absolute border-2 border-white text-white p-1 mt-2 ml-2 left-0;
  }
  .likeIcon {
    @apply flex bg-white items-center absolute rounded-full py-3 px-3 mt-2 mr-2 shadow-xl right-0 top-0;
  }
  .review {
    @apply absolute bg-info-500 p-2 mb-2 ml-2 left-0 bottom-0;
    p {
      @apply text-white;
    }
  }
  .logo {
    @apply flex items-center absolute w-20 h-20 p-4 -mb-10 -mr-3 right-0 bottom-0;
    img {
      @apply rounded-full;
    }
  }
}
</style>
