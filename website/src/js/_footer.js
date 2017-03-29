/**
 * Created by Administrator on 2017/2/23.
 */
$(document).ready(function () {
   var footerOffsetTop=(function () {
       var bodyHeight=$(document.body).height();
       var clientHeight=$(window).height();
       var  footerHeight=$('.footer').height();
       if(bodyHeight<clientHeight){
           $('.footer').css('top',(clientHeight-footerHeight)+'px')
       }
   })()
});