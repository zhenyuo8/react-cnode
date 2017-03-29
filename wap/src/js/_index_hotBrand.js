/*****
 *@author: linyh
 *@from: Global style index_hotBrand(热门品牌)
 *@description: 陈璐
 *@date: name (2017.03.10)
*/

$(function(){

    var doT = require('./libs/doT');
    var brandTypeTpl = require('./tpl/hotBrand.html');

    var pageId = getUrlParam('masterId');   //url中参数:主品牌id

    // 初始化
    function init(){
        carTypeHtml();
    }

    // 获取热门品牌数据
    function getHotBrandData(currentPageId,loadHotBrand){
        $.ajax({
            url: ' https://m.api.qichedaquan.com/car/carmaster/seriallist/'+currentPageId,
            type: 'GET',
            data: {
                'app_id':'5d81db99484c0019cab240b3d04e9a4a'
            },
            dataType: 'jsonp',
            success: function(jsonData){
                loadHotBrand(jsonData);
            }
        });
    }

    //模版渲染方法
    //重新渲染模板数据
    function carTypeHtml(){
        var $brandTypeModule = $("#brandTypeModule");
        getHotBrandData(pageId,function(jsonData){
            var carTypeData = jsonData.data;

            var typeHtmlCompile = doT.compile(brandTypeTpl)(carTypeData);
            $(typeHtmlCompile).appendTo($brandTypeModule);

            mbx(carTypeData);
        })
    }

    // 面包屑、标题
    function mbx(brandData){
        var brandName = brandData.mastername;
        var indexHref = "m.qichedaquan.com";
        $('<a href='+indexHref+'>首页</a><i></i><span>'+brandName+
          '</span>').appendTo($('.small_nav'));

        // 标题显示当前品牌
        $(".title_extra").text(brandName);
    }

    init();

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }

});
