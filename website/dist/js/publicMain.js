(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: 用于各页面的公共引用
 *@date: name (2017.01.16)
*/




$(document).ready(function(){
    $('.imgs_car_type').delegate('li','click',function(){
        if(!$(this).hasClass('no_click')){
            // $(this).addClass('imgs_current').removeClass("no_h");
            // $(this).siblings().removeClass('imgs_current').addClass("no_h");
        }else{
            $(this).find('a').attr('href','javascript:;');
        }
    })
    $('.imgs_car_year').delegate('.imgs_c_y_li','click',function(){
        $(this).addClass('imgs_year_b').siblings().removeClass('imgs_year_b');
    })
    //停售年款下拉列表
    $('.imgs_car_year>li').last().css('border-right','0');
    $('.stop_list>li').last().css('border-bottom','0');
})
},{}]},{},[1])