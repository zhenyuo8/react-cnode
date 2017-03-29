(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/3/13.
 */
$(function () {
	// $(".limite").click(function () {
	// 	var txt = $(this).html();
	// 	var newTxt = txt.substr(0,72)+"...";
	// 	$(this).html(newTxt);
	// })

	var content = $(".limite");
	for(var i =0;i<content.length;i++){
		var txt = content[i].innerHTML;
		var newTxt = txt.substr(0,172)+"...";
		content[i].innerHTML=newTxt;
	}
	var content2 = $(".limite2");
	for(var i =0;i<content2.length;i++){
		var txt = content2[i].innerHTML;
		var newTxt = txt.substr(0,172)+"...";
		content2[i].innerHTML=newTxt;
	}
});
},{}]},{},[1])