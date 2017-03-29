

var cookie = require('./../_cookie')
var alertMod = require('./alertMod.js');
var carSelecter = function(opt){

    var selectArr = []

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
        for(var i=0;i<cache.length;i++){    
            // html += '<li><a>'+ cache[i].text +'</a><i class="delete_icon"></i></li>'
            html += '<li data-id="'+ cache[i].id +'"><a href="#"><p class="style_name">'+ cache[i].text +'</p><p class="style_price clearfix"><span>'+ (cache[i].dealerminprice&&cache[i].dealerminprice>0?cache[i].dealerminprice+'万起':"无") +'</span><span class="style_zd_price">指导价：'+ cache[i].price +'万</span></p></a><span class="delete_c_h"></span></li>'
        }
        $('#duibiliebiao').html(html)
        $('#contrastBtn span').html(cache.length)
        $('.duibiNum').html(cache.length)
        setBtnState()
    }

    function init(){    
        carSelecter({
            onSelect: addCar
        })
        bindEvents()
        renderList()
    }

    function bindEvents(){ 
        $('.right_contrast_module')
            .on('click','.delete_c_h',removeCar)
            .on('click','.delete_all',removeAllCars)
            
        //点击页面车型对比弹出框消失
        $(document).on('click',function(){  
            $('.js_con_list').hide();
        })
        $('.begin_contrast').click(function(){
            startCompare();
        })
        
    }

    //修改页面对比按钮状态
    function setBtnState(){  
        $('.in_contrast').html("加入对比");
        $('.in_contrast').css({
            color: "#333"
        });
        $('.carbiInfoHeader').find('li i').removeClass('addback');
        for(var i=0;i<cache.length;i++){
            var mzEl = $('#'+cache[i].id);
            if(mzEl.hasClass('in_contrast')){   
                mzEl = $('.in_contrast').eq(i)
                mzEl.html("已加入对比");
                mzEl.css({
                    color: "#ccc"
                })
            }
            mzEl.addClass('addback')
            
        }
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
        if(cache.length === 4){
            error && error()    
            alertMod.alertDiv({type:"2",des:"最多选择4个车款。",time:"1200",fn:function(){}});
            // alert('最多选择4个车款。')
        }else{  
            if(!hasCar(car.id)){
                success && success(car)
                cache.push(car)
                $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
                renderList()
                alertMod.alertDiv({type:"2",des:"已添加到对比。",time:"1200",fn:function(){}});
            }else{  
                error && error()
                alertMod.alertDiv({type:"2",des:"已添加到对比。",time:"1200",fn:function(){}});
                // alert('已添加到对比。')
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
            var index = $('#duibiliebiao li').index(li)
            cache.splice(index,1)
            $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
            renderList()
        }
    }
    //清空
    function removeAllCars(event){ 
        event.stopPropagation()
        cache = []
        $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
        renderList()
        $('.mask_area').hide();
        $(".right_contrast_module").animate({right:"-100%"}, 500);
    }

    //开始对比
    function startCompare(){
        var idStr = '';
        var biao = $('#duibiliebiao').find('li');
        var len = biao.length;
        for(var i=0;i<len;i++){
            idStr+=biao.eq(i).data('id')+',';
        }
        idStr = idStr.slice(0,-1)
        window.location.href = "/carparam/muti/"+idStr;
        $('.mask_area').hide();
        $(".right_contrast_module").animate({right:"-100%"}, 500);
    }

    return {    
        init: init,
        addCar: addCar,
        hasCar: hasCar,
        getData: function(){ 
            return cache
        },
        setBtnState: setBtnState
    }

})();

$(function(){
    carCompareLayer.init()
    
})


module.exports = carCompareLayer