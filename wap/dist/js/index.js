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
 *@from: Global style index(首页)
 *@description: 陈璐
 *@date: name (2017.02.22)
*/


$(function(){

    var tabMsg = require('./_mod_scrollTab');

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
        var $swipeBox = $(currentNav).parents(".tab_title").siblings('.tab_module');
        var $citySwipeBox = $("#city_main");
        var windowW = $(window).width();

        $(currentNav).find("a").addClass('current');
        $(currentNav).siblings('li').find("a").removeClass('current');

        if($(currentNav).parents(".tab_title").hasClass('city_tab_title')){
            $citySwipeBox.animate({
                'left': -tabindex*windowW+'px'
            },500);
        }else{
            $swipeBox.animate({
                'left': -tabindex*windowW+'px'
            },500);
            $swipeBox.height($swipeBox.find(".swiper_box").eq(tabindex).height());
        }
    }

    // 头部tab切换
    tabMsg('sort_module','.sort_swiper_box',"#sortTabTitle");
    // 新闻模块tab切换
    tabMsg('news_content','.news_swiper_box',"#newsTabTitle");
    // 车市模块tab切换
    tabMsg('city_main','.city_swiper_box',"#cityTabTitle");


    /* 抽屉效果*/
    // 城市选择所有弹层隐藏
    function hideCity(){
        $(".mask_area").fadeOut();
        $(".right_module_province").animate({right:"-100%"}, 500);
        $(".right_module_city").animate({right:"-100%"}, 500);
    }
    // 点击首页切换城市出现抽屉
    $("#choice_city").on("click",function(){
        $(".mask_area").fadeIn();
        $(".right_module_province").animate({right:"0"}, 500);
    })
    // 点击省份出现市层
    $("#otherProvince").on("click","dl dd",function(){
        var clickedId = $(this).find("span").attr("id");
        var sIndex = clickedId.indexOf("_"),
            checkId = clickedId.substring(sIndex + 1,clickedId.length);

        $(".right_module_city").animate({right:"0"}, 500,function(){
            var $currentCity = $(".right_module_city ul");
            $currentCity.each(function(index,item){
                var cityId = $(this).attr("id");
                if(cityId == checkId){
                    $(this).show().siblings('ul').hide();
                }
            })
        });
    })
    // 回到省层或选中市回到首页
    $(".right_module_city").on("click","ul li",function(){
        if($(this).hasClass("checked_province")){
            $(".right_module_city").animate({right:"-100%"}, 500);
        }else{
            hideCity();
        }
    })
    // 点击右侧遮罩退出抽屉
    $(".mask_area").on("click",function(){
        hideCity();
    })

    // 换一换
    changeType("loadShow");
    function changeType(btnStatus){
        var $typeList = $(".guess_like_list dl");
        $typeList.each(function(index,item){
            if(btnStatus == "loadShow"){
                index <= 3 ? $(item).show():$(item).hide();
            }else if(btnStatus == "clickShow"){
                $(item).css("display") == "none" ? $(item).show():$(item).hide();
            }
        })
    }
    $("#changeLike").on("click",function(){
        changeType("clickShow");
    })

})

},{"./_mod_scrollTab":1}]},{},[2])