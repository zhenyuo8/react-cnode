/**
 * 大图弹出,写不写呢~~~
 */
(function(){

    var count = 0;

    function ImgViewer(){
        this.id = 'show_picture_'+ count++
        this.el = $('<div class="show_picture"></div>').attr('id',this.id)
        this.swiperId = '#'+ this.id +' .swiper-container'
        this.init()
        this.bindEvent()
    }

    ImgViewer.prototype = {
        init: function(){
            this.el.html('<div class="swiper-container">\
                <div class="top">\
                    <i id="closeBigPic"></i>\
                </div>\
                <div class="swiper-wrapper"></div>\
                <div class="footer">\
                    <span class="page_num"></span>\
                </div>\
            </div>')
            $('body').append(this.el)
        },
        bindEvent: function(){
            var self = this
            this.swiper = new Swiper(this.swiperId, {
                pagination: '.page_num',
                paginationType: 'fraction',
                paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                    return '<i class="' + currentClassName + '"></i> / <i class="' + totalClassName + '"></i>'
                },
                preloadImages: false,
                lazyLoading: true
            });
            this.el.find('#closeBigPic').on('click',function(){
                self.el.hide()
            })
        },
        setImgList: function(data){
            var html = ''
            $.each(data,function(i,el){
                html += '<div class="swiper-slide">\
                        <img data-src="'+ el +'" class="swiper-lazy">\
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>\
                    </div>'
            })
            this.el.find('.swiper-wrapper').html(html)
        },
        show: function(index,list){
            this.el.show()
            this.setImgList(list)
            this.swiper.update()
            this.swiper.slideTo(index,0,false)
        }
    }


    $.fn.imgViewer = function(options){

        var opts = $.extend({},options)
        var instance = new ImgViewer()
        var $self = $(this)

        return this.each(function(i,el){
            $('body').on('click',function(e){
                if(e.target === el){
                    e.preventDefault()
                    var $el = $(e.target)
                    var groupName = $el.attr('group')
                    var curHref = $el.attr('href')
                    var curIndex = 0
                    var list = []
                    if(groupName){
                        var $group = $self.filter('[group='+ groupName +']')
                        $group.each(function(i,el){
                            list.push(el.href)
                        })
                        curIndex = $group.index($el)
                    }else{
                        list.push(curHref)
                    }
                    instance.show(curIndex,list)
                }
            })
        })
    }
})();
