(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//var data = require('./configParaData');

var compareBoto = require("../mod/carCompareLayer");

var config = [
	{name: '基本信息', field: ['Car_RepairPolicy', 'new_energy_subsidies', 'Engine_ExhaustForFloat','UnderPan_TransmissionType','Perf_ShiQuYouHao','Perf_ShiJiaoYouHao','Perf_ZongHeYouHao','Perf_AccelerateTime','Perf_MaxSpeed','Perf_Seatscope']},
	{name: '车体', field: ['CarColorList', 'OutSet_Length', 'OutSet_Width','OutSet_Height','OutSet_WheelBase','OutSet_FrontTread','OutSet_BackTread','Perf_Weight','Perf_TotalWeight','OutSet_MinGapFromEarth','Perf_MaxPaddleDepth','OutSet_NearCorner','Perf_Throughtheangle','OutSet_AwayCorner','Inset_TrunkCapacity','Inset_TrunkCapacityE','InStat_TrunkType','Inset_BackUpOpenType','Induction_trunk','Body_Doors','Body_TipType','Body_sailType','Body_CalashOCType','OutStat_TopSnelf','OutStat_SportsAppearanceKit','Cargo_compartment_form','Cargo_length_min','cargo_width_min','Cargo_height_min','truck_form','Seating_arrangement','nominal_load_capacity','maximum_gross_mass']},
	{name: '发动机', field: ['Engine_Location', 'Engine_Type', 'Engine_ExhaustForFloat','Engine_Exhaust','Engine_InhaleType','Engine_CylinderRank','Engine_CylinderNum','Engine_ValvePerCylinder','Engine_Camshaft','Engine_CompressRat','Engine_CylinderDM','Engine_Route','Engine_horsepower','Engine_MaxPower','Engine_PowerSpeed','Engine_MaxNJ','Engine_NJSpeed','Engine_SpTech','Oil_FuelType','new_energy_type','Oil_FuelTab','Oil_SupplyType','Oil_FuelCapacity','Engine_CylinderTMaterial','Engine_CylinderMaterial','Engine_EnvirStandard','UnderPan_Startandstopsystem','tank_material']},
	{name: '电池/电动机', field: ['Electric_Peakpower', 'Electric_Maximumpowerspeed', 'Electric_maximumtorque','Maximummotortorquespeed','Electric_RatedPower','Electric_systemvoltage','Electric_Motortype','Electric_number','Electric_position','chongdianfangshi','Electric_Normalchargingtime','Electric_Fast-chargetime','Electric_Batteryvoltage','Electric_Batterycapacity','Electric_BatteryType','Electric_Powerconsumption','Electric_mustMileageconstant']},
	{name: '变速箱', field: ['UnderPan_TransmissionType', 'InStat_SteerEtc', 'Transmission_type','forward_gears_number','backward_gears_number']},
	{name: '底盘制动', field: ['Body_Struc','OutSet_MinWheelRadius','UnderPan_DriveAsistTurn','UnderPan_FrontBrakeType','UnderPan_RearBrakeType','UnderPan_ParkingBrake','Perf_DriveType','UnderPan_Airmatic','UnderPan_SuspensionHeightControl','UnderPan_FrontSuspensionType','UnderPan_RearSuspensionType','UnderPan_CentralDiffLock','Front_axle_description','Back_axle_description','spring_quantity']},
	{name: '安全配置', field: ['Safe_DriverGasBag','Safe_SubDriverGasBag','Safe_FsadGasbag','Safe_FheadGasbag','Safe_KneeGasBag','Safe_BsadGasbag','Safe_BheadGasbag','InStat_BeltBag','Safe_BeltReminder','UnderPan_lifeBeltlimit','Safe_BeltPreTighten','Safe_BeltPosTune','Safe_BackBelt','Safe_BackthreespotBelt','UnderPan_TyrePressureWatcher','UnderPan_ZeroPressureDrive','InStat_CenterControlLock','InStat_ChildLock','InStat_Rckey','nokey_into','InStat_AIgnitionSys','Safe_EATS']},
	{name: '车轮', field: ['UnderPan_FrontTyreStandard','UnderPan_RearTyreStandard','UnderPan_SpareWheelStandard','UnderPan_RimMaterial','truck_tire_number']},
	{name: '行车辅助', field: ['Safe_ABS','Safe_EBD','Safe_EBA','Safe_TCS','UnderPan_DSC','UnderPan_AsistTurnTune','InStat_AutoPark','InStat_UphillAuxiliary','InStat_HDC','UnderPan_PRadar','UnderPan_RRadar','UnderPan_RImage','InStat_PanoramicCamera','InStat_SpeedCruise','InStat_Automaticcruise','InStat_GPS','InStat_AutoParking','InStat_blindspotdetection','Lane_Departure','InStat_ActiveSafetySystems','InStat_OverallActiveSteeringSystem','InStat_NightVisionSystem']},
	{name: '门窗/后视镜', field: ['Body_Openmethod','OutStat_CarWindow','OutStat_UV_InsulatinGlass','Privacy_glass','OutStat_AvoidNipHead','Body_LouverOCType','Body_Louver','OutStat_BackCurtain','OutStat_SecondRowCurtain','OutStat_BBrushSensor','OutStat_FBrushSensor','InStat_ElectricPick-upDoors','OutStat_MirrorSideLight','OutStat_ReMirrormemory','OutStat_ReMirrorHot','OutStat_ReMirrorFold','OutStat_ReMirrorElecTune','OutStat_ReMirrorDazzle','InStat_FaceMirror']},
	{name: '灯光', field: ['OutStat_FrontLightType','choice_FrontLightType','OutStat_FLightClose','OutStat_FLightAutoClean','OutStat_FLightDelay','OutStat_FLightSteer','OutStat_FLightHeightTune','OutStat_FLightDazzle','OutStat_FfogLamp','InStat_ReadingLight','OutStat_atmosphereLight','OutStat_DaytimeRunningLights','OutStat_LEDtaillights','OutStat_Corneringlights']},
	{name: '内部配置', field: ['SteeringAdjustmentLeftAndRight','InStat_SteeringAdjustmentUpAndDown','InStat_SteerTuneType','InStat_SteerMomery','InStat_SteerMaterial','InStat_MultiFuncSteer','Liquid_crystal_instrument_panel','InStat_ComputerMonitors','InStat_Hud','InStat_BCarShelf','InStat_12VPower']},
	{name: '座椅', field: ['InStat_SportSeat','choice_SeatMaterial','choice_SeatMaterial','seat_height_adjustable','InStat_DSeatTuneType','InStat_DASeatTuneType','InStat_DSeatProp','InStat_AdjustableShoulderSupport','InStat_FSeatPillowA','InStat_BSeatTuneType','InStat_BSeatLieRate','Rear_seat_angle_adjustment','InStat_FCenterArmrest','InStat_BCenterArmrest','InStat_SeatHeat','InStat_DSeatHot','InStat_SeatKnead','InStat_ElectricSeatMemory','InStat_ChildSeatFix','InStat_3rdRowSeats']},
	{name: '娱乐通讯', field: ['InStat_PositioningInteractiveServices','InStat_Bluetooth','InStat_ExternalAudioInterface','InStat_Built-inHardDrive','InStat_Video','InStat_LoudHailer','InStat_Audiobrand','InStat_DVDPlayer','InStat_CDPlayer','InStat_CCEscreen','InStat_BEscreen']},
	{name: '空调/冰箱', field: ['InStat_AirCType','InStat_TemperSubCount','InStat_BAirCSystem','InStat_BleakAirNum','InStat_AirCondPollenFilter','AirCondition_AirPurification','InStat_carFridge']},
];

var heights = {'CarColorList': 73}; //特殊高度


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
		nv: true //隐藏无内容选择
	}
	this.singData = {}; //记录一条数据的状态，如，是否相同等
	this.grupData = []; //记录大类的状态，如某一类是否没有数据
	this.selects = []; //选择的数据
	this.callback = fn || function () {};

	//对比列表
	this.list = [];
	this.width = 0; //对比页宽度
	this.widthB = 0; //参数页面宽度
}

//是否在对比列表
Para.prototype.inList = function (da) {
	var i = 0, l = this.list.length, re = false;
	for (; i < l; i++) {
		if (parseInt(da) == parseInt(this.list[i].id)) {
			re = true; break;
		}
	}
	return re;
}

Para.prototype.isSome = function (key) {
	var sign = this.singData[key];
	if (sign === undefined) { return ''; }
	return this.sign.hl && !sign.some ? 'trSome' : '';
}

// 判断一行是否相同
Para.prototype.isShow = function (key) {
	var sign = this.singData[key];
	if (sign === undefined && this.sign.nv) {
		return false;
	}
	if (this.sign.hd) {
		if (sign && sign.some) {
			return false;
		}
	}
	return true;
}

Para.prototype.isTitle = function (name) {
	var i = 0, l = this.grupData.length, g, re = false;

	for (; i < l; i++) {
		g = this.grupData[i];
		if (g && name == g.name) {
			re = true; break;
		}
	}
	return re;
}

//传递一组键,计算生成行的高度
//所以
Para.prototype.grupHight = function (arr) {
	var i = 0, l = arr.length, n, re = 0; //默认不显示

	for (; i < l; i++) {
		if (this.isShow(arr[i])) {
			re += (heights[arr[i]] || 36); //每一行高度
		}
	}

	if (re > 0) { re += 41; } //加上头部高度40像素
	
	return re;
}


Para.prototype.createValue = function(i, key, reps) {
	var value = this.selects[i].param[key];
	if (value === undefined || value === '待查') {
		return reps ? '' : '<span  class="bg_icon"></span>';
	}
	else if (value === "无") {
		return reps ? 'null_icon' : '<span  class="bg_icon null_icon"></span>';
	}
	else {
		if (reps) {
			return reps[value];
		} 
		else {
			return value;
		}
	}
}

Para.prototype.init = function (da) {
	if (da) { this.data = da; }

	var self = this;
	compareBoto.on('remove', function () {
		self.visibal();
	});

	var years = {}, engine = {},  speed = {};

	var i = 0, l = this.data.length, n;
	for (; i < l; i++) {
		n = this.data[i];
		var y = n['year'].toString();
		var e = n['param']['Engine_ExhaustForFloat'];
		var s = n['param']['UnderPan_TransmissionType'];
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
			var e = n['param']['Engine_ExhaustForFloat'];
			var s = n['param']['UnderPan_TransmissionType'];

			if (isSel(this.years, y) && isSel(this.engine, e) &&　isSel(this.speed, s) ) {
				list.push(clone(n));
			}
		}
		this.selects = list;
	}

	this.width = (Math.max(3, this.selects.length) + 2) * 197;
	this.widthB = (Math.max(4, this.selects.length) + 1) * 197;

	this.visibal();
	return this;
}

//根据相同、异同等标记数据
Para.prototype.visibal = function (obj) {
	extend(this.sign, obj || {});

	//var isS = isSel(this.sign);
	var vs = {}, das = this.selects; //记录每条数据的状态，含，是否相同，是否无类容，那些是不同项 {same:true}
	var i = 0, l = das.length, n;
	if(l==0) return;
	if (l <= 1) {
		for (var g in das[0].param) {
			vs[g] = {same: false};
		}
	} else {
		var temSame = {}; //相同临时记录

		function temAdd(key, v) {
			//如果值是待查，则默认是空的
			if (v === '待查'){ v = undefined; } 
			if (temSame[key] === undefined) {
				if (v) {
					vs[key] = {some: true}//默认每条数据是相同的
				}
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
	this.list = compareBoto.getData();

	var tips = [];

	var t = 0, tl = config.length, tn, h, hs = 0;
	for (; t < tl; t++) {
		tn = config[t];
		h = this.grupHight(tn.field);
		if (h) {
			tips.push({name: tn.name, start: hs, end: hs + h});
			hs += h;
		}
	}

	this.grupData = tips;
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
},{"../mod/carCompareLayer":4}],2:[function(require,module,exports){

$(function(){

    //var data = require('./data/configParaData');

    var doT = require('../lib/doT');
    var compareBoto = require("./mod/carCompareLayer");
    var carInfoTpl = require('./tpl/configParaInfo.html');
    var carTitleTpl = require('./tpl/configParaTitle.html');
    var carSelecTpl = require('./tpl/configParaSelect.html');
    var carLeftTpl = require('./tpl/configParaLeft.html');
    var leftTipTpl = require('./tpl/leftTip.html');

    //carCompareJson 是页面中的数据
    var paraMod = require('./configPara/dataParse');
    require('./layer/layer');

    var scKey = false; //滚动锁
    var leftIndex = -1; //左侧位置
    var cardata = config;


    //模版渲染方法
    //重新渲染模板数据
    function reInfo(data) {
        var infoHtmlCompile = doT.compile(carInfoTpl)(data);
        $('#carInfoP').html(infoHtmlCompile);
    }
    function reTitle(data) {
        var titleHtmlCompile = doT.compile(carTitleTpl)(data);
        $('#carInfoT').html(titleHtmlCompile);
    }
    function reSelect(data) {
        var selectHtmlCompile = doT.compile(carSelecTpl)(data);
        $('#carSelectBox').html(selectHtmlCompile)
    }
    function reSing(data) {
        var signHtmlCompile = doT.compile(carSingTpl)(data);
        $('#carSignBox').html(signHtmlCompile)
    }

    function reLeft(data) {
         var leftHtmlCompile = doT.compile(carLeftTpl)(data);
        $('#carLeftMenu').html(leftHtmlCompile)
    }

    function reLeftTip(data, i) {
        var htmlCompile = doT.compile(leftTipTpl)({list:data, act: i});
        jQuery('#carLeftTip').html(htmlCompile);
    }

    var anchorScTop = jQuery('#main_box').offset();
    var status = {fixed: false,  anchor: 0}; //fixed是否在置顶状态，锚点位置
    var anchorTops = []; //锚点位置记录

    //设置左侧浮动焦点位置
    function setAnchor(x) {
        if(leftIndex == x || x < 0) { return; }
        jQuery('#carLeftTip li.po-r').each(function (i, n) {
            if (i == x) {
                jQuery(n).addClass('active');
                jQuery(n).find('.status_n_icon').addClass('status_icon');

            } 
            else {
                jQuery(n).removeClass('active');
                jQuery(n).find('.status_n_icon').removeClass('status_icon');
            }
        })
    }

    //置顶和解置顶
    function fixedTitle(is) {
        if (status.fixed == is) { return; }
        $("#carLaryerBox").css({
            'position': is ? 'fixed' : 'static',
            'top': is ? 0 : 'auto',
            'backgroundColor': is ? '#ffffff' : 'none',
            'z-index': is ? '90' : 'auto',
            'border-left': is ? '1px solid #dadada' : 'none',
            'box-shadow': is ? '0 1px 6px rgba(0,0,0,0.2)' : 'none'
        });
        status.fixed = is;
    }

    //滚动到对应的锚点位置
    function scrollTo(x, fn) {
        if (typeof x == 'string') {
            x = jQuery('#' + x).offset().top;
        }
        //这个地方需要判断顶部是否有浮层，如果有,则要减去浮层高度
        if (x > anchorScTop.top) {
            x -= 224;
        }
        jQuery('body, html').animate({'scrollTop': x + 'px'}, 800, fn);
    }

    //删除一屏动效, 因页面html代码格式问题，导致写效果很疼
    function delEfect(x, fn) {
        var emls = jQuery('#carInfoT tr, #carInfoP tr.h36, #carInfoP tr.h73').find('td:eq('+x+')');
        var jia = 0, l = emls.length;
        emls.css({ 'overflow': 'hidden'});
        //所有动画执行完毕之后回调
        emls.animate({'width': 0, 'opacity': 0}, 200, function () {
            jia ++; if (jia >= l) { fn(); }
        });
        var table = jQuery('#carInfoP table, #carInfoT table');
        var elmsT = jQuery('#carInfoP tr.title_box th'), w = table.width();
        elmsT.animate({'width': w - 197}, 200);
        table.animate({'width': w - 197}, 200);
    }

    //初始化数据模型
    var M = paraMod(function (D) {
        reSelect({years:D.years, engine: D.engine, speed: D.speed});
        //reSing(D.sign);

        //每次当数据发生变化后，需要重新执行这个方法
        reTitle(D);
        reInfo(D);
        reLeft(D);
        anchorScTop = jQuery('#main_box').offset();

        reLeftTip(D.grupData);

    });
    M.init(cardata.data);
    $('.js_search_his').data('comCarId', []);

    //绑定年份，变速箱，排量数据
    jQuery('#carSelectBox').on('click', 'li.click', function (e) {
        jQuery(this).toggleClass('active');

        //读取选择的数据
        var da = {years: {}, speed: {}, engine: {}};
        jQuery('#carSelectBox li.click').each(function (i, n) {
            var elm = jQuery(n), m = elm.attr('m'), v = elm.attr('v');
            da[m][v] = elm.hasClass('active');
        });
        M.parse(da);
    });

    // 高亮、隐藏按钮事件
    jQuery('#carLeftMenu').on('click', 'label.visibal', function (e) {
        jQuery(this).toggleClass('active');
        var da = {}
        jQuery('#carLeftMenu label.visibal').each(function (i, n) {
            var elm = jQuery(n), m = elm.attr('m');
            da[m] = elm.hasClass('active');
        });

        M.visibal(da);
     });

    //绑定列表顶部的显示隐藏、删除等功能
     jQuery('#carInfoT').on('click', 'label.visibal', function (e) {

        jQuery(this).toggleClass('active');
        var da = {}
        jQuery('#carInfoT label.visibal').each(function (i, n) {
            var elm = jQuery(n), m = elm.attr('m');
            da[m] = elm.hasClass('active');
        });
        M.visibal(da);
        //setComBtnTatus()
        reSize();

     }).on('click', 'span.Js_delete_ele', function(e){

        var i = parseInt(jQuery(this).attr('i'));
        var carid=$(this).parent('.Js_tableHead_item').find('.dragg_car_box').attr('carid')
        if (M.selects.length <=1) {
            layer.msg('至少需要保留一条信息');
            return;
        }
        //执行删除动效，然后删除数据
        delEfect(i, function () {
            M.del(i);
            setWid();//设置#carInfoT 宽度
            isAddCarToBox(carid);
            //setComBtnTatus();
        });

    });
     //删除数据时设置#carInfoT 宽度
     function setWid() {
        var w=$('.car_compare_con .title_box').eq(0).width();
        $('#carInfoT').css("width",w+'px')
    }

    //绑定左侧焦点位置选择
    jQuery('.Js_po_left_nav').on('click', 'li a', function (e) {
        //var href = jQuery(this).attr('href');
        //scrollTo(href);

        var i = parseInt(jQuery(this).attr('i'));

        var da = M.grupData[i];
        
        scKey = true;
        scrollTo((250 + 386 + 30) - i*23 + da.start, function () {
            setAnchor(i);
            setTimeout(function () {
                scKey = false;
            }, 100)
        });
        
        return false;
    });


    var carLeftMenu = jQuery('#carLeftMenu');
    var carTopBox = jQuery('#carLaryerBox');


    //判断是否在区间，如果在，返回最小值
    function isInGrup(sc) {
        var l = M.grupData.length;

        var h = 0, da, index = -1, pindex;
        for (var i = 0; i < l; i++) {
            da = M.grupData[i];

            h = sc + 20 + i*20;
            
            if (h <= da.end + 360 && h >= da.start + 360) {
               if (Math.abs(h - (da.start + 360)) < 90) {
                    index = i; break;
               };
               if (pindex === undefined) { pindex = i; }
            }
        }
        return {a: index, b: pindex};
    }


    function reSize(is) {
        var top = jQuery(window).scrollTop();
        var left = jQuery(window).scrollLeft();

        anchorScTop = jQuery('#main_box').offset();
        if (top > anchorScTop.top) {
            fixedTitle(true);
            carTopBox.css({left: anchorScTop.left - left});


        } else {
            fixedTitle(false);
        }
        carLeftMenu.css({top: anchorScTop.top - top});

        if (status.fixed) {
            var to = isInGrup(top);
            setAnchor(Math.abs(to.b - leftIndex) > 2 ? to.b : to.a);
            //setAnchor(index);
        } else {
            setAnchor(0);
        }

        //左右滚动
        if (left > anchorScTop.left) {
            carLeftMenu.show();
        } else {
            carLeftMenu.hide();
        } 
    }


    //绑定页面的向上滚动
    jQuery(window).scroll(function() {
       reSize();
    }).resize(function () {
        reSize(true);
    })

    //添加对比数据
    $('#carLaryerBox').on('click','.Js_compare_btn',function(){
        if (jQuery(this).hasClass('dsl')) {
            return;
        }
        var id = $(this).parents('td').find('.dragg_car_box').attr('carid')
        var text = $(this).parents('td').find('.car_des').text()
        
        compareBoto.addCar({
            id: id,
            text: text
        })
        M.visibal();
    });


    
    //02.28 回到顶部按钮失效  db修复
    $(window).on('scroll',function(){
        if($(window).scrollTop()>500){
            $("#back_to_top").show();
        }else{
            $("#back_to_top").hide();
        }
    });

    //回到顶部
    $('#back_to_top').on('click',function(){
        event.stopPropagation();
        $("html,body").animate({scrollTop:0}, 500);
    });

    // 对比项移动后、高亮、显示、隐藏，数据会重绘页面，导致每个对比项的对比按钮高亮
    function setComBtnTatus(){
        if(!$('.js_search_his').data('comCarId').length) return;
        var data=$('.js_search_his').data('comCarId');
        var i=0 , l=data.length;
        for(;i<l;i++){
            var ele=$('#carLaryerBox .Js_tableHead_item').find('.dragg_car_box[carid="'+data[i]+'"]');
            $(ele).next('.Js_duibi_btn').find('.Js_compare_btn').html('已对比').css('color','#aaa').css('background','url(../img/addend.png) no-repeat 15px center');
            $(ele).next('.Js_duibi_btn').find('.Js_compare_btn').attr('isAdd','true');

        }
    }
    // 对比项删除后，数据会重绘页面，导致每个对比项的对比按钮高亮
    // 删除的数据是否被添加到对比框中
    function isAddCarToBox(carid){
        var is=false;
        var data=$('.js_search_his').data('comCarId');
        var i=0 , l=data.length;
        for(;i<l;i++){
            if(data[i]==carid){
                is=true;
                break;
            }
        }
        if(is){
            data.splice(i, 1);
            $('.js_search_his').find('a[carid="'+carid+'"]').next('i').trigger('click')
        }
        $('.js_search_his').data('comCarId',data)
        return is
    }

/*-------------------原页面的左右移动未做修正，保留----------------------------*/

    //设置对比头车 尾车  左右移动按钮消失;
    function setFirstLastCar(){
        $('.Js_first_tr td').first().find('.Js_icon_left').css('visibility','hidden');
        $('.Js_first_tr td').last().find('.Js_icon_right').css('visibility','hidden');
        $('.Js_first_tr_clone td').first().find('.Js_icon_left').css('visibility','hidden');
        $('.Js_first_tr_clone td').last().find('.Js_icon_right').css('visibility','hidden');
        $('tr').find('.td').last().css('borderRight','none');
    };
    setFirstLastCar();
    function setFirstLastCarMove(){
        $('.Js_first_tr td').first().find('.Js_icon_left').css('visibility','hidden');
        $('.Js_first_tr td[hascon="true"]').last().find('.Js_icon_right').css('visibility','hidden');
        $('.Js_first_tr_clone td').first().find('.Js_icon_left').css('visibility','hidden');
        $('.Js_first_tr_clone td[hascon="true"]').last().find('.Js_icon_right').css('visibility','hidden');
        $('tr').find('.td').last().css('borderRight','none');
    };

    (function(){
        var userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1) {
            //return "Safari";
            $('.first_tr').find('th').css('width','197px');
            $('.first_tr').find('td').css('width','197px');
            $('.op0').find('th').css('width','197px');
            $('.op0').find('td').css('width','197px');
        }
    })();

    //右移
    $('#carInfoT').on('click', '.Js_icon_right',function(){
        var index = jQuery(this).attr('i');
        if($(this).attr('ismove')=='false') return;
        $(this).attr('ismove','false');
        var _this=this;
        var l=$(this).closest('.Js_tableHead_item').find("div[id^='draggcarbox_'],div[id^='draggcarbox_clone_']").eq(0);
        if ($(l).length == 0) {
            return;
        };
        var g = $(this).closest(".Js_tableHead_item").next().find("div[id^='draggcarbox_'],div[id^='draggcarbox_clone_']").eq(0);
        if ($(g).length == 0) {
            return;
        }
        var h = l.position().left;
        var m = g.position().left;
        l.css("display", "none");
        g.css("display", "none");
        var k = l.clone();
        var o = g.clone();
        k.insertAfter(l).css({
            position: "absolute",
            display: "block",
            "z-index": "1000"
        }).animate({
            left: h + 197
        }, 200, function() {
            l.insertBefore(g).css("display", "block");
            M.move(index, '+');
            //setComBtnTatus()
        });

        o.insertAfter(g).css({
            position: "absolute",
            display: "block",
            "z-index": "999"
        }).animate({
            left: m - 197
        }, 200, function() {
            g.insertBefore(k).css("display", "block");
            k.remove();
            o.remove();
            $(_this).attr('ismove','true')
        });
    })
    //左移
    $('#carInfoT').on('click', '.Js_icon_left', function(){
        var index = jQuery(this).attr('i');
        if($(this).attr('ismove')=='false') return;
        $(this).attr('ismove','false');
        var _this=this
        var l=$(this).closest('.Js_tableHead_item').find("div[id^='draggcarbox_']").eq(0);
        if ($(l).length == 0) {
            return;
        };
        var g = $(this).closest(".Js_tableHead_item").prev().find("div[id^='draggcarbox_']").eq(0);
        if ($(g).length == 0) {
            return;
        }
        var h = l.position().left;
        var m = g.position().left;
        l.css("display", "none");
        g.css("display", "none");
        var k = l.clone();
        var o = g.clone();
        k.insertAfter(l).css({
            position: "absolute",
            display: "block",
            "z-index": "1000"
        }).animate({
            left: h - 197
        }, 200, function() {
            l.insertBefore(g).css("display", "block");
            M.move(index, '-');
             //setComBtnTatus()
        });
        o.insertAfter(g).css({
            position: "absolute",
            display: "block",
            "z-index": "999"
        }).animate({
            left: m + 197
        }, 200, function() {
            g.insertBefore(k).css("display", "block");;
            k.remove();
            o.remove();
            $(_this).attr('ismove','true')
        });
    })

});

},{"../lib/doT":11,"./configPara/dataParse":1,"./layer/layer":3,"./mod/carCompareLayer":4,"./tpl/configParaInfo.html":6,"./tpl/configParaLeft.html":7,"./tpl/configParaSelect.html":8,"./tpl/configParaTitle.html":9,"./tpl/leftTip.html":10}],3:[function(require,module,exports){
/*! layer-v3.0.3 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */
 ;!function(e,t){"use strict";var i,n,a=e.layui&&layui.define,o={getPath:function(){var e=document.scripts,t=e[e.length-1],i=t.src;if(!t.getAttribute("merge"))return i.substring(0,i.lastIndexOf("/")+1)}(),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},r={v:"3.0.3",ie:function(){var t=navigator.userAgent.toLowerCase();return!!(e.ActiveXObject||"ActiveXObject"in e)&&((t.match(/msie\s(\d+)/)||[])[1]||"11")}(),index:e.layer&&e.layer.v?1e5:0,path:o.getPath,config:function(e,t){return e=e||{},r.cache=o.config=i.extend({},o.config,e),r.path=o.config.path||r.path,"string"==typeof e.extend&&(e.extend=[e.extend]),o.config.path&&r.ready(),e.extend?(a?layui.addcss("modules/layer/"+e.extend):r.link("skin/"+e.extend),this):this},link:function(t,n,a){if(r.path){var o=i("head")[0],s=document.createElement("link");"string"==typeof n&&(a=n);var l=(a||t).replace(/\.|\//g,""),f="layuicss-"+l,c=0;s.rel="stylesheet",s.href=r.path+t,s.id=f,i("#"+f)[0]||o.appendChild(s),"function"==typeof n&&!function u(){return++c>80?e.console&&console.error("layer.css: Invalid"):void(1989===parseInt(i("#"+f).css("width"))?n():setTimeout(u,100))}()}},ready:function(e){var t="skinlayercss",i="303";return a?layui.addcss("modules/layer/default/layer.css?v="+r.v+i,e,t):r.link("skin/default/layer.css?v="+r.v+i,e,t),this},alert:function(e,t,n){var a="function"==typeof t;return a&&(n=t),r.open(i.extend({content:e,yes:n},a?{}:t))},confirm:function(e,t,n,a){var s="function"==typeof t;return s&&(a=n,n=t),r.open(i.extend({content:e,btn:o.btn,yes:n,btn2:a},s?{}:t))},msg:function(e,n,a){var s="function"==typeof n,f=o.config.skin,c=(f?f+" "+f+"-msg":"")||"layui-layer-msg",u=l.anim.length-1;return s&&(a=n),r.open(i.extend({content:e,time:3e3,shade:!1,skin:c,title:!1,closeBtn:!1,btn:!1,resize:!1,end:a},s&&!o.config.skin?{skin:c+" layui-layer-hui",anim:u}:function(){return n=n||{},(n.icon===-1||n.icon===t&&!o.config.skin)&&(n.skin=c+" "+(n.skin||"layui-layer-hui")),n}()))},load:function(e,t){return r.open(i.extend({type:3,icon:e||0,resize:!1,shade:.01},t))},tips:function(e,t,n){return r.open(i.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:210},n))}},s=function(e){var t=this;t.index=++r.index,t.config=i.extend({},t.config,o.config,e),document.body?t.creat():setTimeout(function(){t.creat()},30)};s.pt=s.prototype;var l=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];l.anim=["layer-anim","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],s.pt.config={type:0,shade:.3,fixed:!0,move:l[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},s.pt.vessel=function(e,t){var n=this,a=n.index,r=n.config,s=r.zIndex+a,f="object"==typeof r.title,c=r.maxmin&&(1===r.type||2===r.type),u=r.title?'<div class="layui-layer-title" style="'+(f?r.title[1]:"")+'">'+(f?r.title[0]:r.title)+"</div>":"";return r.zIndex=s,t([r.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+a+'" times="'+a+'" style="'+("z-index:"+(s-1)+"; background-color:"+(r.shade[1]||"#000")+"; opacity:"+(r.shade[0]||r.shade)+"; filter:alpha(opacity="+(100*r.shade[0]||100*r.shade)+");")+'"></div>':"",'<div class="'+l[0]+(" layui-layer-"+o.type[r.type])+(0!=r.type&&2!=r.type||r.shade?"":" layui-layer-border")+" "+(r.skin||"")+'" id="'+l[0]+a+'" type="'+o.type[r.type]+'" times="'+a+'" showtime="'+r.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+s+"; width:"+r.area[0]+";height:"+r.area[1]+(r.fixed?"":";position:absolute;")+'">'+(e&&2!=r.type?"":u)+'<div id="'+(r.id||"")+'" class="layui-layer-content'+(0==r.type&&r.icon!==-1?" layui-layer-padding":"")+(3==r.type?" layui-layer-loading"+r.icon:"")+'">'+(0==r.type&&r.icon!==-1?'<i class="layui-layer-ico layui-layer-ico'+r.icon+'"></i>':"")+(1==r.type&&e?"":r.content||"")+'</div><span class="layui-layer-setwin">'+function(){var e=c?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return r.closeBtn&&(e+='<a class="layui-layer-ico '+l[7]+" "+l[7]+(r.title?r.closeBtn:4==r.type?"1":"2")+'" href="javascript:;"></a>'),e}()+"</span>"+(r.btn?function(){var e="";"string"==typeof r.btn&&(r.btn=[r.btn]);for(var t=0,i=r.btn.length;t<i;t++)e+='<a class="'+l[6]+t+'">'+r.btn[t]+"</a>";return'<div class="'+l[6]+" layui-layer-btn-"+(r.btnAlign||"")+'">'+e+"</div>"}():"")+(r.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],u,i('<div class="layui-layer-move"></div>')),n},s.pt.creat=function(){var e=this,t=e.config,a=e.index,s=t.content,f="object"==typeof s,c=i("body");if(!t.id||!i("#"+t.id)[0]){switch("string"==typeof t.area&&(t.area="auto"===t.area?["",""]:[t.area,""]),t.shift&&(t.anim=t.shift),6==r.ie&&(t.fixed=!1),t.type){case 0:t.btn="btn"in t?t.btn:o.btn[0],r.closeAll("dialog");break;case 2:var s=t.content=f?t.content:[t.content,"auto"];t.content='<iframe scrolling="'+(t.content[1]||"auto")+'" allowtransparency="true" id="'+l[4]+a+'" name="'+l[4]+a+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+t.content[0]+'"></iframe>';break;case 3:delete t.title,delete t.closeBtn,t.icon===-1&&0===t.icon,r.closeAll("loading");break;case 4:f||(t.content=[t.content,"body"]),t.follow=t.content[1],t.content=t.content[0]+'<i class="layui-layer-TipsG"></i>',delete t.title,t.tips="object"==typeof t.tips?t.tips:[t.tips,!0],t.tipsMore||r.closeAll("tips")}e.vessel(f,function(n,r,u){c.append(n[0]),f?function(){2==t.type||4==t.type?function(){i("body").append(n[1])}():function(){s.parents("."+l[0])[0]||(s.data("display",s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]),i("#"+l[0]+a).find("."+l[5]).before(r))}()}():c.append(n[1]),i(".layui-layer-move")[0]||c.append(o.moveElem=u),e.layero=i("#"+l[0]+a),t.scrollbar||l.html.css("overflow","hidden").attr("layer-full",a)}).auto(a),2==t.type&&6==r.ie&&e.layero.find("iframe").attr("src",s[0]),4==t.type?e.tips():e.offset(),t.fixed&&n.on("resize",function(){e.offset(),(/^\d+%$/.test(t.area[0])||/^\d+%$/.test(t.area[1]))&&e.auto(a),4==t.type&&e.tips()}),t.time<=0||setTimeout(function(){r.close(e.index)},t.time),e.move().callback(),l.anim[t.anim]&&e.layero.addClass(l.anim[t.anim]),t.isOutAnim&&e.layero.data("isOutAnim",!0)}},s.pt.auto=function(e){function t(e){e=s.find(e),e.height(f[1]-c-u-2*(0|parseFloat(e.css("padding-top"))))}var a=this,o=a.config,s=i("#"+l[0]+e);""===o.area[0]&&o.maxWidth>0&&(r.ie&&r.ie<8&&o.btn&&s.width(s.innerWidth()),s.outerWidth()>o.maxWidth&&s.width(o.maxWidth));var f=[s.innerWidth(),s.innerHeight()],c=s.find(l[1]).outerHeight()||0,u=s.find("."+l[6]).outerHeight()||0;switch(o.type){case 2:t("iframe");break;default:""===o.area[1]?o.fixed&&f[1]>=n.height()&&(f[1]=n.height(),t("."+l[5])):t("."+l[5])}return a},s.pt.offset=function(){var e=this,t=e.config,i=e.layero,a=[i.outerWidth(),i.outerHeight()],o="object"==typeof t.offset;e.offsetTop=(n.height()-a[1])/2,e.offsetLeft=(n.width()-a[0])/2,o?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=n.width()-a[0]:"b"===t.offset?e.offsetTop=n.height()-a[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=n.width()-a[0]):"rb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=n.width()-a[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?n.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?n.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=n.scrollTop(),e.offsetLeft+=n.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=n.height()-(i.find(l[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},s.pt.tips=function(){var e=this,t=e.config,a=e.layero,o=[a.outerWidth(),a.outerHeight()],r=i(t.follow);r[0]||(r=i("body"));var s={width:r.outerWidth(),height:r.outerHeight(),top:r.offset().top,left:r.offset().left},f=a.find(".layui-layer-TipsG"),c=t.tips[0];t.tips[1]||f.remove(),s.autoLeft=function(){s.left+o[0]-n.width()>0?(s.tipLeft=s.left+s.width-o[0],f.css({right:12,left:"auto"})):s.tipLeft=s.left},s.where=[function(){s.autoLeft(),s.tipTop=s.top-o[1]-10,f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left+s.width+10,s.tipTop=s.top,f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",t.tips[1])},function(){s.autoLeft(),s.tipTop=s.top+s.height+10,f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left-o[0]-10,s.tipTop=s.top,f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",t.tips[1])}],s.where[c-1](),1===c?s.top-(n.scrollTop()+o[1]+16)<0&&s.where[2]():2===c?n.width()-(s.left+s.width+o[0]+16)>0||s.where[3]():3===c?s.top-n.scrollTop()+s.height+o[1]+16-n.height()>0&&s.where[0]():4===c&&o[0]+16-s.left>0&&s.where[1](),a.find("."+l[5]).css({"background-color":t.tips[1],"padding-right":t.closeBtn?"30px":""}),a.css({left:s.tipLeft-(t.fixed?n.scrollLeft():0),top:s.tipTop-(t.fixed?n.scrollTop():0)})},s.pt.move=function(){var e=this,t=e.config,a=i(document),s=e.layero,l=s.find(t.move),f=s.find(".layui-layer-resize"),c={};return t.move&&l.css("cursor","move"),l.on("mousedown",function(e){e.preventDefault(),t.move&&(c.moveStart=!0,c.offset=[e.clientX-parseFloat(s.css("left")),e.clientY-parseFloat(s.css("top"))],o.moveElem.css("cursor","move").show())}),f.on("mousedown",function(e){e.preventDefault(),c.resizeStart=!0,c.offset=[e.clientX,e.clientY],c.area=[s.outerWidth(),s.outerHeight()],o.moveElem.css("cursor","se-resize").show()}),a.on("mousemove",function(i){if(c.moveStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1],l="fixed"===s.css("position");if(i.preventDefault(),c.stX=l?0:n.scrollLeft(),c.stY=l?0:n.scrollTop(),!t.moveOut){var f=n.width()-s.outerWidth()+c.stX,u=n.height()-s.outerHeight()+c.stY;a<c.stX&&(a=c.stX),a>f&&(a=f),o<c.stY&&(o=c.stY),o>u&&(o=u)}s.css({left:a,top:o})}if(t.resize&&c.resizeStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1];i.preventDefault(),r.style(e.index,{width:c.area[0]+a,height:c.area[1]+o}),c.isResize=!0,t.resizing&&t.resizing(s)}}).on("mouseup",function(e){c.moveStart&&(delete c.moveStart,o.moveElem.hide(),t.moveEnd&&t.moveEnd(s)),c.resizeStart&&(delete c.resizeStart,o.moveElem.hide())}),e},s.pt.callback=function(){function e(){var e=a.cancel&&a.cancel(t.index,n);e===!1||r.close(t.index)}var t=this,n=t.layero,a=t.config;t.openLayer(),a.success&&(2==a.type?n.find("iframe").on("load",function(){a.success(n,t.index)}):a.success(n,t.index)),6==r.ie&&t.IE6(n),n.find("."+l[6]).children("a").on("click",function(){var e=i(this).index();if(0===e)a.yes?a.yes(t.index,n):a.btn1?a.btn1(t.index,n):r.close(t.index);else{var o=a["btn"+(e+1)]&&a["btn"+(e+1)](t.index,n);o===!1||r.close(t.index)}}),n.find("."+l[7]).on("click",e),a.shadeClose&&i("#layui-layer-shade"+t.index).on("click",function(){r.close(t.index)}),n.find(".layui-layer-min").on("click",function(){var e=a.min&&a.min(n);e===!1||r.min(t.index,a)}),n.find(".layui-layer-max").on("click",function(){i(this).hasClass("layui-layer-maxmin")?(r.restore(t.index),a.restore&&a.restore(n)):(r.full(t.index,a),setTimeout(function(){a.full&&a.full(n)},100))}),a.end&&(o.end[t.index]=a.end)},o.reselect=function(){i.each(i("select"),function(e,t){var n=i(this);n.parents("."+l[0])[0]||1==n.attr("layer")&&i("."+l[0]).length<1&&n.removeAttr("layer").show(),n=null})},s.pt.IE6=function(e){i("select").each(function(e,t){var n=i(this);n.parents("."+l[0])[0]||"none"===n.css("display")||n.attr({layer:"1"}).hide(),n=null})},s.pt.openLayer=function(){var e=this;r.zIndex=e.config.zIndex,r.setTop=function(e){var t=function(){r.zIndex++,e.css("z-index",r.zIndex+1)};return r.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",t),r.zIndex}},o.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},o.rescollbar=function(e){l.html.attr("layer-full")==e&&(l.html[0].style.removeProperty?l.html[0].style.removeProperty("overflow"):l.html[0].style.removeAttribute("overflow"),l.html.removeAttr("layer-full"))},e.layer=r,r.getChildFrame=function(e,t){return t=t||i("."+l[4]).attr("times"),i("#"+l[0]+t).find("iframe").contents().find(e)},r.getFrameIndex=function(e){return i("#"+e).parents("."+l[4]).attr("times")},r.iframeAuto=function(e){if(e){var t=r.getChildFrame("html",e).outerHeight(),n=i("#"+l[0]+e),a=n.find(l[1]).outerHeight()||0,o=n.find("."+l[6]).outerHeight()||0;n.css({height:t+a+o}),n.find("iframe").css({height:t})}},r.iframeSrc=function(e,t){i("#"+l[0]+e).find("iframe").attr("src",t)},r.style=function(e,t,n){var a=i("#"+l[0]+e),r=a.find(".layui-layer-content"),s=a.attr("type"),f=a.find(l[1]).outerHeight()||0,c=a.find("."+l[6]).outerHeight()||0;a.attr("minLeft");s!==o.type[3]&&s!==o.type[4]&&(n||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-f-c<=64&&(t.height=64+f+c)),a.css(t),c=a.find("."+l[6]).outerHeight(),s===o.type[2]?a.find("iframe").css({height:parseFloat(t.height)-f-c}):r.css({height:parseFloat(t.height)-f-c-parseFloat(r.css("padding-top"))-parseFloat(r.css("padding-bottom"))}))},r.min=function(e,t){var a=i("#"+l[0]+e),s=a.find(l[1]).outerHeight()||0,f=a.attr("minLeft")||181*o.minIndex+"px",c=a.css("position");o.record(a),o.minLeft[0]&&(f=o.minLeft[0],o.minLeft.shift()),a.attr("position",c),r.style(e,{width:180,height:s,left:f,top:n.height()-s,position:"fixed",overflow:"hidden"},!0),a.find(".layui-layer-min").hide(),"page"===a.attr("type")&&a.find(l[4]).hide(),o.rescollbar(e),a.attr("minLeft")||o.minIndex++,a.attr("minLeft",f)},r.restore=function(e){var t=i("#"+l[0]+e),n=t.attr("area").split(",");t.attr("type");r.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(l[4]).show(),o.rescollbar(e)},r.full=function(e){var t,a=i("#"+l[0]+e);o.record(a),l.html.attr("layer-full")||l.html.css("overflow","hidden").attr("layer-full",e),clearTimeout(t),t=setTimeout(function(){var t="fixed"===a.css("position");r.style(e,{top:t?0:n.scrollTop(),left:t?0:n.scrollLeft(),width:n.width(),height:n.height()},!0),a.find(".layui-layer-min").hide()},100)},r.title=function(e,t){var n=i("#"+l[0]+(t||r.index)).find(l[1]);n.html(e)},r.close=function(e){var t=i("#"+l[0]+e),n=t.attr("type"),a="layer-anim-close";if(t[0]){var s="layui-layer-wrap",f=function(){if(n===o.type[1]&&"object"===t.attr("conType")){t.children(":not(."+l[5]+")").remove();for(var a=t.find("."+s),r=0;r<2;r++)a.unwrap();a.css("display",a.data("display")).removeClass(s)}else{if(n===o.type[2])try{var f=i("#"+l[4]+e)[0];f.contentWindow.document.write(""),f.contentWindow.close(),t.find("."+l[5])[0].removeChild(f)}catch(c){}t[0].innerHTML="",t.remove()}"function"==typeof o.end[e]&&o.end[e](),delete o.end[e]};t.data("isOutAnim")&&t.addClass(a),i("#layui-layer-moves, #layui-layer-shade"+e).remove(),6==r.ie&&o.reselect(),o.rescollbar(e),t.attr("minLeft")&&(o.minIndex--,o.minLeft.push(t.attr("minLeft"))),r.ie&&r.ie<10||!t.data("isOutAnim")?f():setTimeout(function(){f()},200)}},r.closeAll=function(e){i.each(i("."+l[0]),function(){var t=i(this),n=e?t.attr("type")===e:1;n&&r.close(t.attr("times")),n=null})};var f=r.cache||{},c=function(e){return f.skin?" "+f.skin+" "+f.skin+"-"+e:""};r.prompt=function(e,t){var a="";if(e=e||{},"function"==typeof e&&(t=e),e.area){var o=e.area;a='style="width: '+o[0]+"; height: "+o[1]+';"',delete e.area}var s,l=2==e.formType?'<textarea class="layui-layer-input"'+a+">"+(e.value||"")+"</textarea>":function(){return'<input type="'+(1==e.formType?"password":"text")+'" class="layui-layer-input" value="'+(e.value||"")+'">'}(),f=e.success;return delete e.success,r.open(i.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:l,skin:"layui-layer-prompt"+c("prompt"),maxWidth:n.width(),success:function(e){s=e.find(".layui-layer-input"),s.focus(),"function"==typeof f&&f(e)},resize:!1,yes:function(i){var n=s.val();""===n?s.focus():n.length>(e.maxlength||500)?r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(e.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",s,{tips:1}):t&&t(n,i,s)}},e))},r.tab=function(e){e=e||{};var t=e.tab||{},n=e.success;return delete e.success,r.open(i.extend({type:1,skin:"layui-layer-tab"+c("tab"),resize:!1,title:function(){var e=t.length,i=1,n="";if(e>0)for(n='<span class="layui-layer-tabnow">'+t[0].title+"</span>";i<e;i++)n+="<span>"+t[i].title+"</span>";return n}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=t.length,i=1,n="";if(e>0)for(n='<li class="layui-layer-tabli xubox_tab_layer">'+(t[0].content||"no content")+"</li>";i<e;i++)n+='<li class="layui-layer-tabli">'+(t[i].content||"no  content")+"</li>";return n}()+"</ul>",success:function(t){var a=t.find(".layui-layer-title").children(),o=t.find(".layui-layer-tabmain").children();a.on("mousedown",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0;var n=i(this),a=n.index();n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"),o.eq(a).show().siblings().hide(),"function"==typeof e.change&&e.change(a)}),"function"==typeof n&&n(t)}},e))},r.photos=function(t,n,a){function o(e,t,i){var n=new Image;return n.src=e,n.complete?t(n):(n.onload=function(){n.onload=null,t(n)},void(n.onerror=function(e){n.onerror=null,i(e)}))}var s={};if(t=t||{},t.photos){var l=t.photos.constructor===Object,f=l?t.photos:{},u=f.data||[],d=f.start||0;s.imgIndex=(0|d)+1,t.img=t.img||"img";var y=t.success;if(delete t.success,l){if(0===u.length)return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var p=i(t.photos),h=function(){u=[],p.find(t.img).each(function(e){var t=i(this);t.attr("layer-index",e),u.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(h(),0===u.length)return;if(n||p.on("click",t.img,function(){var e=i(this),n=e.attr("layer-index");r.photos(i.extend(t,{photos:{start:n,data:u,tab:t.tab},full:t.full}),!0),h()}),!n)return}s.imgprev=function(e){s.imgIndex--,s.imgIndex<1&&(s.imgIndex=u.length),s.tabimg(e)},s.imgnext=function(e,t){s.imgIndex++,s.imgIndex>u.length&&(s.imgIndex=1,t)||s.tabimg(e)},s.keyup=function(e){if(!s.end){var t=e.keyCode;e.preventDefault(),37===t?s.imgprev(!0):39===t?s.imgnext(!0):27===t&&r.close(s.index)}},s.tabimg=function(e){if(!(u.length<=1))return f.start=s.imgIndex-1,r.close(s.index),r.photos(t,!0,e)},s.event=function(){s.bigimg.hover(function(){s.imgsee.show()},function(){s.imgsee.hide()}),s.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),s.imgprev()}),s.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),s.imgnext()}),i(document).on("keyup",s.keyup)},s.loadi=r.load(1,{shade:!("shade"in t)&&.9,scrollbar:!1}),o(u[d].src,function(n){r.close(s.loadi),s.index=r.open(i.extend({type:1,id:"layui-layer-photos",area:function(){var a=[n.width,n.height],o=[i(e).width()-100,i(e).height()-100];if(!t.full&&(a[0]>o[0]||a[1]>o[1])){var r=[a[0]/o[0],a[1]/o[1]];r[0]>r[1]?(a[0]=a[0]/r[0],a[1]=a[1]/r[0]):r[0]<r[1]&&(a[0]=a[0]/r[1],a[1]=a[1]/r[1])}return[a[0]+"px",a[1]+"px"]}(),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,isOutAnim:!1,skin:"layui-layer-photos"+c("photos"),content:'<div class="layui-layer-phimg"><img src="'+u[d].src+'" alt="'+(u[d].alt||"")+'" layer-pid="'+u[d].pid+'"><div class="layui-layer-imgsee">'+(u.length>1?'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>':"")+'<div class="layui-layer-imgbar" style="display:'+(a?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(u[d].alt||"")+"</a><em>"+s.imgIndex+"/"+u.length+"</em></span></div></div></div>",success:function(e,i){s.bigimg=e.find(".layui-layer-phimg"),s.imgsee=e.find(".layui-layer-imguide,.layui-layer-imgbar"),s.event(e),t.tab&&t.tab(u[d],e),"function"==typeof y&&y(e)},end:function(){s.end=!0,i(document).off("keyup",s.keyup)}},t))},function(){r.close(s.loadi),r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){u.length>1&&s.imgnext(!0,!0)}})})}},o.run=function(t){i=t,n=i(e),l.html=i("html"),r.open=function(e){var t=new s(e);return t.index}},e.layui&&layui.define?(r.ready(),layui.define("jquery",function(t){r.path=layui.cache.dir,o.run(layui.jquery),e.layer=r,t("layer",r)})):"function"==typeof define&&define.amd?define(["jquery"],function(){return o.run(e.jQuery),r}):function(){o.run(e.jQuery),r.ready()}()}(window);
},{}],4:[function(require,module,exports){
var cookie = require('./cookie')

require('./../layer/layer');
/**
 * 车款选择，先写死dom，后期如需复用再改进
 */

var carSelecter = function(opt){

    var selectArr = []

    init()

    function init(){    
        bindEvents()
        $('.car-type-scroll-list').html('<dl></dl>')
        $('.car-style-scroll-list').html('<dl></dl>')
    }

    function bindEvents(){  
        $(document).on('click',function(){  
            $('.brand_scroll_area,.js_car_type,.js_car_style').hide()
            $('.choice_brand').show()
        })
        $('.search_input').on('click',function(event){
            event.stopPropagation()
        })
        $('.js_brand').on('click',showCarBrand)
        $('.choice_brand').on('click','.brand-list-a li',showCarType)
        $('.js_car_type').on('click','dd',showCarStyle)
        $('.js_car_style').on('click','dd',onSelect)
        $('.js_b_tit').on('click',function(event){  
            fixPosition('brand')
        })
        $('.car_style_scroll_area .choice_route span:eq(0)').on('click',function(event){  
            fixPosition('brand')
        })
        $('.car_style_scroll_area .choice_route span:eq(1)').on('click',function(event){  
            fixPosition('type')
        })
        $('.brand-letter-index span').on('click',function(){ 
            var letter = $(this).text()
            var parent
            $('.brand-list-a li').each(function(i,el){  
                var text = $.trim($(el).text()).substr(0,1)
                if(text == letter && !parent){
                    parent = $(el).closest('.brand-list-a')
                }
            })
            var top = parent.position().top + $('.brand-scroll-list').scrollTop() - 8
            $('.brand-scroll-list').scrollTop(top)
        })
    }

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

    function fixPosition(type){ 
        var height = $('.search_input').offset().top-$(window).scrollTop() - 50
        $('.choice_brand').hide()
        $('.js_car_style').hide()
        $('.js_car_type').hide()

        if(type == 'brand'){
            $('.choice_brand').show()
            $('.brand_scroll_area').show()
            $('.brand-scroll-list,.brand-scroll-list-box').css('height',height)
            $('.brand-scroll-list ul li').css({ 
                width: 182
            })
            $('.brand-letter-index').css({
                height: height,
                width: 40,
                'overflow-y': 'auto'
            }) 
        }else if(type == 'type'){
            $('.js_car_type').show()
            $('.brand_scroll_area').hide()
            $('.car-type-scroll-list').css('height',height)
        }else if(type == 'style'){
            $('.js_car_style').show()
            $('.car-style-scroll-list').css('height',height)
        }
    }

    function showCarBrand(){
        fixPosition('brand')
    }

    function showCarType(event){ 
        var el = $(event.currentTarget)
        var id = el.attr('id')
        if(id){
            var name = el.find('span').text()
            var html = ''
            $('.js_b_tit').html(name)
            selectArr[0] = name
            fixPosition('type')
            $.ajax({    
                url: 'http://car.qichedaquan.com/carSerialSummary/getCarSerialNames?brandid=' + id,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data){
                    for(var i=0;i<data.length;i++){ 
                        html += '<dd id="'+ data[i].id +'">'+ data[i].name +'</dd>'
                    }
                    if(data.length === 0){  
                        html += '<dd>暂无</dd>'
                    }
                    $('.choice_car_type dl').html(html)
                }
            })
        }
    }

    function showCarStyle(event){  
        var el = $(event.currentTarget)
        var id = el.attr('id')
        if(id){
            var name = el.text()
            var html = '' 
            $('.car_style_scroll_area .choice_route span:eq(0)').html(selectArr[0])
            $('.car_style_scroll_area .choice_route span:eq(1)').html(name)
            selectArr[1] = name
            fixPosition('style')
            $.ajax({    
                url: 'http://car.qichedaquan.com/carSerialSummary/getCarParamNames?serialid=' + id,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data){    
                    var years = {}
                    var sale_state = '';
                    for(var i=0;i<data.length;i++){ 
                        var item = data[i]
                        if(!years[item.caryear]){
                            years[item.caryear] = true
                            html += '<dt>'+ item.caryear +'款</dt>'
                        }
                        if(item.salestate=="停售"){
                            sale_state = "停售"
                        }else if(item.salestate=="未上市"){
                            sale_state = "未上市"
                        }else{
                            if(item.dealerminprice>0){
                                sale_state = item.dealerminprice+'万起';
                            }else{
                                sale_state = "暂无报价"
                            }
                        }
                        html += '<dd id="'+ item.id +'" year="'+ item.caryear +'款"><span title="'+ item.name +'">'+ item.name +'</span><i>'+ sale_state +'</i></dd>'
                    }
                    if(data.length === 0){  
                        html += '<dd>暂无</dd>'
                    }
                    $('.choice_car_style dl').html(html)
                }
            })
        }
    }

}

var callbacks = {}; //最简单的事件监听
var emit = function (name, da) {
    var call = callbacks[name];
    if (call) {
        var i = 0, l = call.length;
        for (; i < l; i++) {
            call[i](da);
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
        var link = ''
        for(var i=0;i<cache.length;i++){    
            html += '<li><a>'+ cache[i].text +'</a><i class="delete_icon"></i></li>'
            link += ',' + cache[i].id
        }
        $('.js_search_his').html(html)
        $('.js_constract i').html(cache.length)
        //判断对比按钮状态
        if(cache.length){   
            $('.dis_click').hide()
            $('.sure_click').css('display','block').attr('href','/carparam/muti/'+link.substr(1))
        }else{  
            $('.dis_click').show()
            $('.sure_click').hide()
        }
        setBtnState()
    }

    //修改页面对比按钮状态
    function setBtnState(){  
        $('a.contrast_btn').show();
        $('a.contrast_btn').siblings('span').hide();

        for(var i=0;i<cache.length;i++){
            var el = $('#'+cache[i].id);
            if(!el.hasClass('contrast_btn')){   
                el = el.parents('.contrast_btn')
            }
            //$('#'+cache[i].id).parents('.contrast_btn').hide();
            //$('#'+cache[i].id).parents('.contrast_btn').siblings('span').show();
            el.hide()
            el.siblings('span').show();
        }
    }

    function init(){    
        carSelecter({
            onSelect: addCar
        })
        bindEvents()
        renderList()
    }

    function bindEvents(){ 
        $('.type_constract')
            .on('click','.delete_icon',removeCar)
            .on('click','.clear_all',removeAllCars)
            .on('click','.js_hide',function(event){event.stopPropagation();$('.js_con_list').hide()})
            .on('click','.js_constract',function(event){event.stopPropagation();$('.js_con_list').toggle()})
        //点击页面车型对比弹出框消失
        $(document).on('click',function(){  
            $('.js_con_list').hide();
        })
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
        if(cache.length === 10){
            error && error()    
            layer.msg('最多选择10个车款。');
        }else{  
            if(!hasCar(car.id)){
                success && success(car)
                cache.push(car)
                $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
                renderList()
            }else{  
                error && error()
                layer.msg('已添加到对比。');
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
            var index = $('.js_search_his li').index(li)
            cache.splice(index,1)
            $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
            renderList();

            emit('remove');
        }
    }
    //清空
    function removeAllCars(event){ 
        event.stopPropagation()
        cache = []
        $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
        renderList()
    }

    return {    
        init: init,
        addCar: addCar,
        hasCar: hasCar,
        getData: function(){ 
            return cache
        },
        setBtnState: setBtnState,
        on: function (name, fn) {
            if (callbacks[name]) {
                callbacks[name].push(fn);
            } else {
                callbacks[name] = [fn];
            }
        }
    }

})();

$(function(){
    if($('.type_constract')[0]){
        carCompareLayer.init()
    }
    $('#position_fixed').css('z-index',999)
})


module.exports = carCompareLayer
},{"./../layer/layer":3,"./cookie":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = "<div><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:{{ out+= it.widthB; }}px;\" class=\"configParainfo\"><tbody> {{ if(it.isShow(\'Car_RepairPolicy\')) { }}<tr class=\"op0\"><th></th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td></td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'基本信息\')) { }}<tr class=\"title_box\" class=\"first_tr Js_first_tr\" elenodenum=\"4\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor1\"><h2 class=\"title\"> 基本信息</h2></th></tr> {{ } }} {{ if(it.isShow(\'Car_RepairPolicy\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Car_RepairPolicy\'); }}\"><th>保修政策</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Car_RepairPolicy\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'new_energy_subsidies\')) { }}<tr class=\"h36 {{out+= it.isSome(\'new_energy_subsidies\'); }}\"><th>新能源汽车国家补贴(万元)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'new_energy_subsidies\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_ExhaustForFloat\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_ExhaustForFloat\'); }}\"><th>排量 （升）(L)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Engine_ExhaustForFloat\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_TransmissionType\') || it.isShow(\'UnderPan_ForwardGearNum\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_TransmissionType\'); }}\"><th>变速箱</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ out += it.createValue(i, \'UnderPan_TransmissionType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_ShiQuYouHao\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_ShiQuYouHao\'); }}\"><th>市区工况油耗(L/100km)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_ShiQuYouHao\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_ShiJiaoYouHao\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_ShiJiaoYouHao\'); }}\"><th>市郊工况油耗(L/100km)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_ShiJiaoYouHao\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_ZongHeYouHao\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_ZongHeYouHao\'); }}\"><th>综合工况油耗(L/100km)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_ZongHeYouHao\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_ZongHeYouHao\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_ZongHeYouHao\'); }}\"><th>汽车大全实测油耗(L/100km)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_ZongHeYouHao\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_AccelerateTime\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_AccelerateTime\'); }}\"><th>官方0-100公里加速时间(s)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_AccelerateTime\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_AccelerateTime\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_AccelerateTime\'); }}\"><th>汽车大全实测0-100公里加速时间</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_AccelerateTime\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_MaxSpeed\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_MaxSpeed\'); }}\"><th>最高车速(km/h)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_MaxSpeed\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_SeatNum\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_SeatNum\'); }}\"><th>乘员人数（含司机）(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'Perf_SeatNum\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'车体\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor2\" style=\"width:{{out+= it.widthB;}}px;\"><h2 class=\"title\"> 车体</h2></th></tr> {{ } }} {{ if(it.isShow(\'CarColorList\')) { }}<tr class=\"h73 {{out+= it.isSome(\'CarColorList\'); }}\"><th>车身颜色</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ var color = it.selects[i].param[\'CarColorList\']; for (var x = 0; x<color.length; x ++) { }} <span style=\"background-color: {{ out += color[x].rgb; }} ;\" title=\" {{ out += color[x].colorName; }} \"></span> {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_Length\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_Length\'); }}\"><th>车长(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{out += it.createValue(i, \'OutSet_Length\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_Width\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_Width\'); }}\"><th>车宽(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'OutSet_Width\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_Height\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_Height\'); }}\"><th>车高(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'OutSet_Height\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_WheelBase\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_WheelBase\'); }}\"><th>轴距(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'OutSet_WheelBase\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_FrontTread\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_FrontTread\'); }}\"><th>前轮距(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'OutSet_FrontTread\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_BackTread\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_BackTread\'); }}\"><th>后轮距(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.createValue(i, \'OutSet_BackTread\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_Weight\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_Weight\'); }}\"><th>整备质量(kg)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Perf_Weight\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_TotalWeight\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_TotalWeight\'); }}\"><th>满载质量(kg)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Perf_TotalWeight\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_MinGapFromEarth\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_MinGapFromEarth\'); }}\"><th>最小离地间隙(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutSet_MinGapFromEarth\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_MaxPaddleDepth\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_MaxPaddleDepth\'); }}\"><th>最大涉水深度(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Perf_MaxPaddleDepth\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_NearCorner\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_NearCorner\'); }}\"><th>接近角(°)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutSet_NearCorner\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_Throughtheangle\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_Throughtheangle\'); }}\"><th>通过角(°)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Perf_Throughtheangle\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_AwayCorner\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_AwayCorner\'); }}\"><th>离去角(°)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutSet_AwayCorner\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Inset_TrunkCapacity\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Inset_TrunkCapacity\'); }}\"><th>行李厢容积(L)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Inset_TrunkCapacity\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Inset_TrunkCapacityE\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Inset_TrunkCapacityE\'); }}\"><th>行李厢最大拓展容积(L)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Inset_TrunkCapacityE\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_TrunkType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_TrunkType\'); }}\"><th>行李厢盖开合方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_TrunkType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Inset_BackUpOpenType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Inset_BackUpOpenType\'); }}\"><th>行李厢打开方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Inset_BackUpOpenType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Induction_trunk\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Induction_trunk\'); }}\"><th>感应行李厢</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Induction_trunk\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Body_Doors\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_Doors\'); }}\"><th>车门数(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_Doors\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Body_TipType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_TipType\'); }}\"><th>车顶型式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_TipType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Body_sailType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_sailType\'); }}\"><th>车篷型式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_sailType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Body_CalashOCType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_CalashOCType\'); }}\"><th>车篷开合方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_CalashOCType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_TopSnelf\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_TopSnelf\'); }}\"><th>车顶行李箱架</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_TopSnelf\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_SportsAppearanceKit\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_SportsAppearanceKit\'); }}\"><th>运动外观套件</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_SportsAppearanceKit\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Cargo_compartment_form\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Cargo_compartment_form\'); }}\"><th>货厢形式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Cargo_compartment_form\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Cargo_length_min\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Cargo_length_min\'); }}\"><th>货厢长度(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Cargo_length_min\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'cargo_width_min\')) { }}<tr class=\"h36 {{out+= it.isSome(\'cargo_width_min\'); }}\"><th>货厢宽度(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'cargo_width_min\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Cargo_height_min\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Cargo_height_min\'); }}\"><th>货厢高度(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Cargo_height_min\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'truck_form\')) { }}<tr class=\"h36 {{out+= it.isSome(\'truck_form\'); }}\"><th>车厢形式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'truck_form\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Seating_arrangement\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Seating_arrangement\'); }}\"><th>座位排列</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Seating_arrangement\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'nominal_load_capacity\')) { }}<tr class=\"h36 {{out+= it.isSome(\'nominal_load_capacity\'); }}\"><th>额定载重量(T)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'nominal_load_capacity\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'maximum_gross_mass\')) { }}<tr class=\"h36 {{out+= it.isSome(\'maximum_gross_mass\'); }}\"><th>最大总质量(T)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'maximum_gross_mass\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'发动机\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor3\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 发动机</h2></th></tr> {{ } }} {{ if(it.isShow(\'Engine_Location\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_Location\'); }}\"><th>发动机位置</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_Location\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_Type\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_Type\'); }}\"><th>发动机型号</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_Type\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_ExhaustForFloat\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_ExhaustForFloat\'); }}\"><th>排量（升）(L)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_ExhaustForFloat\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_Exhaust\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_Exhaust\'); }}\"><th>排量（毫升）(mL)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_Exhaust\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_InhaleType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_InhaleType\'); }}\"><th>进气形式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_InhaleType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderRank\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_CylinderRank\'); }}\"><th>气缸排列型式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_CylinderRank\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderNum\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_CylinderNum\'); }}\"><th>气缸数(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_CylinderNum\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_ValvePerCylinder\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_ValvePerCylinder\'); }}\"><th>每缸气门数(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_ValvePerCylinder\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_Camshaft\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_Camshaft\'); }}\"><th>气门结构</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_Camshaft\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_CompressRat\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_CompressRat\'); }}\"><th>压缩比(:1)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_CompressRat\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderDM\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_CylinderDM\'); }}\"><th>缸径(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_CylinderDM\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_Route\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_Route\'); }}\"><th>行程(mm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_Route\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_horsepower\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_horsepower\'); }}\"><th>最大马力(Ps)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_horsepower\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_MaxPower\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_MaxPower\'); }}\"><th>最大功率(kW)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_MaxPower\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_PowerSpeed\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_PowerSpeed\'); }}\"><th>最大功率转速(rpm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_PowerSpeed\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_MaxNJ\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_MaxNJ\'); }}\"><th>最大扭矩(N·m)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_MaxNJ\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_NJSpeed\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_NJSpeed\'); }}\"><th>最大扭矩转速(rpm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_NJSpeed\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_SpTech\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_SpTech\'); }}\"><th>特有技术</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_SpTech\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Oil_FuelType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Oil_FuelType\'); }}\"><th>燃料类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Oil_FuelType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'new_energy_type\')) { }}<tr class=\"h36 {{out+= it.isSome(\'new_energy_type\'); }}\"><th>新能源类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'new_energy_type\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Oil_FuelTab\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Oil_FuelTab\'); }}\"><th>燃油标号</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Oil_FuelTab\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Oil_SupplyType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Oil_SupplyType\'); }}\"><th>供油方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Oil_SupplyType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Oil_FuelCapacity\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Oil_FuelCapacity\'); }}\"><th>燃油箱容积(L)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Oil_FuelCapacity\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderTMaterial\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_CylinderTMaterial\'); }}\"><th>缸盖材料</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_CylinderTMaterial\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderMaterial\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_CylinderMaterial\'); }}\"><th>缸体材料</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_CylinderMaterial\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Engine_EnvirStandard\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Engine_EnvirStandard\'); }}\"><th>环保标准</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Engine_EnvirStandard\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_Startandstopsystem\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_Startandstopsystem\'); }}\"><th>启停系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_Startandstopsystem\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'tank_material\')) { }}<tr class=\"h36 {{out+= it.isSome(\'tank_material\'); }}\"><th>油箱材质</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'tank_material\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'电池/电动机\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor4\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 电池/电动机</h2></th></tr> {{ } }} {{ if(it.isShow(\'Electric_Peakpower\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Peakpower\'); }}\"><th>电机最大功率(kW)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Peakpower\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Maximumpowerspeed\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Maximumpowerspeed\'); }}\"><th>电机最大功率-转速(kW/rpm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Maximumpowerspeed\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_maximumtorque\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_maximumtorque\'); }}\"><th>电机最大扭矩(N·m)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_maximumtorque\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Maximummotortorquespeed\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Maximummotortorquespeed\'); }}\"><th>电机最大扭矩-转速(N·m/rpm)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Maximummotortorquespeed\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_RatedPower\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_RatedPower\'); }}\"><th>电机额定功率(kW)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_RatedPower\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_systemvoltage\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_systemvoltage\'); }}\"><th>系统电压(V)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_systemvoltage\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Motortype\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Motortype\'); }}\"><th>电机类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Motortype\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_number\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_number\'); }}\"><th>发电机数量(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_number\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_position\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_position\'); }}\"><th>发电机位置</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_position\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'chongdianfangshi\')) { }}<tr class=\"h36 {{out+= it.isSome(\'chongdianfangshi\'); }}\"><th>充电方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'chongdianfangshi\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Normalchargingtime\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Normalchargingtime\'); }}\"><th>普通充电时间(min)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Normalchargingtime\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Fast-chargetime\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Fast-chargetime\'); }}\"><th>快速充电时间(min)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Fast-chargetime\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Batteryvoltage\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Batteryvoltage\'); }}\"><th>电池电压(V)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Batteryvoltage\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Batterycapacity\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Batterycapacity\'); }}\"><th>电池容量(kWh)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Batterycapacity\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_BatteryType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_BatteryType\'); }}\"><th>电池类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_BatteryType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_Powerconsumption\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_Powerconsumption\'); }}\"><th>百公里耗电量(kWh)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_Powerconsumption\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Electric_mustMileageconstant\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Electric_mustMileageconstant\'); }}\"><th>纯电最高续航里程(km)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Electric_mustMileageconstant\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'变速箱\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor5\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 变速箱</h2></th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_TransmissionType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_TransmissionType\') ;}}\"><th>变速箱</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ out+= it.createValue(i, \'UnderPan_TransmissionType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SteerEtc\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SteerEtc\'); }}\"><th>换挡拨片</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_SteerEtc\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Transmission_type\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Transmission_type\'); }}\"><th>变速箱型号</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Transmission_type\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'forward_gears_number\')) { }}<tr class=\"h36 {{out+= it.isSome(\'forward_gears_number\'); }}\"><th>前进挡数(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'forward_gears_number\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'backward_gears_number\')) { }}<tr class=\"h36 {{out+= it.isSome(\'backward_gears_number\'); }}\"><th>倒挡数(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'backward_gears_number\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'底盘制动\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor6\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 底盘制动</h2></th></tr> {{ } }} {{ if(it.isShow(\'Body_Struc\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_Struc\'); }}\"><th>底盘结构</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_Struc\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutSet_MinWheelRadius\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutSet_MinWheelRadius\'); }}\"><th>最小转弯半径(m)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutSet_MinWheelRadius\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_DriveAsistTurn\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_DriveAsistTurn\'); }}\"><th>转向助力</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_DriveAsistTurn\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_FrontBrakeType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_FrontBrakeType\'); }}\"><th>前制动类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_FrontBrakeType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_RearBrakeType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_RearBrakeType\'); }}\"><th>后制动类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_RearBrakeType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_ParkingBrake\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_ParkingBrake\'); }}\"><th>驻车制动类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_ParkingBrake\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Perf_DriveType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Perf_DriveType\'); }}\"><th>驱动方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Perf_DriveType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_Airmatic\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_Airmatic\'); }}\"><th>空气悬挂</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_Airmatic\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_SuspensionHeightControl\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_SuspensionHeightControl\'); }}\"><th>可调悬挂</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_SuspensionHeightControl\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_FrontSuspensionType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_FrontSuspensionType\'); }}\"><th>前悬挂类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_FrontSuspensionType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_RearSuspensionType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_RearSuspensionType\'); }}\"><th>后悬挂类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_RearSuspensionType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_CentralDiffLock\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_CentralDiffLock\'); }}\"><th>中央差速器锁</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_CentralDiffLock\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Front_axle_description\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Front_axle_description\'); }}\"><th>前桥（轴）描述</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Front_axle_description\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Back_axle_description\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Back_axle_description\'); }}\"><th>后桥描述</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Back_axle_description\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'spring_quantity\')) { }}<tr class=\"h36 {{out+= it.isSome(\'spring_quantity\'); }}\"><th>弹簧片数(片)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'spring_quantity\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'安全配置\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor7\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 安全配置</h2></th></tr> {{ } }} {{ if(it.isShow(\'Safe_DriverGasBag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_DriverGasBag\'); }}\"><th class=\"\">驾驶位安全气囊</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_DriverGasBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_DriverGasBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_DriverGasBag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_SubDriverGasBag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_SubDriverGasBag\'); }}\"><th class=\"\">副驾驶位安全气囊</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_SubDriverGasBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_SubDriverGasBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_SubDriverGasBag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_FsadGasbag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_FsadGasbag\'); }}\"><th class=\"\">前排侧安全气囊</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_FsadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_FsadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_FsadGasbag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_FheadGasbag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_FheadGasbag\'); }}\"><th class=\"\">前排头部气囊（气帘）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_FheadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_FheadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_FheadGasbag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_KneeGasBag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_KneeGasBag\'); }}\"><th class=\"\">膝部气囊</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_KneeGasBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_KneeGasBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_KneeGasBag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_BsadGasbag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BsadGasbag\'); }}\"><th class=\"\">后排侧安全气囊</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BsadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BsadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BsadGasbag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_BheadGasbag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BheadGasbag\'); }}\"><th class=\"\">后排头部气囊（气帘）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BheadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BheadGasbag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BheadGasbag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BeltBag\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BeltBag\'); }}\"><th class=\"\">安全带气囊</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'InStat_BeltBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'InStat_BeltBag\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'InStat_BeltBag\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_BeltReminder\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BeltReminder\'); }}\"><th class=\"\">安全带未系提示</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BeltReminder\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BeltReminder\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BeltReminder\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_lifeBeltlimit\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_lifeBeltlimit\'); }}\"><th class=\"\">安全带限力功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'UnderPan_lifeBeltlimit\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'UnderPan_lifeBeltlimit\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'UnderPan_lifeBeltlimit\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_BeltPreTighten\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BeltPreTighten\'); }}\"><th class=\"\">安全带预收紧功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BeltPreTighten\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BeltPreTighten\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BeltPreTighten\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'00Safe_BeltPosTune0\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BeltPosTune\'); }}\"><th class=\"\">前安全带调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BeltPosTune\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BeltPosTune\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BeltPosTune\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_BackBelt\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BackBelt\'); }}\"><th class=\"\">后排安全带</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BackBelt\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BackBelt\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BackBelt\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_BackthreespotBelt\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_BackthreespotBelt\'); }}\"><th class=\"\">后排中间三点式安全带</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_BackthreespotBelt\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_BackthreespotBelt\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_BackthreespotBelt\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_TyrePressureWatcher\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_TyrePressureWatcher\'); }}\"><th class=\"\">胎压监测装置</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'UnderPan_TyrePressureWatcher\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'UnderPan_TyrePressureWatcher\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'UnderPan_TyrePressureWatcher\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_ZeroPressureDrive\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_ZeroPressureDrive\'); }}\"><th class=\"\">零压续行（零胎压继续行驶）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'UnderPan_ZeroPressureDrive\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'UnderPan_ZeroPressureDrive\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'UnderPan_ZeroPressureDrive\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_CenterControlLock\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_CenterControlLock\'); }}\"><th class=\"\">中控门锁</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'InStat_CenterControlLock\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'InStat_CenterControlLock\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'InStat_CenterControlLock\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ChildLock\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ChildLock\'); }}\"><th class=\"\">儿童锁</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'InStat_ChildLock\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'InStat_ChildLock\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'InStat_ChildLock\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Rckey\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Rckey\'); }}\"><th class=\"\">遥控钥匙</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'InStat_Rckey\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'InStat_Rckey\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'InStat_Rckey\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'nokey_into\')) { }}<tr class=\"h36 {{out+= it.isSome(\'nokey_into\'); }}\"><th class=\"\">无钥匙进入系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'nokey_into\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'nokey_into\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'nokey_into\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_AIgnitionSys\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_AIgnitionSys\'); }}\"><th class=\"\">无钥匙启动系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'InStat_AIgnitionSys\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'InStat_AIgnitionSys\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'InStat_AIgnitionSys\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_EATS\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_EATS\'); }}\"><th class=\"\">发动机电子防盗</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td> {{ if (it.createValue(i, \'Safe_EATS\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'})) { }}<span class=\"bg_icon {{ out+= it.createValue(i, \'Safe_EATS\', {\'有\': \'bp_icon\', \'选配\': \'xuanpei_icon\'}); }}\"></span> {{ } else { }} {{ out+= it.createValue(i, \'Safe_EATS\'); }} {{ } }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'车轮\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor8\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 车轮</h2></th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_FrontTyreStandard\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_FrontTyreStandard\'); }}\"><th>前轮胎规格</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_FrontTyreStandard\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_RearTyreStandard\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_RearTyreStandard\'); }}\"><th>后轮胎规格</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_RearTyreStandard\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_SpareWheelStandard\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_SpareWheelStandard\'); }}\"><th>备胎类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_SpareWheelStandard\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_RimMaterial\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_RimMaterial\'); }}\"><th>轮毂材料</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_RimMaterial\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'truck_tire_number\')) { }}<tr class=\"h36 {{out+= it.isSome(\'truck_tire_number\'); }}\"><th>轮胎数量(个)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'truck_tire_number\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'行车辅助\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor9\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 行车辅助</h2></th></tr> {{ } }} {{ if(it.isShow(\'Safe_ABS\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_ABS\'); }}\"><th>刹车防抱死（ABS）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Safe_ABS\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_EBD\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_EBD\'); }}\"><th>电子制动力分配系统（EBD）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Safe_EBD\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_EBA\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_EBA\'); }}\"><th>紧急制动辅助系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Safe_EBA\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Safe_TCS\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Safe_TCS\'); }}\"><th>牵引力控制（ASR/TCS/TRC/ATC等）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Safe_TCS\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_DSC\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_DSC\'); }}\"><th>动态稳定控制系统（ESP）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_DSC\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_AsistTurnTune\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_AsistTurnTune\'); }}\"><th>随速助力转向调节(EPS)</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_AsistTurnTune\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_AutoPark\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_AutoPark\'); }}\"><th>自动驻车</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_AutoPark\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_UphillAuxiliary\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_UphillAuxiliary\'); }}\"><th>上坡辅助</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_UphillAuxiliary\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_HDC\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_HDC\'); }}\"><th>陡坡缓降</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_HDC\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_PRadar\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_PRadar\'); }}\"><th>泊车雷达（车前）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_PRadar\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_RRadar\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_RRadar\'); }}\"><th>倒车雷达（车后）</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_RRadar\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'UnderPan_RImage\')) { }}<tr class=\"h36 {{out+= it.isSome(\'UnderPan_RImage\'); }}\"><th>倒车影像</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'UnderPan_RImage\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_PanoramicCamera\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_PanoramicCamera\'); }}\"><th>全景摄像头</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_PanoramicCamera\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SpeedCruise\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SpeedCruise\'); }}\"><th>定速巡航</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_SpeedCruise\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Automaticcruise\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Automaticcruise\'); }}\"><th>自适应巡航</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_Automaticcruise\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_GPS\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_GPS\'); }}\"><th>GPS导航系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_GPS\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_AutoParking\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_AutoParking\'); }}\"><th>自动泊车入位</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_AutoParking\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_blindspotdetection\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_blindspotdetection\'); }}\"><th>盲点检测</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_blindspotdetection\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Lane_Departure\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Lane_Departure\'); }}\"><th>车道偏离预警系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Lane_Departure\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ActiveSafetySystems\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ActiveSafetySystems\'); }}\"><th>主动刹车/主动安全系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_ActiveSafetySystems\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_OverallActiveSteeringSystem\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_OverallActiveSteeringSystem\'); }}\"><th>整体主动转向系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_OverallActiveSteeringSystem\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_NightVisionSystem\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_NightVisionSystem\'); }}\"><th>夜视系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_NightVisionSystem\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'门窗/后视镜\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor10\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 门窗/后视镜</h2></th></tr> {{ } }} {{ if(it.isShow(\'Body_Openmethod\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_Openmethod\'); }}\"><th>开门方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_Openmethod\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_CarWindow\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_CarWindow\'); }}\"><th>车窗</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_CarWindow\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_UV_InsulatinGlass\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_UV_InsulatinGlass\'); }}\"><th>防紫外线/隔热玻璃</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_UV_InsulatinGlass\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Privacy_glass\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Privacy_glass\'); }}\"><th>隐私玻璃</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Privacy_glass\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_AvoidNipHead\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_AvoidNipHead\'); }}\"><th>电动窗防夹功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_AvoidNipHead\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Body_LouverOCType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_LouverOCType\'); }}\"><th>天窗开合方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_LouverOCType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Body_Louver\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Body_Louver\'); }}\"><th>天窗型式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'Body_Louver\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_BackCurtain\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_BackCurtain\'); }}\"><th>后窗遮阳帘</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_BackCurtain\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_SecondRowCurtain\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_SecondRowCurtain\'); }}\"><th>后排侧遮阳帘</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_SecondRowCurtain\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_BBrushSensor\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_BBrushSensor\'); }}\"><th>后雨刷器</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_BBrushSensor\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FBrushSensor\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FBrushSensor\'); }}\"><th>感应雨刷</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FBrushSensor\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ElectricPick-upDoors\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ElectricPick-upDoors\'); }}\"><th>电动吸合门</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_ElectricPick-upDoors\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_MirrorSideLight\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_MirrorSideLight\'); }}\"><th>后视镜带侧转向灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_MirrorSideLight\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrormemory\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_ReMirrormemory\'); }}\"><th>外后视镜记忆功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_ReMirrormemory\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorHot\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_ReMirrorHot\'); }}\"><th>外后视镜加热功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_ReMirrorHot\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorFold\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_ReMirrorFold\'); }}\"><th>外后视镜电动折叠功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_ReMirrorFold\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorElecTune\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_ReMirrorElecTune\'); }}\"><th>外后视镜电动调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_ReMirrorElecTune\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorDazzle\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_ReMirrorDazzle\'); }}\"><th>内后视镜防眩目功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_ReMirrorDazzle\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_FaceMirror\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_FaceMirror\'); }}\"><th>遮阳板化妆镜</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_FaceMirror\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'灯光\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor11\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 灯光</h2></th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FrontLightType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FrontLightType\'); }}\"><th>前大灯类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FrontLightType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'choice_FrontLightType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'choice_FrontLightType\'); }}\"><th>选配前大灯类型</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'choice_FrontLightType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightClose\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FLightClose\'); }}\"><th>前大灯自动开闭</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FLightClose\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightAutoClean\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FLightAutoClean\'); }}\"><th>前大灯自动清洗功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FLightAutoClean\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightDelay\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FLightDelay\'); }}\"><th>前大灯延时关闭</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FLightDelay\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightSteer\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FLightSteer\'); }}\"><th>前大灯随动转向</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FLightSteer\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightHeightTune\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FLightHeightTune\'); }}\"><th>前大灯照射范围调整</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FLightHeightTune\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'000\')) { }}<tr class=\"h36 {{out+= it.isSome(\'000\'); }}\"><th>会车前灯防眩目功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'000\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightDazzle\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_FLightDazzle\'); }}\"><th>前雾灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_FLightDazzle\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ReadingLight\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ReadingLight\'); }}\"><th>阅读灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'InStat_ReadingLight\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_atmosphereLight\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_atmosphereLight\'); }}\"><th>车内氛围灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_atmosphereLight\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_DaytimeRunningLights\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_DaytimeRunningLights\'); }}\"><th>日间行车灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_DaytimeRunningLights\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_LEDtaillights\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_LEDtaillights\'); }}\"><th>LED尾灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i, \'OutStat_LEDtaillights\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'OutStat_Corneringlights\')) { }}<tr class=\"h36 {{out+= it.isSome(\'OutStat_Corneringlights\'); }}\"><th>转向辅助灯</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'OutStat_Corneringlights\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'内部配置\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor12\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 内部配置</h2></th></tr> {{ } }} {{ if(it.isShow(\'SteeringAdjustmentLeftAndRight\')) { }}<tr class=\"h36 {{out+= it.isSome(\'SteeringAdjustmentLeftAndRight\'); }}\"><th>方向盘前后调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'SteeringAdjustmentLeftAndRight\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SteeringAdjustmentUpAndDown\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SteeringAdjustmentUpAndDown\'); }}\"><th>方向盘上下调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SteeringAdjustmentUpAndDown\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SteerTuneType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SteerTuneType\'); }}\"><th>方向盘调节方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SteerTuneType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SteerMomery\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SteerMomery\'); }}\"><th>方向盘记忆设置</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SteerMomery\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SteerMaterial\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SteerMaterial\'); }}\"><th>方向盘表面材料</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SteerMaterial\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_MultiFuncSteer\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_MultiFuncSteer\'); }}\"><th>多功能方向盘</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_MultiFuncSteer\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Liquid_crystal_instrument_panel\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Liquid_crystal_instrument_panel\'); }}\"><th>全液晶仪表盘</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'Liquid_crystal_instrument_panel\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ComputerMonitors\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ComputerMonitors\'); }}\"><th>行车电脑显示屏</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_ComputerMonitors\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Hud\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Hud\'); }}\"><th>HUD抬头数字显示</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_Hud\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Hud\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Hud\'); }}\"><th>内饰颜色</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_Hud\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BCarShelf\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BCarShelf\'); }}\"><th>后排杯架</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BCarShelf\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_12VPower\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_12VPower\'); }}\"><th>车内电源电压</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_12VPower\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'座椅\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor13\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 座椅</h2></th></tr> {{ } }} {{ if(it.isShow(\'InStat_SportSeat\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SportSeat\'); }}\"><th>运动座椅</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SportSeat\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'choice_SeatMaterial\')) { }}<tr class=\"h36 {{out+= it.isSome(\'choice_SeatMaterial\'); }}\"><th>座椅材料</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'choice_SeatMaterial\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'choice_SeatMaterial\')) { }}<tr class=\"h36 {{out+= it.isSome(\'choice_SeatMaterial\'); }}\"><th>选配座椅材料</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'choice_SeatMaterial\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'seat_height_adjustable\')) { }}<tr class=\"h36 {{out+= it.isSome(\'seat_height_adjustable\'); }}\"><th>座椅高低调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'seat_height_adjustable\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_DSeatTuneType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_DSeatTuneType\'); }}\"><th>驾驶座座椅调节方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_DSeatTuneType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_DASeatTuneType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_DASeatTuneType\'); }}\"><th>副驾驶座椅调节方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_DASeatTuneType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_DSeatProp\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_DSeatProp\'); }}\"><th>驾驶座腰部支撑调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_DSeatProp\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_AdjustableShoulderSupport\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_AdjustableShoulderSupport\'); }}\"><th>驾驶座肩部支撑调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_AdjustableShoulderSupport\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_FSeatPillowA\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_FSeatPillowA\'); }}\"><th>前座椅头枕调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_FSeatPillowA\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BSeatTuneType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BSeatTuneType\'); }}\"><th>后排座椅调节方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BSeatTuneType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BSeatLieRate\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BSeatLieRate\'); }}\"><th>后排座位放倒比例</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BSeatLieRate\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'Rear_seat_angle_adjustment\')) { }}<tr class=\"h36 {{out+= it.isSome(\'Rear_seat_angle_adjustment\'); }}\"><th>后排座椅角度调节</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'Rear_seat_angle_adjustment\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_FCenterArmrest\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_FCenterArmrest\'); }}\"><th>前座中央扶手</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_FCenterArmrest\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BCenterArmrest\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BCenterArmrest\'); }}\"><th>后座中央扶手</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BCenterArmrest\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SeatHeat\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SeatHeat\'); }}\"><th>座椅通风</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SeatHeat\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_DSeatHot\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_DSeatHot\'); }}\"><th>座椅加热</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_DSeatHot\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_SeatKnead\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_SeatKnead\'); }}\"><th>座椅按摩功能</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_SeatKnead\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ElectricSeatMemory\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ElectricSeatMemory\'); }}\"><th>电动座椅记忆</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_ElectricSeatMemory\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ChildSeatFix\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ChildSeatFix\'); }}\"><th>儿童安全座椅固定装置</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_ChildSeatFix\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_3rdRowSeats\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_3rdRowSeats\'); }}\"><th>第三排座椅</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_3rdRowSeats\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'娱乐通讯\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor14\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 娱乐通讯</h2></th></tr> {{ } }} {{ if(it.isShow(\'InStat_PositioningInteractiveServices\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_PositioningInteractiveServices\'); }}\"><th>定位互动服务</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_PositioningInteractiveServices\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Bluetooth\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Bluetooth\'); }}\"><th>蓝牙系统</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_Bluetooth\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_ExternalAudioInterface\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_ExternalAudioInterface\'); }}\"><th>外接音源接口</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_ExternalAudioInterface\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Built-inHardDrive\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Built-inHardDrive\'); }}\"><th>内置硬盘</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_Built-inHardDrive\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Video\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Video\'); }}\"><th>车载电视</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_Video\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_LoudHailer\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_LoudHailer\'); }}\"><th>扬声器数量</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_LoudHailer;\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_Audiobrand\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_Audiobrand\'); }}\"><th>音响品牌</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_Audiobrand\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_DVDPlayer\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_DVDPlayer\'); }}\"><th>DVD</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_DVDPlayer\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_CDPlayer\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_CDPlayer\'); }}\"><th>CD</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_CDPlayer\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_CCEscreen\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_CCEscreen\'); }}\"><th>中控台液晶屏</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_CCEscreen\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BEscreen\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BEscreen\'); }}\"><th>后排液晶屏</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BEscreen\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if (it.isTitle(\'空调/冰箱\')) { }}<tr class=\"title_box\"><th colspan=\"{{out+=(it.selects.length + 1)> 5 ? (it.selects.length + 1) : 5;}}\" class=\"anchor\" id=\"anchor15\" style=\"width:{{out+=it.widthB;}}px;\"><h2 class=\"title\"> 空调/冰箱</h2></th></tr> {{ } }} {{ if(it.isShow(\'InStat_AirCType\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_AirCType\'); }}\"><th>空调控制方式</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_AirCType\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_TemperSubCount\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_TemperSubCount\'); }}\"><th>温度分区控制</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_TemperSubCount\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BAirCSystem\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BAirCSystem\'); }}\"><th>后排独立空调</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BAirCSystem\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'000\')) { }}<tr class=\"h36 {{out+= it.isSome(\'000\'); }}\"><th>后排出风口</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'000\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_BleakAirNum\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_BleakAirNum\'); }}\"><th>空气调节/花粉过滤</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_BleakAirNum\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'AirCondition_AirPurification\')) { }}<tr class=\"h36 {{out+= it.isSome(\'AirCondition_AirPurification\'); }}\"><th>车内空气净化装置</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'AirCondition_AirPurification\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }} {{ if(it.isShow(\'InStat_carFridge\')) { }}<tr class=\"h36 {{out+= it.isSome(\'InStat_carFridge\'); }}\"><th>车载冰箱</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out+= it.createValue(i,\'InStat_carFridge\'); }}</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr> {{ } }}</tbody></table></div>";
},{}],7:[function(require,module,exports){
module.exports = "<table cellspacing=\"0\" cellpadding=\"0\"><tbody><tr class=\"first_tr Js_first_tr\" elenodenum=\"4\"><th class=\"signBox\"><div class=\"div1\"><label class=\"visibal {{ out+=it.sign.hl ? \'active\' : \'\'; }}\" m=\"hl\"><span class=\"sign bg_icon\"></span> 高亮显示不同项</label></div><div class=\"div2\"><label class=\"visibal {{ out+=it.sign.hd ? \'active\' : \'\'; }}\" m=\"hd\"><span class=\"sign bg_icon\"></span> 隐藏相同参数</label></div><div class=\"div3\"><label class=\"visibal {{ out+=it.sign.nv ? \'active\' : \'\'; }}\" m=\"nv\"><span class=\"sign bg_icon\"></span> 隐藏暂无内容参数</label></div><p><span class=\"bg_icon bp_icon\"></span> 标配&nbsp;&nbsp;&nbsp;<span class=\"bg_icon xp_icon\"></span> 选配&nbsp;&nbsp;&nbsp;<span class=\"bg_icon null_icon\"></span> 无</p></th></tr><tr class=\"f_price\"><th class=\"line_hi_31\">厂家指导价</th></tr><tr class=\"m_price\"><th class=\"line_hi_31\">经销商报价</th></tr> {{ if (it.isTitle(\'基本信息\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 基本信息</h2></th></tr> {{ } }} {{ if(it.isShow(\'Car_RepairPolicy\')) { }}<tr class=\"h36\"><th>保修政策</th></tr> {{ } }} {{ if(it.isShow(\'new_energy_subsidies\')) { }}<tr class=\"h36\"><th>新能源汽车国家补贴(万元)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_ExhaustForFloat\')) { }}<tr class=\"h36\"><th>排量（升）(L)</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_TransmissionType\')) { }}<tr class=\"h36\"><th class=\"\">变速箱</th></tr> {{ } }} {{ if(it.isShow(\'Perf_ShiQuYouHao\')) { }}<tr class=\"h36\"><th>市区工况油耗(L/100km)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_ShiJiaoYouHao\')) { }}<tr class=\"h36\"><th>市郊工况油耗(L/100km)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_ZongHeYouHao\')) { }}<tr class=\"h36\"><th>综合工况油耗(L/100km)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_ZongHeYouHao\')) { }}<tr class=\"h36\"><th>汽车大全实测油耗(L/100km)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_AccelerateTime\')) { }}<tr class=\"h36\"><th>官方0-100公里加速时间(s)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_AccelerateTime\')) { }}<tr class=\"h36\"><th>汽车大全实测0-100公里加速时间</th></tr> {{ } }} {{ if(it.isShow(\'Perf_MaxSpeed\')) { }}<tr class=\"h36\"><th>最高车速(km/h)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_SeatNum\')) { }}<tr class=\"h36\"><th>乘员人数（含司机）(个)</th></tr> {{ } }} {{ if (it.isTitle(\'车体\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 车体</h2></th></tr> {{ } }} {{ if(it.isShow(\'CarColorList\')) { }}<tr class=\"h73\"><th>车身颜色</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_Length\')) { }}<tr class=\"h36\"><th>车长(mm)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_Width\')) { }}<tr class=\"h36\"><th>车宽(mm)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_Height\')) { }}<tr class=\"h36\"><th>车高(mm)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_WheelBase\')) { }}<tr class=\"h36\"><th class=\"\">轴距（mm）</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_FrontTread\')) { }}<tr class=\"h36\"><th class=\"\">前轮距(mm)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_BackTread\')) { }}<tr class=\"h36\"><th class=\"\">后轮距(mm)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_Weight\')) { }}<tr class=\"h36\"><th>整备质量(kg)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_TotalWeight\')) { }}<tr class=\"h36\"><th>满载质量(kg)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_MinGapFromEarth\')) { }}<tr class=\"h36\"><th>最小离地间隙(mm)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_MaxPaddleDepth\')) { }}<tr class=\"h36\"><th>最大涉水深度(mm)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_NearCorner\')) { }}<tr class=\"h36\"><th class=\"\">接近角(°)</th></tr> {{ } }} {{ if(it.isShow(\'Perf_Throughtheangle\')) { }}<tr class=\"h36\"><th class=\"\">通过角(°)</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_AwayCorner\')) { }}<tr class=\"h36\"><th class=\"\">离去角(°)</th></tr> {{ } }} {{ if(it.isShow(\'Inset_TrunkCapacity\')) { }}<tr class=\"h36\"><th class=\"\">行李厢容积(L)</th></tr> {{ } }} {{ if(it.isShow(\'Inset_TrunkCapacityE\')) { }}<tr class=\"h36\"><th class=\"\">行李厢最大拓展容积(L)</th></tr> {{ } }} {{ if(it.isShow(\'InStat_TrunkType\')) { }}<tr class=\"h36\"><th class=\"\">行李厢盖开合方式</th></tr> {{ } }} {{ if(it.isShow(\'Inset_BackUpOpenType\')) { }}<tr class=\"h36\"><th class=\"\">行李厢打开方式</th></tr> {{ } }} {{ if(it.isShow(\'Induction_trunk\')) { }}<tr class=\"h36\"><th class=\"\">感应行李厢</th></tr> {{ } }} {{ if(it.isShow(\'Body_Doors\')) { }}<tr class=\"h36\"><th class=\"\">车门数(个)</th></tr> {{ } }} {{ if(it.isShow(\'Body_TipType\')) { }}<tr class=\"h36\"><th class=\"\">车顶型式</th></tr> {{ } }} {{ if(it.isShow(\'Body_sailType\')) { }}<tr class=\"h36\"><th class=\"\">车篷型式</th></tr> {{ } }} {{ if(it.isShow(\'Body_CalashOCType\')) { }}<tr class=\"h36\"><th class=\"\">车篷开合方式</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_TopSnelf\')) { }}<tr class=\"h36\"><th class=\"\">车顶行李箱架</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_SportsAppearanceKit\')) { }}<tr class=\"h36\"><th class=\"\">运动外观套件</th></tr> {{ } }} {{ if(it.isShow(\'Cargo_compartment_form\')) { }}<tr class=\"h36\"><th class=\"\">货厢形式</th></tr> {{ } }} {{ if(it.isShow(\'Cargo_length_min\')) { }}<tr class=\"h36\"><th class=\"\">货厢长度(mm)</th></tr> {{ } }} {{ if(it.isShow(\'cargo_width_min\')) { }}<tr class=\"h36\"><th class=\"\">货厢宽度(mm)</th></tr> {{ } }} {{ if(it.isShow(\'Cargo_height_min\')) { }}<tr class=\"h36\"><th class=\"\">货厢高度(mm)</th></tr> {{ } }} {{ if(it.isShow(\'truck_form\')) { }}<tr class=\"h36\"><th class=\"\">车厢形式</th></tr> {{ } }} {{ if(it.isShow(\'Seating_arrangement\')) { }}<tr class=\"h36\"><th class=\"\">座位排列</th></tr> {{ } }} {{ if(it.isShow(\'nominal_load_capacity\')) { }}<tr class=\"h36\"><th class=\"\">额定载重量(T)</th></tr> {{ } }} {{ if(it.isShow(\'maximum_gross_mass\')) { }}<tr class=\"h36\"><th class=\"\">最大总质量(T)</th></tr> {{ } }} {{ if (it.isTitle(\'发动机\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 发动机</h2></th></tr> {{ } }} {{ if(it.isShow(\'Engine_Location\')) { }}<tr class=\"h36\"><th class=\"\">发动机位置</th></tr> {{ } }} {{ if(it.isShow(\'Engine_Type\')) { }}<tr class=\"h36\"><th class=\"\">发动机型号</th></tr> {{ } }} {{ if(it.isShow(\'Engine_ExhaustForFloat\')) { }}<tr class=\"h36\"><th class=\"\">排量（升）(L)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_Exhaust\')) { }}<tr class=\"h36\"><th class=\"\">排量（毫升）(mL)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_InhaleType\')) { }}<tr class=\"h36\"><th class=\"\">进气形式</th></tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderRank\')) { }}<tr class=\"h36\"><th class=\"\">气缸排列型式</th></tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderNum\')) { }}<tr class=\"h36\"><th class=\"\">气缸数(个)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_ValvePerCylinder\')) { }}<tr class=\"h36\"><th class=\"\">每缸气门数(个)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_Camshaft\')) { }}<tr class=\"h36\"><th class=\"\">气门结构</th></tr> {{ } }} {{ if(it.isShow(\'Engine_CompressRat\')) { }}<tr class=\"h36\"><th class=\"\">压缩比(:1)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderDM\')) { }}<tr class=\"h36\"><th class=\"\">缸径(mm)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_Route\')) { }}<tr class=\"h36\"><th class=\"\">行程(mm)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_horsepower\')) { }}<tr class=\"h36\"><th class=\"\">最大马力(Ps)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_MaxPower\')) { }}<tr class=\"h36\"><th class=\"\">最大功率(kW)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_PowerSpeed\')) { }}<tr class=\"h36\"><th class=\"\">最大功率转速(rpm)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_MaxNJ\')) { }}<tr class=\"h36\"><th class=\"\">最大扭矩(N·m)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_NJSpeed\')) { }}<tr class=\"h36\"><th class=\"\">最大扭矩转速(rpm)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_SpTech\')) { }}<tr class=\"h36\"><th class=\"\">特有技术</th></tr> {{ } }} {{ if(it.isShow(\'Oil_FuelType\')) { }}<tr class=\"h36\"><th class=\"\">燃料类型</th></tr> {{ } }} {{ if(it.isShow(\'new_energy_type\')) { }}<tr class=\"h36\"><th class=\"\">新能源类型</th></tr> {{ } }} {{ if(it.isShow(\'Oil_FuelTab\')) { }}<tr class=\"h36\"><th class=\"\">燃油标号</th></tr> {{ } }} {{ if(it.isShow(\'Oil_SupplyType\')) { }}<tr class=\"h36\"><th class=\"\">供油方式</th></tr> {{ } }} {{ if(it.isShow(\'Oil_FuelCapacity\')) { }}<tr class=\"h36\"><th class=\"\">燃油箱容积(L)</th></tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderTMaterial\')) { }}<tr class=\"h36\"><th class=\"\">缸盖材料</th></tr> {{ } }} {{ if(it.isShow(\'Engine_CylinderMaterial\')) { }}<tr class=\"h36\"><th class=\"\">缸体材料</th></tr> {{ } }} {{ if(it.isShow(\'Engine_EnvirStandard\')) { }}<tr class=\"h36\"><th class=\"\">环保标准</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_Startandstopsystem\')) { }}<tr class=\"h36\"><th class=\"\">启停系统</th></tr> {{ } }} {{ if(it.isShow(\'tank_material\')) { }}<tr class=\"h36\"><th class=\"\">油箱材质</th></tr> {{ } }} {{ if (it.isTitle(\'电池/电动机\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 电池/电动机</h2></th></tr> {{ } }} {{ if(it.isShow(\'Electric_Peakpower\')) { }}<tr class=\"h36\"><th class=\"\">电机最大功率(kW)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Maximumpowerspeed\')) { }}<tr class=\"h36\"><th class=\"\">电机最大功率-转速(kW/rpm)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_maximumtorque\')) { }}<tr class=\"h36\"><th class=\"\">电机最大扭矩(N·m)</th></tr> {{ } }} {{ if(it.isShow(\'Maximummotortorquespeed\')) { }}<tr class=\"h36\"><th class=\"\">电机最大扭矩-转速(N·m/rpm)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_RatedPower\')) { }}<tr class=\"h36\"><th class=\"\">电机额定功率(kW)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_systemvoltage\')) { }}<tr class=\"h36\"><th class=\"\">系统电压(V)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Motortype\')) { }}<tr class=\"h36\"><th class=\"\">电机类型</th></tr> {{ } }} {{ if(it.isShow(\'Electric_number\')) { }}<tr class=\"h36\"><th class=\"\">发电机数量(个)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_position\')) { }}<tr class=\"h36\"><th class=\"\">发电机位置</th></tr> {{ } }} {{ if(it.isShow(\'chongdianfangshi\')) { }}<tr class=\"h36\"><th class=\"\">充电方式</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Normalchargingtime\')) { }}<tr class=\"h36\"><th class=\"\">普通充电时间(min)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Fast-chargetime\')) { }}<tr class=\"h36\"><th class=\"\">快速充电时间(min)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Batteryvoltage\')) { }}<tr class=\"h36\"><th class=\"\">电池电压(V)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Batterycapacity\')) { }}<tr class=\"h36\"><th class=\"\">电池容量(kWh)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_BatteryType\')) { }}<tr class=\"h36\"><th class=\"\">电池类型</th></tr> {{ } }} {{ if(it.isShow(\'Electric_Powerconsumption\')) { }}<tr class=\"h36\"><th class=\"\">百公里耗电量(kWh)</th></tr> {{ } }} {{ if(it.isShow(\'Electric_mustMileageconstant\')) { }}<tr class=\"h36\"><th class=\"\">纯电最高续航里程(km)</th></tr> {{ } }} {{ if (it.isTitle(\'变速箱\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 变速箱</h2></th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_TransmissionType\')) { }}<tr class=\"h36\"><th class=\"\">变速箱</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SteerEtc\')) { }}<tr class=\"h36\"><th class=\"\">换挡拨片</th></tr> {{ } }} {{ if(it.isShow(\'Transmission_type\')) { }}<tr class=\"h36\"><th class=\"\">变速箱型号</th></tr> {{ } }} {{ if(it.isShow(\'forward_gears_number\')) { }}<tr class=\"h36\"><th class=\"\">前进挡数(个)</th></tr> {{ } }} {{ if(it.isShow(\'backward_gears_number\')) { }}<tr class=\"h36\"><th class=\"\">倒挡数(个)</th></tr> {{ } }} {{ if (it.isTitle(\'底盘制动\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 底盘制动</h2></th></tr> {{ } }} {{ if(it.isShow(\'Body_Struc\')) { }}<tr class=\"h36\"><th class=\"\">底盘结构</th></tr> {{ } }} {{ if(it.isShow(\'OutSet_MinWheelRadius\')) { }}<tr class=\"h36\"><th class=\"\">最小转弯半径(m)</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_DriveAsistTurn\')) { }}<tr class=\"h36\"><th class=\"\">转向助力</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_FrontBrakeType\')) { }}<tr class=\"h36\"><th class=\"\">前制动类型</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_RearBrakeType\')) { }}<tr class=\"h36\"><th class=\"\">后制动类型</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_ParkingBrake\')) { }}<tr class=\"h36\"><th class=\"\">驻车制动类型</th></tr> {{ } }} {{ if(it.isShow(\'Perf_DriveType\')) { }}<tr class=\"h36\"><th class=\"\">驱动方式</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_Airmatic\')) { }}<tr class=\"h36\"><th class=\"\">空气悬挂</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_SuspensionHeightControl\')) { }}<tr class=\"h36\"><th class=\"\">可调悬挂</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_FrontSuspensionType\')) { }}<tr class=\"h36\"><th class=\"\">前悬挂类型</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_RearSuspensionType\')) { }}<tr class=\"h36\"><th class=\"\">后悬挂类型</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_CentralDiffLock\')) { }}<tr class=\"h36\"><th class=\"\">中央差速器锁</th></tr> {{ } }} {{ if(it.isShow(\'Front_axle_description\')) { }}<tr class=\"h36\"><th class=\"\">前桥（轴）描述</th></tr> {{ } }} {{ if(it.isShow(\'Back_axle_description\')) { }}<tr class=\"h36\"><th class=\"\">后桥描述</th></tr> {{ } }} {{ if(it.isShow(\'spring_quantity\')) { }}<tr class=\"h36\"><th class=\"\">弹簧片数(片)</th></tr> {{ } }} {{ if (it.isTitle(\'安全配置\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 安全配置</h2></th></tr> {{ } }} {{ if(it.isShow(\'Safe_DriverGasBag\')) { }}<tr class=\"h36 \"><th class=\"\">驾驶位安全气囊</th></tr> {{ } }} {{ if(it.isShow(\'Safe_SubDriverGasBag\')) { }}<tr class=\"h36 \"><th class=\"\">副驾驶位安全气囊</th></tr> {{ } }} {{ if(it.isShow(\'Safe_FsadGasbag\')) { }}<tr class=\"h36 \"><th class=\"\">前排侧安全气囊</th></tr> {{ } }} {{ if(it.isShow(\'Safe_FheadGasbag\')) { }}<tr class=\"h36 \"><th class=\"\">前排头部气囊（气帘）</th></tr> {{ } }} {{ if(it.isShow(\'Safe_KneeGasBag\')) { }}<tr class=\"h36 \"><th class=\"\">膝部气囊</th></tr> {{ } }} {{ if(it.isShow(\'Safe_BsadGasbag\')) { }}<tr class=\"h36 \"><th class=\"\">后配侧安全气囊</th></tr> {{ } }} {{ if(it.isShow(\'Safe_BheadGasbag\')) { }}<tr class=\"h36 \"><th class=\"\">后排头部气囊（气帘）</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BeltBag\')) { }}<tr class=\"h36 \"><th class=\"\">安全带气囊</th></tr> {{ } }} {{ if(it.isShow(\'Safe_BeltReminder\')) { }}<tr class=\"h36 \"><th class=\"\">安全带未系提示</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_lifeBeltlimit\')) { }}<tr class=\"h36 \"><th class=\"\">安全带限力功能</th></tr> {{ } }} {{ if(it.isShow(\'Safe_BeltPreTighten\')) { }}<tr class=\"h36 \"><th class=\"\">安全带预收紧功能</th></tr> {{ } }} {{ if(it.isShow(\'00Safe_BeltPosTune0\')) { }}<tr class=\"h36 \"><th class=\"\">前安全带调节</th></tr> {{ } }} {{ if(it.isShow(\'Safe_BackBelt\')) { }}<tr class=\"h36 \"><th class=\"\">后排安全带</th></tr> {{ } }} {{ if(it.isShow(\'Safe_BackthreespotBelt\')) { }}<tr class=\"h36 \"><th class=\"\">后排中间三点式安全带</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_TyrePressureWatcher\')) { }}<tr class=\"h36 \"><th class=\"\">胎压监测装置</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_ZeroPressureDrive\')) { }}<tr class=\"h36 \"><th class=\"\">零压续行（零胎压继续行驶）</th></tr> {{ } }} {{ if(it.isShow(\'InStat_CenterControlLock\')) { }}<tr class=\"h36 \"><th class=\"\">中控门锁</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ChildLock\')) { }}<tr class=\"h36 \"><th class=\"\">儿童锁</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Rckey\')) { }}<tr class=\"h36 \"><th class=\"\">遥控钥匙</th></tr> {{ } }} {{ if(it.isShow(\'nokey_into\')) { }}<tr class=\"h36 \"><th class=\"\">无钥匙进入系统</th></tr> {{ } }} {{ if(it.isShow(\'InStat_AIgnitionSys\')) { }}<tr class=\"h36 \"><th class=\"\">无钥匙启动系统</th></tr> {{ } }} {{ if(it.isShow(\'Safe_EATS\')) { }}<tr class=\"h36 \"><th class=\"\">发动机电子防盗</th></tr> {{ } }} {{ if (it.isTitle(\'车轮\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 车轮</h2></th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_FrontTyreStandard\')) { }}<tr class=\"h36 \"><th class=\"\">前轮胎规格</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_RearTyreStandard\')) { }}<tr class=\"h36 \"><th class=\"\">后轮胎规格</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_SpareWheelStandard\')) { }}<tr class=\"h36 \"><th class=\"\">备胎类型</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_RimMaterial\')) { }}<tr class=\"h36 \"><th class=\"\">轮毂材料</th></tr> {{ } }} {{ if(it.isShow(\'truck_tire_number\')) { }}<tr class=\"h36 \"><th class=\"\">轮胎数量(个)</th></tr> {{ } }} {{ if (it.isTitle(\'行车辅助\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 行车辅助</h2></th></tr> {{ } }} {{ if(it.isShow(\'Safe_ABS\')) { }}<tr class=\"h36 \"><th class=\"\">刹车防抱死（ABS）</th></tr> {{ } }} {{ if(it.isShow(\'Safe_EBD\')) { }}<tr class=\"h36 \"><th class=\"\">电子制动力分配系统（EBD）</th></tr> {{ } }} {{ if(it.isShow(\'Safe_EBA\')) { }}<tr class=\"h36 \"><th class=\"\">紧急制动辅助系统</th></tr> {{ } }} {{ if(it.isShow(\'Safe_TCS\')) { }}<tr class=\"h36 \"><th class=\"\">牵引力控制（ASR/TCS/TRC/ATC等）</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_DSC\')) { }}<tr class=\"h36 \"><th class=\"\">动态稳定控制系统（ESP）</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_AsistTurnTune\')) { }}<tr class=\"h36 \"><th class=\"\">随速助力转向调节(EPS)</th></tr> {{ } }} {{ if(it.isShow(\'InStat_AutoPark\')) { }}<tr class=\"h36 \"><th class=\"\">自动驻车</th></tr> {{ } }} {{ if(it.isShow(\'InStat_UphillAuxiliary\')) { }}<tr class=\"h36 \"><th class=\"\">上坡辅助</th></tr> {{ } }} {{ if(it.isShow(\'InStat_HDC\')) { }}<tr class=\"h36 \"><th class=\"\">陡坡缓降</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_PRadar\')) { }}<tr class=\"h36 \"><th class=\"\">泊车雷达（车前）</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_RRadar\')) { }}<tr class=\"h36 \"><th class=\"\">倒车雷达（车后）</th></tr> {{ } }} {{ if(it.isShow(\'UnderPan_RImage\')) { }}<tr class=\"h36 \"><th class=\"\">倒车影像</th></tr> {{ } }} {{ if(it.isShow(\'InStat_PanoramicCamera\')) { }}<tr class=\"h36 \"><th class=\"\">全景摄像头</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SpeedCruise\')) { }}<tr class=\"h36 \"><th class=\"\">定速巡航</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Automaticcruise\')) { }}<tr class=\"h36 \"><th class=\"\">自适应巡航</th></tr> {{ } }} {{ if(it.isShow(\'InStat_GPS\')) { }}<tr class=\"h36 \"><th class=\"\">GPS导航系统</th></tr> {{ } }} {{ if(it.isShow(\'InStat_AutoParking\')) { }}<tr class=\"h36 \"><th class=\"\">自动泊车入位</th></tr> {{ } }} {{ if(it.isShow(\'InStat_blindspotdetection\')) { }}<tr class=\"h36 \"><th class=\"\">盲点检测</th></tr> {{ } }} {{ if(it.isShow(\'Lane_Departure\')) { }}<tr class=\"h36 \"><th class=\"\">车道偏离预警系统</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ActiveSafetySystems\')) { }}<tr class=\"h36 \"><th class=\"\">主动刹车/主动安全系统</th></tr> {{ } }} {{ if(it.isShow(\'InStat_OverallActiveSteeringSystem\')) { }}<tr class=\"h36 \"><th class=\"\">整体主动转向系统</th></tr> {{ } }} {{ if(it.isShow(\'InStat_NightVisionSystem\')) { }}<tr class=\"h36 \"><th class=\"\">夜视系统</th></tr> {{ } }} {{ if (it.isTitle(\'门窗/后视镜\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 门窗/后视镜</h2></th></tr> {{ } }} {{ if(it.isShow(\'Body_Openmethod\')) { }}<tr class=\"h36 \"><th class=\"\">开门方式</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_CarWindow\')) { }}<tr class=\"h36 \"><th class=\"\">车窗</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_UV_InsulatinGlass\')) { }}<tr class=\"h36 \"><th class=\"\">防紫外线/隔热玻璃</th></tr> {{ } }} {{ if(it.isShow(\'Privacy_glass\')) { }}<tr class=\"h36 \"><th class=\"\">隐私玻璃</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_AvoidNipHead\')) { }}<tr class=\"h36 \"><th class=\"\">电动窗防夹功能</th></tr> {{ } }} {{ if(it.isShow(\'Body_LouverOCType\')) { }}<tr class=\"h36 \"><th class=\"\">天窗开合方式</th></tr> {{ } }} {{ if(it.isShow(\'Body_Louver\')) { }}<tr class=\"h36 \"><th class=\"\">天窗型式</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_BackCurtain\')) { }}<tr class=\"h36 \"><th class=\"\">后窗遮阳帘</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_SecondRowCurtain\')) { }}<tr class=\"h36 \"><th class=\"\">后排侧遮阳帘</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_BBrushSensor\')) { }}<tr class=\"h36 \"><th class=\"\">后雨刷器</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FBrushSensor\')) { }}<tr class=\"h36 \"><th class=\"\">感应雨刷</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ElectricPick-upDoors\')) { }}<tr class=\"h36 \"><th class=\"\">电动吸合门</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_MirrorSideLight\')) { }}<tr class=\"h36 \"><th class=\"\">后视镜带侧转向灯</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrormemory\')) { }}<tr class=\"h36 \"><th class=\"\">外后视镜记忆功能</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorHot\')) { }}<tr class=\"h36 \"><th class=\"\">外后视镜加热功能</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorFold\')) { }}<tr class=\"h36 \"><th class=\"\">外后视镜电动折叠功能</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorElecTune\')) { }}<tr class=\"h36 \"><th class=\"\">外后视镜电动调节</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_ReMirrorDazzle\')) { }}<tr class=\"h36 \"><th class=\"\">内后视镜防眩目功能</th></tr> {{ } }} {{ if(it.isShow(\'InStat_FaceMirror\')) { }}<tr class=\"h36 \"><th class=\"\">遮阳板化妆镜</th></tr> {{ } }} {{ if (it.isTitle(\'灯光\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 灯光</h2></th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FrontLightType\')) { }}<tr class=\"h36 \"><th class=\"\">前大灯类型</th></tr> {{ } }} {{ if(it.isShow(\'choice_FrontLightType\')) { }}<tr class=\"h36 \"><th class=\"\">选配前大灯类型</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightClose\')) { }}<tr class=\"h36 \"><th class=\"\">前大灯自动开闭</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightAutoClean\')) { }}<tr class=\"h36 \"><th class=\"\">前大灯自动清洗功能</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightDelay\')) { }}<tr class=\"h36 \"><th class=\"\">前大灯延时关闭</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightSteer\')) { }}<tr class=\"h36 \"><th class=\"\">前大灯随动转向</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightHeightTune\')) { }}<tr class=\"h36 \"><th class=\"\">前大灯照射范围调整</th></tr> {{ } }} {{ if(it.isShow(\'000\')) { }}<tr class=\"h36 \"><th class=\"\">会车前灯防眩目功能</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_FLightDazzle\')) { }}<tr class=\"h36 \"><th class=\"\">前雾灯</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ReadingLight\')) { }}<tr class=\"h36 \"><th class=\"\">阅读灯</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_atmosphereLight\')) { }}<tr class=\"h36 \"><th class=\"\">车内氛围灯</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_DaytimeRunningLights\')) { }}<tr class=\"h36 \"><th class=\"\">日间行车灯</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_LEDtaillights\')) { }}<tr class=\"h36 \"><th class=\"\">LED尾灯</th></tr> {{ } }} {{ if(it.isShow(\'OutStat_Corneringlights\')) { }}<tr class=\"h36 \"><th class=\"\">转向辅助灯</th></tr> {{ } }} {{ if (it.isTitle(\'内部配置\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 内部配置</h2></th></tr> {{ } }} {{ if(it.isShow(\'SteeringAdjustmentLeftAndRight\')) { }}<tr class=\"h36 \"><th class=\"\">方向盘前后调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SteeringAdjustmentUpAndDown\')) { }}<tr class=\"h36 \"><th class=\"\">方向盘上下调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SteerTuneType\')) { }}<tr class=\"h36 \"><th class=\"\">方向盘调节方式</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SteerMomery\')) { }}<tr class=\"h36 \"><th class=\"\">方向盘记忆设置</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SteerMaterial\')) { }}<tr class=\"h36 \"><th class=\"\">方向盘表面材料</th></tr> {{ } }} {{ if(it.isShow(\'InStat_MultiFuncSteer\')) { }}<tr class=\"h36 \"><th class=\"\">多功能方向盘</th></tr> {{ } }} {{ if(it.isShow(\'Liquid_crystal_instrument_panel\')) { }}<tr class=\"h36 \"><th class=\"\">全液晶仪表盘</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ComputerMonitors\')) { }}<tr class=\"h36 \"><th class=\"\">行车电脑显示屏</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Hud\')) { }}<tr class=\"h36 \"><th class=\"\">HUD抬头数字显示</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Hud\')) { }}<tr class=\"h36 \"><th class=\"\">内饰颜色</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BCarShelf\')) { }}<tr class=\"h36 \"><th class=\"\">后排杯架</th></tr> {{ } }} {{ if(it.isShow(\'InStat_12VPower\')) { }}<tr class=\"h36 \"><th class=\"\">车内电源电压</th></tr> {{ } }} {{ if (it.isTitle(\'座椅\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 座椅</h2></th></tr> {{ } }} {{ if(it.isShow(\'InStat_SportSeat\')) { }}<tr class=\"h36 \"><th class=\"\">运动座椅</th></tr> {{ } }} {{ if(it.isShow(\'choice_SeatMaterial\')) { }}<tr class=\"h36 \"><th class=\"\">座椅材料</th></tr> {{ } }} {{ if(it.isShow(\'choice_SeatMaterial\')) { }}<tr class=\"h36 \"><th class=\"\">选配座椅材料</th></tr> {{ } }} {{ if(it.isShow(\'seat_height_adjustable\')) { }}<tr class=\"h36 \"><th class=\"\">座椅高低调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_DSeatTuneType\')) { }}<tr class=\"h36 \"><th class=\"\">驾驶座座椅调节方式</th></tr> {{ } }} {{ if(it.isShow(\'InStat_DASeatTuneType\')) { }}<tr class=\"h36 \"><th class=\"\">副驾驶座椅调节方式</th></tr> {{ } }} {{ if(it.isShow(\'InStat_DSeatProp\')) { }}<tr class=\"h36 \"><th class=\"\">驾驶座腰部支撑调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_AdjustableShoulderSupport\')) { }}<tr class=\"h36 \"><th class=\"\">驾驶座肩部支撑调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_FSeatPillowA\')) { }}<tr class=\"h36 \"><th class=\"\">前座椅头枕调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BSeatTuneType\')) { }}<tr class=\"h36 \"><th class=\"\">后排座椅调节方式</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BSeatLieRate\')) { }}<tr class=\"h36 \"><th class=\"\">后排座位放倒比例</th></tr> {{ } }} {{ if(it.isShow(\'Rear_seat_angle_adjustment\')) { }}<tr class=\"h36 \"><th class=\"\">后排座椅角度调节</th></tr> {{ } }} {{ if(it.isShow(\'InStat_FCenterArmrest\')) { }}<tr class=\"h36 \"><th class=\"\">前座中央扶手</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BCenterArmrest\')) { }}<tr class=\"h36 \"><th class=\"\">后座中央扶手</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SeatHeat\')) { }}<tr class=\"h36 \"><th class=\"\">座椅通风</th></tr> {{ } }} {{ if(it.isShow(\'InStat_DSeatHot\')) { }}<tr class=\"h36 \"><th class=\"\">座椅加热</th></tr> {{ } }} {{ if(it.isShow(\'InStat_SeatKnead\')) { }}<tr class=\"h36 \"><th class=\"\">座椅按摩功能</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ElectricSeatMemory\')) { }}<tr class=\"h36 \"><th class=\"\">电动座椅记忆</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ChildSeatFix\')) { }}<tr class=\"h36 \"><th class=\"\">儿童安全座椅固定装置</th></tr> {{ } }} {{ if(it.isShow(\'InStat_3rdRowSeats\')) { }}<tr class=\"h36 \"><th class=\"\">第三排座椅</th></tr> {{ } }} {{ if (it.isTitle(\'娱乐通讯\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 娱乐通讯</h2></th></tr> {{ } }} {{ if(it.isShow(\'InStat_PositioningInteractiveServices\')) { }}<tr class=\"h36 \"><th class=\"\">定位互动服务</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Bluetooth\')) { }}<tr class=\"h36 \"><th class=\"\">蓝牙系统</th></tr> {{ } }} {{ if(it.isShow(\'InStat_ExternalAudioInterface\')) { }}<tr class=\"h36 \"><th class=\"\">外接音源接口</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Built-inHardDrive\')) { }}<tr class=\"h36 \"><th class=\"\">内置硬盘</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Video\')) { }}<tr class=\"h36 \"><th class=\"\">车载电视</th></tr> {{ } }} {{ if(it.isShow(\'InStat_LoudHailer\')) { }}<tr class=\"h36 \"><th class=\"\">扬声器数量</th></tr> {{ } }} {{ if(it.isShow(\'InStat_Audiobrand\')) { }}<tr class=\"h36 \"><th class=\"\">音响品牌</th></tr> {{ } }} {{ if(it.isShow(\'InStat_DVDPlayer\')) { }}<tr class=\"h36 \"><th class=\"\">DVD</th></tr> {{ } }} {{ if(it.isShow(\'InStat_CDPlayer\')) { }}<tr class=\"h36 \"><th class=\"\">CD</th></tr> {{ } }} {{ if(it.isShow(\'InStat_CCEscreen\')) { }}<tr class=\"h36 \"><th class=\"\">中控台液晶屏</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BEscreen\')) { }}<tr class=\"h36 \"><th class=\"\">后排液晶屏</th></tr> {{ } }} {{ if (it.isTitle(\'空调/冰箱\')) { }}<tr class=\"title_box\"><th colspan=\"12\"><h2 class=\"title\"> 空调/冰箱</h2></th></tr> {{ } }} {{ if(it.isShow(\'InStat_AirCType\')) { }}<tr class=\"h36\"><th class=\"\">空调控制方式</th></tr> {{ } }} {{ if(it.isShow(\'InStat_TemperSubCount\')) { }}<tr class=\"h36\"><th class=\"\">温度分区控制</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BAirCSystem\')) { }}<tr class=\"h36\"><th class=\"\">后排独立空调</th></tr> {{ } }} {{ if(it.isShow(\'000\')) { }}<tr class=\"h36\"><th class=\"\">后排出风口</th></tr> {{ } }} {{ if(it.isShow(\'InStat_BleakAirNum\')) { }}<tr class=\"h36\"><th class=\"\">空气调节/花粉过滤</th></tr> {{ } }} {{ if(it.isShow(\'AirCondition_AirPurification\')) { }}<tr class=\"h36\"><th class=\"\">车内空气净化装置</th></tr> {{ } }} {{ if(it.isShow(\'InStat_carFridge\')) { }}<tr class=\"h36\"><th class=\"\">车载冰箱</th></tr> {{ } }}</tbody></table>";
},{}],8:[function(require,module,exports){
module.exports = "<ul class=\"clearfix\"><li class=\"year fl pub\"><ul class=\"clearfix\"><li class=\"fl\">年款:</li> {{ for(var i in it.years) { }} {{ if(i != \'undefined\') { }}<li class=\"fl click {{ out+=it.years[i] ? \'active\' : \'\'; }}\" m=\"years\" v=\"{{out+=i;}}\"><span class=\"bg_icon\"></span> {{out+=i;}}款</li> {{ } }} {{ } }}</ul></li><li class=\"speed_box fl pub\"><ul class=\"clearfix\"><li class=\"fl\">变速箱:</li> {{ for(var i in it.speed) { }} {{ if(i != \'undefined\') { }}<li class=\"fl click {{ out+=it.speed[i] ? \'active\' : \'\'; }}\" m=\"speed\" v=\"{{out+=i;}}\"><span class=\"bg_icon\"></span> {{out+=i;}}</li> {{ } }} {{ } }}</ul></li><li class=\"engine fl pub\"><ul class=\"clearfix\"><li class=\"fl\">发动机:</li> {{ for(var i in it.engine) { }} {{ if(i != \'undefined\') { }}<li class=\"fl click {{ out+=it.engine[i] ? \'active\' : \'\'; }}\" m=\"engine\" v=\"{{out+=i;}}\"><span class=\"bg_icon\"></span> {{out+=i;}}</li> {{ } }} {{ } }}</ul></li></ul>";
},{}],9:[function(require,module,exports){
module.exports = "<table cellspacing=\"0\" cellpadding=\"0\" class=\"carLaryerBox\" id=\"carLaryerBox\" style=\"width:{{ out+= it.widthB; }}px;\"><tbody><tr class=\"first_tr Js_first_tr\" elenodenum=\"4\"><th class=\"signBox\"><div class=\"div1\"><label class=\"visibal {{ out+=it.sign.hl ? \'active\' : \'\'; }}\" m=\"hl\"><span class=\"sign bg_icon\"></span> 高亮显示不同项</label></div><div class=\"div2\"><label class=\"visibal {{ out+=it.sign.hd ? \'active\' : \'\'; }}\" m=\"hd\"><span class=\"sign bg_icon\"></span> 隐藏相同参数</label></div><div class=\"div3\"><label class=\"visibal {{ out+=it.sign.nv ? \'active\' : \'\'; }}\" m=\"nv\"><span class=\"sign bg_icon\"></span> 隐藏暂无内容参数</label></div><p><span class=\"bg_icon bp_icon\"></span> 标配&nbsp;&nbsp;&nbsp;<span class=\"bg_icon xp_icon\"></span> 选配&nbsp;&nbsp;&nbsp;<span class=\"bg_icon null_icon\"></span> 无</p></th> {{ for (var i = 0; i<it.selects.length; i++) { var carP=it.selects[i].param[\'carParam\']; }} <td class=\"po-r v_top Js_tableHead_item\" hascon=\"true\"><div id=\"draggcarbox_{{out+=i;}}\" class=\"dragg_car_box\" carId=\"{{out+= it.selects[i].CarID ;}}\"><p class=\"car_des\"> {{ out+= it.selects[i].year + \'款 \' + carP[\'name\']; }}</p></div><div class=\"duibi_btn Js_duibi_btn\"><div> {{ if(i > 0){ }} <span class=\"icon_left Js_icon_left\" ismove=\"true\" i=\"{{out+=i;}}\">&lt;左移</span> {{ } }} <span class=\"title Js_compare_btn {{out += it.inList(it.selects[i].CarID) ? \'dsl\' : \'\'; }}\" isAdd=\"false\">对比</span> {{ if(i<it.selects.length){ }} <span class=\"icon_right Js_icon_right\" ismove=\"true\" i=\"{{out+=i;}}\">右移&gt;</span> {{ } }}</div></div><span class=\"close_btn po-a Js_delete_ele\" i=\"{{out+=i;}}\"></span></td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr><tr class=\"f_price  {{out+= it.isSome(\'referprice\'); }}\"><th class=\"line_hi_31\">厂家指导价</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td>{{ out += it.selects[i].param[\'carParam\'][\'referprice\']; }}万</td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr><tr class=\"m_price  {{out+= it.isSome(\'referprice\'); }}\"><th class=\"line_hi_31\">经销商报价</th> {{ for (var i = 0; i<it.selects.length; i++) { }} <td class=\"f_w\">{{ out += it.selects[i].param[\'carParam\'][\'dealerminprice\']; }}万起<a href=\"http://cheshi.qichedaquan.com/xunjia/2_{{ out += it.selects[i].param[\'carParam\'][\'id\']; }}\" class=\"find_loc_price_btn\" target=\"_blank\">询底价</a></td> {{ } }} {{if(it.selects.length<4) {}} {{ for (var i=0; i < 4-it.selects.length; i++) { }} <td></td> {{ } }} {{ } }}</tr></tbody></table>";
},{}],10:[function(require,module,exports){
module.exports = "<ul class=\"\"><li class=\"po-a top_icon\"></li> {{~it.list :value:index}}<li class=\"po-r current {{=index == 0 ? \'active\' : \'\'}}\"> <a href=\"#\" i=\"{{=index}}\" start=\"{{=value.start}}\" end=\"{{=value.end}}\">{{=value.name}}</a><span class=\"bg_icon\"></span><span class=\"status_n_icon po-a\"></span></li> {{~}}<li class=\"po-a bot_icon\"></li></ul>";
},{}],11:[function(require,module,exports){
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
},{}]},{},[2])