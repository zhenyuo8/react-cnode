(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style 文字多出内容用省略号代替
 *@description:
 *@date: name (2017.03.18)
*/




$(function(){
	function text(obj,el,num){
		if(obj==''||obj=='undefind'){
			return
		}else{
			$(obj).each(function(){
				var text=$(obj).find(el).text();
				var newText;
				if(text.length>100){
					newText=text.substr(0,num)+'...';
				}else {
					return;
				}
				$(this).find(el).text(newText);
			})
		}
	}
	text('.q_content','.q_text',92);
	text('.a_content','.q_text',94);
	text('.link','p',94);
	text('.profession_brilliant','.limite',150);
	text('.profession_brilliant','h3',50);
	text('.zhj_con_quote','span',92);
})

},{}]},{},[1])