<template lang="pug">
  .suggester-wrapper
    Input(ref="input" v-bind="$attrs" :name="name" :error="error" :descriptions="descriptions" :mode="mode" :rules="rules" :vid="vid" :disabled="$attrs.disabled" @keydown.delete="onDelete" @keydown.enter="onSubmit" @keydown.down="onKeyDown" @keydown.up="onKeyUp" @focus="onFocus" @blur="onBlur" v-model="keyword")
    .suggestion(ref="suggestion" :class="{ 'active': active }")
      .item(v-for="(keyword, i) in matchedKeywords" :key="i" :class="{ 'active': selector === i }" @mousedown.prevent="select(i)") {{ keyword.name }}
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import {
  debounce,
  differenceWith,
  escapeRegExp,
  sortBy,
  unionBy,
  uniqWith,
} from 'lodash'
import Input from './Input.vue'

export interface ISuggestedValue {
  id?: number
  name: string
}

export default defineComponent({
  name: 'AsyncSuggesterInput',

  components: {
    Input,
  },

  props: {
    value: {
      type: Object as PropType<ISuggestedValue> | null,
      default: null,
    },

    placeholder: {
      type: String,
      default: '',
    },

    suggester: {
      type: Function as PropType<
        (value: string, selected?: string[]) => Promise<ISuggestedValue[]>
      >,
      default: undefined,
    },

    name: {
      type: String,
      default: '',
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
  },

  setup(props) {
    const input = ref<InstanceType<typeof Input>>()
    const suggestion = ref<InstanceType<typeof HTMLElement>>()
    const value = ref<null | ISuggestedValue>(props.value)

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      input,
      suggestion,
      val: value,
    }
  },

  data() {
    return {
      loading: false,
      active: false,
      keyword: '',
      keywords: [] as ISuggestedValue[],
      selector: 0,
    }
  },

  computed: {
    matchedKeywords(): ISuggestedValue[] {
      const regexp = new RegExp(escapeRegExp(this.keyword), 'i')

      return sortBy(
        differenceWith(
          uniqWith(
            [...this.keywords, { name: this.keyword.trim() }].filter(
              (each) => each.name.length && each.name.match(regexp)
            ),
            (a, b) => a.id === b.id || a.name === b.name
          ),

          this.val ? [this.val] : [],

          (a, b) => a.id === b.id && a.name === b.name
        ),

        (keyword) => keyword.id || 0
      )
    },
  },

  watch: {
    keyword() {
      this.loading = true
      this.fetchKeywords(this.keyword)

      this.selector = Math.min(
        Math.max(this.matchedKeywords.length - 1, 0),
        this.selector
      )
    },

    selector: {
      handler() {
        this.$nextTick().then(() => {
          this.scrollToSelected()
        })
      },
      immediate: true,
    },
  },

  methods: {
    fetchKeywords: debounce(function (this: any, value: string) {
      return this.suggester?.(value).then((keywords: ISuggestedValue[]) => {
        this.loading = false
        this.keywords = unionBy(
          this.keywords as ISuggestedValue[],
          keywords,
          'id'
        )
        return Promise.resolve(keywords)
      })
    }, 750),

    onClick() {
      this.input?.focus()
    },

    onFocus() {
      this.active = true
      this.fetchKeywords(this.keyword)
    },

    onBlur(e: MouseEvent) {
      e.preventDefault()
      this.active = false
      if (!this.val) this.keyword = ''
    },

    onSubmit() {
      if (!this.active) return
      if (!this.matchedKeywords[this.selector]?.name?.length) return
      this.val = this.matchedKeywords[this.selector]
      this.keyword = this.val.name
      this.$emit('input', this.val)
      this.$emit('select', this.val)
      this.selector = Math.min(
        Math.max(this.matchedKeywords.length - 1, 0),
        this.selector || 0
      )
    },

    onKeyDown() {
      if (this.active) {
        this.selector = (this.selector + 1) % this.matchedKeywords.length || 0
      }
    },

    onKeyUp() {
      if (this.active) {
        this.selector =
          (this.matchedKeywords.length + this.selector - 1) %
            this.matchedKeywords.length || 0
      }
    },

    onDelete() {
      this.val = null
    },

    select(i: number) {
      this.onClick()
      this.val = this.matchedKeywords[i]
      this.keyword = ''
      this.$emit('input', this.val)
      this.$emit('select', this.val)
    },

    scrollToSelected() {
      const activeItem =
        this.suggestion?.querySelector('.active') ||
        this.suggestion?.querySelector(':first-child')

      if (!activeItem) return

      this.suggestion?.scrollTo({
        top:
          this.suggestion?.scrollTop +
          activeItem.getBoundingClientRect().top -
          this.suggestion?.getBoundingClientRect().top -
          8,
      })
    },

    clearState() {
      this.val = null
      this.keyword = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.suggester-wrapper {
  @apply relative;

  .suggestion {
    @apply absolute w-full h-auto bg-white shadow-lg rounded-sm;

    top: 100%;
    max-width: 240px;
    max-height: 240px;
    opacity: 0;
    pointer-events: none;
    overflow: overlay;
    z-index: 2;
    transition: all ease-in 0.125s;

    .item {
      @apply flex items-center h-10 px-4 font-noto;

      &:hover,
      &.active {
        @apply bg-backdrop cursor-pointer;
      }

      &:first-child {
        @apply mt-2;
      }

      &:last-child {
        @apply mb-2;
      }
    }

    &.active {
      opacity: 1;
      pointer-events: unset;
      transform: translateY(theme('spacing.2'));
    }
  }
}
</style>
