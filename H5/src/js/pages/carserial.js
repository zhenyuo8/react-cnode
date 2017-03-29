/**
 * title: 车型手册
 * 首页
 */
var util = require('../util')
var ajax = util.ajax

var CarserialIndex = require('../components/carserial/index.js')
var CarserialPrice = require('../components/carserial/price.js')
var CarserialPic = require('../components/carserial/pic.js')
var CarserialParam = require('../components/carserial/param.js')
var CarserialNews = require('../components/carserial/news.js')
var CarserialDealer = require('../components/carserial/dealer.js')
var CarserialTj = require('../components/carserial/tj.js')
var CarserialGz = require('../components/carserial/gz.js')

var cate = ['index','price','pic','param','news','dealer','tj','gz']
var getPageIndex = function(page){  
    var index = cate.indexOf(page)
    if(index == -1){
        index = 0
    }
    return index
}

module.exports = {  
    template: __inline('../templates/carserial.html'),
    components: {   
        CarserialIndex: CarserialIndex,
        CarserialPrice: CarserialPrice,
        CarserialPic: CarserialPic,
        CarserialParam: CarserialParam,
        CarserialNews: CarserialNews,
        CarserialDealer: CarserialDealer,
        CarserialTj: CarserialTj,
        CarserialGz: CarserialGz
    },
    data: function () {
        var self = this
        return {
            serialId: this.$route.query.serialId,
            channel: this.$route.query.channel,
            swiperOption: { 
                direction: 'vertical',
                initialSlide: getPageIndex(self.$route.query.page),
                onSlideChangeEnd: function(swiper){ 
                    var query = JSON.parse(JSON.stringify(self.$route.query))
                    var newQuery = $.extend(query,{
                        page: cate[swiper.activeIndex]
                    })
                    self.$router.push({
                        query: newQuery
                    })
                }
            }
        }
    },
    computed: {
        swiper: function() {
            return this.$refs.carserialSwiper.swiper
        },
        page: function(){
            return this.$route.query.page
        }
    },
    watch: {
        'page': function(){
            var index = getPageIndex(this.page)
            this.swiper.slideTo(index, 1000, false)
        },
        '$route': function(){
            util.wxConfig()
        }
    },
    created: function(){
        if(this.channel){  
            util.Cookie.set('qcdqh5_channel',this.channel)
        }
        VueGlobal.setDocTitle('汽车大全')
        $('html').addClass('fullpage')
        $(document).on('touchmove',function(e){
            e.preventDefault()
        })
    },
    destroyed: function(){
        $('html').removeClass('fullpage')
    }
}