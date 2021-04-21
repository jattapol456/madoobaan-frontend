<template lang="pug">
  .input-wrapper(:class="{ 'active': active }" @click="onClick")
    ValidationProvider(:name="name" :rules="rules" :mode="mode" :vid="vid" v-slot="{ errors }")
      input(ref="input" v-bind="$attrs" :name="name" :placeholder="placeholder" :disabled="$attrs.disabled" @keydown.enter="onSubmit" @keydown.backspace="onBackspace" @keydown.down.prevent="onKeyDown" @keydown.up.prevent="onKeyUp" @focus="onFocus" @blur="onBlur" :class="{ 'is-error': error.length || errors.length }" v-model="model")

      .suggestion(ref="suggestion" :class="{ 'active': active, 'left': position.includes('left'), 'right': position.includes('right') }")
        .item(v-for="(keyword, i) in take(matchedKeywords, 200)" :key="i" :class="{ 'active': selector === i }" @mousedown.prevent="select(i)")
          p.font-noto(v-html="`${keyword.subDistrict} · ${matchReplace(keyword.district, content)} · ${keyword.province} · ${keyword.zipcode}`")
      
      .message(v-if="error || descriptions || errors.length")
        p.font-noto.text-14px.leading-none.text-error-500(v-if="error || errors.length") {{ error || errors[0] }}
        p.font-noto.text-14px.leading-none.text-black-300.ml-auto(v-if="descriptions") {{ descriptions }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { escapeRegExp, sortBy, uniqWith } from 'lodash'
import { ValidationProvider } from 'vee-validate'

import useGeoInput from '@/composables/forms/useGeoInput'
import useExtractModelValue from '@/composables/forms/useExtractModelValue'

import { IAddress } from '@/helpers/modules/Geo'

export default defineComponent({
  name: 'DistrictInput',

  components: {
    ValidationProvider,
  },

  props: {
    value: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    position: {
      type: String,
      default: 'bottom-left',
    },

    name: {
      type: String,
      default: '',
    },

    descriptions: {
      type: String,
      default: '',
    },

    error: {
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
    const geo = useGeoInput(props)

    useExtractModelValue(props, (payload) => {
      geo.content.value = payload
    })

    return {
      ...geo,
    }
  },

  computed: {
    model: {
      get(): string {
        return this.content
      },

      set(value: string) {
        this.content = value
        this.$emit('input', value)
      },
    },

    matchedKeywords(): IAddress[] {
      if (this.content?.length === 0) return this.keywords

      const regexp = new RegExp(escapeRegExp(this.content), 'i')

      return sortBy(
        uniqWith(
          [...this.keywords].filter((each) => each.district.match(regexp)),
          (a, b) => a.id === b.id
        ),
        (address) => address.id
      )
    },
  },

  watch: {
    content() {
      this.selector = Math.min(
        Math.max(Math.min(this.matchedKeywords.length, 200) - 1, 0),
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
    onSubmit() {
      if (!this.matchedKeywords[this.selector]?.district.length) return
      this.selected = this.matchedKeywords[this.selector]
      this.content = this.selected.district
      this.$emit('input', this.content)
      this.$emit('select', this.selected)
      this.active = false

      this.selector = Math.min(
        Math.max(Math.min(this.matchedKeywords.length, 200) - 1, 0),
        this.selector || 0
      )
    },

    onKeyDown() {
      if (this.active) {
        this.selector =
          (this.selector + 1) % Math.min(this.matchedKeywords.length, 200) || 0
      } else this.active = true
    },

    onKeyUp() {
      if (this.active) {
        this.selector =
          (Math.min(this.matchedKeywords.length, 200) + this.selector - 1) %
            Math.min(this.matchedKeywords.length, 200) || 0
      } else this.active = true
    },

    select(i: number) {
      this.onClick()
      this.selected = this.matchedKeywords[i]
      this.model = this.selected.district
      this.$emit('input', this.content)
      this.$emit('select', this.selected)
      this.active = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/components/_geo-input.scss';
</style>
