(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 **created by linyh in 2017/1/19.
 *车型综述页
 *其中与综述页、年款综述页、车型对比页交互相同逻辑部分在summarize.js
*/

$(function(){

    //点击任何地方隐藏下拉列表
    $(document).on("click",function(){
        $(".js_type_list").addClass('display_n');
        $(".js_show_detail").siblings('.js_price_table').addClass('display_n');
        $(".detail_jt").addClass('ori_down').removeClass('ori_up');
    })


    /*报价模块*/
    //title车型选择
    $(".js_type_checked").on("click",function(event){
        event.stopPropagation();
        if($(".js_type_list").hasClass('display_n')){
            $(".js_type_list").removeClass('display_n');
        }else{
            $(".js_type_list").addClass('display_n');
        }
    })
    //选中车款
    function carTypeChecked(carStyle){
        var typeText = $(carStyle).text();
        $(".js_type_checked").text(typeText);
        $(carStyle).addClass('display_n').siblings().removeClass('display_n');
        $(".sure_cont").show().siblings('.dis_cont').hide();
    }
    $(".js_type_list li").on("click",function(){
        carTypeChecked(this);
    })
    $(".js_type_list li").eq(0).trigger('click');


    //颜色切换
    $(".js_ct_pre_list").on("click",function(){
        var areaWidth = $(".js_ct_c_item").width()-5,
            offLeft = $("#ct_color_scroll").position().left;
        var scrollLeft = offLeft + areaWidth;
        if(-offLeft < areaWidth){
            $("#ct_color_scroll").css("left",0);
        }else{
            $("#ct_color_scroll").css("left",scrollLeft);
        }
    })
    $(".js_ct_next_list").on("click",function(){
        var scrollItem = $("#ct_color_scroll a").length;
            areaWidth = $(".js_ct_c_item").width()-5,
            offLeft = $("#ct_color_scroll").position().left;
        var scrollWidth = scrollItem * 32,
            scrollLeft = offLeft - areaWidth,
            lastW = scrollItem % 8 * 32,
            lastL = -(scrollWidth - lastW);
        if(-scrollLeft <= scrollWidth){
            $("#ct_color_scroll").css("left",scrollLeft);
        }else{
            $("#ct_color_scroll").css("left",lastL);
        }
    })
    //点击颜色
    $("#ct_color_scroll a").on("mouseover",function(){
        var colorIndex = $(this).index();
        $("#ct_b_img a").eq(colorIndex).removeClass('display_n').siblings().addClass('display_n');
    })

    //参数配置中加载更多配置
    $(".load_more_btn span").on("click",function(){
        $(".js_show_table").removeClass('display_n');
        $(this).parent().addClass('display_n');
    })

    //经销商授权中显示全款购车价格明细
    $(".js_show_detail").on("click",function(event){
        event.stopPropagation();
        if($(this).siblings('.js_price_table').hasClass('display_n')){
            $(this).siblings('.js_price_table').removeClass('display_n');
            $(this).parents(".js_dealer_item").siblings(".js_dealer_item").find(".js_price_table").addClass('display_n');
            $(this).find(".detail_jt").removeClass('ori_down').addClass('ori_up');
            $(this).parents('.js_dealer_item ').siblings('.js_dealer_item').find(".detail_jt").addClass('ori_down').removeClass('ori_up');
        }else{
            $(this).siblings('.js_price_table').addClass('display_n');
            $(this).find(".detail_jt").addClass('ori_down').removeClass('ori_up');
            $(this).parents('.js_dealer_item ').siblings('.js_dealer_item').find(".detail_jt").removeClass('ori_down').addClass('ori_up');
        }
    })

    //点击对比按钮
    // $('.js_cont').on('click',function(){
    //     var carStyleText = $(".js_type_checked").text();
    //     $(this).data('cid', carStyleText);
    //     compareCar.call(this);
    //     $(this).hide().siblings('.cont_b').css("display","inline-block");
    // });
})

},{}]},{},[1])