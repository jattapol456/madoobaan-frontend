<template lang="pug">
#dynamic-component-demo.demo
  .mt-8
    button(v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="onSetCurrentTab(tab)")
      | {{ tab }}
    div(class="tabContainer")
      slot(name="content")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tabs: {
      type: Array,
      default: () => ['ประกาศของฉัน', 'ประกาศที่ดูล่าสุด', 'ประกาศที่ชื่นชอบ'],
    },

    tabContents: {
      type: Array,
      default: () => [
        {
          key: 'ประกาศของฉัน',
          element: 'myAnnounces',
        },
        {
          key: 'ประกาศที่ดูล่าสุด',
          element: 'lastedAnnounce',
        },
        {
          key: 'ประกาศที่ชื่นชอบ',
          element: 'lokedAnnounce',
        },
      ],
    },

    currentTab: {
      type: String,
      default: 'ประกาศของฉัน',
    },
  },

  computed: {
    currentTabComponent() {
      if (this.currentTab === 'ประกาศของฉัน') {
        return 'myAnnounces'
      } else if (this.currentTab === 'ประกาศที่ดูล่าสุด') {
        return 'lastedAnnounce'
      } else return 'ประกาศที่ชื่นชอบ'
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
  overflow-x: auto;
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
.tabContainer {
  max-width: 80vw;
  overflow: auto;
}
button {
  @apply font-noto font-semibold;
}
</style>
