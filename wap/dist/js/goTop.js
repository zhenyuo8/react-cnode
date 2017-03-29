(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])