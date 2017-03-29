/*
 *created by linyh in 2017/1/19.
 *综述页、车型综述页、年款综述页、车型对比页交互
*/
$(function() {

    var compareBoto = require('./mod/carCompareLayer');
    var favoriteMod = require('./mod/favorite');
    // var shareLayer = require('./_shareLayer');
	var citySelect = require('./mod/citySelect');
    // require('./jquery-1.11.2.min.js');

    // require('./layer/skin/layer.css');

    // 列表顶部TAB切换事件
    $(".sell_type").on("click","li", function(event) {
        var id=this.id;
        if(id=='-1'){
            return;
        }
        var caryear = $(".imgs_c_y_li").siblings(".imgs_year_b").attr("id");
        $(this).parents('.sell_type').find('li').removeClass('active').find('.stop_sell').removeClass('active').end().end().end().addClass('active');
        if(id == 0 || id == 1){
            showDiv(id)
        }
    });
    init();
    function init(){
        noColorMod();
    }

    //没有颜色块则不显示
    function noColorMod(){
        var  len = $('#color_scroll').find('a').length;
        if(len<=0){
           $('.color_list').remove();
           $('#b_img').css({
            'margin-bottom': '10px'
           });
        }
    }
    function showDiv(idx){
        $("#unlisted").css("display","none");
        $("#onSale").css("display","none");
        $("#stopSale").css("display","none");
        if(idx == 0){
            $(".brand_car_choice").css("display","none");
            $("#unlisted").css("display","block");
            $(".b_stop span i").removeClass('checked');
            $('.brand_contrast_table tbody tr').hide().show();
        }else if(idx == 1){
            $(".brand_car_choice").css("display","block");
            $("#onSale").css("display","block");
        }else if(idx == -1){
            $(".brand_car_choice").css("display","none");
            $("#stopSale").css("display","block");
        }
    }

    var brand_year_car_choice_data=[];
    var brand_type_car_choice_data=[];
    var brand_num_choice_data=[];
    // 选中左侧单选按钮事件
    $(".b_stop span i").on("click",function(event){
        //检查点击是哪一个分组
        var check_group=$(this).parent("span").parent("div").attr("class").split(" ")[0].toString();
        var check_group_id=0;
        if(check_group == "stop_sell_year"){
            check_group_id=1;
        }
        if(check_group == "stop_sell_type"){
            check_group_id=2;
        }
        if(check_group == "stop_sell_num"){
            check_group_id=3;
        }

//      console.log("分组ID:"+check_group_id);

        var check_text = $(this).parent("span").text();
        var join_text=":contains('" +check_text + "')";
        var zidongStr = "自动,半自动,手自一体,CVT无级变速,双离合,电动车单速变速箱,E-CVT无级变速";
        var zidongArr = zidongStr.split(',');
        if($(this).hasClass('checked')){
            $(this).removeClass('checked');
            if(check_text=="自动"){
                for(var i=0;i<zidongArr.length;i++){
                    var zidongList = ":contains('" +zidongArr[i] + "')"
                    for(var j=0;j<brand_type_car_choice_data.length;j++){
                        if(brand_type_car_choice_data[j]==zidongList){
                            brand_type_car_choice_data.splice(j,1);
                        }
                    }
                }
            }else{
                if(check_group_id==1){
                    for(var i=0;i<brand_year_car_choice_data.length;i++){
                        if(brand_year_car_choice_data[i]==join_text){
                            brand_year_car_choice_data.splice(i,1);
                        }
                    }
                }
                if(check_group_id==2){
                    for(var i=0;i<brand_type_car_choice_data.length;i++){
                        if(brand_type_car_choice_data[i]==join_text){
                            brand_type_car_choice_data.splice(i,1);
                        }
                    }
                }
                if(check_group_id==3){
                     for(var i=0;i<brand_num_choice_data.length;i++){
                            if(brand_num_choice_data[i]==join_text){
                                brand_num_choice_data.splice(i,1);
                            }
                        }
                }

            }
        }else{
            $(this).addClass('checked');
            if(check_text=="自动"){
                for(var i=0;i<zidongArr.length;i++){
                    var zidongList = ":contains('" +zidongArr[i] + "')"
                    brand_type_car_choice_data.push(zidongList);
                }
            }else{
                if(check_group_id==1){
                    brand_year_car_choice_data.push(join_text);
                }
                if(check_group_id==2){
                    brand_type_car_choice_data.push(join_text);
                 }
                if(check_group_id==3){
                    brand_num_choice_data.push(join_text);
                }
            }
        }
//        console.log("分 组1:"+brand_year_car_choice_data+",分 组2:"+brand_type_car_choice_data+"分 组3:"+brand_num_choice_data);
        if(brand_year_car_choice_data.length==0 && brand_type_car_choice_data.length==0 && brand_num_choice_data.length==0){
            $('#onSale .brand_contrast_table tbody tr').hide().show();
        }else{
            var choiceItem=$('#onSale .brand_contrast_table tbody .b_car_list');
             if(brand_year_car_choice_data.length>0){
                 choiceItem=choiceItem.hide().filter(brand_year_car_choice_data.toString()).show();
             }
            if(brand_type_car_choice_data.length>0){
                choiceItem=choiceItem.hide().filter(brand_type_car_choice_data.toString()).show();
             }
            if(brand_num_choice_data.length>0){
                choiceItem=choiceItem.hide().filter(brand_num_choice_data.toString()).show();
            }
            // 对table title 进行判断 如果子项没有兄弟节点 不显示 TITLE
            var contrast_table_title_list=$("#onSale .contrast_table_title");
            for(var i=0;i<contrast_table_title_list.length;i++){
                var contrast_table_title_list_child=$(contrast_table_title_list[i]).siblings();
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
        }
    });
    //点击停售年款
    $(".stop_sell_type_list a").on("click",function(){
        showDiv(-1)
        var stopYear = $(this).text();
        // $("#stop_sell").find("em").text(stopYear);
        $(this).parents(".stop_sell_type_list").addClass('display_n');
        $(this).parents('.sell_type').find('li').removeClass('active');
        $('#stop_sell').addClass('active');
        //$(this).hide().siblings('a').show();
        var check_text =stopYear;
        if(check_text.replace(/[^0-9]/g,"")>0){
            var join_text=":contains('" +check_text + "')";
            $('#stopSale .brand_contrast_table tbody .b_car_list').hide().filter(join_text).show();
            // 对table title 进行判断 如果子项没有兄弟节点 不显示 TITLE
            var contrast_table_title_list=$("#stopSale .contrast_table_title");
            for(var i=0;i<contrast_table_title_list.length;i++){
                var contrast_table_title_list_child=$(contrast_table_title_list[i]).siblings();
                var contrast_table_title_list_child_length=contrast_table_title_list_child.length;
                var disply_none_count=0;
                for(var j=0;j<contrast_table_title_list_child.length;j++){
                    if($(contrast_table_title_list_child[j]).css("display")=="none"){
                        disply_none_count++;
                    }
                }
                //console.log("j length="+disply_none_count)
                if(disply_none_count==contrast_table_title_list_child_length){
                    $(contrast_table_title_list[i]).css("display","none");
                }
            }
        }else{
            $('#stopSale .brand_contrast_table tbody tr').hide().show();
        }
    })
    // 清除选中
    $("#clear_choice").on("click",function(){
        $('.brand_contrast_table tbody tr').hide().show();
        $(".b_stop span i").removeClass('checked');
    });

    //热门车型对比
    $('.car_type_contrast').on('click','.start_contrast_btn',function(){
        var dl = $(this).parents('dl');

        var topId = dl.find('dt p').attr('id');
        var str = topId+',';
        var ddi = dl.find('dd i');
        var bBtn = false;
        for(var i=0;i<ddi.length;i++){
            if(ddi.eq(i).hasClass('checked')){
                str += ddi.eq(i).attr('id')+',';
                bBtn = true;
            }
        }
        str = str.slice(0,-1);
        if(bBtn){
            window.open("/carparam/muti/"+str);
        }
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
    $('.car_type_summar').on('click','a.contrast_btn',function(){
        var id = $(this).attr('id')
        var text = $(this).attr('text')

        compareBoto.addCar({
            id: id,
            text: text
        })


    });
    //分割线
    //下拉列表显示隐藏
    function showHide(showName){
        if($(showName).hasClass('display_n')){
            $(showName).removeClass('display_n');
        }else{
            $(showName).addClass('display_n');
        }
    }

    // $(".imgs_car_type li").on("mouseover",function(){
    //     $(this).addClass('imgs_current').siblings('li').removeClass('imgs_current');
    // })
    //02.28 回到顶部按钮失效  db修复
    $(window).on('scroll',function(){
        if($(window).scrollTop()>500){
            $("#back_to_top").show();
        }else{
            $("#back_to_top").hide();
        }
    })
    //回到顶部
    $('#back_to_top').on('click',function(){
        // event.stopPropagation();
        $("html,body").animate({scrollTop:0}, 500);
    })


    // $('.imgs_no_border').on('mouseover mouseleave',function(event){
    //     if(event.type=='mouseover'){
    //         $('.stop_s_y').show()
    //         $('.stop_s_y_list').on('mouseover mouseleave',function(event){
    //             if(event.type=='mouseover'){
    //                 $('.stop_s_y').show()
    //             }else if(event.type=='mouseleave'){
    //                 $('.stop_s_y').hide()
    //             }
    //         })
    //     }else if(event.type=='mouseleave'){
    //        $('.stop_s_y').hide()
    //     }
    // })
    $('.imgs_no_border').hover(function(){
        $(this).find('.stop_list').show();
    },function(){
        $(this).find('.stop_list').hide();
    })
    //点击年份
    $(".stop_s_y a").on("click",function(event){
        event.stopPropagation();
        $(".stop_s_y").hide();
    });

    //品牌车款停售年款显示隐藏
    $("#stop_sell").parents('li').on("mouseover",function(event){
        event.stopPropagation();
        // $(this).parents('.sell_type').find('li').removeClass('active').end().end().addClass('active');
        $(".stop_sell_type_list").removeClass('display_n');
        // $(".b_stop span i").removeClass('checked');
    }).on("mouseout",function(event){
        event.stopPropagation();
        $(".stop_sell_type_list").addClass('display_n');
        // $(".b_stop span i").removeClass('checked');
    });

    //阻止停售年款列表冒泡
    $(".stop_sell_type_list").on("click",function(event){
        event.stopPropagation();
    });

    //分割线
    /*报价模块*/
    //颜色切换
    if($('#color_scroll').find('a').length > 8){
        $('.pre_list,.next_list').show();
        $('.car_color_item').css('margin-left','13px');
    }else{
        $('.pre_list,.next_list').hide();
        $('.car_color_item').css('margin-left','0');
    }
    $(".js_pre_list").on("click",function(){
        var areaWidth = $(".js_c_item").width()-5,
            offLeft = $("#color_scroll").position().left;
        var scrollLeft = offLeft + areaWidth;
        if(-offLeft < areaWidth){
            $("#color_scroll").css("left",0);
        }else{
            $("#color_scroll").css("left",scrollLeft);
        }
    })
    $(".js_next_list").on("click",function(){
        var scrollItem = $("#color_scroll a").length;
        areaWidth = $(".js_c_item").width()-5,
            offLeft = $("#color_scroll").position().left;
        var scrollWidth = scrollItem * 30,
            scrollLeft = offLeft - areaWidth,
            lastW = scrollItem % 8 * 30,
            lastL = -(scrollWidth - lastW);
        if(-scrollLeft <= scrollWidth){
            $("#color_scroll").css("left",scrollLeft);
        }else{
            $("#color_scroll").css("left",lastL);
        }
    })

    //点击颜色
    /*$("#color_scroll a").on("mouseover",function(){
        var colorIndex = $(this).index();
        $("#b_img a").eq(colorIndex).removeClass('display_n').siblings().addClass('display_n');
    })
    $("#color_scroll a").on("mouseleave",function(){
        $("#b_img a").addClass('display_n').eq(0).removeClass('display_n');
    })*/

    // 产品要求鼠标移出 显示第一张图片 dongbo
     $("#color_scroll a").on('mouseover mouseleave',function(event){
        var event=arguments.callee.caller.arguments[0] || window.event;
            if(event.type=='mouseover'){
                var colorIndex = $(this).index()+1;
                $("#b_img a").eq(colorIndex).removeClass('display_n').siblings().addClass('display_n');
            }else if(event.type=='mouseleave'){
                $("#b_img a").addClass('display_n');
                $("#b_img a").eq(0).removeClass('display_n');
            }
     })

    //hover分享显示分享列表
    $("#share").on("mouseover mouseleave",function(event){
        if(event.type == 'mouseover'){
            $("#share_area").removeClass('display_n');
            //hover微信分享显示二维码
            $("#share_area").on("mouseover mouseleave",function(event){
                if(event.type == 'mouseover'){
                    $("#share_area").removeClass('display_n');

                    //hover二维码不隐藏二维码
                    $(".share_wx").on("mouseover mouseleave",function(event){
                        if(event.type == 'mouseover'){
                            $('.erweima').css('display','block')
                            $("#ewm").removeClass('display_n');
                        }else if(event.type == 'mouseleave'){
                            $('.erweima').css('display','none')
                            $("#ewm").addClass('display_n');
                        }
                    });
                }else if(event.type == 'mouseleave'){
                    $("#share_area").addClass('display_n');

                }
            })
        }else if(event.type == 'mouseleave'){
            $("#share_area").addClass('display_n');
            $("#ewm").addClass('display_n');
        }
    });

    // //收藏
    // $("#collect").on("click",function(){
    //     if($(this).find("i").hasClass('icon-collect')){
    //         $(this).find("i").removeClass('icon-collect').addClass('icon-collected');
    //         $(this).find("span").text("已收藏").css("color","#999");
    //     }else{
    //         $(this).find("i").removeClass('icon-collected').addClass('icon-collect');
    //         $(this).find("span").text("收藏").css("color","#333");
    //     }
    // })

    /*经销商授权模块*/
    //选择城市
	citySelect("currentCity","cityChose","currentCity");
    // $('.delete_city_c').on('click',function(){
    //     $('#cityChose').hide();
    // })
    //点击全部经销商
    $("#all_dealer_btn").on("click",function(event){
        event.stopPropagation();
        showHide(".all_dealer");
    });
    //点击经销商
    $(".all_dealer a").on("click",function(){
        var dealerName = $(this).html();
        $("#dealer_checked").html(dealerName);
        $(this).addClass('display_n').siblings().removeClass('display_n');
    });

    //排序
    $(".area_dealer_sort a").on("click",function(){
        $(this).addClass('font-w').siblings().removeClass('font-w');
    });

    //选中地区
    $(".dealer_area dl dd a").on("click",function(){
        $(this).addClass('a-hover').siblings().removeClass('a-hover');
    })


    //大家在买什么车（tab切换）
    Tab('js-left-tap','js-tab-warp','active','js-show','mouseover');


    //点击任何地方隐藏下拉列表
    $(document).on("click",function(){
        $(".stop_s_y").addClass('display_n');
        $("#share_area").addClass('display_n');
        $("#ewm").addClass('display_n');
        $(".stop_sell_type_list").addClass('display_n');
        $(".all_dealer").addClass('display_n');
    });
    function iFrameHeight() {
        var ifm= document.getElementById("iframepage");
        var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
        if(ifm != null && subWeb != null) {
            ifm.height = subWeb.body.scrollHeight;
        }
    }
});
