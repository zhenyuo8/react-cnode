(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style 文字多出内容用省略号代替
 *@description:
 *@date: name (2017.03.18)
*/




$(function(){
	function text(obj,el,num,type){
		console.log(obj);
		if(obj==''||obj=='undefind'){
			return;
		}else{
			$(obj).each(function(){
				var text=$(obj).find(el).text();
				var newText;
				console.log(text.length);
				if(text.length>100){
					if(type == 1){
						newText=text.substr(0,num)+'...';
					}else if(type == 2){
						newText=text.substr(0,num)+'...”';
					}
					console.log(newText);
				}else {
					return;
					console.log(newText);
				}
				console.log(newText);
				$(this).find(el).text(newText);
			})
		}
	}
	text('.com_hide_box','.com_hide',98,2);
})

},{}]},{},[1])