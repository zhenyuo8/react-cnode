(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/20.
 */
$(document).ready(function () {
    var timer;
    $('#next_step_first input').on('click',function () {
        $('.input_handle').hide();
        $('.step_list .step_second').addClass('cur_step')
        $('.identify_msg').show();
        var n=5;
        clearInterval(timer);
        timer=setInterval(function () {
            if(n>0){
                n--;
                $('.input_msg .button').val('('+n+'S'+')'+'后跳转到登录页面')
            }else{
                clearInterval(timer)
                $('.input_msg .button').val('免费获取校验码');
                // window.location='login.html'
            }
        },1000)
    });

    //输入手机号，如果手机号未注册，提示错误
    $('#first_step_find').on('blur',function () {
        if($(this).val()!=='15083582113'){
            $('.error_code').show();
        }else{
            $('.error_code').hide();
        }
    })
    
    $('.identify_phone .next_step input').on('click',function () {
        clearInterval(timer)
        $('.identify_phone').hide();
        $('.step_list .step_third').addClass('cur_step')
        $('.reset_password').show();
    });

    //输入新密码

    $('.reset_done input').on('click',function () {
        $('.identify_msg').hide();
        $('.step_list .step_four').addClass('cur_step');
        $('.step_list .step_four b').removeClass('default').addClass('suc');

        $('.register_suc').show()
    })
//输入 手机号删除按钮显示
    $('.input_handle .phone_num input').on('keyup',function () {
        var phoneNum=$(this).val();
        if(phoneNum){
            $('.input_handle .phone_num em').css('display','inline-block')
        }else{
            $('.input_handle .phone_num em').css('display','none')
        }
    })



    var findPassword=(function () {
        var n=30;

        $('#find_voice').on('click',function () {
            $('.wait_call').show();
            $('.send_voice').hide();
            $('.timer_span').text(n+'S')
            clearInterval(timer);
            var timer=setInterval(function () {
                if(n>0){
                    n--;
                    $('.timer_span').text(n+'S')
                }else{
                    // $('.msg_get').css('background','#3a8be4')
                }
            },1000)

        });
        function sendCode(mobile) {
            alert('进入了短信JS');
            $.ajax({
                url:"/user/sendCode",
                type:"POST",
                data:{"mobile":mobile},
                dataType:"json",
                success:function (data) {
                    if(data.errorCode!=10000){
                        $("#login-msg").html('<i></i>'+data.resultMsg+'！');
                        $("#login-msg").parent().show();
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alert("请求异常");
                }
            });
        }


        $('.msg_get').on('click',function () {
            var n=60;
            $('.msg_get').val(n+'秒后重新获取');
            $('.msg_get').css('background','#dadada')
            clearInterval(timer);
            sendCode(15233639789);
            var timer=setInterval(function () {
                if(n>0){
                    n--;
                    $('.msg_get').val(n+'秒后重新获取')
                    $('.msg_get').css('background','#dadada')
                }else{
                    clearInterval(timer)
                    $('.msg_get').val('获取动态密码')
                    $('.msg_get').css('background','#3a8be4')
                }
            },1000)
        });

        $('#first_step_find').on('focus',function () {
            $(this).css('border','1px solid #3a8be4')
        })

        $('.input_msg em').on('click',function () {

        })
        $("#js_account_pas").next('em').on('click',function () {
            console.log(123)
            if($(this).hasClass('hide')){
                console.log(123)
                $("#js_account_pas").next('em').css('background','url("img/show_password.png") no-repeat center')
                $("#js_account_pas").next('em').addClass('show').removeClass('hide');
            }
            if($(this).hasClass('show')){
                $(this).css('background','url("../img/hide_password_lit.png") no-repeat center')
                $(this).addClass('hide').removeClass('show');
            }

        });
        $("#js_account_pas").next('em').on('mouseover',function () {
            if($(this).hasClass('show')){
                $(this).css('background','url("../img/show_password_blue.png") no-repeat center')
            }
        })
        $("#js_account_pas").next('em').on('mouseout',function () {
            if($(this).hasClass('show')){
                $(this).css('background','url("../img/show_password_lit.png") no-repeat center')
            }
        })


        $('.input_msg .code_input').on('focus',function () {
            $(this).css('border','1px solid #3a8be4')
        })
        $('.input_msg .code_input').on('blur',function () {
            if($(this).val().length==0){
                $(this).css('border','1px solid #dadada')
            }
        })

        $('.input_msg .code_input').on('keyup',function () {
            if($(this).val().length>0){
                $('.js_next_step').css('background','#ffa903')
            }
        })

        $('.js_next_step').on('click',function () {
            if($('.input_msg .code_input').val()!=='1234'){
                $(this).css('border','1px solid #e43a3a')
            }
        })



    })()

});
},{}]},{},[1])