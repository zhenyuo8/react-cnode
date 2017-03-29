(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/18.
 */
$(document).ready(function () {
    var checkoutPhone=(function () {
        var regNum=/^1[3|4|5|8][0-9]\d{4,8}$/;
        var regWord=/[A-Za-z\u4E00-\u9FA5]/ig;
        $('.msg_get').on('click',function () {
            var input_phone_num=$('.phone_num input').val();
            if(!(regNum.test(input_phone_num))){
                $('.phone_num').next('.error_code').show()
                return false;
            }else{
                $('.phone_num').next('.error_code').hide()
            }

        })
        $('.phone_num input').on('keyup',function () {
            var input_phone_numW=$('.phone_num input').val();
            if(!input_phone_numW){
                $('.phone_num input').css('border','1px solid #dadada')
            }
            if(input_phone_numW.length>11){
                $('.phone_num input').css('border','1px solid #e43a3a')
            }
            if(regWord.test(input_phone_numW)){
                $('.phone_num input').css('border','1px solid #e43a3a');
                console.log('手机号含有不是数字的字符！')
            }else{
                console.log(123)
            }
        })
    })();
});
},{}]},{},[1])