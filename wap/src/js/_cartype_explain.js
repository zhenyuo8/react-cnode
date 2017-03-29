/*****
 *@author: linyh
 *@from: Global style cartype_explain
 *@description: 陈璐
 *@date: name (2017.02.24)
*/

(function(){

    $("#loadMore").on("click",function(){
        $("#morePage").show();
        $("#catalog").show();
        $(this).hide();
    })

    $("#catalog").on("click",function(){
        if($("#catalog_area").css("display") == "none"){
            $("#catalog_area").show();
            $(".menu_show").hide().siblings('.menu_close').show();
        }else{
            $("#catalog_area").hide();
            $(".menu_close").hide().siblings('.menu_show').show();
        }
    })

    $("#cancle_turn").on("click",function(){
        $("#catalog_area").hide();
    })

})();
