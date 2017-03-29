$(document).ready(function () {
    var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
    var regCode=/^\d{4}$/;
    var regPassword=/^[0-9a-zA-Z]{6,16}$/;
    var timer;
    var qmobile;
    $('.step_four b').addClass('default');
    $("#first_step_find").attr('maxlength','11');
    $("#first_step_find").on('keyup',function () {

        if($("#first_step_find").val!=' '){
	        $('#next_step_first input').addClass('i_active')
        }else {
	        $('#next_step_first input').removeClass('i_active')
        }
    })
    $('#first_step_find').on('focus',function () {
        $('#error_phone').hide();
    })
    $('#next_step_first input').on('click',function () {
        var mobile=$("#first_step_find").val();
        var bg=$(this).css('background');
        if (bg=='rgb(218, 218, 218) none repeat scroll 0% 0% / auto padding-box border-box') {
            return;
        }
        if(mobile && regNum.test(mobile)){
            qmobile=mobile;
            checkUser(mobile);
            $('.input_msg .button').css('background','#dadada')
        } else {
            if (bg=='rgb(218, 218, 218) none repeat scroll 0% 0% / auto padding-box border-box') {
                $("#first_step_find").css('border','1px solid #dadada')
                return;
            }
            $('#error_phone').html("<p><i></i>请输入正确的手机号码！</p>");
            $("#first_step_find").css('border','1px solid #e43a3a')
            $('#error_phone').show();
            $('.input_msg .button').css('background','#3a8be4')

        }
    });

    $('.register_imd').parent().addClass('newImd')

    //点击删除按钮，清空input输入框
    $('#first_step_find').next('em').on('click',function () {
        $('#first_step_find').val('')
	    $('#next_step_first input').removeClass('i_active');
        $("#first_step_find").css('border','1px solid #dadada')
        $('#error_phone').hide();
    });
    //点击清除验证码
    
    $(".overDelete").next('em').on('click',function () {
        $("#mycode").val("");
    })
    function getQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)($)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return "http://www.qichedaquan.com";
    }
    function getCallBackUrl(name) {
        var r=window.location.search;
        var back=r.substr(r.lastIndexOf(name)+name.length+1);
        if (back!=null && undefined!=back && back!="")return back;
        return "http://www.qichedaquan.com";
    }
    function buidPost(url, params, target){
        var tempform = document.createElement("form");
        tempform.action = url;
        tempform.method = "post";
        tempform.style.display="none"
        if(target) {
            tempform.target = target;
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
    $("#nex-update").click(function () {
        var code=$('.input_msg .code_input').val();
        console.log(code)
        if(code==''){
            return;
        }else{
            if(regCode.test(code)){
                checkCode(qmobile,code);
            }else {
                $('#error-code').html("<p><i></i>验证码格式有误！</p>");
                $('.input_msg .code_input').css('border','1px solid #e43a3a')
                $('#error-code').show();
            }
        }

    });

    $("#submit-update").click(function () {
        var onePassword=$("#one-password").val();
        var twoPassword=$("#two-password").val();
        var bg=$(this).css('background');
        if (bg=='rgb(218, 218, 218) none repeat scroll 0% 0% / auto padding-box border-box') {
            $("#one-password").css('border','1px solid #dadada');
            $("#two-password").css('border','1px solid #dadada');
            return;
        }
        if ($(this).attr("is-submit")==1)return;
        if(!onePassword || !regPassword.test(onePassword)){
            $("#password-msg").show();
            $('#password-msg').html('<p><i></i>密码限6-16个英文字母、数字、或字母和数字的组合！</p>');
            $('#one-password ,#two-password').css('border','1px solid #e43a3a')
            $('#submit-update').css('background','#dadada');
            $(this).attr("is-submit",1);
            return;
        }else {
            $('.step_list .step_four').addClass('cur_step');
            $('.step_list .step_four b').removeClass('default').addClass('suc');
            $("#password-msg").hide();
            $(this).attr("is-submit",0);
        }
        if (onePassword!=twoPassword){
            $("#password-msg-two").show();
            $('#submit-update').css('background','#dadada');
            $(this).attr("is-submit",1);
            return;
        }else {
            $('.step_list .step_four').addClass('cur_step');
            $('.step_list .step_four b').removeClass('default').addClass('suc');
            $("#password-msg-two").hide();
            $(this).attr("is-submit",0);
        }
        settPassword();

    });

    $('#one-password').next('em').on('click',function () {
        if($(this).hasClass('hide')){
            $(this).addClass('show').removeClass('hide');
            $('#one-password').attr('type','text')
        }else if($(this).hasClass('show')){
            $(this).addClass('hide').removeClass('show');
            $('#one-password').attr('type','password')
        }
    })
    // $("#two-password").change(function () {
    //     var onePassword=$("#one-password").val();
    //     var twoPassword=$("#two-password").val();
    //     if(onePassword && regPassword.test(onePassword) && onePassword == twoPassword){
    //         $("#submit-update").css("background","#ffa903");
    //     }else {
    //         $("#submit-update").css("background","#dadada");
    //     }
    // });

    $('#one-password').on('keyup',function () {
        successColor()
    })
    $('#two-password').on('keyup',function () {
        successColor()
    })
    $('#one-password').on('blur',function () {
        if($(this).val()==''){
            $(this).css('border','1px solid #dadada')
        }
    })

    $('#two-password').next('em').on('click',function () {
        if($(this).hasClass('hide')){
            $(this).addClass('show').removeClass('hide');
            $('#two-password').attr('type','text')
        }else if($(this).hasClass('show')){
            $(this).addClass('hide').removeClass('show');
            $('#two-password').attr('type','password')
        }
    })

    $("#one-password").focus(function () {
        $("#password-msg").hide();
        $('#one-password').css('border','1px solid #3a8be4');
        successColor()
    });

    $("#two-password").focus(function () {
        $('#one-password').css('border','1px solid #3a8be4');
        $(this).css('border','1px solid #3a8be4');
        if(!$('#one-password').val() || $('#one-password').val().length<6){
            $('#one-password').css('border','1px solid #e43a3a')
            $('#password-msg').show();
            $('#password-msg').html('<p><i></i>密码限6-16个英文字母、数字、或字母和数字的组合！</p>');
            $('#submit-update').css('background','#dadada');
            $('#submit-update').attr("is-submit",1);
        }else if($('#one-password').val()&&!regPassword.test($('#one-password').val())){
            $('#one-password').css('border','1px solid #e43a3a')
            $('#password-msg').show();
            $('#password-msg').html('<p><i></i>密码限6-16个英文字母、数字、或字母和数字的组合!</p>');
            $('#submit-update').css('background','#dadada');
            $('#submit-update').attr("is-submit",1);
        }
        $("#password-msg-two").hide();
        successColor()
    });
    $(document).on('keyup',function () {
        if($('#one-password').val()==''){
            $('#one-password').css('border','1px solid #3a8be4')
        }
    });

    function successColor() {
        if($('#one-password').val()!=''&&$('#two-password').val()!=''){
            $('#submit-update').css('background','#ffa903');
            $('#submit-update').attr("is-submit",0);
        }else{
            $('#submit-update').css('background','#dadada');
            $('#submit-update').attr("is-submit",1);
        }
    }

    function checkUser(mobile) {
        if(!mobile || mobile==null || mobile==""){
            return ;
        }
        $.ajax({
            url:"/user/check",
            data:{"mobile":mobile},
            dataType:"json",
            type:"POST",
            success:function(data){
                if(data.errorCode!=41011){
                    $('#error_phone').html("<p><i></i>此手机号尚未注册，请重新输入！</p>");
                    $('#error_phone').show();
	                $("#first_step_find").css('border','1px solid #e43a3a')
                }else {
                    toSecond(mobile);
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }

    function toSecond(mobile) {
        $('.input_handle').hide();
        $('.step_list .step_second').addClass('cur_step')
        $('.identify_msg').show();
        var mtel = mobile.substr(0, 3) + '****' + mobile.substr(7);
        $('.phone_place').html('<p><span>您的手机号为</span><span class="mobile-span">'+mtel+'</span><span>,请填写验证码</span></p>');
        // $('.mobile-span').html(mtel);
        sendCode(mobile);
    }
    $(".input_msg .button").click(function () {
        var mobile=$("#first_step_find").val();
        if(mobile && regNum.test(mobile) && "重新获取验证码"==$(this).val()){
            qmobile=mobile;
            sendCode(mobile);
            $(this).css('background','#dadada')
        } else {
            //$('#error_phone').html("<p><i></i>请输入正确的手机号码！</p>");
            $('#error-code').show();

        }
    });

    function sendCode(mobile) {
        $.ajax({
            url:"/user/sendCode",
            type:"POST",
            data:{"mobile":mobile},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    $('#error-code').html("<p><i></i>"+data.resultMsg+"！</p>");
                    $('#error-code').show();
                    $('.input_msg .button').css('background','#3a8be4');
                    $('.identify_phone .input_msg .button').val('获取验证码')
                }else{
                    var n=60;
                    clearInterval(timer);
                    timer=setInterval(function () {
                        if(n>0){
                            n--;
                            $('.input_msg .button').val('('+n+'S'+')'+'秒后重新获取')
                        }else{
                            clearInterval(timer)
                            $('.input_msg .button').val('重新获取验证码');
                            $('.input_msg .button').css('background','#3a8be4')
                        }
                    },1000)
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }
    function checkCode(mobile,code) {
        if (!mobile || mobile==null || mobile=="" || !code || code==null || code==""){
            $('#error-code').html("<p><i></i>验证码错误，请重新输入！</p>");
            $('#error-code').show();
            return;
        }
        $.ajax({
            url:" /user/checkCode",
            data:{"mobile":mobile,"code":code},
            dataType:"json",
            type:"POST",
            success:function(data){
                if (data.resultMsg=="验证码错误") {
                    data.resultMsg="验证码错误，请重新输入";
                }
                if(data.errorCode!=10000){
                    $('#error-code').html("<p><i></i>"+data.resultMsg+"！</p>");
                    $('#error-code').show();
                }else {
                    clearInterval(timer)

                    $('.identify_phone').hide();
                    $('.step_list .step_third').addClass('cur_step');
                    $('.reset_password').show();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }
    function settPassword() {
        var onePassword=$("#one-password").val();
        var callback=getCallBackUrl("callback");
        buidPost("/user/sendUpdate",{"mobile":qmobile,"password":onePassword,"callback":callback},"_self");
        // $.ajax({
        //     url:" /user/ajax/update",
        //     data:{"mobile":qmobile,"password":onePassword},
        //     dataType:"json",
        //     type:"POST",
        //     success:function(data){
        //         if(data.errorCode!=10000){
        //             $('#password-msg-two').html("<p><i></i>"+data.resultMsg+"！</p>");
        //             $('#password-msg-two').show();
        //         }else {
        //             $('.identify_msg').hide();
        //             $('.step_list .step_four').addClass('cur_step');
        //             $('.step_list .step_four b').removeClass('default').addClass('suc');
        //             $('.register_suc').show()
        //             var n=5;
        //             var timer=setInterval(function () {
        //                 if(n>0){
        //                     n--;
        //                     $('.go_prev span').text('('+n+'S'+')')
        //                 }else{
        //                     //成功触发的回调函数、页面跳转
        //                     var callback =GetQueryString("callback");
        //                     if (callback && callback!=null && callback!=""){
        //                         window.location.href=callback;
        //                     }else {
        //                         window.location.href="http://www.qichedaquan.com";
        //                     }
        //                 }
        //             },1000)
        //         }
        //     },
        //     error:function (XMLHttpRequest,textStatus,errorThrown) {
        //         alert("请求异常");
        //     }
        // });
    }

    // $('.reset_done input').on('click',function () {
    //     $('.identify_msg').hide();
    //     $('.step_list .step_four').addClass('cur_step');
    //     $('.step_list .step_four b').removeClass('default').addClass('suc');
    //
    //     $('.register_suc').show()
    // })
//输入 手机号删除按钮显示
    $('#phone_num')
    $('.input_handle .phone_num input').on('keyup',function () {
        var phoneNum=$(this).val();
        if(phoneNum){
            $('.input_handle .phone_num em').css('display','inline-block')
        }else{
            $('.input_handle .phone_num em').css('display','none')
        }
    })
    $('#first_step_find').on('focus',function () {
        $(this).css('border','1px solid #3a8be4')
    })
    $('#first_step_find').on('keyup',function () {
        if($(this).val()==''){
            $(this).css('border','1px solid #3a8be4')
            $('#next_step_first input').removeClass('i_active')
        }
    })

    $('.input_msg em').on('click',function () {

    })
    $("#js_account_pas").next('em').on('click',function () {
        if($(this).hasClass('hide')){
            $('#js_account_pas').attr('type','text')
            $("#js_account_pas").next('em').css('background','url("img/show_password.png") no-repeat center')
            $("#js_account_pas").next('em').addClass('show').removeClass('hide');
        }
        if($(this).hasClass('show')){
            $('#js_account_pas').attr('type','password')
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
        $("#error-code").hide();
        $(this).css('border','1px solid #3a8be4')
    })
    $('.input_msg .code_input').on('blur',function () {
        if($(this).val().length==0){
            $(this).css('border','1px solid #dadada')
        }
    })

    $('.input_msg .code_input').on('keyup',function () {
        if($(this).val().length>0){
            $('.js_next_step').addClass("i_active");
            $("#error-code").hide();
        }else{
	        $('.js_next_step').removeClass("i_active");
        }
    })


    var findPassword=(function () {
        var n=30;

        $('#find_voice').on('click',function () {
            $('.wait_call').show();
            $('.send_voice').hide();
            $('.timer_span').text(n+'S')
            clearInterval(timer);

        });

        $('.msg_get').on('click',function () {
            var n=60;
            $('.msg_get').val(n+'秒后重新获取');
            $('.msg_get').css('background','#dadada')
            clearInterval(timer);
            var timer=setInterval(function () {
                if(n>0){
                    n--;
                    $('.msg_get').val(n+'秒后重新获取')
                    $('.msg_get').css('background','#dadada')
                }else{
                    clearInterval(timer)
                    $('.msg_get').val('重新获取验证码')
                    $('.msg_get').css('background','#3a8be4')
                }
            },1000)
        });



        // $('.js_next_step').on('click',function () {
        //     var code=$('.input_msg .code_input').val();
        //     if(!code || !regCode.test(regCode)){
        //         $('.code_input').css('border','1px solid #e43a3a')
        //     }
        // })



    })()

});