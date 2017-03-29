/*****
 *@author: linyh
 *@from: Global style wenda_issues(问答-问题库)
 *@description: 陈璐
 *@date: name (2017.03.03)
*/


$(function(){

    // 抽屉效果
    // 品牌、问题
    var brandBtn = $("#choiceType"),
        issuesBtn = $("#buyCar")
        brandRight = $(".right_brand_module"),
        issuesRight = $(".right_issues_module");

    showRight(brandBtn,brandRight);
    showRight(issuesBtn,issuesRight);
    function showRight(checkBtn,moduleRight){
        checkBtn.on("click",function(){
            $(this).addClass('checked').siblings().removeClass('checked');
            $(".mask_area").fadeIn();
            if(checkBtn == brandBtn){
                moduleRight.animate({right:"0"}, 500,function(){
                    $(".letter_list").fadeIn();
                });
            }else if(checkBtn == issuesBtn){
                moduleRight.animate({right:"0"}, 500);
            }
        })
    }

    // 车型
    $(".brand_list").on("click",".brand_box li",function(){
        $(".right_type_module").animate({right:"0"}, 500);
    })

    $(".mask_area").on("click",function(){
        $(this).fadeOut();
        $(".letter_list").fadeOut();
        $(".right_brand_module").animate({right:"-100%"}, 500);
        $(".right_type_module").animate({right:"-100%"}, 500);
        $(".right_issues_module").animate({right:"-100%"}, 500);
    })

    //字母索引位置固定
    letterFixed();
    function letterFixed(){
        var brandlistPosition = $(".letter_list").position().top,
            $letterList = $(".letter_list");
        $(".right_brand_module").scroll(function(){
            if($(".right_brand_module").scrollTop() > brandlistPosition){
                $letterList.addClass('letter_list_fix');
            }else{
                $letterList.removeClass('letter_list_fix');
            }
        })
    }

    // 点击字母弹出当前字母
    $(".letter_list ul li").on("touchstart touchend",function(event){
        var letterText = $(this).find("a").text();
        $(this).find("a").addClass('checked')
        $(this).siblings('li').find("a").removeClass('checked');
        if(event.type == 'touchstart'){
            $(".letter_alert").show();
            $(".letter_alert span").text(letterText);
        }else if(event.type == 'touchend'){
            $(".letter_alert").hide();
        }
    })
})
