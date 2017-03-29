(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by zhangbs on 2017/1/16.
 */
$(function(){
    //图片对比页左移右移切换效果
    imgCompare(300,comIe8);

    function imgCompare(t,callback){
        var compare = $('#img-compare-header');
        compare.on('click','.btn_list a',function(){
            var closest = $(this).closest('.area');
            var widthLen = closest.width();
            var index = closest.index();
            var fir = (widthLen+1)*index;
            var area = compare.find('.area');

            if(this.className=='l1'){//点击左侧按钮
                if(index==1){
                    closest.insertBefore(area.eq(index)).animate({"left":1},t);
                }else{
                    closest.insertBefore(area.eq(index)).animate({"left":fir-widthLen},t);
                }
                area.eq(index-1).insertAfter(area.eq(index)).animate({"left":fir+1},t);
            }else if(this.className=='r1'){//点击右侧按钮
                closest.insertAfter(area.eq(index)).animate({'left':fir+widthLen+2},t);
                area.eq(index+1).insertBefore(area.eq(index)).animate({'left':fir+1},t);
            }else if(this.className=='rm'){//删除按钮
                closest.appendTo($('.nocarWrap'));//重排顺序
                for(var i=0;i<area.length;i++){
                    compare.find('.area').eq(i).css('left',1+247*i);
                }
            }else if(this.className=='add_car') {//添加对比按钮

            }
            callback();
        });
    }
    //兼容IE8
    function comIe8(){
        $("#img-compare-header .hascarWrap .area .r1").css({
            'visibility': 'visible'
        });
        $("#img-compare-header .hascarWrap .area:last-child .r1").css({
            'visibility': 'hidden'
        });
    }
    navScroll(300);
    //锚点滚动
    function navScroll(t){
        var targetId,scroll_top,docScrollTop;
        var aNav = $('.po_left_nav').find('a');
        var num = aNav.length;
        var s=$('.paidsafe_wrap').offset().left;
        var w=$(".po_left_nav").width()
        //实现左侧导航固定定位
        $(".po_left_nav").css({
            'position':'fixed',
            'left':s-w-40,
            'top':'30%'
        })
        //点击导航实现页面锚点滚动
        aNav.click(function(){
            targetId = $(this).data('target');
            scroll_top = $('#'+targetId).offset().top;
            var that = this;
            $('html, body').animate({
                scrollTop: scroll_top
            }, t,function(){
                aNav.removeClass('active_a').siblings('.bg_icon').removeClass('active').siblings('.po-a').removeClass('status_icon').addClass('status_n_icon');
                $(that).addClass('active_a').siblings('.bg_icon').addClass('active').siblings('.po-a').removeClass('status_n_icon').addClass('status_icon');
            });
        });
        //监控页面滚动切换左侧导航
        window.onload=window.onscroll= function () {
            pageScroll();
        };
        function pageScroll(){
            docScrollTop = $(document).scrollTop();
            for(var i=0;i<num;i++){
                if(i<2?docScrollTop>=$('#nav_side_'+(i+1)).offset().top&&docScrollTop<$('#nav_side_'+(i+2)).offset().top:docScrollTop>=$('#nav_side_'+(i+1)).offset().top){
                    aNav.removeClass('active_a').siblings('.bg_icon').removeClass('active').siblings('.po-a').removeClass('status_icon').addClass('status_n_icon');
                    aNav.eq(i).addClass('active_a').siblings('.bg_icon').addClass('active').siblings('.po-a').removeClass('status_n_icon').addClass('status_icon');
                }
            }
        }
    }
});





},{}]},{},[1])