<template lang="pug">
section.mt-8
  #dynamic-component-demo.demo
    button(v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="currentTab = tab")
      | {{ tab }}
    div(class="tabContainer")
      component.tab(:is="currentTabComponent")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Update from '@/components/menus/tabData/Update.vue'
import Saranaroo from '@/components/menus/tabData/Saranaroo.vue'
import HomeReview from '@/components/menus/tabData/HomeReview.vue'
export default defineComponent({
  components: {
    Update,
    Saranaroo,
    HomeReview,
  },
  data() {
    return {
      currentTab: 'อัพเดทล่าสุด',
      tabs: ['อัพเดทล่าสุด', 'รีวิวบ้าน', 'สาระน่ารู้'],
    }
  },
  computed: {
    currentTabComponent() {
      if (this.currentTab === 'อัพเดทล่าสุด') {
        return 'Update'
      } else if (this.currentTab === 'รีวิวบ้าน') {
        return 'HomeReview'
      } else return 'Saranaroo'
    },
  },
})
</script>

<style lang="scss" scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
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
</style>
