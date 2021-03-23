const gulp = require("gulp");
const { src, dest, parallel, series, watch } = require("gulp");

// html
const htmlmin = require("gulp-htmlmin");

// css
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const gcmq = require("gulp-group-css-media-queries");

//images
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

// scripts
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify");

//overall
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();
const gulpif = require("gulp-if");

const srcPath = "src/";
const distPath = "dist/";

let isProd = false;

const serve = () => {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
    },
  });
};

const html = () => {
  return src(srcPath + "*.html")
    .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(dest(distPath))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

const htmlBackend = () => {
  return src(srcPath + "*.html").pipe(dest(distPath));
};

const images = () => {
  return src(srcPath + "images/**/*")
    .pipe(
      gulpif(
        isProd,
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 3 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(dest(distPath + "images/"))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

const convertToWebp = () => {
  return src(srcPath + "images/**/*.{jpg, png}")
    .pipe(webp({ quality: 90 }))
    .pipe(dest(distPath + "images/"));
};

const fonts = () => {
  return src(srcPath + "fonts/**/*")
    .pipe(dest(distPath + "fonts/"))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

const assets = () => {
  return src(srcPath + "assets/**/*")
    .pipe(dest(distPath + "assets/"))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

const styles = () => {
  return src(srcPath + "scss/style.scss")
    .pipe(gulpif(!isProd, plumber()))
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(gulpif(isProd, gcmq()))
    .pipe(
      gulpif(
        isProd,
        cssnano({
          zindex: false,
          discardComments: {
            removeAll: true,
          },
        })
      )
    )
    .pipe(dest(distPath + "css/"))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

const stylesBackend = () => {
  return src(srcPath + "scss/style.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(dest(distPath + "css/"));
};

const scripts = () => {
  return src(srcPath + "scripts/*.js")
    .pipe(
      gulpif(
        isProd,
        webpackStream({
          mode: "production",
          output: {
            filename: "main.js",
          },
          module: {
            rules: [
              {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                  presets: ["@babel/preset-env"],
                },
              },
            ],
          },
        })
      )
    )
    .pipe(gulpif(isProd, uglify()))
    .pipe(
      gulpif(
        !isProd,
        webpackStream({
          mode: "development",
          output: {
            filename: "main.js",
          },
        })
      )
    )
    .pipe(dest(distPath + "scripts/"))
    .pipe(gulpif(!isProd, browserSync.stream()));
};

const cleanDist = () => {
  return del("./" + distPath);
};

const watchFiles = () => {
  watch(srcPath + "*.html", html);
  watch(srcPath + "scss/**/*.scss", styles);
  watch(srcPath + "scripts/**/*.js", scripts);
  watch(srcPath + "images/**/*.{jpg,png,svg,gif,webp}", images);
  // watch(srcPath + "images/**/*.{jpg,png}", convertToWebp);
  watch(srcPath + "fonts/**/*.{eot,woff,woff2,ttf,svg}", fonts);
  watch(srcPath + "assets/**/*", assets);
};

const setProd = (cb) => {
  isProd = true;
  cb();
};

const watcher = parallel(watchFiles, serve);

exports.default = series(
  cleanDist,
  parallel(html, fonts, images, assets, styles, scripts),
  watcher /*convertToWebp */
);

exports.backend = series(
  setProd,
  cleanDist,
  parallel(htmlBackend, fonts, images, assets, stylesBackend, scripts)
);

exports.build = series(
  setProd,
  cleanDist,
  parallel(html, fonts, images, assets, styles, scripts)
);
// exports

exports.serve = serve;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.assets = assets;
exports.convertToWebp = convertToWebp;
exports.cleanDist = cleanDist;
exports.watcher = watcher;
