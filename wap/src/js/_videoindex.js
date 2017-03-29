$(function(){
var doT=require('./libs/doT.js');
var videoindex_newvideo = require('./tpl/videoindex_newvideo.html');
var sendData=function(url,fn){
	$.ajax({
	            url:url,
	            dataType : "jsonp",
	            success:function (data) {
	            	if(data.code===10000){
	            		console.log(data.code)
	            		fn(data);
	            	}
	            },
	            error:function () {
	               alert("请求数据失败");
	            }
        	});
}
//初始化
function init(){
	bindEvents();
	initNewVideo()
}
function reInfo(data) {
        var newvideo = doT.compile(videoindex_newvideo)(data.data[0])
       $("#newVideo_list").append(newvideo);
      	if(data.data[0].dataList.length<10){
			$('.load_more').css('display','none');
			$('.loading').css('display','none');
			return
		}else if(data.data[0].dataList.length==10){
			$('.load_more').css('display','block').html('查看更多视频').attr('seemore','true');
			$('.loading').css('display','none');
			return
		}
    }
function getNewVideoData(){
	var api='https://m.api.qichedaquan.com/video/mvideo/videodata?videoType=0&pageNo=2&pageSize=10&app_id=5d81db99484c0019cab240b3d04e9a4a';
	sendData(api,function(data){
		reInfo(data)
	})
}
function initNewVideo(url){
	var api='https://m.api.qichedaquan.com/video/mvideo/videodata?videoType=0&pageNo=1&pageSize=10&app_id=5d81db99484c0019cab240b3d04e9a4a';
	sendData(api,function(data){
		var arrText = doT.compile(videoindex_newvideo)(data.data[0]);
		$("#newVideo_list").append(arrText);
		if(data.data[0].dataList.length==10){
			$('.load_more').css('display','block')
		}
	})
}
function bindEvents() {
	$('.load_more').on('click', function() {
		if($(this).attr('seemore')=='true'){
			// 页面跳转  视频列表页
			window.location.href='http://v.m.qichedaquan.com/list'
			return;
		}
		if($(this).attr('isload')=='false'){
			return;
		}
		$('.load_more').css('display','none')
		$('.loading').css('display','block')
		getNewVideoData()
		$(this).attr('isload','false');
	});
}

init()
})