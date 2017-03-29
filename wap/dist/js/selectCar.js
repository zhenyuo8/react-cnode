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
/*****
 *@author: jianingning
 *@from: Global style selectCar(购车计算器中选择车款)
 *@description:
 *@date: name (2017.02.27)
*/



var tab= require('./_tab');
$(function(){

    letterFixed();
    //禁止遮罩层下面的内容滑动
    $('.brand_box li').on('click',function(){
        isBodyScroll(true);
    })
    $('.sel_carList li,.mask2').on('click',function(){
        isBodyScroll(false);
    })
    
    //当前车型和按品牌查找切换
    tab('sel_type','sel_content','sel_active','sel_show','click');

    //字母索引位置固定
    function letterFixed(){
        $(window).scroll(function(){
            if($(window).scrollTop() >= ($('.secletCar_head').height()+$('.sel_type').height())){
                $(".letter_list").addClass('letter_list_fix');
            }else{
                $(".letter_list").removeClass('letter_list_fix');
            }
        })
    }

    // 点击字母弹出当前字母
    $(".letter_list ul li").on("touchstart touchend",function(event){
        var letterText = $(this).find("a").text();
        if(event.type == 'touchstart'){
            $(".letter_alert").show();
            $(".letter_alert span").text(letterText);
        }else if(event.type == 'touchend'){
                $(".letter_alert").hide(500);
        }
    })
})

},{"./_tab":1}]},{},[2])