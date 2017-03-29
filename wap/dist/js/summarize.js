(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var doT=require('./libs/doT.js');
var pic_master_list= require('./tpl/picMaster.html');
var sub_pic_master_list= require('./tpl/subPicMasterMask1.html');
var hot_master_list= require('./tpl/hotMasterList.html');
require('./components/letterFixbar.js');


var interface_PARAMES = {
	'app_id':'5d81db99484c0019cab240b3d04e9a4a'
}
$(function(){
	init()
	
})
//初始化
function init(){
	picMasterList();
	hotMasterList();
	bindEvents();
}
//事件绑定
function bindEvents(){
	$('#brand_list,#hot_list').on('click','li',function(){
		var id = $(this).data('id');
		var imgsrc = $(this).data('img');
		sub_picMasterList(id,imgsrc);
	});
}
function letterData(dataList){
	$('.letter_list').letterFixbar({    
        data: dataList, //不传为后端渲染,[]为所有字母
        scrollEl: null, //fixed的位置
        rootEl: '.choice_swiper' //设置滚动盒子
    });
}
//获取热门品牌
function hotMasterList(){
	var param = $.param(interface_PARAMES);
	$("#hot_list").html('');
	sendData("https://m.api.qichedaquan.com/car/carmaster/hotmaster?"+param,function(data){
		
		var hotmaster = doT.compile(hot_master_list)(data.data)
		$("#hot_list").html(hotmaster);
	})

}
//获取主品牌列表
function picMasterList(){
	var param = $.param(interface_PARAMES);
	$("#brand_list").html('');
	sendData("https://m.api.qichedaquan.com/car/carmaster/masterlist?"+param,function(data){
		
		var dataList = filterDataByLetter(data.data).list;
		var dataLetters = filterDataByLetter(data.data).letters;
		console.log(dataList)
		var picmaster = doT.compile(pic_master_list)(dataList)
       	$("#brand_list").append(picmaster);
		letterData(dataLetters)
	})
}
//获取主品牌下品牌及车型
function sub_picMasterList(id,imgsrc){
	var param = $.param(interface_PARAMES);
	$("#right_module").html('');
	sendData("https://m.api.qichedaquan.com/car/carmaster/seriallist/"+id+"?"+param,function(data){
		
		var dataList = data.data
		var sub_picmaster = doT.compile(sub_pic_master_list)(dataList)
       	$("#right_module").append(sub_picmaster);
       	$("#right_module .type_brand_logo").find('img').attr({
       		src: imgsrc
       	});
	})
}
//jsonp接口
function sendData(url,fn){
	$.ajax({    
        url: url,
        dataType: 'jsonp',
        // jsonpCallback: 'PicMasterListCallBack',
        success: function(data){
            if(data.code===10000){
	      		fn(data);
	        }
        }
    })
}
/**
 * 按首字母过滤数组
 */
function filterDataByLetter(data){
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
}

},{"./components/letterFixbar.js":9,"./libs/doT.js":11,"./tpl/hotMasterList.html":13,"./tpl/picMaster.html":14,"./tpl/subPicMasterMask1.html":15}],2:[function(require,module,exports){
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

})(jQuery);

},{}],3:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style 悬浮对比按钮
 *@description: 陈璐
 *@date: name (2017.02.28)
*/



$(function(){
    $("#contrastBtn,.zsh_cps_duibi").on("click",function(){
    	
        $(".mask_area").fadeIn();
        $(".right_contrast_module").animate({'right': '0'}, 500);
    })

    $(".mask_area").on("click",function(){
        $(this).fadeOut();
        $(".right_contrast_module").animate({'right': '-100%'}, 500);
    })

    $('.goback_btn').click(function(event) {
    	/* Act on the event */
    	$('.choice_car').hide();
    });

})

},{}],4:[function(require,module,exports){
/*页面半透明提示弹层*/
// 引用示例：alertDiv({type:"2",des:"您选择的图片大小不符合规则，请重新选择",time:"3000",fn:function(){}});

function alertDiv(opt){
    if(!opt){
        return;
    }
    var _opt = {
        type: '',
        des: '',
        time: '',
        fn: function(){}
    };
    var opt = $.extend(_opt,opt);
    if(opt.type == 1){

    }else if(opt.type == 2){
        var $divT = $('<div class="action_tips" id="actionTips"></div>');
        var $spanT = $('<span class="tips">'+opt.des+'</span>');
        var cssObj = {
            'width': '100%',
            'height': '1.333rem',
            'text-align': 'center',
            'margin-top': '-.667rem',
            'position': 'fixed',
            'top': '50%',
            'left': '0',
            'z-index':'99'
        };
        var cssSpan = {
            'color':'#fff',
            'display': 'inline-block',
            'line-height': '1.333rem',
            'padding': '0 0.8rem',
            'background-color': '#000',
            'border-radius': '0.066667rem',
            'filter': 'alpha(opacity=60)',
            'opacity': '.6'
        };
        $($divT).append($spanT);
        $('body').append($divT);
        $($spanT).css(cssSpan);
        $($divT).css(cssObj);
        setTimeout(function(){
            $('#actionTips').remove();
            opt.fn();
        },opt.time);
    }
}
exports.alertDiv = alertDiv;

},{}],5:[function(require,module,exports){


var cookie = require('./../_cookie')
var alertMod = require('./alertMod.js');
var carSelecter = function(opt){

    var selectArr = []

    function onSelect(event){  
        var el = $(event.currentTarget) 
        var id = el.attr('id')
        var name = el.find('span').text()
        selectArr[2] = el.attr('year') + ' ' + name
        $('.js_car_style').hide()
        $('.choice_brand').show() 
        if(id){
            opt.onSelect({
                id: id,
                text: selectArr.join('-')
            })
        }
    }
}
/**
 * 车型对比弹出层
 */

var carCompareLayer = (function(){ 

    var STORE_NAME = 'car_compare_data'
    var cache
    var el 

    try{    
        cache = JSON.parse($.cookie(STORE_NAME,undefined,{path:'/'}))
    }catch(e){   
        cache = []
    }
    //渲染列表

    function renderList(){ 
        var html = ''
        for(var i=0;i<cache.length;i++){    
            // html += '<li><a>'+ cache[i].text +'</a><i class="delete_icon"></i></li>'
            html += '<li data-id="'+ cache[i].id +'"><a href="#"><p class="style_name">'+ cache[i].text +'</p><p class="style_price clearfix"><span>'+ (cache[i].dealerminprice&&cache[i].dealerminprice>0?cache[i].dealerminprice+'万起':"无") +'</span><span class="style_zd_price">指导价：'+ cache[i].price +'万</span></p></a><span class="delete_c_h"></span></li>'
        }
        $('#duibiliebiao').html(html)
        $('#contrastBtn span').html(cache.length)
        $('.duibiNum').html(cache.length)
        setBtnState()
    }

    function init(){    
        carSelecter({
            onSelect: addCar
        })
        bindEvents()
        renderList()
    }

    function bindEvents(){ 
        $('.right_contrast_module')
            .on('click','.delete_c_h',removeCar)
            .on('click','.delete_all',removeAllCars)
            
        //点击页面车型对比弹出框消失
        $(document).on('click',function(){  
            $('.js_con_list').hide();
        })
        $('.begin_contrast').click(function(){
            startCompare();
        })
        
    }

    //修改页面对比按钮状态
    function setBtnState(){  
        $('.in_contrast').html("加入对比");
        $('.in_contrast').css({
            color: "#333"
        });
        $('.carbiInfoHeader').find('li i').removeClass('addback');
        for(var i=0;i<cache.length;i++){
            var mzEl = $('#'+cache[i].id);
            if(mzEl.hasClass('in_contrast')){   
                mzEl = $('.in_contrast').eq(i)
                mzEl.html("已加入对比");
                mzEl.css({
                    color: "#ccc"
                })
            }
            mzEl.addClass('addback')
            
        }
    }

    //判断是否存在
    function hasCar(carid){  
        for(var i=0;i<cache.length;i++){  
            if(carid === cache[i].id){ 
                return true
            }  
        }
        return false
    }
    //添加一个
    function addCar(car,success,error){ 
        if(cache.length === 4){
            error && error()    
            alertMod.alertDiv({type:"2",des:"最多选择4个车款。",time:"1200",fn:function(){}});
            // alert('最多选择4个车款。')
        }else{  
            if(!hasCar(car.id)){
                success && success(car)
                cache.push(car)
                $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
                renderList()
                alertMod.alertDiv({type:"2",des:"已添加到对比。",time:"1200",fn:function(){}});
            }else{  
                error && error()
                alertMod.alertDiv({type:"2",des:"已添加到对比。",time:"1200",fn:function(){}});
                // alert('已添加到对比。')
            }
        }
        $('.js_con_list').show()
    }
    //删除一个
    function removeCar(event){  
        event.stopPropagation()
        var target = event.currentTarget
        if(target){
            var li = $(target).closest('li')
            var index = $('#duibiliebiao li').index(li)
            cache.splice(index,1)
            $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
            renderList()
        }
    }
    //清空
    function removeAllCars(event){ 
        event.stopPropagation()
        cache = []
        $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
        renderList()
        $('.mask_area').hide();
        $(".right_contrast_module").animate({right:"-100%"}, 500);
    }

    //开始对比
    function startCompare(){
        var idStr = '';
        var biao = $('#duibiliebiao').find('li');
        var len = biao.length;
        for(var i=0;i<len;i++){
            idStr+=biao.eq(i).data('id')+',';
        }
        idStr = idStr.slice(0,-1)
        window.location.href = "/carparam/muti/"+idStr;
        $('.mask_area').hide();
        $(".right_contrast_module").animate({right:"-100%"}, 500);
    }

    return {    
        init: init,
        addCar: addCar,
        hasCar: hasCar,
        getData: function(){ 
            return cache
        },
        setBtnState: setBtnState
    }

})();

$(function(){
    carCompareLayer.init()
    
})


module.exports = carCompareLayer
},{"./../_cookie":2,"./alertMod.js":4}],6:[function(require,module,exports){


var doT=require('../libs/doT.js');

var callBack = function () { };
function getData(url, opt, fn, type) {

	//取线上接口数据
	var obj = {
		async:false,
		type: type ? type : 'GET',
		url: url,
		dataType: 'jsonp',
        jsonp: 'jsonCallback',
        timeout: 5000,
		success: function (json) {
            if(json===null ||　json　==="null" || json === undefined){
            	console.log('未获取到数据哦！'); return;
            }

            fn(json);
        }
	};
	if (opt) { obj.data = opt; }
	jQuery.ajax(obj);
}

//取数据 
var data = {
	carInfo: function (id, fn) {
		var url = 'http://car.qichedaquan.com/carparam/getParam/' + id;
		getData(url, null, fn, 'GET');
	}
}

exports.data = data;


},{"../libs/doT.js":11}],7:[function(require,module,exports){
	//参数配置页头部车款 添加到对比列表
	var doT=require('./../libs/doT.js');
	var configGJ = require('./../components/config.js');
	var selectMod = require('./carSelect');
    var compareBoto = require('./carCompareLayer');
	var accord_num_list= require('./../tpl/accordNum_1.html');
	// require('./_choiceCar.js');
    require('./../_choiceCar_brandMask.js');

    $(function(){
        init();
    })
    function init(){
        bindEvents();
        letterFixed();
    }
    function bindEvents(){
        // 抽屉效果
        $(".brand_type").on("click",".brand_box ul li",function(){
            $(".mask_area").fadeIn();
            $(".right_module").animate({right:"0"}, 500);
        })

        $(".mask_area").on("click",function(){
            $(this).fadeOut();
            $(".right_module").animate({right:"-100%"}, 500);
        })
        $("#hot_list").on("click","li",function(){
            $(".mask_area").fadeIn();
            $(".right_module").animate({right:"0"}, 500);
        })

        // 点击字母弹出当前字母
        $(".letter_list ul li").on("touchstart touchend",function(event){
            var letterText = $(this).find("a").text();
            $(this).find("a").addClass('checked')
            $(this).siblings('li').find("a").removeClass('checked');
            if(event.type == 'touchstart'){
                $(".letter_alert").show();
                $(".letter_alert span").text(letterText);
            }else if(event.type == 'touchend'){
                $(".letter_alert").hide();
            }
        })
        //参数对比页配置页 添加一条数据
        $('.carbiInfoHeader').on('click','.add_type',function(){
            var len = $('.carbiInfoHeader').find('li').length;
             if(len>4){
                alert("最多对比4个车款")
                return;
             }
            $('.choice_car').show();
            $('.chouti').show();
            $(".right_module").animate({right:"-100%"}, 500);
        }).on('click', 'li i', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var text = $(this).data('text');
            var dealerminprice = $(this).data('dealerminprice');
            var price = $(this).data('price');
            compareBoto.addCar({
                id: id,
                text: text,
                dealerminprice: dealerminprice,
                price:price
            })
        });

        $('#right_module').on('click', 'dl', function(event) {
            event.preventDefault();
            var urlspell = $(this).data('urlspell');
            getQueryCarparam(urlspell,function(res){
                $("#right_style_module").html('');
                var accorddatas = filterCarList(res.data.datas);
                var accordmaster = doT.compile(accord_num_list)(accorddatas)
                $("#right_style_module").append(accordmaster);
                $(".right_style_module").animate({right:"0"}, 500);
            })
            
        });

        //添加车款
        $('#right_style_module').on('click', 'li', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var text = $(this).data('text');
            var dealerminprice = $(this).data('dealerminprice');
            var price = $(this).data('price');
            selectMod.data.carInfo(id,function(res){
                // cardata.data.push(res);
                // M.init(cardata.data);
                // var id = $(this).data('id');
                
                compareBoto.addCar({
                    id: id,
                    text: text,
                    dealerminprice: dealerminprice,
                    price:price
                })
                $('.mask_area').hide();
                $('.choice_car').hide()
                $(".right_module").animate({right:"-100%"}, 0);
                $(".right_style_module").animate({right:"-100%"}, 0);
                compareBoto.setBtnState();
            })
        });


        //参数配置页
        $('.contrast_list').on('click','.add_contrast_type',function(){
            var len = $('#duibiliebiao').find('li').length;
            if(len>=4){
                alert("最多对比4个车款");
                $('.mask_area').hide();
                $(".right_contrast_module").animate({right:"-100%"}, 500);
                return;
            }
            $('.choice_car').show();
            $('.mask_area').hide();
            $(".right_contrast_module").animate({right:"-100%"}, 500);
         })

        //综述页对比功能
        $('.zsh_onsellCar_news').on('click','.in_contrast',function(event){
            event.preventDefault();
            var id = $(this).data('id');
            var text = $(this).data('text');
            var dealerminprice = $(this).data('dealerminprice');
            var price = $(this).data('price');
            console.log(id)
            compareBoto.addCar({
                id: id,
                text: text,
                dealerminprice: dealerminprice,
                price:price
            })
        })
    }
      
    /**
     * 按年款，功率过滤车款
     */
    function getCarKey(el){
        var key = ''
        if(el.fueltype != undefined && el.fueltype == 4){
            //电动车
            key = '电动车' + (el.electricPeakpower ? '#' + el.electricPeakpower + 'Kw' : '')
        }else if(el.fueltype != undefined && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')>=0){
            //机动车
            key = el.engineExhaustForFloat + "#" + (el.engineMaxPower ? el.engineMaxPower+'Kw' : '') + "#" + el.engineAddPressType;
        }else if(el.fueltype != undefined  && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')==-1){ 
            //机动车-没有增压
            key = el.engineExhaustForFloat + "#" + el.engineMaxPower + "Kw";
        }else if(el.fueltype != undefined  && el.fueltype == 3){ 
            //混动
            key = el.engineExhaustForFloat + "#发动机" + el.engineMaxPower + "Kw#发电机：" + el.engineMaxPower + "Kw#" + el.engineAddPressType
        }else{  
            key = '-#-'
        }
        return key
    }
    function filterCarList(data){
        //engineExhaustForFloat + 
        var list = []
        $.each(data,function(i,el){
            // console.log(el)
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
        return list
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
    function getQueryCarparam(urlspell,fn){
        $.ajax({  
          url: 'https://m.api.qichedaquan.com/car/carparm/queryCarparam',
          data: { 
            'app_id': '5d81db99484c0019cab240b3d04e9a4a',
            'urlspell': urlspell,
          },
          dataType: 'jsonp',
          success: function(res){  
            fn&&fn(res);
          }
        })
    }
    //字母索引位置固定
    function letterFixed(){
        var brandlistPosition = $(".letter_list").position().top;
        var $letterList = $(".letter_list");
        $(window).scroll(function(){
            if($(window).scrollTop() >= brandlistPosition){
                $letterList.addClass('letter_list_fix');
            }else{
                $letterList.removeClass('letter_list_fix');
            }
        })
    }
},{"./../_choiceCar_brandMask.js":1,"./../components/config.js":8,"./../libs/doT.js":11,"./../tpl/accordNum_1.html":12,"./carCompareLayer":5,"./carSelect":6}],8:[function(require,module,exports){
/**
 * 配置 
 * http://172.16.0.102:11300/car/carlevel/configs/?serialId=2204
 */
$.fn.touches = function (options) {
        var setting = {
            init: null,//初始化
            touchstart: null,  //按下
            touchmove: null, //滑动
            touchend: null //抬起
        };
        options = $.extend(setting,options);
        var $this = this, touchesDiv = $this[0];
        if (!$this[0]) return;
        touchesDiv.addEventListener('touchstart', function (ev) {
            options.touchstart && options.touchstart.call($this, ev);
            function fnMove(ev) {
                options.touchmove && options.touchmove.call($this, ev);
            };


            function fnEnd(ev) {
                options.touchend && options.touchend.call($this, ev);
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            };
            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);
            return false;
        }, false)
        options.init && options.init.call($this);
    }

// var ajax = require('../util').ajax
// require('../components/iscroll')



function onScroll(){  
    var top = $(window).scrollTop() + $('.occupy_seat').height() + $('.pub_head').height() + 10
    var target = $('.param_table_head .title_box').filter(function(){
        var elTop = $(this).offset().top
        return elTop <= top
    })
    target = target.eq(target.length-1)
    var targetText = target.text()||"基本信息";
    $('.param_title .title').html(targetText)
}


var n,g

function setIScroll(){  
    var h = $("#wrapper-header");
    var k = $("#wrapper-body");
    function p(q) {
        if (h.site == "") {
            h.site = Math.abs(this.x - h.x) > Math.abs(this.y - h.y) ? "x": "y";
        }
        if (h.site == "x") {
            q.preventDefault();
            g.scrollTo(this.x, 0, 0, false);
        } else {
            this.disable();
        }
    }
    function i() {
        var q = this;
        clearInterval(q.interval);
        q.interval = setInterval(function() {
            g.scrollTo(q.x, 0, 0, false);
            if (q.ox == q.x) {
                clearInterval(q.interval);
            }
            q.ox = q.x;
        },
        30);
    }
    n = new iScroll(h[0], {
        hScroll: true,
        vScroll: false,
        mouseWheel: true,
        scrollbarClass: "nonebar",
        bounce: false,
        momentum: true,
        lockDirection: true,
        //userTransiton: true,
        onScrollMove: p,
        onTouchEnd: i,
        onBeforeScrollStart: function(q) {
            h.x = this.x;
            h.y = this.y;
        },
        onScrollStart: function() {
            h.site = "";
        }
    });
    h.touches({
        touchstart: function() {
            n.enable();
        },
        touchend: function() {
            n.enable();
        }
    });
    function f(q) {
        if (k.site == "") {
            k.site = Math.abs(this.x - k.x) > Math.abs(this.y - k.y) ? "x": "y";
        }
        if (k.site == "x") {
            q.preventDefault();
            n.scrollTo(this.x, 0, 0, false);
        } else {
            this.disable();
        }
    }
    function j() {
        var q = this;
        clearInterval(q.interval);
        q.interval = setInterval(function() {
            n.scrollTo(q.x, 0, 0, false);
            if (q.ox == q.x) {
                clearInterval(q.interval);
            }
            q.ox = q.x;
        },
        30);
    }
    g = new iScroll(k[0], {
        hScroll: true,
        vScroll: false,
        mouseWheel: true,
        scrollbarClass: "nonebar",
        momentum: true,
        bounce: false,
        lockDirection: true,
        //userTransiton: true,
        onScrollMove: f,
        onTouchEnd: j,
        onBeforeScrollStart: function(q) {
            k.x = this.x;
            k.y = this.y;
        },
        onScrollStart: function() {
            k.site = "";
        }
    });
    k.touches({
        touchstart: function() {
            g.enable();
        },
        touchend: function() {
            g.enable();
        }
    });
    
}


module.exports = {
    mounted: function(){
        setIScroll()
        $(window).on('scroll',onScroll)
    },
    destroyed: function(){
        if(n){
            n.destroy()
            g.destroy()
            n = g = null
        }
        $(window).off('scroll',onScroll)
    },
    refresh: function(){
        setTimeout(function(){
            n.refresh()
            g.refresh()
        },100)
    }
}
},{}],9:[function(require,module,exports){
/**
 * 字母条
 */
(function(){

    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    function letterFixbar(el,opt){  

        render(el,opt.data)

        var $el = $(el)
        var $lis = $(el).find('li')
        var targetTop = opt.scrollEl ? $(opt.scrollEl).offset().top - 10 : $el.offset().top - 60
        var hideTimer

        $el.on('click','li',function(event){   
            var letter = $(this).text()
            if(hideTimer){  
                clearTimeout(hideTimer)
            }
            $('.letter_alert').show().find('span').html(letter)
            hideTimer = setTimeout(function(){   
                $('.letter_alert').hide()
            },500)
            scrollToPos(letter,opt.rootEl)
        })

        $el.on('touchmove',function(event){
            event.preventDefault()
            var top = $el.offset().top
            var height = $lis.eq(0).height()
            var len = $lis.length
            var y = event.targetTouches[0].pageY
            var pos = Math.round((y - top)/height) - 1

            if(pos >= 0 && pos <= len){
                $lis.eq(pos).trigger('click')
            }
        })

        $(window).on('scroll',function(){   
            var win_scrollTop = $(window).scrollTop()
            if(win_scrollTop > targetTop){  
                $el.addClass('letter_list_fix');
            }else{  
                $el.removeClass('letter_list_fix');
            }
        })

        $(window).trigger('scroll')
    }

    function render(el,data){  
        if(!data){ 
            return 
        }
        if(data.length === 0){  
            data = letters
        }
        var html = '<ul>'
        for(var i=0;i< data.length;i++){ 
            html += '<li><a href="javascript:void(0)">'+ data[i] +'</a></li>'
        }
        html += '</ul>'
        el.innerHTML = html
    }

    function scrollToPos(letter,root){ 
        var rootEl = root?root:window;
        var target = $('.letter_title').filter(function(){
            return $(this).text() == letter
        })
        $(rootEl).scrollTop(target.position().top)
    }

    $.fn.letterFixbar = function(options){ 
        return this.each(function(){ 
            letterFixbar(this,options)
        })
    }

})();
},{}],10:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style summarize(车型中综述页)
 *@description:
 *@date: name (2017.02.23)
*/


$(function(){
    require('./components/compareMode.js');
    require('./_mod_contrast.js');
    Comparison();
    setStyle();
    tabSlide();

    function setStyle(){
        $('.onsellCar_news').each(function(){
            $(this).find('.onsellCar_news_type').last().css({
                'margin-top':'0.56rem',
                'height':'1.0rem',
                'border-top':'1px solid #ebedef'
            })
        })
    }
    $('#right_style_module').on('click','li',function(){
        isBodyScroll(false);
    })
    //停售在售抽屉弹出禁止body滑动
    $('.classify').delegate('li','click',function(){
        isBodyScroll(true);
        $('.mask_area').css('display','none');
    })
    $('.drawerList li,.mask2').on('click',function(){
        isBodyScroll(false);
    })
    //城市选择抽屉弹出禁止body滑动
    $('.demo_title').delegate('#city','click',function(){
        isBodyScroll(true);
        $('.mask_area').css('display','none');
    })
    $('.current_province dd,.zxs_province span').on('click',function(){
        isBodyScroll(false);
    })
    $('.right_module_city').delegate('.checked_province','click',function(){
        $('.mask_area').css('display','none');
    })
    //对比抽屉弹出禁止body滑动
    $('.zsh_cps_duibi').on('click',function(){
        isBodyScroll(true);
    })
    $('.delete_all,.mask_area,.begin_contrast').on('click',function(){
        isBodyScroll(false);
    })
    //全部在售、未上市、停售tab切换
    function tabSlide(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '',
            paginationClickable: true,
            autoHeight: true,
            onSlideChangeStart: function(swiper){
                var li_index=swiper.activeIndex;
                $('.onsellCar_list li').eq(li_index).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
            }
        });

        $('.onsellCar_list li').on('click',function(){
            var index=$(this).index();
            $(this).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
            swiper.slideTo(index, 500, false);

            var caroaramId=$(this).attr('id');
            if(caroaramId==0) {
              $('#onSale').addClass('swiper-slide-active');
              $('#unlisted').removeClass('swiper-slide-active');
              $('#onStopSale').removeClass('swiper-slide-active');
              $('.onsellCar_list li').eq(0).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
              rightConfigInfo(1);
            }

            if(caroaramId==1) {
              $('#unlisted').addClass('swiper-slide-active');
              $('#onSale').removeClass('swiper-slide-active');
              $('#onStopSale').removeClass('swiper-slide-active');
              $('.onsellCar_list li').eq(1).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');

            }
            if(caroaramId==2) {
              $('#onStopSale').addClass('swiper-slide-active');
              $('#unlisted').removeClass('swiper-slide-active');
              $('#onSale').removeClass('swiper-slide-active');
              $('.onsellCar_list li').eq(2).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
              rightConfigInfo(-1);
            }
        })
    }

    //刷新抽屉中数据
    //获取车系年款 排量 变速箱类型
    var rightConfigInfo=function(salestate){
        var urlspell=$("#urlspell").val();
        var path="/carSerialSummary/getCarSerialPropertiyConfig?urlspell="+urlspell+"&salestate="+salestate;
        $.ajax({
            url:path,
            dataType:'json',
            success:function(result) {
                $("#drawerList_0").empty();
                $("#drawerList_1").empty();
                $("#drawerList_2").empty();
                var engineexhaustforfloat_str='<li class="zsh_select">不限</li>';
                var caryear_str='<li class="zsh_select">不限</li>';
                var underpantransmissiontype_str='<li class="zsh_select">不限</li>';
                var engineexhaustforfloatArray=result.engineexhaustforfloat.split(",");
                var caryearArray=result.caryear.split(",");
                var underpantransmissiontypeArray=result.underpantransmissiontype.split(",");
                $.each(engineexhaustforfloatArray, function(i, item) {
                    engineexhaustforfloat_str=engineexhaustforfloat_str+'<li>'+item+'</li>'
                });
                $.each(caryearArray, function(i, item) {
                    caryear_str=caryear_str+'<li>'+item+'款</li>'
                });
                $.each(underpantransmissiontypeArray, function(i, item) {
                    underpantransmissiontype_str=underpantransmissiontype_str+'<li>'+item+'</li>'
                });
                $("#drawerList_0").html(caryear_str);
                $("#drawerList_1").html(engineexhaustforfloat_str);
                $("#drawerList_2").html(underpantransmissiontype_str);
                //绑定点击事件
                var brand_year_car_choice_data="";
                var brand_type_car_choice_data=[];
                var brand_num_choice_data="";
                var zidongStr = "自动,半自动,手自一体,CVT无级变速,双离合,电动车单速变速箱,E-CVT无级变速";
                var zidongArr = zidongStr.split(',');
                var zidongList=[];
                for(var i=0;i<zidongArr.length;i++){
                    zidongList.push(":contains('" +zidongArr[i] + "')");
                }

                $(".drawerList li").on("click",function(event){
                    $('.zsh_drawer').css({
                        right: "-100%",
                        transition: "right .6s"
                    });
                    isBodyScroll(false);
                    $('.mask2').fadeOut();
                    $('.slider_btn').hide();
                    //检查当前是哪个列表
                     var choiceItem="";
                     var current_select_list_id=$(".onsellCar_active").attr("id");
                     //检查点击是哪一个分组
                    var check_group_id=$(this).parent("ul").attr("id").toString().split("_")[1];
                    var check_text = $(this).text();
                    //用于筛选用的串
                    var join_text="";
                    if(check_text !="不限"){
                      join_text=":contains('" +check_text + "')";
                    }
                    //设置当前为选中状态
                    $(this).siblings().removeClass("zsh_select");
                    $(this).addClass("zsh_select");
                    //设置选中后在页面回显选中项 针对 在售 和停售 进行处理
                    if(check_group_id==0){
                        if(check_text !="不限"){
                            if(current_select_list_id==0){
                                $(".z_year  i").html(check_text);
                                $(".z_year").addClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_year  i").html(check_text);
                                $(".t_year").addClass("current_select");
                            }
                        }else{
                            if(current_select_list_id==0){
                                $(".z_year  i").html("年款");
                                $(".z_year").removeClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_year  i").html("年款");
                                $(".t_year").removeClass("current_select");
                            }
                        }
                        brand_year_car_choice_data=join_text;
                    }
                    if(check_group_id==1){
                        if(check_text !="不限"){
                            if(current_select_list_id==0){
                                $(".z_pail  i").html(check_text);
                                $(".z_pail").addClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_pail  i").html(check_text);
                                $(".t_pail").addClass("current_select");
                            }
                        }else{
                            if(current_select_list_id==0){
                                $(".z_pail  i").html("排量");
                                $(".z_pail").removeClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_pail  i").html("排量");
                                $(".t_pail").removeClass("current_select");
                            }
                        }
                        brand_num_choice_data=join_text;
                    }
                    if(check_group_id==2){
                        if(check_text !="不限"){
                            if(current_select_list_id==0){
                                $(".z_bsx i").html(check_text);
                                $(".z_bsx").addClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_bsx i").html(check_text);
                                $(".t_bsx").addClass("current_select");
                            }
                        }else{
                            if(current_select_list_id==0){
                                $(".z_bsx i").html("变速箱");
                                $(".z_bsx").removeClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_bsx i").html("变速箱");
                                $(".t_bsx").removeClass("current_select");
                            }
                        }
                        if(check_text=='自动'){
                            brand_type_car_choice_data=zidongList.toString();
                        }else{
                            brand_type_car_choice_data=join_text;
                        }
                    }

                 //进行列表过滤
                 if(current_select_list_id==0){
                    choiceItem=$('#onSale .onsellCar_news');
                 }
                 if(current_select_list_id==2){
                    choiceItem=$('#onStopSale .onsellCar_news');
                 }
                  //上面的准备工作完成 下面开始进入主题进行表格过滤
                  if(brand_year_car_choice_data ==""  && brand_type_car_choice_data == "" && brand_num_choice_data=="") {
                      console.log("没有选择");
                      choiceItem.hide().show();
                  } else{
                    //主题进行表格过滤
                     if(brand_year_car_choice_data !=""){
                         choiceItem=choiceItem.hide().filter(brand_year_car_choice_data).show();
                     }
                    if(brand_type_car_choice_data.length != "" ){
                        choiceItem=choiceItem.hide().filter(brand_type_car_choice_data).show();
                     }
                    if(brand_num_choice_data.length !="" ){
                        choiceItem=choiceItem.hide().filter(brand_num_choice_data).show();
                    }
                     //针对表小项没有内容展示
                     if(current_select_list_id==0 || current_select_list_id==2){

                        if(current_select_list_id==0){
                            var contrast_table_title_list=$("#onSale .tb_content");
                        }else   if(current_select_list_id==2){
                            var contrast_table_title_list=$("#onStopSale .tb_content");
                        }
                        for(var i=0;i<contrast_table_title_list.length;i++){
                            var contrast_table_title_list_child=$(contrast_table_title_list[i]).children(".onsellCar_news");
                            var contrast_table_title_list_child_length=contrast_table_title_list_child.length;
                            var disply_none_count=0;
                            for(var j=0;j<contrast_table_title_list_child.length;j++){
                                if($(contrast_table_title_list_child[j]).css("display")=="none"){
                                    disply_none_count++;
                                }
                            }
                            if(disply_none_count==contrast_table_title_list_child_length){
                                $(contrast_table_title_list[i]).css("display","none");
                            }else{
                                $(contrast_table_title_list[i]).css("display","");
                            }
                        }
                      //针对表大项没有内容展示
                     var disply_none_count=0;
                        for(var j=0;j<contrast_table_title_list.length;j++){
                            if($(contrast_table_title_list[j]).css("display")=="none"){
                                disply_none_count++;
                            }
                        }
                        console.log(disply_none_count+"/"+contrast_table_title_list.length)
                        if(current_select_list_id==0){
                            var contrast_table_title_list=$("#onSale .tb_content");
                            if(disply_none_count==contrast_table_title_list.length){
                                $('#onSale').find(".empty_condition").show();
                            }else{
                                $('#onSale').find(".empty_condition").hide();
                            }
                        }else  if(current_select_list_id==2){
                            var contrast_table_title_list=$("#onStopSale .tb_content");
                            if(disply_none_count==contrast_table_title_list.length){
                                $('#onStopSale').find(".empty_condition").show();
                            }else{
                                $('#onStopSale').find(".empty_condition").hide();
                            }
                        } 


                     }

                  }
                  tabSlide();
                 $('.onsellCar_list .onsellCar_active').trigger('click');

                });

            }
        });
    }

    // 获取地理位置
    getLocation();

    function getLocation(){
        if (navigator.geolocation){
            var option = {
                    enableHighAccuracy : true,
                    timeout : 5000,
                    maximumAge : 0
                };
            navigator.geolocation.getCurrentPosition(showPosition,errorPosition,option);
        }else{
            console.log( "该浏览器不支持获取地理位置.");
        }
    }
    // 获取位置成功
    function showPosition(position){
        var thisPosLat = position.coords.latitude;
        var thisPosLon = position.coords.longitude;

        $("#posLat").val(thisPosLat);
        $("#posLon").val(thisPosLon);
    }
    // 获取位置失败
    function errorPosition(error){
         switch(error.code)
         {
            case error.PERMISSION_DENIED:
            console.log("用户拒绝获取地理位置请求.")
            break;

            case error.POSITION_UNAVAILABLE:
            console.log("网络信息不可用.")
            break;

            case error.TIMEOUT:
            console.log("请求地理位置超时.")
            break;

            case error.UNKNOWN_ERROR:
            console.log("未知错误.")
            break;
        }
    }


    //加入对比悬浮菜单
    function Comparison(){
        $(window).scroll(function(){
            if($(window).scrollTop()>$('.zsh_parameter').offset().top){
                $('.zsh_comparison').show();
            }else{
                $('.zsh_comparison').hide();
            }
        })
        // $('.in_contrast').on('click',function(){
        //     $(this).text('已加入对比').css('color','#a4a4a4');
        //     $(this).unbind('click');
        //     var num=parseInt($('.duibiNum').text());
        //     num++;
        //     $('.duibiNum').text(num);
        // })
    }

    //分享弹层的显示
    var Share={
        showShare:function(){
            var share_mask=$('.mask3');
            var share_content=$('.zsh_shareLayer');
            $('.zsh_share,.zsh_cps_share').on('click',function(event){
                isBodyScroll(true);
                event.stopPropagation();
                share_mask.fadeIn();
                share_content.css({
                    bottom: "0",
                    transition: "bottom 0.4s"
                })
            });
            //点击取消
            $('.zsh_cancel,.mask3').on('click',function(event){
                isBodyScroll(false);
                event.stopPropagation();
                share_mask.fadeOut();
                share_content.css({
                    bottom: "-4.36rem",
                    transition: "bottom 0.4s"
                })
            })
        },
        //分享弹层中点击微信
        clickWX:function(){
            function myBrowser(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
            };
            var mb = myBrowser();
            $('.zsh_shareLayer li').eq(0).on('click',function(){
                if ("Safari" == mb) {
                    $('.zsh_sf_mask').fadeIn();
                    $('.zsh_sf_layer').show();
                }else{
                    //直接调用
                }
            });
            $(document).on('click',function(event){
                event.stopPropagation();
                var target=event.target;
                if($(target).attr('class')=='zsh_wx'){
                    return;
                }else{
                    $('.zsh_sf_mask').fadeOut();
                    $('.zsh_sf_layer').hide();
                    $('.mask3').fadeOut();
                    $('.zsh_shareLayer').css({
                        bottom: "-4.36rem",
                        transition: "bottom 0.4s"
                    })
                }
            })
        }
    }
    Share.showShare();
    Share.clickWX();
})

},{"./_mod_contrast.js":3,"./components/compareMode.js":7}],11:[function(require,module,exports){
"use strict";
var doT = {
	version: "1.0.3",
	templateSettings: {
		evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
		interpolate: /\{\{=([\s\S]+?)\}\}/g,
		encode:      /\{\{!([\s\S]+?)\}\}/g,
		use:         /\{\{#([\s\S]+?)\}\}/g,
		useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
		define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
		defineParams:/^\s*([\w$]+):([\s\S]+)/,
		conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
		iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
		varname:	"it",
		strip:		true,
		append:		true,
		selfcontained: false,
		doNotSkipEncoded: false
	},
	template: undefined, //fn, compile template
	compile:  undefined  //fn, for express
}, _globals;

doT.encodeHTMLSource = function(doNotSkipEncoded) {
	var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
		matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
	return function(code) {
		return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
	};
};

_globals = (function(){ return this || (0,eval)("this"); }());

if (typeof module !== "undefined" && module.exports) {
	module.exports = doT;
} else if (typeof define === "function" && define.amd) {
	define(function(){return doT;});
} else {
	_globals.doT = doT;
}

var startend = {
	append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
	split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" }
}, skip = /$^/;

function resolveDefs(c, block, def) {
	return ((typeof block === "string") ? block : block.toString())
	.replace(c.define || skip, function(m, code, assign, value) {
		if (code.indexOf("def.") === 0) {
			code = code.substring(4);
		}
		if (!(code in def)) {
			if (assign === ":") {
				if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
					def[code] = {arg: param, text: v};
				});
				if (!(code in def)) def[code]= value;
			} else {
				new Function("def", "def['"+code+"']=" + value)(def);
			}
		}
		return "";
	})
	.replace(c.use || skip, function(m, code) {
		if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
			if (def[d] && def[d].arg && param) {
				var rw = (d+":"+param).replace(/'|\\/g, "_");
				def.__exp = def.__exp || {};
				def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
				return s + "def.__exp['"+rw+"']";
			}
		});
		var v = new Function("def", "return " + code)(def);
		return v ? resolveDefs(c, v, def) : v;
	});
}

function unescape(code) {
	return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
}

doT.template = function(tmpl, c, def) {
	c = c || doT.templateSettings;
	var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,
		str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;

	str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
				.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""): str)
		.replace(/'|\\/g, "\\$&")
		.replace(c.interpolate || skip, function(m, code) {
			return cse.start + unescape(code) + cse.end;
		})
		.replace(c.encode || skip, function(m, code) {
			needhtmlencode = true;
			return cse.startencode + unescape(code) + cse.end;
		})
		.replace(c.conditional || skip, function(m, elsecase, code) {
			return elsecase ?
				(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
				(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
		})
		.replace(c.iterate || skip, function(m, iterate, vname, iname) {
			if (!iterate) return "';} } out+='";
			sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
			return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
				+vname+"=arr"+sid+"["+indv+"+=1];out+='";
		})
		.replace(c.evaluate || skip, function(m, code) {
			return "';" + unescape(code) + "out+='";
		})
		+ "';return out;")
		.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
		.replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
		//.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

	if (needhtmlencode) {
		if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
		str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("
			+ doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || '') + "));"
			+ str;
	}
	try {
		return new Function(c.varname, str);
	} catch (e) {
		if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
		throw e;
	}
};

doT.compile = function(tmpl, def) {
	return doT.template(tmpl, null, def);
};

module.exports = doT;
},{}],12:[function(require,module,exports){
module.exports = "{{ for (var i = 0, l = it.length; i<l; i++) { }} <div class=\"year_style\">{{=it[i].caryear}}款</div> {{ for (var j = 0, k = it[i].data.length; j<k; j++) { }} <div class=\"style_msg_list\"><h5 class=\"sub_brand_name\">{{=it[i].data[j].level}}</h5><ul> {{ for (var q = 0, v = it[i].data[j].data.length; q<v; q++) { }} <li data-id=\"{{=it[i].data[j].data[q].id}}\" data-text=\"{{=it[i].data[j].data[q].caryear}}款 {{=it[i].data[j].data[q].name}}\" data-price=\"{{=it[i].data[j].data[q].referprice}}\" data-dealerminprice=\"{{=it[i].data[j].data[q].dealerminprice}}\"><a href=\"javascript:;\"><p class=\"style_name\">{{=it[i].data[j].data[q].caryear}}款 {{=it[i].data[j].data[q].name}}</p><p class=\"style_price clearfix\"> <span class=\"style_start_price\">{{=it[i].data[j].data[q].dealerminprice>0?it[i].data[j].data[q].dealerminprice+\'万起\':\'暂无报价\'}}</span> <span class=\"style_zd_price\">指导价：{{=it[i].data[j].data[q].referprice}}万</span></p></a></li> {{ } }}</ul></div> {{ } }} {{ } }}";
},{}],13:[function(require,module,exports){
module.exports = "<ul class=\"clearfix\"> {{ for (var i = 0, l = it.length; i<l; i++) { }} <li data-id=\"{{=it[i].id}}\" data-img=\"{{=it[i].img100}}\"><a href=\"#\"><img src=\"{{=it[i].img100}}\"><span>{{=it[i].name}}</span></a></li> {{ } }}</ul>";
},{}],14:[function(require,module,exports){
module.exports = "{{ for (var i = 0, l = it.length; i<l; i++) { }} <div id=\"char_nav_{{=it[i].initial}}\" class=\"letter_title\"><span>{{=it[i].initial}}</span></div><div class=\"brand_box\"><ul> {{ for (var j = 0, k = it[i].data.length; j<k; j++) { }} <li data-id=\"{{=it[i].data[j].id}}\" data-img=\"{{=it[i].data[j].img100}}\"><a href=\"javascript:void(0);\"><i><img src=\"{{=it[i].data[j].img100}}\"></i><span class=\"brand_name\">{{=it[i].data[j].name}}</span></a></li> {{ } }}</ul></div> {{ } }}";
},{}],15:[function(require,module,exports){
module.exports = "<div class=\"car_type_module\"><div class=\"type_brand\"> <span class=\"type_brand_logo\"><img src=\"\" alt=\"\"></span> <span class=\"type_brand_name\">{{=it.mastername?it.mastername:\'\'}}</span></div> {{if(it.brandList) {}} {{ for (var i = 0, l = it.brandList.length; i<l; i++) { }} <div class=\"type_msg_list\"><h5 class=\"sub_brand_name\">{{=it.brandList[i].name}}</h5> {{ for (var j = 0, k = it.brandList[i].carSerialList.length; j<k; j++) { }} <dl data-urlspell=\"{{=it.brandList[i].carSerialList[j].urlspell}}\"><a href=\"#\"><dt> <img src=\"{{=it.brandList[i].carSerialList[j].logo}}\"></dt><dd><p class=\"type_name\">{{=it.brandList[i].carSerialList[j].showname}}</p><p class=\"type_price\">{{=it.brandList[i].carSerialList[j].dealerminprice}}-{{=it.brandList[i].carSerialList[j].dealermaxprice}}万</p><p class=\"type_zd_price\">指导价：{{=it.brandList[i].carSerialList[j].minprice}}-{{=it.brandList[i].carSerialList[j].maxprice}}万</p></dd></a></dl> {{ } }}</div> {{ } }} {{ } }}</div>";
},{}]},{},[10])