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
