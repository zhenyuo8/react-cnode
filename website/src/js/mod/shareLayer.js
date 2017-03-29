var share = require('./../share');
$(function(){
    function getShareData(ele){
        var obj={}
        obj.title=$(ele).find('.sharetitleid').val() ? $(ele).find('.sharetitleid').val() : '汽车大全';
        obj.url=$(ele).find('.sharelurlid').val() ? $(ele).find('.sharelurlid').val() : 'www.qichedaquan.com';
        obj.des=$(ele).find('.sharecontentid').val() ? ('【图文】'+$(ele).find('.sharecontentid').val()) : '【图文】';
        obj.pic=$(ele).find('.sharepicid').val() ? $(ele).find('.sharepicid').val() : '';
        return obj
    }
    //分享到QQ好友
    var url = share.qqFriend(getShareData($('#share_qq')));
    $(".Js-qq-share").attr("href",url);

    //分享到新浪微博
    $('.Js-wb-share').on('click',function(){
        var obj=getShareData($('#share_sina'))
         share.shareToSinaWeiBo(obj.url,obj.title,obj.des,obj.pic);
    });

    //分享到QQ空间
    $('.Js-kj-share').on('click',function(){
        var obj=getShareData($('#share_qq_zone'))
        share.shareToQZone(obj.url,obj.title,obj.des,obj.pic);
    });

     //分享到微信
    var h5Url=($('#weixinid').val()) ? ($('#weixinid').val()) : 'http://172.16.0.135:8888/h5/#/carserial/4389/index?urlspell=chuanqigs4';
    var render=(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")? 'table'  : 'canvas';
    $('#putweixin,#putweixin1').qrcode({width: 110,height: 110,text: h5Url,render: render});
    //微信二维码显示隐藏
    $(".Js-wx-share, .share_wx").hover(function(){
        $('#putweixin').show();
    }, function() {
        $('#putweixin').hide();
    });

})





// module.exports = shareLayer