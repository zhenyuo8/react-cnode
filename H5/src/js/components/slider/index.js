var Slider = require('nouislider')

module.exports = {  
    template: '<div></div>',
    props: ["options"],
    mounted: function(){    
        if(!this.slider){
            Slider.create(this.$el, this.options)
            this.slider = this.$el.noUiSlider
        }
    },
    destroyed: function(){  
        if(this.slider){
            this.$el.noUiSlider.destroy()
            this.slider = null
        }
    }
}