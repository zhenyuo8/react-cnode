/*****
 *@author: linyh
 *@from:newcar/newCarFilter/shoppingGuide/shoppingGuideFilter/evaluatingGuide/evaluatingGuideFilter
 *@description: 何在朋
 *@date: name (2017.01.09)
*/

$(function(){

	//公共头导航样式
	$(".total_Nav_Content li").click(function(){
        $(".total_Nav_Content li").eq($(this).index()).addClass("bg").siblings().removeClass("bg");
    });

	//自定义滚动条样式
	$(".show-scroll-bar").mCustomScrollbar({
		scrollButtons:{ scrollSpeed:50 }
	});

	//获取数据函数 (静态模拟)
	function getData(tabIndex,url){
		var jsonData = "";
		if(url.indexOf("newCar_news") != -1){
			jsonData = newCar_news;
			newsContent(tabIndex,jsonData,"newCar_news");
		}
		else if(url.indexOf("shoppingGuide_news") != -1){
			jsonData = shoppingGuide_news;
			newsContent(tabIndex,jsonData,"shoppingGuide_news");
		}
		else if(url.indexOf("evaluating_news") != -1){
			jsonData = evaluating_news;
			newsContent(tabIndex,jsonData,"evaluating_news");
		}
		// else if(url.indexOf("total_news") != -1){
		// 	jsonData = total_news;
		// 	totalContent(jsonData);
		// }
	}

	//获取数据函数
	/*function getData(tabIndex,url){
		$.getJSON(url,function(jsonData){
			if(url.indexOf("searchlist") != -1){
				brandData(tabIndex,jsonData);
			}else if(url.indexOf("news") != -1){
				newsContent(tabIndex,jsonData);
			}
		})
	}*/


	// 搜索相关信息展示模块数据渲染
	// // tab选项卡导航点击事件函数
	function clickNavItem(currentNav){
		var currentIndex = $(currentNav).index();
		var currentPage = $(currentNav).parent("ul");

		//tab选项卡切换及nav样式
		$(currentNav).addClass('news-tab-hover').siblings('li').removeClass("news-tab-hover");
		$(".news-module-main").find(".news-module-left-area").find(".news-module-change").eq(currentIndex).css("display","block").siblings().css("display","none");

		//获取新闻模块数据
		if(currentPage.hasClass('newCar')){
			getData(currentIndex,"newCar_news");
		}else if(currentPage.hasClass('shopping-guide')){
			getData(currentIndex,"shoppingGuide_news");
		}else if(currentPage.hasClass('evaluating')){
			getData(currentIndex,"evaluating_news");
		}

	}

	//新闻模块数据处理函数
	function newsContent(currentNavIndex,newsData,currentPage){
		var $newsList = $('<div class="news-content-list"></div>');
		var $loadTips = $('<div class="news-load-tips"><p><span class="news-load-more">加载更多</span>'+
						'<span class="news-load-now">正在加载...</span><span class="news-no-more">没有更多了'+
						'</span></p></div>');
		$('.news-module-change').html('');

		var jsonContent =  newsData[currentNavIndex].newsContent;
		var firstData = jsonContent.length<10 ? jsonContent.length : 10;
		for(var j=0;j<=firstData-1;j++){
			var $newCar = "";
			if(currentPage != "newCar_news"){
				$newCar = $('<div class="news-content"><dl><dt><img src="'+jsonContent[j].newsImg+'"></dt><dd><h1>'+jsonContent[j].newsTitle+'</h1>'+
				'<p class="news-text">'+jsonContent[j].newsText+'</p><div class="reading-messages">'+
				'<div class="reading-messages-tag"><span><a href="javascript:void(0);">宝马一系</a></span><span>'+
				'<a href="javascript:void(0);">SUV</a></span><span><a href="javascript:void(0);">新车'+
				'盘点</a></span></div><div class="reading-messages-data"><span>2017年12月7日</span></div></div></dd></dl>'+
				'</div>');
			}else{
				$newCar = $('<div class="news-content"><dl><dt><img src="'+jsonContent[j].newsImg+'"></dt><dd><h1>'+jsonContent[j].newsTitle+'</h1><p class="news-text">'+jsonContent[j].newsText+'</p><p class="reading-messages"><i>'+jsonContent[j].newsTime+'分钟前</i></p></dd></dl>'+
				'</div>');
			}

			$newCar.appendTo($newsList);
		}

		//不同模块数据渲染到对应模块
		if(newsData[currentNavIndex].navName == "zixun"){
			$newsList.appendTo($('.latest-news'));
			$loadTips.appendTo($('.latest-news'));
		}
		if(newsData[currentNavIndex].navName == "xiaoxi"){
			$newsList.appendTo($('.new-cars-message'));
			$loadTips.appendTo($('.new-cars-message'));
		}
		if(newsData[currentNavIndex].navName == "fabu"){
			$newsList.appendTo($('.marketing-news'));
			$loadTips.appendTo($('.marketing-news'));
		}
		if(newsData[currentNavIndex].navName == "diezhao"){
			$newsList.appendTo($('.new-cars-picture'));
			$loadTips.appendTo($('.new-cars-picture'));
		}
		//导购页
		//不同模块数据渲染到对应模块
		if(newsData[currentNavIndex].navName == "daogou"){
			$newsList.appendTo($('.latest-shopping-guide'));
			$loadTips.appendTo($('.latest-shopping-guide'));
		}
		if(newsData[currentNavIndex].navName == "jiexi"){
			$newsList.appendTo($('.odd-cars-jiexi'));
			$loadTips.appendTo($('.odd-cars-jiexi'));
		}
		if(newsData[currentNavIndex].navName == "xiangdui"){
			$newsList.appendTo($('.guide-zfxd'));
			$loadTips.appendTo($('.guide-zfxd'));
		}
		if(newsData[currentNavIndex].navName == "haixuan"){
			$newsList.appendTo($('.guide-type-choice'));
			$loadTips.appendTo($('.guide-type-choice'));
		}
		//评测页
		//不同模块数据渲染到对应模块
		if(newsData[currentNavIndex].navName == "pingce"){
			$newsList.appendTo($('.latest-evaluating'));
			$loadTips.appendTo($('.latest-evaluating'));
		}
		if(newsData[currentNavIndex].navName == "danche"){
			$newsList.appendTo($('.odd-cars-evaluating'));
			$loadTips.appendTo($('.odd-cars-evaluating'));
		}
		if(newsData[currentNavIndex].navName == "duibi"){
			$newsList.appendTo($('.contrast-evaluating'));
			$loadTips.appendTo($('.contrast-evaluating'));
		}
		if(newsData[currentNavIndex].navName == "daren"){
			$newsList.appendTo($('.dr-evaluating'));
			$loadTips.appendTo($('.dr-evaluating'));
		}
		if(newsData[currentNavIndex].navName == "changqi"){
			$newsList.appendTo($('.longtime-evaluating'));
			$loadTips.appendTo($('.longtime-evaluating'));
		}
		if(newsData[currentNavIndex].navName == "zhuanxiang"){
			$newsList.appendTo($('.zx-evaluating'));
			$loadTips.appendTo($('.zx-evaluating'));
		}
		if(newsData[currentNavIndex].navName == "saishi"){
			$newsList.appendTo($('.competition-train'));
			$loadTips.appendTo($('.competition-train'));
		}
		//控制‘加载更多、正在加载、没有更多’交替显示
		if(jsonContent.length <= 10){
			$(".news-no-more").css("display","block");
			$(".news-load-now").css("display","none");
			$(".news-load-more").css("display","none");
		}else{
			$(".news-load-more").css("display","block");
			$(".news-load-now").css("display","none");
			$(".news-no-more").css("display","none");
		}

		//点击加载更多
		var clickTime = 0;
		$(".news-load-more").on("click",function(){
			clickTime++;
			$(".news-load-now").css("display","block");
			$(".news-load-more").css("display","none");
			$(".news-no-more").css("display","none");
			for(var m=clickTime*10;m<=clickTime*10+9;m++){
				if(currentPage != "newCar_news"){
					$('<div class="news-content"><dl><dt><img src="'+jsonContent[m].newsImg+'"></dt><dd><h1>'+jsonContent[m].newsTitle+'</h1>'+
					'<p class="news-text">'+jsonContent[m].newsText+'</p><div class="reading-messages">'+
					'<div class="reading-messages-tag"><span><a href="javascript:void(0);">宝马一系</a></span><span>'+
					'<a href="javascript:void(0);">SUV</a></span><span><a href="javascript:void(0);">新车'+
					'盘点</a></span></div><div class="reading-messages-data"><span>2017年12月7日</span></div></div></dd></dl>'+
					'</div>').appendTo($newsList);
				}else{
					$('<div class="news-content"><dl><dt><img src="'+jsonContent[m].newsImg+'"></dt><dd><h1>'+jsonContent[m].newsTitle+'</h1><p class="news-text">'+jsonContent[m].newsText+'</p><p class="reading-messages"><i>'+jsonContent[m].newsTime+'分钟前</i></p></dd></dl>'+
					'</div>').appendTo($newsList);
				}

				if(m >= jsonContent.length-1) {
					$(".news-no-more").css("display", "block");
					$(".news-load-now").css("display", "none");
					$(".news-load-more").css("display", "none");
					return;
				}
			}
			$(".news-load-more").css("display","block");
			$(".news-load-now").css("display","none");
			$(".news-no-more").css("display","none");
		})
	}

	// 为tab选项卡导航每个选项绑定点击事件
	function navBindClick(){
		var $newsTabList = $(".news-tab-change-title li");
		$newsTabList.each(function(item){
			$(this).bind("click",function(){
				clickNavItem(this);
			});
		});
		$newsTabList.eq(0).trigger("click");
	}
	navBindClick();




//新车筛选、导购及筛选、评测及筛选页数据渲染
/*	getData(null,"total_news");
	function totalContent(totalData){
		var $loadTips = $('<div class="news-load-tips"><p><span class="news-load-more">加载更多</span>'+
						'<span class="news-load-now">正在加载...</span><span class="news-no-more">没有更多了'+
						'</span></p></div>');
		for(var n=0;n<=totalData.length-1;n++){
			var moduleData = totalData[n].newsContent;
			var $s_html = '';
			var $e_html = '';
			var $nc_html = '';
			var $newsList = $('<div class="news-content-list"></div>');
			var firstData = moduleData.length<10 ? moduleData.length : 10;
			for(var i=0;i<=firstData-1;i++){
				if(totalData[n].navName == "newCar_filter"){
					$('<div class="news-content"><dl><dt><img src="'+moduleData[i].newsImg+'"></dt><dd><h1>'+moduleData[i].newsTitle+'</h1><p class="news-text">'+
					'<span><a href="javascript:void(0)">[新车图解]</a></span>'+moduleData[i].newsText+'</p><p class="reading-messages"><i>'+moduleData[i].newsTime+'分钟前</i></p></dd></dl>'+
					'</div>').appendTo($newsList);
					$nc_html = $newsList;
				}else if(totalData[n].navName == "shoppingGuide_filter"){
					$('<div class="news-content"><dl><dt><img src="'+moduleData[i].newsImg+'"></dt><dd><h1>'+moduleData[i].newsTitle+'</h1>'+
					'<p class="news-text">'+moduleData[i].newsText+'</p><div class="reading-messages">'+
					'<div class="reading-messages-tag"><span><a href="javascript:void(0);">宝马一系</a></span><span>'+
					'<a href="javascript:void(0);">SUV</a></span><span><a href="javascript:void(0);">新车'+
					'盘点</a></span></div><div class="reading-messages-data"><span>2017年12月7日</span></div></div></dd></dl>'+
					'</div>').appendTo($newsList);
					$s_html = $newsList;
				}else{
					$('<div class="news-content"><dl><dt><img src="'+moduleData[i].newsImg+'"></dt><dd><h1>'+moduleData[i].newsTitle+'</h1>'+
					'<p class="news-text">'+moduleData[i].newsText+'</p><div class="reading-messages">'+
					'<div class="reading-messages-tag"><span><a href="javascript:void(0);">宝马一系</a></span><span>'+
					'<a href="javascript:void(0);">SUV</a></span><span><a href="javascript:void(0);">新车'+
					'盘点</a></span></div><div class="reading-messages-data"><span>2017年12月7日</span></div></div></dd></dl>'+
					'</div>').appendTo($newsList);
					$e_html = $newsList;
				}
			}
				$($s_html).appendTo($('.shopping-guide-page'));
				$loadTips.appendTo($('.shopping-guide-page'));
				$($e_html).appendTo($('.evaluating-page'));
				$loadTips.appendTo($('.evaluating-page'));
				$($nc_html).appendTo($('.news-car-page'));
				$loadTips.appendTo($('.news-car-page'));
		}
	}*/
})
