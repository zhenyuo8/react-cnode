/**
 * 分享挂件，inlne/和wideget
 */

(function(){    

    var isSafari = navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("Chrome") < 0
    /*
    var shareInlineHtml = '<ul class="share">\
        <li class="share_type wx" action="wx_friend">\
            <a href="javascript:void(0);">\
                <span></span>\
                <em>微信</em>\
            </a>\
        </li>\
        <li class="share_type pyq" action="wx_timeline">\
            <a href="javascript:void(0);">\
                <span></span>\
                <em>朋友圈</em>\
            </a>\
        </li>\
        <li class="share_type qq" action="qq">\
            <a href="javascript:void(0);">\
                <span></span>\
                <em>QQ</em>\
            </a>\
        </li>\
        <li class="share_type wb" action="weibo">\
            <a href="javascript:void(0);">\
                <span></span>\
                <em>微博</em>\
            </a>\
        </li>\
        <li class="share_type kj" action="qqzone">\
            <a href="javascript:void(0);">\
                <span></span>\
                <em>QQ空间</em>\
            </a>\
        </li></ul>'
    
    var shareLayerHtml = '<div class="share_mask mask"></div><div class="zsh_shareLayer">\
        <ul class="clearfix">\
            <li action="wx_friend">\
                <a href="javascript:void(0);"><span class="zsh_wx"></span><span>微信</span></a>\
            </li>\
            <li action="wx_timeline">\
                <a href="javascript:void(0);"><span class="zsh_pyq"></span><span>朋友圈</span></a>\
            </li>\
            <li action="qq">\
                <a href="javascript:void(0);"><span class="zsh_qq"></span><span>QQ</span></a>\
            </li>\
            <li action="weibo">\
                <a href="javascript:void(0);"><span class="zsh_wb"></span><span>微博</span></a>\
            </li>\
            <li action="qqzone">\
                <a href="javascript:void(0);"><span class="zsh_kj"></span><span>QQ空间</span></a>\
            </li>\
        </ul>\
        <button type="button" class="zsh_cancel">取消</button>\
    </div>'

    var weixinTipHtml = '<div class="wx_mask mask"></div><div class="wx_fixed_tip wx_share_tip">\
        <p>1、在Safari浏览器中点击“<img src="img/share_img1.jpg" class="share_img1">”</p>\
        <p>2、在弹出的浮层中点击更多“<img src="img/share_img2.jpg" class="share_img2">”</p>\
        <p>3、微信设置为“<img src="img/share_img3.jpg" class="share_img3">”状态</p>\
        <p>4、完成以上操作即可查看“微信”图标</p>\
        <p>\
            <img src="img/share_img4.jpg" class="share_img4">\
            <img src="img/share_img4.jpg" class="share_img4">\
            <img src="img/share_img5.jpg" class="share_img5" >\
            <img src="img/share_img2.jpg" class="share_img2">\
            点击完成分享\
        </p>\
    </div>'
    */
    
    var shareOptions = {}

    var shareCore = {   
        'wx_friend': function(){
            $('.wx_share_tip').show().animate({'bottom':'40%','opacity':1},500);
            $('.wx_mask').fadeIn()
        },
        'wx_timeline': function(){
            $('.wx_share_tip').show().animate({'bottom':'40%','opacity':1},500);
            $('.wx_mask').fadeIn()
        },
        'qq': function(){
            alert('qq')
        },
        'weibo': function(){
            alert('weibo')
        },
        'qqzone': function(){   
            alert('qqzone')
        }        
    }
    
    var initShareUI = function(){ 
        if(!isSafari){  
            $('[action="wx_friend"]').hide()
            $('[action="wx_timeline"]').hide()
        }
    }

    var bindShareEvent = function(){
        for(var name in shareCore){
            (function(type){    
                $('body').on('click','[action="'+ type +'"]',function(){  
                    shareCore[type]()
                })
            })(name)
        }
        $('.share_mask,.zsh_shareLayer .zsh_cancel').click(function(){  
            $('.share_mask').fadeOut();
            $('.zsh_shareLayer').animate({'bottom':'-100%'},500);
        })

        $('.wx_share_tip,.wx_mask').on('click',function(){    
            $('.wx_share_tip').animate({'bottom':'0','opacity':0},500,function(){ 
                $(this).hide()
            });
            $('.wx_mask').fadeOut()
        })
        
    }

    var shareWidget = { 
        init: function(options){
            shareOptions = $.extend({
                'url': document.location.href || '',
                'title': document.title || '',
                'desc': document.title || '',
                'img': document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '',
                'img_title': document.title || '',
                'from': window.location.host || ''
            },options)
            initShareUI()
            bindShareEvent()
        },
        //弹出分享
        show: function(){  
            $('.share_mask').fadeIn()
            $('.zsh_shareLayer').animate({'bottom':0},500);
        }
    }

    window.shareWidget = shareWidget

})()