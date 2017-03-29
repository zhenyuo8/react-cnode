(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function(){
    $(".hot-car li:nth-of-type(4n)").css('margin-right','0');
    var flag=false;
    var isMore = $("#more-up").attr("more-val");
    if(isMore && isMore==1 && isMore !=""){
        $('.Js-select-type-con .Js-dis-n').css('display','block');
            $(this).html('<span class="icon-up-t">收起条件</span>');
            $('#showhideCon').show();
            $('.Js-drop-down').hide();
            flag=true;
    }
    init();
    function init(){
        bindEvent();
        carTypeNum();
    }
    function setUpDown(){

    }
    function bindEvent(){
        //条件展开  收起条件
        $('.Js-search .Js-down-up').click(function(){
            if(!flag){
                $('.Js-select-type-con .Js-dis-n').css('display','block');
                $(this).html('<span class="icon-up-t">收起条件</span>');
                $('#showhideCon').show();
                $('.Js-drop-down').hide();
                flag=true;
        }else{
                $('.Js-select-type-con .Js-dis-n').css('display','none');
                $(this).html('<span class="icon-down-t">展开条件</span>');
                $('#showhideCon').hide();
                $('.Js-drop-down').hide();
                flag=false;
            }
        });
        //价格 级别 车身 厂商 等选择
        $('.Js-select-type-con .Js-h,input[type="checkbox"]').click(function(e){
            //移除之前高亮 设置当前高亮
            $('.Js-drop-down').hide();
            $('.clear_choice').show();
            $(this).parent().find('a').removeClass('active');
            $(this).find('a').addClass('active');
            var ele=$(this).get(0).getElementsByTagName('ul')
            if(isHasChildNode(ele)){
                $(this).find('ul').show()
                $(this).find('a').addClass('c')
            }else{
                $(this).parent().find('a').removeClass('c');
                $(this).parent().find('ul').hide()
            }
        })
        //清空条件
        $('.clear_choice').on('click',function(){
            $('.Js-h').find('a').removeClass('active');
            $('.un').addClass('active');
            $(this).hide();
            $('.Js-suv-word').removeClass('c')
            $('.Js-custom-btn').parent().children().find('.active').removeClass('active');
            $('.Js-custom-btn').parent().children().find('.un').addClass('active')
            $('.Js-input-box').css('display','block');
            $('.Js-enter').css('display','block').css('backgroundColor','#aaaaaa');
            $('.Js-custom-num').css('display','none');
            $('.Js-custom-btn').css('display','none');
            $('input[type="checkbox"]').attr("checked",false);
            var href=window.location.href;
            var urls=href.split("?");
            window.location.href=urls[0];var href=window.location.href;
            var urls=href.split("?");
            window.location.href=urls[0];
        })
        $('.Js-drop-down .ho').click(function(event){
            var text=$(this).text()
            $(this).parent().parent().find('.Js-suv-word').text(text);
            $(this).parent().find('.ho').css('color','black')
            $(this).css('color','#3189ea')
            $(this).parent().hide()
            return false;

        })
        $('body').on('click',function(e){
            if($(e.target).hasClass('Js-suv-word')){
                return;
            }else{
                $('.Js-drop-down').hide();
            }
        })

        //获取光标
        $('.Js-price-inpu').on('click',function(){
               $(this).focus();
        })
        //输入框 输入正确 抬起，确定按钮背景色改变
        var t;
        $('.Js-mim').keyup(function(){
            if($(this).val().length>4){
                $(this).val($(this).val().substr(0,4));
                return
            }
           var theEvent = window.event || arguments.callee.caller.arguments[0];
            if($(this).val().length==0 &&　theEvent.keyCode===8){
                 t=''
                return;
            }
            if (!/^\d+$/.test($(this).val())){
                $(this).val(t);
            }
            else{
                t=$(this).val()
                $('.Js-enter').css('backgroundColor','#ffaa02');
            }
        })
         var tt;
        $('.Js-max').keyup(function(){
             if($(this).val().length>4){
                $(this).val($(this).val().substr(0,4));
                return
            }
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            if($(this).val().length==0 &&　theEvent.keyCode===8){
                 tt=''
                return;
            }
            if (!/^\d+$/.test($(this).val())){
                $(this).val(tt);
            }else{
               tt=$(this).val();
                $('.Js-enter').css('backgroundColor','#ffaa02');
            }
        })
        //自定义点击事件
        $('.Js-custom-btn').on('click',function(){
            $(this).parent().children().find('.active').removeClass('active');
            $(this).parent().children().find('.Js-un').addClass('active')
            $('.Js-input-box').css('display','block');
            $('.Js-enter').css('display','block').css('backgroundColor','#aaaaaa');
            $('.Js-custom-num').css('display','none');
            $('.Js-custom-btn').css('display','none');

        })
        //价格自定义显示;
        $('.Js-enter').on('click',function(){
            $('.Js-price-hint').css('display','none');
            if ($('.Js-min').val()==='' || $('.Js-max').val()===''){
                $('.Js-price-input').val('');
                 t='';
                tt=''
                return;
            }

            var priceMin=parseInt($('.Js-mim').val());
            var priceMan=parseInt($('.Js-max').val());
            if (priceMin>priceMan){
                $('.Js-price-input').val('');
                $('.Js-price-hint').css('display','block');
                $('.Js-enter').css('backgroundColor','#aaaaaa');
                 t='';
                tt=''
                return;
            }else{
                $('.clear_choice').show();
                $('.Js-input-box').css('display','none');
                $('.Js-enter').css('display','none')
                $('.Js-custom-num').find('a').html(priceMin+'-'+priceMan+'万');
                $('.Js-custom-num').css('display','block');
                $('.Js-custom-btn').css('display','block');
                $(this).parent().children().find('.active').removeClass('active');
                $('.Js-custom-num').find('a').addClass('active');
                 t='';
                tt=''
                setTimeout(function(){
                    $('.Js-price-input').val('');
                },1)

            }
        })
    }

    //判断是否有节点
    function isHasChildNode(ele){
        if(typeof ele !='undefined' && ele.length>=1){
            return true;
        }
            return false
    }

    //车型关注排行榜数量少于7个对齐
    function carTypeNum(){
        var carTypeDl = $('.top_list dl');
        var carTypeNum = carTypeDl.length||0;

        var num = 0;
        for(var i=0;i<carTypeNum;i++){
            if(num<carTypeDl.eq(i).height()){
                num = carTypeDl.eq(i).height();
            }
        }
        $('.top_list dl').height(num);
    }
})
},{}]},{},[1])