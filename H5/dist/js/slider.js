(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style 模块首页横向滑动翻页
 *@description: 何在朋
 *@date: name (2017.02.15)
*/



$(function(){
    var canvas=document.getElementById('listWrap_box');
    var width=$('.listWrap').eq(0).width();

    var startX,moveX;

    function touchStart(event){
        event.preventDefault();
        if (! event.touches.length) return;
        var touch = event.touches[0];
        startX=touch.clientX;
    }
    function touchMove(event) {
        event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        moveX = touch.clientX - startX;
        var left=$('#listWrap_box').offset().left;
        
        var index=$(event.target).parents('.listWrap').index();
        if(moveX<-50){
            if(index >=2 ){
                return;
            }else{
                $('#listWrap_box').css({
                    'left':-((index+1)*width)+'px',
                    'transition':'all .5s'
                });
                $('.thumbnail li').eq(index+1).addClass('active');
                $('.thumbnail li').eq(index+1).siblings().removeClass('active');
            }   
        }
        if(moveX>50){
            if(index <=0 ){
                return;
            }else{
                $('#listWrap_box').css({
                    'left': -((index-1)*width)+'px',
                    'transition':'all .5s'
                });
                $('.thumbnail li').eq(index-1).addClass('active');
                $('.thumbnail li').eq(index-1).siblings().removeClass('active');
            }
        }
        
    }
    function touchEnd(event) {
        event.preventDefault();
    }
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
    canvas.addEventListener("touchend", touchEnd, false);

    // $('.hidden').css({
    //     'height':$('#listWrap_box').height()+'px',
    //     'margin-top':'2.827rem'
    // })
    $('.hidden').css('height',$('#listWrap_box').height()+'px')
})
},{}]},{},[1])