/**
 * Created by Administrator on 2017/2/17.
 */
$(document).ready(function () {
    var personalMessageSubmit=(function () {

        var nick_name,true_name;
        //个人资料、修改头像、修改密码模块切换
        $('#js_account_tab li').on('click',function () {
            $(this).addClass('cur').siblings().removeClass('cur')
            $('.js_account_con .content').eq($(this).index()).show().siblings().hide();
        });

		$("#to_band").click(function () {
			$("#no_band").hide();
			$("#js_content_password").show();
		})
    })();
    var phoneNumBind=(function () {
        var codeNum;
        $('.input_phone input').on('blur',function () {
            var phoneNum=$(this).val();
            var reg=/^1(3|4|5|8){1}(\d+){9}$/;
            if(phoneNum.length<11){
                // alert('请输入11位的手机号码~')
            }
        });
        // $('.input_msg_code .input_msg_input').on('blur',function () {
        //     codeNum=$('#input_msg_code #input_msg_input1').val();
        //     if($(this).val().length>4){
        //         alert('验证码错误，请确认后再输入！')
        //     }else{
        //         $('.step .save_step').css('background','#ffa903')
        //     }
        // })

        $('.step .save_step').on('click',function () {
            $('.input_msg_code .input_msg_input').val('');
            $(this).css('background','#dadada')
        })
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

        //    保存更改手机号跳转页面
        //     $('#save_phone input').on('click',function () {
        //         var changePhone=$('#input_phone input').val();
        //         var toStar=changePhone.substr(3,4).replace(/\d/g,'*');
        //         changePhone=changePhone.substr(0,3)+toStar+changePhone.substr(7,4)
        //         console.log(toStar)
        //             $('#phone_con').text(changePhone);
        //              $('.bind_default .done').show()
        //              $('.bind_default').show()
        //              $('.bind_default .none').hide()
        //             $('.change_phone').hide();
        //     })

    })()
});