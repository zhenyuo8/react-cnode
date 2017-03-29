(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingnig
 *@from: Global style 用于询底价中的表单验证
 *@description: 
 *@date: name (2017.02.18)
*/



$(function(){
    function showWarning(obj){
        $(obj).parents('.userNews').find('.warn').addClass('show');
        $(obj).parents('.userNews').find('.arrow_up').addClass('show');
    }
    function hideWarning(obj){
        $(obj).parents('.userNews').find('.warn').removeClass('show');
        $(obj).parents('.userNews').find('.arrow_up').removeClass('show');
    }
    $('.carM_form .f_input').blur(function(){
        if($(this).is('#userName')){ 
            if(this.value==""||this.value.length>6){ 
                showWarning(this);
            }else{
                hideWarning(this);
            }
        }
        if($(this).is('#tel')){ 
            if(this.value==""||(this.value!=""&&!/^0?(13|15|18)[0-9]{9}$/.test(this.value))){ 
                showWarning(this);
            }else{
                hideWarning(this);
            }
        }
        if($(this).is('#yz')){ 
            if(this.value==""){ 
                showWarning(this);
            }else{
                hideWarning(this);
            }
        }
    });
    $(".submit").click(function(){  
        $('.carM_form .f_input').trigger('blur'); 
        var numError = $('.carM_form .warn').length; 
        if(numError){ 
           return false; 
        } 
    }); 
})
},{}]},{},[1])