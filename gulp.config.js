var config = {
  /* SOURCE file information for all gulp tasks */
  src: {
    sourceDir:      __dirname + '/app/',
    tsRoot:         __dirname + '/app/main.ts',        /* this is the root TS/TSX file, browserify will hunt down the rest */
    sassFiles:      __dirname + '/app/scss/**/*.scss',         /* pattern used to locate scss files within sassDir */
    fontsDir:       __dirname + '/app/fonts',
    iconsDir:       __dirname + '/app/icons',
    svgDir:         __dirname + '/app/svg',
    imagesDir:      __dirname + '/app/images',
    cssDir:         __dirname + '/app/css',               /* third party css */
    indexFile:      __dirname + '/app/index.html',
    vendorJs:       __dirname + '/bower_components/'
  },
  /* DESTINATION aka build output file information, "where should the build files go" */
  dest: {
    outputDir:      __dirname + '/dist',
    fontsDir:       __dirname + '/dist/fonts',
    iconsDir:       __dirname + '/dist/icons',
    svgDir:         __dirname + '/dist/svg',
    imagesDir:      __dirname + '/dist/images',
    cssDir:         __dirname + '/dist/css',
    jsDir:          __dirname + '/dist/js'
  },
  tempDir:          __dirname + '/compiled',                  /* where transpiled TS files are stored prior to merging */
  webPack: {
    port: 12000                                 // Port for webpack dev server
  }
};


module.exports = config;