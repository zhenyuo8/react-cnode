/**
 * 视频-相关视频
 */

var ajax = require('../../util').ajax

module.exports = {  
    template: __inline('../../templates/video_more.html'),
    data: function(){
        return {    
            videoId: this.$route.query.videoId,
            serialId: this.$route.query.serialId,
            rows: []
        }
    },
    methods: {
        getData: function(){
            var self = this
            ajax({
                url: '/video/video/relation/' + this.videoId,
                success: function(res){
                    self.rows = res.data
                }
            })
        },
        getHref: function(videoId){
            return '${url_base}/video/detail?videoId=' + videoId +(this.serialId?'&serialId='+this.serialId:'')
        }
    },
    created: function(){
        this.getData()
    }
}