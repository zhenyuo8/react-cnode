(function(){


    var moreTemp = []
    var otherTemp = {}
    var page = 1
    var pageSize = 20

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
            }else{
                carSelectQuery.setParam(name,val)
            }
        })
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
            if(res.data.SerialCount){   
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