(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by zhangbs on 2017/2/25.
 */
 var currentPcUrl=window.location.href;


//分享到豆瓣 ico_douban.gif
/*
function shareToDouBan(url, title, content, pic) {
    var urlx = "http://www.douban.com/recommend/?url=" + url + "&title="
        + encodeURI(title) + "&comment=" + encodeURI(content) + "&v=1";
    window.open(urlx);
}
// 分享到开心网 ico_kaixin.gif
function shareToKaixin(url, title, content, pic) {
    var urlx = "http://www.kaixin001.com/repaste/share.php?rtitle="
        + encodeURI(title) + "&rurl=" + url + "&rcontent="
        + encodeURI(content);
    window.open(urlx);
}
// 分享到淘江湖 ico_taojianghu.gif
function shareToTaoJiangHu(url, title, content, pic) {
    var urlx = "http://share.jianghu.taobao.com/share/addShare.htm?url=" + url;
    window.open(urlx);
}
*/
// 分享到新浪微博 ico_sina.png
function checkAsk(str){
    return (str.indexOf('?') >-1) ?  true : false
}
function shareToSinaWeiBo(url, title, content, pic) {
    var joinStr=checkAsk(url) ? '&from=share&pcurl=' : '?from=share&pcurl=';
    var img = pic || '';
    var urlx = "http://v.t.sina.com.cn/share/share.php?c=&url=" +encodeURIComponent(url) +encodeURIComponent(joinStr)+encodeURIComponent(currentPcUrl)+ "&pic="
        + img + "&type=1" + "&title=" + encodeURI(title+'   分享至@行圆汽车大全' ) + '&content='
        + encodeURI(content) + "&rnd=" + new Date().valueOf();
    window.open(urlx);
}
// 分享到qq空间 ico_qzone.gif
function shareToQZone(url, title, content, pic) {
    var joinStr=checkAsk(url) ? 'from=share&pcurl=' : '?from=share&pcurl=';
    var urlx = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title="
        + encodeURI(title) + "&url=" + encodeURIComponent(url) +encodeURIComponent(joinStr)+encodeURIComponent(currentPcUrl)+ "&summary=" + encodeURI(content)+'&images='+ encodeURI(pic);
    window.open(urlx);
}

// 分享到163微博 ico_163weibo.gif
/*
function shareTo163WeiBo(url, title, content, pic) {

    var urlx = "http://t.163.com/article/user/checkLogin.do?link=" + url
        + "&info=" + encodeURI(title);
    window.open(urlx);
}
*/
// 分享到qq微博 ico_qq_weibo.png
function shareToQQWeiBo(url, title, content, pic) {
    var joinStr=checkAsk(url) ? '&from=share&pcurl=' : '?from=share&pcurl=';
    var urlx = "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(url) +encodeURIComponent(joinStr)+encodeURIComponent(currentPcUrl)+ "&title="
        + encodeURI(title) + "&pic=" + encodeURI(pic);
    window.open(urlx);
}
// 分享到搜狐
// 调用：shareToSouHu(screen,document,encodeURIComponent,'','','','内容','连接地址','utf-8')"
// function shareToSouHu(s,d,e,r,l,p,t,z,c){
// var
// f='http://t.sohu.com/third/post.jsp?',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function
// a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=660,height=470,left=',(s.width-660)/2,',top=',(s.height-470)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else
// a();
// }
/*
function shareToSouHu(url, title, content, pic) {
    var e = encodeURIComponent;
    var f = 'http://t.sohu.com/third/post.jsp?', u = url, p = [ '&url=', e(u),
        '&title=', e(title), '&content=', e('utf-8') || 'gb2312', '&pic=',
        e(pic || '') ].join('');
    function a() {
        if (!window.open([ f, p ].join(''), 'mb', [
                'toolbar=0,status=0,resizable=1,width=660,height=470,left=',
                (660 - 660) / 2, ',top=', (470 - 470) / 2 ].join('')))
            u.href = [ f, p ].join('');
    }
    ;
    if (/Firefox/.test(navigator.userAgent))
        setTimeout(a, 0);
    else
        a();
}
*/
// 分享到人人
/*
function shareToRenRen(url, title, content, pic) {

    var urlx = "http://share.renren.com/share/buttonshare.do?link=" + url
        + "&title=" + encodeURI(title) + '&content=' + encodeURI(content);
    window.open(urlx);

}
*/
// 分享到贴吧
/*
 http://tieba.baidu.com/f/commit/share/openShareApi?
 url=http%3A%2F%2Fshare.baidu.com%2F%230-tieba-1-85161-7eff13ea8df1a334a227e1223f8d0dd3&title=百度分享，为您带来更多流量%20-%20百度分享&desc=&comment=
 */
 /*
function shareToTieBa(url,title,content,pic){
    var urlx = 'http://tieba.baidu.com/f/commit/share/openShareApi?url='+ url +'&title='+ encodeURI(title) +'&desc='+ encodeURI(content) +'&comment=&pic=' + pic
    window.open(urlx)
}
*/
//分享给QQ好友
function qqFriend(opt) {

    var p = {
        url : window.location.href , /*获取URL，可加上来自分享到QQ标识，方便统计*/
        des:'',
        //title : '新玩法，再不来你就out了！', /*分享标题(可选)*/
        title:'',
        summary : '', /*分享摘要(可选)*/
        pic : '', /*分享图片(可选)*/
        flash : '', /*视频地址(可选)*/
        site : '', /*分享来源(可选) 如：QQ分享*/
        style : '201',
        width : 32,
        height : 32
    };
    $.extend(p,opt);
    var joinStr=checkAsk(opt.url) ? '&from=share&pcurl=' : '?from=share&pcurl=';
    p.pcurl=encodeURIComponent(joinStr)+encodeURIComponent(currentPcUrl);
    var s = [];
    for ( var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    //var url = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');
    var url='http://connect.qq.com/widget/shareqq/index.html?'+'&url='+encodeURIComponent(opt.url)+encodeURIComponent(joinStr)+encodeURIComponent(currentPcUrl)+"&title="+encodeURIComponent(opt.title)+"&pic=" + encodeURI(opt.pic);
    return url;
    //window.location.href = url;
    //document.write(['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'), '" >分享给QQ好友</a>' ].join(''));
}

module.exports = {
    shareToQZone: shareToQZone,
    qqFriend: qqFriend,
    shareToSinaWeiBo: shareToSinaWeiBo
};

},{}],2:[function(require,module,exports){
var share = require('./_share');
$(function(){
    function getShareData(ele){
        var obj={}
        obj.title=$(ele).find('.sharetitleid').val() ? $(ele).find('.sharetitleid').val() : '汽车大全';
        obj.url=$(ele).find('.sharelurlid').val() ? $(ele).find('.sharelurlid').val() : 'm.qichedaquan.com';
        obj.des=$(ele).find('.sharecontentid').val() ? ('【图文】'+$(ele).find('.sharecontentid').val()) : '汽车大全';
        obj.pic=$(ele).find('.sharepicid').val() ? $(ele).find('.sharepicid').val() : 'http://static.qcdqcdn.com/img/logo_car.png';
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
},{"./_share":1}]},{},[2])