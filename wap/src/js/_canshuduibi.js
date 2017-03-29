$(function(){
    var doT=require('./libs/doT.js');
    var carInfoTpl = require('./tpl/carbiInfo.html');
    var carTitleTpl = require('./tpl/carbiInfoTitle.html');
    var carbiHeaderTpl = require('./tpl/carbiHeader.html');
    // var carLeftTpl = require('./tpl/configParaLeft.html');
    // var compareBoto = require("./_carCompareLayer");
    require('./libs/iscroll.js')
    var configGJ = require('./components/config.js')
    var paraMod = require('./components/dataParse');
    // var accord_num_list= require('./tpl/accordNum_1.html');
    var selectMod = require('./components/carSelect');
    var cardata = config;
    // require('./_choiceCar.js');
    require('./_choiceCar_brandMask.js');
    require('./components/compareMode.js');
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
    //初始化数据模型
    var M = paraMod(function (D) {

        //每次当数据发生变化后，需要重新执行这个方法
        reInfo(D);
        reInfoTitle(D);
        reInfoHeader(D);
        configGJ.destroyed();
        configGJ.refresh();
        configGJ.mounted();
    });
    M.init(cardata.data);


    init();
    function init(){
        bindEvents();
    }
    function bindEvents(){
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
         

        //添加车款
        $('#right_style_module').on('click', 'li', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            selectMod.data.carInfo(id,function(res){
                cardata.data.push(res);
                M.init(cardata.data);
                $('.choice_car').hide();
                $('.chouti').hide();
                $('.mask_area').hide();
                $(".right_style_module").animate({right:"-100%"}, 0);
            })
        });
    }

})