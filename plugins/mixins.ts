import Vue from 'vue'
import { mapGetters } from 'vuex'
import { formatDatetime } from '@/helpers/modules/Parser'

Vue.mixin({
  computed: {
    ...mapGetters('modules/me', {
      auth$: 'authentication$',
      profile: 'profile',
      authenticated: 'authenticated',
    }),
  },

  methods: {
    formatDatetime(date: Date, format: string) {
      return formatDatetime(date, format)
    },

    clearState() {
      Object.assign(this.$data, (this?.$options?.data as any).apply(this))
    },
  },
})
