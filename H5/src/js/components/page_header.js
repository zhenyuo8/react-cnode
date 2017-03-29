/**
 * 二级页面公共头部
 */
var util = require('../util')

module.exports = {  
    template: __inline('../templates/page_header.html'),
    props: ["title","page"],
    data: function(params) {
        return {
            visible: false,
            serialId: this.$route.query.serialId
        }
    },
    methods: { 
        fn: function(){},
        getNavURL: function(page){  
            return {    
                name: 'carserial',
                query: {
                    serialId: this.serialId,
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
    }
}