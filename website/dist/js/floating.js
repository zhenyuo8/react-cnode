(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
 /*****
 *@author: jianingning
 *@from: 用于车型详解页中左侧菜单漂浮
 *@date: name (2017.01.13)
*/
$(document).ready(function(){

	var setLeftNav=function(){
		parseInt()
		var t=parseInt($('.car_m_more_title').offset().top);
		var tt=parseInt($('#floating_menu').offset().top);
		var hh=parseInt($('#floating_menu').height());
		if((t-40-tt)<hh){
			$('#floating_menu').css('top','0px')
		}
	}
	 setLeftNav()
	$(window).scroll(function(){
		var top=$(window).scrollTop();
		var l=$('.car_m_middle_l').offset().left;
		var menu_height=$('.floating_menu').height();
		var h=$('.car_m_middle_news').offset().top;
		var h_height=$('.car_m_middle_news').height();
		var s=h+h_height-menu_height;
		if(top>h){
			if(top>s){
				$('.floating_menu').css({'position':'absolute','top':'81px','left':'-1px'});
			}else{
				$('.floating_menu').css({'position':'fixed','top':'0','left':l+'px'});
			}
		}else{
			$('.floating_menu').css({'position':'absolute','top':'81px','left':'-1px'});
		}
		setLeftNav()
	})
})
},{}]},{},[1])