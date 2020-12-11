module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    prependData: '@import "@/assets/styles.sass"'
                }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-game/'
        : '/'
}