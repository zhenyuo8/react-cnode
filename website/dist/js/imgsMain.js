(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: 车系中图片页引用  用于设置页面中的各种状态
 *@date: name (2017.01.13)
*/




$(document).ready(function(){
	//年款鼠标滑过
	// $('.imgs_m_year').find("li[class!='imgs_weight']").addClass('imgs_nor');
	// $('.imgs_m_year').delegate('li','click',function(){
	// 	$(this).addClass('imgs_weight').removeClass('imgs_nor');
	// 	$(this).siblings().addClass('imgs_nor').removeClass('imgs_weight');

	// })
	//款式li的样式设置
	$(".imgs_m_uls").each(function(){
		$(this).find("li:nth-of-type(3n)").css("margin-right","0");
	});
	$('.imgs_m_uls').delegate('p','click',function(){
		if($(this).parents().hasClass('other_color')) return;
		$(this).addClass('p_hover').removeClass('p_nor');
		$(this).find('i').css({
			'display':'inline-block'
		});
		var type = $(this).attr("data-type");
		if (type == 'carStyle') {
			var url = Util.replaceParamInUrl("carId",$(this).attr("data-id"));
			url = Util.deleteInPath(url,"wgId");
			url = Util.deleteInPath(url,"nsId");
			window.location.href = url;
		} else if (type == 'wgColor') {
			var url = Util.replaceParamInUrl("wgId",$(this).attr("data-id"));
			url = Util.deleteInPath(url,"carId");
			url = Util.deleteInPath(url,"nsId");
			window.location.href = url;
		} else if (type == 'nsColor') {
			var url = Util.replaceParamInUrl("nsId",$(this).attr("data-id"));
			url = Util.deleteInPath(url,"wgId");
			url = Util.deleteInPath(url,"carId");
			window.location.href = url;
		}
	})
	$('.imgs_m_uls li').delegate('i','click',function(){

		var type = $(this).attr("data-type");
		if (type == 'carStyle') {
			var url = window.location.href;
			url = Util.deleteInPath(url,"carId");
			window.location.href = url;
		} else if (type == 'wgColor') {
			var url = window.location.href;
			url = Util.deleteInPath(url,"wgId");
			window.location.href = url;
		} else if (type == 'nsColor') {
			var url = window.location.href;
			url = Util.deleteInPath(url,"nsId");
			window.location.href = url;
		}
		return false;
	})
	
	$('.imgs_m_uls').delegate('i','click',function(){
		$(this).parent().remove();
	})
	//其他颜色
	$(".other_color").on({
		mouseover:function(){
			$(this).find("ul").show();
		},
		mouseout:function(){
			$(this).find("ul").hide();
		}
	})
	$(".color_menu").delegate("li","click",function(event){
		$(this).parent().hide();
		event.stopPropagation();
	})
	//图片展示的样式设置
	$(".picture-show-list_content").each(function(){
		$(this).find("li:nth-of-type(4n)").css("margin-right","0");
	})
	$('.imgs_m_year li').on('click',function(){
		$(this).addClass('imgs_weight').siblings().removeClass('imgs_weight');
		var url = Util.replaceParamInUrl("carYear",$(this).attr("data-carYear"));
		url = Util.deleteInPath(url,"carId");
		url = Util.deleteInPath(url,"wgId");
		url = Util.deleteInPath(url,"nsId");
		window.location.href = url;
	});

	$('.imgs_car_year').delegate('.imgs_c_y_li','click',function(){
		$(this).addClass('imgs_year_b').siblings().removeClass('imgs_year_b');
		var url = Util.replaceParamInUrl("carYear",$(this).attr("data-carYear"));
		url = Util.deleteInPath(url,"carId");
		url = Util.deleteInPath(url,"wgId");
		url = Util.deleteInPath(url,"nsId");
		window.location.href = url;
	});
	//图片展示的tab切换
	$('.picture-show-nav').delegate('.imgs_type','click',function(){
		// 点击除去全部的其他分类
		var index=$(this).index();
		$(this).addClass('p_type_weight').removeClass("p_type_h");
		$(this).siblings().removeClass('p_type_weight').addClass("p_type_h");
		$('.picture-show-list_content').eq(index-1).show().siblings().hide();
		var categoryId = $(this).attr("data-categoryId");
		var categoryType = $(this).attr("data-categoryType");
		var newUrl = Util.replaceParamInUrl("categoryType",categoryType);
		newUrl = Util.replaceParamInPath(newUrl,"categoryId",categoryId);

		newUrl = Util.deleteInPath(newUrl,"pageNow");
		newUrl = Util.deleteInPath(newUrl,"pageSize");
		window.location.href = newUrl;
	})
	$('.imgs_all_type').click(function(){ // 点击全部
		$('.picture-show-list_content').show();
		$(this).addClass('p_type_weight').removeClass("p_type_h");
		$(this).siblings().removeClass('p_type_weight').addClass("p_type_h");
		var categoryId = $(this).attr("data-categoryId");
		var categoryType = $(this).attr("data-categoryType");
		var oldUrl = window.location.href;
		oldUrl = Util.deleteInPath(oldUrl,"categoryId");
		oldUrl = Util.deleteInPath(oldUrl,"categoryType");
		oldUrl = Util.deleteInPath(oldUrl,"pageNow");
		oldUrl = Util.deleteInPath(oldUrl,"pageSize");
		window.location.href = oldUrl;
	})
})
},{}]},{},[1])