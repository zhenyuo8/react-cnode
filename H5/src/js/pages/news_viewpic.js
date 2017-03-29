/**
 * title: 【图片】文章标题
 * share {
 *  title: 【图片】文章标题
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【图片】文章标题 分享自@汽车大全 网页链接
 * 文章图片大图
 */

var ajax = require('../util').ajax

module.exports = {
    template: __inline('../templates/news_viewpic.html'),
    data: function(){
        var self = this
        return {
            serialId: this.$route.query.serialId,
            newsId: this.$route.query.newsId,
            list: [],
            index: this.$route.query.picIndex || 0,
            swiperOption: {
                preloadImages: false,
                lazyLoading: true,
                onSlideChangeEnd: function(swiper){
                    self.index = swiper.activeIndex
                }
            }
        }
    },
    computed: {
        swiper: function() {
            return this.$refs.imageSwiper.swiper
        }
    },
    methods: {  
        getData: function(){
            var self = this
            ajax({  
                url: '/news/newcar/newsDetailWap/' + this.newsId,
                success: function(res){
                    self.list = res.data.piclist

                    self.swiper.slideTo(self.index, 0,false)
                    setTimeout(function(){
                        self.swiper.lazy.loadImageInSlide(self.index)
                    },0)
                    //待优化
                    VueGlobal.setDocTitle('[图片]'+res.data.shorttitle)
                    VueGlobal.setShareConfig({
                        title: '【图片】'+ res.data.shorttitle,
                        desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                        imgUrl: res.data.piccover
                    })
                }
            })
        }
    },
    mounted: function(){
        this.getData()
        $('html').addClass('fullpage')
    },
    destroyed: function(){  
        $('html').removeClass('fullpage')
    }
}