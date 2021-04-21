<template lang="pug">
  .editor-wrapper
    validation-provider(ref="provider" :name="name || id" :rules="rules" :mode="mode" :vid="vid" v-slot="{ errors }")
      EditorContent(v-bind="$attrs" :editor="editor" :class="{ 'is-error': error.length || errors.length, 'is-disabled': disabled }")

      .message.mt-2(v-if="error || descriptions || errors.length")
        p.font-noto.text-14px.leading-none.text-error-500(v-if="error || errors.length") {{ error || errors[0] }}
        p.font-noto.text-14px.leading-none.text-black-300.ml-auto(v-if="descriptions") {{ descriptions }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { EditorContent, Editor, onUpdateFunctionState } from 'tiptap'

import { ValidationProvider } from 'vee-validate'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  components: {
    EditorContent,
    ValidationProvider,
  },

  inheritAttrs: false,

  props: {
    value: {
      type: String,
      default: '<p>Write something</p>',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: undefined,
    },

    name: {
      type: String,
      default: undefined,
    },

    error: {
      type: String,
      default: '',
    },

    descriptions: {
      type: String,
      default: '',
    },

    mode: {
      type: String,
      default: 'eager',
    },

    rules: {
      type: String,
      default: '',
    },

    vid: {
      type: String,
      default: '',
    },

    readonly: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const provider = ref<InstanceType<typeof ValidationProvider>>()
    const model = ref(props.value)

    useExtractModelValue(props, (payload) => (model.value = payload))

    return {
      provider,
      model,
    }
  },

  data() {
    return {
      editor: null as Editor | null,
    }
  },

  watch: {
    disabled() {
      this.editor?.setOptions({
        editable: this.disabled,
      })
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.model,
      onUpdate: this.editorChangeCallback,
    })

    this.editor.setContent(this.model)
  },

  beforeDestroy() {
    this.editor?.destroy()
  },

  methods: {
    editorChangeCallback(state: onUpdateFunctionState) {
      this.provider?.syncValue(state.getHTML())
      this.$emit('input', state.getHTML())
    },
  },
})
</script>

<style lang="scss" scoped>
.editor-wrapper {
  @apply relative w-full;

  ::v-deep {
    .ProseMirror {
      @apply w-full h-auto min-h-20 px-3 py-2 border border-black-100 rounded-sm;

      &:focus {
        @apply border-2 border-black-900 outline-none;
      }
    }

    .is-disabled {
      .ProseMirror {
        @apply text-black-300 bg-disabled border-none pointer-events-none;
      }
    }

    .is-error {
      .ProseMirror {
        @apply border-error-500 bg-error-100;
      }
    }
  }
}
</style>
