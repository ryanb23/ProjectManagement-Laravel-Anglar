var gulp = require('gulp')
var filter = require('gulp-filter')
var notify = require('gulp-notify')
var cssnano = require('gulp-cssnano')
var uglify = require('gulp-uglify')
var concat_sm = require('gulp-concat-sourcemap')
var concat = require('gulp-concat')
var gulpIf = require('gulp-if')
var Elixir = require('laravel-elixir')
var Task = Elixir.Task

var themeScripts = [
    //Datatabe Scripts
    './public/assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js',
    './public/assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js',
    './public/assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js',
    './public/assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js',
    './public/assets/plugins/datatables-responsive/js/datatables.responsive.js',
    //switchery
    './public/assets/plugins/switchery/js/switchery.min.js',
    './public/assets/plugins/ng-switchery/ng-switchery.js',
    //Select
    './public/assets/plugins/angular-ui-select/select.min.js',
    //datapicker
    './public/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
    //tabcollapse
    './public/assets/plugins/bootstrap-collapse/bootstrap-tabcollapse.js'
],
themeStyles = [
    //Datatable Css
    './public/assets/plugins/jquery-datatable/media/css/dataTables.bootstrap.min.css',
    './public/assets/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css',
    './public/assets/plugins/datatables-responsive/css/datatables.responsive.css',
    //switchery Css
    './public/assets/plugins/switchery/css/switchery.min.css',
    //Select Css
    './public/assets/plugins/bootstrap-select2/select2.css',
    './public/assets/plugins/angular-ui-select/select.min.css',
    './public/assets/plugins/angular-ui-select/pages-select2-old.css',
    //datapicker
    './public/assets/plugins/bootstrap-datepicker/css/datepicker3.css'
];
Elixir.extend('theme', function (jsOutputFile, jsOutputFolder, cssOutputFile, cssOutputFolder) {
  var cssFile = cssOutputFile || 'theme.css'
  var jsFile = jsOutputFile || 'theme.js'

  if (!Elixir.config.production) {
    concat = concat_sm
  }

  var onError = function (err) {
    notify.onError({
      title: 'Laravel Elixir',
      subtitle: 'Theme Files Compilation Failed!',
      message: 'Error: <%= error.message %>',
      icon: __dirname + '/../node_modules/laravel-elixir/icons/fail.png'
    })(err)
    this.emit('end')
  }

  new Task('theme-js', function () {
    return gulp.src(themeScripts)
      .on('error', onError)
      .pipe(concat(jsFile, {sourcesContent: true}))
      .pipe(gulpIf(Elixir.config.production, uglify()))
      .pipe(gulp.dest(jsOutputFolder || Elixir.config.js.outputFolder))
      .pipe(notify({
        title: 'Laravel Elixir',
        subtitle: 'Theme Javascript Files Imported!',
        icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
        message: ' '
      }))
  })

  new Task('theme-css', function () {
    return gulp.src(themeStyles)
      .on('error', onError)
      .pipe(concat(cssFile))
      .pipe(gulpIf(config.production, cssnano({safe: true})))
      .pipe(gulp.dest(cssOutputFolder || config.css.outputFolder))
      .pipe(notify({
        title: 'Laravel Elixir',
        subtitle: 'CSS Bower Files Imported!',
        icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
        message: ' '
      }))
  })
})
