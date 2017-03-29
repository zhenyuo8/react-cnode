/**
 * title: 车型手册
 * share {
 *  title: 【奥迪A4L】车型手册 — 报价、图片、配置、评测全都有！
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【奥迪A4L】报价、图片、配置、评测 分享自@汽车大全
 * -车型
 */
var ajax = require('../../util').ajax

module.exports = {  
    template: __inline('../../templates/carserial_index.html'),
    data: function(){
        var self = this
        return {   
            serialId: this.$route.query.serialId,    
            imgs: [],
            info: {},
            brand_logo: '',
            loading: true,
            swiperOption: {
                pagination : '.swiper-pagination',
                onPaginationRendered: function(swiper,pager){
                    $('span',pager).each(function(i,el){
                        if(self.imgs[i]){
                            $(el).css('background',self.imgs[i].colorRgb)
                        }
                    })
                }
            }
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == undefined || this.$route.query.page == 'index'
        }
    },
    watch: { 
        active: function(){
            this.getData()
        }
    },
    methods: { 
        getLink: function(page){
            return {    
                query: {
                    serialId: this.serialId,
                    page: page
                }
            }
        },
        isElectric: function(){
            return this.info.oilFuelType && this.info.oilFuelType.indexOf('电力') === 0
        },
        filterStr: function(str){
            if(!str){
                return '暂无'
            }
            str = str.split(',')
            if(str.length > 5){ 
                var last = str[str.length-1]
                str = str.filter(function(el,i){
                    return i < 4
                })
                str.push('...')
                str.push(last)
            }
            return str.join(' ')
        },
        getData: function(){
            var self = this
            if(this.active){  
                //车型图片  
                ajax({  
                    url: '/carpic/carcolorpic/changepic/' + this.serialId,
                    success: function(res){
                        if(res.code === 10000){
                        self.imgs = res.data
                        }
                    }
                })
                //车型基本信息
                ajax({  
                    url: '/car/serial/querySerialCarYearGeneral',
                    data: {
                        serialid: this.serialId,
                        salestate: 1
                    },
                    success: function(res){  
                        if(res.data){  
                            self.info = res.data
                            if(res.data.brandId){
                                ajax({
                                    url: '/car/carmaster/master/' + res.data.brandId,
                                    success: function(res2){
                                        self.brand_logo = res2.data.img100
                                    }
                                })
                            }
                        }
                    }
                })
                //分享
                ajax({  
                    url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                    success: function(res){    
                        //VueGlobal.setDocTitle(res.data.serialName+' 车型手册')
                        VueGlobal.setShareConfig({
                            title: '【汽车大全】'+ res.data.serialName +' 车型手册 — 报价、图片、配置、评测全都有！',
                            desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                            imgUrl: res.data.imgUrl
                        })
                    }
                })
            }
        }
    },
    created: function(){
        this.getData()
    }
}