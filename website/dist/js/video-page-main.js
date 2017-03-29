(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function scroll(){
	$("html,body").animate({scrollTop:$("#js-v-list").offset().top}, 300);
}
function v_position(){
	var key="newtarget=";
    var mylocation=window.location.href;
    var pos=mylocation.indexOf(key);
    var type=mylocation.substr(pos+key.length);
    var li_menu=$("#js-v-list li");
    var li_con=$("#js-new-video-box .js-con");
    if(type=='new_v'){
    	li_menu.eq(0).addClass("blue_text").siblings().removeClass("blue_text");
      	li_con.eq(0).addClass("show").siblings().removeClass("show");
    }
    if(type=='original_v'){
        li_menu.eq(1).addClass("blue_text").siblings().removeClass("blue_text");
      	li_con.eq(1).addClass("show").siblings().removeClass("show");
      	scroll();
    }
    if(type=='advertising_v'){
        li_menu.eq(2).addClass("blue_text").siblings().removeClass("blue_text");
      	li_con.eq(2).addClass("show").siblings().removeClass("show");
      	scroll();
    }
    if(type=='media_v'){
        li_menu.eq(3).addClass("blue_text").siblings().removeClass("blue_text");
      	li_con.eq(3).addClass("show").siblings().removeClass("show");
      	scroll();
    }
    if(type=='qipa_v'){
        li_menu.eq(4).addClass("blue_text").siblings().removeClass("blue_text");
      	li_con.eq(4).addClass("show").siblings().removeClass("show");
      	scroll();
    }
    if(type=='official_v'){
        li_menu.eq(5).addClass("blue_text").siblings().removeClass("blue_text");
      	li_con.eq(5).addClass("show").siblings().removeClass("show");
      	scroll();
    }
}
$(document).ready(function(){


	//banner右侧的列表鼠标滑过状态
	var b_lis=$("#js-play-r");
    b_lis.find(".play-r-sign").hide();
    b_lis.find("li").eq(0).find(".play-r-sign").show();
	b_lis.delegate("li",'mouseover',function(){
		$(this).find(".play-r-sign").show();
		$(this).siblings().find(".play-r-sign").hide();
	})
	//每日推荐及最新视频li的右边距设置
	clearMarginPadding();

	//视频分类鼠标点击后鼠标滑过不允许显示样式
	videoHover();


	//模拟一次点击动作，选中tab .blue_text
	var selectTab  = $(".blue_text").trigger("click");




	//每日推荐及最新视频li的右边距设置
	function clearMarginPadding(){
		$(".pub-list").each(function(){
			$(this).find("li:nth-of-type(3n)").css("margin-right","0");
		})
	}

	//视频分类鼠标点击后鼠标滑过不允许显示样式
	function videoHover(){
		$('.v-list li').on('click',function(){
			$(this).addClass('blue_text').removeClass('v_menu');
			$(this).siblings().addClass('v_menu').removeClass('blue_text');
		})
	}
	//给视频分类添加类名
	$('.v-list').find("li[class!='blue_text']").addClass('v_menu');

	//右侧视频播放排行视频和第一行标题鼠标滑过
	$('#ranking-con-box').delegate(".ranking-play","mouseenter mouseleave",function(event){
		var type = event.type;
		if(type=="mouseenter"){
			$(this).next().find("li:eq(0)").find("a").addClass("a_hover");
			$(this).find(".ranking-play-btn").show();
		}
		if(type=="mouseleave"){
			$(this).next().find("li:eq(0)").find("a").removeClass("a_hover");
			$(this).find(".ranking-play-btn").hide();
		}
	});
	$('#ranking-con-box').delegate(".ranking_f_li","mouseenter mouseleave",function(event){
		var type = event.type;
		if(type=="mouseenter"){
			$(this).parents(".js-con").find(".ranking-play-btn").show();
			$(this).find("a").addClass("a_hover")
		}
		if(type=="mouseleave"){
			$(this).parents(".js-con").find(".ranking-play-btn").hide();
			$(this).find("a").removeClass("a_hover")
		}
	});
	//视频分类锚点定位
	v_position();


	//加载更多
	$(".load-more").each(function(){
		var pageDiv = $(this);
		var totalpage = pageDiv.attr("totalpage");
		if(totalpage > 1){
			$(this).show().click(function(){

				pageDiv.html("正在加载...");
				//获取页签ID
				var tabid = pageDiv.attr("tabindex");
				//当前页
				var pageno = parseInt(pageDiv.attr("pageno"));
				//下一页
				var nextpageno = pageno+1;
				//总页数
				var totalpage = parseInt(pageDiv.attr("totalpage"));
				//ajax请求路径
				var path = "pageNext?pageNo="+nextpageno+"&ext="+tabid;
                //如果是最后一页直接返回false
				if(pageno == totalpage){
					pageDiv.html("没有更多了");
					return false;
				}


				//ajax异步请求数据分页数据
				$.ajax({
					type : 'POST',
					url : path,
					success : function(data) {
						var json = $.parseJSON(data);
						if(json.code == 10000){
							var pageConfig = json.data.pageConfig;
							//分页信息
							pageDiv.attr("pageno",pageConfig.pageNo);
							pageDiv.attr("totalpage",pageConfig.totalPage);



							//数据处理
							var dataList =  json.data.dataList;
							var ul = $("#video_ul_"+tabid);
							$.each(dataList,function(n,obj){
								var li =
									" <li class='fl'>"+
								    "    <a href='#' target='_blank'>" +
									"        <dl class='r-dl po-r'>"+
									"      		 <dt><img src='"+obj.coverpic+"' width='226' height='168'/></dt>"+
									"      		 <dd class='v-small-tit'>"+obj.shortTitle+"</dd>"+
								    "            <dd class='v-time-wrap'></dd>"+
								 	"	         <dd class='v-time'>"+obj.duration+"</dd>"+
									"	         <dt class='r-play-btn'></dt>"+
									"	      </dl>"+
									"	 </a>"+
									"</li>";
								ul.append(li);
								//取出最右列边框
								clearMarginPadding();
							});


							//如果已经是最后一页
							if(parseInt(pageConfig.pageNo) == parseInt(pageConfig.totalPage)){
								pageDiv.css("color","#999").html("没有更多了");
							}else{
								pageDiv.html("加载更多");
							}
						}
					}
				});
			});
		}else{
			//如果只有一页不现实加载更多按钮
			pageDiv.hide().unbind();
		}
	});
})
},{}]},{},[1])