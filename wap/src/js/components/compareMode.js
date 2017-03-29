	//参数配置页头部车款 添加到对比列表
	var doT=require('./../libs/doT.js');
	var configGJ = require('./../components/config.js');
	var selectMod = require('./carSelect');
    var compareBoto = require('./carCompareLayer');
	var accord_num_list= require('./../tpl/accordNum_1.html');
	// require('./_choiceCar.js');
    require('./../_choiceCar_brandMask.js');

    $(function(){
        init();
    })
    function init(){
        bindEvents();
        letterFixed();
    }
    function bindEvents(){
        // 抽屉效果
        $(".brand_type").on("click",".brand_box ul li",function(){
            $(".mask_area").fadeIn();
            $(".right_module").animate({right:"0"}, 500);
        })

        $(".mask_area").on("click",function(){
            $(this).fadeOut();
            $(".right_module").animate({right:"-100%"}, 500);
        })
        $("#hot_list").on("click","li",function(){
            $(".mask_area").fadeIn();
            $(".right_module").animate({right:"0"}, 500);
        })

        // 点击字母弹出当前字母
        $(".letter_list ul li").on("touchstart touchend",function(event){
            var letterText = $(this).find("a").text();
            $(this).find("a").addClass('checked')
            $(this).siblings('li').find("a").removeClass('checked');
            if(event.type == 'touchstart'){
                $(".letter_alert").show();
                $(".letter_alert span").text(letterText);
            }else if(event.type == 'touchend'){
                $(".letter_alert").hide();
            }
        })
        //参数对比页配置页 添加一条数据
        $('.carbiInfoHeader').on('click','.add_type',function(){
            var len = $('.carbiInfoHeader').find('li').length;
             if(len>4){
                alert("最多对比4个车款")
                return;
             }
            $('.choice_car').show();
            $('.chouti').show();
            $(".right_module").animate({right:"-100%"}, 500);
        }).on('click', 'li i', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var text = $(this).data('text');
            var dealerminprice = $(this).data('dealerminprice');
            var price = $(this).data('price');
            compareBoto.addCar({
                id: id,
                text: text,
                dealerminprice: dealerminprice,
                price:price
            })
        });

        $('#right_module').on('click', 'dl', function(event) {
            event.preventDefault();
            var urlspell = $(this).data('urlspell');
            getQueryCarparam(urlspell,function(res){
                $("#right_style_module").html('');
                var accorddatas = filterCarList(res.data.datas);
                var accordmaster = doT.compile(accord_num_list)(accorddatas)
                $("#right_style_module").append(accordmaster);
                $(".right_style_module").animate({right:"0"}, 500);
            })
            
        });

        //添加车款
        $('#right_style_module').on('click', 'li', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var text = $(this).data('text');
            var dealerminprice = $(this).data('dealerminprice');
            var price = $(this).data('price');
            selectMod.data.carInfo(id,function(res){
                // cardata.data.push(res);
                // M.init(cardata.data);
                // var id = $(this).data('id');
                
                compareBoto.addCar({
                    id: id,
                    text: text,
                    dealerminprice: dealerminprice,
                    price:price
                })
                $('.mask_area').hide();
                $('.choice_car').hide()
                $(".right_module").animate({right:"-100%"}, 0);
                $(".right_style_module").animate({right:"-100%"}, 0);
                compareBoto.setBtnState();
            })
        });


        //参数配置页
        $('.contrast_list').on('click','.add_contrast_type',function(){
            var len = $('#duibiliebiao').find('li').length;
            if(len>=4){
                alert("最多对比4个车款");
                $('.mask_area').hide();
                $(".right_contrast_module").animate({right:"-100%"}, 500);
                return;
            }
            $('.choice_car').show();
            $('.mask_area').hide();
            $(".right_contrast_module").animate({right:"-100%"}, 500);
         })

        //综述页对比功能
        $('.zsh_onsellCar_news').on('click','.in_contrast',function(event){
            event.preventDefault();
            var id = $(this).data('id');
            var text = $(this).data('text');
            var dealerminprice = $(this).data('dealerminprice');
            var price = $(this).data('price');
            console.log(id)
            compareBoto.addCar({
                id: id,
                text: text,
                dealerminprice: dealerminprice,
                price:price
            })
        })
    }
      
    /**
     * 按年款，功率过滤车款
     */
    function getCarKey(el){
        var key = ''
        if(el.fueltype != undefined && el.fueltype == 4){
            //电动车
            key = '电动车' + (el.electricPeakpower ? '#' + el.electricPeakpower + 'Kw' : '')
        }else if(el.fueltype != undefined && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')>=0){
            //机动车
            key = el.engineExhaustForFloat + "#" + (el.engineMaxPower ? el.engineMaxPower+'Kw' : '') + "#" + el.engineAddPressType;
        }else if(el.fueltype != undefined  && el.fueltype != 3 && el.fueltype != 4 && el.engineAddPressType && el.engineAddPressType.indexOf('增压')==-1){ 
            //机动车-没有增压
            key = el.engineExhaustForFloat + "#" + el.engineMaxPower + "Kw";
        }else if(el.fueltype != undefined  && el.fueltype == 3){ 
            //混动
            key = el.engineExhaustForFloat + "#发动机" + el.engineMaxPower + "Kw#发电机：" + el.engineMaxPower + "Kw#" + el.engineAddPressType
        }else{  
            key = '-#-'
        }
        return key
    }
    function filterCarList(data){
        //engineExhaustForFloat + 
        var list = []
        $.each(data,function(i,el){
            // console.log(el)
            var curYear = indexOf(list,function(cur){
                return cur.caryear ===  el.caryear
            })
            
            if(!curYear){ 
                list.push({
                    caryear: el.caryear,
                    data: []
                })
                curYear = list[list.length-1]
            }
            var list2 = curYear.data
            var key = getCarKey(el)
            var curLevel = indexOf(list2,function(cur){
                return cur.level === key
            })
            if(!curLevel){
                list2.push({ 
                    level: key,
                    data: []
                })
                curLevel = list2[list2.length-1]
            }
            curLevel.data.push(el)
        })
        return list
    }
    function indexOf(arr,callback){
        for(var i=0;i<arr.length;i++){  
            var flag = callback(arr[i])
            if(flag){   
                return arr[i]
            }
        }
        return null
    }
    function getQueryCarparam(urlspell,fn){
        $.ajax({  
          url: 'https://m.api.qichedaquan.com/car/carparm/queryCarparam',
          data: { 
            'app_id': '5d81db99484c0019cab240b3d04e9a4a',
            'urlspell': urlspell,
          },
          dataType: 'jsonp',
          success: function(res){  
            fn&&fn(res);
          }
        })
    }
    //字母索引位置固定
    function letterFixed(){
        var brandlistPosition = $(".letter_list").position().top;
        var $letterList = $(".letter_list");
        $(window).scroll(function(){
            if($(window).scrollTop() >= brandlistPosition){
                $letterList.addClass('letter_list_fix');
            }else{
                $letterList.removeClass('letter_list_fix');
            }
        })
    }