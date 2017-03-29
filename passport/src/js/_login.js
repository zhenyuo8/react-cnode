/**
 * Created by Administrator on 2017/2/21.
 */
$(document).ready(function () {
    function getQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return "http://www.qichedaquan.com";
    }
    function getReturnUrl()
    {
        var returnUrl=$("#returnUrl").val();
        if(undefined!=returnUrl && returnUrl!=null && ""!=returnUrl)return  returnUrl; return "http://www.qichedaquan.com";
    }
    function getCallBackUrl(name) {
        var r=window.location.search;
        var back=r.substr(r.lastIndexOf(name)+name.length+1);
        if (back!=null && undefined!=back && back!="")return back;
        return "http://www.qichedaquan.com";
    }
    function checkUser(mobile) {
        $.ajax({
            url:"/user/check",
            type:"POST",
            data:{"mobile":mobile},
            dataType:"json",
            success:function (data) {
                if(data.errorCode==10000){
                    $("#js_password_error2").html('<i></i>该账号不存在，请确认后输入！');
                    $("#js_password_error2").show();
                    $('#js_input_account').css('border','1px solid #e43a3a');
                }else {
                    $('#js_input_account').css('border','1px solid #3a8be4');
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

    var phoneCheckoutM=(function () {
        var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
        var regW=/\d/;
        var timer;
        var dataCode=[];
        var errorOver;
        $('#login_input').on('focus',function () {
            $(this).css('border','1px solid #3a8be4');
            $('.phone_num').next('.error_code').hide()
            $('#login_input').on('keyup',function () {
                var  phoneNum=$(this).val();
                var lastWord=phoneNum.substr(phoneNum.length-1,1);
                if(!regW.test(lastWord)){
                    $(this).css('border','1px solid #e43a3a');
                    $('.phone_num').next('.login_msg_code').show()
                    // $('.login_msg_code').show();
                }else{
                    $(this).css('border','1px solid #3a8be4');
                    $('.phone_num').next('.login_msg_code').hide()
                }
                if(phoneNum==''){
                    $(this).next('em').hide();
                    $('.phone_num').next('.login_msg_code').hide()
                    $(this).css('border','1px solid #3a8be4');
                }

                if($(this).val()){
                    $(this).next('em').css('display','inline-block')
                }
                $(this).next('em').on('click',function () {
                    $('#login_input').val('');
                    $('.phone_num').next('.login_msg_code').hide()
                    $('#login_input').css('border','1px solid #dadada');
                    $(this).hide()
                })

                if(phoneNum!=''&&$('.js_msg_input').val()!=''){
                    $('.login input').addClass('canKit')
                }else{
                    $('.login input').removeClass('canKit')
                }
            })
        });

        $('#login_input').on('blur',function () {
            var  phoneNum=$(this).val();
            if(phoneNum==''){
                $(this).css('border','1px solid #dadada')
                $('.login_msg_code').hide();
            }else if(!regNum.test(phoneNum)){

            }
            if(regNum.test(phoneNum)){


            }else{
                // $(this).css('border','1px solid #e43a3a')
            }
        });

        $('.msg_get').on('click',function () {
            var input_phone_num=$('.phone_num input').val();
            if(!(regNum.test(input_phone_num)) ){
                $('.phone_num').siblings('.login_msg_code').show();
                $('.phone_num input').css('border','1px solid #e43a3a');
                $('#js_password_error2').hide();
                $('#js_input_account').css('border','1px solid #dadada')
                return false;
            }else if ("重新获取动态密码"==$(this).val() || "获取动态密码"==$(this).val()){
                var n=60;
                sendCode(input_phone_num);
                $('.phone_num input').css('border','1px solid #3a8be4');
                $('.phone_num').siblings('.login_msg_code').hide();
                // if(dataCode.length>=2){
                //     return;
                // }else{
                //
                // }
            }
        })

        $('.js_msg_input').on('focus',function () {
            if(!regNum.test($('#login_input').val())){
                $(this).parent().siblings('.login_msg_code').show();
                $('#login_input').css('border','1px solid #e43a3a')
            }
            $(this).css('border','1px solid #3a8be4');
            $(this).parent().next('li').hide();
        });
        var html_em=document.createElement('em')
        $('.js_msg_input').on('keyup',function () {
            $(this).css('border','1px solid #3a8be4');
            if($(this).val()!=''&&$('#login_input').val()!=''){
                $('.checkout_msg em').show()
                if($('.checkout_msg em')){
                    $('.checkout_msg em').show()
                }else{
                    $('.checkout_msg').append(html_em)
                }
                $('.login input').addClass('canKit')
            }else{
                $('.login input').removeClass('canKit')
	            $('.checkout_msg em').hide();
            }
        });
        $(".checkout_msg em").on('click',function () {
            $('.js_msg_input').val('');
            $(this).hide();
	        $('.login input').removeClass('canKit')
        })


        $('.js_msg_input').on('keydown',function () {
            $(this).css('border','1px solid #3a8be4');
        });

        $('.login input').on('click',function () {
            var id=$(this).attr("id");
            var bg=$(this).hasClass('canKit');
            // var bg=$(this).css('background');
            if (!bg) {
                return;
            }else {
                if(id==null || id==undefined || id==""){
                    var login_input_val=$('#login_input').val();
                    var code = $("#code").val();
                    if (login_input_val==null || undefined==login_input_val || login_input_val=="") {
                        $("#login-msg").parent().show();
                        // $('#js_input_account').css('border','1px solid #e43a3a');
                        $('#js_account_pas').css('border','1px solid #e43a3a');
                        return ;
                    }
                    if(code.length!=4){
                        $("#code-msg").parent().show();
                        $("#code").css('border','1px solid #e43a3a')
                        $('.login input').removeClass('canKit')
                        return;
                    }
                    if(login_input_val &&regNum.test(login_input_val)){
                        sendLoginByCode(login_input_val,code);
                    }else{
                        // $('.phone_num').next('.login_msg_code').show()
                        $("#code-msg").parent().show();
                        $("#login_input").css('border','1px solid #e43a3a');
                        $("#code").css('border','1px solid #e43a3a');
                        $("#code-msg").html('<i></i>请输入正确的手机号或动态密码！');
                    }
                }
            }

        })

        function sendCode(mobile) {

            $.ajax({
                url:"/user/sendCode",
                type:"POST",
                data:{"mobile":mobile},
                dataType:"json",
                success:function (data) {
                    console.log(data)
                    dataCode.push(data.errorCode);
                    errorOver=data.errorCode;
                    if(data.errorCode!=10000){
                        $("#login-msg").html('<i></i>'+data.resultMsg+'！');
                        $("#login-msg").parent().show();
                    }
                    if(data.errorCode==41009||data.errorCode==41001){
                        $('#login_input').css('border','1px solid #e43a3a');
                        // timer=null;
                        clearInterval(timer);
                        // $('.msg_get').val('重新获取动态密码');
                        $('.msg_get').removeClass('wait');
                    }else{
                        var n=60;
                        $('.msg_get').addClass('wait');
                        $('.msg_get').val(n+'秒后重新获取');
                        clearInterval(timer);
                        timer=setInterval(function () {
                            if(n>0){
                                n--;
                                $('.msg_get').val(n+'秒后重新获取');
                                $('.msg_get').addClass('wait');
                            }else{
                                clearInterval(timer);
                                $('.msg_get').val('重新获取动态密码');
                                $('.msg_get').removeClass('wait');
                            }
                        },1000)
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alert("请求异常");
                }
            });
        }

        function sendLoginByCode(mobile,code) {
            if (!code || code==null || code=="") {
                code ="";
            }
            var callback=getCallBackUrl("callback");
            var auto=$("#auto-input").val();
            //buidPost("/user/sendLogin",{"mobile":mobile,"code":code,"callback":callback});
            $.ajax({
                url:"/user/sendLogin",
                type:"POST",
                data:{"mobile":mobile,"code":code,"auto":auto},
                dataType:"json",
                success:function (data) {
                    if(data.resultMsg=="登录失败"){
                        data.resultMsg="请输入正确的账号或密码";
                    }
                    if(data.resultMsg=="验证码错误"){
                        data.resultMsg="请输入正确的动态密码";
                    }
                    if(data.errorCode!=10000 && data.errorCode!=41004){
                        $("#code-msg").html('<i></i>'+data.resultMsg+'！');
                        $("#code-msg").parent().show();
                    }else{
                        if(callback.indexOf("%2F%2F")>=0||callback.indexOf("%2f%2f")>=0){
                            callback=decodeURIComponent(callback);
                        }
                        window.location.href=callback
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alert("请求异常");
                }
            });
        }

    })();


    var checkoutPhone=(function () {
        var regNum=/^1[3|4|5|8][0-9]\d{4,8}$/;
        var regWord=/[A-Za-z\u4E00-\u9FA5]/ig;
        $('.login_account').on('click',function () {
            if($('#js_input_account').val()&&$('#js_account_pas').val()){
                $('#login_imd').addClass('canKit')
            }else{
                $('#login_imd').removeClass('canKit')
            }
        })
    })();

    var accountLoginCheck=(function () {
        var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
        var regW=/\d/g;
        var passwordStr='';
        var accountVal,accountPas,starCon;
        // var noD=//;
        $('#js_input_account').on('focus',function () {
            $('#js_password_error').hide();
            $('#js_password_error2').hide();
            $("#js_password_error2").html('<i></i>请输入正确的手机号码');
            $(this).css('border','1px solid #3a8be4');
            $("#js_input_account").css('border','1px solid #edadada');
            $('#js_account_pas').css('border','1px solid #dadada');
        });
        $('#js_input_account').on('keyup',function () {
            var account=$(this).val();
            //校验账号输入框和密码输入框是否有值，有则让‘立即登录’按钮高亮，否则置灰
            if($(this).val()&&$('#js_account_pas').val()){
                $('#login_imd').addClass('canKit')
            }else{
                $('#login_imd').removeClass('canKit')
            }
            //判断input框值是否为空，不是则让删除按钮显示，否则隐藏
            if($(this).val()){
                $(this).next('em').css('display','inline-block')
                $(this).css('border','1px solid #3a8be4');
            }else{
                $(this).next('em').css('display','none')
                $(this).css('border','1px solid #3a8be4');
            }
            if($(this).val()){
                if(!regW.test($(this).val())){
                    console.log('ok')
                    $('#js_password_error2').show();
                    $(this).css('border','1px solid #e43a3a')
                    // $('#js_input_account').css('border','1px solid #e43a3a');
                }else {
                    $('#js_password_error2').hide();
                    // $('#js_input_account').css('border','1px solid #389be4');
                }
            }else{
                $(this).next('em').css('display','none')
                $(this).css('border','1px solid #3a8be4');
            }
            // if(!regW.test($(this).val())){
            //     console.log('ok')
            //     $('#js_password_error2').show();
            //     $(this).css('border','1px solid #e43a3a')
            //     // $('#js_input_account').css('border','1px solid #e43a3a');
            // }else {
            //     $('#js_password_error2').hide();
            //     // $('#js_input_account').css('border','1px solid #389be4');
            // }
            // if($(this).val()&&regW.test($(this).val())){
            //     $(this).next('em').css('display','inline-block')
            //     $(this).css('border','1px solid #e43a3a');
            // }else{
            //     $(this).next('em').css('display','none')
            //     $(this).css('border','1px solid #3a8be4');
            // }



            //点击删除按钮，清空input框的内容，自身隐藏
            $(this).next('em').on('click',function () {
                $('#js_input_account').val('');
                $('#js_password_error2').hide();
                $('#register').removeClass('canKit')
                accountVal='';
                accountPas='';
                starCon='';
                $('#js_input_account').css('border','1px solid #dadada')
                $(this).hide()
            });
        })

        //input失去焦点将，如果input框中无内容，则让input边框为#dadada初始化颜色，如果不为空，则为#3a8be4
        $('#js_input_account').on('blur',function () {
            accountVal=$(this).val();
            if($(this).val()==''){
                passwordArr=[];
                $(this).css('border','1px solid #dadada')
                $(this).next('em').hide();
                $(this).next('span').show();
            }else if(regNum.test(accountVal)){
                checkUser(accountVal);
            }
        })


        //    密码输入验证
        $('#js_account_pas').on('focus',function () {
            $(this).css('border','1px solid #3a8be4');
            if(!regNum.test($('#js_input_account').val())){
                // $('#login_imd').css('background','#ffa903');
                $('#js_input_account').css('border','1px solid #e43a3a');
                $('#js_password_error2').show()

            }else{
                $('#login_imd').removeClass('canKit')
                $('#js_password_error2').hide()
            }
            $(this).on('keyup',function () {
                accountPas=$(this).val();
                //校验账号输入框和密码输入框是否有值，有则让‘立即登录’按钮高亮，否则置灰
                if($(this).val()&&$('#js_input_account').val()){
                    $('#login_imd').addClass('canKit')

                }else{
                    $('#login_imd').removeClass('canKit')
                }
            })
        });
        $('#js_account_pas').on('blur',function () {
            if($(this).val()==''){
                $(this).css('border','1px solid #dadada')
            }
        });



        //点击立即登录按钮，校验输入的密码是否正确
        $('#login_imd').on('click',function () {
            accountVal= $('#js_input_account').val();
            accountPas=$('#js_account_pas').val();
            // var bg=$(this).css('background');
            var bg=$(this).hasClass('canKit');
            if (!bg) {
                return;
            }else{
                if (accountVal && regNum.test(accountVal) && accountPas!=undefined && accountPas!=null && accountPas!="") {
                    sendLoginByPassword(accountVal,accountPas);
                }else{
                    //$("#login-msg-pwd").html('<i></i>'+data.resultMsg+'！');
                    if(accountVal==''||accountPas==''){
                        return
                    }else {
                        $("#login-msg-pwd").parent().show();
                        $("#login-msg-pwd").html('<p id="login-msg-pwd"><i></i>请输入正确的账号或密码</p>');
                        $(this).parent('.phone_num').siblings('.login_msg_code').show()
                        // $('.phone_num').siblings('.login_msg_code').show();
                        $('#js_account_pas').css('border','1px solid #e43a3a');
                        $('#js_input_account').css('border','1px solid #e43a3a');
                    }
                }
            }

        });




        //    明码显示
        $("#js_account_pas").next('em').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if($(this).hasClass('hide')){
                $("#js_account_pas").attr("type","text");
                $(this).removeClass('hide').addClass('show')
            }else if($(this).hasClass('show')){
                $(this).removeClass('show').addClass('hide');
                $("#js_account_pas").attr("type","password");
            }
        });

        function sendLoginByPassword(mobile,password) {
            if (!password || password==null || password=="") {
                password ="";
            }
            var callback=getCallBackUrl("callback");
            var auto=$("#auto-input").val();
            // buidPost("/user/sendLogin",{"mobile":mobile,"password":password,"callback":callback});
            $.ajax({
                url:"/user/sendLogin",
                type:"POST",
                data:{"mobile":mobile,"password":password,"auto":auto},
                dataType:"json",
                success:function (data) {
                    if(data.resultMsg=="登录失败"){
                        data.resultMsg="请输入正确的账号或密码";
                    }
                    if(data.errorCode!=10000 && data.errorCode!=41004){
                        $("#login-msg-pwd").html('<p id="login-msg-pwd"><i></i>请输入正确的账号或密码</p>');
                        $("#login-msg-pwd").parent().show();
                        $('.phone_num').next('.login_msg_code').show();
                        $('#js_input_account').css('border','1px solid #e43a3a');
                        $('#js_account_pas').css('border','1px solid #e43a3a');
                    }else if(data.errorCode!=10000){
                        console.log(data)
                        $("#login-msg-pwd").html('<i></i>'+data.resultMsg+'！');
                        $("#login-msg-pwd").parent().show();
                        $('.phone_num').next('.login_msg_code').show();
                        $('#js_input_account').css('border','1px solid #e43a3a');
                        $('#js_account_pas').css('border','1px solid #e43a3a');
                    }else{
                        if(callback.indexOf("%2F%2F")>=0||callback.indexOf("%2f%2f")>=0){
                            callback=decodeURIComponent(callback);
                        }
                        window.location.href=callback;
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    alert("请求异常");
                }
            });
        }

    })()
});
