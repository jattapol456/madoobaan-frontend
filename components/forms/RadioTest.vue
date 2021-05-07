<template lang="pug">
  .radio.space-x-5.mt-2
    label.container(v-for="(option, i) in options") 
      .text {{option.label}}
      input.inputControl(:id="`romeo_${option.value}`",:name="name",type="radio")
      span.checkmark
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
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
  },

  setup(props) {

    const { modelValue } = toRefs(props)
    return {
      model: modelValue,
    }
  },

  computed: {
    checked(): boolean {
      console.log(this.model)
      return this.model === this.value
    },

    listeners(): Record<string, Function | Function[]> {
      console.log('test')
      return {
        ...this.$listeners,
        change: () => this.$emit('change', this.value),
      }
    },
  },

  methods: {
    onChanged() {
      console.log('change')
      this.$emit('input', this.value)
    },
  },
})
</script>

<style lang="scss" scoped>
.radio {
  display:block;
  margin-bottom: 15px;
}

label {
  display: inline-block !important;
  margin-left:5px;
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
  position: absolute;
  opacity: 0;
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
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark::after {
  display: block;
}

.container .checkmark::after {
 	top: 5px;
	left: 4.5px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}

</style>