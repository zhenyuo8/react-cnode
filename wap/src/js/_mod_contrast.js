/*****
 *@author: linyh
 *@from: Global style 悬浮对比按钮
 *@description: 陈璐
 *@date: name (2017.02.28)
*/



$(function(){
    $("#contrastBtn,.zsh_cps_duibi").on("click",function(){
    	
        $(".mask_area").fadeIn();
        $(".right_contrast_module").animate({'right': '0'}, 500);
    })

    $(".mask_area").on("click",function(){
        $(this).fadeOut();
        $(".right_contrast_module").animate({'right': '-100%'}, 500);
    })

    $('.goback_btn').click(function(event) {
    	/* Act on the event */
    	$('.choice_car').hide();
    });

})
