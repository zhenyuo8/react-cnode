//var data = require('./configParaData');

//最简单的复制一个数据
function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

//判断是否undifined
function isUdf (v, t) {
	return v !== undefined ? v : t;
}

//合并两个{}
function extend(a, b) {
	for (var x in b) {
		a[x] = b[x];
	}
}

//判断一个数据是否选择项
//全不选，都通过，选一个，通过一个
function isSel(obj, v) {
	var is = false, all = true;
	for (var i in obj) {
		//有任何一个被选择，就不会全部通过
		if (obj[i]) { all = false; }
		//当数据的值在选择范围，则通过
		if (v === i && obj[i]) { is = true; }
	}
	return all ? all : is;
}

function Para(fn) {
	this.data =  [];
	this.years = {}; //年份选择 {'2017': true}
	this.engine	= {}; //发动机选择  {'1.2T': true}
	this.speed = {}; //变速箱选择  {'手动'：true}

	this.sign = {
		hl: false,  //高亮不同项选择
		hd: false, //隐藏相同项选择
		nv: false //隐藏无内容选择
	}
	this.singData = {}
	this.selects = []; //选择的数据
	this.callback = fn || function () {};
}

Para.prototype.isSome = function (key) {
	var sign = this.singData[key];
	if (sign === undefined) { return ''; }
	return this.sign.hl && !sign.some ? 'trSome' : '';
}

Para.prototype.isShow = function (key) {
	var sign = this.singData[key];
	if (sign === undefined && this.sign.nv) {
		console.log(sign)
		console.log(key)
		return false;
	}
	if (this.sign.hd) {
		if (sign && sign.some) {
			return false;
		}
	}
	return true;
}


Para.prototype.createValue = function(i, key, reps) {
	var value = this.selects[i].param[key];
	if (value === undefined) {
		return '<span  class="bg_icon null_icon"></span>';
	} else {
		if (reps) {
			return reps[value];
		} else {
			return value;
		}
	}
}

Para.prototype.init = function (da) {
	if (da) { this.data = da; }

	var years = {}, engine = {},  speed = {};

	var i = 0, l = this.data.length, n;
	for (; i < l; i++) {
		n = this.data[i];
		var y = n['year'].toString();
		var e = n['param']['UnderPan_TransmissionType'];
		var s = n['param']['Engine_ExhaustForFloat'];
		//默认都不选择的
		if (years[y] === undefined) {
			years[y] = isUdf(this.years[y], false);
		}
		if (engine[e] == undefined) {
			engine[e] = isUdf(this.engine[e], false);
		}
		if (speed[s] == undefined) {
			speed[s] = isUdf(this.speed[s], false);
		}
	}
	this.years = years;
	this.engine = engine;
	this.speed = speed;

	this.parse();
}

//增加一条数据
Para.prototype.add = function (da) {
	this.data.push(da);
	this.parse();
	//this.visibal();
}

//删除一条数据
Para.prototype.del = function (x) {
	//先找到这条数据在原始数组中的位置，再删除
	var id = this.selects[x]['CarID'], i = 0, l = this.data.length;
	for (; i < l; i++) {
		if (this.data[i]['CarID'] == id) {
			break;
		}
	}
	this.data.splice(i, 1);
	this.parse();
	//this.visibal();
}

//位置移动只改变selects数据，不修改原始数据
Para.prototype.move = function (x, f) {
	x = parseInt(x);
	var re = [],  t = this.selects[x], t1 = this.selects[x-1], t2 = this.selects[x+1];
	var i = 0, l = this.selects.length, n;
	for (; i < l; i++) {
		if (f == '+') {
			if (i == x) {
				re.push(t2);
			} else if (i == x + 1) {
				re.push(t);
			} else {
				re.push(this.selects[i]);
			}
		} else {
			if (i == x) {
				re.push(t1);
			} else if (i == x - 1) {
				re.push(t)
			} else {
				re.push(this.selects[i]);
			}
		}
	}

	this.selects = re;
	this.visibal();
}

//替换一条数据
Para.prototype.exchange = function (obj, i) {
	this.data.splice(i, 1, obj);
	this.parse();
}

//根据年份，发动机等筛选数据
//这里的年份、发动机、变速箱，如果都不选择，则显示全部，如果有选择，则显示选择项
Para.prototype.parse = function (obj) {
	obj= obj || {};
	extend(this.engine, obj.engine || {});
	extend(this.years, obj.years || {});
	extend(this.speed, obj.speed || {});

	//是否全部通过
	var isY = isSel(this.years);
	var isE = isSel(this.engine);
	var isS = isSel(this.speed);

	// console.log(isY + '-' + isE + '-' + isS);
	if (isY && isE && isS) {
		this.selects = clone(this.data);
	} else {
		var i = 0, l = this.data.length, n, list = [];
		for (; i < l; i++) {
			n = this.data[i];
			var y = n['year'].toString();
			var e = n['param']['UnderPan_TransmissionType'];
			var s = n['param']['Engine_ExhaustForFloat'];

			if (isSel(this.years, y) && isSel(this.engine, e) &&　isSel(this.speed, s) ) {
				list.push(clone(n));
			}
		}
		this.selects = list;
	}

	this.visibal();
	return this;
}

//根据相同、异同等标记数据
Para.prototype.visibal = function (obj) {
	extend(this.sign, obj || {});

	//var isS = isSel(this.sign);
	var vs = {}, das = this.selects; //记录每条数据的状态，含，是否相同，是否无类容，那些是不同项 {same:true}
	console.log(das)
	var i = 0, l = das.length, n;
	if(l==0) return;
	if (l <= 1) {
		for (var g in das[0].param) {
			vs[g] = {same: false};
		}
	} else {
		var temSame = {}; //相同临时记录

		function temAdd(key, v) {
			if (temSame[key] === undefined) {
				vs[key] = {some: true}//默认每条数据是相同的
				temSame[key] = v;
			} else {
				//有任何一个不同就判定为不同
				if (temSame[key] != v) {
					vs[key].some = false;
				}
			}
		}

		for (; i < l; i++) {
			n = das[i].param;
			for (var d in n) {
				temAdd(d, n[d]);
				/*if (temSame[d] === undefined) {
					vs[d] = {some: true}//默认每条数据是相同的
					temSame[d] = n[d];
				} else {
					//有任何一个不同就判定为不同
					if (temSame[d] != n[d]) {
						vs[d].some = false;
					}
				}*/
			}
			//对于子节点中没有没循环到的项目,比如价格等，这里单独增加
			temAdd('referprice', n['carParam']['referprice']);
			//temAdd('Perf_AccelerateTime', n['carParam']['Perf_AccelerateTime']);
		}


	}
	this.singData = vs;
	this.callback(this);
	return this;
}



module.exports = function (fn) {
	return new Para(fn);
}

/*var Mod = new Para(function (da) {
	console.log(da);
});

Mod.init(data.data)
Mod.parse({years: {'2016': true}, engine: {}, speed: {}});*/