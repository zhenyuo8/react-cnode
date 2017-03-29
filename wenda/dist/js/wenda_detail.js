(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/3/10.
 */
window.onload = function(){
	var input = $("#choose_img")[0];
	var result= $(".img_arae")[0];
	if ( typeof(FileReader) === 'undefined' ){
		input.addEventListener( 'change',ieReader,false );
	} else {
		input.addEventListener( 'change',readFile,false );
	}
	$(".img_area").on("mouseover mouseout",function(event){
		var target = event.srcElement ? event.srcElement : event.target;
		if(event.type == "mouseover"){
			$(".p_del").css("display","block");
		}else if(event.type == "mouseout"){
			//鼠标离开
			$(".p_del").css("display","none")
		}
	})
	//点击删除图片
	$(".img_area").on("click",".p_del",function (event) {
		var target = event.srcElement ? event.srcElement : event.target;
		$(target).parent().remove();
		$("#choose_img").attr("disabled",false);
	});
	//弹出举报弹框
	$(".quetion_list").on("click",".w_report",function () {
		$(".alert_report").css("display","block");
	})
	//弹出删除警告框
	$(".quetion_list").on("click",".w_delete",function () {
		$(".alert_delete").css("display","block");
	})
	//关闭举报弹框
	$(".alert_report p img.absolute").on("click",function () {
		$(".alert_report").css("display","none");
	})
	//关闭删除弹框
	$(".alert_delete .cancel").on("click",function () {
		$(".alert_delete").css("display","none");
	})
	//关闭字少提示框
	$(".lj_hint_delete").on("click",function () {
		$('.mask,.lj_hint').show();
	})
	//回复弹出层
	$(".answer_list").on("click","._huifu",function (event) {
		var target = event.srcElement ? event.srcElement : event.target
		if($(".answer_reply").css("display").indexOf("block")>-1){
			$(".answer_reply").css("display","none");
			$("._huifu img").attr("src","../img/arrow_down.png")
		}else{
			$(".answer_reply").css("display","block");
			$("._huifu img").attr("src","../img/arrow_up.png")
		}

	});
	$(".tcdPageCode").createPage({
		pageCount: 5,
		current: 1,
		backFn: function (p) {
			console.log(p)
		}
	});
	//有用点击事件
	$(".haveUse").click(
		function () {
			if($(this).find("img").attr("src").indexOf("zan_c")>-1){
				$(this).find("img").attr("src","../img/zan_kong.png")
				$(this).siblings("i").html(parseInt($(this).siblings("i").html())-1)
			}else{
				$(this).find("img").attr("src","../img/zan_c.png")
				$(this).siblings("i").html(parseInt($(this).siblings("i").html())+1)
			}
		}
	);
	//获取位置
	$('.clearZoom').on('click',function(){
		$('.a_location_cur').hide();
		$('.clearZoom').html('获取位置');
	});
	//关注问题
	$(".follow").click(function () {
		if($(".follow").css("background").indexOf("red")>-1){
			$(".follow").css("backgroundImage","url(../img/xin.png)")
		}else{
			$(".follow").css("backgroundImage","url(../img/red_xin.png)")
		}
	})
}
function readFile(){
	var file = this.files[0];
	// console.log(file);
//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
	if(!/image\/\w+/.test(file.type)){
		alert("请确保文件为图像类型");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		$("#img_area1").prepend("<span><u class='p_del'></u><img src='"+this.result+"' class='imgs'></span>");
		$('#choose_img').val('');
		$(".p_del").css("display","none")
		$("#choose_img").attr("disabled","disabled");
	}
}
function ieReader() {
	var file = this.files[0];
	file.select();
	var reallocalpath = document.selection.createRange().text;
	var isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

	if (isIE6) {
		// pic.src = reallocalpath;
	}else {
		//$(".lj_add_img").prepend('<div class="lj_img_box"><div class="lj_img"><img id="picShow" src="'+reallocalpath+'" name="pic"></div><img src="img/delete.png" class="lj_img_delete">')
		jQuery("#choose_img").prepend('<div class="lj_img_box"><div class="lj_img"><img id="'+pic+'addImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" name="pic"></div><img src="img/delete.png" class="lj_img_delete">')
		jQuery("#"+pic+"addImg")[0].style.width="68px";
		jQuery("#"+pic+"addImg")[0].style.height="68px";
		jQuery("#"+pic+"addImg")[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")";
		jQuery("#"+pic+"addImg")[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		pic++;
	}
}

},{}]},{},[1])