/**
 * 条件选车页面
 */
(function(){

  function bindEvents(){
    $('[data-param]').on('click',function(event){
      var el = $(event.currentTarget)
      var name = el.data('param')
      var val = el.data('val')
      if(val){
        //可以反选
        carSelectQuery.setParam(name,val,true)
      }
    })
    $('.more_condi').on('click',function(event){
      event.stopPropagation()
      $(this).find('.more_condi_list').toggle()
    })
    $('body').on('click',function(){
      $('.more_condi_list').hide()
    })
    $('.clear_more').on('click',function(){
      carSelectQuery.resetParam('more')
    })
    $('.reset_btn').on('click',function(){
      carSelectQuery.resetAll()
    })
    carSelectQuery.events.on('paramChange',function(event,name,val){
      if(name){
        var els = $('[data-param="'+ name +'"]')
        var target = els.filter(function(){
          var curVal = $(this).data('val')
          if(name == 'more'){
            return $.inArray(curVal,val) >= 0
          }else{
            return curVal == val
          }
        })
        els.removeClass('checked')
        target.addClass('checked')
        if(val != 0 && target[0].tagName === 'A'){
          target.closest('.more_condi').addClass('checked')
        }
      }
    })
    carSelectQuery.events.on('fetch',function(event,res){
      var link = $.param(carSelectQuery.getCarParams())
      $('.fit_standard b').html(res.data&&res.data.SerialCount);
      $('.fit_standard em').html(res.data&&res.data.CarNumber);
      $('.fit_standard').attr('href','http://car.m.qichedaquan.com/selresult/?'+ link);
    })
    carSelectQuery.events.trigger('paramChange')
  }

  function init(){
    bindEvents()
  }

  init()

})();
