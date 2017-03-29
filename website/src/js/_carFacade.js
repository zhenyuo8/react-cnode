/**
 * Created by Administrator on 2017/2/28.
 */
$(document).ready(function () {
    var selectBtn=(function () {
        $('.car-type li').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if(tar.tagName=='SPAN'){
                $(tar).css('background','#3a8be4');
                $(tar).next('i').addClass('select_on').removeClass('default');
                $(this).siblings().children('span').css('background','#fff')
                $(this).siblings().children('i').addClass('default').removeClass('select_on')
            }else if(tar.tagName=='I'){
                $(tar).addClass('default').removeClass('select_on');
                $(tar).prev('span').css('background','#fff');
                $(this).siblings().children('span').css('background','#fff')
                $(this).siblings().children('i').addClass('default').removeClass('select_on')
            }
        })
    })()
})