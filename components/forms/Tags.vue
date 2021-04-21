<template lang="pug">
  .input-wrapper(:class="{ 'active': active }" @click="onClick")
    .tags
      .placeholder(v-if="!active && !tags.length && placeholder.length") {{ placeholder }}
      .tag(v-for="(tag, i) in tags" :key="i") {{ tag }}
      .tag-input
        input(ref="input" :disabled="$attrs.disabled" @keydown.delete="onDelete" @keydown.enter="onSubmit" @keydown.down="onKeyDown" @keydown.up="onKeyUp" @focus="onFocus" @blur="onBlur" v-model="tagValue")
        .suggestion(ref="suggestion" :class="{ 'active': active }")
          .item(v-for="(keyword, i) in matchedKeywords" :key="i" :class="{ 'active': selector === i }" @mousedown.prevent="select(i)") {{ keyword }}

</template>

<script lang="ts">
import useExtractModelValue from '@/composables/forms/useExtractModelValue'
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { difference, escapeRegExp, uniq } from 'lodash'

export default defineComponent({
  name: 'TagsInput',
  props: {
    value: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    keywords: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const input = ref<InstanceType<typeof HTMLFormElement>>()
    const suggestion = ref<InstanceType<typeof HTMLElement>>()
    const tags = ref<string[]>([])

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
      active: false,
      tagValue: '',
      selector: 0,
    }
  },

  computed: {
    matchedKeywords(): string[] {
      const regexp = new RegExp(escapeRegExp(this.tagValue), 'i')

      return difference(
        uniq(
          [this.tagValue.trim(), ...this.keywords].filter(
            (each) => each.length && each.match(regexp)
          )
        ),

        this.tags
      )
    },
  },

  watch: {
    tagValue() {
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
    onClick() {
      this.input?.focus()
    },

    onFocus() {
      this.active = true
    },

    onBlur(e: MouseEvent) {
      e.preventDefault()
      this.active = false
    },

    onSubmit() {
      if (!this.matchedKeywords[this.selector]?.length) return
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
        this.tagValue = this.tags.pop() || ''
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
