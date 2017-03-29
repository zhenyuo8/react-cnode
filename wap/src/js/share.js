 /**
 * Created by dongbo on 2017/2/25.
 */

 var currentPcUrl=window.location.href;

 function checkAsk(str){
    return (str.indexOf('?') >-1) ?  true : false
}
function shareToSinaWeiBo(url, title, content, pic) {
    var joinStr=checkAsk(url) ? '&pcurl=' : '?&pcurl='
    var img = pic || '';
    var urlx = "http://v.t.sina.com.cn/share/share.php?c=&url=" +encodeURIComponent(url) +joinStr+encodeURIComponent(currentPcUrl)+ "&pic="
        + img + "&type=1" + "&title=" + encodeURI(title+'@行圆汽车大全' ) + '&content='
        + encodeURI(content) + "&rnd=" + new Date().valueOf();
    window.location.href=urlx;
    // window.open(urlx);
}
// 分享到qq空间 ico_qzone.gif
function shareToQZone(url, title, content, pic) {
    var joinStr=checkAsk(url) ? '&pcurl=' : '?&pcurl='
    var urlx = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title="
        + encodeURI(title) + "&url=" + encodeURIComponent(url) +joinStr+encodeURIComponent(currentPcUrl)+ "&desc=" + encodeURI(content);
    window.location.href=urlx;
    // window.open(urlx);
}
//
function shareToQQWeiBo(url, title, content, pic) {
    var joinStr=checkAsk(url) ? '&pcurl=' :'&pcurl='
    var urlx = "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(url) +joinStr+encodeURIComponent(currentPcUrl)+ "&title="
        + encodeURI(title) + "&pic=" + encodeURI(pic);
    window.location.href=urlx;
    // window.open(urlx);
}
//
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
    $.extend(p,opt)
    var s = [];
    for ( var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    var url = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');
    return url;
    //window.location.href = url;
    //document.write(['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'), '" >分享给QQ好友</a>' ].join(''));
}

module.exports = {
    shareToQZone: shareToQZone,
    qqFriend: qqFriend,
    shareToSinaWeiBo: shareToSinaWeiBo
};