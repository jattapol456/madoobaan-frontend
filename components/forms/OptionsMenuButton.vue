<template lang="pug">
  button.button.is-square.border-none(@click="toggleDropdownMenu")
    ion-icon(name="ellipsis-horizontal")
    OptionsMenu(ref="optionsMenu" :options="options")
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

import OptionsMenu, { IMenuOption } from '@/components/menus/OptionsMenu.vue'

export default defineComponent({
  components: {
    OptionsMenu,
  },

  props: {
    options: {
      type: Array as PropType<IMenuOption[]>,
      default: () => [],
    },
  },

  setup() {
    const optionsMenu = ref<InstanceType<typeof OptionsMenu>>()

    return {
      optionsMenu,
    }
  },

  methods: {
    toggleDropdownMenu(ev: MouseEvent) {
      this.optionsMenu?.toggle(ev)
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  @apply relative;

  ion-icon {
    @apply pointer-events-none;
  }

  &.active {
    @apply bg-black-50;
  }
}
</style>
