var gulp 			= 			require('gulp'),
    sourcemaps 		= 			require('gulp-sourcemaps'),			// sourcemaps 调试
    less 			= 			require('gulp-less'),				// 编译 less
    concat 			= 			require('gulp-concat'),				// 合并 js, css
    uglify 			= 			require('gulp-uglify'),				// 压缩 js
    cssnano 		= 			require('gulp-cssnano'),			// 压缩 css
    plumber 		= 			require('gulp-plumber'),			// pipe出错后跳过任务
    del 			= 			require('del'),						// node 的删除文件库
    q 				= 			require('q'),						// node 的异步处理库
    stripDebug		= 			require('gulp-strip-debug'),		// 去除console.log, debugger
    browserSync 	= 			require('browser-sync').create()	// 去除console.log, debugger
;

var src = {
    js              :           'src/js/**/*.js',
    less            :           'src/less/**/*.less',
    img             :           'src/img/**/*',
    all             :           'src/**/*'
};

var dest = {
    js              :           'app/js',
    css             :           'app/css',
    img             :           'app/img'
};

var output = {
    jsApp           :           'app.min.js',
    jsLib           :           'lib.min.js',
    cssApp          :           'app.min.css'
};

gulp.task('watch', function() {

    gulp.start(['browserSync']);

    gulp.watch(src.js, ['js-dev']);
    gulp.watch(src.less, ['css-dev']);

    // logs
    gulp.watch(src.all, function (event) {
        var path = event.path,
            file = path.substr(path.indexOf('src'));

        console.log('---------------------------------------------------------');
        console.log(file + ' was ' + event.type);
    });
});

gulp.task('build', ['js', 'css']);


// build task
gulp.task('js', function () {
    return gulp.src(src.js)
        .pipe(sourcemaps.init())
        .pipe(stripDebug())
        .pipe(concat(output.jsApp))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.js))
    ;
});

gulp.task('css', function () {
    return gulp.src(src.less)
        .pipe(less())
        .pipe(concat(output.cssApp))
        .pipe(cssnano())
        .pipe(gulp.dest(dest.css))
    ;
});


// develop task
gulp.task('js-dev', function() {
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(concat(output.jsApp))
        .pipe(gulp.dest(dest.js))
        .pipe(browserSync.reload({ stream: true }))                 // reload
    ;
});

gulp.task('css-dev', function () {
    return gulp.src(src.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(concat(output.cssApp))
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.reload({ stream: true }))                 // reload
    ;
});


// live reload
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"           // or ip address
        }
    });
});