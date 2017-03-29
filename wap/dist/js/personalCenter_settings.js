(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
        var settingsModify=(function(){
        var regWord=/[A-Za-z0-9\u4E00-\u9FA5]/ig;
        var regStr = "^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$";
        var regStr2 = "^[\\u4e00-\\u9fa5]{1,6}$";
        var realMobile = $('#realMobile').val();
        if(realMobile){
            var displayMobile = realMobile.substr(0, 3) + '****' + realMobile.substr(7);
            $('#user_mobile').html(displayMobile);
        }
         var upUserImg=function(){
            $('.mask_nojt').fadeIn(300,function(){
                $('.user_img_up').animate({'bottom':0},100);
            });
            $('.header_photo').animate({'top':0},1000);
        }
        var userAgent = navigator.userAgent;
        if(/(iPhone|iPad|iPod|iOS)/i.test(userAgent)){
            var upimg=$('#camera_input');
            var img_li=$('#img_li');
               var upimgCss={
                'display': 'inline-block',
                'opacity': '0',
                'position': 'absolute',
                'left': '0px',
                'top': '0px',
                'width': '100%',
                'height': '100%',
                'z-index': '50'
               }
               upimg.css(upimgCss);
               img_li.css('position','relative');
               img_li.append(upimg);
               upUserImg=function(){

               }

        }else{
          $('#img_li').on('click',upUserImg);
        }
        // 头像修改

        $('#nick_name').on('click',function(){
            $("#modify_nick").show()
            $('.mask_area').show()
            $('.input_p input').val($(this).find('.for_nick').text())
            return false
        })

        $('#true_name').on('click',function(){
            $('#modify_true').show();
            $('.mask_area').show();
            $('.input_p input').val($(this).find('.for_name').text())
            // $('#modify_nick .title').text($('#true_name .left').text())
        })

        // 确认修改
        $('#confirm').on('click',function(){
            var name=$('.input_p input').val();
            if(name){
                if(name.match(regStr)){
                    var userId=$('#user_id').val();
                    sendModifyUserNickName(userId,name);
                }else{
                    $('.input_p .error_msg').eq(0).html('昵称要求1-16位，支持中英文、数字');
                    $('.input_p .error_msg').eq(0).show();
                    $('.mask_area').show();
                    $('.input_p input').css('border-color','#e43a3a')
                }
            }else if(name==''){
                $('.mask_area').show();
                $('.input_p .error_msg').eq(1).show();
            }
        })

        $('#confirm1').on('click',function(){
            var name2=$('#modify_true .input_p input').val().toString();
            if(name2){
                if(name2.match(regStr2)){
                    var userId=$('#user_id').val();
                    sendModifyUserRealName(userId,name2);
                }else{
                    $('#modify_true .input_p .error_msg').html('真实姓名限1-6位汉字');
                    $('#modify_true .input_p .error_msg').show();
                    $('.mask_area').show();
                    $('#modify_true .input_p input').css('border-color','#e43a3a')
                }
            }else if(name2==''){
                //真实姓名可以为空
                var userId=$('#user_id').val();
                sendModifyUserRealName(userId,name2);
            }
        })

        $('.input_p i').on('click',function(){
            $(this).prev('input').val('')
            $('.input_p .error_msg').hide()
            $('.input_p input').css('border-color','#d8d8d8')
            $(this).hide()
        })

        $('.input_p input').on('focus',function(){
            $('.input_p .error_msg').hide()
            $('.input_p input').css('border-color','#d8d8d8')
        })

        $('.input_p input').on('keyup',function(){
            $('.input_p .error_msg').hide()
            if($('.input_p input').val()!=''){
                $('.input_p i').show();
            }else{
                $('.input_p i').hide();
            }
        })

        // 取消修改；
        $('#cancel').on('click',function(){

            $("#modify_nick").hide();
            $('.mask_area').hide();
        })

        $('#cancel1').on('click',function(){

            $("#modify_true").hide();
            $('.mask_area').hide();
        })

        // 修改性别
        $('#sex_select').on('click',function(){
            $('.mask_area').show();
            $('.modify_sex').show().animate({"right":0},500)
        })

        $('.sex_container li').on('click',function(){
            var userGender = $(this).text();
            var userId=$('#user_id').val();
            if(userGender=="男"){
                userGender = 1;
            }else if(userGender=="女"){
                userGender = 2;
            }else{
                userGender = 0;
            }
            //发送请求
            sendModifyUserGender(userId,userGender);
        })

        $('#sex_left span').on('click',function(){
            var widthQ=$('.modify_sex').offset().width;
            $('.mask_area').hide();
            $('.modify_sex').animate({'right':'-100%'},500)
        })

        // 更改年龄
        $('#age_select').on('click',function(){
            $(this).addClass('bg').siblings().removeClass('bg')
            $('.mask_area').show();
            $('.modify_age').animate({'right':0},500);
            $('.modify_age').css('z-index','200');
        })

        $('.age_container li').on('click',function(){
            var userAge = $(this).text();
            var userId=$('#user_id').val();
            //发送请求
            sendModifyUserAge(userId,userAge);
        })

        $('.mask_area,.mask_nojt').on('click',function(){
            $('.user_img_up').animate({'bottom':'-100%'},500,function(){
                $('.mask_nojt').hide();
                $('.modify_nick').hide();
                return;
            })
            $('.modify_age').animate({'right':"-76.6%",'z-index':'-1'},500,function(){
                $('.modify_age').css('z-index','-1')
                $('.mask_area').hide();
            });
            $('.modify_sex').animate({'right':'-76.6%'},500)
        })

        // 退出登录
        $(".signout").on("click",function(){
            $(".load_mask").show();
            $.ajax({
                url:"/user/loginOutAjax",
                type:"POST",
                dataType:"json",
                success:function (data) {
                    $(".load_mask").hide();
                    if(data.errorCode!=10000){
                        alertDiv({type:"2",des:"退出失败，请稍候再试！",time:"5000",fn:function(){window.location.reload()}});
                    }else{
                        //成功
                        window.location.href='http://m.qichedaquan.com';
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThrown) {
                    $(".load_mask").hide();
                    alertDiv({type:"2",des:"退出失败，请稍候再试！",time:"5000",fn:function(){window.location.reload()}});
                }
            });
        })


    })();
    function sendModifyUserNickName(userId,nickName){
        $.ajax({
            url:"/personal/ajax/modifyUserInfo",
            type:"POST",
            data:{"user_id":userId,"user_nickname":nickName},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    $('.input_p .error_msg').eq(0).html(data.resultMsg);
                    $('.input_p .error_msg').eq(0).show();$('.mask_area').show();
                    $('.mask_area').show();
                    $('.input_p input').css('border-color','#e43a3a');
                }else{
                    //修改成功
                    $("#modify_nick").hide();
                    $('.mask_area').hide();
                    $('#nick_name .for_nick').text(nickName);
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"修改失败，请稍候再试！",time:"3000",fn:function(){window.location.reload()}});
            }
        });
    }
    function sendModifyUserRealName(userId,realName){
        $.ajax({
            url:"/personal/ajax/modifyUserInfo",
            type:"POST",
            data:{"user_id":userId,"user_realname":realName},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    $('#modify_true .input_p .error_msg').html(data.resultMsg);
                    $('#modify_true .input_p .error_msg').show();
                    $('.mask_area').show();
                    $('#modify_true .input_p input').css('border-color','#e43a3a')
                }else{
                    //修改成功
                    $("#modify_true").hide();
                    $('.input_p .error_msg').hide()
                    $('.mask_area').hide();
                    $('#true_name .for_name').text(realName)
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"修改失败，请稍候再试！",time:"3000",fn:function(){window.location.reload()}});
            }
        });
    }
    function sendModifyUserGender(userId,userGender){
        $.ajax({
            url:"/personal/ajax/modifyUserInfo",
            type:"POST",
            data:{"user_id":userId,"user_gender":userGender},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    alertDiv({type:"2",des:"修改失败，请稍候再试！",time:"3000",fn:function(){window.location.reload()}});
                }else{
                    //修改成功
                    window.location.reload();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"修改失败，请稍候再试！",time:"3000",fn:function(){window.location.reload()}});
            }
        });
    }
    function sendModifyUserAge(userId,userAge){
        $.ajax({
            url:"/personal/ajax/modifyUserInfo",
            type:"POST",
            data:{"user_id":userId,"user_age":userAge},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    alertDiv({type:"2",des:"修改失败，请稍候再试！",time:"3000",fn:function(){window.location.reload()}});
                }else{
                    //修改成功
                    window.location.reload();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alertDiv({type:"2",des:"修改失败，请稍候再试！",time:"3000",fn:function(){window.location.reload()}});
            }
        });
    }



    //设置不够一屏
    var setNoFullScreen=function(){
        var bodyH=parseInt($('body').height());
        var screenH=parseInt($(window).height());
        var setFoH=parseInt($('.set_footer').height());
        var indexPageH=parseInt($('.index_page').height());
        var video_fteH=parseInt($('.video_fte').height());


        if(bodyH<screenH){
            // $('.set_footer').css({
            //   'position':'fixed',
            //   'width':'100%',
            //   'bottom':'0px',
            //   'background-color':'#fff'
            // });
            var fillH=(screenH-indexPageH+video_fteH+setFoH);
            $('.index_page').css({
                'height':screenH,
                'background-color':'#f4f5f7'
            });
        }
    }
    setNoFullScreen();
    $('.user_img_up .cancel').on('click',function(){
        $('.user_img_up').animate({'bottom':'-100%'},500,function(){
            $('.mask_nojt').hide();
            return;
        })
    });
})

},{}]},{},[1])