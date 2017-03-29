(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])