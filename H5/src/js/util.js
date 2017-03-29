var dateFilter = require('utils/datefilter')
var firstBy = require('utils/thenby')
var Cookie = require('utils/cookie')

/**分享，未整理 */
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
var isSafari = ua.indexOf("safari") > 0 && ua.indexOf("chrome") < 0
var shareHtml = __inline('templates/share.html')
var _shareConfig = {
    title: document.title,
    desc: document.title,
    url: window.location.href,
    imgUrl: 'http://jsx.qichedaquan.com/h5/img/logo2.png'
}

function shareToSinaWeiBo(url, title, content, pic) {

	var img = pic || '';
    title +=  '@行圆汽车大全' 
	var urlx = "http://v.t.sina.com.cn/share/share.php?c=&url=" + encodeURIComponent(url) + "&pic="
			+ img + "&type=1" + "&title=" + encodeURI(title) + '&content='
			+ encodeURI(content) + "&rnd=" + new Date().valueOf();

	window.open(urlx);
}

function shareToQZone(url, title, content, pic) {
	
	var urlx = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title="
			+ encodeURI(title) + "&url=" + encodeURIComponent(url) + "&desc=" + encodeURI(content);
	window.open(urlx);
}

$(function(){   
    $(document.body).append(shareHtml);
    if(!isSafari){  
        $('[action="wx_friend"]').hide()
        $('[action="wx_timeline"]').hide()
    }
    $('.share_mask,.zsh_shareLayer .zsh_cancel').click(function(){  
        $('.share_mask').fadeOut();
        $('.zsh_shareLayer').animate({'bottom':'-100%'},500,function(){
            $(this).hide()
        });
    })

    $('.wx_share_tip,.safari_mask').click(function(){    
        $('.wx_share_tip').animate({'bottom':'0','opacity':0},500,function(){ 
            $(this).hide()
        });
        $('.safari_mask').fadeOut()
    })

    $('.share_tip,.wx_mask').click(function(){    
        $('.share_tip').fadeOut()
        $('.wx_mask').fadeOut()
    })

    $('[action="wx_friend"],[action="wx_timeline"]').click(function(){ 
        $('.wx_share_tip').show().animate({'bottom':'40%','opacity':1},500);
        $('.safari_mask').fadeIn()
    })

    $('[action="weibo"]').click(function(){ 
        shareToSinaWeiBo(_shareConfig.link, _shareConfig.title, _shareConfig.desc, _shareConfig.imgUrl)
    })

    $('[action="qqzone"]').click(function(){ 
        shareToQZone(_shareConfig.link, _shareConfig.title, _shareConfig.desc, _shareConfig.imgUrl)
    })
    
})

/**
 * 车款列表-分类（key）
 */
function getCarKey(el){
    var key = ''
    if(el.fueltype != undefined && el.fueltype == 4){
        //电动车
        key = '电动车' + (el.electricPeakpower ? '/' + el.electricPeakpower + 'kw' : '')
    }else if(el.fueltype != undefined && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')>=0){
        //机动车
        key = el.engineExhaustForFloat + "/" + (el.engineMaxPower ? el.engineMaxPower+'kw' : '') + " " + el.engineAddPressType;
    }else if(el.fueltype != undefined  && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')==-1){ 
        //机动车-没有增压
        key = el.engineExhaustForFloat + "/" + el.engineMaxPower + "kw";
    }else if(el.fueltype != undefined  && el.fueltype == 3){ 
        //混动
        key = (el.engineExhaustForFloat?el.engineExhaustForFloat:'其他') + '/发动机:' + el.engineMaxPower + "kw" + (el.electricPeakpower?'/电动机:'+el.electricPeakpower+"kw ":' ') + el.engineAddPressType
    }else{  
        key = '其他'
    }
    return key
}

function indexOf(arr,callback){
    for(var i=0;i<arr.length;i++){  
        var flag = callback(arr[i])
        if(flag){   
            return arr[i]
        }
    }
    return null
}

var API_BASE = '${api_base}'
var API_APP_ID = '5d81db99484c0019cab240b3d04e9a4a'
var API_CACHE = {}

module.exports = { 
    /**
     * 公用ajax处理
     */
    ajax: function(opt){
        var params = $.extend(true,{ 
            data: { 
                app_id: API_APP_ID
            },
            dataType: 'jsonp',
            jsonp: 'callback'
        },opt)
        if(params.url.indexOf('http://') === -1){   
            params.url = API_BASE + params.url
        }
        
        if(params.cache !== false){ 
            var key = params.url + '?' + $.param(params.data)
            if(API_CACHE[key]){ 
                setTimeout(function(){
                    params.success(JSON.parse(API_CACHE[key]))
                },1)
                return
            }else{  
                delete params.cache
                var _success = params.success
                params.success  = function(res){
                    if(res.code === 10000){
                        API_CACHE[key] = JSON.stringify(res)
                    }
                    _success(res)
                }
            }
        }
        //console.log(API_CACHE)
        $.ajax(params)
    },
    /**
     * 设置页面title
     */
    setDocTitle: function(title){    
        if (title === undefined || window.document.title === title) {
            return
        }
        document.title = title
        var mobile = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            // 替换成站标favicon路径或者任意存在的较小的图片即可
            iframe.setAttribute('src', 'https://jsx.qichedaquan.com/h5/img/line.png')
            var iframeCallback = function () {
            setTimeout(function () {
                iframe.removeEventListener('load', iframeCallback)
                document.body.removeChild(iframe)
            }, 0)
            }
            iframe.addEventListener('load', iframeCallback)
            document.body.appendChild(iframe)
        }
    },
    wxConfig: function(){
        this.ajax({  
            url: '/thirdpart/weixin/tokenizer?curl='+encodeURIComponent(location.href.split('#')[0]),
            cache: false,
            success: function(res){
                if(res.code === 10000){
                    var c = res.data
                    wx.config({
                        appId: c.appId, 
                        timestamp: c.timeStamp, 
                        nonceStr: c.nonceStr, 
                        signature: c.signature,
                        jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone']
                    });
                }
            }
        })
    },
    setShareConfig: function(opt){
        opt = $.extend({
            title: document.title,
            desc: document.title,
            link: window.location.href,
            imgUrl: 'http://jsx.qichedaquan.com/h5/img/logo2.png'
        },opt)
        _shareConfig = opt
        if(window.wx){
            wx.ready(function(){
                wx.onMenuShareTimeline(opt);
                wx.onMenuShareAppMessage(opt);
                wx.onMenuShareQQ(opt);
                wx.onMenuShareWeibo(opt);
                wx.onMenuShareQZone(opt);
            })
        }
    },
    /**
     * 按首字母过滤数组
     */
    filterDataByLetter: function(data){
        var letters = []  
        var list = []
        $.each(data,function(i,el){
            var index = letters.indexOf(el.initial)
            if(index < 0){    
                letters.push(el.initial)
                list.push({
                    initial: el.initial,
                    data: []
                })
                index = letters.length - 1
            }
            list[index].data.push(el)
        })
        return {    
            letters: letters,
            list: list
        }
    },
    /**
     * 按年款，功率过滤车款
     */
    filterCarList: function(data){
        //engineExhaustForFloat + 
        var list = []
        $.each(data,function(i,el){
            var curYear = indexOf(list,function(cur){
                return cur.caryear ===  el.caryear
            })
            
            if(!curYear){ 
                list.push({
                    caryear: el.caryear,
                    data: []
                })
                curYear = list[list.length-1]
            }
            var list2 = curYear.data
            var key = getCarKey(el)
            var curLevel = indexOf(list2,function(cur){
                return cur.level === key
            })
            if(!curLevel){
                list2.push({ 
                    level: key,
                    data: []
                })
                curLevel = list2[list2.length-1]
            }
            curLevel.data.push(el)
        })
        list.sort(function(a,b){
            return b.caryear - a.caryear
        })
        return list
    },
    /**
     * 分隔数组成二维数组
     */
    splitArray: function(arr,num){
        if(!arr) return []
        var start = 0
        var end = 0
        var result = []
        while(end < arr.length){  
            start = end
            end = start + num
            result.push(arr.slice(start,end))
        }
        
        return result
    },
    /**
     * 页面loading处理
     */
    loading: function(){    
        
    },
    /**
     * 分享share
     */
    openShare: function(){
        if(isWeixin){   
            $('.wx_mask').fadeIn()
            $('.share_tip').show()
        }else{  
            $('.share_mask').fadeIn()
            $('.zsh_shareLayer').show().animate({'bottom':0},500);
        }
    },
    /**
     * 日期过滤器
     */
    dateFilter: dateFilter,
    /**
     * 取得默认城市，通过localstroage
     */
    getUserCity: function(){
        return JSON.parse(localStorage.getItem('qcdqh5_city')) || window.userIpData || {cityid:'201',cityname:'北京'}
    },
    setUserCity: function(city){
        //userIpCity = city
        localStorage.setItem('qcdqh5_city',JSON.stringify(city))
    },
    /**
     * 多字段排序
     */
    firstBy: firstBy,
    Cookie: Cookie,
    throttle : function(delay, action){
        var last = 0
        return function(){
            var curr = +new Date()
            if (curr - last > delay){
            action.apply(this, arguments)
            last = curr 
            }
        }  
    }
}