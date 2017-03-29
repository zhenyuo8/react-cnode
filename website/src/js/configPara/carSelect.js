//var data = require('./configParaData');

var doT = require('../../lib/doT');
var selBrandTpl = require('../tpl/carSelectBrand.html');
var selSeriesTpl = require('../tpl/carSelectSeries.html');
var selModelTpl = require('../tpl/carSelectModel.html');
require('../layer/layer');
var callBack = function () { };

function getData(url, opt, fn, type) {
	//jQuery.getJSON(url, {}, fn);
	//return;

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
            }

            fn(json);
        }
	};
	if (opt) { obj.data = opt; }
	jQuery.ajax(obj);
}

//取数据
var data = {
	brand: function (fn) {
		var url = 'http://car.qichedaquan.com/carLoanCalculator/queryMaster';
		//url = 'temdata/d1.js';
		//临时地址
		getData(url, null, fn, 'GET');
	},
	series: function (id, fn) {
		var url = 'http://car.qichedaquan.com/carLoanCalculator/seriallist/'+id;
		//url = 'temdata/d2.js';
		//临时地址
		getData(url, {id: id}, fn, 'GET');
	},
	model: function (id, fn) {
		var url = 'http://car.qichedaquan.com/carLoanCalculator/carParamList/';
		//url = 'temdata/d3.js';
		//临时地址
		getData(url, {'serialid': id}, fn, 'GET');
	},
	carInfo: function (id, fn) {
		var url = 'http://car.qichedaquan.com/carparam/getParam/' + id;
		//url = 'temdata/d4.js';
		//临时地址
		getData(url, null, fn, 'GET');
	}
}

//选择取对应数据
var eachData = {
	brand: function (da, index) {
		var ins = index.split('|');
		return da[ins[0]][parseInt(ins[1])];
	},
	series: function (da, index) {
		var ins = index.split('|');
		return da.brandList[parseInt(ins[0])].carSerialList[parseInt(ins[1])];
	},
	model: function (da, index) {

		var ins = index.split('|');

		return da[parseInt(ins[0])].list[parseInt(ins[1])];
	}
}

//选择重置
var setSelect= {
	brand: function (opt, da) {


		opt.elm.attr('did', da.id)
		opt.elm.find('span.tit').text(da.name);

		opt.seriesElm.removeAttr('did');
		opt.seriesElm.find('span.tit').text('请选择车系');

		opt.modelElm.removeAttr('did');
		opt.modelElm.find('span.tit').text('请选择车款');
		remove();
	},
	series: function (opt, da) {
		opt.elm.attr('did', da.id);
		opt.elm.find('span.tit').text(da.showname);

		opt.modelElm.removeAttr('did');
		opt.modelElm.find('span.tit').text('请选择车款');
		remove();
	},
	model: function (opt, da) {
		opt.elm.attr('did', da.id);
		opt.elm.find('span.tit').text(da.name);
		//最后一步选择了之后，就需要抛出数据，用于更新列表
		data.carInfo(da.id, function (carData) {
			callBack(carData, opt.index);
		});
		remove();
	}
}

var boxElm = null;
var selElm = null;

//创建浮动层
// opt: 参数， tpl：模版， da：数据， fn：回调
function create(opt, tpl, da, fn) {
	if (boxElm) { remove(); }
	var html = doT.compile(tpl)(da);
    boxElm = jQuery(html)
    .click(function (e) { return false; })
    .on('click', '.selItem', function (e) {
    	fn(e,  eachData[opt.type](da, jQuery(this).attr('i')));
    	return false;
    });
    selElm = opt.eid;
    opt.elm.append(boxElm);
}

//删除浮动层
function remove() {
	if (boxElm) {
		boxElm.off();
		boxElm.remove();
	}
	boxElm = null;
	selElm = null;
}

//生成品牌
exports.brand = function (opt, fn) {

	if (opt.eid	 == selElm) {
		remove(); return;
	}

	//先取到数据
	data.brand(function (d) {
		//再生成界面
		create(opt, selBrandTpl, d, function (e, da) {
			setSelect.brand(opt, da);
		});


		var box = boxElm.find('.car_brand_con');
		var abcList = [];
		box.find('ul').each(function (i, n) {
			var x = parseInt(jQuery(n).attr('x'));
			var name = jQuery(n).attr('n');
			abcList.push({x:x, n: name});
		});


		boxElm.on('click', '.brandABC li', function () {
			var text = jQuery(this).text();
			var toElm = boxElm.find('ul.car_brand_'+text+'_ul');
			box.animate({'scrollTop': (parseInt(toElm.attr('x')) + 10) + 'px'}, 800);
			return false;
		});

		var abc = 'A';
		function toABC(n) {
			if (abc == n) { return; }
			boxElm.find('.brandABC li').removeClass('active');
			boxElm.find('.brandABC li.' + n).addClass('active');
			abc = n;
		}
		toABC('A'); //默认显示A

		box.on('scroll',function(e){
			var top = jQuery(this).scrollTop();
			var i = 0, l = abcList.length, n, n1;
			for (; i < l; i++) {
				n = abcList[i];
				n1 = abcList[i+1];
				if (top > n.x && top < n1.x) {
					toABC(n.n)
					break;
				}
			}
		});
	});
};

//生成车系
exports.series = function (opt, fn) {
	if (opt.eid == selElm) {
		remove(); return;
	}

	var id = opt.brankElm.attr('did');
	if (!id) { layer.msg('请先选择车型'); return; }
	//先取到数据
	data.series(parseInt(id), function (d) {
		//再生成界面
		create(opt, selSeriesTpl, d, function (e, da) {
			setSelect.series(opt, da);
		});
	})
};

//生成车款
exports.model = function (opt, fn) {
	if (opt.eid == selElm) {
		remove(); return;
	}
	var id = opt.seriesElm.attr('did');

	if (!id) { layer.msg('请先选择车系'); return; }
	//先取到数据
	data.model(parseInt(id), function (d) {
		create(opt, selModelTpl, d, function (e, da) {
			setSelect.model(opt, da);
		});
	});
};

exports.cb = function(fn) {
	if (fn) { callBack = fn; }
}

exports.remove = remove;