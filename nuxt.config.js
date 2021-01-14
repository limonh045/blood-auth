export default {
  target: 'server',
  mode: 'universal',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "blood",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/css/style.css", "~assets/css/utility.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~plugins/fontawesome.js",'~/plugins/fire.js',],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  generate: {subFolders: true}, router: {base: '/'}
};
