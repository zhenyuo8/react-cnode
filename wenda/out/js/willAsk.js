/**
 * Created by Administrator on 2017/3/8.
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/*****
	 *@author: jianingning
	 *@from: Global js goTop
	 *@date: name (2017.01.25)
	 */




	$(document).ready(function(){
		$(window).scroll(function(){
			if($(window).scrollTop()>500){
				$(".willAsk").show();
			}else{
				$(".willAsk").hide();
			}
		})
		$(".willAsk").click(function(){

		})
	})
},{}]},{},[1])