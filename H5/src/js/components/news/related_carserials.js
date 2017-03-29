/**
 * 文章-相关车型
 * http://172.16.0.102:11300/news/carserial/querySimpleCarSerialsByNewsid/1947
 */

var ajax = require('../../util').ajax


module.exports = {  
    template: __inline('../../templates/news_related_carserials.html'),
    data: function(){
        return {    
            newsId: this.$route.query.newsId,
            rows: []
        }
    },
    methods: {
        getData: function(){
            var self = this
            ajax({  
                url: '/news/carserial/querySimpleCarSerialsByNewsid/' + this.newsId,
                success: function(res){
                    self.rows = res.data.filter(function(el){
                        return el.saleState === 1
                    })
                }
            })
        }
    },
    created: function(){
        this.getData()
    }
}