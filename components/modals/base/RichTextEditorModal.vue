<template lang="pug">
  EditableModal(ref="modal")
    template(#default)
      validation-observer.w-full(ref="textEditorForm" v-slot="{ handleSubmit }")
        form.w-full(@submit.prevent="handleSubmit(submit)")
          RichTextEditor(ref="editor" v-model="form.content")

    template(#bottom-slot)
      button.button(@click="close") ยกเลิก
      button.button.button-primary(@click="validate") อัพเดท

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

import { ValidationObserver } from 'vee-validate'
import EditableModal from '@/components/modals/base/EditableModal.vue'
import RichTextEditor from '@/components/forms/RichTextEditor.vue'

import useEditableModalAbility from '@/composables/interactive/useEditableModalAbility'

export default defineComponent({
  name: 'RichTextEditorModal',

  components: {
    ValidationObserver,
    EditableModal,
    RichTextEditor,
  },

  inheritAttrs: false,

  setup() {
    const { modal, promise } = useEditableModalAbility()
    const textEditorForm = ref<InstanceType<typeof ValidationObserver>>()

    return {
      textEditorForm,
      modal,
      promise: reactive(promise<string>()),
    }
  },

  data() {
    return {
      form: {
        content: '<p>Write something</p>',
      },
    }
  },

  methods: {
    show(title = 'Rich Text Editor Modal', data: string): Promise<string> {
      this.modal?.show(title)

      this.form.content = data || this.form.content

      return new Promise((resolve, reject) => {
        this.promise = { resolve, reject }
      })
    },

    close() {
      this.modal?.close()
      this.promise.reject?.()
    },

    validate() {
      this.textEditorForm = this.$refs.textEditorForm as any
      this.textEditorForm?.validate().then((result) => {
        if (result) this.submit()
      })
    },

    submit() {
      this.promise.resolve?.(this.form.content)
      this.close()
    },
  },
})
</script>
