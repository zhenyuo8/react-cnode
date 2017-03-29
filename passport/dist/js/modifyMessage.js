(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/18.
 */
$(document).ready(function () {

    var goToModifyMessage=(function () {
        $('#go_to_modify_message').on('click',function () {
            $('#home_page_message').hide();
            $('#modify_message').show();
        });

        $('.save_cancel_settings .save').on('click',function () {
            var nick_name=$('#js_nick_name .nick input').val();
            var true_name=$('#js_nick_name .true input').val();
            var sex=$('#js_nick_name #select_sex input').val();
            var age=$('#js_nick_name #select_age input').val();
            console.log(sex)
            $('.js_nick_name span').text(nick_name);
            $('.js_true_name span').text(true_name);
            $('.js_sex span').text(sex);
            $('.js_age span').text(age);


            $('#modify_message').hide();
            $('#home_page_message').show();
        })
        $('.save_cancel_settings .cancel').on('click',function () {
            $('#home_page_message').show();
            $('#modify_message').hide();
        })
    })();
    var goBindPhone=(function () {
        var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
        var regWord=/[A-Za-z\u4E00-\u9FA5]/ig;
        $('.js_go_bind').on('click',function () {
            $('.bind_default').hide();
            $('.bind_phone').show()
            $('.bind_phone .js_bind_phone').on('blur',function () {
                var inputNum=$(this).val();
                if(regNum.test(inputNum)){
                    $(this).css('border','1px solid #3a8be4')
                }else{
                    $(this).css('border','1px solid #e43a3a')
                }
                if(!inputNum){
                    $(this).css('border','1px solid #dadada')
                }
            })
            $('.input_msg_input').on('blur',function () {
                var inputCode=$('.input_msg_input').val();
                if(inputCode!=='1234'){
                    $('.error_msg').css('display','block')

                }else{
                    $('.error_msg').css('display','none')
                }
            })
            //点击获取验证码
            $('.get_msg_code').on('click',function () {
                var n=60;
                $('.get_msg_code').val(n+'秒后重新获取');
                $('.get_msg_code').css('background','#dadada')
                clearInterval(timer);
                var timer=setInterval(function () {
                    if(n>0){
                        n--;
                        $('.get_msg_code').val(n+'秒后重新获取')
                        $('.get_msg_code').css('background','#dadada')
                    }else{
                        clearInterval(timer)
                        $('.get_msg_code').val('请重新获取校验码')
                        $('.get_msg_code').css('background','#3a8be4')
                    }
                },1000)

            })

            //    点击保存绑定的手机号码，切换到只读模块，显示更换手机按钮
            $('#save_step').on('click',function () {
                var curNum=$('#js_bind_phone').val();
                var curNumS='';
                $('.bind_phone').hide();
                $('.bind_phone_already').show();
                curNumS=curNum.slice(0,3)+curNum.slice(3,7).replace(/\d/g,'*')+curNum.slice(7,11);
                $('#phone_con').text(curNumS)

            })
            $('.bind_phone_done span').on('click',function () {
                $('.bind_phone_already').hide();
                $('.modify_new_phone').show()
            })

            $('#js_next_step').on('click',function () {
                $('.input_new_phone').show();
                $('.modify_new_phone').hide()
            })
            $('#js_next_step2').on('click',function () {
                $('.input_new_phone').hide();
                $('#phone_con').text($('#input_new_phone').val())
                $('.bind_phone_already').show();

            })


        })
    })();


    var flag=false;
    $('#select_sex').on('click',function (e) {
        e=e||window.event;
        var tar=e.target||e.srcElement;
        if(tar.tagName=='INPUT'||tar.tagName=='EM'){
            if(!flag){
                $('#select_span_sex').show();
                flag=true;
            }else{
                $('#select_span_sex').hide();
                flag=false;
            }
        }
    });

    $('#select_span_sex span').on('click',function () {
        var select_span_val=$(this).text();
        $('#select_sex input').val(select_span_val);
        $('#select_span_sex').hide();
        flag=false;
    });

    $('#select_age').on('click',function (e) {
        e=e||window.event;
        var tar=e.target||e.srcElement;
        if(tar.tagName=='INPUT'||tar.tagName=='EM'){
            if(!flag){
                createSpan();
                $('#select_span_age').show();
                flag=true;
            }else{
                $('#select_span_age').hide();
                $('#select_span_age').empty();
                flag=false;
            }
        }
    });
    $('#select_span_age').on('click',function (e) {
        e=e||window.event;
        var tar=e.target||e.srcElement;
        if(tar.tagName=='SPAN'){
            $('#select_age input').val($(tar).text())
            $('#select_span_age').hide();
            flag=false;
        }




    });



    function createSpan() {
        var str='';
        for(var i=18;i<=65;i++){
            str+=i==65?'<span class="last">'+i+'</span>':'<span>'+i+'</span>'
        }
        $('#select_span_age').html(str)
    }
})
},{}]},{},[1])