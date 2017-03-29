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