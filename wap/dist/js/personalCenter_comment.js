(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
  var tabName=(function(){
    var curName=$('#sortTabTitle li a.current').parent().index()==0?"回复我的":"我回复的";
    console.log(curName)
    $('.small_nav span').text(curName)
  })()

  //没有内容时显示空提示
  $('.message').each(function(){
  	if($(this).find('.same_style').length<=0){
  		$(this).find('.no_content_container').show();
  		$(this).next().hide();
  	}else{
  		$(this).find('.no_content_container').hide();
  		$(this).next().show();
  	}
    $(".tab_module").height($(".sort_swiper_box").eq(0).height());
  })
})

},{}]},{},[1])