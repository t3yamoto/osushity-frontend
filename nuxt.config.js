export default {
  mode: 'spa',
  srcDir: 'app',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Osushity | 回転寿司アレルギー検索',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          '食物アレルギーをお持ちの方が、安心して回転寿司で食事をすることをサポートする検索サイトです。'
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@t3yamoto' },
      { name: 'og:url', content: `https://${process.env.DOMAIN_NAME}` },
      { name: 'og:title', content: 'Osushity | 回転寿司アレルギー検索' },
      {
        name: 'og:description',
        content:
          '食物アレルギーをお持ちの方が、安心して回転寿司で食事をすることをサポートする検索サイトです。'
      },
      {
        name: 'og:image',
        content: `https://${process.env.DOMAIN_NAME}/favicon.ico`
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/custom.scss', '~/assets/css/common.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    'nuxt-vue-multiselect',
    ['vue-scrollto/nuxt', { duration: 300 }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || '/api',
    retry: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#FFC857',
    background: '#fbfbfb'
  },
  sitemap: {
    hostname: `https://${process.env.DOMAIN_NAME}`
  }
}
