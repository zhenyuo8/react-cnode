/**
 * 任务流文件
 * 1、将所有的模版文件编译成js模块文件
 * 2、监听所有html页面文件修改，复制到dest
 * 3、监听less文件编辑，编译成css文件并输出到dest
 * 4、合并js文件，并输出到dest
 * npm install -g gulp-cli browser-sync gulp gulp-autoprefixer gulp-browserify gulp-concat gulp-htmlclean gulp-imagemin gulp-less gulp-rename gulp-uglify stream-combiner2 through2
 * @date    2017-01-12 11:48:46
 * @version 0.1
 */

var path = require('path');
var Url = require('url');
var fs = require('fs');

var mkdir = require('mkdirp');
var gulp = require('gulp');
var browserSync = require('browser-sync'); //实时调试模块
var combiner = require('stream-combiner2'); //处理gulp任务流错误

var browserify = require('gulp-browserify'); //模块化开发文件合并
var through = require('through2'); //自定义任务流工具
var html = require('gulp-htmlclean'); //html清理
var concat = require('gulp-concat');  //js文件合并模块
var less = require('gulp-less');     //less编译
var uglify = require('gulp-uglify'); //js压缩
var imagemin = require('gulp-imagemin'); //img压缩
//var imageminQ = require('imagemin-pngquant'); //img深度压缩
var rename = require('gulp-rename'); //重命名
var putoprefixer = require('gulp-autoprefixer');  //css样式兼容性补全
var doT = require('dot'); //html模板引擎，这个可以深入开发，用dot全面接管html模板，目前只是用作简单数据绑定

var beautify = require('js-beautify');
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;

var config = require('./config'); //加载配置文件


//解析TPL模版的过滤器
var parseTpl = function () {
    return through.obj(function (file, enc, cb) {
        file.contents = new Buffer('module.exports = "' + String(file.contents).replace(/(\"|\'|\\)/g, '\\$1') + '";');
        cb(null, file);
    });
};


//解析模块
//让html支持include，支持简单的数据传递
var parseMod = function (obj) {
    return through.obj(function (file, enc, cb) {
        //file.contents = new Buffer('module.exports = "' + String(file.contents).replace(/(\"|\'|\\)/g, '\\$1') + '";');
        var err = null;
        var str = String(file.contents).replace(/({{)\s*(#include)\s*[^{{]*\s*(}})/g, function(word){
			var cc = word.split('#include')[1].split('}')[0].replace(/(^\s*)|(\s*$)/g, "").split('?');

			//传递参数解析
			var url = cc[0], da = {};
			if (cc.length > 1) {
				var h = cc[1];
				h = h.split('&');

			    var i, len = h.length, node;
			    for (var i = 0; i < len; i++) {
			      node = h[i];
			      node = node.split('=');
			      da[node[0]] = node[1] || null;
			    }
			}
			var html = word;
			try {
				var fi = fs.readFileSync(path.join('./src/', url), 'utf-8');
				html = beautify_html(doT.compile(fi)(da), {});
				//html = doT.compile(fi)(da);
			} catch (ex) {
				err = ex;
			}
			return  html;
		});

        //修改链接地址，同时存一份最终版本
        var outStr = str.replace(/<img[^>]*?(src=[\'\"]?([^\'\"]*)[\'\"]?)[^>]*?>/g, function(a, b, c){
        	return a.replace(c, Url.resolve(config.out.base, c));
		}).replace(/<link[^>]*?(href=[\'\"]?([^\'\"]*)[\'\"]?)[^>]*?>/g, function(a, b, c){
        	return a.replace(c, Url.resolve(config.out.base, c));
		});

        var pt = file.path;
        var name = path.parse(pt).base;
		if (name.substr(0,1) == '_') {
			pt = pt.replace(name, name.substr(1));
		}
		pt = pt.replace('/src/', '/out/').replace('\\src\\', '\\out\\');
		mkdir( path.dirname(pt), function (err1) {
			if (err1) {
				err = err1;
				cb(err || e || err1, file);
			} else {
				//beautify_html(outStr, {})
				fs.writeFile(pt, outStr, 'utf-8', function (e) {
					file.contents = new Buffer(str);
		        	cb(err || e, file);
				});
			}
		});
    });
};

//编译所有tpl模板
gulp.task('tpl', function() {
	var combined = combiner.obj([gulp.src('src/tpl/**/*.html'),html(), parseTpl(), gulp.dest('src/js/tpl')]);
	combined.on('error', console.error.bind(console));
	return combined;
	//return gulp.src('src/tpl/**/*.html').pipe(html()).pipe(parseTpl()).pipe(gulp.dest(jsTpl));
});

//编译所有html模板
gulp.task('html', function() {
	var combined = combiner.obj([gulp.src(config.htmlIndex),parseMod(), rename(function (pth) {
		if (pth.basename.indexOf('_') == 0) {
			pth.basename = pth.basename.substr(1);
		}
	}), gulp.dest(config.dist.base)]);
	combined.on('error', console.error.bind(console));
	return combined;
	//return gulp.src('src/html/**/*.html').pipe(parseMod()).pipe(gulp.dest(config.dist.base));
});



//编译所有img压缩
gulp.task('img', function() {
	var combined = combiner.obj([gulp.src(config.imgIndex), imagemin(), gulp.dest(config.dist.img)]);
	combined.on('error', console.error.bind(console));
	return combined;
	//return gulp.src('src/html/**/*.html').pipe(parseMod()).pipe(gulp.dest(config.dist.base));
});


//编译所有less文件到目标文件夹
gulp.task('less', function () {
	var combined = combiner.obj([gulp.src(config.cssIndex), less(), rename(function (pth) {
		if (pth.basename.indexOf('_') == 0) {
			pth.basename = pth.basename.substr(1);
		}
	}), gulp.dest(config.dist.css)]);
	combined.on('error', console.error.bind(console));
	return combined;
	//return gulp.src('src/css/**/*.less').pipe(less()).pipe(gulp.dest(config.dist.css));
});


//复制所有样式文件到目标文件夹
//gulp.task('css', function() {
//	var combined = combiner.obj([gulp.src(config.cssIndex), gulp.dest(config.dist.css)]);
//	combined.on('error', console.error.bind(console));
//	return combined;
//	//return gulp.src('src/css/**/*.css').pipe(gulp.dest(config.dist.css));
//});

gulp.task('js', function() {
	var combined = combiner.obj([gulp.src(config.jsIndex), browserify(

	), rename(function (pth) {
		if (pth.basename.indexOf('_') == 0) {
			pth.basename = pth.basename.substr(1);
		}
	}), gulp.dest(config.dist.js)]);
	combined.on('error', console.error.bind(console));
	return combined;
	//return gulp.src('src/js/*_main.js').pipe(browserify()).pipe(gulp.dest(config.dist.js));
});

gulp.task('server', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: config.dist.base
        }
    });
});

gulp.task('watch',function(){

	//监听所有模版文件的变化
	gulp.watch('src/tpl/**/*.html', function (ev) {
	    var from =  path.join(ev.path);
	    combiner.obj([gulp.src(from), html(), parseTpl(), gulp.dest('./src/js/tpl')]).on('error', console.error.bind(console));
	    //gulp.src(from).pipe(html()).pipe(parseTpl()).pipe(gulp.dest('src/js/tpl'));
	});

	//监听所有Img的变化
	gulp.watch(config.imgIndex, function (ev) {
	    var from =  path.join(ev.path);
	    combiner.obj([gulp.src(from), imagemin(), gulp.dest(config.dist.img)]).on('error', console.error.bind(console));
	});

	//监听所有less文件变化
	//gulp.watch('src/css/**/*.less', function (ev) {
	//    var from =  path.join(ev.path);
	//    combiner.obj([gulp.src(from), less(), gulp.dest(config.dist.css)]).on('error', console.error.bind(console));
	//    //gulp.src(from).pipe(less()).pipe(gulp.dest(config.dist.css));
	//});

	//监听mod的变化
	//gulp.watch('src/mod/**/*.html', ['html']);

	//监听html的变化
	gulp.watch('src/**/*.html', ['html']);

	//监听所有css文件变化
	//gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/css/*.less', ['less']);

	//监听js文件变化
	gulp.watch(['src/js/**/*.js', 'src/js/**/*.html'], ['js']);

});

gulp.task('default', ['tpl','less','js', 'html', 'img', 'watch', 'server']);

gulp.task('build',['tpl','less','js', 'html'])
