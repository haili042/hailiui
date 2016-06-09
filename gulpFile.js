var gulp 			= 			require('gulp'),
    sourcemaps 		= 			require('gulp-sourcemaps'),			// sourcemaps 调试
    less 			= 			require('gulp-less'),				// 编译 less
    concat 			= 			require('gulp-concat'),				// 合并 js, css
    uglify 			= 			require('gulp-uglify'),				// 压缩 js
    cssnano 		= 			require('gulp-cssnano'),			// 压缩 css
    plumber 		= 			require('gulp-plumber'),			// pipe出错后跳过任务
    connect 		= 			require('gulp-connect'),			// server
    del 			= 			require('del'),						// node 的删除文件库
    q 				= 			require('q'),						// node 的异步处理库
    stripDebug		= 			require('gulp-strip-debug')			// 去除console.log, debugger
//karma			= 			require('karma')					// karma 测试驱动, 让测试在浏览器里运行
    ;