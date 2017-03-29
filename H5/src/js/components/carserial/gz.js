/**
 * title: 汽车大全
 * share {
 *  title: 【汽车大全】期待您的关注！
 *  desc:关注汽车大全，随时随地掌握最in的车型资讯
 * }
 * weibo: 【汽车大全】期待您的关注！分享自@汽车大全
 * 车型-关注
 */
module.exports = {  
    template: __inline('../../templates/carserial_gz.html'),
    data: function(){
        return {    
            serialId: this.$route.query.serialId,
            isWx: navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == 'gz'
        }
    },
    watch: {    
        'active': function(a){ 
            this.getData()
        }
    },
    methods: {  
        getData: function(){
            if(this.active){    
                VueGlobal.setShareConfig({
                    title: '【汽车大全】期待您的关注！',
                    desc: '关注汽车大全，随时随地掌握最in的车型资讯'
                })
            }
        }
    },
    created: function(){  
        this.getData()
    }
}