/**
 * title: 车型名称+年款+车款名称
 * share {
 *  title: 【汽车大全】 奥迪A4L 高清大图
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】 奥迪A4L 高清大图 分享自@汽车大全
 * 图片-大图
 * categoryId=3
 * categoryType=1
 * carYear=2017
 * carId=18367
 * imgId=111
 */

var ajax = require('../util').ajax
var cate = {    
    '3': '外观',
    '4': '内饰',
    '5': '空间'
}

module.exports = {
    template: __inline('../templates/pic_view.html'),
    data: function(){
        var self = this
        return { 
            carId: this.$route.query.carId,
            carYear: this.$route.query.carYear,
            wgId: this.$route.query.wgId,
            nsId: this.$route.query.nsId,
            categoryType: this.$route.query.categoryType,
            categoryId: this.$route.query.categoryId,
            serialId: this.$route.query.serialId,
            imgId: this.$route.query.imgId,
            cateName: cate[this.$route.query.categoryId],
            index: 0,
            //q_carId: this.$route.query.carId, 
            carinfo: {},
            list: [],
            swiperOption: { 
                initialSlide: 0,
                preloadImages: false,
                lazyLoading: true,
                onSlideChangeEnd: function(swiper){
                    //alert(0)
                    self.index = swiper.activeIndex
                    self.carId = self.list[swiper.activeIndex].carId
                }
            }
        }
    },
    computed: {
        swiper: function() {
            return this.$refs.imageSwiper.swiper
        }
    },
    watch: {
        carId: function(){
            this.getCar()
        }
    },
    methods: {  
        getData: function(){
            var self = this
            ajax({   
                url: '/carpic/serialpic/queryPicsByParams',
                data: {
                        carId: this.carId,
                        carYear: this.carYear,
                        wgId: this.wgId,
                        nsId: this.nsId,
                        categoryType: this.categoryType,
                        categoryId: this.categoryId,
                        serialId: this.serialId
                },
                success: function(res){
                    var temp = res.data
                    var index = 0
                    for(var i=0;i<temp.length;i++){ 
                        if(temp[i].imgId == self.imgId){   
                            index = i
                            break
                        }
                    }
                    self.list = temp
                    self.carId = self.list[index].carId
                    self.index = index
                    self.swiper.slideTo(index, 0,false)
                    setTimeout(function(){
                        self.swiper.lazy.loadImageInSlide(index)
                    },0)
                }
            }) 
        },
        getCar: function(){
            if(this.carId){
                var self = this
                ajax({
                    url: '/car/carlevel/getCarBaseParam/' + this.carId,
                    success: function(res){
                        //res.data.dealerminprice = res.data.dealerminprice >0 ? res.data.dealerminprice.toFixed(2) : res.data.dealerminprice
                        //res.data.dealermaxprice = res.data.dealermaxprice.toFixed(2)
                        self.carinfo = res.data
                    }
                })
            }
        }
    },
    created: function(){
        //分享和title，待优化
        ajax({  
            url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
            success: function(res){    
                VueGlobal.setDocTitle(res.data.serialName+' 高清大图')
                VueGlobal.setShareConfig({
                    title: '【汽车大全】'+ res.data.serialName +' 高清大图',
                    desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                    imgUrl: res.data.imgUrl
                })
            }
        })
    },
    mounted: function(){
        this.getData()
        this.getCar()
        $('html').addClass('fullpage')
    },
    destroyed: function(){  
        $('html').removeClass('fullpage')
    }
}