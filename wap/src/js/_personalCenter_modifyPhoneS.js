$(function(){
  var regCode=/(\d){4}/;
  var regNum=/^1[3|4|5|8][0-9]\d{8}$/;
  var sureClick = false;
  var bidnPhone=(function(){
    $('.phone input').on('input',function(e){
        var inputNum=$('.phone input').val();
      $(this).siblings('em').show();
      if(regNum.test(inputNum)){
          $('.get_code').css('color',"#2799fe");
      }
    })
    $('.phone input').on('keyup',function(e){
      if($(this).val().length==0){
        $(this).siblings('em').hide();
      }
      if($(this).val().length==11){
        $(this).css('color','#2799fe')
      }
    })

    $('.phone em').on('click',function(){
      $('.phone input').val('');
      $('.get_code').css('color',"#d8d8d8");
      $(this).hide();
    })

    $('.code em').on('click',function(){
      $('#yzm_input').val('');
      $(this).hide();
      $('#bind').css('background','#a9d5ff');
      sureClick = false;
    })

    // 输入手机号
    $('#phone_input').on('focus',function(){
        $('.phone_error').hide();
    })

    // 获取验证码以及倒计时提示
    $('.get_code').on('click',function(){
      var n=60;
      var inputNum=$('.phone input').val();
      var yzmVal=$(".get_code").text();
      if(yzmVal != "重新获取验证码" && yzmVal != "获取验证码"){ return; }
      if(inputNum != ''){
          if(regNum.test(inputNum)){
            $('.get_code').text(n+'S后重新获取');
              $(this).css('color',"#d8d8d8");
            clearInterval(timer);
            var timer=setInterval(function(){
              if(n>1){
                n--;
                $('.get_code').text(n+'S后重新获取');
              }else {
                clearInterval(timer);
                $('.get_code').text('重新获取验证码');
                $('.get_code').css('color',"#2799fe");
              }
          },1000);

          }else{
            $('.phone_error').show();
          }
      }
    })

    // 验证码input框事件
    $('#yzm_input').on('focus',function(){
        if(!regNum.test($('#phone_input').val())){
            $(this).parents(".code").siblings('.phone').find('.phone_error').show();
        }
        $('.yzm_error').hide();
    })

    // 输入验证码
    $('#yzm_input').on('input',function(){
        $('.yzm_error').hide();
      if($(this).val()!=''){
        $(this).parent().children('em').show();
      }
      if(regNum.test($('#phone_input').val()) && regCode.test($(this).val()) && ($(this).val().length == 4)){
        $('#bind').css('background','#2799fe');
        sureClick = true;
      }else{
        $('#bind').css('background','#a9d5ff');
        sureClick = false;
      }
    })

    // 完成
    $("#bind").on("click",function(){
        if(sureClick == true){
            $(".fail_img").show();
            setTimeout(function(){
                $(".fail_img").hide();
                $(".fail_text").show();
            },800);
            setTimeout(function(){
                $(".fail_text").hide();
            },1600);
        }
    })

  })()
})
