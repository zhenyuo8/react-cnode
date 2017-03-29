(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/16.
 */
$(document).ready(function () {
    //密码输入框，用*代替字符；
    var starReplaceDotted=function (opt) {
        var str;
        var flag=false;
        $(opt).on('keyup',function () {
            str=$(this).val().replace(/\s+/g,'');
            if(str.length>16){
                $(this).css('border-color','#e43a3a')
            }
            var curStr=str.replace(/\w+/g,'*');
            // $(this).val(curStr);


            if(!flag){
                console.log(1213)
                $(this).val(curStr)
            }else {
                $(this).val(str)
            }

        });


        $('.confirm_password .second').on('keyup',function () {
            if($('.input_new_code .first').val()==$('.confirm_password .second').val()){
                $('.error_msg1').hide();
                $('#js_save_settings').css('background','#ffa903')
            }else{
                $('.error_msg1').show();
                $('#js_save_settings').css('background','#dadada')
            }
        });

        $('.input_new_code em').on('click',function () {
            if(!flag){
                $(this).css('background','url("img/show_password_lit.png") no-repeat center');
                $(this).addClass('show').removeClass('hide')
                flag=true;
            }else{
                $(this).addClass('hide').removeClass('show')
                $(this).css('background','url("img/hide_password_lit.png") no-repeat center')
                flag=false;
            }
        });
        $('.confirm_password em').on('click',function () {
            if(!flag){
                $(this).css('background','url("img/show_password_lit.png") no-repeat center');
                $(this).addClass('show').removeClass('hide')
                flag=true;
            }else{
                $(this).addClass('hide').removeClass('show')
                $(this).css('background','url("img/hide_password_lit.png") no-repeat center')
                flag=false;
            }
        });
        $('.input_new_code em').on('mouseover',function () {
            if($(this).hasClass('show')){
                $(this).css('background','url("img/show_password_blue.png") no-repeat center')
            }else if($(this).hasClass('hide')){
                $(this).css('background','url("img/hide_password_lit_hover.png") no-repeat center')
            }
        });

        $('.input_new_code em').on('mouseout',function () {
            if($(this).hasClass('show')){
                $(this).css('background','url("img/show_password_lit.png") no-repeat center')
            }else if($(this).hasClass('hide')){
                $(this).css('background','url("img/hide_password_lit.png") no-repeat center')
            }
        })

        $('.confirm_password em').on('mouseover',function () {
            if($(this).hasClass('show')){
                $(this).css('background','url("img/show_password_blue.png") no-repeat center')
            }else if($(this).hasClass('hide')){
                $(this).css('background','url("img/hide_password_lit_hover.png") no-repeat center')
            }
        });
        $('.confirm_password em').on('mouseout',function () {
            if($(this).hasClass('show')){
                $(this).css('background','url("img/show_password_lit.png") no-repeat center')
            }else if($(this).hasClass('hide')){
                $(this).css('background','url("img/hide_password_lit.png") no-repeat center')
            }
        })

    };
    starReplaceDotted('.form_div_new_code input');
    starReplaceDotted('.input_new_code .first');
    starReplaceDotted('.confirm_password .second');


    // $('.input_new_code em').on('mouseout',function () {
    //     if(flag){
    //         $(this).css('background','url("img/show_password_lit.png") no-repeat center')
    //     }
    // });
    // $('.confirm_password em').on('mouseover',function () {
    //     if(flag){
    //         $(this).css('background','url("img/show_password_blue.png") no-repeat center')
    //     }
    // });
    // $('.confirm_password em').on('mouseover',function () {
    //     if(flag){
    //         $(this).css('background','url("img/show_password_lit.png") no-repeat center')
    //     }
    // })

});
},{}]},{},[1])