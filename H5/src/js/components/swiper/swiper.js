
var browser = typeof window !== 'undefined'

module.exports = {  
    name: 'swiper',
    template: '<div class="swiper-container">\
    <slot name="parallax-bg"></slot>\
    <div class="swiper-wrapper">\
      <slot></slot>\
    </div>\
    <slot name="pagination"></slot>\
    <slot name="button-prev"></slot>\
    <slot name="button-next"></slot>\
    <slot name="scrollbar"></slot>\
  </div>',
   props: {
      options: {
        type: Object,
        default: function() {
          return {
            autoplay: 0
          }
        }
      }
    },
    ready: function() {
      if (!this.swiper && browser) {
        this.swiper = new Swiper(this.$el, this.options)
      }
    },
    mounted: function() {
      var self = this
      var mount = function () {
        if (!self.swiper && browser) {
          delete self.options.notNextTick
          self.swiper = new Swiper(self.$el, self.options)
        }
      }
      this.options.notNextTick ? mount() : this.$nextTick(mount)
    },
    updated: function(){
      if(this.swiper){
        this.swiper.update()
      }
    },
    beforeDestroy: function() {
      if (!!this.swiper) {
        this.swiper.destroy()
        delete this.swiper
      }
    }
}