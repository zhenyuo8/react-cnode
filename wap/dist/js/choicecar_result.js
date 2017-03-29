(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style tab滑动切换
 *@description: 陈璐
 *@date: name (2017.03.05)
*/

/* js中引用：var tabMsg = require('./_mod_scrollTab');
*           tabMsg(box,swiper,title);
*/

    // 滑动切换
    // tab信息(swiper的父元素，每个swiper类名，tab nav id)
    module.exports = function tabMsg(box,swiper,title){
        var tabBox = document.getElementById(box),
            tabSwiper = swiper,
            tabTitleItem = $(title).find("li");
        tabChange(tabBox,tabSwiper,tabTitleItem);
    }

    // tab切换函数(swiper的父元素，每个swiper类名，tab nav li)
    function tabChange(swipeBox,swipeItemClass,tabTitle){
        var startX,startY,offsetX,offsetY,
            Swidth = window.innerWidth;
        var swipeBoxId = "#"+swipeBox.id;

        swipeBox.addEventListener("touchstart",function(e){
            e.stopPropagation();
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        },false);

        swipeBox.addEventListener("touchmove",function(e){
            offsetX = e.touches[0].clientX - startX;
            offsetY = e.touches[0].clientY - startY;
            if(Math.abs(offsetX) > Math.abs(offsetY)){
                e.preventDefault();
            }
        },false);

        swipeBox.addEventListener("touchend",function(e){
            e.stopPropagation();
            var boundary = Swidth/6; //滑动的最小距离
            var currentIndex = $(event.target).parents(swipeItemClass).index();
            var swiperLength = $(swipeItemClass).length;
            var navItemW = tabTitle.width()/2;

            if(offsetX >= boundary) {   //右滑
                if(currentIndex <= 0){
                    return;
                }else{
                    $(swipeBoxId).animate({
                        'left': -(currentIndex-1)*Swidth+'px'
                    },500);

                    $(swipeBoxId).height($(swipeItemClass).eq(currentIndex-1).height());
                    tabTitle.eq(currentIndex-1).find("a").addClass('current')
                            .parents("li").siblings().find("a").removeClass('current');

                    offsetX=0;offsetY=0;
                }
            }else if(offsetX < 0 && offsetX < -boundary) {  //左滑
                if(currentIndex >= swiperLength-1){
                    return;
                }else{
                    $(swipeBoxId).animate({
                        'left': -(currentIndex+1)*Swidth+'px'
                    },500);

                    $(swipeBoxId).height($(swipeItemClass).eq(currentIndex+1).height());
                    tabTitle.eq(currentIndex+1).find("a").addClass('current')
                            .parents("li").siblings().find("a").removeClass('current');

                    offsetX=0;offsetY=0;
                }
            }else {
                return false;
            }
        },false);
    }

},{}],2:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style choicecar_result
 *@description: 陈璐
 *@date: name (2017.02.28)
*/

$(function(){
    var tabMsg = require('./_mod_scrollTab');
    var conditionItem = $(".select_condition_nav ul li"),
        moreItem = $(".car_more_list ul li"),
        moreStyle = $(".more_type_sure");

    showRight(conditionItem);
    showRight(moreItem);
    showRight(moreStyle);

    function showRight(rightBtn){
        rightBtn.on("click",function(){
            var rightModuleName = $(this).data("name");
            var $rightModule = $("#"+rightModuleName);
            if(rightBtn == conditionItem || rightBtn == moreStyle){
                $(".mask_area").fadeIn();
            }
            $rightModule.animate({'right':'0'}, 500,function(){
                isBodyScroll(true);
            });
        })
    }

    $(".mask_area").on("click",function(){
        $(this).fadeOut();
        $(".right_module_odd").animate({
            'right':'-100%'
        }, 500,function(){
            isBodyScroll(false);
        });
        $(".right_module_even").animate({
            'right':'-100%'
        }, 500,function(){
            isBodyScroll(false);
        });
        $("#rightStyle").animate({
            'right':'-100%'
        }, 500,function(){
            isBodyScroll(false);
        });
    })


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
        var $swipeBox = $(currentNav).parents(".tab_title").siblings('.result_module');
        var windowW = $(window).width();

        $(currentNav).find("a").addClass('current');
        $(currentNav).siblings('li').find("a").removeClass('current');

        $swipeBox.animate({
            'left': -tabindex*windowW+'px'
        },500);

        $swipeBox.height($swipeBox.find(".sort_swiper").eq(tabindex).height());
    }

    // 模块tab滑动切换
    tabMsg('resultModule','.sort_swiper',"#resultTabTitle");
})

},{"./_mod_scrollTab":1}]},{},[2])