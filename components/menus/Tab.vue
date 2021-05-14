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
      default: () => [
        'อัพเดทล่าสุด',
        'รีวิวบ้าน',
        'สาระน่ารู้',
        'ไลฟ์สไตล์',
        'ข่าวสาร',
      ],
    },

    tabContents: {
      type: Array,
      default: () => [
        {
          key: 'อัพเดทล่าสุด',
          element: 'update',
        },
        {
          key: 'รีวิวบ้าน',
          element: 'homeReview',
        },
        {
          key: 'สาระน่ารู้',
          element: 'knowledge',
        },
        {
          key: 'ไลฟ์สไตล์',
          element: 'lifeStyle',
        },
        {
          key: 'ข่าวสาร',
          element: 'info',
        },
      ],
    },

    currentTab: {
      type: String,
      default: 'อัพเดทล่าสุด',
    },
  },

  computed: {
    currentTabComponent() {
      if (this.currentTab === 'อัพเดทล่าสุด') {
        return 'update'
      } else if (this.currentTab === 'รีวิวบ้าน') {
        return 'homeReview'
      } else if (this.currentTab === 'สาระน่ารู้') {
        return 'knowledge'
      } else if (this.currentTab === 'ไลฟ์สไตล์') {
        return 'lifeStyle'
      } else return 'info'
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
  background: #fff;
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
