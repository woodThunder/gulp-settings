var gulp = require('gulp');
var concat = require('gulp-concat');//合并文件
var less = require('gulp-less');//编译less
var cleanCSS = require('gulp-clean-css');//压缩css

var babel = require('gulp-babel');//编译ES6
var ugLify   = require('gulp-uglify');

var imageMin = require('gulp-imagemin');//压缩图片
var pngquant = require('imagemin-pngquant');//深度压缩

var changed  = require('gulp-changed');//检查改变状态

var browserSync = require('browser-sync').create();;//浏览器实时刷新

gulp.task('less', function() {
	return gulp.src('gulp/less/*.less')
		.pipe(changed('css', {hasChanged: changed.compareSha1Digest}))
	    .pipe(less()) 
	    .pipe(concat('main.css'))
	    .pipe(cleanCSS())
	    .pipe(gulp.dest('css'))
	    .pipe(browserSync.reload({stream: true}))
});

gulp.task("js",function(){
    return gulp.src('gulp/js/*.js')
    	.pipe(changed('js', {hasChanged: changed.compareSha1Digest}))
    	.pipe(concat('main.js'))
    	.pipe(babel())
        .pipe(ugLify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("images",function(){
    return gulp.src('gulp/images/*')
    	.pipe(changed('images', {hasChanged: changed.compareSha1Digest}))
    	.pipe(imageMin({
            progressive: true,// 无损压缩JPG图片
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest('images'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("upload",function(){
    return gulp.src('gulp/upload/*')
    	.pipe(changed('upload', {hasChanged: changed.compareSha1Digest}))
    	.pipe(imageMin({
            progressive: true,// 无损压缩JPG图片
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest('upload'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync.init({
	port: 2019,
    server: {
      baseDir: './'
    },
  })
});

gulp.task('watch',gulp.parallel('browserSync','less','js','images','upload', function(){
	gulp.watch('gulp/less/*.less', gulp.series("less"));
	gulp.watch('gulp/js/*.js', gulp.series("js"));
	gulp.watch('gulp/images/*', gulp.series("images"));
	gulp.watch('gulp/upload/*', gulp.series("upload"));
}));

gulp.task('default', gulp.parallel('watch'));