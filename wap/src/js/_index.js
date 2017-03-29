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
