/**
 * Created by admin on 2017/1/22.
 */
$(function(){
    //设置对比头车 尾车  左右移动按钮消失;
    (function setFirstLastCar(){
        $('.Js_first_tr td').first().find('.Js_icon_left').css('visibility','hidden');
        $('.Js_first_tr td').last().find('.Js_icon_right').css('visibility','hidden');
        $('.Js_first_tr_clone td').first().find('.Js_icon_left').css('visibility','hidden');
        $('.Js_first_tr_clone td').last().find('.Js_icon_right').css('visibility','hidden');
        $('tr').find('.td').last().css('borderRight','none');
    })();
    (function(){
        var userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1) {
            //return "Safari";
            $('.first_tr').find('th').css('width','198px');
            $('.first_tr').find('td').css('width','198px');
        }
    })();

})