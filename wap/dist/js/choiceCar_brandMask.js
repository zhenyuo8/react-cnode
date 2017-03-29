(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){

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

},{"./components/letterFixbar.js":1,"./libs/doT.js":3,"./tpl/hotMasterList.html":4,"./tpl/picMaster.html":5,"./tpl/subPicMasterMask1.html":6}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = "<ul class=\"clearfix\"> {{ for (var i = 0, l = it.length; i<l; i++) { }} <li data-id=\"{{=it[i].id}}\" data-img=\"{{=it[i].img100}}\"><a href=\"#\"><img src=\"{{=it[i].img100}}\"><span>{{=it[i].name}}</span></a></li> {{ } }}</ul>";
},{}],5:[function(require,module,exports){
module.exports = "{{ for (var i = 0, l = it.length; i<l; i++) { }} <div id=\"char_nav_{{=it[i].initial}}\" class=\"letter_title\"><span>{{=it[i].initial}}</span></div><div class=\"brand_box\"><ul> {{ for (var j = 0, k = it[i].data.length; j<k; j++) { }} <li data-id=\"{{=it[i].data[j].id}}\" data-img=\"{{=it[i].data[j].img100}}\"><a href=\"javascript:void(0);\"><i><img src=\"{{=it[i].data[j].img100}}\"></i><span class=\"brand_name\">{{=it[i].data[j].name}}</span></a></li> {{ } }}</ul></div> {{ } }}";
},{}],6:[function(require,module,exports){
module.exports = "<div class=\"car_type_module\"><div class=\"type_brand\"> <span class=\"type_brand_logo\"><img src=\"\" alt=\"\"></span> <span class=\"type_brand_name\">{{=it.mastername?it.mastername:\'\'}}</span></div> {{if(it.brandList) {}} {{ for (var i = 0, l = it.brandList.length; i<l; i++) { }} <div class=\"type_msg_list\"><h5 class=\"sub_brand_name\">{{=it.brandList[i].name}}</h5> {{ for (var j = 0, k = it.brandList[i].carSerialList.length; j<k; j++) { }} <dl data-urlspell=\"{{=it.brandList[i].carSerialList[j].urlspell}}\"><a href=\"#\"><dt> <img src=\"{{=it.brandList[i].carSerialList[j].logo}}\"></dt><dd><p class=\"type_name\">{{=it.brandList[i].carSerialList[j].showname}}</p><p class=\"type_price\">{{=it.brandList[i].carSerialList[j].dealerminprice}}-{{=it.brandList[i].carSerialList[j].dealermaxprice}}万</p><p class=\"type_zd_price\">指导价：{{=it.brandList[i].carSerialList[j].minprice}}-{{=it.brandList[i].carSerialList[j].maxprice}}万</p></dd></a></dl> {{ } }}</div> {{ } }} {{ } }}</div>";
},{}]},{},[2])