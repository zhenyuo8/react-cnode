/*****
 *@author: jianingning
 *@from: Global js goTop
 *@date: name (2017.01.25)
*/




$(document).ready(function(){
    $(window).scroll(function(){
        if($(window).scrollTop()>500){
            $(".goTop").show();
        }else{
            $(".goTop").hide();
        }
    })
    $(".goTop").click(function(){
        $("html,body").animate({scrollTop:0}, 500);
    })
})