/**
 * 视频-相关车型
 */

var ajax = require('../../util').ajax

module.exports = {  
    template: __inline('../../templates/video_related_carserials.html'),
    data: function(){
        return {    
            videoId: this.$route.query.videoId,
            rows: []
        }
    },
    methods: {
        getData: function(){
            var self = this
            ajax({  
                url: '/video/video/queryCarSerialInfo/' + this.videoId,
                success: function(res){
                    if(res.code === 10000){
                        self.rows = res.data
                    }
                }
            })
        }
    },
    created: function(){
        this.getData()
    }
}