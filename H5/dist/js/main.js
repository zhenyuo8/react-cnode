(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingnig
 *@from: Global style 用于各页面中的js效果
 *@description: 
 *@date: name (2017.02.17)
*/



$(function(){
    Select();

    function Select(){
        var num=parseInt($('.select_prompt span').text());
        $('.yz_code').on('click',function(){
            $(this).css('background','#f3f3f3').text('10s后重发');
        });
        $('.dealer_list').delegate('.checkbox','click',function(){
            if($(this).hasClass('checkbox_selet')){
                $(this).removeClass('checkbox_selet');
                num--;
                $('.select_prompt span').text(num)
            }else{
                $(this).addClass('checkbox_selet');
                num++;
                $('.select_prompt span').text(num)
            }
            
        })
    }
})
},{}]},{},[1])