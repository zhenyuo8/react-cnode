(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function () {
        var timer;
        var regCode=/^\d{4}$/;
        var regNum=/^1[3|4|5|7|8][0-9]\d{8}$/;
        var realMobile = $('#realMobile').val();
        var reg=/\s+/g;
        var dataCode=[];
        var flagT=false;
        if(''!=realMobile&&null!=realMobile){
            var displayMobile = realMobile.substr(0, 3) + '****' + realMobile.substr(7);
            $('.hideMobile').html(displayMobile);
            $('#phone_con').html(displayMobile);
        }

        var goBindPhone=(function () {
            var regNum=/^1[3|4|5|7|8][0-9]\d{8}$/;
            var regWord=/[A-Za-z\u4E00-\u9FA5]/ig;
            $('#js_bind_phone').attr('maxlength','11');
            $('.bind_phone_done span').on('click',function () {
                $('.bind_phone_already').hide();
                $('.modify_new_phone').show()
            })
            $('.js_go_bind').on('click',function () {
                $('.bind_default').hide();
                $('.bind_phone').show();
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
                });


                //未绑定手机号进入绑定
                $('#js_bind_phone').on('focus',function () {
                    $('#error_wrong_new_bind').hide();
                    $(this).css('border','1px solid #389be4');
                });
                $('#js_bind_phone').on('blur',function () {
                    if($(this).val()==''){
                        $(this).css('border','1px solid #389be4');
                    }
                });
                //添加一键清除按钮
	            $('#js_bind_phone').on('keyup',function () {
		            if($(this).val()!=""){
                        $(this).next("em").show();
                    }else{
			            $(this).next("em").hide();
                    }
	            });
	            $('#js_bind_phone').next("em").click(function () {
                    $(this).prev("input").val("");
		            $(this).hide();
	            });
                //绑定手机获取验证码校验
                var flagTime=false;
                $('#get_msg_code_three').on('click',function () {
                    var m=60;
                    if(regNum.test($('#js_bind_phone').val())) {
                        var sendCodeMobile = $("#js_bind_phone").val();
                        var sendResult = sendCode(sendCodeMobile,2);
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
                        // $("#input_msg_input_new_bind").css("border","1px solid red");
                        // $("#change_third_code").html('<p ><i></i><span>验证码格式错误</span></p>');
                        // $("#change_third_code").show();
                        $("#js_bind_phone").css("border","1px solid red");
                        $("#error_wrong_new_bind").html('<p ><i></i><span>请输入正确的手机号码</span></p>');
                        $("#error_wrong_new_bind").show();
                    }
                });

                //验证码输入框获取焦点

                $('.input_msg_input').on('focus',function () {
                    $(this).css('border','1px solid #389be4');
                });
                $('#input_msg_input').on('blur',function () {
                    if($(this).val()==''){
                        $(this).css('border','1px solid #389be4');
                    }
                });
                // $('.input_msg_input').on('blur',function () {
                //     var inputCode=$('.input_msg_input').val();
                //     if(inputCode!=='1234'){
                //         $('.error_msg').css('display','block')
                //
                //     }else{
                //         $('.error_msg').css('display','none')
                //     }
                // })
                //点击获取验证码
                // $('.get_msg_code').on('click',function () {
                //     var n=60;
                //     $('.get_msg_code').val(n+'秒后重新获取');
                //     $('.get_msg_code').css('background','#dadada')
                //     clearInterval(timer);
                //     var timer=setInterval(function () {
                //         if(n>0){
                //             n--;
                //             $('.get_msg_code').val(n+'秒后重新获取')
                //             $('.get_msg_code').css('background','#dadada')
                //         }else{
                //             clearInterval(timer)
                //             $('.get_msg_code').val('请重新获取验证码')
                //             $('.get_msg_code').css('background','#3a8be4')
                //         }
                //     },1000)
                //
                // })

                //    点击保存绑定的手机号码，切换到只读模块，显示更换手机按钮
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



        //判断按钮高亮
        $('#one_code input').on('keyup',function () {
            var code=$('#input_msg_input2').val().replace(reg,'');
            $("#change_first_code").hide();
            if(null!=code&&''!=code){
                $('#js_next_step').addClass('active')
            }else{
	            $('#js_next_step').removeClass('active')
            }
            //$('#modify_flag').val('1');
        });
        //判断按钮高亮
        $('#input_new_phone_one input,#two_code input').on('keyup',function () {
            var newMobie=$('#input_new_phone').val().replace(reg,'');
            var code=$('#input_msg_input3').val().replace(reg,'');
            if(null!=code&&''!=code&&null!=newMobie&&''!=newMobie){
	            $('#js_next_step2').addClass('active')
            }else{
	            $('#js_next_step2').removeClass('active')
            }
            //$('#modify_flag').val('1');
        });
        //判断按钮高亮
        $('#js_bind_phone,#input_msg_input_new_bind').on('keyup',function () {
            var newMobie=$('#js_bind_phone').val().replace(reg,'');
            var code=$('#input_msg_input_new_bind').val().replace(reg,'');
            if(null!=code&&''!=code&&null!=newMobie&&''!=newMobie){
                $('#save_step_bindNewPhone').css('background','#ffa903');
            }else{
                $('#save_step_bindNewPhone').css('background','#dadada');
            }
            //$('#modify_flag').val('1');
        });
        function sendCode(mobile,type) {
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
                    dataCode.push(data.errorCode);
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

        $('#get_msg_code_one').on('click',function () {
            var n=60;
            var sendCodeMobile = realMobile;
            var sendResult = sendCode(sendCodeMobile);

            $('#input_new_phone').empty();
            //验证码发送成功才倒计时,否则提示错误信息
            if (1 == sendResult) {
	            $('#get_msg_code_one').addClass("wait");
                if (!$(this).hasClass('canKit')) {
                    // flag=false;
                    $('#get_msg_code_one').val(n + '秒后重新获取');
                    clearInterval(timer);
                    var timer = setInterval(function () {
                        if (n > 0) {
                            n--;
                            $('#get_msg_code_one').val(n + '秒后重新获取');
	                        $('#get_msg_code_one').addClass("wait");
                        } else {
                            flagT = true;
                            clearInterval(timer);
                            $('#get_msg_code_one').val('重新获取验证码');
	                        $('#get_msg_code_one').removeClass("wait");
                            $(this).removeClass('canKit')
                        }
                    }, 1000)
                } else {
                    $(this).addClass('canKit')
                    clearInterval(timer)
                    $('#get_msg_code_one').val('重新获取验证码');
	                $('#get_msg_code_one').removeClass("wait");
                    return;
                }
            }
        });
        $("#input_new_phone").focus(function () {
            $("#error_wrong").hide();
            $("#input_new_phone").css('border','1px solid #3a8be4');
        });
        $("#input_new_phone").blur(function () {
            $("#input_new_phone").css('border','1px solid #dadada');
        });
        $("#input_msg_input_new_bind").focus(function () {
            $("#change_third_code").hide();
            $("#input_msg_input_new_bind").css('border','1px solid #3a8be4');
        });
        $("#input_msg_input_new_bind").blur(function () {
            $("#input_msg_input_new_bind").css('border','1px solid #dadada');
        });
        $('#get_msg_code_two').on('click',function () {
            var new_mobile=$("#input_new_phone").val().replace(reg,'');
            if(new_mobile==realMobile){
                $("#error_wrong p").html('<i></i>您已经绑定了该账号，不需要重复绑定！');
                $("#error_wrong").show();
                $("#input_new_phone").css('border','1px solid #e43a3a');
                return;
            }
            if(!(new_mobile && regNum.test(new_mobile) && "获取验证码"==$(this).val())){
                $("#error_wrong p").html('<i></i>请输入正确的手机号码！');
                $("#error_wrong").show();
                $("#input_new_phone").css('border','1px solid #e43a3a');
                return;
            }
            var n=60;
            var sendCodeMobile = new_mobile;
            var sendResult = sendCode(sendCodeMobile,1);
            if(1==sendResult){
                $('#get_msg_code_two').val(n+'秒后重新获取');
	            $('#get_msg_code_two').addClass("wait");
                clearInterval(timer);
                var timer=setInterval(function () {
                    if(n>0){
                        n--;
                        $('#get_msg_code_two').val(n+'秒后重新获取');
	                    $('#get_msg_code_two').addClass("wait");
                    }else{
                        clearInterval(timer);
                        $('#get_msg_code_two').val('重新获取验证码');
	                    $('#get_msg_code_two').removeClass("wait");
                    }
                },1000)
            }

        });

        $("#js_next_step").click(function () {
            var code=$('#input_msg_input2').val().replace(reg,'');
            if(null==code||''==code){
                return false;
            }
            if(code && regCode.test(code)){
                checkCode(realMobile,code);
            }else {
                $("#input_msg_input2").css("border","1px solid red");
                $("#change_first_code").html('<p ><i></i><span>验证码格式错误</span></p>');
                $("#change_first_code").show();
            }
        });
        $("#input_msg_input2").on("focus",function () {
            $(this).css("border","1px solid #3a8be4");
        });
        $("#input_msg_input2").on("blur",function () {
            $(this).css("border","1px solid #dadada");
        });

        $("#input_msg_input3").on("focus",function () {
            $(this).css("border","1px solid #3a8be4");
        });
        $("#input_msg_input3").on("keyup",function () {
            $('#change_second_code').hide();
        });
        $("#input_msg_input3").on("blur",function () {
            $(this).css("border","1px solid #dadada");
        });

        $('#js_next_step2').on('click',function () {
            var code=$('#input_msg_input3').val();
            var sendCodeMobile = realMobile;
            var newMobile = $('#input_new_phone').val().replace(reg,'');
            if(''!=newMobile&&null!=newMobile&&regNum.test(newMobile)){
                sendCodeMobile = newMobile;
            }else{
                $("#error_wrong p").html('<i></i>请输入正确的手机号码');
                $("#error_wrong").show();
                $("#input_new_phone").css('border','1px solid #e43a3a');
                return;
            }
            var userId=$('#user_id').val();
            var nickName = $('#hidden_NickName').val();
            if(code && regCode.test(code)){
                sendModifyUserMobile(userId,nickName,sendCodeMobile,realMobile,code);
            }else {
                $("#input_msg_input3").css("border","1px solid red");
                $("#change_second_code p").html('<i></i>验证码格式错误');
                $("#change_second_code").show();
                //$("#input_new_phone").css('border','1px solid #e43a3a');
                return;
            }

        });
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
                //$("#input_new_phone").css('border','1px solid #e43a3a');
                return;
            }

        })

        function sendModifyUserMobile(userId,nickName,newMobile,lastMobile,code){
            $.ajax({
                url:"/personal/ajax/modifyUserMobile",
                type:"POST",
                data:{"user_id":userId,"user_nickname":nickName,"user_oldmobile":newMobile,"user_newmobile":lastMobile,"code":code},
                dataType:"json",
                success:function (data) {
                    if(data.errorCode!=10000){
						if(data.errorCode==41014){
							$("#error_wrong p").html('<i></i>'+data.resultMsg);
							$("#error_wrong").show();
							$("#input_new_phone").css('border','1px solid #e43a3a');
							$('#modify_flag').val('0');
						}else{
							$("#input_msg_input3").css("border","1px solid red");
							$("#change_second_code p").html('<i></i>'+data.resultMsg);
							$("#change_second_code").show();
							$('#modify_flag').val('0');
						}
                    }else{
                        //修改成功
                        window.location.href="/personal/personalCenter";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
        }
        function sendBindUserMobile(userId,nickName,mobile,code){
            $.ajax({
                url:"/personal/ajax/bindUserMobile",
                type:"POST",
                data:{"user_id":userId,"user_nickname":nickName,"user_mobile":mobile,"code":code},
                dataType:"json",
                success:function (data) {
                    if(data.errorCode!=10000){
                        if(data.errorCode==41014){
							$("#error_wrong p").html('<i></i>'+data.resultMsg);
							$("#error_wrong").show();
							$("#input_new_phone").css('border','1px solid #e43a3a');
							$('#modify_flag').val('0');
						}else{
							$("#input_msg_input3").css("border","1px solid red");
							$("#change_second_code p").html('<i></i>'+data.resultMsg);
							$("#change_second_code").show();
							$('#modify_flag').val('0');
						}
                    }else{
                        //修改成功
                        window.location.href="/personal/personalCenter";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
        }



        function checkCode(mobile,code) {
            if (!mobile || mobile==null || mobile=="" || !code || code==null || code==""){
                $("#change_first_code").show();
                return;
            }
            $.ajax({
                url:" /user/checkCode",
                data:{"mobile":mobile,"code":code},
                dataType:"json",
                type:"POST",
                success:function(data){
                    if(data.errorCode!=10000){
                        $("#input_msg_input2").css("border","1px solid red");
                        $("#change_first_code").html('<p ><i></i><span>验证码错误，请重新输入</span></p>');
                        $("#change_first_code").show();
                    }else {
                        clearInterval(timer);
                        $('.get_msg_code').val('获取验证码')
                        $('.get_msg_code').css('background','#3a8be4')
                        $('.input_new_phone').show();
                        $('.modify_new_phone').hide()
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
        }











    });
},{}]},{},[1])