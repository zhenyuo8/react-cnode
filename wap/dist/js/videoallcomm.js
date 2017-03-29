(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
	function init(){
		bindEvents()
	}
	function markShow(fn){
		var fn=fn ||  function(){};
		$('.comm_mark').fadeIn("300",fn());
	}
	function markH(fn){
		var fn=fn ||  function(){};
		$('.comm_mark').fadeOut("300",fn());
	}
	function bindEvents(){
		$('body ').delegate('.reply_btn', 'click', function() {
			markShow(function(){
				$('.comm_form_box ').animate({'bottom':'0px','display':'block'},200)
			})
		});
		$('body .comm_form_box ').delegate('.cancel','click',function(){
			markH(function(){
				$('.comm_form_box ').animate({'bottom':'-100%','display':'none'},200)
			})
		});
		//评论区点赞
		$('.comm_box').delegate('.comm_mum','click',function(){
				$(this).addClass('yi_zan').removeClass('no_zan')
		})

	}
	init()
})
},{}]},{},[1])