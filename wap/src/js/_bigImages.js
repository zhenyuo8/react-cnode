
var doT=require('./libs/doT.js');
var big_pic_list= require('./tpl/big_images.html');
var alertMod = require('./components/alertMod.js');
require('./components/swiper.js');



var websiteURL = "https://m.api.qichedaquan.com";
var interface_PARAMES = {
	'app_id':'5d81db99484c0019cab240b3d04e9a4a'
}
$(function(){
	init()
	
})
//初始化
function init(){
	bindBigPicData();
	downMoney();
    bindEvents();
}
//事件绑定
function bindEvents(){
    $('.down_load').click(function(event) {
        alertMod.alertDiv({type:"2",des:"长按图片下载",time:"1200",fn:function(){}});
    });
    $('.share').click(function(event) {
        $('.mask').show();
        $('.zsh_shareLayer').animate({bottom:"0"}, 500);
    });
    $('.zsh_cancel,.mask').click(function(event) {
        $('.mask').hide();
        $('.zsh_shareLayer').animate({bottom:"-100%"}, 500);
    });
}

//绑定数据
function bindBigPicData(){
    var serialId = $('#serialId').val()||"";
    var categoryId = $('#categoryId').val()||"";
    var categoryType = $('#categoryType').val()||"";
    var carYear = $('#carYear').val()||"";
    var carId = $('#carId').val()||"";
    var wgId = $('#wgId').val()||"";
    var nsId = $('#nsId').val()||"";
    var imgId = parseInt($('#imgId').val()||"");
	var param = $.param({
        app_id:'5d81db99484c0019cab240b3d04e9a4a',
        serialId:serialId,
        categoryId:categoryId,
        categoryType:categoryType,
        carYear:carYear,
        carId:carId,
        wgId:wgId,
        nsId:nsId,
    });

    var imgArr = [];
	$("#swiper-wrapper_big").html('');
	sendData(websiteURL+"/carpic/serialpic/queryPicsByParams?"+param,function(data){
        for(var i=0;i<data.data.length;i++){
            imgArr.push(data.data[i].imgId);
        }
		var bigImages = doT.compile(big_pic_list)(data.data)
		$("#swiper-wrapper_big").html(bigImages);
		
        var imgIndex = imgArr.indexOf(imgId);
        swiperInit(imgIndex);
	})
}
//多少万起
function downMoney(){
	var param = $.param(interface_PARAMES);
    var serialId = $('#serialId').val()||"";
	$("#swiper-wrapper_big").html('');
	sendData(websiteURL+"/car/serial/get/"+serialId+"?"+param,function(data){
		var downMoneyNum = data.data.dealerminprice+'万起';
		$("#footer").find('strong').html(downMoneyNum);
	})
}
//swiper初始化
function swiperInit(initialSlide){
	var swiper = new Swiper('.swiper-container', {
        //nextButton: '.swiper-button-next',
        //prevButton: '.swiper-button-prev',
        pagination: '.page_num',
        paginationType: 'fraction',
        paginationFractionRender: function (swiper, currentClassName, totalClassName) {
            return '<i class="' + currentClassName + '"></i> / <i class="' + totalClassName + '"></i>'
        },
        initialSlide:initialSlide,
        preloadImages: false,
        lazyLoading: true,
        onInit: function(){
            categoryTypeTop();
            var carId = $('.big_img_wrap').eq(initialSlide).find('img').data('carid');
            var caridHref = enquiry_a(carId);
            $('#footer').find('a').attr({
                href: caridHref
            });
        },
        onSlideChangeEnd: function(swiper){
        	// var imgsrc = $('.big_img_wrap').eq(swiper.activeIndex).find('img').data('src');
            var carId = $('.big_img_wrap').eq(swiper.activeIndex).find('img').data('carid');
            var caridHref = enquiry_a(carId);
            // $('.down_load').attr({
            // 	href: imgsrc
            // });
            $('#footer').find('a').attr({
                href: caridHref
            });
            categoryTypeTop();
        }
    });
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

//询底价按钮跳转
function enquiry_a(carId){
    var categoryType = $('#categoryType').val();
    var src = 'http://dealer.m.qichedaquan.com/dealer/askprice/';
    if(categoryType==1){
        src += '2_';
    }else{
        src += '1_';
    }
    src += carId;
    return src;
}

//判断外观内饰空间等
function categoryTypeTop(){
    var temp = '';
    var categoryType = $('#categoryType').val();
    var categoryId = $('#categoryId').val();
    if(categoryType==1){
        if(categoryId==3){
            temp = "外观";
        }else if(categoryId==4){
            temp = "内饰";
        }else if(categoryId==5){
            temp = "空间";
        }
    }else if(categoryType==2){
        if(categoryId==1){
            temp = "官方图";
        }else if(categoryId==2){
            temp = "图解";
        }
    }else if(categoryType==3){
        if(categoryId==2){
            temp = "车展图片";
        }
    }
    $('.top').find('b').html(temp);
}