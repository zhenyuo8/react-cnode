$.fn.scrollNav = function(options){
    
    options = $.extend({
        activeClass: 'active',
        itemEl: 'li'
    })

    return this.each(function(){    

        var itemEls = $(this).find(options.itemEl)
        var activeEl = itemEls.filter('.'+options.activeClass)
        
        $(this).scrollLeft()

    })


}