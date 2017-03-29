/*****
 *@author: linyh
 *@from: Global style cartype_config(车型配置页)
 *@description: 陈璐
 *@date: name (2017.02.28)
*/



$(function(){
    $("#catalog").on("click",function(){
        if($(".param_catalog_list").css("display") == "none"){
            $(".param_catalog_list").show();
            $(this).find(".menu_show").hide().siblings('.menu_close').show();
        }else{
            $(".param_catalog_list").hide();
            $(this).find(".menu_close").hide().siblings('.menu_show').show();
        }
    })
})
