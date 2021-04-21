<template lang="pug">
  Modal(ref="modal")
    form.w-full(@submit.prevent)
      label(for="textarea") {{ options.label }}
      Textarea(id="textarea" v-model="model")

      .flex.mt-6
        button.button(@click="close") ยกเลิก
        button.button.button-primary.ml-auto(@click="submit") {{ options.button }}

</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

import Modal from '@/components/modals/base/Modal.vue'
import useModalAbility from '@/composables/interactive/useModalAbility'

import Textarea from '@/components/forms/TextArea.vue'

interface ITextareaOptions {
  title: string
  label: string
  button: string
}

export default defineComponent({
  name: 'TextareaModal',

  components: {
    Modal,
    Textarea,
  },

  setup() {
    const { modal, promise } = useModalAbility()

    return {
      modal,
      promise: reactive(promise<string>()),
    }
  },

  data() {
    return {
      model: '',
      options: {
        title: 'กล่องข้อความ',
        label: 'ข้อความ',
        button: 'อัพเดต',
      } as ITextareaOptions,
    }
  },

  methods: {
    show(
      value: string,
      options: Partial<ITextareaOptions> = {
        title: 'กล่องข้อความ',
        label: 'ข้อความ',
        button: 'อัพเดต',
      }
    ): Promise<string> {
      this.options = {
        ...this.options,
        ...options,
      }
      this.model = value
      this.modal?.show(this.options.title)

      return new Promise((resolve, reject) => {
        this.promise = { resolve, reject }
      })
    },

    submit() {
      this.promise.resolve?.(this.model)
      this.modal?.close()
    },

    close() {
      this.modal?.close()
      this.promise.reject?.()
    },
  },
})
</script>
