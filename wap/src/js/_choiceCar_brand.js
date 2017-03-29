
var doT=require('./libs/doT.js');
var pic_master_list= require('./tpl/picMaster.html');
var sub_pic_master_list= require('./tpl/subPicMaster.html');
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
        scrollEl: null //fixed的位置
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
