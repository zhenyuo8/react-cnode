(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var share = require('./share');
var curl=encodeURIComponent(location.href.split('#')[0]);
var getSignatureApi='https://m.api.qichedaquan.com/thirdpart/weixin/tokenizer?';
//alert(navigator.userAgent)
var browser={
    versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            var ua = navigator.userAgent.toLowerCase();
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin:u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
            isweixin:ua.match(/MicroMessenger/i)=="micromessenger",
            safari:u.toLowerCase().indexOf("safari") > 0,
            qqbrowser:u.indexOf('QQBrowser')>0,
            ucbrowser:u.indexOf('UCBrowser')>0
        };
    }()
}
// 获取分享数据
function getShareData(ele){
        var obj={}
        obj.title=$(ele).find('.sharetitleid').val() ?$(ele).find('.sharetitleid').val(): '汽车大全';
        obj.url=$(ele).find('.sharelurlid').val() ? $(ele).find('.sharelurlid').val() : 'm.qichedaquan.com';
        obj.des=$(ele).find('.sharecontentid').val() ? $(ele).find('.sharecontentid').val() : '飞行员布克';
        obj.pic=$(ele).find('.sharepicid').val() ? $(ele).find('.sharepicid').val() : 'http://static.qcdqcdn.com/img/logo_car.png';
        return obj
    }
function getWinXinConfig(){
    var url=getSignatureApi+'curl='+curl+'&app_id=5d81db99484c0019cab240b3d04e9a4a';
    $.ajax({
                url:url,
                dataType : "jsonp",
                success:function (data) {
                    if(data.code==10000){
                        weixinShare(data.data)
                    }
                },
                error:function () {

                }
            });
}
function weixinShare(winXinConfig){
    wx.config({
        debug: true,
        appId:winXinConfig.appId,
        timestamp:winXinConfig.timeStamp,
        nonceStr:winXinConfig.nonceStr,
        signature:winXinConfig.signature,
         jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQZone','onMenuShareQQ']
    });
    wx.ready(function(){
        weiXinShareToFriendCircle();
        weiXinShareToFriend();
        weiXinShareToQZone();
        weiXinShareToQ();
    });
    /*
    wx.error(function(res){
        // alert('接口未唤起');
    });
    */
}
function weiXinShareToFriendCircle(){
    var shareObj=getShareData($('#share_weixin_circle'));
    wx.onMenuShareTimeline({
                title:shareObj.title, // 分享标题
                link:shareObj.url, // 分享链接
                imgUrl: shareObj.pic, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    hidMark()
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    hidMark()
                }
     });
}
function weiXinShareToFriend(){
    var shareObj=getShareData($('#share_weixin_friends'));
    wx.onMenuShareAppMessage({
            title: shareObj.title, // 分享标题
            desc: shareObj.des, // 分享描述
            link: shareObj.url, // 分享链接
            imgUrl: shareObj.pic, // 分享图标
            success: function () {
                hidMark()
            },
            cancel: function () {
                hidMark()
            }
        });
};
function weiXinShareToQZone(){
    var shareObj=getShareData($('#share_qq_zone'));
    wx.onMenuShareQZone({
            title: shareObj.title, // 分享标题
            desc: shareObj.des, // 分享描述
            link: shareObj.url, // 分享链接
            imgUrl: shareObj.pic, // 分享图标
            success: function () {
                hidMark()
            },
            cancel: function () {
                hidMark()
            }
        });
}
function weiXinShareToQ(){
    var shareObj=getShareData($('#share_qq'));
    wx.onMenuShareQQ({
            title: shareObj.title, // 分享标题
            desc: shareObj.des, // 分享描述
            link: shareObj.url, // 分享链接
            imgUrl: shareObj.pic, // 分享图标
            success: function () {
                hidMark()
            },
            cancel: function () {
                hidMark()
            }
        });
}
function hidMark(){
     $('.share_mark').css('display','none');
}
$(function(){
    function init(){
        // 判断当前是否是移动端打开
        if(browser.versions.mobile){
            if(true){// 微信中打开
                //browser.versions.weixin
                var html='<div class="weixin fl"  style="width:20%"><a href="javascript:void(0)" class="js_weixin_share"><img src="http://static.qcdqcdn.com/wap/img/wx.png"> <p>微信</p></a></div><div class="friend fl" style="width:20%"><a href="javascript:void(0)" class="js_weixin_f_share"><img src="http://static.qcdqcdn.com/wap/img/pyq.png"><p>朋友圈</p></a></div><div class="qq fl" style="width:20%"><a href="javascript:void(0)" class="js_weixin_qq_share"><img src="http://static.qcdqcdn.com/wap/img/qq.png"><p>QQ</p></a></div><div class="weibo fl" style="width:20%"><a href="javascript:void(0)" class="js_weibo_share"><img src="http://static.qcdqcdn.com/wap/img/wb.png"><p>微博</p></a></div><div class="kj fl" style="width:20%"><a href="javascript:void(0)" class="js_kj_share"><img src="http://static.qcdqcdn.com/wap/img/kj.png"><p>QQ空间</p></a></div>';
                   $('.share_box ').html(html);
                   //getWinXinConfig();
                   shareInweixinHint();
                   shareF();
                   shareFf(true);
                   return;
            }else if(browser.versions.android){//android中打开
                var html='<div class="weibo fl" style="width:50%"><a href="javascript:void(0)" class="js_weibo_share" style="padding-left:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/wb.png"><p>微博</p></a></div><div class="kj fl" style="width:50%"><a href="javascript:void(0)" class="js_kj_share" style="padding-right:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/kj.png"><p>QQ空间</p></a></div>';
                $('.share_box ').html(html);
                shareF();
                shareFs();
                return;
            }else if(browser.versions.qqbrowser){//qq浏览器
                var html='<div class="weibo fl" style="width:50%"><a href="javascript:void(0)" class="js_weibo_share" style="padding-left:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/wb.png"><p>微博</p></a></div><div class="kj fl" style="width:50%"><a href="javascript:void(0)" class="js_kj_share" style="padding-right:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/kj.png"><p>QQ空间</p></a></div>';
                $('.share_box ').html(html);
                shareF();
                shareFs();
                return;
            }else if(browser.versions.ucbrowser){//uc 浏览器
                var html='<div class="weibo fl" style="width:50%"><a href="javascript:void(0)" class="js_weibo_share"  style="padding-left:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/wb.png"><p>微博</p></a></div><div class="kj fl" style="width:50%"><a href="javascript:void(0)" class="js_kj_share" style="padding-right:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/kj.png"><p>QQ空间</p></a></div>';
                $('.share_box ').html(html);
                shareF();
                shareFs();
                return;
            }else if(browser.versions.safari){//safari中打开
                    var html='<div class="weixin fl"><a href="javascript:void(0)" class="js_weixin_share"><img src="http://static.qcdqcdn.com/wap/img/wx.png"> <p>微信</p></a></div><div class="friend fl"><a href="javascript:void(0)" class="js_weixin_f_share"><img src="http://static.qcdqcdn.com/wap/img/pyq.png"><p>朋友圈</p></a></div><div class="weibo fl"><a href="javascript:void(0)" class="js_weibo_share"><img src="http://static.qcdqcdn.com/wap/img/wb.png"><p>微博</p></a></div><div class="kj fl"><a href="javascript:void(0)" class="js_kj_share"><img src="http://static.qcdqcdn.com/wap/img/kj.png"><p>QQ空间</p></a></div>';
                   $('.share_box').html(html);
                    shareWeixinOrFHint();
                    shareF();
                    shareFf(false);
                    shareFs();
                    return
            }else {//其他浏览器打开
                var html='<div class="weibo fl" style="width:50%"><a href="javascript:void(0)" class="js_weibo_share" style="padding-left:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/wb.png"><p>微博</p></a></div><div class="kj fl" style="width:50%"><a href="javascript:void(0)" class="js_kj_share" style="padding-right:1.15rem;"><img src="http://static.qcdqcdn.com/wap/img/kj.png"><p>QQ空间</p></a></div>';
                $('.share_box ').html(html);
                shareF()
                shareFs()
            }
        }
    }

        // 在微信中打开  分享提示
        function shareInweixinHint(){
            var div=$('<div class="share_mark"></div>');
            var weixin_hint=$('<div class="weixin_hint"></div>');
            var p=$('<p>点击&nbsp;<span>•</span><span style="margin: 0px 2px">•</span><span>•</span>&nbsp;即可将内容"发送给朋友"或者"分享到朋友圈"</p>');
            var img=$('<img src="http://static.qcdqcdn.com/wap/img/popo.png" class="po-a">');
            var share_markCss={
                    'display':'none',
                    'position': 'fixed',
                    'top': '0',
                    'left': '0',
                    'z-index': '999',
                    '-webkit-box-sizing': 'border-box',
                    'box-sizing': 'border-box',
                    'width': '100%',
                    'height': '100%',
                    'padding-bottom': '95px',
                    'background': 'rgba(0, 0, 0, 0.6)'
                };
            var weixin_hint_css={
                    'width': '62%',
                    'padding': '0.533rem 0.667rem',
                   'position': 'fixed',
                    'top': '0.333rem',
                    'right': '0.267rem',
                    'background-color': '#fff',
                    'border-radius': '8px',
                    'color': '#a4a4a4',
                    'z-index': '1000'
            }
            var img_css={
                'top': '-0.28rem',
                'right': '0.387rem'
            }
                var fontSize='26x';
                var dpr=$('html').attr('data-dpr');
                if(dpr==1){
                    fontSize='13px'
                }else if(dpr==2){
                    fontSize='26x'
                }else if(dpr==3){
                    fontSize='39x'
                }else{
                    fontSize='26x'
                };
                div.css(share_markCss)
                weixin_hint.css(weixin_hint_css)
                weixin_hint.css('font-size',fontSize)
                img.css(img_css);
                weixin_hint.append(p).append(img);
                div.append(weixin_hint)
                $('body').append(div);
                bindEvent()
                function bindEvent(){
                    $('.share_mark ').on('click',function(){
                        $('.share_mark').css('display','none');
                        $('.zsh_cancel,.cancel_p').trigger('click');
                    })
                }
        }
         //safari中打开  分享到微信提示
        function shareWeixinOrFHint(){
            var div=$('<div class="share_mark"></div>');
            var hint_img=$('<div class="hint_img"></div>');
            var cancel_btn=$('<div class="cancel_btn">我知道了</div>');
            var share_markCss={
                    'display':'none',
                    'position': 'fixed',
                    'top': '0',
                    'left': '0',
                    'z-index': '999',
                    '-webkit-box-sizing': 'border-box',
                    'box-sizing': 'border-box',
                    'width': '100%',
                    'height': '100%',
                    'padding-bottom': '95px',
                    'background': 'rgba(0, 0, 0, 0.6)'
                };
            var hint_imgCss={
                    'width': '100%',
                    'height': '100%',
                    'background': 'url("http://static.qcdqcdn.com/wap/img/init-share.png") no-repeat center',
                    'background-size': 'contain'
                };
            var cancel_btnCss={
                'position': 'absolute',
                'bottom': '0',
                'left': '0',
                'width': '100%',
                'background-color': '#fff',
                'font-size': '24px',
                'padding': '32px 0',
                'text-align': 'center'
            };
            div.css(share_markCss);
            hint_img.css(hint_imgCss);
            cancel_btn.css(cancel_btnCss);
            div.append(hint_img).append(cancel_btn);
            $('body').append(div);
            //'我知道了按钮'注册点击事件
            bindEvent()
            function bindEvent(){
                $('.share_mark .cancel_btn').on('click',function(){
                    $('.share_mark').css('display','none');
                    $('.zsh_cancel,.cancel_p').trigger('click');
                })
                $('.share_mark ').on('click',function(){
                    $('.share_mark').css('display','none');
                    $('.zsh_cancel,.cancel_p').trigger('click');
                })
            }
        }
        // 微信中打开   微信 微信朋友圈 分享点击事件
    function shareFf(flag){
        // 微信分享
        $('.js_weixin_share').on('click',function(){
                $('.share_mark').css('display','block');
        });
        // 微信朋友圈分享点击事件
        $('.js_weixin_f_share').on('click',function(){
                $('.share_mark').css('display','block');
        });
        $('.js_weixin_qq_share').on('click',function(){
                $('.share_mark').css('display','block');
        });
        $('.js_weixin_qq_share').on('click',function(){
                $('.share_mark').css('display','block');
        });
        if(flag){
            $('.js_kj_share').on('click',function(){
                $('.share_mark').css('display','block');
            })
        }

    }
     function shareFs(){
        //分享到QQ空间
        $('.js_kj_share').on('click',function(){
            var obj=getShareData($('#share_qq_zone'))
            share.shareToQZone(obj.url,obj.title,obj.des,obj.pic);
        });
    }
    //weibo分享点击事件
    function shareF(){
            //分享到新浪微博
        $('.js_weibo_share').on('click',function(){
            var obj=getShareData($('#share_sina'))
             share.shareToSinaWeiBo(obj.url,obj.title,obj.des,obj.pic);
        });
    }

init()
})
},{"./share":2}],2:[function(require,module,exports){
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
},{}]},{},[1])