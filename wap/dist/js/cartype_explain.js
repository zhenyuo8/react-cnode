(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])