(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from:二级下拉菜单逻辑
 *@description: 何在朋
 *@date: name (2017.01.09)
*/



$(function(){
    //获取数据函数 (静态模拟)
    function getDatas(tabIndex,url){
        var jsonData = "";
        if(url.indexOf("searchlist") != -1){
            jsonData = searchlist;
            brandData(tabIndex,jsonData);
        }
    }

    //品牌车型下拉框数据联动
	//显示品牌下拉框并获取数据
	function showbrandSelect(){
		getDatas(null,"searchlist");
	}

	//品牌数据处理函数
	function brandData(nullIndex,brandData){
		$("#mCSB_1_container").html('');
		for(var i=0;i<=brandData.length-1;i++){
			var brandListData = brandData[i].brandList;
			var $brandList = $("<ul></ul>");
			for(var j=0;j<=brandListData.length-1;j++){
				$('<li><a href="javascript:void(0);">'+brandData[i].letterId+'<span>'+brandListData[j].brandName+'</span>'+
				  '</a></li>').appendTo($brandList);
			}
			$brandList.appendTo($("#mCSB_1_container"));
		}
		//选中下拉滚动列表中的值
		//选择品牌绑定点击事件
		$(".brand-scroll-list ul li").each(function(item){
			$(this).bind("click",function(event){
				event.stopPropagation();
				$(".brand-scroll-list-box").addClass('display-none');
				clickBrand(brandData,this);
			});
		});
	}

	//下拉品牌点击事件函数
	function clickBrand(brandData,currentBrand){
		var selectedBrand = $(currentBrand).find("a").find("span").text();
		$(".choice-brand-input").find('span').text(selectedBrand);
		$(".choice-car-type-input").find('span').text("选择车型(可不选)").css("color","#333");
		$(".choice-car-type-input").addClass('dis_hover');
		$(".search-submit-btn a").css("display","block");
		$(".search-submit-btn span").css("display","none");
		for(var i=0;i<=brandData.length-1;i++){
			var brandListData = brandData[i].brandList;
			for(var j=0;j<=brandListData.length-1;j++){
				if(selectedBrand == brandListData[j].brandName){
					var typeListData = brandListData[j].typeList;
					var $carTypeScroll = $("<dl></dl>");
					for(var m=0;m<=typeListData.length-1;m++){
						var classifyListData = typeListData[m].classifyList;
						$('<dt>'+typeListData[m].typeClassify+'</dt>').appendTo($carTypeScroll);
						for(var n=0;n<=classifyListData.length-1;n++){
							$('<dd><a href="javascript:void(0);">'+classifyListData[n].classifyName+'</a>'+
							  '</dd>').appendTo($carTypeScroll);
						}
					}
					$('#mCSB_2_container').html($carTypeScroll);
				}
			}
		}
		//选择车型
		$(".car-type-scroll-list dl dd").on("click",function(){
			var selectedType = $(this).find("a").text();
			$(".choice-car-type-input").find('span').text(selectedType).css("color","#333");
		})
	}


	//显示下拉滚动搜索列表
	//点击品牌input框显示品牌列表
	$(".choice-brand-input").on("click",function(event){
		event.stopPropagation();
		//请求接口获取数据
		showbrandSelect();
		//控制品牌下拉框显示及隐藏、input框状态变化
		if($(".brand-scroll-list-box").hasClass('display-none')){
			$(".brand-scroll-list-box").removeClass('display-none');
			$(".car-type-scroll-list").addClass('display-none');
			$(this).addClass('color-input-border').find("em").addClass('search-input-hover');
		}else{
			$(".brand-scroll-list-box").addClass('display-none');
			$(this).removeClass('color-input-border').find("em").removeClass('search-input-hover');
		}
	})
	//显示下拉滚动车型列表
	$(".choice-car-type-input").on("click",function(event){
		event.stopPropagation();
		//控制品牌下拉框显示及隐藏、input框状态变化
		if($(".choice-brand-input span").text() != "请选择品牌"){
			if($(".car-type-scroll-list").hasClass('display-none')){
				$(".car-type-scroll-list").removeClass('display-none');
				$(this).addClass('color-input-border').find("em").addClass('search-input-hover');
			}else{
				$(".car-type-scroll-list").addClass('display-none');
				$(this).removeClass('color-input-border').find("em").removeClass('search-input-hover');
			}
		}
	})
	$(".brand-scroll-list-box").on('click',function(event) {
		event.stopPropagation();
		/* Act on the event */
	});
	
	//点击任何地方隐藏下拉滚动搜索列表
	$(document).on("click",function(){
		$(".brand-scroll-list-box").addClass('display-none');
		$(".choice-brand-input").removeClass('color-input-border').find("em").removeClass('search-input-hover');
		$(".car-type-scroll-list").addClass('display-none');
		$(".choice-car-type-input").removeClass('color-input-border').find("em").removeClass('search-input-hover');
	})

	//品牌下拉滚动搜索列表字母索引
	$(".brand-letter-index span").on("click",function(event){
		event.stopPropagation();
		var letterIndex = $(this).index(),
			brandOffsetTop = $(".brand-scroll-list ul").eq(letterIndex).position().top,
			brandScrollTop = $(".brand-scroll-list").scrollTop();
		var	brandScrollHeight = brandOffsetTop+brandScrollTop;
		$(".brand-scroll-list").mCustomScrollbar("scrollTo",brandScrollHeight);
		$(this).find("a").css("color","#398be4").parent().siblings().find('a').css("color","#333");
	})
})

},{}]},{},[1])