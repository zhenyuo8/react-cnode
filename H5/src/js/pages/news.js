/**
 * title: xxxxxxxxxxxxx（文章标题）
 * share {
 *  title: 【图文】XXXXXXXX
 *  desc:文章缩略导读
 * }
 * weibo: 【图文】XXXXXXXX 分享自@汽车大全
 * 文章详情页
 * http://172.16.0.102:11300/news/newcar/newsDetailWap/1630
 */
//this.$route.params

var ArticleRelatedCarserials = require('../components/news/related_carserials')
var ArticleMore = require('../components/news/more_acticle')
var ArticleComment = require('../components/news/comment')

var util = require('../util')
var ajax = util.ajax

var votedStore = JSON.parse(localStorage.getItem('qcdqh5_news_vote')) || []

$(function(){
    $(window).scroll(function(){
        var windowHeight = $(window).height();
        if($(window).scrollTop()>windowHeight/2){
            $("#goTop").show();
        }else{
            $("#goTop").hide();
        }
    })
    $("#goTop").on("click",function(){
        $("html,body").animate({scrollTop:0}, 500);
        return false;
    })
})

module.exports = {  
    template: __inline('../templates/news.html'),
    components: {   
        ArticleRelatedCarserials: ArticleRelatedCarserials,
        ArticleMore: ArticleMore,
        ArticleComment: ArticleComment
    },
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            newsId: this.$route.query.newsId,
            article: {
                shortTitle: '',
                sourcename: '',
                author: '',
                publish_time: '',
                pagecount: 0,
                pagetitles: [],
                contents:[]
            },
            isMoreVisible: false,
            isCateVisible: false,
            isVoted: votedStore.indexOf(this.$route.query.newsId) !== -1,
            voteNum: 0
        }
    },
    methods: {  
        showMore: function(){
            this.isMoreVisible = true
            this.isCateVisible = true
        },
        showCate: function(){
            $("#cate_mask").show();
            $("#catalog_area").show().animate({'bottom':'0'},500);
        },
        hideCate: function(){   
            $("#cate_mask").fadeOut();
            $("#catalog_area").animate({'bottom':'-100%'},500,function(){
                $(this).hide()
            });
        },
        goToPos: function(i){   
            var top = $('#pos_'+i).offset().top - $('#pos_0').offset().top
            //alert($('.occupy_seat').height())
            $(window).scrollTop(top)
            this.hideCate()
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
                url: '/news/newcar/newsDetailWap/' + this.newsId,
                success: function(res){
                    self.article = res.data
                    //待优化
                    VueGlobal.setDocTitle(res.data.shorttitle)
                    VueGlobal.setShareConfig({
                        title: '【图文】'+ res.data.shorttitle,
                        desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                        imgUrl: res.data.piccover
                    })
                }
            })
            //获取点赞数
            ajax({  
                url: '/comment/comment/getNewsTotal',
                data: {
                    dataId: this.newsId,
                    dataType: 1
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
                        newsId: this.newsId,
                        dataType: 1
                    },
                    success: function(res){
                        if(res.code === 10000 || res.code === 30002){ 
                            self.voteNum = self.voteNum + 1
                            self.isVoted = true
                            votedStore.push(self.newsId+'')
                            localStorage.setItem('qcdqh5_news_vote',JSON.stringify(votedStore))
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