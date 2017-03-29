/**
 * 字母条
 */
(function(){

    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    function letterFixbar(el,opt){  

        render(el,opt.data)

        var $el = $(el)
        var $lis = $(el).find('li')
        var targetTop = opt.scrollEl ? $(opt.scrollEl).offset().top - 10 : $el.offset().top - 60
        var hideTimer

        $el.on('click','li',function(event){   
            var letter = $(this).text()
            if(hideTimer){  
                clearTimeout(hideTimer)
            }
            $('.letter_alert').show().find('span').html(letter)
            hideTimer = setTimeout(function(){   
                $('.letter_alert').hide()
            },500)
            scrollToPos(letter)
        })

        $el.on('touchmove',function(event){
            event.preventDefault()
            var top = $el.offset().top
            var height = $lis.eq(0).height()
            var len = $lis.length
            var y = event.targetTouches[0].pageY
            var pos = Math.round((y - top)/height) - 1

            if(pos >= 0 && pos <= len){
                $lis.eq(pos).trigger('click')
            }
        })

        $(window).on('scroll',function(){   
            var win_scrollTop = $(window).scrollTop()
            if(win_scrollTop > targetTop){  
                $el.addClass('letter_list_fix');
            }else{  
                $el.removeClass('letter_list_fix');
            }
        })

        $(window).trigger('scroll')
    }

    function render(el,data){  
        if(!data){ 
            return 
        }
        if(data.length === 0){  
            data = letters
        }
        var html = '<ul>'
        for(var i=0;i< data.length;i++){ 
            html += '<li><a href="javascript:void(0)">'+ data[i] +'</a></li>'
        }
        html += '</ul>'
        el.innerHTML = html
    }

    function scrollToPos(letter){ 
        var target = $('.letter_title').filter(function(){
            return $(this).text() == letter
        })
        $(window).scrollTop(target.offset().top)
    }

    $.fn.letterFixbar = function(options){ 
        return this.each(function(){ 
            letterFixbar(this,options)
        })
    }

})();