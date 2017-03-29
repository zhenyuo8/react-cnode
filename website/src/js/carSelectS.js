/**
 * Created by admin on 2017/1/17.
 */

$(function(){

    $('body').on('click',function(e){
        if(typeof($(e.target).attr("isclick"))=="undefined"){
            $('.Js-car_type').find('.Js_car_type_box').hide();
            $('.Js-car_year').find('.Js-car_year_box').hide();
            $('.Js-car_brand').find('.Js-car_barnd_box').hide();
        }else{
            return;
        }
    })
    //汽车品牌 -类型-年款 点击事件
    $('.Js-car_brand').on('click',function(){
        $('.Js-car_type').find('.Js_car_type_box').hide();
        $('.Js-car_year').find('.Js-car_year_box').hide();
        $(this).parents('td').siblings().find('.Js-car_barnd_box').hide();
        $(this).find('.Js-car_barnd_box').toggle();
    });
    //品牌选择
    $('.Js-car_brand .Js-car_barnd_box .Js_car_brand_con').delegate('li','click',function(){
        $(this).parents('.Js-car_brand').find('.Js_car_barnd_word').text($(this).find('.car_brand_name').text());
        $(this).parents('.Js_car_select_input_box').find('.Js_brand_index').text($(this).find('.car_brand_name').text())
        $(this).parents('.Js_car_select_input_box').find('.Js-car_type').addClass('is_ho').attr('isclick','true');
    })
    $('.Js-car_type').on('click',function(){
        if($(this).attr('isclick')=='false'){
            return
        }
        $('.Js-car_brand').find('.Js-car_barnd_box').hide();
        $('.Js-car_year').find('.Js-car_year_box').hide();
        $(this).parents('td').siblings().find('.Js_car_type_box').hide();
        $(this).find('.Js_car_type_box').toggle();
    });
    //类型选择
    $('.Js-car_type .Js_car_type_box .Js_car_type_con').delegate('dd','click',function(){
        var _str=$(this).html();
        if(_str.indexOf('&')>-1){
            var _text=_str.substring(0,_str.indexOf('&'));
            $(this).parents('td').find('.Js_car_type_word').text(_text);
            $(this).parents('td').find('.Js_type_index').text(_text);
        }else{
            $(this).parents('td').find('.Js_car_type_word').text($(this).text());
            $(this).parents('td').find('.Js_type_index').text($(this).text())
        }
        $(this).parents('.Js_car_select_input_box').find('.Js-car_year').addClass('is_ho').attr('isclick','true');
    })

    $('.Js-car_year').on('click',function(){
        if($(this).attr('isclick')=='false'){
            return
        }
        $('.Js-car_brand').find('.Js-car_barnd_box').hide();
        $('.Js-car_type').find('.Js_car_type_box').hide();
        $(this).parents('td').siblings().find('.Js-car_year_box').hide();
        $(this).find('.Js-car_year_box').toggle();
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
    $('.Js_letter_index ul li').on('click',function(event){
        $(this).parent('ul').find('li').removeClass('active');
        $(this).addClass('active')
        var _thisLetter=$(this).html();
        var s=$(this).parents('.Js_letter_index').siblings('.Js_car_brand_con').find('ul[carbrandtype='+_thisLetter+']').position().top
        $('.car_brand_con').mCustomScrollbar('scrollTo',s);
        event.stopPropagation();
        return false
    })
})