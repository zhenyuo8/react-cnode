(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])