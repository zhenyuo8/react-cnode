/**
 * title: xxx（车型名称）车型报价
 * share {
 *  title: 汽车大全】 奥迪A4L最新报价信息
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】 奥迪A4L最新报价信息 分享自@汽车大全
 * 首页-报价
 */
var util = require('../../util')
var ajax = util.ajax
var splitArray = util.splitArray

module.exports = {  
    template: __inline('../../templates/carserial_price.html'),
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            rows: [],
            maxpv: 0,
            loading: true,
            swiperOption: {
                pagination : '.swiper-pagination'
            }
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == 'price'
        }
    },
    watch: {    
        'active': function(a){ 
            this.getData()
        }
    },
    methods: {  
        getData: function(){
            var self = this
            if(this.active){   
                this.loading = true 
                ajax({  
                    url: '/car/carparm/queryCarparam',
                    data: { 
                        serialid: this.serialId,
                        salestate: 1
                    },
                    success: function(res){
                        self.loading = false
                        var data = res.data.datas.filter(function(el){
                            return el.salestate === 1 /*|| el.salestate === 0*/
                        })
                        data.sort(
                            util.firstBy(function(a,b){ return b.caryear - a.caryear })
                            .thenBy(function(a,b){ return b.pv - a.pv })
                            .thenBy(function(a,b){ return b.referprice - a.referprice })
                        )
                        self.rows = splitArray(data,3)
                        self.maxpv = res.data.maxPv
                    }   
                })

                //分享
                ajax({  
                    url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                    success: function(res){    
                        //VueGlobal.setDocTitle(res.data.serialName+' 车型报价')
                        VueGlobal.setShareConfig({
                            title: '【汽车大全】'+ res.data.serialName +' 最新报价信息',
                            desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                            imgUrl: res.data.imgUrl
                        })
                    }
                })
            }
        }
    },
    created: function(){  
        this.getData()
    }
}