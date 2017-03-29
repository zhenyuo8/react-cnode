/**
 * Created by admin on 2017/1/17.
 */

$(function(){
    //汽车品牌 -类型-年款 点击事件
    $('.Js-car_brand').on('click',function(){
        $(this).find('.Js-car_barnd_box').toggle();
        $('.Js_car_type_box').hide();
        $('.Js-car_year_box').hide();
        return false
    });
    //品牌选择
    $('.Js-car_brand .Js-car_barnd_box .Js_car_brand_con').delegate('li','click',function(){
        $(this).parents('.Js-car_brand').find('.Js_car_barnd_word').text($(this).find('.car_brand_name').text());
        $(this).parents('.Js_car_select_input_box').find('.Js_brand_index').text($(this).find('.car_brand_name').text());
        $('.Js_car_type_word').html('请选择系列')
    })
    $('.Js-car_type').on('click',function(){
        var isclick=$(this).attr('isclick');
        if(isclick=='true'){
            $(this).find('.Js_car_type_box').toggle();
            $('.Js-car_barnd_box').hide();
            $('.Js-car_year_box').hide();
        }
        return false
    });
    //类型选择
    $('.Js-car_type .Js_car_type_box .Js_car_type_con').delegate('dd','click',function(){
        var _str=$(this).html();
        if(_str.indexOf('&')>-1){
            var _text=_str.substring(0,_str.indexOf('&'));
            $(this).parents('.Js-car_type').find('.Js_car_type_word').text(_text);
            $('.Js_type_index').text(_text);

        }else{
            $(this).parents('.Js-car_type').find('.Js_car_type_word').text($(this).text());
            $('.Js_type_index').text($(this).text());
        }
    })

    $('.Js-car_year').on('click',function(){
        var isclick=$(this).attr('isclick');
        if(isclick=='true'){
            $(this).find('.Js-car_year_box').toggle();
            $('.Js-car_barnd_box').hide();
            $('.Js_car_type_box').hide();
        }
        return false
    });
    //年代选择
    $('.Js-car_year .Js-car_year_box dl').delegate('dd','click',function(){
        var _str=$(this).html();
        if(_str.indexOf('&')>-1){
            var _text=_str.substring(_str.indexOf('&')+6,_str.indexOf('</span>'));
            var _year=$(this).parent().find('dt').text();
            var _type=$(this).parents('.Js_car_select_input_box').find('.Js_car_type_word').text();
            $(this).parents('.Js-car_year').find('.Js_car_des').html(_year+'&nbsp;'+_type+'&nbsp;'+_text);
        }else{
            return;
        }
    })
    //汽车品牌下来菜单，点击字母索引，滚动到对应的区域
    $('.Js_letter_index ul').delegate('li','click',function(event){
        $(this).parent('ul').find('li').removeClass('active');
        $(this).addClass('active')
        var _thisLetter=$(this).html();
        var s=$(this).parents('.Js_letter_index').siblings('.Js_car_brand_con').find('ul[carbrandtype='+_thisLetter+']').position().top
        $('.car_brand_con').mCustomScrollbar('scrollTo',s);

        return false
    })
    $(document).on('click',function(){
        $('.Js-car_barnd_box').hide();
        $('.Js_car_type_box').hide();
        $('.Js-car_year_box').hide();
    })

})