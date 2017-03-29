/**
 * title: xxx（车型名称）亮点配置
 * share {
 *  title: 【汽车大全】 奥迪A4L 亮点配置
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】 奥迪A4L 亮点配置 分享自@汽车大全
 * 首页-配置
 */
var ajax = require('../../util').ajax
var getParamId = require('../params_data').getId

module.exports = {  
    template: __inline('../../templates/carserial_param.html'),
    props: ['active'],
    data: function(){   
        return {    
            serialId: this.$route.query.serialId,
            list: [],
            loading: true
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == 'param'
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
                    url: '/car/serial/querySerialGeneral',
                    data: {
                        serialid: this.serialId
                    },
                    success: function(res){  
                        self.loading = false  
                        if(res.data && res.data.starconfig){
                            var params = res.data.starconfig.split(',').slice(0,10)
                            var result = []
                            for(var i=0;i<params.length;i++){   
                                result.push({   
                                    id: getParamId(params[i]),
                                    name: params[i]
                                })
                            }
                            self.list = result
                        }
                    }
                })

                //分享
                ajax({  
                    url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                    success: function(res){    
                        //VueGlobal.setDocTitle(res.data.serialName+' 亮点配置')
                        VueGlobal.setShareConfig({
                            title: '【汽车大全】'+ res.data.serialName +' 亮点配置',
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