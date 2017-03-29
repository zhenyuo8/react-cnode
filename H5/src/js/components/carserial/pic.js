/**
 * title: xxx（车型名称）车型图片
 * share {
 *  title: 【汽车大全】 奥迪A4L车型图片
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo:  【汽车大全】 奥迪A4L 车型图片 分享自@汽车大全
 * 首页-图片
 */

var ajax = require('../../util').ajax

module.exports = {  
    template: __inline('../../templates/carserial_pic.html'),
    data: function(){
        return {   
            serialId: this.$route.query.serialId, 
            imgs: [],
            img3: ['wg','ns','kj'],
            loading: true
        }
    },
    computed: { 
        active: function(){
            return this.$route.query.page == 'pic'
        },
        imgclass: function(){ 
            return 'carimg' + this.imgs.length
        }
    },
    watch: {    
        'active': function(a){ 
            this.getData()
        }
    },
    methods: {  
        getData: function(){
            var self = this
            if(this.active){   
                this.loading = true 
                ajax({  
                    url: '/carpic/serialpic/queryCarSerialPicCategoryForNewsDetail/' + this.serialId,
                    success: function(res){
                        self.loading = false
                        self.imgs = res.data.filter(function(item){ 
                            //外观，内饰，空间
                            return item.categoryType === 1
                        })
                    }
                })

                //分享
                ajax({  
                    url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                    success: function(res){    
                        //VueGlobal.setDocTitle(res.data.serialName+' 车型图片')
                        VueGlobal.setShareConfig({
                            title: '【汽车大全】'+ res.data.serialName +' 车型图片',
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