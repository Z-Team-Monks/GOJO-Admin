export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "GOJO Rental Services",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/hut_icon.png" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css",
    // SCSS file in the project
    "~/assets/scss/styles.scss",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/date-picker.js",
    { src: "~/plugins/persistedState.client.js", ssr: false },
    "~/plugins/route.js",
  ],
  ssr: false,
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],
  styleResources: {
    scss: [
      "~/assets/scss/variables.scss",
      // '~/assets/style/mixins.scss',
      "~/assets/scss/styles.scss",
    ],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "bootstrap-vue/nuxt"],
  router: {
    middleware: "auth",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: false,
  },

  publicRuntimeConfig: {
    localUrl: process.env.LOCAL_IP
      ? `http://${process.env.LOCAL_IP}:3000`
      : "http://localhost:3000",
    baseUrl: process.env.BASE_URL || "http://34.163.18.207:8000/api/v1",
  },
  privateRuntimeConfig: {},

  server: {
    host: process.env.LOCAL_IP,
    port: "3000",
  },
};

// http://192.168.28.207:8000/api/v1
