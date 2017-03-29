/*****
 *@author: jianingning
 *@from: Global style summarize(车型中综述页)
 *@description:
 *@date: name (2017.02.23)
*/


$(function(){
    require('./components/compareMode.js');
    require('./_mod_contrast.js');
    Comparison();
    setStyle();
    tabSlide();

    function setStyle(){
        $('.onsellCar_news').each(function(){
            $(this).find('.onsellCar_news_type').last().css({
                'margin-top':'0.56rem',
                'height':'1.0rem',
                'border-top':'1px solid #ebedef'
            })
        })
    }
    $('#right_style_module').on('click','li',function(){
        isBodyScroll(false);
    })
    //停售在售抽屉弹出禁止body滑动
    $('.classify').delegate('li','click',function(){
        isBodyScroll(true);
        $('.mask_area').css('display','none');
    })
    $('.drawerList li,.mask2').on('click',function(){
        isBodyScroll(false);
    })
    //城市选择抽屉弹出禁止body滑动
    $('.demo_title').delegate('#city','click',function(){
        isBodyScroll(true);
        $('.mask_area').css('display','none');
    })
    $('.current_province dd,.zxs_province span').on('click',function(){
        isBodyScroll(false);
    })
    $('.right_module_city').delegate('.checked_province','click',function(){
        $('.mask_area').css('display','none');
    })
    //对比抽屉弹出禁止body滑动
    $('.zsh_cps_duibi').on('click',function(){
        isBodyScroll(true);
    })
    $('.delete_all,.mask_area,.begin_contrast').on('click',function(){
        isBodyScroll(false);
    })
    //全部在售、未上市、停售tab切换
    function tabSlide(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '',
            paginationClickable: true,
            autoHeight: true,
            onSlideChangeStart: function(swiper){
                var li_index=swiper.activeIndex;
                $('.onsellCar_list li').eq(li_index).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
            }
        });

        $('.onsellCar_list li').on('click',function(){
            var index=$(this).index();
            $(this).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
            swiper.slideTo(index, 500, false);

            var caroaramId=$(this).attr('id');
            if(caroaramId==0) {
              $('#onSale').addClass('swiper-slide-active');
              $('#unlisted').removeClass('swiper-slide-active');
              $('#onStopSale').removeClass('swiper-slide-active');
              $('.onsellCar_list li').eq(0).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
              rightConfigInfo(1);
            }

            if(caroaramId==1) {
              $('#unlisted').addClass('swiper-slide-active');
              $('#onSale').removeClass('swiper-slide-active');
              $('#onStopSale').removeClass('swiper-slide-active');
              $('.onsellCar_list li').eq(1).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');

            }
            if(caroaramId==2) {
              $('#onStopSale').addClass('swiper-slide-active');
              $('#unlisted').removeClass('swiper-slide-active');
              $('#onSale').removeClass('swiper-slide-active');
              $('.onsellCar_list li').eq(2).addClass('onsellCar_active').siblings().removeClass('onsellCar_active');
              rightConfigInfo(-1);
            }
        })
    }

    //刷新抽屉中数据
    //获取车系年款 排量 变速箱类型
    var rightConfigInfo=function(salestate){
        var urlspell=$("#urlspell").val();
        var path="/carSerialSummary/getCarSerialPropertiyConfig?urlspell="+urlspell+"&salestate="+salestate;
        $.ajax({
            url:path,
            dataType:'json',
            success:function(result) {
                $("#drawerList_0").empty();
                $("#drawerList_1").empty();
                $("#drawerList_2").empty();
                var engineexhaustforfloat_str='<li class="zsh_select">不限</li>';
                var caryear_str='<li class="zsh_select">不限</li>';
                var underpantransmissiontype_str='<li class="zsh_select">不限</li>';
                var engineexhaustforfloatArray=result.engineexhaustforfloat.split(",");
                var caryearArray=result.caryear.split(",");
                var underpantransmissiontypeArray=result.underpantransmissiontype.split(",");
                $.each(engineexhaustforfloatArray, function(i, item) {
                    engineexhaustforfloat_str=engineexhaustforfloat_str+'<li>'+item+'</li>'
                });
                $.each(caryearArray, function(i, item) {
                    caryear_str=caryear_str+'<li>'+item+'款</li>'
                });
                $.each(underpantransmissiontypeArray, function(i, item) {
                    underpantransmissiontype_str=underpantransmissiontype_str+'<li>'+item+'</li>'
                });
                $("#drawerList_0").html(caryear_str);
                $("#drawerList_1").html(engineexhaustforfloat_str);
                $("#drawerList_2").html(underpantransmissiontype_str);
                //绑定点击事件
                var brand_year_car_choice_data="";
                var brand_type_car_choice_data=[];
                var brand_num_choice_data="";
                var zidongStr = "自动,半自动,手自一体,CVT无级变速,双离合,电动车单速变速箱,E-CVT无级变速";
                var zidongArr = zidongStr.split(',');
                var zidongList=[];
                for(var i=0;i<zidongArr.length;i++){
                    zidongList.push(":contains('" +zidongArr[i] + "')");
                }

                $(".drawerList li").on("click",function(event){
                    $('.zsh_drawer').css({
                        right: "-100%",
                        transition: "right .6s"
                    });
                    isBodyScroll(false);
                    $('.mask2').fadeOut();
                    $('.slider_btn').hide();
                    //检查当前是哪个列表
                     var choiceItem="";
                     var current_select_list_id=$(".onsellCar_active").attr("id");
                     //检查点击是哪一个分组
                    var check_group_id=$(this).parent("ul").attr("id").toString().split("_")[1];
                    var check_text = $(this).text();
                    //用于筛选用的串
                    var join_text="";
                    if(check_text !="不限"){
                      join_text=":contains('" +check_text + "')";
                    }
                    //设置当前为选中状态
                    $(this).siblings().removeClass("zsh_select");
                    $(this).addClass("zsh_select");
                    //设置选中后在页面回显选中项 针对 在售 和停售 进行处理
                    if(check_group_id==0){
                        if(check_text !="不限"){
                            if(current_select_list_id==0){
                                $(".z_year  i").html(check_text);
                                $(".z_year").addClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_year  i").html(check_text);
                                $(".t_year").addClass("current_select");
                            }
                        }else{
                            if(current_select_list_id==0){
                                $(".z_year  i").html("年款");
                                $(".z_year").removeClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_year  i").html("年款");
                                $(".t_year").removeClass("current_select");
                            }
                        }
                        brand_year_car_choice_data=join_text;
                    }
                    if(check_group_id==1){
                        if(check_text !="不限"){
                            if(current_select_list_id==0){
                                $(".z_pail  i").html(check_text);
                                $(".z_pail").addClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_pail  i").html(check_text);
                                $(".t_pail").addClass("current_select");
                            }
                        }else{
                            if(current_select_list_id==0){
                                $(".z_pail  i").html("排量");
                                $(".z_pail").removeClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_pail  i").html("排量");
                                $(".t_pail").removeClass("current_select");
                            }
                        }
                        brand_num_choice_data=join_text;
                    }
                    if(check_group_id==2){
                        if(check_text !="不限"){
                            if(current_select_list_id==0){
                                $(".z_bsx i").html(check_text);
                                $(".z_bsx").addClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_bsx i").html(check_text);
                                $(".t_bsx").addClass("current_select");
                            }
                        }else{
                            if(current_select_list_id==0){
                                $(".z_bsx i").html("变速箱");
                                $(".z_bsx").removeClass("current_select");
                            }else if(current_select_list_id==2){
                                $(".t_bsx i").html("变速箱");
                                $(".t_bsx").removeClass("current_select");
                            }
                        }
                        if(check_text=='自动'){
                            brand_type_car_choice_data=zidongList.toString();
                        }else{
                            brand_type_car_choice_data=join_text;
                        }
                    }

                 //进行列表过滤
                 if(current_select_list_id==0){
                    choiceItem=$('#onSale .onsellCar_news');
                 }
                 if(current_select_list_id==2){
                    choiceItem=$('#onStopSale .onsellCar_news');
                 }
                  //上面的准备工作完成 下面开始进入主题进行表格过滤
                  if(brand_year_car_choice_data ==""  && brand_type_car_choice_data == "" && brand_num_choice_data=="") {
                      console.log("没有选择");
                      choiceItem.hide().show();
                  } else{
                    //主题进行表格过滤
                     if(brand_year_car_choice_data !=""){
                         choiceItem=choiceItem.hide().filter(brand_year_car_choice_data).show();
                     }
                    if(brand_type_car_choice_data.length != "" ){
                        choiceItem=choiceItem.hide().filter(brand_type_car_choice_data).show();
                     }
                    if(brand_num_choice_data.length !="" ){
                        choiceItem=choiceItem.hide().filter(brand_num_choice_data).show();
                    }
                     //针对表小项没有内容展示
                     if(current_select_list_id==0 || current_select_list_id==2){

                        if(current_select_list_id==0){
                            var contrast_table_title_list=$("#onSale .tb_content");
                        }else   if(current_select_list_id==2){
                            var contrast_table_title_list=$("#onStopSale .tb_content");
                        }
                        for(var i=0;i<contrast_table_title_list.length;i++){
                            var contrast_table_title_list_child=$(contrast_table_title_list[i]).children(".onsellCar_news");
                            var contrast_table_title_list_child_length=contrast_table_title_list_child.length;
                            var disply_none_count=0;
                            for(var j=0;j<contrast_table_title_list_child.length;j++){
                                if($(contrast_table_title_list_child[j]).css("display")=="none"){
                                    disply_none_count++;
                                }
                            }
                            if(disply_none_count==contrast_table_title_list_child_length){
                                $(contrast_table_title_list[i]).css("display","none");
                            }else{
                                $(contrast_table_title_list[i]).css("display","");
                            }
                        }
                      //针对表大项没有内容展示
                     var disply_none_count=0;
                        for(var j=0;j<contrast_table_title_list.length;j++){
                            if($(contrast_table_title_list[j]).css("display")=="none"){
                                disply_none_count++;
                            }
                        }
                        console.log(disply_none_count+"/"+contrast_table_title_list.length)
                        if(current_select_list_id==0){
                            var contrast_table_title_list=$("#onSale .tb_content");
                            if(disply_none_count==contrast_table_title_list.length){
                                $('#onSale').find(".empty_condition").show();
                            }else{
                                $('#onSale').find(".empty_condition").hide();
                            }
                        }else  if(current_select_list_id==2){
                            var contrast_table_title_list=$("#onStopSale .tb_content");
                            if(disply_none_count==contrast_table_title_list.length){
                                $('#onStopSale').find(".empty_condition").show();
                            }else{
                                $('#onStopSale').find(".empty_condition").hide();
                            }
                        } 


                     }

                  }
                  tabSlide();
                 $('.onsellCar_list .onsellCar_active').trigger('click');

                });

            }
        });
    }

    // 获取地理位置
    getLocation();

    function getLocation(){
        if (navigator.geolocation){
            var option = {
                    enableHighAccuracy : true,
                    timeout : 5000,
                    maximumAge : 0
                };
            navigator.geolocation.getCurrentPosition(showPosition,errorPosition,option);
        }else{
            console.log( "该浏览器不支持获取地理位置.");
        }
    }
    // 获取位置成功
    function showPosition(position){
        var thisPosLat = position.coords.latitude;
        var thisPosLon = position.coords.longitude;

        $("#posLat").val(thisPosLat);
        $("#posLon").val(thisPosLon);
    }
    // 获取位置失败
    function errorPosition(error){
         switch(error.code)
         {
            case error.PERMISSION_DENIED:
            console.log("用户拒绝获取地理位置请求.")
            break;

            case error.POSITION_UNAVAILABLE:
            console.log("网络信息不可用.")
            break;

            case error.TIMEOUT:
            console.log("请求地理位置超时.")
            break;

            case error.UNKNOWN_ERROR:
            console.log("未知错误.")
            break;
        }
    }


    //加入对比悬浮菜单
    function Comparison(){
        $(window).scroll(function(){
            if($(window).scrollTop()>$('.zsh_parameter').offset().top){
                $('.zsh_comparison').show();
            }else{
                $('.zsh_comparison').hide();
            }
        })
        // $('.in_contrast').on('click',function(){
        //     $(this).text('已加入对比').css('color','#a4a4a4');
        //     $(this).unbind('click');
        //     var num=parseInt($('.duibiNum').text());
        //     num++;
        //     $('.duibiNum').text(num);
        // })
    }

    //分享弹层的显示
    var Share={
        showShare:function(){
            var share_mask=$('.mask3');
            var share_content=$('.zsh_shareLayer');
            $('.zsh_share,.zsh_cps_share').on('click',function(event){
                isBodyScroll(true);
                event.stopPropagation();
                share_mask.fadeIn();
                share_content.css({
                    bottom: "0",
                    transition: "bottom 0.4s"
                })
            });
            //点击取消
            $('.zsh_cancel,.mask3').on('click',function(event){
                isBodyScroll(false);
                event.stopPropagation();
                share_mask.fadeOut();
                share_content.css({
                    bottom: "-4.36rem",
                    transition: "bottom 0.4s"
                })
            })
        },
        //分享弹层中点击微信
        clickWX:function(){
            function myBrowser(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
            };
            var mb = myBrowser();
            $('.zsh_shareLayer li').eq(0).on('click',function(){
                if ("Safari" == mb) {
                    $('.zsh_sf_mask').fadeIn();
                    $('.zsh_sf_layer').show();
                }else{
                    //直接调用
                }
            });
            $(document).on('click',function(event){
                event.stopPropagation();
                var target=event.target;
                if($(target).attr('class')=='zsh_wx'){
                    return;
                }else{
                    $('.zsh_sf_mask').fadeOut();
                    $('.zsh_sf_layer').hide();
                    $('.mask3').fadeOut();
                    $('.zsh_shareLayer').css({
                        bottom: "-4.36rem",
                        transition: "bottom 0.4s"
                    })
                }
            })
        }
    }
    Share.showShare();
    Share.clickWX();
})
