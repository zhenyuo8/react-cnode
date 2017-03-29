/*****
 *@author: jianingning
 *@from: Global style 公共导航
 *@description: 
 *@date: name (2017.02.27)
*/



$(function(){
    Nav_sh();
    //顶部导航显示隐藏
    function Nav_sh(){
        var show = false;
        $('.nav_btn').on('click',function(event){
            event.stopPropagation();
            if(show){
               $('.nav_mask').fadeOut();
               $('.pubHeadNav').slideUp(); 
               show = false;
            }else{
               $('.nav_mask').fadeIn();
               $('.pubHeadNav').slideDown();
               show = true; 
            }
        });
        //点击其他地方悬浮导航消失
        $(document).on('click',function(event){
            event.stopPropagation();
            $('.nav_mask').fadeOut();
            $('.pubHeadNav').slideUp();
            show = false; 
        });
        //页面滚动时悬浮导航消失
        $(window).scroll(function(){
            $('.nav_mask').fadeOut();
            $('.pubHeadNav').slideUp();
            show = false;
        }); 
    }
})