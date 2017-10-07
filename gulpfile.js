const gulp          = require('gulp')
const watch         = require('gulp-watch')
const concat        = require('gulp-concat')
const pug           = require('gulp-pug')
const sass          = require('gulp-ruby-sass')
const autoprefixer  = require('gulp-autoprefixer')
const connect       = require('gulp-connect')

gulp.task('css', ()=>{
    sass('./src/sass/*.scss', {
        sourcemap: true,
        style: 'compressed'
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(connect.reload())
})

gulp.task('scripts', ()=>{
    return gulp.src(['./src/js/vendors/*.js', './src/js/partials/*.js', './src/js/*.js'])
                .pipe(concat('scripts.js'))
                .pipe(gulp.dest('./assets/js/'))
                .pipe(connect.reload())
})

gulp.task('pug', ()=>{
    return gulp.src('./src/pug/*.pug')
                .pipe(pug({
                    pretty: true
                }))
                .pipe(gulp.dest('./'))
                .pipe(connect.reload())
})

gulp.task('connect', ()=>{ 
    connect.server({
        root : './',
        port: 9000,
        livereload: true
    })
})

gulp.task('watch', ()=> {
    gulp.watch(['./src/**/*.pug'], ['pug'])
    gulp.watch(['./src/js/**/*.js'], ['scripts'])
    gulp.watch(['./src/sass/**/*.scss'], ['css'])
    // gulp.watch()
})

gulp.task('default',['connect', 'watch', 'pug', 'scripts', 'css'])