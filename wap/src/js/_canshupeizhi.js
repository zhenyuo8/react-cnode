$(function(){
    var doT=require('./libs/doT.js');
    var carInfoTpl = require('./tpl/carbiInfo_1.html');
    var carTitleTpl = require('./tpl/carbiInfoTitle.html');
    var carbiHeaderTpl = require('./tpl/carbiHeader_1.html');
    // var carconstListTpl = require('./tpl/duibiliebiao.html');
    // var compareBoto = require("./_carCompareLayer");
    
    require('./components/compareMode.js');
    require('./libs/iscroll.js')
    var configGJ = require('./components/config.js')
    var paraMod = require('./components/dataParse');
    // var accord_num_list= require('./tpl/accordNum_1.html');
    var selectMod = require('./components/carSelect');
    var compareBoto = require('./components/carCompareLayer');
    var cardata = config;
    // require('./_choiceCar.js');
    require('./_choiceCar_brandMask.js');
    //require('./_compareMode.js');


    $(function(){
        init();
    });
    //模版渲染方法
    //右侧列表数据渲染
    function reInfo(data) {
        var infoHtmlCompile = doT.compile(carInfoTpl)(data);
        $('#carInfoP').html(infoHtmlCompile);
    }
    // 左侧列表数据渲染
    function reInfoTitle(data) {
        var infoTitleCompile = doT.compile(carTitleTpl)(data);
        $('#carbiInfoTitle').html(infoTitleCompile);
    }
    //head数据渲染
    function reInfoHeader(data) {
        var infoHeaderCompile = doT.compile(carbiHeaderTpl)(data);
        $('.carbiInfoHeader').html(infoHeaderCompile);
    }

    // //抽屉对比列表数据渲染
    // function reInfoliebiao(data) {
    //     var infoduibiListCompile = doT.compile(carconstListTpl)(data);
    //     $('#duibiliebiao').html(infoduibiListCompile);
    // }

    //初始化数据模型
    var M = paraMod(function (D) {

        //每次当数据发生变化后，需要重新执行这个方法
        reInfo(D);
        reInfoTitle(D);
        reInfoHeader(D);
        // reInfoliebiao(D);
        configGJ.destroyed();
        configGJ.refresh();
        configGJ.mounted();
    });
    M.init(cardata.data);

     jQuery('.hide_alike').on('click', 'p', function (e) {
        jQuery(this).toggleClass('checked');
        var da = {}
        jQuery('.hide_alike p').each(function (i, n) {
            var elm = jQuery(n), m = elm.attr('m');
            da[m] = elm.hasClass('checked');
        });
        M.visibal(da);
     });

     $('.carbiInfoHeader').on('click','li em',function(){
         var i = parseInt(jQuery(this).attr('i'));
        if (M.selects.length <=1) {
            alert('至少需要保留一条信息');
            return;
        }
        
        M.del(i);
        configGJ.destroyed();
        configGJ.refresh();
        configGJ.mounted();
     })
    function init(){
        catalog();
    }
    

    //目录
    function catalog(){
        var param_type_list_top = $('.param_type_list').height()-$('.param_title').height();
        var h = $('.page-header').height();

        $('.param_catalog_list').on('click', 'li', function(event) {
            event.preventDefault();
            var textT = $(this).text().trim();
            var titleBOX = $('#carbiInfoTitle .title_box');
            for(var i=0;i<titleBOX.length;i++){
                console.log(titleBOX.eq(i).text().trim()==textT)
                if(titleBOX.eq(i).text().trim()==textT){
                    var target_top = titleBOX.eq(i).offset().top - param_type_list_top-h;
                    $('html, body').animate({scrollTop:target_top}, 500);
                }
            }
        }); 
    }
    
    //修复上下滑动背景跟随滑动
    var right_contrast_module = $('.right_contrast_module')[0];
    right_contrast_module.addEventListener('touchmove', function(event) {
         event.preventDefault();// 阻止浏览器默认事件
    }, false);
    
})