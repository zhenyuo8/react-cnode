/**
 * title: xxx（车型名称）经销商信息
 * share: {
 *  title:【汽车大全】北京燕杰奥迪4S店（店名）
 *  desc: 查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】北京燕杰奥迪4S店 分享自@汽车大全
 * 经销商 
 *  http://172.16.0.102:11300/dealer/dealerinfo/detail/{dealerId}?serialId=2715&queryNews=1&queryFirstNew=1
 */
var ajax = require('../util').ajax
var map;

module.exports = {
    template: __inline('../templates/dealer.html'),
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            dealerId: this.$route.query.dealerId,
            info: {},
            newslist: []
        }
    },
    methods: {  
        getData: function(){
            var self = this
            ajax({  
                url: '/dealer/dealerinfo/detail/' + this.dealerId,
                data: {
                    serialId: this.serialId, //当前车系？
                    queryNews: 1
                },
                success: function(res){
                    self.info = res.data.detailInfo
                    self.newslist = res.data.newsList

                    VueGlobal.setDocTitle(res.data.serialInfo.serialName+' 经销商信息')
                    VueGlobal.setShareConfig({
                        title: '【汽车大全】'+ self.info.fullName,
                        desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                        imgUrl: res.data.imgUrl
                    })
                    
                    //地图
                    map = new BMap.Map("allmap");            // 创建Map实例
                    var point = new BMap.Point(self.info.longitude,self.info.latitude)
                    var marker = new BMap.Marker(point);  // 创建标注
	                map.addOverlay(marker);              // 将标注添加到地图中
                    map.centerAndZoom(point,15);   
                }
            })
        }
    },
    created: function(){
        this.getData()
    },
    destroyed: function(){
        $('#allmap').remove()
        map = null
        point = null
    }
}