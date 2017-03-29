//此上传利用了 jquery 的 Jcrop 插件

//pic,img标签， file: input文件选择标签


//h5的文件读取
function html5Reader(file, pic) {
	var file = file.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		//var pic = document.getElementById("preview");
		pic.src=this.result;
	}
}

//ie下读取本地文件
function ieReader(file, pic) {
	file.select();
	// var reallocalpath = document.selection.createRange().text;
	var reallocalpath = file.value;
	console.log(reallocalpath)
	var isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;
	// IE6浏览器设置img的src为本地路径可以直接显示图片
	if (isIE6) {
		pic.src = reallocalpath;
	}else {
		// 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现


		pic.style.filter =  "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")";
		// 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
		pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	}
}


function change(picElm, fileElm) {
	var ext=fileElm.value.substring(fileElm.value.lastIndexOf(".")+1).toLowerCase();
	// gif在IE浏览器暂时无法显示
	if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
		alert("只支持png、jpg、jpeg格式！");
		return;
	}
	if (typeof FileReader == "undefined") {
		ieReader(fileElm, picElm)
	} else {
		html5Reader(fileElm, picElm);
	}
}


jQuery(function () {

	var fileInputElm = jQuery('#fileSelect'); //文件地址input框
	var positionElm = jQuery('#position'); //坐标保存input框
	var picElm = jQuery('#picShow');  //图片容器
	var submit = jQuery('#submit'); //选择图片按钮

	//绑定本地图片选择
	fileInputElm.change(function () {
		change(picElm.get(0), fileInputElm.get(0));
	});

	//绑定选择图片按钮
	submit.click(function (e) {
		fileInputElm.get(0).click();
	});

	//绑定图片容器，当图片加载完毕，启动拖拽选框
	var jcropApi;
	picElm.Jcrop({
		onSelect: function (e) {
			var re = {x:e.x, y:e.y, w:e.x2, h:e.y2};
			var str = e.x + '|' + e.y + '|' + e.x2 + '|' + e.y2;
			//输出坐标位置
			console.log(re);
			console.log(str);
		},
		aspectRatio: 1, //选矿宽高比例
		boxWidth:	600, //盒子宽度
		boxHeight: 'auto'
	}, function() {
		jcropApi = this;

	});
	picElm.load(function (e) {
		if (jcropApi) { jcropApi.destroy(); }
		picElm.Jcrop({
			onSelect: function (e) {
				var re = {x:e.x, y:e.y, w:e.x2, h:e.y2};
				var str = e.x + '|' + e.y + '|' + e.x2 + '|' + e.y2;
				//输出坐标位置
				console.log(re);
				console.log(str);
			},
			aspectRatio: 1, //选矿宽高比例
			boxWidth:	600, //盒子宽度
			boxHeight: 'auto'
		}, function() {
			jcropApi = this;
		});
	});


});



