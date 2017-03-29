/**
 * title: 促销详情
 * share: {
 *  title:【促销信息】XXXXX（标题）
 *  desc: 缩略导读
 * }
 * weibo:【促销信息】XXXXX 分享自@汽车大全
 * 促销信息(经销商-新闻详情)
 * http://172.16.0.102:11300/dealer/dealernews/detail/{dealerId}/{serialId}?app_id=5d81db99484c0019cab240b3d04e9a4a&callback=getDealerNewsDetail
 */

var ajax = require('../util').ajax

module.exports = {
    template: __inline('../templates/dealer_news.html'),
    data: function(){   
        return {    
            dealerId: this.$route.query.dealerId,
            serialId: this.$route.query.serialId,
            q_serialId: this.$route.query.q_serialId || this.$route.query.serialId,
            newsTitle: '',
            newsSummary: '',
            cars: []
        }
    },
    methods: {
        getData: function(){
            var self = this
            ajax({  
                url: '/dealer/dealernews/detail/' + this.dealerId + '/' + this.q_serialId,
                success: function(res){
                    if(res.data){
                        self.newsTitle = res.data.newsTitle
                        self.newsSummary = res.data.newsSummary
                        self.cars = res.data.newsList || []

                        VueGlobal.setShareConfig({  
                            title: '【促销信息】' + res.data.newsTitle,
                            desc: res.data.newsSummary
                        })
                    }
                }
            })
        }
    },
    created: function(){
        VueGlobal.setDocTitle('促销详情')
        this.getData()
    }
}