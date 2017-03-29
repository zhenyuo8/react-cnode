/**
 * 文章,视频-评论
 http://172.16.0.102:11300/comment/comment/loadComment
 newId=2062&pageNo=1&queryType=hot&dataType=1&resultCount=3
 */

var util = require('../../util')
var ajax = util.ajax

module.exports = {  
    template: __inline('../../templates/news_comment.html'),
    props: ['id','type'],
    data: function(){
        return {
            list: []
        }
    },
    methods: {
        getData: function(){  
            var self = this  
            ajax({
                url: '/comment/comment/loadComment',
                data: {
                    newId: this.id,
                    pageNo: 1,
                    dataType: this.type || 1,
                    queryType: 'time',
                    resultCount: 3
                },
                success: function(res){
                    if(res.data){
                        self.list = res.data.comment
                    }
                }
            })
        },
        timeago: function(time){
            var commentYear = (new Date(time)).getFullYear()
            var now = new Date()
            var diff = now - time
            if(diff < 60){  
                return '刚刚'
            }else if(diff >= 60 && diff < 60*60){   
                return parseInt(diff/60) + '分钟前'
            }else if(diff >= 60*60 && diff < 24*60*60){
                return parseInt(diff/60/60) + '小时前'
            }else if(commentYear == now.getFullYear()){
                return util.dateFilter(time,'MM-dd')
            }else{  
                return util.dateFilter(time,'yyyy-MM-dd')
            }
            return util.dateFilter(time,'yyyy-MM-dd')
        }
    },
    created: function(){
        this.getData()
    }
}