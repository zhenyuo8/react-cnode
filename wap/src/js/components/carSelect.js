

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

