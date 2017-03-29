(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style article（文章页）
 *@description: 陈璐
 *@date: name (2017.02.20)
*/


$(function(){

    var startX,startY,offsetX,offsetY,
        Swidth = window.innerWidth;
    var swipeBox=document.getElementById('article_swipe');

    swipeBox.addEventListener("touchstart",function(e){
        e.preventDefault();
        startX = e.touches[0].clientX;
    },false);

    swipeBox.addEventListener("touchmove",function(e){
        e.preventDefault();
        offsetX = e.touches[0].clientX - startX;
    },false);

    swipeBox.addEventListener("touchend",function(e){
        var boundary = Swidth/6; //滑动的最小距离
        var currentIndex = $(event.target).parents('.article_box').index();
        if(offsetX >= boundary) {   //右滑
            if(currentIndex <= 0){
                return;
            }else{
                $("#article_swipe").animate({
                    'left': -(currentIndex-1)*Swidth+'px'
                },500);
                $(".article_box").eq(currentIndex-1).find(".turn_page i")
                                 .eq(currentIndex-1).addClass('checked_page')
                                 .siblings().removeClass('checked_page');
            }
        }else if(offsetX < 0 && offsetX < -boundary) {  //左滑
            if(currentIndex >= 2){
                return;
            }else{
                $("#article_swipe").animate({
                    'left': -(currentIndex+1)*Swidth+'px'
                },500);
                $(".article_box").eq(currentIndex+1).find(".turn_page i")
                                 .eq(currentIndex+1).addClass('checked_page')
                                 .siblings().removeClass('checked_page');
            }
        }else {
            return false;
        }
    },false);
})

},{}]},{},[1])