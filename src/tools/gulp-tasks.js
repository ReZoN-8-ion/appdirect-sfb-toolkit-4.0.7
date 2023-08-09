const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"))
const concat = require("gulp-concat")
const sourcemaps = require("gulp-sourcemaps")

const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)

const PATHS = {
  ASSETS: `${currentPath}/themes/${config.theme}/assets/**/*.s[a|c]ss`,
  HEADER_FOOTER: `${currentPath}/themes/${config.theme}/header-footer/**/*.scss`,
  COMPONENTS: `./themes/${config.theme}/components/**/*.scss`
}

const COMPONENTS_DEST = `./themes/${config.theme}/assets/css/components`;

const sassAssets = () => {
  return src([
    PATHS.ASSETS,
    PATHS.HEADER_FOOTER
  ])
  .pipe(sourcemaps.init())
  .pipe(
    sass()
    .on("error", sass.logError)
  )
  .pipe(sourcemaps.write())
  .pipe(dest(file => file.base))
}

const sassComponents = () => {
  return src([PATHS.COMPONENTS])
  .pipe(concat("components.scss"))
  .pipe(sourcemaps.init())
  .pipe(
    sass()
    .on("error", sass.logError)
  )
  .pipe(sourcemaps.write())
  .pipe(dest(COMPONENTS_DEST))
}

const sassAssetsProd = () => {
  return src([
    PATHS.ASSETS,
    PATHS.HEADER_FOOTER
  ])
  .pipe(
    sass({ outputStyle: "compressed" })
    .on("error", sass.logError)
  )
  .pipe(dest(file => file.base))
}

const sassComponentsProd = () => {
  return src([PATHS.COMPONENTS])
  .pipe(concat("components.scss"))
  .pipe(
    sass({ outputStyle: "compressed" })
    .on("error", sass.logError)
  )
  .pipe(dest(COMPONENTS_DEST))
}

const gulpCompileStylesTask = () => {
  series(sassAssetsProd, sassComponentsProd)();
}
const gulpCompileStylesDevTask = () => {
  series(sassAssets, sassComponents)();
}

const gulpWatchStylesTask =  () => {
  watch([PATHS.ASSETS, PATHS.HEADER_FOOTER], series(sassAssets, sassComponents));
}

module.exports = {
  gulpCompileStylesTask,
  gulpCompileStylesDevTask,
  gulpWatchStylesTask
}
