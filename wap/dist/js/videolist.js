(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
var dot=require('./libs/doT.js');
var navDot = require('./tpl/videolist_video_slide_nav.html');
var onlyList = require('./tpl/videoindex_newvideo.html');
var listDot=require('./tpl/video_list.html');
var api='https://m.api.qichedaquan.com/video/mvideo/videodata?videoType=';
var obj={
	videoType:'',
	pageNo:'1',
	pageSize:'20',
	app_id:'5d81db99484c0019cab240b3d04e9a4a'
}
var hasCon=[];
var tabUrl='https://m.api.qichedaquan.com/video/mvideo/checktab?app_id=5d81db99484c0019cab240b3d04e9a4a'
//请求数据方法jsonp
var sendData=function(url,fn){
	$.ajax({
	            url:url,
	            dataType : "jsonp",
	            success:function (data) {
	            	if(data.code===10000){
	            		console.log(data)
	            		fn(data);
	            	}
	            },
	            error:function () {
	               alert("请求数据失败");
		 scrNotFull()
	            }
        	});
}
//初始化
function init(){
	getInitTabData();
	bindEvents();

}
// 页面初始化，过滤掉没有的类型 ['最新视频','原创视频','广告欣赏','合作媒体','奇葩视频','','官方视频'];
function filter(data){
	var _d={
		data:[],
		type:[]
	};
	var _dd={
		data:[]
	}
	var s=['最新视频','原创视频','广告欣赏','合作媒体','奇葩视频','官方视频'];
	var _data=data.data;
	for(var i=0; i<_data.length;i++){
		if(_data[i].totalRecord>0){
			_dd.data.push(s[i]);
			hasCon.push(i)
		}
	}
	renderNav(_dd);
	// renderList(_d);
}
// 渲染 头部 slide
function renderNav(data){
	var renderNav = dot.compile(navDot)(data);
  	$(".video_slide_nav ").append(renderNav);
	var l=data.data.length;
	if(l>4){
		 swiper1 = new Swiper('.swiper-container1', {
        			slidesPerView: 4.5,
  		 });
	}else if(l==4){
		 swiper1 = new Swiper('.swiper-container1', {
        			slidesPerView: l,
   	 		});
	}else if(l<4){
		 swiper1 = new Swiper('.swiper-container1', {
       		 slidesPerView: l,
    		});
	}
	//渲染内容区域容器
	function renderListWarp(){
		var ele=$('#swiper-container');
		var loadMore=$('<div class="load_box"><p class="load_more" type="" isload="true"><span>加载更多</span><span class="dot-bottom"></span></p><a href="#" class="loading"><img src="http://static.qcdqcdn.com/wap/img/load_icon.png"></a></div>');
		var nav=$('.video_slide_nav').find('li')
		for(var i=0;i<hasCon.length;i++){
			var item=$('<div types='+hasCon[i]+' class="item" noMore="false" currpagenu="0"><ul class="clearfix list"></ul></div >')
			ele.append(item);
			$(nav[i]).attr('type',hasCon[i])
		}
		ele.append(loadMore)
		// 写入内容区数据
		getInitConData()
	}
	renderListWarp()
}
// 渲染单条列表数据
function renderOnlyList(data,type){
	var warp=$('#swiper-container').find('div[types='+type+']');
		$(warp).attr('currpagenu',obj.pageNo);
		var onlyData = dot.compile(onlyList)(data.data[0]);
		 $(warp).find('ul').append(onlyData);
		 scrNotFull()
		if(data.data[0].dataList.length<obj.pageSize && data.data[0].dataList.length>0){
		// 如果回来的数据小于请求的数据（默认20条）,加载更多按钮隐藏
		 $('.load_more').css('display','none');
		 $('.loading').css('display','none');
		 $(warp).attr('nomore','true');
		}else if(data.data[0].dataList.length==obj.pageSize){
			console.log(obj.pageSize)
			// 如果回来的数据等于请求的数据（默认20条），加载更多按钮显示
			$('.loading').css('display','none');
			$('.load_more').css('display','block');
			 $('.load_more').attr('isload','true');
			 $(warp).attr('nomore','false');
		}else if(data.data[0].dataList.length==0 || travelListNum(warp)>=400){
			//如果回来的数据为0 或者 当前容器内大于等于400, 加载更多按钮隐藏
			console.log(obj.pageSize)
			$('.load_more').css('display','none');
			$('.loading').css('display','none');
			$(warp).attr('nomore','true');
		}else if(data.data[0].dataList.length>obj.pageSize){
			console.log(obj.pageSize)
			$('.loading').css('display','none');
			$('.load_more').css('display','block');
			 $('.load_more').attr('isload','true');
			 $(warp).attr('nomore','false');
		}
}
// 页面导航条初始化数据
function getInitTabData(){
	var url=tabUrl;
	sendData(url,function(data){
		filter(data)
	})
}
// 页面内容区初始化数据
function getInitConData(type){
	obj.videoType=hasCon[0];
	var type=type || hasCon[0];
	var url=api+obj.videoType+'&pageNo='+obj.pageNo+'&pageSize='+obj.pageSize+'&app_id='+obj.app_id;
	sendData(url,function(data){
		renderOnlyList(data,type)
	})
}
//遍历 单条列表个数
function travelListNum(ele){
	var l=$(ele).find('li').length;
	return l
}
// 请求单条列表数据
function getOnlyData(type,ele,pageNo){
	obj.videoType=type ? type : '1'
	obj.pageNo=pageNo ? pageNo : '0'
	var url=api+obj.videoType+'&pageNo='+obj.pageNo+'&pageSize='+obj.pageSize+'&app_id='+obj.app_id;
	sendData(url,function(data){
		renderOnlyList(data,type);
	})
}
// 绑定事件
function bindEvents(){
	// 加载更多
	$('body').delegate('.load_more','click',function(){
		var type=$('.video_slide_nav').find('.active').parent('li').attr('type');
		var ele=$('.video_list').find('div[types='+type+']');
		var pageNo=parseInt($(ele).attr('currpagenu'));
				pageNo++;
		if($(this).attr('isload')=='true'){
				$(this).attr('isload','false');
				$('.loading').css('display','block');
				$(this).css('display','none');
				getOnlyData(type,ele,pageNo);
		}
	})

	function slidTo(ele){
		var index=$(ele).index();
		       $(ele).find('span').addClass('active')
		       $(ele).siblings().find('span').removeClass('active');
		       swiper1.slideTo(index, 300, false);
	}
	// 请求其他tab
	function getOtherTabData(type,ele,pageNo){
			obj.videoType=type ? type : '0';
			obj.pageNo=pageNo ? pageNo :'1';
			var url=api+obj.videoType+'&pageNo='+obj.pageNo+'&pageSize='+obj.pageSize+'&app_id='+obj.app_id;
			sendData(url,function(data){
				renderOnlyList(data,type)
			})
	}
	// tab 切换请求数据
	$('.video_slide_nav').delegate('li','click',function(){
		slidTo(this);
		$('.video_list').find('.item').css('display','none');
		var type=$(this).attr('type');
		var ele=$('.video_list').find('div[types='+type+']')
			ele.show();
			if(ele.attr('nomore')=='true'){
				$('.load_more').css('display','none');
				// 没有更多了  直接return
				return
			}else{
				$('.load_more').css('display','block');
				$('.load_more').attr('isload','true');
			}
		var pageNo=parseInt($(ele).attr('currpagenu'));
		if(pageNo==0){// 只请求请求一次数据
			getOtherTabData(type,ele,1)
		}
	})
}
// 页面不足一屏高
function scrNotFull(){
	var pageH=parseInt($('body').height());
	var scrH=parseInt($(window).height());
	if(pageH<scrH){
		var type=$('.video_slide_nav li').find('.active').parent('li').attr('type');
		var ele=$('.video_list').find('div[types='+type+']');
		var hc=(scrH-pageH);
		var h=(ele.height());
		hc+=h;
		ele.css('height',hc)
	}
}

// 页面初始化
init();
})
},{"./libs/doT.js":2,"./tpl/video_list.html":3,"./tpl/videoindex_newvideo.html":4,"./tpl/videolist_video_slide_nav.html":5}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
module.exports = "{{ for (var k = 0, s = it.data[i].dataList.length; k<s; k++) { }} <li class=\"fl\" videoid=\"{{=it.data[i].dataList[k].videoId}}\"><a href=\"{{=it.data[i].dataList[k].video_htmlurl_m}}\"><div class=\"img_box po-r\"> <img src=\"{{=it.data[i].dataList[k].coverpic}}\"><div class=\"play_btn po-a\"> <img src=\"img/play_2.png\"></div> <span class=\"time_title po-a\">{{=it.data[i].dataList[k].duration}}</span></div><p class=\"video_des\"> {{=it.data[i].dataList[k].title}}</p></a></li> {{ } }}";
},{}],4:[function(require,module,exports){
module.exports = "{{~it.dataList:value:index}}<li class=\"fl\" videoid=\'{{=value.videoId}}\'><a href=\" {{=value.video_htmlurl_m}}\"><div class=\"img_box po-r\"> <img src=\"{{= value.coverpic}}\"><div class=\"play_btn po-a\"> <img src=\"http://static.qcdqcdn.com/wap/img/play_2.png\"></div> <span class=\"time_title po-a\">{{=value.duration}}</span></div><p class=\"video_des\"> {{=value.title}}</p></a></li> {{~}}";
},{}],5:[function(require,module,exports){
module.exports = "<ul class=\"clearfix swiper-wrapper\" id=\'video_nav\'> {{ for (var i = 0, l = it.data.length; i<l; i++) { }} {{if(i==0) {}} <li class=\"fl swiper-slide\"> <span class=\"active po-r\">{{=it.data[i]}}</span></li> {{ } else { }}<li class=\"fl swiper-slide\"> <span class=\"po-r\">{{=it.data[i]}}</span></li> {{ } }} {{ } }}</ul>";
},{}]},{},[1])