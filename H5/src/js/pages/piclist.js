/**
 * title: xxx（车型名称）车型图片
 * share {
 *  title: 【汽车大全】 奥迪A4L 车型图片
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】 奥迪A4L 高清大图 分享自@汽车大全
 * 图片列表
 * http://172.16.0.102:11400/carpic/serialpic/queryCarSerialPicPageByParams?serialId=2660&carYear=2016&categoryId=3&categoryType=1
 * pageNow
 * pageSize
 * carId
 * wgId
 * nsId
 * http://172.16.0.102:11300/car/serial/queryCarParamsByParams?serialId=2660
 * 
 */
var util = require('../util')
var ajax = util.ajax

function getYearIndex(data,year){
    for(var i=0;i<data.length;i++){
        if(data[i].carYear == year){    
            return data[i]
        }
    }
    return null
}

function filterCarStyle(data){
    return data.filter(function(item){
        return item.picCount > 0 && item.saleState !== -1
    })
}

function filterColor(data){
    return data.filter(function(item){  
        return item.picCount > 0
    })
}

module.exports = {  
    template: __inline('../templates/piclist.html'),
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            categoryId: this.$route.query.categoryId,
            categoryType: 1,
            categorys: [],
            rows: [],
            state: 0,
            pageSize: 18,
            page: 1,
            carYear: '',
            carId: '',
            wgId: '',
            nsId: '',
            //分类
            carStyles: [],
            carYears: [],
            nsCarColors: [],
            wgCarColors: [],
            carColors: [],
            //图标
            isCarIconVisible: true,
            isColorIconVisible: true
        }
    },
    watch: {    
        categoryId: function(){
            this.page = 1
            this.rows = []
            this.getData()
        },
        page: function(p){
            if(p == 1){ 
                $(window).scrollTop(0)
            }
        }
    },
    methods: {  
        showLayer: function(name){
            $('.filter_'+name).animate({
		        right: '0'
		    }, 500)
            $(".mask_area").show();
            VueGlobal.mask = true
        },
        hideLayer: function(){
            $(".mask_area").fadeOut(300);
            $('.filter_car,.filter_color').animate({    
                right: '-100%'
            })
            VueGlobal.mask = false
        },
        changeCar: function(id,caryear){
            this.carId = id
            this.carYear = caryear
            this.wgId = ''
            this.nsId = ''
            this.page = 1
            this.rows = []
            this.getData()
            this.hideLayer()
        },
        changeColor: function(type,id,caryear){
            if(type == 'wg'){ 
                this.wgId = id
                this.nsId = ''
                this.carYear = caryear
            }else if(type == 'ns'){
                this.nsId = id
                this.wgId = ''
                this.carYear = caryear
            }else{  
                this.wgId = ''
                this.nsId = ''
            }
            this.carId = ''
            this.page = 1
            this.rows = []
            this.getData()
            this.hideLayer()
        },
        getTypeData: function(){    
            var self = this
            //车款
            ajax({  
                url: '/car/serial/queryCarParamsByParams',
                data: {
                    serialId: this.serialId
                },
                success: function(res){  
                    var carTemp = filterCarStyle(res.data.carStyles)
                    var carIds = carTemp.map(function(el){
                        return el.id
                    })

                    if(carIds.length <= 1){ 
                        self.isCarIconVisible = false
                    }else{  
                        ajax({
                            url: '/car/carparm/queryCarparam',
                            data: {
                                serialid: self.serialId,
                                ids: carIds.join(',')
                                //salestate: 1
                            },
                            success: function(res){
                                self.carStyles = util.filterCarList(res.data.datas)
                            }
                        })
                    }
                    
                }
            })
            //颜色
            ajax({
                url: '/car/serial/queryCarColorsBySerialId/' + this.serialId,
                success: function(res){
                    var colorData = res.data
                    var nslen = 0
                    var wglen =  0
                    if(colorData[0] && colorData[0].nsColors){    
                        nslen = colorData[0].nsColors.length
                    }
                    if(colorData[0] && colorData[0].wgColors){    
                        wglen = colorData[0].wgColors.length
                    }
                    if(colorData.length <= 1 && (nslen+wglen<=1)){
                        self.isColorIconVisible = false
                    }
                    self.carColors = colorData
                }
            })
        },
        getCateData: function(){
            var self = this
            ajax({
                url: '/carpic/serialpic/queryCarSerialPicCategoryForNewsDetail/' + this.serialId,
                success: function(res){
                    self.categorys = res.data.filter(function(item){ 
                        //外观，内饰，空间
                        return item.categoryType === 1
                    })
                }
            })
        },
        getData: function(){
            var self = this
            this.state = 1
            ajax({  
                url: '/carpic/serialpic/queryCarSerialPicPageByParams',
                data: { 
                    serialId: this.serialId,
                    carYear: this.carYear,
                    categoryId: this.categoryId,
                    categoryType: this.categoryType,
                    pageSize: this.pageSize,
                    pageNow: this.page,
                    carId: this.carId,
                    wgId: this.wgId,
                    nsId: this.nsId
                },
                success: function(res){    
                    self.rows = self.rows.concat(res.data)
                    self.state = self.pageSize*self.page >= res.page.totalCount ? 3 : 2
                }
            })
        },
        onScroll: function(){ 
            var height = $(window).scrollTop() + $(window).height()
            var bodyHeight = $('body').height()
            if(height >= bodyHeight - 30){ 
                var self = this
                setTimeout(function(){
                    self.nextPage()
                },300)
            }
        },
        nextPage: function(){
            if(this.state == 1 || this.state == 3){   
                return
            } 
            this.page++
            this.getData()
        }
    },
    created: function(){    
        this.getData()
        this.getCateData()
        this.getTypeData()
        ajax({  
            url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
            success: function(res){    
                VueGlobal.setDocTitle(res.data.serialName+' 车型图片')
                VueGlobal.setShareConfig({
                    title: '【汽车大全】'+ res.data.serialName +' 车型图片',
                    desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                    imgUrl: res.data.imgUrl
                })
            }
        })
        
    },
    mounted: function(){
        $(window).on('scroll',this.onScroll.bind(this))
    },
    destroyed: function(){
        $(window).off('scroll',this.onScroll)
    }
    
}