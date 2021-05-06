export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'madoobaan-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'module',
        src: 'https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js',
        async: true,
        defer: true,
      },
    ],
  },

  router: {
    middleware: ['i18n', 'auth'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.ts' },
    { src: '~/plugins/store-adapter' },
    { src: '~/plugins/styles.ts' },
    { src: '~/plugins/i18n.ts' },
    { src: '~/plugins/mixins.ts' },
    { src: '~/plugins/v-click-outside.ts', ssr: false },
    { src: '~/plugins/firebase.ts', ssr: false },
    { src: '~/plugins/vee-validate.ts', ssr: false },
    { src: '~/plugins/splide.client.ts', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    ['@nuxtjs/dotenv', { filename: '.env' }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: process.env.NUXT_PORT ? process.env.NUXT_PORT : 8080,
  },
}
