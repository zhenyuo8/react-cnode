(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingnig
 *@from: Global style floorPrice右侧抽屉
 *@description: 
 *@date: name (2017.02.17)
*/



$(function(){
    var rightMenu = $('.cityDrawer');
    var btn=$('.car_model');
    var left_btn=$('.slider_btn');
    var mask=$('.mask2');
    var lis=$('.carModels_list li');

    showNav(btn, rightMenu, "right");

    function showNav(btn, navDiv, direction) {
        btn.on('click', function () {
            mask.show();
            left_btn.show();
            if (direction == "right") {
                navDiv.css({
                    right: "0",
                    transition: "right 0.6s"
                });
            } 
        });
    }

    mask.on('click',function(){
        hideNav();
    });
    lis.on('click',function(){
        hideNav();
    });

    function hideNav() {
        rightMenu.css({
            right: "-80%",
            transition: "right .3s"
        });
        mask.hide();
        left_btn.hide();
    }
})
},{}]},{},[1])