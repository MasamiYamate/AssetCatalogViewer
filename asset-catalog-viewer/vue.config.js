module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  outputDir: '../dist',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/styles/common/common.scss";'
      }
    }
  }
}
