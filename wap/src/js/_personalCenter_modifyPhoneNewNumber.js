$(function(){
    var regCode=/(\d){4}/;
    var regNum=/^1[3|4|5|7|8][0-9]\d{8}$/;
    var bidnPhone=(function(){
        // 输入手机号
        $('#phone_input').on('focus',function(){
            $('.phone_error').hide();
        });

        $('#phone_input').on('input',function(e){
            var inputNum=$(this).val();
            if(inputNum.length == 0){
                $(this).siblings('em').hide();
            }else{
                $(this).siblings('em').show();
            }
            if(regNum.test(inputNum) && inputNum.length >= 11){
                $('.get_code').css('color',"#2799fe");
            }else{
                $('.get_code').css('color',"#d8d8d8");
            }
        })

        $('.phone em').on('click',function(){
            $(this).hide();
            $('#phone_input').val('');
            $('.get_code').css('color',"#d8d8d8");
        })

        $('.code em').on('click',function(){
            $('#yzm_input').val('');
            $(this).hide();
            $('#bind').css('background','#a9d5ff');
        })

        $('#bind').on('click',function(){
            if(!regNum.test($('#phone_input').val())){
                return;
            }
            if(!regCode.test($('#yzm_input').val())){
                return;
            }
            var userId=$('#user_id').val();
            var nickName = $('#hidden_NickName').val();
            var newmobile = $('#phone_input').val();
            var code=$('#yzm_input').val();

            var sendCodeMobile = $("#phone_input").val();
            var oldMobile = $("#hidden_mobile").val();
            if(oldMobile&&oldMobile==sendCodeMobile){
                //已经绑定该账号
                $('.phone_error').html('您已经绑定了该账号，不需要重复绑定！<strong></strong>');
                $('.phone_error').show();
                return;
            }
            sendModifyUserMobile(userId,nickName,newmobile,oldMobile,code);

        });
        function sendModifyUserMobile(userId,nickName,newMobile,lastMobile,code){
            $(".load_mask").show();
            $.ajax({
                url:"/personal/ajax/modifyUserMobile",
                type:"POST",
                data:{"user_id":userId,"user_nickname":nickName,"user_oldmobile":lastMobile,"user_newmobile":newMobile,"code":code},
                dataType:"json",
                success:function (data) {
                    $(".load_mask").hide();
                    if(data.errorCode!=10000){
                        if(data.errorCode==41014){
                            $('.phone_error').html(data.resultMsg+'<strong></strong>');
                            $('.phone_error').show();
                        }else{
                            $('.yzm_error').html(data.resultMsg+'<strong></strong>');
                            $('.yzm_error').show();
                        }
                    }else{
                        //修改成功
                        window.location.href="/personal/personalCenterSettings";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    $(".load_mask").hide();
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
        }

        // 获取验证码以及倒计时提示
        $('.get_code').on('click',function(){
            var n=60;
            var inputNum=$('#phone_input').val();
            var yzmVal=$(".get_code").text();
            if(yzmVal != "重新获取验证码" && yzmVal != "获取验证码"){ return; }
            if(inputNum != ''){
                if(regNum.test(inputNum)){
                    var sendCodeMobile = $("#phone_input").val();
                    var oldMobile = $("#hidden_mobile").val();
                    if(oldMobile&&oldMobile==sendCodeMobile){
                        //已经绑定该账号
                        $('.phone_error').html('您已经绑定了该账号，不需要重复绑定！<strong></strong>');
                        $('.phone_error').show();
                        return;
                    }
                    var sendResult = sendCode(sendCodeMobile,2);
                    if(1==sendResult) {
                        $('.get_code').text(n + 'S后重新获取');
                        $('.get_code').css('color', "#d8d8d8");
                        clearInterval(timer);
                        var timer = setInterval(function () {
                            if (n > 1) {
                                n--;
                                $('.get_code').text(n + 'S后重新获取');
                            } else {
                                clearInterval(timer);
                                $('.get_code').text('重新获取验证码');
                                $('.get_code').css('color', "#2799fe");
                            }
                        }, 1000);
                    }

                }else{
                    $('.phone_error').html('请输入正确手机号<strong></strong>');
                    $('.phone_error').show();
                }
            }
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
                    if(data.errorCode!=10000){
                        if(type==1){
                            $("#error_wrong p").html('<i></i>'+data.resultMsg);
                            $("#error_wrong").show();
                            $("#input_new_phone").css('border','1px solid #e43a3a');
                        }else if(type==2){
                            $('.phone_error').html(data.resultMsg+'<strong></strong>');
                            $('.phone_error').show();
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

        // 验证码input框事件
        $('#yzm_input').on('focus',function(){
            if(!regNum.test($('#phone_input').val())){
                $(this).parents(".code").siblings('.phone').find('.phone_error').show();
            }
            $('.yzm_error').hide();
        })

        // 输入验证码
        $('#yzm_input').on('input',function(){
            $('.yzm_error').hide();
            if($(this).val()!=''){
                $(this).parent().children('em').show();
            }
            if(regNum.test($('#phone_input').val()) && regCode.test($(this).val()) && ($(this).val().length == 4)){
                $('#bind').css('background','#2799fe');
            }else{
                $('#bind').css('background','#a9d5ff');
            }
        })

    })()
})
