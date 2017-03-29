(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style 悬浮对比按钮
 *@description: 陈璐
 *@date: name (2017.02.28)
*/



$(function(){
    $("#contrastBtn,.zsh_cps_duibi").on("click",function(){
    	
        $(".mask_area").fadeIn();
        $(".right_contrast_module").animate({'right': '0'}, 500);
    })

    $(".mask_area").on("click",function(){
        $(this).fadeOut();
        $(".right_contrast_module").animate({'right': '-100%'}, 500);
    })

    $('.goback_btn').click(function(event) {
    	/* Act on the event */
    	$('.choice_car').hide();
    });

})

},{}]},{},[1])