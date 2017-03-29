$(function(){
var dot=require('./libs/doT.js');
var navDot = require('./tpl/videolist_video_slide_nav.html');
var onlyList = require('./tpl/videoindex_newvideo.html');
var listDot=require('./tpl/video_list.html');
var api='https://m.api.qichedaquan.com/video/mvideo/videodata?videoType=';
var obj={
	videoType:'',
	pageNo:'1',
	pageSize:'20',
	app_id:'5d81db99484c0019cab240b3d04e9a4a'
}
var hasCon=[];
var tabUrl='https://m.api.qichedaquan.com/video/mvideo/checktab?app_id=5d81db99484c0019cab240b3d04e9a4a'
//请求数据方法jsonp
var sendData=function(url,fn){
	$.ajax({
	            url:url,
	            dataType : "jsonp",
	            success:function (data) {
	            	if(data.code===10000){
	            		console.log(data)
	            		fn(data);
	            	}
	            },
	            error:function () {
	               alert("请求数据失败");
		 scrNotFull()
	            }
        	});
}
//初始化
function init(){
	getInitTabData();
	bindEvents();

}
// 页面初始化，过滤掉没有的类型 ['最新视频','原创视频','广告欣赏','合作媒体','奇葩视频','','官方视频'];
function filter(data){
	var _d={
		data:[],
		type:[]
	};
	var _dd={
		data:[]
	}
	var s=['最新视频','原创视频','广告欣赏','合作媒体','奇葩视频','官方视频'];
	var _data=data.data;
	for(var i=0; i<_data.length;i++){
		if(_data[i].totalRecord>0){
			_dd.data.push(s[i]);
			hasCon.push(i)
		}
	}
	renderNav(_dd);
	// renderList(_d);
}
// 渲染 头部 slide
function renderNav(data){
	var renderNav = dot.compile(navDot)(data);
  	$(".video_slide_nav ").append(renderNav);
	var l=data.data.length;
	if(l>4){
		 swiper1 = new Swiper('.swiper-container1', {
        			slidesPerView: 4.5,
  		 });
	}else if(l==4){
		 swiper1 = new Swiper('.swiper-container1', {
        			slidesPerView: l,
   	 		});
	}else if(l<4){
		 swiper1 = new Swiper('.swiper-container1', {
       		 slidesPerView: l,
    		});
	}
	//渲染内容区域容器
	function renderListWarp(){
		var ele=$('#swiper-container');
		var loadMore=$('<div class="load_box"><p class="load_more" type="" isload="true"><span>加载更多</span><span class="dot-bottom"></span></p><a href="#" class="loading"><img src="http://static.qcdqcdn.com/wap/img/load_icon.png"></a></div>');
		var nav=$('.video_slide_nav').find('li')
		for(var i=0;i<hasCon.length;i++){
			var item=$('<div types='+hasCon[i]+' class="item" noMore="false" currpagenu="0"><ul class="clearfix list"></ul></div >')
			ele.append(item);
			$(nav[i]).attr('type',hasCon[i])
		}
		ele.append(loadMore)
		// 写入内容区数据
		getInitConData()
	}
	renderListWarp()
}
// 渲染单条列表数据
function renderOnlyList(data,type){
	var warp=$('#swiper-container').find('div[types='+type+']');
		$(warp).attr('currpagenu',obj.pageNo);
		var onlyData = dot.compile(onlyList)(data.data[0]);
		 $(warp).find('ul').append(onlyData);
		 scrNotFull()
		if(data.data[0].dataList.length<obj.pageSize && data.data[0].dataList.length>0){
		// 如果回来的数据小于请求的数据（默认20条）,加载更多按钮隐藏
		 $('.load_more').css('display','none');
		 $('.loading').css('display','none');
		 $(warp).attr('nomore','true');
		}else if(data.data[0].dataList.length==obj.pageSize){
			console.log(obj.pageSize)
			// 如果回来的数据等于请求的数据（默认20条），加载更多按钮显示
			$('.loading').css('display','none');
			$('.load_more').css('display','block');
			 $('.load_more').attr('isload','true');
			 $(warp).attr('nomore','false');
		}else if(data.data[0].dataList.length==0 || travelListNum(warp)>=400){
			//如果回来的数据为0 或者 当前容器内大于等于400, 加载更多按钮隐藏
			console.log(obj.pageSize)
			$('.load_more').css('display','none');
			$('.loading').css('display','none');
			$(warp).attr('nomore','true');
		}else if(data.data[0].dataList.length>obj.pageSize){
			console.log(obj.pageSize)
			$('.loading').css('display','none');
			$('.load_more').css('display','block');
			 $('.load_more').attr('isload','true');
			 $(warp).attr('nomore','false');
		}
}
// 页面导航条初始化数据
function getInitTabData(){
	var url=tabUrl;
	sendData(url,function(data){
		filter(data)
	})
}
// 页面内容区初始化数据
function getInitConData(type){
	obj.videoType=hasCon[0];
	var type=type || hasCon[0];
	var url=api+obj.videoType+'&pageNo='+obj.pageNo+'&pageSize='+obj.pageSize+'&app_id='+obj.app_id;
	sendData(url,function(data){
		renderOnlyList(data,type)
	})
}
//遍历 单条列表个数
function travelListNum(ele){
	var l=$(ele).find('li').length;
	return l
}
// 请求单条列表数据
function getOnlyData(type,ele,pageNo){
	obj.videoType=type ? type : '1'
	obj.pageNo=pageNo ? pageNo : '0'
	var url=api+obj.videoType+'&pageNo='+obj.pageNo+'&pageSize='+obj.pageSize+'&app_id='+obj.app_id;
	sendData(url,function(data){
		renderOnlyList(data,type);
	})
}
// 绑定事件
function bindEvents(){
	// 加载更多
	$('body').delegate('.load_more','click',function(){
		var type=$('.video_slide_nav').find('.active').parent('li').attr('type');
		var ele=$('.video_list').find('div[types='+type+']');
		var pageNo=parseInt($(ele).attr('currpagenu'));
				pageNo++;
		if($(this).attr('isload')=='true'){
				$(this).attr('isload','false');
				$('.loading').css('display','block');
				$(this).css('display','none');
				getOnlyData(type,ele,pageNo);
		}
	})

	function slidTo(ele){
		var index=$(ele).index();
		       $(ele).find('span').addClass('active')
		       $(ele).siblings().find('span').removeClass('active');
		       swiper1.slideTo(index, 300, false);
	}
	// 请求其他tab
	function getOtherTabData(type,ele,pageNo){
			obj.videoType=type ? type : '0';
			obj.pageNo=pageNo ? pageNo :'1';
			var url=api+obj.videoType+'&pageNo='+obj.pageNo+'&pageSize='+obj.pageSize+'&app_id='+obj.app_id;
			sendData(url,function(data){
				renderOnlyList(data,type)
			})
	}
	// tab 切换请求数据
	$('.video_slide_nav').delegate('li','click',function(){
		slidTo(this);
		$('.video_list').find('.item').css('display','none');
		var type=$(this).attr('type');
		var ele=$('.video_list').find('div[types='+type+']')
			ele.show();
			if(ele.attr('nomore')=='true'){
				$('.load_more').css('display','none');
				// 没有更多了  直接return
				return
			}else{
				$('.load_more').css('display','block');
				$('.load_more').attr('isload','true');
			}
		var pageNo=parseInt($(ele).attr('currpagenu'));
		if(pageNo==0){// 只请求请求一次数据
			getOtherTabData(type,ele,1)
		}
	})
}
// 页面不足一屏高
function scrNotFull(){
	var pageH=parseInt($('body').height());
	var scrH=parseInt($(window).height());
	if(pageH<scrH){
		var type=$('.video_slide_nav li').find('.active').parent('li').attr('type');
		var ele=$('.video_list').find('div[types='+type+']');
		var hc=(scrH-pageH);
		var h=(ele.height());
		hc+=h;
		ele.css('height',hc)
	}
}

// 页面初始化
init();
})