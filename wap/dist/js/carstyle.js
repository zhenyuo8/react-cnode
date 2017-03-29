(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style carstyle_imgs(车款中图片页)
 *@description:
 *@date: name (2017.03.08)
*/



$(function(){

    /* 抽屉效果 */
    function showRight(showBtn,$rightModule){
        showBtn.on("click",function(){
            $(".mask_area").fadeIn();
            isBodyScroll(true);
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
            isBodyScroll(false);
            $(".right_module").animate({right:"-100%"}, 500);
        })
    }
    hideRight($(".mask_area"));
    hideRight($typeItem);
    hideRight($colorItem);

	//图片滑动
	var swiper = new Swiper('.swiper-container', {
        pagination: '',
        paginationClickable: true,
        autoHeight: true,
        onSlideChangeStart: function(swiper){
            var le=$('.swiper-wrapper .img_swiper_box').length;
            var li_index=swiper.activeIndex;
            $('.tab_title_box li').eq(li_index).find('span').addClass('current');
            $('.tab_title_box li').eq(li_index).siblings().find('span').removeClass('current');
            scrCurr(li_index)
        }
    });
    var swiper1 = new Swiper('.swiper-container1', {
        slidesPerView: 4.5,
    });
    $('.tab_title_box li').on('click',function(){
        var index=$(this).index();
        $(this).find('span').addClass('current');
        $(this).siblings().find('span').removeClass('current');
        swiper.slideTo(index, 500, false);
        scrCurr(index)
    });
    function scrCurr(index){
        var currEle=$('.tab_title_box li').eq(index);
        var w=$(window).width();
        var left=$(currEle).offset().left;
        var currEleW=$(currEle).width();
        if((left+currEleW)>w){
                swiper1.slideTo(index, 500, false);
        }else if(left<=0){
                swiper1.slideTo(index, 500, false);
        }
    }

})

},{}]},{},[1])