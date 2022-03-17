const { watch, src, dest, parallel, series } = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const jsonToSass = require("gulp-json-data-to-sass");

function jsonCss() {
  return src("./stylevariables.json").pipe(
    jsonToSass({
      sass: "./scss/stylevariables.scss",
      separator: "",
    })
  );
}
function cssTask() {
  return src("./scss/*.scss", { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./styles"));
}

function watchFiles() {
  watch("./scss/*.scss", parallel(cssTask));
  watch("./stylevariables.json", parallel(jsonCss));
}

exports.build = series(jsonCss, cssTask);

exports.default = series(jsonCss, parallel(cssTask, watchFiles));
