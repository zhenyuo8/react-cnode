/**
 * title: xxx（车型名称）评测导购
 * share {
 *  title: 【汽车大全】 奥迪A4L 评测导购
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】 奥迪A4L 评测导购 分享自@汽车大全
 * 首页-文章
 */

var util = require('../../util')
var service = require('../../service')
var ajax = util.ajax
var splitArray = util.splitArray

module.exports = {  
    template: __inline('../../templates/carserial_news.html'),
    data: function(){
        return {    
            serialId: this.$route.query.serialId,
            rows: [],
            originData: [],
            loading: true,
            swiperOption: {
                pagination : '.swiper-pagination'
            }
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == 'news'
        }
    },
    watch: {    
        'active': function(a){ 
            this.getData()
        },
        'originData': function(){
            this.rows = util.splitArray(this.originData,5)
        }
    },
    methods: {  
        getData: function(){
            var self = this
            if(this.active && this.originData.length === 0){   
                this.loading = true 
                ajax({  
                    url: '/news/carserial/serialnewsdata',
                    data: {
                        serialId: this.serialId,
                        pageSize: 30
                    },
                    success: function(res){
                        self.loading = false
                        if(res.data && res.data.newsList){
                            self.originData = res.data.newsList
                            //广告
                            var firstAd = false
                            service.getAds({ids:'7b5488d8-a671-4772-bf2c-a08534028875'},function(res){
                                firstAd = true
                                self.originData.splice(4,0,res[0])
                            })
                            service.getAds({ids:'57ef20f6-8993-4a8b-be9f-4dea0b9c0a22',area:true},function(res){
                                if(self.originData.length > 5){
                                    var i = firstAd ? 9 : 8
                                    self.originData.splice(i,0,res[0])
                                }
                            })
                        }
                    }
                })

                //分享
                ajax({  
                    url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                    success: function(res){    
                        //VueGlobal.setDocTitle(res.data.serialName+' 评测导购')
                        VueGlobal.setShareConfig({
                            title: '【汽车大全】'+ res.data.serialName +' 评测导购',
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