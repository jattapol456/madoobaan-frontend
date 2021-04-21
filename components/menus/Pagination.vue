<template lang="pug">
  .pagination
    .item(:disabled="pagination.page <= 1" @click="previousPage")
      ion-icon(name="chevron-back")
    template(v-for="page in range(1, pagination.totalPages + 1)")
      .item(v-if="pagination.page - 3 > 0 && page == 1" @click="setCurrentPage(Math.floor(pagination.page / 2 - 1))") ...
      .item(v-if="shouldDisplay(page)" :class="{ 'active': page == pagination.page }" @click="setCurrentPage(page)") {{ page }}
      .item(v-if="pagination.page + 3 < pagination.totalPages - 1 && page == pagination.totalPages - 2" @click="setCurrentPage(Math.round((pagination.page + 1 + pagination.totalPages) / 2))") ...
    .item(:disabled="pagination.page === pagination.totalPages" @click="nextPage")
      ion-icon(name="chevron-forward")
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { IPaginatedResponse } from '@/types'
import { range } from 'lodash'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<IPaginatedResponse>,
      default: () => ({
        page: 1,
        totalElements: 1,
        totalPages: 1,
      }),
    },
  },

  emits: ['update:modelValue', 'change'],

  setup(props) {
    const pagination = ref<IPaginatedResponse>(props.value)

    useExtractModelValue(props, (payload) => {
      pagination.value = payload
    })

    return {
      pagination,
    }
  },

  methods: {
    shouldDisplay(page: number): boolean {
      if (
        page === 1 ||
        page === this.pagination.totalPages ||
        page === this.pagination.page
      )
        return true
      if (page > this.pagination.page - 3 && page < this.pagination.page + 3)
        return true
      return false
    },

    setCurrentPage(page: number) {
      if (page !== this.pagination.page) {
        this.pagination.page = page
        this.$emit('change', page)
      }
    },

    nextPage() {
      this.setCurrentPage(this.pagination.page + 1)
    },

    previousPage() {
      this.setCurrentPage(this.pagination.page - 1)
    },

    range,
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  @apply flex w-auto h-10 gap-2;

  .item {
    @apply flex justify-center items-center w-input font-noto bg-backdrop cursor-pointer select-none;

    border-radius: 4px;
    transition: all 0.125s ease-in;

    ion-icon {
      @apply text-6 text-black-900;
    }

    &:hover {
      @apply bg-black-50;
    }

    &:active {
      @apply bg-black-100;
    }

    &[disabled] {
      @apply text-black-300 pointer-events-none;

      ion-icon {
        @apply text-black-300;
      }
    }

    &.active {
      @apply font-bold text-white bg-primary-500;
    }
  }
}
</style>
