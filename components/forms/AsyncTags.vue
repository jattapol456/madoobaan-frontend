<template lang="pug">
  .input-wrapper(:class="{ 'active': active }" @click="onClick")
    .tags
      .placeholder(v-if="!active && !tags.length && placeholder.length && !tagValue.length") {{ placeholder }}
      .tag(v-for="(tag, i) in tags" :key="i") {{ tag.name }}
      .tag-input
        input(ref="input" :disabled="$attrs.disabled" @keydown.delete="onDelete" @keydown.enter="onSubmit" @keydown.down="onKeyDown" @keydown.up="onKeyUp" @focus="onFocus" @blur="onBlur" v-model="tagValue")
        .suggestion(ref="suggestion" :class="{ 'active': active }")
          .item(v-for="(keyword, i) in matchedKeywords" :key="i" :class="{ 'active': selector === i }" @mousedown.prevent="select(i)") {{ keyword.name }}

</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import {
  debounce,
  differenceWith,
  escapeRegExp,
  sortBy,
  unionBy,
  uniqWith,
} from 'lodash'

export interface ITag {
  id?: number
  name: string
}

export default defineComponent({
  name: 'AsyncTagsInput',
  props: {
    value: {
      type: Array as PropType<ITag[]>,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },

    suggester: {
      type: Function as PropType<
        (value: string, selected?: string[]) => Promise<ITag[]>
      >,
      default: undefined,
    },
  },

  setup(props) {
    const input = ref<InstanceType<typeof HTMLFormElement>>()
    const suggestion = ref<InstanceType<typeof HTMLElement>>()
    const tags = ref<ITag[]>(props.value)

    useExtractModelValue(props, (payload) => {
      tags.value = payload
    })

    return {
      input,
      suggestion,
      tags,
    }
  },

  data() {
    return {
      loading: false,
      active: false,
      tagValue: '',
      selector: 0,
      keywords: [] as ITag[],
    }
  },

  computed: {
    matchedKeywords(): ITag[] {
      const regexp = new RegExp(escapeRegExp(this.tagValue), 'i')

      return sortBy(
        differenceWith(
          uniqWith(
            [...this.keywords, { name: this.tagValue.trim() }].filter(
              (each) => each.name.length && each.name.match(regexp)
            ),
            (a, b) => a.id === b.id || a.name === b.name
          ),

          this.tags,

          (a, b) => a.id === b.id && a.name === b.name
        ),
        (keyword) => keyword.id || 0
      )
    },
  },

  watch: {
    tagValue() {
      this.loading = true
      this.fetchKeywords(this.tagValue)

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
      return this.suggester(value).then((keywords: ITag[]) => {
        this.loading = false
        this.keywords = unionBy(this.keywords as ITag[], keywords, 'id')
        return Promise.resolve(keywords)
      })
    }, 750),

    onClick() {
      this.input?.focus()
    },

    onFocus() {
      this.active = true
      this.fetchKeywords(this.tagValue)
    },

    onBlur(e: MouseEvent) {
      e.preventDefault()
      this.active = false
    },

    onSubmit() {
      if (!this.active) return
      if (!this.matchedKeywords[this.selector]?.name?.length) return
      this.tags.push(this.matchedKeywords[this.selector])
      this.tagValue = ''
      this.$emit('input', this.tags)
      this.selector = Math.min(
        Math.max(this.matchedKeywords.length - 1, 0),
        this.selector || 0
      )
    },

    onDelete(e: KeyboardEvent) {
      if (!this.tagValue.length) {
        this.tagValue = this.tags.pop()?.name || ''
        e.preventDefault()
      }
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

    select(i: number) {
      this.onClick()
      this.tags.push(this.matchedKeywords[i])
      this.tagValue = ''
      this.$emit('input', this.tags)
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
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/components/_tags.scss';
</style>
