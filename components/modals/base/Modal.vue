<template lang="pug">
  portal(to="modal" :disabled="!teleport" slim)
    transition(name="modal-box" mode="out-in")
      .modal-backdrop(v-if="display" v-bind="$attrs")
        .modal-scroller
          .modal
            .modal-container
              .flex
                h3 {{ title }}
                button.button.square-8.p-0.border-none.ml-auto.outline-none(@click="close")
                  ion-icon.w-full.h-full(name="close-outline")

              .flex.mt-4
                slot(name="default")

              .flex.mt-8(v-if="$slots['bottom-slot']")
                slot(name="bottom-slot")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useDialog from '@/composables/interactive/useDialog'

export default defineComponent({
  name: 'Modal',

  inheritAttrs: false,

  props: {
    teleport: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    return {
      ...useDialog(),
    }
  },

  data() {
    return {
      title: 'Modal',
    }
  },

  methods: {
    show(title = 'Modal') {
      this.display = true
      this.title = title
      this.$emit('show')

      return new Promise((resolve, reject) => {
        this.promise = { resolve, reject }
      })
    },

    close() {
      this.display = false
      this.promise.reject?.()
      this.$emit('close')
    },
  },
})
</script>
