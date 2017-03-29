/**
 * title: 看了又看
 * share {
 *  title: 【汽车大全】奥迪A4L相关车型推荐
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】奥迪A4L相关车型推荐  分享自@汽车大全
 * 首页-车型推荐
 */

var util = require('../../util')
var service = require('../../service')
var ajax = util.ajax

var adIds = {
    //中小型车
    "微型车":"3ec83e02-ead8-4f09-8f6d-faca9de07482",
    "小型车":"3ec83e02-ead8-4f09-8f6d-faca9de07482",
    "紧凑型车":"3ec83e02-ead8-4f09-8f6d-faca9de07482",
    //中大型车
    "中型车": "cd5aaf21-250c-4c45-8af0-2851bafcbccf",
    "中大型车": "cd5aaf21-250c-4c45-8af0-2851bafcbccf",
    "豪华车": "cd5aaf21-250c-4c45-8af0-2851bafcbccf",
    "跑车": "cd5aaf21-250c-4c45-8af0-2851bafcbccf",
    //SUV
    "SUV": "2e4d16d0-38c0-4924-acd6-c258391dafbd",
    //MPV
    "MPV": "abacb4a7-45eb-413a-955f-1fc5b657f61a"
}

module.exports = {
    template: __inline('../../templates/carserial_tj.html'),
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            list: [],
            originData: [],
            swiperOption: {
                effect: 'coverflow',
                coverflow: {
                    rotate: 0,
                    stretch: 30,
                    depth: 50,
                    modifier: 2,
                    slideShadows : false
                },
                pagination : '.swiper-pagination'
            }
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == 'tj'
        }
    },
    watch: {
        'active': function(a){
            this.getData()
        },
        'originData': function(){
            var data = this.originData.slice(0,6)
            this.list = util.splitArray(data,3)
        }
    },
    methods: {
        getData: function(){
            var self = this
            if(this.active && this.originData.length === 0){
                self.originData = []
                ajax({
                    url: '/car/serial/queryMoreCarSerialBySerialId/'+ this.serialId + '/6',
                    success: function(res){
                        if(self.originData.length){
                            self.originData = self.originData.concat(res.data)
                        }else{
                            self.originData = res.data
                        }
                    }
                })
                //第一个为广告
                ajax({
                    url: '/car/serial/querySerialCarYearGeneral',
                    data: {
                        serialid: self.serialId,
                        salestate: 1
                    },
                    success: function(res){
                        if(res.data){
                            var adid = adIds[res.data.levelName.toUpperCase()]
                            if(!adid){
                                adid = adIds['MPV']
                            }
                            service.getAds({ids:adid},function(res){
                                if(self.originData.length){
                                    self.originData.unshift(res[0])
                                }else{
                                    self.originData = res
                                }
                            })
                        }
                    }
                })
                //分享
                ajax({
                    url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                    success: function(res){
                        //VueGlobal.setDocTitle('看了又看')
                        VueGlobal.setShareConfig({
                            title: '【汽车大全】'+ res.data.serialName +' 相关车型推荐',
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
