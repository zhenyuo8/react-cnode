(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

 function html5Reader(file) {
     var file = file.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function(e){
         //var pic = document.getElementById("preview");
         // pic.src=this.result;
         $(".lj_add_img").prepend('<div class="lj_img_box"><div class="lj_img"><img id="picShow" src="'+this.result+'" name="pic"></div><img src="img/delete.png" class="lj_img_delete">')
     }
}

var pic = 1;
function ieReader(file) {
	file.select();
	var reallocalpath = document.selection.createRange().text;
	var isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

     if (isIE6) {
		// pic.src = reallocalpath;
	 }else {

	     jQuery(".lj_add_img").prepend('<div class="lj_img_box"><div class="lj_img"><img id="'+pic+'addImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" name="pic"></div><img src="img/delete.png" class="lj_img_delete">')
	     jQuery("#"+pic+"addImg")[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
	     jQuery("#"+pic+"addImg")[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	     pic++;
	 }
}


function change(fileElm) {
	var ext=fileElm.value.substring(fileElm.value.lastIndexOf(".")+1).toLowerCase();
     if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
         alert("请选择图片类型！");
		 return;
     }
     if (typeof FileReader == "undefined") {
     	ieReader(fileElm)
     } else {
     	html5Reader(fileElm);
     }
     $(".lj_img").css("display","inline-block")
	if($(".lj_add_img .lj_img_box").length==7){
		$(".lj_add_box").hide();
	}
}


jQuery(function () {

	var fileInputElm = jQuery('#fileSelect'); //�ļ���ַinput��
	var positionElm = jQuery('#position'); //���걣��input��
	var picElm = jQuery('#picShow');  //ͼƬ����
	var submit = jQuery('#submit'); //ѡ��ͼƬ��ť
	var pic = 1;
	//�󶨱���ͼƬѡ��
	fileInputElm.change(function () {
		change( fileInputElm.get(0));
	});

	//��ѡ��ͼƬ��ť
	submit.click(function (e) {
		fileInputElm.get(0).click();
	});

	//��ͼƬ��������ͼƬ������ϣ�������קѡ��
	var jcropApi;
	picElm.load(function (e) {
		if (jcropApi) { jcropApi.destroy(); }
		picElm.Jcrop({
			onSelect: function (e) {
				var re = {x:e.x, y:e.y, w:e.x2, h:e.y2};
				var str = e.x + '|' + e.y + '|' + e.x2 + '|' + e.y2;
				//�������λ��
				console.log(re);
				console.log(str);
			},
		  aspectRatio: 1, //ѡ���߱���
		  boxWidth:	600, //���ӿ��
		  boxHeight: 'auto'
		}, function() {
		  jcropApi = this;

		});


	});


});




},{}]},{},[1])