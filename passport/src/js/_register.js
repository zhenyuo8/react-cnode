/**
 * Created by Administrator on 2017/2/22.
 */
$(document).ready(function () {
    var regNum = /^1[3|4|5|8][0-9]\d{8}$/;
    var registerAccount = (function () {
        var inputPhone, msgCode;
        var dataCode=[];
        var timer;
        $('#register_input_phone').on('focus', function () {
            $(this).css('border', '1px solid #3a8be4');

            $(this).on('keyup', function () {
                inputPhone = $(this).val();
                $('.phone_num').next('.error_code').hide();
                if (inputPhone == '') {
                    $('.phone_num em').hide();
                } else {
                    $('.phone_num em').show()
                }

                var codeMsg = $("#register_msg_input").val();
                var phoneNum = $(this).val();
                $('.checkout_msg').next('.error_code').hide();
                $(this).css('border', '1px solid #3a8be4');
                if (codeMsg && phoneNum) {
                    $('#register').addClass('canKit')
                } else {
                    $('#register').removeClass('canKit')
                }
            });


            $('.phone_num em').on('click', function () {
                $('#register_input_phone').val('')
                $(this).hide();
            })
        });

        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return "http://www.qichedaquan.com";
        }

        function getReturnUrl() {
            var returnUrl = $("#returnUrl").val();
            if (undefined != returnUrl && returnUrl != null && "" != returnUrl)return returnUrl;
            return "http://www.qichedaquan.com";
        }

        function getCallBackUrl(name) {
            var r = window.location.search;
            var back = r.substr(r.lastIndexOf(name) + name.length + 1);
            if (back != null && undefined != back && back!="")return back;
            return "http://www.qichedaquan.com";
        }

        function buidPost(url, params, target) {
            var tempform = document.createElement("form");
            tempform.action = url;
            tempform.method = "post";
            tempform.style.display = "none"
            if (target) {
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

        function sendRegister(mobile,code) {
            var callback=getCallBackUrl("callback");
            $.ajax({
                url:"/user/sendRegister",
                type:"POST",
                data:{"user_mobile":mobile,"code":code},
                dataType:"json",
                success:function (data) {
                    if (data.code!=10000 && data.code!=41011){
                        $("#code-msg").html('<i></i>' + data.msg + '！');
                        $('#register_msg_input').css('border','1px solid #e43a3a')
                        $("#code-msg").parent().show();
                    }else if(data.code==41011){
                        window.location.href=callback;
                    } else {
                        window.location.href="/user/toRegisterSuccess?callback="+callback;
                    }
                    if(data.code!=41001){
                        clearInterval(timer);
                        timer=null;
                    }
                },
                error:function (e) {
                    alert("注册异常");
                }
            });
        }

        function sendCode(mobile) {
            $.ajax({
                url: "/user/sendCode",
                type: "POST",
                data: {"mobile": mobile},
                dataType: "json",
                success: function (data) {
                    dataCode.push(data.errorCode);
                    console.log(data)
                    if (data.errorCode != 10000) {
                        $("#code-msg").html('<i></i>' + data.resultMsg + '！');
                        $("#code-msg").parent().show();
                    }
                    if(data.errorCode==41009||data.errorCode==41001){
                        $('#register_input_phone').css('border','1px solid #e43a3a')
                        $('.msg_get').val('免费获取验证码')
                    }else{
                        var n=60;
                        $('.msg_get').val(n + '秒后重新获取');
                        $('.msg_get').addClass('wait');
                        clearInterval(timer);
                        var timer = setInterval(function () {
                            if (n > 0) {
                                n--;
                                $('.msg_get').val(n + '秒后重新获取')
	                            $('.msg_get').addClass('wait');
                            } else {
                                clearInterval(timer)
                                $('.msg_get').val('重新获取验证码')
	                            $('.msg_get').removeClass('wait');
                            }
                        }, 1000)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求异常");
                }
            });
        }



        $('#register_input_phone').on('blur', function () {
            if (!$(this).val()) {
                $(this).css('border', '1px solid #dadada')
            }
        })

        $('.msg_get').on('click', function () {
            inputPhone = $('#register_input_phone').val();

            if (regNum.test(inputPhone) && ("重新获取验证码" == $(this).val() || "免费获取验证码"==$(this).val())) {
                sendCode(inputPhone);
                $('#register_input_phone').css('border', '1px solid #3a8be4');
                $('.phone_num').next('.error_code').hide();
                // var n = 60;
                // if(dataCode.length>=2){
                //     return;
                // }else{
                //
                // }
            } else if(!regNum.test(inputPhone)) {
                $('#register_input_phone').css('border', '1px solid #e43a3a')
                $('.phone_num').next('.error_code').show();
            }

        });

        $('#register_msg_input').on('focus', function () {
            var codeMsg = $(this).val();
            var phoneNum = $('#register_input_phone').val();
            $(this).css('border', '1px solid #3a8be4');
            if (codeMsg) {
                $('#register').addClass('canKit')

            } else {
                $('#register').removeClass('canKit')
            }

        });
        $('#register_msg_input').on('keyup', function () {
            var codeMsg = $(this).val();
            var phoneNum = $('#register_input_phone').val();
            $('.checkout_msg').next('.error_code').hide();
            $(this).css('border', '1px solid #3a8be4');
            if (codeMsg && phoneNum) {
                $('#register').addClass('canKit')
            } else {
                $('#register').removeClass('canKit')
            }
        });

        $('#register_msg_input').on('blur', function () {
            if (!$(this).val()) {
                $(this).css('border', '1px solid #dadada')
            }
        });

        $('#register').on('click', function () {
            var code = $("#register_msg_input").val();
            var phoneNum = $("#register_input_phone").val();
            var bg=$(this).hasClass('canKit');
            var bg1=$(this).val();
            // bg=='rgb(218, 218, 218) none repeat scroll 0% 0% / auto padding-box border-box'
            if (!bg) {
                return;
            }else{
                if (code && code.length == 4 && phoneNum && phoneNum != null && regNum.test(phoneNum)){
                    sendRegister(phoneNum,code);
                }else{
                    $('#register_msg_input').css('border','1px solid #e43a3a')
                    $('.checkout_msg').next('.error_code').show()
                }
            }
        })
    })()
});