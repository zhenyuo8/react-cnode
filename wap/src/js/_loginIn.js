/*****
 *@author: linyh
 *@from: Global style loginIn(登录)
 *@description: 陈璐
 *@date: name (2017.03.04)
 */



$(function(){

    /**
     * 获取callBack
     * @param name
     * @returns {*}
     */
    function getCallBackUrl(name) {
        var r=window.location.search;
        var back=r.substr(r.lastIndexOf(name)+name.length+1);
        if (back!=null && undefined!=back && back!="")return back;
        return "http://m.qichedaquan.com";
    }

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
                    $('#get_yzm').text(n+'S后重新获取');
                    $('#get_yzm').css('color',"#d8d8d8");
                    clearInterval(timer);
                    var timer=setInterval(function(){
                        if(n>1){
                            n--;
                            $('#get_yzm').text(n+'S后重新获取');
                        }else {
                            clearInterval(timer)
                            $('#get_yzm').text('重新获取验证码');
                            $('#get_yzm').css('color',"#2799fe");
                        }
                    },1000)
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
            }
        });
    }

    /**
     * 动态密码登陆
     * @param mobile
     * @param code
     */
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
            data:{"mobile":mobile,"code":code,"auto":0},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000 && data.errorCode!=41004){
                    alertDiv({type:"2",des:"登陆失败",time:"3000",fn:function(){}});
                }else{
                    window.location.href=callback
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
            }
        });
    }
    //账号密码登陆
    function sendLoginByPassword(mobile,password) {
        if (!password || password==null || password=="") {
            password ="";
        }
        var callback=getCallBackUrl("callback");
        var auto=$("#auto-input").val();
        $.ajax({
            url:"/user/sendLogin",
            type:"POST",
            data:{"mobile":mobile,"password":password,"auto":0},
            dataType:"json",
            success:function (data) {
                 if(data.errorCode!=10000){
                     alertDiv({type:"2",des:data.resultMsg,time:"3000",fn:function(){}});
                }else{
                    window.location.href=callback;
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
            }
        });
    }

  /*tab切换*/
    // 为tab选项卡导航每个选项绑定点击事件
    navBindClick();
    function navBindClick(){
        var $newsTabList = $(".tab_title li");
        $newsTabList.each(function(item){
            $(this).bind("click",function(){
                clickNavItem(this);
            });
        });
    }
    function clickNavItem(currentNav){
        var tabindex = $(currentNav).index();
        var $swipeBox = $(currentNav).parents(".tab_title").siblings('.input_module');
        var windowW = $(window).width();

        $(currentNav).find("a").addClass('current');
        $(currentNav).siblings('li').find("a").removeClass('current');

        $swipeBox.animate({
            'left': -tabindex*windowW+'px'
        },500);

        $swipeBox.height($swipeBox.find(".login_swiper").eq(tabindex).height());
    }


    var regCode=/(\d){4}/;
    var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
    // 动态密码登入
    // 获取焦点
    var loginByM=(function(){
        $('#phone_input').on('focus',function(){
            $('.phone_error').hide();
        })
        $('#phone_input').on('input',function(){
            var phone_num=$(this).val();
            if(phone_num.length < 11){
                $('#get_yzm').css('color',"#d8d8d8");
                if(phone_num.length == 0){
                    $(this).parent().children('.delete_phone_num').show();
                }
            }else if(phone_num.length == 11){
                $('#get_yzm').css('color',"#279ffe");
            }
        })

        $('.delete_phone_num').on('click',function(){
            $(this).hide();
            $(this).siblings('#phone_input').val('');
            $(this).siblings('#account_input').val('');
            $('#get_yzm').css('color',"#d8d8d8");
        })

        // 获取验证码以及倒计时提示
        $('#get_yzm').on('click',function(){
            if($('#phone_input').val() != ''){
                if(regNum.test($('#phone_input').val())){
                    sendCode($('#phone_input').val())
                }else{
                    $(this).parents(".yzm_num").siblings('.phone_num')
                           .find('.phone_error').show();
                }
            }
        })

        // 验证码input框事件
        $('#yzm_input').on('focus',function(){
            if(!regNum.test($('#phone_input').val())){
                $(this).parents(".yzm_num").siblings('.phone_num').find('.phone_error').show();
            }
            $('.yzm_error').hide();
        })

        // 输入验证码
        $('#yzm_input').on('input',function(){
            $('.yzm_error').hide();
            if($(this).val()!=''){
                $(this).parent().children('.delete_yzm_num').show();
            }
            if(regNum.test($('#phone_input').val()) && regCode.test($(this).val()) && ($(this).val().length == 4)){
                $('#login').css('background','#2799fe');
            }else{
                $('#login').css('background','#a9d5ff');
            }
        })
        // 清空验证码
        $('.delete_yzm_num').on('click',function(){
            $(this).hide();
            $('#yzm_input').val('');
            $('#login').css('background','#a9d5ff');
        })

        // 点击登入按钮，校验验证码是否正确；
        $('#login').on('click',function(){
            var phone=$('#phone_input').val()
            if(phone){
                if(regNum.test(phone)&&$('#yzm_input').val().length==4){
                    sendLoginByCode(phone,$('#yzm_input').val());
                }else{
                    $('.yzm_error').show();
                }
            }else{
                $('.phone_error').show();
            }

        })

    })()


    // 账号登入
    var loginByA=(function(){

        // 账号获取焦点及输入账号
        $('#account_input').on('input',function(){
            $(".password_error").hide();
            $(this).siblings('.phone_error').hide();
            $('.delete_phone_num').show();
        })

        // 密码框获取焦点
        $('#input_password').on('focus',function(){
            $(".password_error").hide();
            if(($('#account_input').val() == '') || !regNum.test($('#account_input').val())){
                $(this).parents(".password_num").siblings('.phone_num').find('.phone_error').show();
            }
        })

        // 密码框输入值
        $('#input_password').on('input',function(){
            $(this).siblings('.delete_password_num').show();
            if(regNum.test($('#account_input').val()) && ($(this).val() != '')){
                $('#accountLogin').css('background','#2799fe');
            }else{
                $('#accountLogin').css('background','#a9d5ff');
            }
        })

        // 清空密码框
        $('.delete_password_num').on('click',function(){
            $(this).siblings('#input_password').val('');
            $('#accountLogin').css('background','#a9d5ff');
        })

        // 点击眼睛明码显示隐藏切换
        $('.eyes i').on('click',function(){
            if($(this).hasClass('open')){
                $(this).addClass('close').removeClass('open');
                $('#input_password').attr('type','password')
            }else if($(this).hasClass('close')){
                $(this).addClass('open').removeClass('close')
                $('#input_password').attr('type','text')
            }
        })
        //账号密码登陆
        $("#accountLogin").click(function () {
            var mobile=$("#account_input").val();
            var password=$("#input_password").val();
            if (mobile=="" ||!regNum.test(mobile)){
                $("#input_password").parents(".password_num").siblings('.phone_num').find('.phone_error').show();
                return;
            }
            if (password=="" || password.length<6 || password.length>12){
                $(".password_error").show();
                return;
            }
            sendLoginByPassword(mobile,password);
        });
    })()
})
