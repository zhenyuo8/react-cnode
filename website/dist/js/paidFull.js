/**
 * Created by zhangbs on 2017/2/22.
 */
(function($){
    $(document).ready(function(){
        $(".show-scroll-bar").mCustomScrollbar({
            scrollButtons:{ scrollSpeed:50 }
        });
        $(".car_brand_con").mCustomScrollbar(
            {
                scrollButtons:{ scrollSpeed:100 }
            }
        );
        $(".car_type_box").mCustomScrollbar(
            {
                scrollButtons:{ scrollSpeed:50 }
            }
        );
        $(".car_year_box").mCustomScrollbar(
            {
                scrollButtons:{ scrollSpeed:50 }
            }
        );
    });
})(jQuery);
$(function(){
    tab('.h5_str','','click');
    function tab(ele,kzele,type){
        $(ele).find('li').each(function (index) {
            $(this).on(type,function(){
                $(ele).find('li').removeClass('active').eq(index).addClass('active');
                $(kzele).find('li').hide().eq(index).show();
            })
        })
    }
    $('.table_pay').find('.choice-type').click(function(){
        $(this).siblings('.choice-list').toggle();
    })
    $('.table_pay').find('.choice-list dd').click(function () {
       // var html = $(this).find('a').html();
       // $(this).parents('.choice-input').find('.choice-type span').html(html);
        $('.table_pay').find('.choice-list').hide();
    })
    $('.choice-input').on('mouseleave',function(){
        $('.choice-list').hide();
    })
    var top=$('.fied_topbox').offset().top;
    $(window).on('scroll',function(){
        if($(window).scrollTop()>top){
            $('.fied_topbox').css({
                'position': 'fixed',
                'top':'0',
                'width':'990px',
                'background': '#f7f7f7',
                'z-index':"99"
            })
        }else{
            $('.fied_topbox').css({
                'position': 'static'
            })
        }
    })
});

