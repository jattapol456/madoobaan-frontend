<template lang="pug">
#dynamic-component-demo
  .demo
    button(v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="onSetCurrentTab(tab)")
      | {{ tab }}
  div.mt-8(class="tabContainer")
    slot(name="content")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tabs: {
      type: Array,
      default: () => ['ประกาศแนะนำ', 'ซื้อบ้านมือสอง'],
    },

    tabContents: {
      type: Array,
      default: () => [
        {
          key: 'ประกาศแนะนำ',
          element: 'buyNewProject ',
        },
        {
          key: ':ซื้อบ้านมือสอง',
          element: 'buyHomeSecondhand',
        },
      ],
    },

    currentTab: {
      type: String,
      default: 'ประกาศแนะนำ',
    },
  },

  computed: {
    currentTabComponent() {
      if (this.currentTab === 'ประกาศแนะนำ') {
        return 'buyNewProject'
      } else if (this.currentTab === 'ซื้อบ้านมือสอง') {
        return 'buyHomeSecondhand'
      } else return 'Rent'
    },
  },

  methods: {
    onSetCurrentTab(tab) {
      console.log(tab)
      this.$emit('change', tab)
    },
  },
})
</script>

<style lang="scss" scoped>
.demo {
  user-select: none;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
button {
  @apply font-noto font-semibold;
}
</style>
