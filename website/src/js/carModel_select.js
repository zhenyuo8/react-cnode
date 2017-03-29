/**
 * Created by Administrator on 2017/2/23.
 */
/**
 * 对轿车，跑车，概念车hover时进行筛选，只展示对应的车型
 */
$(document).ready(function () {

    //点击左树形车品牌或者名称页面刷新的同时将所点击的品牌或者名称在左树形框置顶

    var bannerTab=(function () {
        var reg=/(\/\w+\/)/i;
        var regHost=/^(\w+)\.$/i;
        var str=window.location.pathname;
        var hostStr=window.location.hostname;

        if(hostStr=='car.qichedaquan.com'){
            $('#pro_type .fr li').eq(0).find('a').addClass('active').siblings().find('a').removeClass('active');
        }
        if(hostStr=='pic.qichedaquan.com'){
            $('#pro_type .fr li').eq(1).find('a').addClass('active').siblings().find('a').removeClass('active');
        }
        if(hostStr=='v.qichedaquan.com'){
            $('#pro_type .fr li').eq(2).find('a').addClass('active').siblings().find('a').removeClass('active');
        }
        var pathnameS=str.replace(reg,function () {
            return str=arguments[1];
        });
        if(str=='/carmaster/'||str=='/carSerialSelect/'||str=='/carConditionSelect/'){
            $('#pro_type .fr li').eq(0).find('a').addClass('active').siblings().find('a').removeClass('active');
        }else if(str=='/pic/'){
            $('#pro_type .fr li').eq(1).find('a').addClass('active').siblings().find('a').removeClass('active');
        }else if(str=='/video/'){
            $('#pro_type .fr li').eq(2).find('a').addClass('active').siblings().find('a').removeClass('active');
        }
        $('#pro_type .fr li').eq(0).find('a').attr('href','http://car.qichedaquan.com')
        $('#pro_type .fr li').eq(1).find('a').attr('href','http://pic.qichedaquan.com')
        $('#pro_type .fr li').eq(2).find('a').attr('href','http://car.qichedaquan.com/video')
        if(/video/.test(str)||/video/.test(hostStr)){
            $('#pro_type .fr li').eq(2).find('a').addClass('active').siblings().find('a').removeClass('active');
            $('#pro_type .fr li').eq(0).find('a').removeClass('active');
        }
    })();


    var footerOffsetTop=function () {
        var bodyHeight=$(document.body).height();
        var clientHeight=$(window).height();
        var  footerHeight=$('.footer').height();
        if(bodyHeight<1000){
            $('.footer').css({'position':'absolute','top':1000})
        }else{
            $('.footer').css({'position':'relative','bottom':0})
        }
    };
    footerOffsetTop();
    //根据车类型筛选车，让对应的模块显示
    var select_byDataLevel=function (eventType) {
        $('.hot_left li').on(eventType,function () {
            var allLi=$('.brand_car li');
            var tab_data=$(this).attr('data-level');
            var allDiv=$('.data_level');
            $.each(allDiv,function (index,item) {
                if($(item).attr('data-level')==tab_data){
                    $(item).show();

                }else{
                    $(item).hide()
                }
                footerOffsetTop();
            });
        })
    };
    select_byDataLevel('mouseover');
    select_byDataLevel('click');

//    底部切换
    var bottomTab=(function () {
        $('.hot_left1 li').on('mouseover','.fl a',function () {
            $(this).parents('li').addClass('active').siblings().removeClass('active')
            var index=$(this).parents('li').index();
            if(index==0){
                $('#top_list_0').show().siblings('#top_list_1').hide();
            }else if(index==1){
                $('#top_list_1').show().siblings('#top_list_0').hide();
            }

        })
    })()

});
