var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');
var bower = require('gulp-bower');



var paths = {
    scripts: ['gulpfile.js', 'public/js/**', 'app/**/*.js'],
    html: ['public/views/**'],
    html: ['public/views/**'],
    jade: ['app/views/**'],
    scss: ['public/css/common.scss, public/css/views/articles.scss'],
    css: ['public/css/**']
};

gulp.task('scss', function () {
    return gulp.src('./public/scss/common.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));

});

gulp.task('jshint', function () {
    return gulp.src(['gulpfile.js', 'public/js/**/*.js', 'test/**/*.js', 'app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        ignore: ['README.md', 'node_modules/**', '.DS_Store'],
        watch: ['app', 'config']
    })
});

gulp.task('bower', function () {
    return bower('./public/lib')
        .pipe(gulp.dest('./public/lib'))
});

gulp.task('cleanfiles', function () {
    return gulp.src('./public/css/common.css', { read: false })
        .pipe(clean());
});

gulp.task('cleanLibs', function () {
    return gulp.src(['./public/lib'], { read: false })
        .pipe(clean());
});
gulp.task('cleanTest', function () {
    return gulp.src(['./test/gulptestclean.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
        }));
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.scripts, ['jshint'], function () {
        gulp.src(paths.scripts).pipe(livereload());
    });

    gulp.watch(paths.html, function () {
        gulp.src(paths.html).pipe(livereload());
    });
    gulp.watch(paths.jade, function () {
        gulp.src(paths.jade).pipe(livereload());
    });

    gulp.watch(paths.scss, ['scss'], function () {
        gulp.src(paths.scss).pipe(livereload());
    });

    gulp.watch(paths.css, function () {
        gulp.src(paths.css).pipe(livereload());
    });
});


gulp.task('default', ['jshint', 'scss', 'watch', 'start']);

gulp.task('clean', ['cleanLibs', 'cleanfiles','cleanTest']);
gulp.task('install', ['bower']);

gulp.task('test', ['scss', 'bower'], function () {

    gulp.src(['./test/!(gulptestclean.js)/**'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
        }));
});






