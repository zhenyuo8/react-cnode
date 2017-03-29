(function(){


    var moreTemp = []
    var otherTemp = {}
    var page = 1
    var pageSize = 20
    var doT=require('./libs/doT.js');
    // require('./libs/template.js');
    require('./components/carSelectQuery.js');
    var accord_num_list= require('./tpl/accordNum.html');
    function getUrlParams(){
        var result = {};
        var params = (window.location.search.split('?')[1] || '').split('&');
        for(var param in params) {
            if (params.hasOwnProperty(param)) {
                paramParts = params[param].split('=');
                if(paramParts[0] != ''){
                    result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
                }
            }
        }
        return result;
    }


    function setMore(val){
        if($.isArray(val)){
            moreTemp = val
        }else{
            var index = $.inArray(val,moreTemp)
            if(index >= 0){
                moreTemp.splice(index,1)
            }else{
                moreTemp.push(val)
            }
        }

        var els = $('[data-param="more"]').removeClass('checked');
        var target = els.filter(function(){
            var curVal = $(this).data('val')
            return $.inArray(curVal,moreTemp) >= 0
        }).addClass('checked')
        els.find('i').removeClass('checked')
        target.find('i').addClass('checked')
        var text = '完成' + (moreTemp.length ? '('+ moreTemp.length +')': '')
        $('.car_config .finished').html(text)
    }

    function setOther(name,val){

        var els = $('[data-param="'+ name +'"]')
        var target = els.filter(function(){
            return $(this).data('val') == val
        })
        var showEl = $('[data-name="'+ name +'"]')
        var text = val == '0' ? '' : target.text()
        showEl.find('b').html(text)
        els.removeClass('checked')
        target.addClass('checked')
        $(".right_module_even").animate({
            'right':'-100%'
        }, 500);
        otherTemp[name] = val
        var i = getOhterCount()
        var text = '完成' + (i ? '('+ i +')': '')
        $('.car_more .finished').html(text)
    }

    function getOhterCount(){
        var i = 0
        for(var p in otherTemp){
            if(otherTemp[p] && otherTemp[p] != '0'){
                i++
            }
        }
        return i
    }

    function clearPageAndSort(){
        page = 1
        carSelectQuery.setParam('page',1)
        carSelectQuery.setParam('s',1)
    }

    function bindEvents(){
        //点击一级选项，还原“配置”“更多”的选项（选了之后没有点完成）
        $('.select_condition_nav [data-name]').click(function(){
            var target = $($(this).data('target'))
            $(".mask_area").fadeIn();
            target.animate({'right':'0'}, 500);
            var name = $(this).data('name')
            if(name == 'more'){
                setMore(carSelectQuery.getParam('more').concat())
            }else if(name == 'other'){
                setOther('dt',carSelectQuery.getParam('dt'))
                setOther('f',carSelectQuery.getParam('f'))
                setOther('pf',carSelectQuery.getParam('pf'))
                setOther('dr',carSelectQuery.getParam('dr'))
                setOther('zw',carSelectQuery.getParam('zw'))
            }
        })
        //点击“更多”的二级选项
        $('.car_more [data-name]').click(function(){
            var target = $($(this).data('target'))
            target.animate({'right':'0'}, 500);
        })
        //参数点击
        $('[data-param]').click(function(){
            var name = $(this).data('param')
            var val = $(this).data('val')
            var other = $(this).data('change') === false
            if(name == 'more'){
                setMore(val)
            }else if(other){
                setOther(name,val)
            }else if(name == 'pqd'){
                var p1 = $('input[name="minprice"]').val();
                var p2 = $('input[name="maxprice"]').val();
                val = p1 +'-' +p2;
                $(this).attr('data-val',val);
                carSelectQuery.setParam('p',val)
                $('[data-name="p"]').find('span').html(val+'万')
            }else{
                carSelectQuery.setParam(name,val)
            }
        })

        //价格-点击确定按钮
        // $('.car_price_list').find('.sure_price').click(function(event) {
        //     var p1 = $('input[name="minprice"]').val();
        //     var p2 = $('input[name="maxprice"]').val();

        //     var val = p1 +'-' +p2;
        //     $(this).attr('data-val',val)
        //     carSelectQuery.setParam('p',val);
        //     $('.select_condition_nav li').eq(0).find('span').html(val+'万')
        // });

        //“配置”-点击清空
        $('.car_config .delete_all').click(function(){
            setMore([])
        })
        //配置-点击完成
        $('.car_config .finished').click(function(){
            carSelectQuery.setParam('more',moreTemp)
        })
        //更多-点击清空
        $('.car_more .delete_all').click(function(){
            for(var p in otherTemp){
                setOther(p,'0')
            }
        })
        //更多-点击完成
        $('.car_more .finished').click(function(){
            for(var p in otherTemp){
                carSelectQuery.setParam(p,otherTemp[p])
            }
        })
        //二级弹出-点击返回
        $('.condition_name').click(function(){
            $(".right_module_even").animate({
                'right':'-100%'
            }, 500);
        })
        //点击空白
        $(".mask_area").click(function(){
            $(this).fadeOut();
            $(".right_module_odd").animate({
                'right':'-100%'
            }, 500);
            $(".right_module_even").animate({
                'right':'-100%'
            }, 500);
            $("#rightStyle").animate({
                'right':'-100%'
            }, 500);
        })
        //清除所有条件
        $('.delete_all_c,.clear_condition').click(function(){
            moreTemp = []
            otherTemp = {}
            carSelectQuery.resetAll()
        })
        //加载更多
        $('.load_more_module .load_more').click(function(){
            carSelectQuery.setParam('page',++page)
        })

        //监听所有参数变化，设置样式
        carSelectQuery.events.on('paramChange',function(events, name, val, flag){

            var els = $('[data-param="'+ name +'"]')
            var target = els.filter(function(){
                var curVal = $(this).data('val')
                if(name == 'more'){
                    return $.inArray(curVal,val) >= 0
                }
                return curVal == val
            })
            var other = target.data('change') === false

            if(name == 'more'){ //配置
                setMore(val)
                var showEl = $('[data-name="'+ name +'"]')
                var text = '配置' + ( val.length ? '('+ val.length +')' : '')
                showEl.toggleClass('checked',val.length !== 0).find('span').html(text)
            }else if(other){ //更多
                setOther(name,val)
                var i = getOhterCount()
                var showEl = $('[data-name="'+ name +'"]')
                var text = '更多' + (i ? '('+ i +')': '')
                $('[data-name="other"]').toggleClass('checked',i>0).find('span').html(text)
            }else if(name == 's'){ //排序
                els.find('a').removeClass('current')
                target.find('a').addClass('current')
            }else if(name == 'page'){ //翻页

            }else{ //普通选项
                els.removeClass('checked')
                target.addClass('checked')
                var showEl = $('[data-name="'+ name +'"]')
                var text = val == '0' ? target.data('text') : target.text()
                showEl.toggleClass('checked',val != '0').find('span').html(text)
            }
            //如果不是分页，清空html
            if(name != 'page'){
                $('.result_module ul').html('')
            }
            //如果不是分页和排序，重置分页和排序
            if(name != 'page' && name != 's'){
                clearPageAndSort()
            }
            //关闭弹出层
            $(".mask_area").trigger('click')
        })

        //监听加载中
        carSelectQuery.events.on('loading',function(){
            $('.load_more_module > a').hide()
            if(page > 1){
                 $('.load_more_module .loading').css('display','block')
            }
        })

        //监听数据返回
        carSelectQuery.events.on('fetch',function(events,res){
            if(res.data&&res.data.SerialCount){
                $('.select_resule_none').hide()
                $('.select_result_tab').show()
                $('.result_module ul').append(template('listTpl',res.data))
                $('.load_more_module > a').hide()
                if(page*pageSize < res.data.SerialCount){
                    $('.load_more_module .load_more').css('display','block')
                }else{
                    $('.load_more_module .no_more').css('display','block')
                }
            }else{
                $('.select_resule_none').show()
                $('.select_result_tab').hide()
            }
        })

        //n个车款符合条件
        $('.result_module').on('click','.more_type_sure',function(){
            var urlspell = $(this).data('urlspell');
            var ids = $(this).data('ids');
            var salestate = ''
            getQueryCarparam(urlspell,ids,salestate,function(res){
                $("#car_style_module").html('')
                var accorddatas = filterCarList(res.data.datas);
                console.log(accorddatas)
                var accordmaster = doT.compile(accord_num_list)(accorddatas)
                $("#car_style_module").append(accordmaster);
                console.log(accorddatas)
                $(".mask_area").fadeIn();
                $("#rightStyle").animate({
                    'right':'0'
                }, 500);
            })
        })
    }
    function getQueryCarparam(urlspell,ids,salestate,fn){
        $.ajax({
          url: 'https://m.api.qichedaquan.com/car/carparm/queryCarparam',
          data: {
            'app_id': '5d81db99484c0019cab240b3d04e9a4a',
            'urlspell': urlspell,
            'ids': ids,
            'salestate': salestate
          },
          dataType: 'jsonp',
          success: function(res){
            fn&&fn(res);
          }
        })
    }

    /**
     * 按年款，功率过滤车款
     */
    function getCarKey(el){
        var key = ''
        if(el.fueltype != undefined && el.fueltype == 4){
            //电动车
            key = '电动车' + (el.electricPeakpower ? '&nbsp;&nbsp;' + el.electricPeakpower + 'Kw' : '')
        }else if(el.fueltype != undefined && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')>=0){
            //机动车
            key = el.engineExhaustForFloat + "&nbsp;&nbsp;" + (el.engineMaxPower ? el.engineMaxPower+'Kw' : '') + "&nbsp;&nbsp;" + el.engineAddPressType;
        }else if(el.fueltype != undefined  && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')==-1){
            //机动车-没有增压
            key = el.engineExhaustForFloat + "&nbsp;&nbsp;" + el.engineMaxPower + "Kw";
        }else if(el.fueltype != undefined  && el.fueltype == 3){
            //混动
            key = el.engineExhaustForFloat + "&nbsp;&nbsp;发动机" + el.engineMaxPower + "Kw&nbsp;&nbsp;发电机：" + el.engineMaxPower + "Kw&nbsp;&nbsp;" + el.engineAddPressType
        }else{
            key = '-#-'
        }
        return key
    }
    /**
     * 按年款，功率过滤车款
     */
    function filterCarList(data){
        //engineExhaustForFloat +
        var list = []
        $.each(data,function(i,el){
            // console.log(el)
            var curYear = indexOf(list,function(cur){
                return cur.caryear ===  el.caryear
            })

            if(!curYear){
                list.push({
                    caryear: el.caryear,
                    data: []
                })
                curYear = list[list.length-1]
            }
            var list2 = curYear.data
            var key = getCarKey(el)
            var curLevel = indexOf(list2,function(cur){
                return cur.level === key
            })
            if(!curLevel){
                list2.push({
                    level: key,
                    data: []
                })
                curLevel = list2[list2.length-1]
            }
            curLevel.data.push(el)
        })
        return list
    }
    function indexOf(arr,callback){
        for(var i=0;i<arr.length;i++){
            var flag = callback(arr[i])
            if(flag){
                return arr[i]
            }
        }
        return null
    }

    function init(){
        bindEvents()

        //通过url过来的参数
        var params = getUrlParams()
        for(var p in params){
            var val = params[p]
            if(p == 'more'){
                var arr = val.split('_')
                for(var i=0;i<arr.length;i++){
                    moreTemp[i] = parseInt(arr[i])
                }
                carSelectQuery.setParam(p, moreTemp)
            }else{
                carSelectQuery.setParam(p,val)
            }
        }
        carSelectQuery.events.trigger('paramChange')
    }

    init()


})();
