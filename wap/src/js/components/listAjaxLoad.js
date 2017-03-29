/**
 * ajax列表(加载更多按钮)
 */
(function(){

    function ListAjaxLoad(options){    
        this.options = $.extend(true,{
            initSize: 20, //首次加载条数
            size: 10, //加载条数
            maxSize: 400, //最多加载条数
            ajax: {},
            //参数映射
            params: {
                pageSize: 'pageSize',
                start: 'start'
            },
            dataFilter: function(data){
                return data
            },
            moreEl: '.load_more_module',
            listEl: '.content',
            template: ''
        },options)
        this.init()
    }

    ListAjaxLoad.prototype = {
        init: function(){   
            this.options.ajax.success = this.onSuccess.bind(this)
            this.firstLoad = false
            this.start = 0
            this.totalNum = 0
            this.state = ''
            this.moreEl = $(this.options.moreEl)
            this.listEl = $(this.options.listEl)

            var templateStr = ''
            if($.isFunction(this.options.template)){   
                templateStr = this.options.template()
            }else{  
                templateStr = $(this.options.template).html()
            }
            this.template = _.template(templateStr)
            this.bindEvents()
            this.getData()
        },
        bindEvents: function(){
            this.moreEl.on('click',$.proxy(this.getData,this))
        },
        appendList: function(data){ 
            this.listEl.append(this.template(data))
            this.options.onRendered && this.options.onRendered() //后期加广告?
        },
        setMoreBtn: function(state){
            var html = ''  
            switch(state){  
                case 0: 
                    html = '<a href="#" class="load_more">加载更多<img src="img/down.png"></a>';
                    break;
                case 1: 
                    html = '<a href="#" class="loading"><img src="img/load_icon.png"></a>';
                    break;
                case 2: 
                    html = '<a href="#" class="no_more">没有更多了...</a>';
                    break
                default: break;
            }
            this.state = state
            this.moreEl.html(html)
        },
        getData: function(e){  
            e && e.preventDefault()
            if(this.state === 1 || this.state === 2){    
                return 
            }
            var ajaxOpt = this.options.ajax
            var params = this.options.params
            ajaxOpt.data[params.start] = this.start
            ajaxOpt.data[params.pageSize] = this.firstLoad ? this.options.size : this.options.initSize
            this.onLoading()
            $.ajax(ajaxOpt)
        },
        onLoading: function(){
            if(this.firstLoad){ 
                this.setMoreBtn(1)
            }
        },
        onSuccess: function(data){
            var result = this.options.dataFilter(data)
            if(!this.firstLoad){   
                this.firstLoad = true
            }
            this.totalNum += result.data.length
            this.start = this.totalNum
            this.appendList(result)
            if(this.totalNum >= result.totalSize || this.totalNum >= this.options.maxSize){ 
                this.setMoreBtn(2)
            }else{  
                this.setMoreBtn(0)
            }
        }
    }

    window.ListAjaxLoad = ListAjaxLoad

})();