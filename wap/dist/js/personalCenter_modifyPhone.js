(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
    var regCode=/(\d){4}/;
    var regNum=/^1[3|4|5|7|8][0-9]\d{8}$/;
    var realMobile = $('#realMobile').val();

    var modifyPhone=(function(){
        if(''!=realMobile&&null!=realMobile){
            var displayMobile = realMobile.substr(0, 3) + '****' + realMobile.substr(7);
            $('#oldPhone').html(displayMobile);
        }
        $('#get_msg_code').on('click',function () {
            var n = 60;
            var sendCodeMobile = realMobile;
            var sendResult = sendCode(sendCodeMobile);
            var yzmVal=$(".get_code").text();
            if(yzmVal != "重新获取验证码" && yzmVal != "获取验证码"){ return; }
            if(1==sendResult) {
                $('.get_code').text(n + 'S后重新获取');
                $('.get_code').css('color',"#d8d8d8").css('borderColor',"#d8d8d8");
                clearInterval(timer);
                var timer = setInterval(function () {
                    if (n > 1) {
                        n--;
                        $('.get_code').text(n + 'S后重新获取');
                    } else {
                        clearInterval(timer);
                        $('.get_code').text('重新获取验证码');
                        $('.get_code').css('color',"#2799fe").css('borderColor',"#2799fe");
                    }
                }, 1000);
            }
        });
        // 验证码input框事件
        $('#yzm_input').on('focus',function(){
            $('.yzm_error').hide();
        });
        $('#yzm_input').on('input',function(){
            if($(this).val() != ''){
                $(this).siblings('em').show();
                if($(this).val().length == 4){
                    $("#js_next_step").find("span").css("backgroundColor","#2799fe");
                }else{
                    $("#js_next_step").find("span").css("backgroundColor","#a9d5ff");
                }
            }else{
                $(this).siblings('em').hide();
            }
        });
        $("#delYzm").on("click",function(){
            $(this).hide();
            $("#yzm_input").val('');
            $("#js_next_step").find("span").css("backgroundColor","#a9d5ff");
        })
        $("#js_next_step").click(function () {
            var code=$('#yzm_input').val();
            if(null==code||''==code){
                return false;
            }
            if(code && regCode.test(code)){
                checkCode(realMobile,code);
            }else {
                $('.yzm_error').html('验证码格式错误<strong></strong>');
				$('.yzm_error').show();
            }
        });
        function checkCode(mobile,code) {
            $(".load_mask").show();
            $.ajax({
                url:" /user/checkCode",
                data:{"mobile":mobile,"code":code},
                dataType:"json",
                type:"POST",
                success:function(data){
                    $(".load_mask").hide();
                    if(data.errorCode!=10000){
                         $('.yzm_error').html(data.resultMsg+'<strong></strong>');
						 $('.yzm_error').show();
                    }else {
                        window.location.href="/personal/personalCenterModifyPhoneNewNumber";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    $(".load_mask").hide();
                    alertDiv({type:"2",des:"操作异常，请稍后再试！",time:"3000",fn:function(){}});
                }
            });
        }

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
                        $('.yzm_error').html(data.resultMsg+'<strong></strong>');
						$('.yzm_error').show();
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

    })()
})

},{}]},{},[1])