(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//hover分享显示分享列表
$("#share").on("mouseover mouseleave",function(event){
	if(event.type == 'mouseover'){
		$("#share_area").removeClass('display_n');
		//hover微信分享显示二维码
		$("#share_area").on("mouseover mouseleave",function(event){
			if(event.type == 'mouseover'){
				$("#share_area").removeClass('display_n');
				//hover二维码不隐藏二维码
				$(".share_wx").on("mouseover mouseleave",function(event){
					if(event.type == 'mouseover'){
						$("#ewm").removeClass('display_n');
					}else if(event.type == 'mouseleave'){
						$("#ewm").addClass('display_n');
					}
				});
			}else if(event.type == 'mouseleave'){
				$("#share_area").addClass('display_n');
			}
		})
	}else if(event.type == 'mouseleave'){
		$("#share_area").addClass('display_n');
		$("#ewm").addClass('display_n');
	}
});

},{}]},{},[1])