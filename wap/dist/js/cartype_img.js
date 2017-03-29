(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style cartype_img(车型-图片)
 *@description: 陈璐
 *@date: name (2017.02.25)
*/



$(function(){

    /*tab切换*/
    // 为tab选项卡导航每个选项绑定点击事件
    navBindClick();
	function navBindClick(){
		var $newsTabList = $(".tab_title li");
		$newsTabList.each(function(item){
			$(this).bind("click",function(){
				clickNavItem(this);
			});
		});
	}
    function clickNavItem(currentNav){
        var tabindex = $(currentNav).index();
        var $imgSwipeBox = $("#img_module");
        var windowW = $(window).width();

        $(currentNav).find("a").addClass('current');
        $(currentNav).siblings('li').find("a").removeClass('current');

        $imgSwipeBox.animate({
            'left': -tabindex*windowW+'px'
        },500);

        $imgSwipeBox.height($imgSwipeBox.find(".swiper_box").eq(tabindex).height());
    }

    /* 抽屉效果 */
    function showRight(showBtn,$rightModule){
        showBtn.on("click",function(){
            $(".mask_area").fadeIn();
            $rightModule.animate({right:"0"}, 500);
        })
    }
    showRight($(".choice_type"),$(".right_type_module"));
    showRight($(".choice_color"),$(".right_color_module"));

    var $typeItem = $(".car_type_list li"),
        $colorItem = $(".car_color_list li");

    function hideRight(hideBtn){
        hideBtn.on("click",function(){
            $(".mask_area").fadeOut();
            $(".right_module").animate({right:"-100%"}, 500);
        })
    }
    hideRight($(".mask_area"));
    hideRight($typeItem);
    hideRight($colorItem);
})

},{}]},{},[1])