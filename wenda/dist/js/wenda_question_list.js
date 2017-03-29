(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style tab切换
 *@description: 
 *@date: name (2017.02.23)
*/




module.exports = function (menu,content,clname,show,eve) {
	var eve=eve|| e ;
	var lis=document.getElementById(menu),
			con=document.getElementById(content),
		    jsCon=$(con).find(".js-con");
		if(eve=='click'){
			$(lis).delegate('.js-menu','click',function(){
				var index=$(this).index();
				$(this).addClass(clname).siblings().removeClass(clname);
				$(jsCon).eq(index).addClass(show).siblings().removeClass(show);
			})
		}else if(eve=='mouseover'){
			$(lis).delegate('.js-menu','mouseover',function(){
				var index=$(this).index();
				$(this).addClass(clname).siblings().removeClass(clname);
				$(jsCon).eq(index).addClass(show).siblings().removeClass(show);
			})
		}
}



},{}],2:[function(require,module,exports){
/**
 * Created by Administrator on 2017/3/9.
 */
var tab= require('./_tab');
$(function () {
	//提问，问答切换
	tab('q_choose','new_question','t_active','ul_show','click');
	$(".search_type").on("click","label",function () {
		$(this).attr("class","lab_active").siblings(".lab_active").attr("class","");
	})
})
},{"./_tab":1}]},{},[2])