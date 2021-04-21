<template lang="pug">
  .calendar-picker
    .calendar-navigator
      .button.border-0.navigator-button(tabindex="none" @click.prevent="previousMonth")
        ion-icon(name="chevron-back-outline")
      
      .navigator-dropdown
        .months(@click="showMonthsDropdown") {{ currentMonth }}
          ion-icon(name="caret-down")
          Dropdown(ref="monthsDropdown" tabindex="none" :options="months" position="bottom-right" v-model="month")
        
        .years(@click="showYearsDropdown") {{ currentYear }}
          ion-icon(name="caret-down")
          Dropdown(ref="yearsDropdown" tabindex="none" :options="years" position="bottom-left" v-model="year")
      
      .button.border-0.navigator-button(tabindex="none" @click.prevent="nextMonth")
        ion-icon(name="chevron-forward-outline")
    
    .calendar.mt-5
      .col SU
      .col MO
      .col TU
      .col WE
      .col TH
      .col FR
      .col SA

      .col(v-for="date in dates" :class="{ 'active': isSameDay(date, model), 'muted': !isSameMonth(date, navigation) }" @click="selectDate(date)")
        span {{ format(date, 'd') }}
          
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import {
  addDays,
  addMonths,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  set,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  toDate,
} from 'date-fns'
import { range } from 'lodash'

import Dropdown, { DropdownOption } from '@/components/menus/Dropdown.vue'

import useExtractModelValue from '@/composables/forms/useExtractModelValue'

export default defineComponent({
  name: 'CalendarPicker',

  components: {
    Dropdown,
  },

  props: {
    value: {
      type: Date,
      default: null,
    },
  },

  setup(props) {
    const value = ref(props.value || new Date())

    useExtractModelValue(props, (payload) => {
      value.value = payload
    })

    return {
      model: value,
      monthsDropdown: ref<InstanceType<typeof Dropdown>>(),
      yearsDropdown: ref<InstanceType<typeof Dropdown>>(),
    }
  },

  data() {
    return {
      navigation: toDate(this.value || new Date()),
    }
  },

  computed: {
    months(): DropdownOption[] {
      return range(0, 12)
        .map((i) => setMonth(new Date(), i))
        .map((month, i) => ({ value: i, content: format(month, 'MMMM') }))
    },

    years(): DropdownOption[] {
      return range(2021 - 50, 2021 + 50).map((year) => ({
        content: year.toString(),
        value: year,
      }))
    },

    dates(): Date[] {
      const startDate = startOfWeek(startOfMonth(this.navigation!))
      const endDate = endOfWeek(endOfMonth(this.navigation!))

      return range(
        0,
        Math.abs(differenceInDays(startDate, endDate)) + 1
      ).map((i) => addDays(startDate, i))
    },

    month: {
      get(): number {
        return parseInt(format(this.navigation!, 'M')) - 1
      },

      set(value: number) {
        this.navigation = setMonth(this.navigation!, value)
      },
    },

    year: {
      get(): number {
        return parseInt(format(this.navigation!, 'y'))
      },

      set(value: number) {
        this.navigation = setYear(this.navigation!, value)
      },
    },

    currentMonth(): string {
      return format(this.navigation!, 'MMMM')
    },

    currentYear(): string {
      return format(this.navigation!, 'y')
    },
  },

  methods: {
    resetNavigation(date?: Date) {
      if (date) this.navigation = toDate(date)
      else this.navigation = toDate(this.model!)
    },

    selectDate(date: Date) {
      this.navigation = set(this.navigation, {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      })

      this.$emit('input', toDate(this.navigation))
    },

    showMonthsDropdown(e: MouseEvent) {
      this.monthsDropdown?.toggle(e)
    },

    showYearsDropdown(e: MouseEvent) {
      this.yearsDropdown?.toggle(e)
    },

    previousMonth() {
      this.navigation = addMonths(this.navigation, -1)
    },

    nextMonth() {
      this.navigation = addMonths(this.navigation, 1)
    },

    format,

    isSameDay,
    isSameMonth,
    isSameYear,
  },
})
</script>

<style lang="scss" scoped>
.calendar-picker {
  @apply w-full;

  .calendar-navigator {
    @apply flex w-full h-8 gap-x-2;

    .navigator-button {
      @apply square-8 p-0 text-20 text-black-900;

      &:active {
        @apply outline-none;
      }
    }

    .navigator-dropdown {
      @apply flex flex-grow items-center justify-center gap-x-4;

      .months,
      .years {
        @apply relative flex items-center w-auto h-full gap-x-1 font-noto font-semibold text-14px cursor-pointer;

        ion-icon {
          @apply text-14px pointer-events-none;

          transition: transform 0.25s ease-in;
        }

        >>> .dropdown-menu {
          @apply max-w-32;
        }

        &.active {
          ion-icon {
            transform: rotate(-180deg);
          }
        }
      }
    }
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: theme('spacing.8') repeat(
        auto-fill,
        minmax(theme('spacing.8'), 1fr)
      );
    grid-gap: theme('spacing.2');

    .col {
      @apply flex items-center justify-center font-noto;

      span {
        @apply inline-flex items-center justify-center square-8 text-14px rounded-sm;
      }

      &:nth-child(-n + 7) {
        @apply font-semibold text-3 mb-2;
      }

      &:nth-child(n + 8) {
        @apply h-8 cursor-pointer;
      }

      &:nth-child(1),
      &:nth-child(7) {
        @apply text-error-400;
      }

      &:nth-child(n + 2):not(:nth-child(n + 7)) {
        @apply text-black-900;
      }

      &:hover {
        span {
          @apply bg-primary-100;
        }
      }

      &.muted {
        span {
          @apply text-black-300;
        }
      }

      &.active {
        span {
          @apply font-semibold bg-primary-500;
        }
      }
    }
  }
}
</style>
