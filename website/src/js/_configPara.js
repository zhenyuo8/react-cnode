
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
