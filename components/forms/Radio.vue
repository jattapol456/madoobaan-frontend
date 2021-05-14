<template lang="pug">
  .radio
    input(v-bind="$attrs" v-on="listeners" type="radio" :checked="checked" v-on:change="onChange" :value="value")
    label(:for="$attrs.id")
      slot
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

    value: {
      type: [String, Number],
      default: '',
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
  @apply relative flex items-center;

  height: 1.5rem;

  input[type='radio'] {
    opacity: 0;

    & + label {
      @apply font-normal text-4 text-black-700 cursor-pointer;

      position: absolute;
      display: inline-block;
      left: 24px;

      &::before {
        @apply border border-black-100 rounded-full bg-white;

        position: absolute;
        left: -24px;
        width: 1rem;
        height: 1rem;
        transition: all 0.125s ease-in;
        content: '';
      }

      &::after {
        @apply w-2 h-2 bg-white rounded-full;

        position: absolute;
        left: -20px;
        top: 4px;
        transform: scale(0.2);
        transition: all 0.125s ease-in;
        content: '';
      }

      &:hover {
        &::before {
          @apply border-2 border-primary-500;
        }
      }

      &:active {
        &::before {
          @apply bg-primary-600 border-primary-600;
        }
      }
    }

    &:checked {
      & + label {
        &::before {
          @apply bg-primary-500 border-primary-500;
        }

        &::after {
          @apply bg-black-700;

          transform: scale(1);
        }

        &:hover {
          &::before {
            @apply bg-primary-600 border-primary-600;
          }
        }

        &:active {
          &::before {
            @apply bg-primary-700 border-primary-700;
          }
        }
      }
    }

    &:focus {
      & + label {
        &::before {
          @apply border-2 border-primary-500;
        }
      }

      &:checked {
        & + label {
          &::before {
            @apply border-primary-600;
          }
        }
      }
    }

    &[readonly],
    &[disabled] {
      & + label {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    &[disabled] {
      & + label {
        filter: grayscale(1);
      }
    }
  }

  & + .radio {
    @apply mt-2;
  }
}
</style>
