/**
 * 大图弹出,写不写呢~~~
 */
(function(){
     
    var count = 0;
    
    function ImgViewer(){   
        this.id = 'show_picture_'+ count++
        this.el = $('<div></div>').attr('id',this.id).addClass('show_picture')
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
            this.el.find('#closeBigPic').on('click',function(){
                self.el.hide()
            })
            this.swiper = new Swiper(self.swiperId, {
                preloadImages: false,
                lazyLoading: true,
                onSlideChangeEnd: function(swiper){
                    self.el.find('.page_num').html((swiper.activeIndex+1) + '/' + swiper.slides.length)
                }
            });
        },
        setImgList: function(data){
            var self = this
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
            var self = this
            this.el.show()
            this.setImgList(list)
            this.swiper.update()
            this.swiper.slideTo(index,0,true)
            this.el.find('.page_num').html((index+1) + '/' + list.length)
            //点击第二次图片无法显示的hack
            var slide = this.el.find('.swiper-slide-active')
            slide.find('.swiper-lazy-preloader').hide()
            slide.find('img').attr('src',slide.find('img').data('src'))
        }
    }


    $.fn.imgViewer = function(options){

        var opts = $.extend({},options)
        var instance = new ImgViewer()
        var $self = $(this) 

        return this.each(function(i,el){   
            $(this).on('click',opts.selector,function(e){
                //if(e.currentTarget === el){
                    e.preventDefault()
                    var $el = $(e.currentTarget)
                    var groupName = $el.attr('group')
                    var curHref = $el.attr('href')
                    var curIndex = 0
                    var list = []
                    if(groupName){  
                        var $group = $(opts.selector,$self).filter('[group='+ groupName +']')
                        $group.each(function(i,el){
                            list.push(el.href)
                        })
                        curIndex = $group.index($el)
                    }else{  
                        list.push(curHref)
                    }
                    instance.show(curIndex,list)
               // }
            })
        })
    }
/*
$(function(){
    var swiper = new Swiper('.swiper-container', {
        //nextButton: '.swiper-button-next',
        //prevButton: '.swiper-button-prev',
        pagination: '.page_num',
        paginationType: 'fraction',
        paginationFractionRender: function (swiper, currentClassName, totalClassName) {
            return '<i class="' + currentClassName + '"></i> / <i class="' + totalClassName + '"></i>'
        },
        preloadImages: false,
        lazyLoading: true,
        onInit: function(){

        },
        onSlideChangeEnd: function(swiper){
            console.log(swiper.activeIndex)
        }
    });
})
*/
})();