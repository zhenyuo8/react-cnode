/*****
 *@author: linyh
 *@from: Global style goTop
 *@description: 陈璐
 *@date: name (2017.02.16)
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
