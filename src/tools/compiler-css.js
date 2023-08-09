const {
  gulpCompileStylesDevTask,
  gulpCompileStylesTask,
  gulpWatchStylesTask
} = require("./gulp-tasks")

if (process.env.RUNDEVSERVER === "true") {
  gulpCompileStylesDevTask();
  gulpWatchStylesTask();
} else {
  gulpCompileStylesTask()
}
