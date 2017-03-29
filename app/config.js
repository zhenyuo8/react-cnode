module.exports = {
	"htmlIndex": "src/**/_*.html", //html入口文件规则
	"jsIndex": "src/js/**/_*.js",  //js入口文件规则,
	"cssIndex": "src/css/_*.less", //css入口文件规则,
	"imgIndex": ["src/img/**/*.jpg","src/img/**/*.png"], //css入口文件规则,
	//最终生成地址配置,
	"dist": {
		"base": './dist',
		"css": './dist/css',
		"js": './dist/js',
		"img": './dist/img'
	},
	"out": {
		"base": 'http://172.16.0.135:8888/wap/'
	}
}