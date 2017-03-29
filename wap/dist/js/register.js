(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: huangzy
 *@from: Global style articleDetail
 *@description: 陈璐
 *@date: name (2017.03.4)
 */
//发送短信
function sendCode(mobile) {
    var val=$("#get_yzm").text();
    if("重新获取验证码"!=val&&"获取验证码"!=val)return;
    $.ajax({
        url:"/user/sendCode",
        type:"POST",
        data:{"mobile":mobile},
        dataType:"json",
        success:function (data) {
            if(data.errorCode!=10000){
                alertDiv({type:"2",des:data.resultMsg,time:"3000",fn:function(){}});
            }else{
                var n=60;
                $('#get_yzm').text(n+'S后重新获取')
                $(this).css('color',"#d8d8d8")
                clearInterval(timer);
                var timer=setInterval(function(){
                    if(n>1){
                        n--;
                        $('#get_yzm').text(n+'S后重新获取')
                    }else {
                        clearInterval(timer)
                        $('#get_yzm').text('重新获取验证码')
                        $('#get_yzm').css('color',"#2799fe")
                    }
                },1000)
            }
        },
        error:function (XMLHttpRequest,textStatus,errorThrown) {
            alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
        }
    });
}

function sendRegister(mobile,code) {
    $('.load_mask').show();
    var callback=getCallBackUrl("callback");
    $.ajax({
        url:"/user/sendRegister",
        type:"POST",
        data:{"user_mobile":mobile,"code":code},
        dataType:"json",
        success:function (data) {
            if (data.code!=10000 && data.code!=41011){
                $('.load_mask').hide();
                alertDiv({type:"2",des:data.msg,time:"3000",fn:function(){}});
            }else if(data.code==41011){
                window.location.href=callback;
            } else {
                window.location.href="/user/toRegisterSuccess?callback="+callback;
            }
        },
        error:function (e) {
            alertDiv({type:"2",des:"注册异常",time:"3000",fn:function(){}});
        }
    });
}

function getCallBackUrl(name) {
    var r = window.location.search;
    var back = r.substr(r.lastIndexOf(name) + name.length + 1);
    if (back != null && undefined != back && back!="")return back;
    return "http://m.qichedaquan.com";
}

$(function(){
    var flag=false;
    var regCode=/(\d){4}/;
    var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
    var phoneCheckout=(function() {

        $('#register_input').on('focus',function(){
            $('.phone_error').hide();
            if($(this).val()){
                $('#get_yzm').css('color',"#2799fe")
            }else{

            }
        })
        $('#register_input').on('input',function(){
            $('.phone_error').hide();
            $('.delete_phone_num').show()
            if($(this).val().length==0){
                $(this).siblings('.delete_phone_num').hide()
            }else {
                $(this).siblings('.delete_phone_num').show()
            }
            if($(this).val().length==11){
                $('#get_yzm').css('color',"#2799fe")
            }else{
                $('#get_yzm').css('color',"#d8d8d8")
            }
        })

        // 手机号码输入框失去焦点
        $('#register_input').on('blur',function(){
            if($(this).val().length==''){
                $(this).next('.delete_phone_num').hide()
            }
        })

        $('#yzm_input').on('focus',function(){
            $('.yzm_error').hide();
        })
        $('#yzm_input').on('input',function(){
            if(regNum.test($('#register_input').val())&&regCode.test($(this).val())){
                $('#register_btn').css('background','#2799fe')
            }else {
                // $('.yzm_error').show();
            }
        })

        // 验证码input框事件
        $('#yzm_input').on('focus',function(){
            if(!regNum.test($('#register_input').val())){
                $(this).parents(".yzm_num").siblings('.phone_num').find('.phone_error').show();
            }
            $('.yzm_error').hide();
        })

        // 点击注册按钮，校验验证码是否正确，不正确提示
        $('#register_btn').on('click',function(){
            var mobile=$('#register_input').val();
            var n=5;
            var code=$("#yzm_input").val();
            if (mobile=="" || !regNum.test(mobile)){
                $('.phone_error').show();
              return;
            }
            if(code=="" || code.length!=4){
                $('.yzm_error').show();
            }else {
                sendRegister(mobile,code);
            }
        })

        // 获取验证码以及倒计时提示
        $('#get_yzm').on('click',function(){
            if($('#register_input').val() != ''){
                if(regNum.test($('#register_input').val())){
                    sendCode($('#register_input').val())
                }else{
                    $('.phone_error').show();
                }
            }
        })

        // 输入验证码
        $('#yzm_input').on('input',function(){
            $('.yzm_error').hide();
            if($(this).val()!=''){
                $(this).parent().children('.delete_yzm_num').show();
            }
            if(regNum.test($('#register_input').val()) && regCode.test($(this).val()) && ($(this).val().length == 4)){
                $('#register_btn').css('background','#2799fe');
            }else{
                $('#register_btn').css('background','#a9d5ff');
            }
        })

        $('.delete_phone_num').on('click',function(){
            $(this).hide();
            $(this).siblings('#register_input').val('');
            $('#register_btn').css('background','#a9d5ff');
        })

        $('.delete_yzm_num').on('click',function(){
            $(this).hide();
            $(this).siblings('#yzm_input').val('');
            $('#register_btn').css('background','#a9d5ff');
        })
    })()

    // 注册成功后倒计时
    var registerSucc=(function() {
        if(flag){
            var n=5;
            $('.iknow').html('我知道了('+n+'S)')
            clearInterval(timer);
            var timer=setInterval(function(){
                if(n>=1){
                    n--;
                    $('.iknow').text('我知道了（'+n+'S)')
                }else {
                    clearInterval(timer)
                    //   window.location="loginIn.html";
                    flag=false;
                }
            },1000)
        }


    })()
})

},{}]},{},[1])