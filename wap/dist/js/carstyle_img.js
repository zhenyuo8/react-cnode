(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function() {
 //图片页没有图片时显示-高度设置
 
    imgEmpty();
    function imgEmpty(){
      var w_height=$(window).height();
      var h_height=$('.pub_head').height();
      var n_height;

      if($(".carNav").length!=0){
      		n_height=$('.carNav').height()+$('.condition_choice').height();
      }else{
      		n_height=$('.carType_tab').height()+$('.condition_choice').height();
      }
      var f_height=$('.crumbs').height()+$('.video_fte').height()+60;
      var e_height=w_height-h_height-n_height-f_height;
      $('.carstyle_img_empty').css('height',e_height);
    }
});

},{}]},{},[1])