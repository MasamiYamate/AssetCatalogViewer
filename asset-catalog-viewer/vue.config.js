module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  outputDir: '../docs',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/styles/common/common.scss";'
      }
    }
  }
}