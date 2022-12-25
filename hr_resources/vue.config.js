const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: () => {
    return {
      devtool: 'source-map',
      devServer: {
        proxy: process.env.APP_ADMIN_URL
      }
    }
  },
  pluginOptions: {
    "vue-i18n": {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
  lintOnSave: true,
});
