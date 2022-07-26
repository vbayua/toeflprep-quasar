import { boot } from 'quasar/wrappers'
import VueHtmlToPaper from 'vue-html-to-paper'

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$htmlToPaper = VueHtmlToPaper
})
