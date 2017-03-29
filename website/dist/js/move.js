(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//点击小窗口移动
	var _move=false;//移动标记
	var _x,_y;//鼠标离控件左上角的相对位置
	$(".v-mask").mousedown(function(e){
		_move=true;
		_x=e.pageX-parseInt($("object,#movie_player").css("left"));
        _y=e.pageY-parseInt($("object,#movie_player").css("top"));
        $("object,#movie_player").fadeTo(20);//点击后开始拖动并透明显示
	})
	$(document).mousemove(function(e){
        if(_move){
            var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
            var y=e.pageY-_y;
            $("object,#movie_player").css({top:y,left:x});//控件新位置
            $(".v-mask").css({top:y-35,left:x});
        }
    }).mouseup(function(){
    	_move=false;
    	$("object,#movie_player").fadeTo("fast");//松开鼠标后停止移动并恢复成不透明
  	});
},{}]},{},[1])