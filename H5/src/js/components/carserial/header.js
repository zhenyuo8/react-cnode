/**
 * 首页头部
 */

var util = require('../../util')
var ajax = util.ajax

var BDTAG = {
    'price': 'PricePage',
    'pic': 'ImagePage',
    'param': 'ConfigurationPage',
    'news': 'NewsPage',
    'dealer': 'DealerPage',
    'tj': 'RecommendPage'
}

module.exports = {  
    template: __inline('../../templates/carserial_header.html'),
    props: ['title','page'],
    data: function() {
        return {
            visible: false
        }
    },
    /*
    computed: {
        page: function(){
            return this.$route.params.page
        }
    },*/
    methods: { 
        getBdTag: function(tag){
            return BDTAG[this.page] + tag
        },
        fn: function(){},
        getNavURL: function(page){  
            return {    
                    name: 'carserial',
                    query: {
                        serialId: this.$route.query.serialId,
                        page: page
                    }
                }
        },
        share: function(){
            util.openShare()
        },
        toggle: function(){ 
            this.visible = !this.visible
            if(this.visible){   
                $('.nav_menu',this.$el).slideDown(300);
                $('.nav_mask',this.$el).css('height',$(window).height())
            }else{  
                $('.nav_menu',this.$el).slideUp(300);
            }
        }
    },
    created: function(){    
        
    }
}