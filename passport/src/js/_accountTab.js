/**
 * Created by Administrator on 2017/2/16.
 */
$(document).ready(function () {


    var timer;
    var regCode=/^\d{4}$/;
    var regPassword=/^[0-9a-zA-Z]{6,16}$/;
    var realMobile = $('#realMobile').val();
    var wrongCode = $("#error_wrong");
    var codeSendFlag = $("#code_send_flag");
    //判断input是否有值，让保存设置按钮高亮或置灰
    $('#mycode').on('keyup',function () {
        wrongCode.empty();
        wrongCode.hide();
        var code=$('#mycode').val().trim();
        if(null!=code&&''!=code){
            $('#nex-update').css('background','#3a8be4');
            $('#modify_flag').val('1');
        }else{
            $('#nex-update').css('background','#dadada');
            $('#modify_flag').val('0');
        }
    });
    $('#mycode').on('focus',function () {
        $('#mycode').css('border','1px solid #3a8be4');
    });

    //判断input是否有值，让保存设置按钮高亮或置灰
    $('#two-password,#one-password').on('keyup',function () {
        var onePassword=$('#one-password').val().trim();
        var twoPassword=$('#two-password').val().trim();
        if(null!=onePassword&&''!=onePassword&&null!=twoPassword&&''!=twoPassword){
            $('#js_save_settings').css('background','#ffa903');
            $('#modify_flag').val('1');
        }else{
            $('#js_save_settings').css('background','#dadada');
            $('#modify_flag').val('0');
        }
    })

    var findPassword=(function () {
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
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alert("请求异常");
                }
            });
        }
        $("#stay_here").click(function () {
            $("#js_modify_password_success").hide();
        });
        $("#nex-update").click(function () {
            var modifyFlag = $('#modify_flag').val();
            if('0'==modifyFlag){
                return;
            }
            var code=$('#mycode').val();
            if(code && regCode.test(code)){
                checkCode(realMobile,code);
                $('#modify_flag').val('0');
                $('#nex-update').css('background','#dadada');
            }else {
                wrongCode.empty();
                wrongCode.html('验证码格式错误');
                wrongCode.show();
                $('#modify_flag').val('0');
                $('#nex-update').css('background','#dadada');
            }
        });
        $(".form_div_new_code_success li input").focus(function () {
            $("#error_msg1").hide();
            $("#error_msg").hide();
            $("#error_msg_log").hide();
        });
        $("#js_save_settings").click(function () {
            if(0==$('#modify_flag').val()){
                return;
            }
            var onePassword=$("#one-password").val();
            var twoPassword=$("#two-password").val();
            if(!onePassword || !regPassword.test(onePassword)){
                $("#error_msg1").show();
                return;
            }else {
                $("#error_msg1").hide();
            }
            if (onePassword!=twoPassword){
                $("#error_msg").show();
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
                        var n=5;
                        timer=setInterval(function () {
                            if(n>0){
                                n--;
                                $('#js_select_button span').text('('+n+'S'+')')
                            }else{
                                clearInterval(timer);
                                //不操作即留在当前页面
                                $("#js_modify_password_success").hide();
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
                $('#error-code').html("<p><i></i>验证码有误！</p>");
                $('#error-code').show();
                $('#mycode').css('border','1px solid #e43a3a');
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
                    alert("请求异常");
                }
            });
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
            codeSendFlag.val('0');
            var n=60;
            $('.msg_get').val(n+'秒后重新获取');
            $('.msg_get').css('background','#dadada');
            clearInterval(timer);
            var timer=setInterval(function () {
                if(n>0){
                    n--;
                    $('.msg_get').val(n+'秒后重新获取');
                    $('.msg_get').css('background','#dadada')
                }else{
                    codeSendFlag.val('1');
                    clearInterval(timer);
                    $('.msg_get').val('获取动态密码');
                    $('.msg_get').css('background','#3a8be4')
                }
            },1000);
            sendCode(realMobile);


        });
    })()

    var tabAccount=(function () {
        //左边按钮tab切换交互
        $('.left_tab_menu ul li').on('click',function () {
            $(this).addClass('bg').siblings().removeClass('bg')
        });
    })();

    //进入个人中心将用户名赋值给个人信息的用户名

    //将手机号码中间四位隐藏
    var hidePhone4=(function () {
            var curNum=$('#phone_con').text();
            var curNumS='';
            $('.bind_phone').hide();
            $('.bind_phone_already').show();
            curNumS=curNum.slice(0,3)+curNum.slice(3,7).replace(/\d/g,'*')+curNum.slice(7,11);
            $('#phone_con').text(curNumS)


    })();
    var myCollectTab=(function () {
        $('#js_account_tab li').on('click',function () {
            $(this).children('a').addClass('active');
            $(this).siblings().children('a').removeClass('active')
            $('#js_account_con .js_content').eq($(this).index()).show().siblings().hide()
        })
    })()
    var goToModifyMessage=(function () {
        var userReg=/^[\u4E00-\u9FA5A-Za-z0-9_]+$/ig;
        $('#go_to_modify_message').on('click',function () {
            $('#home_page_message').hide();
            $('#modify_message').show();
        });

        $('.save_cancel_settings .save').on('click',function () {
            var modifyFlag = $('#modify_flag').val();
            if(modifyFlag==0){
                return false;
            }
            var userId=$('#user_id').val();
            var nickName=$('#user_nickname').val().trim();
            var userSign=$('#user_realname').val().trim();
            var userGender=$('#user_gender').val().trim();
            var userAge=$('#user_age').val();
            if(userGender=="男"){
                userGender = 1;
            }else if(userGender=="女"){
                userGender = 2;
            }else{
                alert('性别信息错误');
                return;
            }
            sendModifyUser(userId,nickName,userSign,userGender,userAge);
        })
        $('.save_cancel_settings .cancel').on('click',function () {
            $('#home_page_message').show();
            $('#modify_message').hide();
        })

        $('.msg_input').on('keyup',function () {
            if( $('.msg_input').val()){
                $('#nex-update').css('background','#ffa903')
            }
        })

        // $('#nex-update').on(if())
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
                        $('.get_msg_code').val('请重新获取验证码')
                        $('.get_msg_code').css('background','#3a8be4')
                    }
                },1000)

            })

            //    点击保存绑定的手机号码，切换到只读模块，显示更换手机按钮
            $('#save_step').on('click',function () {
                var curNum=$('#js_bind_phone').val();
                console.log(curNum)
                $('.bind_phone').hide();
                $('.bind_phone_already').show();
                $('#phone_con').text(curNum)

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
    function sendModifyUser(userId,nickName,realName,userGender,userAge){
        $.ajax({
            url:"/personal/ajax/modifyUserInfo",
            type:"POST",
            data:{"user_id":userId,"user_nickname":nickName,"user_realname":realName,"user_gender":userGender,"user_age":userAge},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    alert(data.resultMsg);
                    $('#modify_flag').val('0');
                }else{
                    //修改成功
                    $('.js_nick_name span').text(nickName);
                    $('.js_true_name span').text(realName);

                    $('.js_sex span').text(userGender==1?'男':'女');
                    $('.js_age span').text(userAge);


                    $('#modify_message').hide();
                    $('#home_page_message').show();
                    $('#modify_flag').val('0');
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }
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
        $('#modify_flag').val('1');
        $('.save_cancel_settings .save').css('background','#ffa903');
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
            $('#modify_flag').val('1');
            $('.save_cancel_settings .save').css('background','#ffa903');
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

//    修改个人资料
    var personalFileChange=(function () {
        var oldName=$('#user_nickname').val();
        var oldReal=$('#user_realname').val();
        var oldSex=$('#user_gender').val();
        var oldAge=$('#user_age').val();

        $(document).on('keyup',function () {
            var curName=$('#user_nickname').val();
            var curReal=$('#user_realname').val();
            var curSex=$('#user_gender').val();
            var curAge=$('#user_age').val();
            if(curName!=oldName||curReal!=oldReal||curAge!=oldAge||curSex!=oldSex){
                $('.save_cancel_settings .save').css('background','#ffa903');
            }else{
                $('.save_cancel_settings .save').css('background','#dadada');
            }
        })
        $(document).on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var curName=$('#user_nickname').val();
            var curReal=$('#user_realname').val();
            var curSex=$('#user_gender').val();
            var curAge=$('#user_age').val();
            if(tar.id!=='user_gender'){
                $('#select_span_sex').hide();
            }
            if(tar.id!=='user_age'){
                $('#select_span_age').hide();
            }

            if(curName!=oldName||curReal!=oldReal||curAge!=oldAge||curSex!=oldSex){
                $('.save_cancel_settings .save').css('background','#ffa903');
            }else{
                $('.save_cancel_settings .save').css('background','#dadada');
            }
        })
    })()
});
