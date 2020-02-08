// gulpプラグインの読み込み
const gulp = require("gulp");

const sass = require("gulp-sass");
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require("browser-sync");
const postcss = require("gulp-postcss");
const cssImport = require("postcss-import");

// const ejs = require("gulp-ejs");
// const rename = require("gulp-rename");
// const replace = require("gulp-replace"); 

// webpackの設定ファイルの読み込み
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

// ejs
// gulp.task("ejs", done => {
//   gulp
//     .src(["src/ejs/*.ejs", "!" + "src/ejs/**/_*.ejs"])
//     .pipe(ejs({}, {}, { ext: ".html" }))
//     .pipe(rename({ extname: ".html" }))
//     .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
//     .pipe(gulp.dest("./dest/"));
//   done();
// });

// Sass
gulp.task("sass", function () {
  const plugins = [
    cssImport({
      path: [ 'node_modules' ]
    })
  ];
  return gulp.src('./src/css/index.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(autoprefixer()) // ベンダープレフィックス付与
    .pipe(gulp.dest('./dest/asset/css'));
});

// .min.cssを生成する
gulp.task("mincss", function () {
  return gulp.src('./dest/asset/css/index.css')//上のタスクで出力したcssファイル
          .pipe(cleanCSS()) // cssを圧縮
          .pipe(gulp.dest('./dest/asset/css'));
});

gulp.task("css", function (done) {
  gulp.watch('./src/css/*.scss', gulp.series('sass', 'mincss'));
  done();
});


// js
gulp.task("bundle", function () {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dest/asset/js"))
    .pipe(autoprefixer({
      cascade: false
    }));
});

gulp.task("js", function (done) {
  gulp.watch('./src/js/*.js', gulp.series('bundle'));
  done();
});

// ブラウザシンク
gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./dest/**", function(done) {
    browserSync.reload();
    done();
  });
});

// html, css, jsを生成
gulp.task('default', gulp.series(gulp.parallel('js', 'css', 'browserSync')));
