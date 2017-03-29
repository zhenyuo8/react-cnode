/*****
 *@author: linyh
 *@from: Global style choiceCar、choiceCarNo（选车页）
 *@description: 陈璐
 *@date: name (2017.02.24)
*/


$(function(){

    // 抽屉效果
    $(".brand_type").on("click",".brand_box ul li",function(){
        $(".mask_area").fadeIn();
        $(".right_type_module").animate({right:"0"}, 500);
    })

    $(".car_type_module").on("click",".type_msg_list dl",function(){
        $(".right_style_module").animate({right:"0"}, 500);
    })
    $(".style_brand").on("click",function(){
        $(".right_style_module").animate({right:"-100%"}, 500);
    })

    $(".mask_area").on("click",function(){
        $(this).fadeOut();
        $(".right_type_module").animate({right:"-100%"}, 500);
        $(".right_style_module").animate({right:"-100%"}, 500);
    })

    //字母索引位置固定
    letterFixed();
    function letterFixed(){
        var brandlistPosition = $(".brand_type").position().top;
        $(window).scroll(function(){
            if($(window).scrollTop() > brandlistPosition - 1){
                $(".letter_list").addClass('letter_list_fix');
            }else{
                $(".letter_list").removeClass('letter_list_fix');
            }
        })
    }

    // 点击字母弹出当前字母
    $(".letter_list ul li").on("touchstart touchend",function(event){
        var letterText = $(this).find("a").text();
        $(this).find("a").addClass('checked');
        $(this).siblings('li').find("a").removeClass('checked');
        if(event.type == 'touchstart'){
            $(".letter_alert").show();
            $(".letter_alert span").text(letterText);
        }else if(event.type == 'touchend'){
            $(".letter_alert").hide();
        }
    })
})
