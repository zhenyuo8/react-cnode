/**
 * 返回顶部
 */
$(document).ready(function(){
    //回到顶部
    var windowHeight = $(window).height();
    $(window).scroll(function(){
        if($(window).scrollTop()>windowHeight){
            $("#goTop").show();
        }else{
            $("#goTop").hide();
        }
    })
    $("#goTop").on("click",function(){
        $("html,body").animate({scrollTop:0}, 500);
        return false;
    })
});
