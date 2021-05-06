<template lang="pug">
.card-section.mt-12
  .card(class="bg-white w-auto h-full border-black-200 border-2")
    .card-image.relative
      .ads(v-if="ads") {{ads}}
      .likeIcon(v-if="likeIcon")
        ion-icon(:src="likeIcon" name="heart-outline")
      .review(v-if="review")
        p {{review}}
      p.absolute.text-white.text-sm.mb-2.ml-2.left-0.bottom-0 {{description}}
      .logo(v-if="logo")
        img(:src="logo")
      img(:src="img")
    .card-header.p-4
      .card-type.h5
        p {{type}}
      .card-estateName
        h4 {{estateName}}
      .card-title(v-if="title")
        h4 {{title}}
    .card-body.p-4
      p {{startPrice}}
      .price(v-if="price")
        h4.text-info-500 {{price}} ฿
    .card-footer.p-4
      .location.flex.text-center(v-if="location")
        ion-icon(class="left-0 w-8 h-8" name="location-sharp")
        p.mt-1 {{location}}
      p.mt-1 {{dateCreated}}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    img: {
      type: String,
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
    estateName: {
      type: String,
      default: null,
    },
    startPrice: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    dateCreated: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
})
</script>

<style lang="scss" scope>
p {
  @apply text-black-300;
}
.location {
  p {
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

.card-image {
  img {
    width: 100%;
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
