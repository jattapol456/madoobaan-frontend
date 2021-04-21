<template lang="pug">
  portal(name="editable-modal" to="editable-modal" :disabled="disabled" slim)
    transition(name="modal-box" mode="out-in")
      .modal-backdrop(v-if="display" v-bind="$attrs")
        .modal-scroller.is-editable
          .modal.is-editable
            .modal-header
              h3 {{ title }}
              button.button.square-8.p-0.border-none.ml-auto.outline-none(@click="close")
                ion-icon.w-full.h-full(name="close-outline")

            .modal-container
              .modal-container-scroller
                slot(name="default")

            .modal-bottom(v-if="$slots['bottom-slot']")
              slot(name="bottom-slot")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useDialog from '@/composables/interactive/useDialog'

export default defineComponent({
  name: 'EditableModal',

  inheritAttrs: false,

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {
      ...useDialog(),
    }
  },

  data() {
    return {
      title: 'Editable Modal',
    }
  },

  methods: {
    show(title = 'Editable Modal') {
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
