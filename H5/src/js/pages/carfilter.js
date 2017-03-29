/**
 * title: 条件选车
 * share {
 *  title:上班族？越野党？个性选车，就用汽车大全！
 *  desc: 选车，买车、用车，就用【汽车大全】，你喜欢的车子都在这儿！
 * }
 * weibo: 上班族？越野党？个性选车，就用@汽车大全
 * 
 * 条件选车
 * http://172.16.0.102:11300/car/serial/getOptions?app_id=5d81db99484c0019cab240b3d04e9a4a&callback=GetSelectOptions
 */
var ajax = require('../util').ajax
var Slider = require('../components/slider/index')

var carParams = {
    p: '0',  //价格
    l: '0',  //级别
    b: '0',  //车身
    f: '0',  //能源
    g: '0',  //厂商
    c: '0',  //国别
    t: '0',  //变速箱
    d: '0',  //排量
    dt: '0', //驱动
    pf: '0', //排放
    dr: '0', //车门数
    zw: '0', //座位
    more: [] //其他
}

function getCarParams(target){  
    var obj = {}
    for(var c in carParams){    
        if(c === 'more'){   
            if(target.more.length){
                obj.more = target.more.join('_')
            }
        }else{
            if(target[c] != '' && target[c] != '0'){
                obj[c] = target[c]
            }
        }
    }
    if(obj.p == '0-9999'){
        delete obj.p
    }
    return obj
}

module.exports = {  
    template: __inline('../templates/carfilter.html'),
    components: {   
        Slider: Slider
    },
    data: function(){
        return $.extend(JSON.parse(JSON.stringify(carParams)),{
            suv_visible: false,
            bsx_visible: false,
            qd_visible: false,
            resultLink: {},
            total: 0,
            sliderOption: {
                connect: true,
                tooltips: true,
                start: [0,9999],
                //step: 1,
                //margin: 1,
                range: {    
                    'min': [0],
                    '10': [5],
                    '20': [10],
                    '30': [15],
                    '40': [20],
                    '50': [25],
                    '60': [40],
                    '70': [60],
                    '80': [80],
                    '90': [100,9999],
                    'max': [9999]
                },
                pips: { // Show a scale with the slider
                    //mode: 'steps',
                    //stepped: true,
                    //density: 100
                    mode: 'positions',
		            values: [10,20,30,40,50,60,70,80,90],
                    density: 10,
                    stepped: true
                },
                format: {
                    to: function(value){
                        return parseInt(value)
                    },
                    from: function(value){
                        return parseInt(value)
                    }
                }
            }
        })
    },
    methods: {  
        setParam: function(name, value){
            if(name == 'more'){ 
                var index = this.more.indexOf(value)
                if(index < 0){   
                    this.more.push(value)
                }else{  
                    this.more.splice(index,1)
                }
            }else{  
                if(this[name] == value && name !== 'p'){    
                    this[name] = 0
                }else{  
                    this[name] = value
                }
            }
            this.getData()
        },
        mutiCheck: function(name,arr){
            var value = this[name]
            return arr.split(',').indexOf(value) >= 0
        },
        inMore: function(value){ 
            return this.more.indexOf(value) >= 0
        },
        getData: function(){
            var self = this
            var params = getCarParams(this)
            ajax({  
                url: '/car/serial/selectCars',
                cache: false,
                data: params,
                success: function(res){
                    self.total = res.data.SerialCount
                    if(self.showAd(params)){    
                        self.total += 1
                    }
                    if(self.total > 0){
                        var paramStr = $.param(params)
                        self.resultLink = '${url_base}/carselect/show' + (paramStr ? '?'+paramStr : '')
                    }else{  
                        self.resultLink = 'javascript:void(0)'
                    }
                }
            })
        },
        reset: function(){  
            for(var c in carParams){
                if(c == 'more'){    
                    this.more = []
                }else{  
                    this[c] = carParams[c]
                }
            }
            this.$refs.priceSlider.slider.set([0,9999])
            this.getData()
        },
        showAd: function(params){
            for(p in params){    
                if(p != 'l' && params[p] != '0'){   
                    return false
                }
            }
            if(params['l']){  
                return true
            }
            return false
        }
    },
    created: function(){  
        VueGlobal.setDocTitle('条件选车')
        VueGlobal.setShareConfig({  
            title: '从车盲到专家，用汽车大全就够了！',
            desc: '买车无忧，用车不愁，快用【汽车大全】，你喜欢的车子都在这儿！'
        }) 
        this.getData()
    },
    mounted: function(){
        var self = this
        $('body').on('click',function(){    
            self.suv_visible = false
            self.bsx_visible = false
            self.qd_visible = false
        })

        var slider = this.$refs.priceSlider.slider
        var isInit = 0
        var margin = 1

        var lowerParent = $('.noUi-handle-lower')
        var upperParent = $('.noUi-handle-upper')
        var lowerTooltip = lowerParent.find('.noUi-tooltip')
        var upperTooltip = upperParent.find('.noUi-tooltip')
        var lowerNum = $('<div class="show_num"></div>')
        var upperNum = $('<div class="show_num"></div>')

        lowerNum.appendTo(lowerParent)
        upperNum.appendTo(upperParent)

        var setVal = function(val){
            if(val[0] === 9999){ 
                lowerTooltip.html('100+')
            }
            if(val[1] === 9999){ 
                upperTooltip.html('100+')
            }
        }
        var setTooltip = function(handle,val){
            if(isInit > 2){
                var tooltip = handle === 0 ? lowerNum : upperNum
                if(val === 9999){
                    val = '100+'
                }
                tooltip.html(val).show()
            }else{
                isInit++
            }
        }

        slider.on('update',function(values, handle){ 
            setVal(values)
        })

        slider.on('slide',function(values,handle){
            setTooltip(handle,values[handle])
        })
    
        slider.on('change',function(values, handle){ 
            var minVal = values[0]
            var maxVal = values[1]
            if(handle === 0 && minVal === 9999){    
                slider.set([100,9999])
                minVal = 100
                maxVal = 9999
            }else if(handle === 1 && minVal === 100 && maxVal === 100){
                slider.set([100,9999])
                minVal = 100
                maxVal = 9999
            }else if(handle === 0 && (maxVal-minVal<margin) && maxVal<=100){   
                slider.set([maxVal-margin,maxVal])
                minVal = maxVal-margin
                maxVal = maxVal
            }else if(handle === 1 && (maxVal-minVal<margin)){   
                slider.set([minVal,minVal+margin])
                minVal = minVal
                maxVal = minVal+margin
            }
            
            var price = minVal + '-' + maxVal
            self.setParam('p',price)
            $('.show_num').hide()
        })
        
    }

}