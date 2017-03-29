(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 *
 */
(function(){

  var carParams = {
    more: []
  }
  //事件中心
  var events = $({})
  //防止多次触发
  var ajaxTimer

  //设置参数
  function setParam(name,val,isReverse){

    var oldVal = getParam(name)

    //if(val){
      if(name == 'more'){
        if($.isArray(val)){
          carParams[name] = val
        }else{
          var index = $.inArray(val,oldVal)
          if(index >= 0){
            carParams[name].splice(index,1)
          }else{
            carParams[name].push(val)
          }
        }
      }else{
        if(isReverse){
          carParams[name] = oldVal == val ? '0' : val
        }else{
          carParams[name] = val
        }
      }
      events.trigger('paramChange',[name,carParams[name]])
    //}
  }

  function getParam(name){
    return name ? (carParams[name]?carParams[name]:'0') : carParams
  }

  function resetParam(name){
    if(name == 'more'){
      carParams.more = []
    }else{
      carParams[name] = 0
    }
    events.trigger('paramChange',[name,carParams[name]])
  }

  function resetAll(){
    for(var p in carParams){
      resetParam(p)
    }
  }

  function getCarParams(){
    var data = {}
    for(var p in carParams){
      var val = carParams[p]
      if(p == 'more'){
        if(val.length){
          data.more = val.join('_')
        }
      }else{
        if(val != '' && val != '0'){
          data[p] = val
        }
      }
    }
    return data
  }

  function getData(){
    events.trigger('loading')
    $.ajax({
      url: 'https://m.api.qichedaquan.com/car/serial/selectCars',
      data: $.extend({
        'app_id': '5d81db99484c0019cab240b3d04e9a4a'
      },getCarParams()),
      dataType: 'jsonp',
      success: function(res){
        events.trigger('fetch',[res])
      }
    })
  }

  events.on('paramChange',function(event,name,val){
      if(ajaxTimer){
        clearTimeout(ajaxTimer)
      }
      ajaxTimer = setTimeout(function() {
        getData()
      }, 100);
  })

  window.carSelectQuery = {
    events: events,
    resetParam: resetParam,
    resetAll: resetAll,
    getParam: getParam,
    setParam: setParam,
    getCarParams: getCarParams
  }



})();

},{}],2:[function(require,module,exports){
(function(){


    var moreTemp = []
    var otherTemp = {}
    var page = 1
    var pageSize = 20
    var doT=require('./libs/doT.js');
    // require('./libs/template.js');
    require('./components/carSelectQuery.js');
    var accord_num_list= require('./tpl/accordNum.html');
    function getUrlParams(){
        var result = {};
        var params = (window.location.search.split('?')[1] || '').split('&');
        for(var param in params) {
            if (params.hasOwnProperty(param)) {
                paramParts = params[param].split('=');
                if(paramParts[0] != ''){
                    result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
                }
            }
        }
        return result;
    }


    function setMore(val){
        if($.isArray(val)){
            moreTemp = val
        }else{
            var index = $.inArray(val,moreTemp)
            if(index >= 0){
                moreTemp.splice(index,1)
            }else{
                moreTemp.push(val)
            }
        }

        var els = $('[data-param="more"]').removeClass('checked');
        var target = els.filter(function(){
            var curVal = $(this).data('val')
            return $.inArray(curVal,moreTemp) >= 0
        }).addClass('checked')
        els.find('i').removeClass('checked')
        target.find('i').addClass('checked')
        var text = '完成' + (moreTemp.length ? '('+ moreTemp.length +')': '')
        $('.car_config .finished').html(text)
    }

    function setOther(name,val){

        var els = $('[data-param="'+ name +'"]')
        var target = els.filter(function(){
            return $(this).data('val') == val
        })
        var showEl = $('[data-name="'+ name +'"]')
        var text = val == '0' ? '' : target.text()
        showEl.find('b').html(text)
        els.removeClass('checked')
        target.addClass('checked')
        $(".right_module_even").animate({
            'right':'-100%'
        }, 500);
        otherTemp[name] = val
        var i = getOhterCount()
        var text = '完成' + (i ? '('+ i +')': '')
        $('.car_more .finished').html(text)
    }

    function getOhterCount(){
        var i = 0
        for(var p in otherTemp){
            if(otherTemp[p] && otherTemp[p] != '0'){
                i++
            }
        }
        return i
    }

    function clearPageAndSort(){
        page = 1
        carSelectQuery.setParam('page',1)
        carSelectQuery.setParam('s',1)
    }

    function bindEvents(){
        //点击一级选项，还原“配置”“更多”的选项（选了之后没有点完成）
        $('.select_condition_nav [data-name]').click(function(){
            var target = $($(this).data('target'))
            $(".mask_area").fadeIn();
            target.animate({'right':'0'}, 500);
            var name = $(this).data('name')
            if(name == 'more'){
                setMore(carSelectQuery.getParam('more').concat())
            }else if(name == 'other'){
                setOther('dt',carSelectQuery.getParam('dt'))
                setOther('f',carSelectQuery.getParam('f'))
                setOther('pf',carSelectQuery.getParam('pf'))
                setOther('dr',carSelectQuery.getParam('dr'))
                setOther('zw',carSelectQuery.getParam('zw'))
            }
        })
        //点击“更多”的二级选项
        $('.car_more [data-name]').click(function(){
            var target = $($(this).data('target'))
            target.animate({'right':'0'}, 500);
        })
        //参数点击
        $('[data-param]').click(function(){
            var name = $(this).data('param')
            var val = $(this).data('val')
            var other = $(this).data('change') === false
            if(name == 'more'){
                setMore(val)
            }else if(other){
                setOther(name,val)
            }else if(name == 'pqd'){
                var p1 = $('input[name="minprice"]').val();
                var p2 = $('input[name="maxprice"]').val();
                val = p1 +'-' +p2;
                $(this).attr('data-val',val);
                carSelectQuery.setParam('p',val)
                $('[data-name="p"]').find('span').html(val+'万')
            }else{
                carSelectQuery.setParam(name,val)
            }
        })

        //价格-点击确定按钮
        // $('.car_price_list').find('.sure_price').click(function(event) {
        //     var p1 = $('input[name="minprice"]').val();
        //     var p2 = $('input[name="maxprice"]').val();

        //     var val = p1 +'-' +p2;
        //     $(this).attr('data-val',val)
        //     carSelectQuery.setParam('p',val);
        //     $('.select_condition_nav li').eq(0).find('span').html(val+'万')
        // });

        //“配置”-点击清空
        $('.car_config .delete_all').click(function(){
            setMore([])
        })
        //配置-点击完成
        $('.car_config .finished').click(function(){
            carSelectQuery.setParam('more',moreTemp)
        })
        //更多-点击清空
        $('.car_more .delete_all').click(function(){
            for(var p in otherTemp){
                setOther(p,'0')
            }
        })
        //更多-点击完成
        $('.car_more .finished').click(function(){
            for(var p in otherTemp){
                carSelectQuery.setParam(p,otherTemp[p])
            }
        })
        //二级弹出-点击返回
        $('.condition_name').click(function(){
            $(".right_module_even").animate({
                'right':'-100%'
            }, 500);
        })
        //点击空白
        $(".mask_area").click(function(){
            $(this).fadeOut();
            $(".right_module_odd").animate({
                'right':'-100%'
            }, 500);
            $(".right_module_even").animate({
                'right':'-100%'
            }, 500);
            $("#rightStyle").animate({
                'right':'-100%'
            }, 500);
        })
        //清除所有条件
        $('.delete_all_c,.clear_condition').click(function(){
            moreTemp = []
            otherTemp = {}
            carSelectQuery.resetAll()
        })
        //加载更多
        $('.load_more_module .load_more').click(function(){
            carSelectQuery.setParam('page',++page)
        })

        //监听所有参数变化，设置样式
        carSelectQuery.events.on('paramChange',function(events, name, val, flag){

            var els = $('[data-param="'+ name +'"]')
            var target = els.filter(function(){
                var curVal = $(this).data('val')
                if(name == 'more'){
                    return $.inArray(curVal,val) >= 0
                }
                return curVal == val
            })
            var other = target.data('change') === false

            if(name == 'more'){ //配置
                setMore(val)
                var showEl = $('[data-name="'+ name +'"]')
                var text = '配置' + ( val.length ? '('+ val.length +')' : '')
                showEl.toggleClass('checked',val.length !== 0).find('span').html(text)
            }else if(other){ //更多
                setOther(name,val)
                var i = getOhterCount()
                var showEl = $('[data-name="'+ name +'"]')
                var text = '更多' + (i ? '('+ i +')': '')
                $('[data-name="other"]').toggleClass('checked',i>0).find('span').html(text)
            }else if(name == 's'){ //排序
                els.find('a').removeClass('current')
                target.find('a').addClass('current')
            }else if(name == 'page'){ //翻页

            }else{ //普通选项
                els.removeClass('checked')
                target.addClass('checked')
                var showEl = $('[data-name="'+ name +'"]')
                var text = val == '0' ? target.data('text') : target.text()
                showEl.toggleClass('checked',val != '0').find('span').html(text)
            }
            //如果不是分页，清空html
            if(name != 'page'){
                $('.result_module ul').html('')
            }
            //如果不是分页和排序，重置分页和排序
            if(name != 'page' && name != 's'){
                clearPageAndSort()
            }
            //关闭弹出层
            $(".mask_area").trigger('click')
        })

        //监听加载中
        carSelectQuery.events.on('loading',function(){
            $('.load_more_module > a').hide()
            if(page > 1){
                 $('.load_more_module .loading').css('display','block')
            }
        })

        //监听数据返回
        carSelectQuery.events.on('fetch',function(events,res){
            if(res.data&&res.data.SerialCount){
                $('.select_resule_none').hide()
                $('.select_result_tab').show()
                $('.result_module ul').append(template('listTpl',res.data))
                $('.load_more_module > a').hide()
                if(page*pageSize < res.data.SerialCount){
                    $('.load_more_module .load_more').css('display','block')
                }else{
                    $('.load_more_module .no_more').css('display','block')
                }
            }else{
                $('.select_resule_none').show()
                $('.select_result_tab').hide()
            }
        })

        //n个车款符合条件
        $('.result_module').on('click','.more_type_sure',function(){
            var urlspell = $(this).data('urlspell');
            var ids = $(this).data('ids');
            var salestate = ''
            getQueryCarparam(urlspell,ids,salestate,function(res){
                $("#car_style_module").html('')
                var accorddatas = filterCarList(res.data.datas);
                console.log(accorddatas)
                var accordmaster = doT.compile(accord_num_list)(accorddatas)
                $("#car_style_module").append(accordmaster);
                console.log(accorddatas)
                $(".mask_area").fadeIn();
                $("#rightStyle").animate({
                    'right':'0'
                }, 500);
            })
        })
    }
    function getQueryCarparam(urlspell,ids,salestate,fn){
        $.ajax({
          url: 'https://m.api.qichedaquan.com/car/carparm/queryCarparam',
          data: {
            'app_id': '5d81db99484c0019cab240b3d04e9a4a',
            'urlspell': urlspell,
            'ids': ids,
            'salestate': salestate
          },
          dataType: 'jsonp',
          success: function(res){
            fn&&fn(res);
          }
        })
    }

    /**
     * 按年款，功率过滤车款
     */
    function getCarKey(el){
        var key = ''
        if(el.fueltype != undefined && el.fueltype == 4){
            //电动车
            key = '电动车' + (el.electricPeakpower ? '&nbsp;&nbsp;' + el.electricPeakpower + 'Kw' : '')
        }else if(el.fueltype != undefined && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')>=0){
            //机动车
            key = el.engineExhaustForFloat + "&nbsp;&nbsp;" + (el.engineMaxPower ? el.engineMaxPower+'Kw' : '') + "&nbsp;&nbsp;" + el.engineAddPressType;
        }else if(el.fueltype != undefined  && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')==-1){
            //机动车-没有增压
            key = el.engineExhaustForFloat + "&nbsp;&nbsp;" + el.engineMaxPower + "Kw";
        }else if(el.fueltype != undefined  && el.fueltype == 3){
            //混动
            key = el.engineExhaustForFloat + "&nbsp;&nbsp;发动机" + el.engineMaxPower + "Kw&nbsp;&nbsp;发电机：" + el.engineMaxPower + "Kw&nbsp;&nbsp;" + el.engineAddPressType
        }else{
            key = '-#-'
        }
        return key
    }
    /**
     * 按年款，功率过滤车款
     */
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

    function init(){
        bindEvents()

        //通过url过来的参数
        var params = getUrlParams()
        for(var p in params){
            var val = params[p]
            if(p == 'more'){
                var arr = val.split('_')
                for(var i=0;i<arr.length;i++){
                    moreTemp[i] = parseInt(arr[i])
                }
                carSelectQuery.setParam(p, moreTemp)
            }else{
                carSelectQuery.setParam(p,val)
            }
        }
        carSelectQuery.events.trigger('paramChange')
    }

    init()


})();

},{"./components/carSelectQuery.js":1,"./libs/doT.js":3,"./tpl/accordNum.html":4}],3:[function(require,module,exports){
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
module.exports = "{{ for (var i = 0, l = it.length; i<l; i++) { }} <div class=\"year_style\">{{=it[i].caryear}}款</div> {{ for (var j = 0, k = it[i].data.length; j<k; j++) { }} <div class=\"style_msg_list\"><h5 class=\"sub_brand_name\">{{=it[i].data[j].level}}</h5><ul> {{ for (var q = 0, v = it[i].data[j].data.length; q<v; q++) { }} <li><a href=\"http://car.m.qichedaquan.com/carparam/summary/{{=it[i].data[j].data[q].id?it[i].data[j].data[q].id:\'\'}}\"><p class=\"style_name\">{{=it[i].data[j].data[q].caryear}}款 {{=it[i].data[j].data[q].name}}</p><p class=\"style_price clearfix\"> <span class=\"style_start_price\">{{=it[i].data[j].data[q].dealerminprice}}万起</span> <span class=\"style_zd_price\">指导价：{{=it[i].data[j].data[q].referprice}}万</span></p></a></li> {{ } }}</ul></div> {{ } }} {{ } }}";
},{}]},{},[2])