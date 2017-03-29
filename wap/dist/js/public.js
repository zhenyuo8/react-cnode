/*
*  页面零碎公共js
*/


$(function(){
    /* 初始化 */
    function init(){
        goHistory();
    }

    /* 返回上级页面 */
    //返回按钮点击事件
    function goHistory(){
       $("#goHistory").click(function() {
           if(getLocalRefer()){
               window.history.go(-1);
           }else{
               window.location.href="http://m.qichedaquan.com";
           }
       });
   }
    //判断上级来源是否本站内链接
    function getLocalRefer(){
        var ref = '';
        if (document.referrer!=undefined && document.referrer!=null && document.referrer.length > 0) {
          ref = document.referrer;
        }
        if(ref.indexOf("qichedaquan.com")>=0){
            return true;
        }
        return false;
    }

    init();
})

/* 解决ios系统调起软键盘后评论弹层不固定问题 */
//isFixed == true   ：弹出评论弹层时
//isFixed == false  :发布或取消评论，评论弹层消失时
//给引用此方法的页面加 body{height:100%;}
function isIos(isFixed){
    var $mask = $(".mask"),     //半透明遮罩
        $reviewArea = $(".review_area");    //评论区域
    var clientW = $(window).width();
    var userAgent = navigator.userAgent;

    if(/(iPhone|iPad|iPod|iOS)/i.test(userAgent)){
        if(isFixed == true){
            $mask.css("position","absolute");
            $reviewArea.css("position","absolute");
            $('body').css({
                "position": "fixed",
                "width": clientW
            });
        }else if(isFixed == false){
            $mask.css("position","fixed");
            $reviewArea.css("position","fixed");
            $("body").css("position","static");
        }
    }else{
        $mask.css("position","fixed");
        $reviewArea.css("position","fixed");
    }
}

/* 解决右侧抽屉滚动body同时滚动问题 */
//isScroll == true   ：弹出抽屉时
//isScroll == false  ：收起抽屉时
function isBodyScroll(isScroll){
    var sHeight = -$(window).scrollTop(),
        wHeight = -$('body').offset().top,
        wWidth = $(window).width();
    if(isScroll == true){
        $('body').css({
            "position": "fixed",
            "top": sHeight,
            "width": wWidth
        });
    }else if(isScroll == false){
        $('body').css("position","static");
        $(window).scrollTop(wHeight);
    }
}
