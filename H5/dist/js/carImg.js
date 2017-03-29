(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: zhangbs
 *@from: Global style choiceCar
 *@description: 何在朋
 *@date: name (2017.02.15)
*/


$(function(){
	//筛选车款筛选颜色列表弹出隐藏
	filterBox(0,'.filter_car');//点击车款
	filterBox(1,'.filter_color');//点击颜色
	
	function filterBox(index,nav){
		$('.nav_list li').eq(index).click(function(){
			$('.nav_list li').removeClass('active');
			$(this).addClass('active');
			$(nav).animate({
		        right: '0'
		    }, 500,function(){
		        $(".mask").find('span').show();
		        $(".mask").show();
		    })
		})
		$(".mask").find('span').click(function(){
		    var that = this;
		    $(nav).animate({
		        right: '-100%'
		    }, 500,function(){
		        $(that).hide();
		        $(".mask").hide();
		    })
		});
	}
	//标签切换
	$('.nav_ul,.filter_ul').find('li').on('touchstart',function(){
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
	})
	imgPageInit();
	function imgPageInit(){
		var i = $('.img_guisepos');
		var h = i.height()/2;
		var l = i.width()/2
		i.css({
			'margin-top':-h,
			'margin-left':-l
		})
	}
})

},{}]},{},[1])