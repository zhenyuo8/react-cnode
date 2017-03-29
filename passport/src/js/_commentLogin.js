/**
 * Created by Administrator on 2017/2/20.
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

    function sendCode(mobile) {
        $.ajax({
            url:"http://i.qichedaquan.com/user/jsonpCode",
            data:{"mobile":mobile},
            dataType:"jsonp",
            success:function (data) {
                if(data.errorCode!=10000){
                    $('#code_password_error').html("<p><i></i>"+data.resultMsg+"</p>");
                    $('#code_password_error').show();
                }else{

                }

                if(data.errorCode===41009||data.errorCode==41001){
                    $('#login_input').css('border','1px solid #e43a3a')
                }else{
                    var n=60;
                    $('.msg_get').val(n+'秒后重新获取');
                    $('.msg_get').css('background','#dadada');
                    $('.phone_num input').css('border','1px solid #3a8be4');
                    $('.phone_num').next('.error_code').hide();

                    timer=setInterval(function () {

                        if(n>0){
                            n--;
                            $('.msg_get').val(n+'秒后重新获取');
                            $('.msg_get').css('background','#dadada')
                        }else{
                            clearInterval(timer);
                            n=60;
                            $('.msg_get').val('获取动态密码');
                            $('.msg_get').css('background','#3a8be4')
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
        var auto=$('#auto-input').val();
        if (auto==undefined || auto==null || auto=="") {auto=0;}
        var callback=getReturnUrl();
        $.ajax({
            url:"http://i.qichedaquan.com/user/comm/login",
            data:{"mobile":mobile,"code":code,"auto":auto},
            dataType:"jsonp",
            success:function (data) {
                if (data.errorCode!=10000){
                    $('#code_password_error').html("<p><i></i>"+data.resultMsg+"</p>");
                    $('#code_password_error').show();
                }else {
                    if(callback.indexOf("%2F%2F")>=0||callback.indexOf("%2f%2f")>=0){
                            callback=decodeURIComponent(callback);
                        }
                    window.location.href=callback;
                }
            },
            error:function (e) {
                alert("请求失败");
            }
        });
       // buidPost("http://i.qichedaquan.com/user/comm/login",{"mobile":mobile,"code":code,"auto":auto,"callback":callback},"_self");
    }
    function setInputBorRed(){
        $('#js_input_account').css('border','1px solid #e43a3a');
        $('#js_account_pas').css('border','1px solid #e43a3a');
    }
    function sendLoginByPassword(mobile,password) {
        if (!password || password==null || password=="") {
            password ="";
        }
        var auto=$('#auto-input2').val();
        if (auto==undefined || auto==null || auto=="") {auto=0;}
        var callback=getReturnUrl();
       // buidPost("http://i.qichedaquan.com/user/comm/login",{"mobile":mobile,"password":password,"auto":auto,"callback":callback},"_self");
        $.ajax({
            url:"http://i.qichedaquan.com/user/comm/login",
            data:{"mobile":mobile,"password":password,"auto":auto},
            dataType:"jsonp",
            success:function (data) {
                /*
                if ("登陆失败"==data.resultMsg) {
                    data.resultMsg="账号密码错误，请重新输入！";
                }
                if (data.errorCode!=10000){
                    $('#js_password_error').html("<p><i></i>"+data.resultMsg+"</p>");
                    // 登录失败 用户名input  密码input 边框置红
                    $('#js_input_account').css('border','1px solid #e43a3a');
                    $('#js_account_pas').css('border','1px solid #e43a3a');
                    $('#js_password_error').show();
                }else {
                    if(callback.indexOf("%2F%2F")>=0||callback.indexOf("%2f%2f")>=0){
                            callback=decodeURIComponent(callback);
                        }
                    window.location.href=callback;
                }
                */
                if(data.errorCode===1000){//登录成功
                    if(callback.indexOf("%2F%2F")>=0||callback.indexOf("%2f%2f")>=0){
                            callback=decodeURIComponent(callback);
                        }
                    window.location.href=callback;
                }else if(data.errorCode===41004){// 登录失败  密码错误
                    $('#js_password_error').html("<p><i></i>请输入正确的密码！</p>");
                    $('#js_password_error').show();
                    setInputBorRed();
                }else if(data.errorCode===20000){//接口不可用
                    $('#js_password_error').html("<p><i></i>"+data.resultMsg+"</p>");
                    $('#js_password_error').show();
                }else if(data.errorCode===41012){//账号不存在
                    $('#js_password_error').html("<p><i></i>该账号不存在，请确认后输入！</p>");
                    $('#js_password_error').show();
                    setInputBorRed();
                }
            },
            error:function (e) {
                alert("请求失败");
            }
        });
    }

    var loginTab=function () {
        $('.login_menu p a').on('click',function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.login_module').eq($(this).index()).show().siblings().hide()
        })
    }
    $("#close-div").click(function () {
        $("#login_box").remove();
        $("#commLoginCss").remove();
        $("#commLoginJs").remove();
    });
    loginTab();

    $('.login_account').on('click',function () {
        if($('.login_account #js_input_account').val()!==''&&$('.login_account #js_account_pas').val()!==''){
            console.log(123)
            $('#login_imd').css('background','#ffa903')
        }
    })

    var phoneCheckoutM=(function () {
        var regNum=/^1[3|4|5|8|7][0-9]\d{8}$/;
        var regW=/\d/;
        var timer=null;
        var n=60;
        $('#login_input').after('<span class="overDelete">');
        $('#code').after('<span class="overDelete"></span></span><em></em>');
        $('#js_input_account').after('<span class="overDelete"></span></span>');
        $('#js_account_pas').after('<span class="overDelete"></span></span>');

        //判断记录账号密码

        $('#login_input').on('focus',function () {
            $(this).css('border','1px solid #3a8be4');
            $('.phone_num').next('.error_code').hide();
            if($('#code').val()==''||$('#login_input').val()==''){
                $('.login input').css('background','#dadada')
                $('#code-submit').removeClass('canKit');
            }else{
                $('.login input').css('background','#ffa903')
                $('#code-submit').addClass('canKit');
            }
            $('#login_input').on('keyup',function () {
                var  phoneNum=$(this).val();
                var lastWord=phoneNum.substr(phoneNum.length-1,1);
                if(!regW.test(lastWord)){
                    $(this).css('border','1px solid #e43a3a');
                    $('.phone_num').next('.login_msg_code').show()
                }else{
                    $(this).css('border','1px solid #3a8be4');
                    $('.phone_num').next('.login_msg_code').hide()
                }
                if(phoneNum==''){
                    $(this).siblings('em').hide();
                    $('.phone_num').next('.login_msg_code').hide()
                    $(this).css('border','1px solid #3a8be4');
                }

                if($('#code').val()==''||$('#login_input').val()==''){
                    $('.login input').css('background','#dadada')
                    $('#code-submit').removeClass('canKit');
                }else{
                    $('.login input').css('background','#ffa903')
                    $('#code-submit').addClass('canKit');
                }

                if($(this).val()){
                    $(this).siblings('em').show();
                }
                $(this).siblings('em').on('click',function () {
                    $('#login_input').val('');
                    $('.phone_num').siblings('.login_msg_code').hide();
                    $('#login_input').css('border','1px solid #dadada');
                    $(this).hide()
                })

                if(phoneNum!=''&&$('.msg_input').val()!=''){
                    $('.login input').css('background','#ffa903')
                    $('#code-submit').addClass('canKit');
                }else{
                    $('.login input').css('background','#dadada')
                    $('#code-submit').removeClass('canKit');
                }
            })
        });

        $('#login_input').on('blur',function () {
            var  phoneNum=$(this).val();
            if($('#code').val()==''||$('#login_input').val()==''){
                $('.login input').css('background','#dadada')
                $('#code-submit').removeClass('canKit');
            }else{
                $('.login input').css('background','#ffa903')
                $('#code-submit').addClass('canKit');
            }
            if(phoneNum==''){
                $(this).css('border','1px solid #dadada')
                $('.login_msg_code').hide();
            }else if(!regNum.test(phoneNum)){

            }
            if(regNum.test(phoneNum)){
                console.log('ok')
            }else{
                // $(this).css('border','1px solid #e43a3a')
            }
        });

        $('.msg_get').on('click',function () {
            $('#js_input_account').css('border','1px solid #dadada')
            if ("获取动态密码"!=$('.msg_get').val()) {
                return;
            }
            clearInterval(timer);
            //$('.msg_get').val('获取动态密码');
            // $('.msg_get').val(n+'秒后重新获取');
            var input_phone_num=$('.phone_num input').val();
            if(!(regNum.test(input_phone_num)) ){
                $('.phone_num').next('.error_code').show();
                $('#login_input').css('border','1px solid #e43a3a');
                return false;
            }else{
                sendCode(input_phone_num);

            }
        })
        $('#code').on('focus',function () {
            $(this).css('border','1px solid #3a8be4');
            $('#code_password_error').hide()
            $(this).parent().next('li').hide();
            if($(this).val()==''||$('#login_input').val()==''){
                $('.login input').css('background','#dadada')
                $('#code-submit').removeClass('canKit');
            }else{
                $('.login input').css('background','#ffa903')
                $('#code-submit').addClass('canKit');
            }
        });
        $('#code').on('blur',function () {
            $(this).parent().next('li').hide();
            if($(this).val()==''||$('#login_input').val()==''){
                $(this).css('border','1px solid #dadada');
                $('#code-submit').css('background','#dadada')
                $('#code-submit').removeClass('canKit');
            }else{
                $('#code-submit').css('background','#ffa903')
                $('#code-submit').addClass('canKit');
            }
        });
        $('#code').on('keyup',function () {
            $(this).css('border','1px solid #3a8be4');
            if($(this).val()!==''){
                $(this).siblings('em').show()
            }else{
                $(this).siblings('em').hide();
            }
            if($(this).val()!=''&&$('#login_input').val()!=''){
                console.log(12)
                $('#code-submit').css('background','#ffa903');
                $('#code-submit').addClass('canKit');

            }else{
                $('#code-submit').css('background','#dadada')
                $('#code-submit').removeClass('canKit');
            }
        });
        $('#code').siblings('em').on('click',function () {
            $('#code').val('');
            $(this).hide();
        })
        $('#code-submit').on('click',function () {
            var code = $("#code").val();
            var login_input_val=$('#login_input').val();
            if(undefined ==code || code==null ||code.length!=4){
                $(this).parent().next('li').hide()
                return;
            }
            if(login_input_val&&regNum.test(login_input_val) && code.length==4){
                sendLoginByCode(login_input_val,code);
            }else{
                if($(this).hasClass('canKit')){
                    $('#code').css('border','1px solid #e43a3a');
                    $('#login_input').css('border','1px solid #e43a3a')
                    $('#code_password_error').show()
                }

            }

        })

    })();


    var accountLoginCheck=(function () {
        var regNum=/^1[3|4|5|8|7][0-9]\d{8}$/;
        var regW=/\d/;
        var passwordStr='';
        var accountVal,accountPas,starCon;
        $('#js_input_account').on('focus',function () {
            $('#js_password_error').hide();
            $(this).css('border','1px solid #3a8be4');
            // 密码input 置灰  隐藏掉提示信息
            $('#js_password_error').css('display','none').html('');
            $('#js_account_pas').css('border','1px solid #dadada')
            $(this).on('keyup',function () {
                var account=$(this).val();

                //校验账号输入框和密码输入框是否有值，有则让‘立即登录’按钮高亮，否则置灰
                if($(this).val()&&$('#js_account_pas').val()){
                    $('#login_imd').css('background','#ffa903')
                }else{
                    $('#login_imd').css('background','#dadada')
                }
                //判断input框值是否为空，不是则让删除按钮显示，否则隐藏
                if($(this).val()){
                    $(this).next('em').css('display','inline-block')
                    $(this).css('border','1px solid #3a8be4');
                }else{
                    $(this).next('em').css('display','none')
                    $(this).css('border','1px solid #3a8be4');
                }

                //点击删除按钮，清空input框的内容，自身隐藏
                $(this).next('em').on('click',function () {
                    $('#js_input_account').val('');
                    accountVal='';
                    accountPas='';
                    starCon='';
                    $('#js_input_account').css('border','1px solid #dadada')
                    $(this).hide()
                });

                //校验输入的是否为纯数字字符，不是则input框为红色
                // if(!regW.test(account.slice(account.length-1))){
                //     $(this).css('border','1px solid #e43a3a');
                // }else{
                //     $(this).css('border','1px solid #3a8be4');
                // }
            })
        });

        //input失去焦点将，如果input框中无内容，则让input边框为#dadada初始化颜色，如果不为空，则为#3a8be4
        $('#js_input_account').on('blur',function () {
            accountVal=$(this).val();
            if($(this).val()==''){
                passwordStr=[];
                $(this).css('border','1px solid #dadada')
                $(this).next('em').hide();
                $(this).next('span').show();
            }else if(regNum.test($(this).val())){
                $(this).css('border','1px solid #3a8be4');
            }
        });

        $('#js_input_account').on('keyup',function () {
            if($(this).val()!==''){
                $(this).siblings('em').show()
            }else{
                $(this).siblings('em').hide()
            }
        });
        $('#js_input_account').siblings('em').on('click',function () {
            $(this).hide();
            $('#js_input_account').val('');
            $('#js_input_account').css('border','1px solid #dadada')
        })


        //    密码输入验证
        $('#js_account_pas').on('focus',function () {
            $(this).css('border','1px solid #3a8be4');
            //用户名输入框置灰  隐藏掉提示
            $('#js_password_error').css('display','none').html('');
            $('#js_input_account').css('border','1px solid #dadada');
            $(this).on('keyup',function () {
                accountPas=$(this).val();
                //校验账号输入框和密码输入框是否有值，有则让‘立即登录’按钮高亮，否则置灰
                if(regNum.test($('#js_input_account'))){

                }else{

                }
                if($(this).val()&&$('#js_input_account').val()){
                    $('#login_imd').css('background','#ffa903');
                    $('#login_imd').addClass('canKit');
                }else{
                    $('#login_imd').css('background','#dadada')
                    $('#login_imd').removeClass('canKit')
                }
            })
        });
        $('#js_account_pas').on('blur',function () {
            if($(this).val()==''){
                $(this).css('border','1px solid #dadada')
            }
        })

        //点击立即登录按钮，校验输入的密码是否正确
        $('#login_imd').on('click',function () {
            accountVal= $('#js_input_account').val();
            accountPas=$('#js_account_pas').val();

            if(accountVal && regNum.test(accountVal)){
                sendLoginByPassword(accountVal,accountPas);
            }else{
                $('#js_account_pas').css('border','1px solid #e43a3a');
                $('#js_input_account').css('border','1px solid #e43a3a');
                $('#js_password_error').show();
            }
        })




        //    明码显示
        $("#js_account_pas").siblings('em').on('click',function (e) {
            var type=$("#js_account_pas").attr("type");
            if("text"==type){
                $(this).addClass('show').removeClass('hide')
                $("#js_account_pas").attr("type","password");
            }else{
                $("#js_account_pas").attr("type","text");
                $(this).addClass('hide').removeClass('show')
            }
        });
    })()


    var loginNext=(function () {
        $('.login_auto span').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if(tar.tagName=='I'){
                $(tar).hide()
                $("#auto-input").val(0);
                $("#auto-input2").val(0);
            }else{
                $(this).children('i').show();
                $("#auto-input").val(1);
                $("#auto-input2").val(1);
            }

        })
    })()

});