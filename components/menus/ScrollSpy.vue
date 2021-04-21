<template lang="pug">
  .scroll-spy
    .item(v-for="(item, i) in options" :key="item.id" :class="{ 'active': i === active }" @click="onClick(i)") {{ item.display }}
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export interface IScrollItem {
  id: string
  display: string
}

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<IScrollItem[]>,
      default: () => [],
    },

    offset: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      active: 0,
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      let active = 0
      for (const i of this.options.keys()) {
        const offset = document
          .getElementById(this.options[i].id)
          ?.getBoundingClientRect().top

        if ((offset || 0) > this.offset) break
        active = i
      }
      this.active = active
    },

    onClick(i: number) {
      window.scrollTo({
        top:
          window.scrollY +
          (document.getElementById(this.options[i].id)?.getBoundingClientRect()
            .top || 0) -
          this.offset,
        behavior: 'smooth',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.scroll-spy {
  @apply sticky flex flex-col w-full;

  top: theme('spacing.12');

  .item {
    @apply relative flex items-center w-full h-10 pl-4 font-noto cursor-pointer;

    &::before {
      @apply absolute left-0 w-full h-full;

      border-left: 4px solid transparent;
      content: '';
    }

    &.active {
      @apply font-semibold;

      &::before {
        border-left-color: theme('colors.primary.500');
      }
    }
  }
}
</style>
