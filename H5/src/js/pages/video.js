/**
 * title: xxxxxxxxxxxxxx（视频标题）
 * share {
 *  title: 【视频】XXXXXXXX
 *  desc:更多精彩尽在汽车大全
 * }
 * weibo: 【视频】XXXXXXXX 分享自@汽车大全
 * 视频详情页
 */

var VideoRelatedCarserials = require('../components/video/related_carserials')
var VideoMore = require('../components/video/more_video')
var ArticleComment = require('../components/news/comment')

var util = require('../util')
var ajax = util.ajax

var votedStore = JSON.parse(localStorage.getItem('qcdqh5_video_vote')) || []

module.exports = {
    template: __inline('../templates/video.html'),
    components: {   
        VideoRelatedCarserials: VideoRelatedCarserials,
        ArticleComment: ArticleComment,
        VideoMore: VideoMore
    },
    data: function(){
        return {    
            serialId: this.$route.query.serialId,
            videoId: this.$route.query.videoId,
            video: {
                publishtime: ''
            },
            isVoted: votedStore.indexOf(this.$route.query.videoId) !== -1,
            voteNum: 0
        }
    },
    methods: {
        initPlayer: function(youkuId){
            var callback = function(){
                player = new YKU.Player('youkuplayer',{
                    styleid: '0',
                    client_id: '8dea6b110e2bc49d',
                    vid: youkuId,
                    newPlayer: true
                });
            }
            if(window.YKU){
                callback()
            }else{  
                $.getScript('//player.youku.com/jsapi',function(){
                    callback()
                })
            }
        },
        download: function(event){
           var ua = navigator.userAgent
            if(ua.toLowerCase().indexOf('micromessenger') != -1){
                event.preventDefault()
                $("#down_mask").show();
                if(/(?:Android)/.test(ua)){
                    $("#android_tip").show();
                }else{
                    $("#ios_tip").show();
                }
            }
        },
        hideDownload: function(){
            $("#down_mask").hide();
            $(".down_app_tip").hide();
        },
        getData: function(){
            var self = this
            ajax({  
                url: '/video/video/singlevideo/' + this.videoId,
                success: function(res){
                    self.video = res.data
                    if(res.data && res.data.youkuPlayerId){
                        self.initPlayer(res.data.youkuPlayerId)
                    }
                    //待优化
                    VueGlobal.setDocTitle(res.data.shortTitle)
                    VueGlobal.setShareConfig({
                        title: '【视频】'+ res.data.shortTitle,
                        desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                        imgUrl: res.data.coverpic
                    })
                }
            })

            //获取点赞数
            ajax({  
                url: '/comment/comment/getNewsTotal',
                data: {
                    dataId: this.videoId,
                    dataType: 2
                },
                success: function(res){
                    self.voteNum = res.data.voteCount
                }
            })
        },
        share: function(){
            util.openShare()
        },
        vote: function(){
            var self = this
            if(!this.isVoted){    
                ajax({
                    url: '/comment/comment/doVote',
                    data: {
                        newsId: this.videoId,
                        dataType: 2
                    },
                    success: function(res){
                        if(res.code === 10000 || res.code === 30002){ 
                            self.voteNum = self.voteNum + 1
                            self.isVoted = true
                            votedStore.push(self.videoId+'')
                            localStorage.setItem('qcdqh5_video_vote',JSON.stringify(votedStore))
                        }
                    }
                })
            }
        }
    },
    created: function(){    
        this.getData()
    }
}