/*****
 *@author: jianingning
 *@from: 用于各页面的公共引用
 *@date: name (2017.01.16)
*/




$(document).ready(function(){
    $('.imgs_car_type').delegate('li','click',function(){
        if(!$(this).hasClass('no_click')){
            $(this).addClass('imgs_current').removeClass("no_h");
            $(this).siblings().removeClass('imgs_current').addClass("no_h");
        }else{
            $(this).find('a').attr('href','javascript:;');
        }
    })
    $('.imgs_car_year').delegate('.imgs_c_y_li','click',function(){
        $(this).addClass('imgs_year_b').siblings().removeClass('imgs_year_b');
    })
    //停售年款下拉列表
    // $('.imgs_no_border').on('mouseover mouseleave',function(event){
    //     if(event.type=='mouseover'){
    //         $('.stop_list').show()
    //         $('.stop_list_w').on('mouseover mouseleave',function(event){
    //             if(event.type=='mouseover'){
    //                 $('.stop_list').show()
    //             }else if(event.type=='mouseleave'){
    //                 $('.stop_list').hide()
    //             }
    //         })
    //     }else if(event.type=='mouseleave'){
    //        $('.stop_list').hide()
    //     }
    // })
    $(".stop_list").delegate('li','click',function(){
        $(this).parent().hide();
    })
})