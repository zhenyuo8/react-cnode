(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style articleDetail
 *@description: 陈璐
 *@date: name (2017.02.16)
*/

(function(){

    function showClass(classname){
        if($(classname).hasClass('good_after')){
            $(classname).removeClass('good_after');
        }else{
            $(classname).addClass('good_after');
        }
    }

    $("#loadMore").on("click",function(){
        $("#morePage").show();
        $("#catalog").show();
        $(this).hide();
    })

    $("#catalog").on("click",function(){
        $(".mask").show();
        $("#catalog_area").animate({'bottom':'0'},500,function(){
            $("#cancle_turn").show();
        });
    })

    $("#cancle_turn").on("click",function(){
        $(".mask").hide();
        $("#cancle_turn").hide();
        $("#catalog_area").animate({'bottom':'-100%'},500);
    })

    $("#good").on("click",function(){
        showClass(this);
    })

    $("#share").on("click",function(){
        $(".mask").show();
        $(".share_tip").show();
    })

    $("#down_app").on("click",function(){
        $(".mask").show();
        $(".down_app_tip").show();
    })

})();

},{}]},{},[1])