<template lang="pug">
  .checkbox(role="radio")
    input(v-bind="$attrs" v-on="listeners" type="checkbox" :checked="checked" :value="value")
    label(:for="$attrs.id")
      slot
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

interface HTMLInputElementEvent extends InputEvent {
  target: InputEvent['target'] & {
    checked: boolean
  }
}

export default defineComponent({
  name: 'Checkbox',
  inheritAttrs: false,

  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    modelValue: {
      type: [Boolean, Array],
      default: false,
    },

    value: {
      type: [String],
      default: '',
    },
  },

  computed: {
    checked(): boolean | string {
      if (Array.isArray(this.modelValue))
        return this.modelValue.includes(this.value)
      return this.modelValue
    },

    listeners(): Record<string, Function | Function[]> {
      return {
        ...this.$listeners,
        change: (e: HTMLInputElementEvent) => {
          const checked = e.target.checked

          if (Array.isArray(this.modelValue)) {
            const newValue = [...this.modelValue]

            if (checked) newValue.push(this.value)
            else newValue.splice(newValue.indexOf(this.value), 1)
            this.$emit('change', newValue)
          } else {
            this.$emit('change', checked)
          }
        },
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.checkbox {
  @apply relative grid;

  grid-template-columns: 1rem 1fr;
  grid-gap: 0.5rem;
  height: auto;
  min-height: 1.5rem;

  input[type='checkbox'] {
    @apply w-4 h-4;

    opacity: 0;

    & + label {
      @apply relative font-normal font-noto text-base leading-6 cursor-pointer;

      display: inline-block;

      &::before {
        @apply bg-white border border-black-100 rounded;

        position: absolute;
        left: -24px;
        top: 4px;
        width: 1rem;
        height: 1rem;
        transition: all 0.125s ease-in;
        content: '';
      }

      &::after {
        position: absolute;
        left: -22px;
        top: 6px;
        width: calc(1rem - 4px);
        height: calc(1rem - 4px);
        background-color: white;
        mask-image: url('/images/icons/check-solid.svg');
        transform: scale(0.2);
        transition: all 0.125s ease-in;
        content: '';
      }

      &:hover {
        &::before {
          @apply border-2 border-primary-600;
        }
      }

      &:active {
        &::before {
          @apply bg-primary-700 border-primary-700;
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
            @apply bg-primary-600;
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

  & + .checkbox {
    @apply mt-2;
  }
}
</style>
