/**
 * 文章-相关文章
 */

var ajax = require('../../util').ajax

module.exports = {  
    template: __inline('../../templates/news_more.html'),
    data: function(){
        return {    
            serialId: this.$route.query.serialId,
            newsId: this.$route.query.newsId,
            rows: []
        }
    },
    methods: {
        getData: function(){
            var self = this
            ajax({
                url: '/news/carserial/serialnewsdata',
                data: {
                    serialId: this.serialId,
                    pageSize: 5
                },
                success: function(res){
                    self.rows = res.data.newsList.filter(function(el){
                        return el.newsId != self.newsId
                    })
                }
            })
        },
        getHref: function(el){
            if(el.newstype === 1){
                return el.urlMobile
            }
            return '${url_base}/news/detail?newsId=' + el.newsId +(this.serialId?'&serialId='+this.serialId:'')
        }
    },
    created: function(){
        if(this.serialId){
            this.getData()
        }
    }
}