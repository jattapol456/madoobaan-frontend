<template lang="pug">
section.card-section.mt-12
  .card(class="bg-white w-auto h-full border-black-200 border-2")
    .card-image.relative
      .ads(v-if="ads") {{ads}}
      .like-icon
        ion-icon(name="heart-outline")
      .review(v-if="review")
        p {{review}}
      p.absolute.text-white.text-sm.mb-2.ml-2.left-0.bottom-0 {{description}}
      .logo(v-if="logo")
        img(:src="logo")
      img(:src="img")
    .card-header.p-4
      .card-title.h5
        p {{title}}
      .card-subtitle.text-gray
        h4 {{subtitle}}
    .card-body.p-4
      p {{startPrice}}
      h4.text-info-500 {{price}} ฿
    .card-footer.p-4
      .location.flex.text-center
        ion-icon(class="left-0 w-8 h-8" name="location-sharp")
        p.mt-1 {{location}}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    img: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: null,
    },
    ads: {
      type: String,
      default: null,
    },
    review: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    startPrice: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scope>
p {
  @apply text-black-300;
}
.card-section {
  min-width: 330px;
  max-width: 330px;
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
  .like-icon {
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
