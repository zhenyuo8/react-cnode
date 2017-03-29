(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
	var li_height=$('.current').height();
	$('.invite_expert_ul').css('height',li_height);
	var swiper = new Swiper('.swiper-container', {
        pagination: '',
        slidesPerView: 3,
        loop : true,
		nextButton: '.swiper-button-prev',
		prevButton: '.swiper-button-next',
        spaceBetween: 30,
        slideToClickedSlide: true,
        onSlideChangeStart: function(swiper){
            var li_index=swiper.activeIndex;

            var li_title=$('.swiper-slide').eq(li_index+1).find('.sc-content').find('span').text();

            var li_con=$('.swiper-slide').eq(li_index+1).find('.sc-content').find('p').text();

            $('.expert_news_text1').text(li_title);
            $('.expert_news_text2').text(li_con);

	        $('.swiper-slide').eq(li_index+1).addClass('current').removeClass('normal');
	        $('.swiper-slide').eq(li_index+1).siblings().removeClass('current').addClass('normal');
        }
    });
})
},{}]},{},[1])