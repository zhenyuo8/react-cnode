/**
 * Created by zhangbs on 2016/12/28.
 */
//define(function (require, exports, module) {
$(function(){
    var compareBoto = require('./mod/carCompareLayer')
    tab('.head_ul','.content','click');
    //n个车款符合条件,车型选车
    var carNum = 0;

    var docHeight = $(document).height();
    init();
    function init(){
        carditionTab();
        bindEvent();
        gotoTop();
        setLastChilMar()
    }
    
    function carditionTab(){
        $('.cart_type').on('click','.accord',function(event){
            event.stopPropagation();
            var tParent = $(this).parents('.t_parent').offset().top;
            var t = $(this).offset().top - tParent + $(this).height()+11;
            var id = $(this).attr("data-id");
            var ids = $(this).attr("data-ids");
            var name = $(this).closest('li').find('.str_bp strong').text()
            var urlspell = $(this).attr("data-urlspell");
            //点击标签切换
            $('.cart_type').find('.accord').removeClass('active');
            $(this).addClass('active');

            carNum = $(this).parents('li').index();
            //设置文档高度
            if ($(document).height() > docHeight) {
                $('.content_wrap').css('margin-bottom', '248px');
            }
            if ($('.drop_box').is(':hidden')) {
                boxClick(id, t, ids, name,urlspell);
            } else {
                $('.drop_box').toggle().css({
                    "left": 0,
                    "top": t
                })
                if ($('.drop_box').css('display') == 'none') {
                    $('.cart_type').find('.accord').removeClass('active');
                    $('.content_wrap').css('margin-bottom', '48px');
                }
            }
        });
    }
    function bindEvent(){
        //全部轿车SUV跑车切换
        $('.hot_left').find('li').mouseover(function(){
            $(this).parents('.hot_left').find('li').removeClass('active').end().end().addClass('active');
        });
        //按关注按价格排序切换
        $('.sort_ul').find('li').click(function(){
            $(this).parents('.sort_ul').find('li').removeClass('active').end().end().addClass('active');
        });
        //下拉框点击选中效果
        $('.s1_select').find('li').click(function(){
            var text = $(this).find('a').html();
            $(this).parents('.s1_select').find('div').find('i').html(text);
        }).end().hover(function(){
            $(this).find('ul').show();
        },function(){
            $(this).find('ul').hide();
        });
        //点击对比按钮，为了兼容旧dom
        $('.car_table').on('click','a.compare',function(){
            var id = $(this).attr('id')
            var text = $(this).attr('text')
            if(!id){
                id = $(this).find('i').attr('id')
                text = $(this).parents('.b_car_list').find('.car_style a').html()
            }
            compareBoto.addCar({
                id: id,
                text: text
            })
        });

        //点击对比按钮，为了兼容旧dom
        $('.brand_contrast_table').on('click','a.contrast_btn',function(){
            var id = $(this).attr('id')
            var text = $(this).attr('text')
            if(!id){
                id = $(this).find('i').attr('id')
                text = $(this).parents('.b_car_list').find('.car_style a').html()
            }
            compareBoto.addCar({
                id: id,
                text: text
            })
        });

        $(document).on('click',function(){
            $('.drop_box').hide();
            $('.cart_type').find('.accord').removeClass('active');
        })
    }

    function tab(ele,kzele,type){
        $(ele).find('li').each(function (index) {
            $(this).on(type,function(){
                $(ele).find('li').removeClass('active').eq(index).addClass('active');
                $(kzele).find('li').hide().eq(index).show();
            })
        })
    }

//});
//carConditionSelect页面使用
    function boxClick(id, t,ids, name,urlspell) {
        if (id && id != null && id != "") {
            $.ajax({
                url: "/carConditionSelect/queryCars?carIds="+ ids,
                dataType: "json",
                success: function (data) {
                    if (data.code == "1000" || data.code == "9999") {
                        buildCarTabHtml(data.data, name,urlspell);
                        $('.drop_box').toggle().css({
                            "left": 0,
                            "top": t
                        })
                        if ($('.drop_box').css('display') == 'none') {
                            $('.cart_type').find('.accord').removeClass('active');
                            $('.content_wrap').css('margin-bottom', '48px');
                        }
                    }
                },
                error: function (d) {
                }
            });
        }
    }
//carConditionSelect页面使用
    function buildCarTabHtml(data,name,urlspell) {
        var html = "";
        var h=45;
        if (data!=undefined && data!=null ) {
            h = data.length * 65 + 45;
        }
        if (h > 254) {
            h = 254;
        }
        if (h == 45) {
            h += 30;
        }
        $(".tab_wrap").css('height', h + "px");
        if (data!=undefined && data!=null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr class="b_car_list"><td class="car_style">';
                html += '<a target="_blank" href="/carparam/'+data[i].id+'?urlspell='+urlspell+'">' + data[i].caryear + '款 ' + data[i].name + '</a>';

                if (data[i].producestate!=undefined && data[i].producestate == '停产') {
                    html += '<span class="label gray">'+data[i].producestate+'</span>';
                }

                if (data[i].purchaseTaxrelief!=undefined && data[i].purchaseTaxrelief!=null && data[i].purchaseTaxrelief!="" && "无"!=data[i].purchaseTaxrelief) {
                    html += '<span class="label blue">'+data[i].purchaseTaxrelief+'</span>';
                }

                if (data[i].subsidies!=undefined && data[i].subsidies!=null && data[i].subsidies!="") {
                    html += '<span class="label" style="background-color:#e53939">补贴</span>';
                }

                if (!isNull(data[i].perfDriveType) && !isNull(data[i].underPanForwardGearNum) && !isNull(data[i].underpanTransmissionType)) {
                    html += '<strong class="about">' + data[i].perfDriveType + '  ' + data[i].underPanForwardGearNum + '档' + data[i].underpanTransmissionType;
                }else if (isNull(data[i].perfDriveType) && !isNull(data[i].underPanForwardGearNum) && !isNull(data[i].underpanTransmissionType)) {
                    html += '<strong class="about">' + data[i].underPanForwardGearNum + '档' + data[i].underpanTransmissionType;
                }else if (isNull(data[i].perfDriveType) && isNull(data[i].underPanForwardGearNum) && !isNull(data[i].underpanTransmissionType)) {
                    html += '<strong class="about">' +  data[i].underpanTransmissionType;
                }else if (isNull(data[i].perfDriveType) && isNull(data[i].underPanForwardGearNum) && isNull(data[i].underpanTransmissionType)) {
                    html += '<strong class="about">--';
                }else if (!isNull(data[i].perfDriveType) && isNull(data[i].underPanForwardGearNum) && !isNull(data[i].underpanTransmissionType)) {
                    html += '<strong class="about">' + data[i].perfDriveType + '  ' + data[i].underpanTransmissionType ;
                }
                html += '</td><td>';
                html += '<div class="ow">';
                html += '<div class="iw" style="width: ' + data[i].pv + '%"></div>';
                html += '</div></td><td>';
                var zdj = data[i].referprice;
                if (zdj && zdj != null && zdj != "") {
                    html += '<span class="counter"><a target="_blank" href="/carLoanCalculator/'+data[i].id+'"><i></i></a>' + data[i].referprice + '万</span>';
                } else {
                    html += '<span class="counter"><a target="_blank" href="/carLoanCalculator/'+data[i].id+'"><i></i></a>--</span>';
                }
                html += '</td><td>';
                html += '<a href="javascript:;"><strong class="guide_price">'+(data[i].dealerminprice>0?data[i].dealerminprice:"0.00")+'万起</a>';
                html += '<a href="http://cheshi.qichedaquan.com/xunjia/2_'+data[i].id+'" class="inquiry" target="_blank">询底价</a>';
                html += '</td><td>';
                html += '<a href="http://pic.qichedaquan.com/serialpic/toindex/'+urlspell+'?carId='+data[i].id+'" target="_blank">图片</a>';
                html += '<a href="/carparam/'+data[i].id+'?urlspell='+urlspell+'" target="_blank">配置</a>';
                html += '<a href="javascript:;" class="compare contrast_btn" id="'+data[i].id+'" text="'+ name + '-' + data[i].caryear + '款 ' + data[i].name +'"><b></b><i></i>对比</a>';
                html += '<span href="javascript:;" class="compare_y">已对比</span>';
                html += '</td>';
                html += '</tr>';
            }
        } else {
            html += "<tr><td>无数据</td><td>无数据</td><td>无数据</td><td>无数据</td><td>--</td></tr>"
        }

        $("#carTabBody").html(html);
        compareBoto.setBtnState()
    }

    function isNull(val){
        if (val && typeof(val)!=undefined && val!=''){
            return false;
        }else{
            return true;
        }
    }

    function gotoTop(){
        //02.28 回到顶部按钮失效  dongbo修复
        $(window).on('scroll',function(){
            if($(window).scrollTop()>500){
                $("#back_to_top").show();
            }else{
                $("#back_to_top").hide();
            }
        })
        //回到顶部
        $('#back_to_top').on('click',function(){
            $("html,body").animate({scrollTop:0}, 500);
        })
    }
    //02.29  置换按钮折行   设置margin dongbo修复
    function setLastChilMar(){
        $('.btn_list a:last-child').css('margin-right','0')
    }

});

//});

