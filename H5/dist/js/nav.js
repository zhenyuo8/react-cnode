(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style 公共的头部导航
 *@description: 
 *@date: name (2017.02.17)
*/



$(function(){
    $('.nav,.price_nav').on('click',function(){
        $('.mask,.up,.price_up').show();
        $('.nav_menu').slideDown(300);
        $(this).hide();
    });
    $('.up,.price_up').on('click',function(){
        $(this).hide();
        $('.mask').hide();
        $('.nav_menu').slideUp(300);
        $('.nav,.price_nav').show();
    })
})
},{}]},{},[1])