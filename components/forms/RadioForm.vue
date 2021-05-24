<template lang="pug">
.radio.space-x-5.mt-2
  label.container(v-for='(option, i) in options')
    .text {{ option.label }}
    input.inputControl(
      v-if='type == "custom"'
      :id='`radio_${option.value}`',
      :name='name',
      type='radio',
      :value='option.value',
      @click="test(option.value)"
    )
    input.inputControl(
      v-if='type != "custom"'
      :id='`radio_${option.value}`',
      :name='name',
      type='radio',
      :value='option.value',
      v-model='val'
    )
    span.checkmark
  label.container(v-if='type == "custom"')
    .text ระบุเอง
    input.inputControl(id='`radio_custom`',
      :name='name',
      type='radio',
      v-model="cuss"
      value="true"
    )
    span.checkmark
  div(v-if='cuss == "true"')
    input.custom-input(v-model='val')
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Radio',
  inheritAttrs: false,

  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    type: {
      type: [String],
      default: '',
    },
    modelValue: {
      type: [String, Boolean],
      default: '',
    },
    id: {
      type: [String],
      default: '',
    },
    name: {
      type: [String],
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      default: () => [
        {
          label: 'Option 1',
          value: 'option-1',
        },
      ],
    },
  },

  setup(props) {
    const { modelValue } = toRefs(props)
    // - console.log('start:', props)

    return {
      model: modelValue,
    }
  },
  data() {
    return {
      val: 'option-1',
      cuss: 'false',
      sss: '',
    }
  },

  computed: {
    checked(): boolean {
      console.log(this.model)
      return this.model === this.value
    },

    listeners(): Record<string, Function | Function[]> {
      return {
        ...this.$listeners,
        change: () => this.$emit('change', this.value),
      }
    },
  },
  watch: {
    val() {
      this.$emit('input', this.val)
      this.$emit('change')
      // - console.log('cuss :', this.cuss)
    },

    value: {
      handler(value) {
        this.val = value
      },

      immediate: true,
    },
  },
  methods: {
    test(text) {
      this.cuss = 'false'
      this.val = text
      // - console.log('test :', this.cuss)
    },
    checkTrue() {
      this.cuss = 'true'
    },
  },
})
</script>

<style lang="scss" scoped>
.radio {
  display: block;
  margin-bottom: 15px;
}

label {
  display: inline-block !important;
  margin-left: 5px;
}

.inputControl {
  font-weight: 100;
}
.container {
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  padding-left: 25px;
  min-height: 20px;
  width: auto;
}

.container input {
  @apply hidden;

  cursor: pointer;
}
.text {
  padding-top: 1px;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: white;
  border: 1px solid #333;
  border-radius: 50%;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #008cff;
  border: 1px solid #008cff;
}

.checkmark::after {
  content: '';
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark::after {
  display: block;
}

.container .checkmark::after {
  @apply w-2 h-2 bg-white rounded-full;

  left: 5px;
  top: 5px;
}
input {
  @apply px-3 font-noto border-black-100 border rounded-sm;

  height: 3.5rem;
}
</style>
