(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    /**
     * Created by Administrator on 2017/2/20.
     */
    $(document).ready(function () {
        var timer;
        var regCode=/^\d{4}$/;
        var regPassword=/^[0-9a-zA-Z]{6,16}$/;
        var regNum=/^1[3|4|5|7|8][0-9]\d{8}$/;
        var realMobile = $('#realMobile').val();
        var wrongCode = $("#error_wrong");
        var codeSendFlag = $("#code_send_flag");
        var reg=/\s+/g;


        $("#to_band").click(function () {
            $("#no_band").hide();
            $("#js_content_bind_phone").show();
        });
        //绑定手机获取验证码校验
        var flagTime=false;
        $('#get_msg_code_three').on('click',function () {
            var m=60;
            if(regNum.test($('#js_bind_phone').val())) {
                var sendCodeMobile = $("#js_bind_phone").val();
                var sendResult = sendCodeBindPhone(sendCodeMobile,2);
                if(1==sendResult) {
                    if (!flagTime) {
                        flagTime = true;
                        $(this).val(m + 'S后重新获取');
                        $(this).addClass('wait');
                        clearInterval(timer);
                        var timer = setInterval(function () {
                            if (m > 0) {
                                if (!$('#get_msg_code_three').hasClass('notKit')) {
                                    $(this).addClass('notKit');
                                }
                                m--;
                                $('#get_msg_code_three').val(m + 'S后重新获取');
                                $(this).addClass('wait');
                            } else {
                                clearInterval(timer);
                                flagTime = false;
                                $('#get_msg_code_three').removeClass('notKit')
                                $('#get_msg_code_three').val('重新获取验证码');
                                $('#get_msg_code_three').removeClass('wait');
                            }
                        }, 1000);
                    }
                }
            }else{
                $("#js_bind_phone").css("border","1px solid red");
                $("#error_wrong_new_bind").html('<p ><i></i><span>请输入正确的手机号码</span></p>');
                $("#error_wrong_new_bind").show();
            }
        });
        function sendCodeBindPhone(mobile,type) {
            var sendType = 'sendCode';
            if(null!=type&&undefined!=type&&(type==1||type==2)){
                sendType = 'sendCodeForExistUser';
            }
            var result = 0;
            $.ajax({
                url:"/user/"+sendType,
                type:"POST",
                data:{"mobile":mobile},
                async: false,
                dataType:"json",
                success:function (data) {
                    if(data.errorCode!=10000){
                        if(type==1){
                            $("#error_wrong p").html('<i></i>'+data.resultMsg);
                            $("#error_wrong").show();
                            $("#input_new_phone").css('border','1px solid #e43a3a');
                        }else if(type==2){
                            $("#error_wrong_new_bind p").html('<i></i>'+data.resultMsg);
                            $("#error_wrong_new_bind").show();
                            $("#js_bind_phone").css('border','1px solid #e43a3a');
                        }else{
                            $('#change_first_code p').html('<i></i>'+data.resultMsg);
                            $("#change_first_code").show();
                            $("#input_msg_input2").css('border','1px solid #e43a3a');
                        }
                        result = 0;
                    }else{
                        result = 1;
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
            return result;
        }

        $('#save_step_bindNewPhone').on('click',function () {
            var code=$('#input_msg_input_new_bind').val();
            var mobile = $('#js_bind_phone').val().replace(reg,'');
            if(!regNum.test(mobile)){
                $("#error_wrong_new_bind p").html('<i></i>请输入正确的手机号码');
                $("#error_wrong_new_bind").show();
                $("#js_bind_phone").css('border','1px solid #e43a3a');
                return;
            }
            var userId=$('#user_id').val();
            var nickName = $('#hidden_NickName').val();
            if(code && regCode.test(code)){
                sendBindUserMobile(userId,nickName,mobile,code);
            }else {
                $("#input_msg_input_new_bind").css("border","1px solid red");
                $("#change_third_code p").html('<i></i>验证码格式错误');
                $("#change_third_code").show();
                return;
            }

        });
        function sendBindUserMobile(userId,nickName,mobile,code){
            $.ajax({
                url:"/personal/ajax/bindUserMobile",
                type:"POST",
                data:{"user_id":userId,"user_nickname":nickName,"user_mobile":mobile,"code":code},
                dataType:"json",
                success:function (data) {
                    if(data.errorCode!=10000){
                        $("#input_msg_input_new_bind").css("border","1px solid red");
                        $("#change_third_code p").html('<i></i>请输入正确的验证码');
                        $("#change_third_code").show();
                        $('#modify_flag').val('0');
                    }else{
                        //修改成功
                        window.location.href="/personal/personalPassword";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
        }
        //判断input是否有值，让保存设置按钮高亮或置灰
        $('#mycode').on('keyup',function () {
            wrongCode.empty();
            wrongCode.hide();
            $(this).siblings('em').show();
            var reg=/\s+/g;
            var code=$('#mycode').val().replace(reg,'');
            if(null!=code&&''!=code){
                $('#nex-update').addClass('active');
                $('#modify_flag').val('1');
            }else{
                $('#nex-update').removeClass('active');
                $('#modify_flag').val('0');
            }
            if($(this).val()==''){
                $(this).siblings('em').hide();
            }
        });
        $('#mycode').on('focus',function () {
            $('#mycode').css('border','1px solid #3a8be4');
            $('#error_wrong').hide();
        });
        $('#mycode').on('blur',function () {
            if($(this).val()==''){
                $(this).css('border','1px solid #dadada');
            }else{
                $('#mycode').css('border','1px solid #3a8be4');
            }
            $('#error_wrong').hide();
        });
        $('#two-password').on('focus',function () {
            $(this).css('border','1px solid #389be4');
            if(!regPassword.test($('#one-password').val())){
                $('#one-password').css('border','1px solid #e43a3a')
                $('#one_password_error').show()
            }
        })

        //判断input是否有值，让保存设置按钮高亮或置灰
        $('#two-password,#one-password').on('keyup',function () {
            var onePassword=$('#one-password').val().replace(reg,'');
            var twoPassword=$('#two-password').val().replace(reg,'');
            if(null!=onePassword&&''!=onePassword&&null!=twoPassword&&''!=twoPassword&&regPassword.test(onePassword)){
                $('#js_save_settings').css('background','#ffa903');
                $('#modify_flag').val('1');
            }else{
                $('#js_save_settings').css('background','#dadada');
                $('#modify_flag').val('0');
            }
        })

        var findPassword=(function () {
            $('.input_msg_code .first').after('<span class="overDelete"></span><em></em>');
            var n=30;
            function sendCode(mobile) {
                $.ajax({
                    url:"/user/sendCode",
                    type:"POST",
                    data:{"mobile":mobile},
                    dataType:"json",
                    success:function (data) {
                        if(data.errorCode!=10000){
                            wrongCode.empty();
                            wrongCode.html(data.resultMsg);
                            wrongCode.show();
                        }

                        if(data.errorCode===41009||data.errorCode==41001){
                            $('#mycode').css('border','1px solid #e43a3a')
                        }else{
                            codeSendFlag.val('0');
                            var n=60;
                            $('.msg_get').val(n+'秒后重新获取');
                            $('.msg_get').addClass('wait');
                            clearInterval(timer);
                            var timer=setInterval(function () {
                                if(n>0){
                                    n--;
                                    $('.msg_get').val(n+'秒后重新获取');
                                    $('.msg_get').addClass('wait');
                                }else{
                                    codeSendFlag.val('1');
                                    clearInterval(timer);
                                    $('.msg_get').val('获取动态密码');
                                    $('.msg_get').removeClass('wait');
                                }
                            },1000);
                        }
                    },
                    error:function (XMLHttpRequest,textStatus,errorThrown) {
                        alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                    }
                });
            }
            $("#stay_here").click(function () {
                $("#js_modify_password_success").hide();
                window.location.reload();
            });
            //点击清除验证码
            $(".overDelete").next('em').on('click',function () {
                $("#mycode").val("");
                $('#nex-update').removeClass('active');
            })
            $("#nex-update").click(function () {
                var modifyFlag = $('#modify_flag').val();
                if('0'==modifyFlag){
                    return;
                }
                var code=$('#mycode').val();
                if(code && regCode.test(code)){
                    checkCode(realMobile,code);
                    $('#modify_flag').val('0');
                }else {
                    wrongCode.empty();
                    wrongCode.html('验证码格式错误');
                    wrongCode.show();
                    $('#modify_flag').val('0');
                    $('#nex-update').removeClass('active');
                    $('#mycode').css('border','1px solid #e43a3a');
                }
            });
            $(".form_div_new_code_success li input").focus(function () {
                $("#error_msg1").hide();
                $("#error_msg").hide();
                $("#error_msg_log").hide();
                // $('#one-password').css('border','1px solid #dadada');
                // $('#two-password').css('border','1px solid #dadada');
            });
            $("#one-password").focus(function () {
                $("#one_password_error").hide();
                $(this).css('border','1px solid #389be4');

            });
            $("#one-password").blur(function(){
                var onePassword=$("#one-password").val();
                if(onePassword&&!regPassword.test(onePassword)){
                    $("#one_password_error").show();
                    $(this).css('border','1px solid #e43a3a')
                    $('#js_save_settings').css('background','#dadada');
                    return;
                }else{
                    $("#one_password_error").hide();
                }
            });
            $("#js_save_settings").click(function () {
                if(0==$('#modify_flag').val()){
                    return;
                }
                var onePassword=$("#one-password").val();
                var twoPassword=$("#two-password").val();
                if(!onePassword || !regPassword.test(onePassword)){
                    $("#one_password_error").show();
                    return;
                }else {
                    $("#one_password_error").hide();
                }
                if (onePassword!=twoPassword){
                    $("#error_msg").show();
                    $('#one-password').css('border','1px solid #e43a3a');
                    $('#two-password').css('border','1px solid #e43a3a');
                    return;
                }else {
                    $("#error_msg").hide();
                }
                settPassword();
            });
            function settPassword(){
                var onePassword=$("#one-password").val();
                $.ajax({
                    url:" /personal/ajax/modifyUserPassword",
                    data:{"mobile":realMobile,"password":onePassword},
                    dataType:"json",
                    type:"POST",
                    success:function(data){
                        if(data.errorCode!=10000){
                            $("#error_msg_log").html("<p><i></i>"+data.resultMsg+"</p>");
                            $("#error_msg_log").show();
                            $('#modify_flag').val('0');
                            $('#js_save_settings').css('background','#dadada');
                        }else {
                            $("#js_modify_password_success").show();
                            $('#modify_flag').val('0');
                            $('#js_save_settings').css('background','#dadada');
                            var n=3;
                            timer=setInterval(function () {
                                if(n>0){
                                    n--;
                                    $('#js_select_button span').text('('+n+'S'+')')
                                }else{
                                    clearInterval(timer);
                                    //不操作即留在当前页面
                                    $("#js_modify_password_success").hide();
                                    window.location.reload();
                                }
                            },1000)

                        }
                    },
                    error:function (XMLHttpRequest,textStatus,errorThrown) {
                        alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                    }
                });
            }

            function checkCode(mobile,code) {
                if (!mobile || mobile==null || mobile=="" || !code || code==null || code==""){
                    $('#error-code').html("<p><i></i>验证码有误！</p>");
                    $('#error-code').show();
                    return;
                }
                $.ajax({
                    url:" /user/checkCode",
                    data:{"mobile":mobile,"code":code},
                    dataType:"json",
                    type:"POST",
                    success:function(data){
                        if(data.errorCode!=10000){
                            wrongCode.empty();
                            wrongCode.html(data.resultMsg);
                            wrongCode.show();
                            $('#mycode').css('border','1px solid #e43a3a');
                        }else {
                            clearInterval(timer);
                            $('#js_content_password .tab_p').show();
                            $('#js_content_password .phone_identify').hide();
                        }
                    },
                    error:function (XMLHttpRequest,textStatus,errorThrown) {
                        alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                    }
                });
            }

            for (var x in params) {
                var opt = document.createElement("input");
                opt.name = x;
                opt.value = params[x];
                tempform.appendChild(opt);
            }

            var opt = document.createElement("input");
            opt.type = "submit";
            tempform.appendChild(opt);
            document.body.appendChild(tempform);
            tempform.submit();
            document.body.removeChild(tempform);
        }

            $(".input_new_code em").click(function () {
                var type=$(this).prev().attr("type");
                if (type=="password"){
                    $(this).prev().attr("type","text");
                }else {
                    $(this).prev().attr("type","password");
                }
            });
            $(".confirm_password em").click(function () {
                var type=$(this).prev().attr("type");
                if (type=="password"){
                    $(this).prev().attr("type","text");
                }else {
                    $(this).prev().attr("type","password");
                }
            });
            //明码显示隐藏
            $('#one-password').next('em').on('click',function () {
                if($(this).hasClass('hide')){
                    $(this).addClass('show').removeClass('hide');
                    $('#one-password').attr('type','text')
                }else if($(this).hasClass('show')){
                    $(this).addClass('hide').removeClass('show');
                    $('#one-password').attr('type','password')
                }
            });
            $('#two-password').next('em').on('click',function () {
                if($(this).hasClass('hide')){
                    $(this).addClass('show').removeClass('hide');
                    $('#two-password').attr('type','text')
                }else if($(this).hasClass('show')){
                    $(this).addClass('hide').removeClass('show');
                    $('#two-password').attr('type','password')
                }
            })



            $('.msg_get').on('click',function () {
                if('0'==codeSendFlag.val()){
                    return;
                }

                // var n=60;
                // $('.msg_get').val(n+'秒后重新获取');
                // $('.msg_get').css('background','#dadada');
                // clearInterval(timer);
                // var timer=setInterval(function () {
                //     if(n>0){
                //         n--;
                //         $('.msg_get').val(n+'秒后重新获取');
                //         $('.msg_get').css('background','#dadada')
                //     }else{
                //         codeSendFlag.val('1');
                //         clearInterval(timer);
                //         $('.msg_get').val('获取动态密码');
                //         $('.msg_get').css('background','#3a8be4')
                //     }
                // },1000);
                sendCode(realMobile);


            });
        })()

    });
},{}]},{},[1])