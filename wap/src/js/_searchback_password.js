$(function(){

    //发送短信
    function sendCode(mobile) {
        var val=$(".get_yzm").text();
        if("重新获取验证码"!=val&&"获取验证码"!=val)return;
        $.ajax({
            url:"/user/sendCode",
            type:"POST",
            data:{"mobile":mobile},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    myAlert(data.resultMsg,1);
                }else{
                    var n=60;
                    $('.get_yzm').text(n+'S后重新获取');
                    $('.get_yzm').css('color',"#d8d8d8");
                    clearInterval(timer);
                    var timer=setInterval(function(){
                        if(n>1){
                            n--;
                            $('.get_yzm').text(n+'S后重新获取');
                        }else {
                            clearInterval(timer)
                            $('.get_yzm').text('重新获取验证码');
                            $('.get_yzm').css('color',"#2799fe");
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
     * 检查用户
     * @param mobile
     */
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
                    myAlert("此手机号尚未注册，请重新输入！",1);
                }else {
                    sendCode(mobile);
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
            }
        });
    }

    //验证验证码
    function checkCode(mobile,code) {
        if (!mobile || mobile==null || mobile=="" || !code || code==null || code==""){
            myAlert("验证码错误，请重新输入",1);
            return;
        }
        $.ajax({
            url:" /user/checkCode",
            data:{"mobile":mobile,"code":code},
            dataType:"json",
            type:"POST",
            success:function(data){
                if(data.errorCode!=10000){
                    alertDiv({type:"2",des:data.resultMsg,time:"3000",fn:function(){}});
                    $('.set_new_password').show();
                    $('.back_password').hide();
                }else {
                    $('.set_new_password').show();
                    $('.back_password').hide();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
            }
        });
    }

    //修改密码
    function settPassword(mobile,password) {
        var callback=getCallBackUrl("callback");
        $.ajax({
            url:" /user/sendUpdate",
            data:{"mobile":mobile,"password":password,"callback":callback},
            dataType:"json",
            type:"POST",
            success:function(data){
                if(data.errorCode!=10000){
                    myAlert(data.resultMsg,1);
                }else {
                    successAlert(data.value);
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"请求异常",time:"3000",fn:function(){}});
            }
        });
    }

    function getCallBackUrl(name) {
        var r=window.location.search;
        var back=r.substr(r.lastIndexOf(name)+name.length+1);
        if (back!=null && undefined!=back && back!="")return back;
        return "http://m.qichedaquan.com";
    }

    function myAlert(msg,n) {
        $('.fail_mask').html(msg);
        $('.fail_mask').show();
        $('.finish_btn').css('background',"#a9d5ff")
        var timer2=setInterval(function(){
            if(n==0){
                $('.fail_mask').hide();
                clearInterval(timer2)
            }else{
                n--;
            }
        },1000)
    }

    var regCode=/(\d){4}/;
    var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
    var regCode2=/[a-zA-Z0-9]{6,16}/;
    var mobileT;
    var findPassword=(function(){

        $('#first_input').on('input',function(){
            $('.phone_error').hide();
            $('.phone_num .delete').show();
        })

        $('#first_input').on('keyup',function(){
            if($(this).val().length == 0){
                $('.phone_num .delete').hide();
            }
            if($(this).val().length >= 11){
                $('.get_yzm').css('color','#2799fe');
            }else{
                $('.get_yzm').css('color','#d8d8d8');
            }
        })

        $('.phone_num .delete').on('click',function(){
            $(this).hide();
            $('#first_input').val('');
            $('.get_yzm').css('color',"#d8d8d8");
            $('.next_step_btn').css('background',"#a9d5ff");
        })
        // 校验手机号
        $('.get_yzm').on('click',function(){
            var inputPhone=$('#first_input').val();
            if(regNum.test(inputPhone)){
                checkUser(inputPhone);
            }else{
                $('.phone_error').show();
            }
        })

        // 验证码input框事件
        $('.yzm_input').on('focus',function(){
            if(!regNum.test($('#first_input').val())){
                $(this).parents(".yzm_num").siblings('.phone_num').find('.phone_error').show();
            }
            $('.yzm_error').hide();
        })

        $('.yzm_input').on('input',function(){
            $('.yzm_num .delete').show();
            if(regNum.test($('#first_input').val()) && regCode.test($(this).val()) && ($(this).val().length == 4)){
                $('.next_step_btn').css('background','#2799fe');
            }else{
                $('.next_step_btn').css('background','#a9d5ff');
            }
        })

        $('.yzm_input').on('keyup',function(){
            if($(this).val().length==0){
                $('.yzm_num .delete').hide();
            }
            if($(this).val().length==4){
                $('.next_step_btn').css('background',"#2799fe")
            }
        })

        // 删除输入的验证码
        $('.delete_yzm_num').on('click',function(){
            $(this).hide();
            $('.yzm_input').val('')
            $('.next_step_btn').css('background',"#a9d5ff")
        })

        $('.next_step_btn').on('click',function(){
            var codeNum=$('.yzm_input').val();
            var phoneNum=$('.phone_input').val();
            if(codeNum&&phoneNum){
                if(regCode.test(codeNum)&&regNum.test(phoneNum)){
                    mobileT=phoneNum;
                    checkCode(phoneNum,codeNum);
                }else{
                    $('.yzm_error').show();
                }
            }
        })
    })()

    // 输入两次密码
    var twoPassword=(function(){
        // 明码显示
        $('#new_password .eyes img').on('click',function(){
            if($(this).index()==0){
                $(this).hide().siblings().show();
                $('#first_input_password').attr('type','password')
            }else {
                $(this).hide().siblings().show();
                $('#first_input_password').attr('type','text')
            }
        })
        $('#two_password .eyes img').on('click',function(){
            if($(this).index()==0){
                $(this).hide().siblings().show();
                $('#second_input').attr('type','password')
            }else {
                $(this).hide().siblings().show();
                $('#second_input').attr('type','text')
            }
        })

        $('#first_input_password').on('click',function(){
            $('#first_input_password').siblings('.error_tip').hide()
        })
        $('#second_input').on('focus',function(){
            if(!regCode2.test($('#first_input_password').val())){
                $('#first_input_password').siblings('.error_tip').show()
            }else{

            }
        })
        $('#second_input').on('keyup',function(){
            if($(this).val().length>=6){
                $('.finish_btn').css('background',"#2799fe")
            }else{
                $('.finish_btn').css('background',"#a9d5ff")
            }
        })


        $('.finish_btn').on('click',function(){
            var firstP=$('#first_input_password').val();
            var sectP=$('#second_input').val();
            if (firstP=="" || firstP==null || firstP.length<6 || firstP.length>16){
               return;
            }
            if(firstP==sectP){
              settPassword(mobileT,firstP);
            }else{
                myAlert("两次密码不一致，请检查后操作",1);
            }
        })

    })()

    //提示成功
    function successAlert(url) {
        var m=3;
        $('.success_tip').show();
        $('.mask').show();
        $('.tip_time').text(m+"S自动关闭");
        var timer=setInterval(function(){
            if(m>=1){
                m--;
            }else {
                clearInterval(timer)
                $('.success_tip').hide();
                $('.mask').hide();
                window.location.href=url;
            }
            $('.tip_time').text(m+"S自动关闭");
        },1000)
    }

})
