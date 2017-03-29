/*****
 *@author: jianingning
 *@from: Global style selectCar(购车计算器中选择车款)
 *@description:
 *@date: name (2017.02.27)
*/



var tab= require('./_tab');
$(function(){

    letterFixed();
    //禁止遮罩层下面的内容滑动
    $('.brand_box li').on('click',function(){
        isBodyScroll(true);
    })
    $('.sel_carList li,.mask2').on('click',function(){
        isBodyScroll(false);
    })
    
    //当前车型和按品牌查找切换
    tab('sel_type','sel_content','sel_active','sel_show','click');

    //字母索引位置固定
    function letterFixed(){
        $(window).scroll(function(){
            if($(window).scrollTop() >= ($('.secletCar_head').height()+$('.sel_type').height())){
                $(".letter_list").addClass('letter_list_fix');
            }else{
                $(".letter_list").removeClass('letter_list_fix');
            }
        })
    }

    // 点击字母弹出当前字母
    $(".letter_list ul li").on("touchstart touchend",function(event){
        var letterText = $(this).find("a").text();
        if(event.type == 'touchstart'){
            $(".letter_alert").show();
            $(".letter_alert span").text(letterText);
        }else if(event.type == 'touchend'){
                $(".letter_alert").hide(500);
        }
    })
})
