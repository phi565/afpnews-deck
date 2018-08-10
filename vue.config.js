module.exports = {
  css: {
    sourceMap: true
  },

  lintOnSave: undefined,

  pwa: {
    workboxPluginMode: 'InjectManifest',
    name: 'AFP Deck'
  },

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}