/**
 *
 */
(function(){

  var carParams = {
    more: []
  }
  //事件中心
  var events = $({})
  //防止多次触发
  var ajaxTimer

  //设置参数
  function setParam(name,val,isReverse){

    var oldVal = getParam(name)

    //if(val){
      if(name == 'more'){
        if($.isArray(val)){
          carParams[name] = val
        }else{
          var index = $.inArray(val,oldVal)
          if(index >= 0){
            carParams[name].splice(index,1)
          }else{
            carParams[name].push(val)
          }
        }
      }else{
        if(isReverse){
          carParams[name] = oldVal == val ? '0' : val
        }else{
          carParams[name] = val
        }
      }
      events.trigger('paramChange',[name,carParams[name]])
    //}
  }

  function getParam(name){
    return name ? (carParams[name]?carParams[name]:'0') : carParams
  }

  function resetParam(name){
    if(name == 'more'){
      carParams.more = []
    }else{
      carParams[name] = 0
    }
    events.trigger('paramChange',[name,carParams[name]])
  }

  function resetAll(){
    for(var p in carParams){
      resetParam(p)
    }
  }

  function getCarParams(){
    var data = {}
    for(var p in carParams){
      var val = carParams[p]
      if(p == 'more'){
        if(val.length){
          data.more = val.join('_')
        }
      }else{
        if(val != '' && val != '0'){
          data[p] = val
        }
      }
    }
    return data
  }

  function getData(){
    events.trigger('loading')
    $.ajax({
      url: 'https://m.api.qichedaquan.com/car/serial/selectCars',
      data: $.extend({
        'app_id': '5d81db99484c0019cab240b3d04e9a4a'
      },getCarParams()),
      dataType: 'jsonp',
      success: function(res){
        events.trigger('fetch',[res])
      }
    })
  }

  events.on('paramChange',function(event,name,val){
      if(ajaxTimer){
        clearTimeout(ajaxTimer)
      }
      ajaxTimer = setTimeout(function() {
        getData()
      }, 100);
  })

  window.carSelectQuery = {
    events: events,
    resetParam: resetParam,
    resetAll: resetAll,
    getParam: getParam,
    setParam: setParam,
    getCarParams: getCarParams
  }



})();
