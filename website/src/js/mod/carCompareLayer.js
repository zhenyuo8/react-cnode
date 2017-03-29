var cookie = require('./cookie')

require('./../layer/layer');
/**
 * 车款选择，先写死dom，后期如需复用再改进
 */

var carSelecter = function(opt){

    var selectArr = []

    init()

    function init(){    
        bindEvents()
        $('.car-type-scroll-list').html('<dl></dl>')
        $('.car-style-scroll-list').html('<dl></dl>')
    }

    function bindEvents(){  
        $(document).on('click',function(){  
            $('.brand_scroll_area,.js_car_type,.js_car_style').hide()
            $('.choice_brand').show()
        })
        $('.search_input').on('click',function(event){
            event.stopPropagation()
        })
        $('.js_brand').on('click',showCarBrand)
        $('.choice_brand').on('click','.brand-list-a li',showCarType)
        $('.js_car_type').on('click','dd',showCarStyle)
        $('.js_car_style').on('click','dd',onSelect)
        $('.js_b_tit').on('click',function(event){  
            fixPosition('brand')
        })
        $('.car_style_scroll_area .choice_route span:eq(0)').on('click',function(event){  
            fixPosition('brand')
        })
        $('.car_style_scroll_area .choice_route span:eq(1)').on('click',function(event){  
            fixPosition('type')
        })
        $('.brand-letter-index span').on('click',function(){ 
            var letter = $(this).text()
            var parent
            $('.brand-list-a li').each(function(i,el){  
                var text = $.trim($(el).text()).substr(0,1)
                if(text == letter && !parent){
                    parent = $(el).closest('.brand-list-a')
                }
            })
            var top = parent.position().top + $('.brand-scroll-list').scrollTop() - 8
            $('.brand-scroll-list').scrollTop(top)
        })
    }

    function onSelect(event){  
        var el = $(event.currentTarget) 
        var id = el.attr('id')
        var name = el.find('span').text()
        selectArr[2] = el.attr('year') + ' ' + name
        $('.js_car_style').hide()
        $('.choice_brand').show() 
        if(id){
            opt.onSelect({
                id: id,
                text: selectArr.join('-')
            })
        }
    }

    function fixPosition(type){ 
        var height = $('.search_input').offset().top-$(window).scrollTop() - 50
        $('.choice_brand').hide()
        $('.js_car_style').hide()
        $('.js_car_type').hide()

        if(type == 'brand'){
            $('.choice_brand').show()
            $('.brand_scroll_area').show()
            $('.brand-scroll-list,.brand-scroll-list-box').css('height',height)
            $('.brand-scroll-list ul li').css({ 
                width: 182
            })
            $('.brand-letter-index').css({
                height: height,
                width: 40,
                'overflow-y': 'auto'
            }) 
        }else if(type == 'type'){
            $('.js_car_type').show()
            $('.brand_scroll_area').hide()
            $('.car-type-scroll-list').css('height',height)
        }else if(type == 'style'){
            $('.js_car_style').show()
            $('.car-style-scroll-list').css('height',height)
        }
    }

    function showCarBrand(){
        fixPosition('brand')
    }

    function showCarType(event){ 
        var el = $(event.currentTarget)
        var id = el.attr('id')
        if(id){
            var name = el.find('span').text()
            var html = ''
            $('.js_b_tit').html(name)
            selectArr[0] = name
            fixPosition('type')
            $.ajax({    
                url: 'http://car.qichedaquan.com/carSerialSummary/getCarSerialNames?brandid=' + id,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data){
                    for(var i=0;i<data.length;i++){ 
                        html += '<dd id="'+ data[i].id +'">'+ data[i].name +'</dd>'
                    }
                    if(data.length === 0){  
                        html += '<dd>暂无</dd>'
                    }
                    $('.choice_car_type dl').html(html)
                }
            })
        }
    }

    function showCarStyle(event){  
        var el = $(event.currentTarget)
        var id = el.attr('id')
        if(id){
            var name = el.text()
            var html = '' 
            $('.car_style_scroll_area .choice_route span:eq(0)').html(selectArr[0])
            $('.car_style_scroll_area .choice_route span:eq(1)').html(name)
            selectArr[1] = name
            fixPosition('style')
            $.ajax({    
                url: 'http://car.qichedaquan.com/carSerialSummary/getCarParamNames?serialid=' + id,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data){    
                    var years = {}
                    var sale_state = '';
                    for(var i=0;i<data.length;i++){ 
                        var item = data[i]
                        if(!years[item.caryear]){
                            years[item.caryear] = true
                            html += '<dt>'+ item.caryear +'款</dt>'
                        }
                        if(item.salestate=="停售"){
                            sale_state = "停售"
                        }else if(item.salestate=="未上市"){
                            sale_state = "未上市"
                        }else{
                            if(item.dealerminprice>0){
                                sale_state = item.dealerminprice+'万起';
                            }else{
                                sale_state = "暂无报价"
                            }
                        }
                        html += '<dd id="'+ item.id +'" year="'+ item.caryear +'款"><span title="'+ item.name +'">'+ item.name +'</span><i>'+ sale_state +'</i></dd>'
                    }
                    if(data.length === 0){  
                        html += '<dd>暂无</dd>'
                    }
                    $('.choice_car_style dl').html(html)
                }
            })
        }
    }

}

var callbacks = {}; //最简单的事件监听
var emit = function (name, da) {
    var call = callbacks[name];
    if (call) {
        var i = 0, l = call.length;
        for (; i < l; i++) {
            call[i](da);
        }
    }
}

/**
 * 车型对比弹出层
 */

var carCompareLayer = (function(){ 

    var STORE_NAME = 'car_compare_data'
    var cache
    var el 

    try{    
        cache = JSON.parse($.cookie(STORE_NAME,undefined,{path:'/'}))
    }catch(e){   
        cache = []
    }
    //渲染列表
    function renderList(){ 
        var html = ''
        var link = ''
        for(var i=0;i<cache.length;i++){    
            html += '<li><a>'+ cache[i].text +'</a><i class="delete_icon"></i></li>'
            link += ',' + cache[i].id
        }
        $('.js_search_his').html(html)
        $('.js_constract i').html(cache.length)
        //判断对比按钮状态
        if(cache.length){   
            $('.dis_click').hide()
            $('.sure_click').css('display','block').attr('href','/carparam/muti/'+link.substr(1))
        }else{  
            $('.dis_click').show()
            $('.sure_click').hide()
        }
        setBtnState()
    }

    //修改页面对比按钮状态
    function setBtnState(){  
        $('a.contrast_btn').show();
        $('a.contrast_btn').siblings('span').hide();

        for(var i=0;i<cache.length;i++){
            var el = $('#'+cache[i].id);
            if(!el.hasClass('contrast_btn')){   
                el = el.parents('.contrast_btn')
            }
            //$('#'+cache[i].id).parents('.contrast_btn').hide();
            //$('#'+cache[i].id).parents('.contrast_btn').siblings('span').show();
            el.hide()
            el.siblings('span').show();
        }
    }

    function init(){    
        carSelecter({
            onSelect: addCar
        })
        bindEvents()
        renderList()
    }

    function bindEvents(){ 
        $('.type_constract')
            .on('click','.delete_icon',removeCar)
            .on('click','.clear_all',removeAllCars)
            .on('click','.js_hide',function(event){event.stopPropagation();$('.js_con_list').hide()})
            .on('click','.js_constract',function(event){event.stopPropagation();$('.js_con_list').toggle()})
        //点击页面车型对比弹出框消失
        $(document).on('click',function(){  
            $('.js_con_list').hide();
        })
    }
    //判断是否存在
    function hasCar(carid){  
        for(var i=0;i<cache.length;i++){  
            if(carid === cache[i].id){ 
                return true
            }  
        }
        return false
    }
    //添加一个
    function addCar(car,success,error){ 
        if(cache.length === 10){
            error && error()    
            layer.msg('最多选择10个车款。');
        }else{  
            if(!hasCar(car.id)){
                success && success(car)
                cache.push(car)
                $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
                renderList()
            }else{  
                error && error()
                layer.msg('已添加到对比。');
            }
        }
        $('.js_con_list').show()
    }
    //删除一个
    function removeCar(event){  
        event.stopPropagation()
        var target = event.currentTarget
        if(target){
            var li = $(target).closest('li')
            var index = $('.js_search_his li').index(li)
            cache.splice(index,1)
            $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
            renderList();

            emit('remove');
        }
    }
    //清空
    function removeAllCars(event){ 
        event.stopPropagation()
        cache = []
        $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
        renderList()
    }

    return {    
        init: init,
        addCar: addCar,
        hasCar: hasCar,
        getData: function(){ 
            return cache
        },
        setBtnState: setBtnState,
        on: function (name, fn) {
            if (callbacks[name]) {
                callbacks[name].push(fn);
            } else {
                callbacks[name] = [fn];
            }
        }
    }

})();

$(function(){
    if($('.type_constract')[0]){
        carCompareLayer.init()
    }
    $('#position_fixed').css('z-index',999)
})


module.exports = carCompareLayer