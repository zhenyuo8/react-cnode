module.exports = {  

    name: 'swiper-slide',
    template: '<div class="swiper-slide"><slot></slot></div>',
    ready: function (params) {
        this.update()
    },
    mounted: function() {
      this.update()
    },
    updated: function(){
      this.update()
    },
    attached: function(){
      this.update()
    },
    methods: {
      update: function() {
        if (this.$parent && this.$parent.swiper) {
          this.$parent.swiper.update(true)
          if (this.$parent.options.loop) {
            this.$parent.swiper.destroyLoop()
            this.$parent.swiper.createLoop()
          }
        }
      }
    }
}