/**
 * title: 条件选车结果
 * share {
 *  title: 茫茫车海中，偏偏看上TA！
 *  desc: 我在【汽车大全】上看上了这几款车，快来帮我参谋一下吧！
 * }
 * weibo: 我在@汽车大全 看上了这几款车，快来帮我参谋一下吧！
 * 
 * 条件选车-结果
 * 排序的参数名为 s，其中：1-关注度降序 2-关注度升序 3-价格降序 4-价格升序
 * state: 0初始化 1加载中 2加载完成 3没有更多
 */

var util = require('../util')
var ajax = util.ajax
var service = require('../service')

module.exports = {  
    template: __inline('../templates/carfilter_result.html'),
    data: function(){   
        return {
            rows: [],
            total: 0,
            s: 2, //排序
            page: 1, //分页
            pageSize: 20, //条数
            state: 0,
            adData: []
        }
    },
    methods: {  
        showAd: function(){
            var params = this.$route.query
            for(p in params){    
                if(p != 'l' && params[p] != '0'){   
                    return false
                }
            }
            if(params['l']){  
                return true
            }
            return false
        },
        getData: function(){
            var self = this
            this.state = 1
            ajax({  
                url: '/car/serial/selectCars',
                data: $.extend({s:this.s,page:this.page},this.$route.query),
                success: function(res){
                    if(res.code === 10000){
                        self.rows = self.rows.concat(res.data.DataList)
                        self.total = res.data.SerialCount
                        self.state = self.pageSize*self.page >= self.total ? 3 : 2
                        if(self.showAd()){  
                            self.total += 1
                        }
                    }
                }
            })
        },
        onScroll: function(){ 
            var height = $(window).scrollTop() + $(window).height()
            var bodyHeight = $('body').height()
            if(height >= bodyHeight - 30){ 
                var self = this
                setTimeout(function(){
                    self.nextPage()
                },300)
            }
        },
        nextPage: function(){
            if(this.state == 1 || this.state == 3){   
                return
            } 
            this.page++
            this.getData()
        }
    },
    watch: {
        s: function(){  
            this.page = 1
            this.rows = []
            this.getData()
        }
    },
    created: function(){
        VueGlobal.setDocTitle('条件选车结果')
        VueGlobal.setShareConfig({  
            title: '从车盲到专家，用汽车大全就够了！',
            desc: '买车无忧，用车不愁，快用【汽车大全】，你喜欢的车子都在这儿！'
        }) 
        this.getData()
        
        var self = this
        if(this.showAd()){  
            service.getAds({ids:'5778b4e0-e9f9-4b08-a025-ddb0a664ae71'},function(res){
                self.adData = res
            })
        }
    },
    mounted: function(){
        $(window).on('scroll',this.onScroll.bind(this))
    },
    destroyed: function(){
        $(window).off('scroll',this.onScroll)
    }
}