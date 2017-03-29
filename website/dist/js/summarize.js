(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./layer/layer');
window.login={
        'alLogin':function alLogin(html) {
            var html=html || '';
            var div=$('<div id="login_box" class="login_box">'+html+'</div>');
            $('body').append(div);
        },
        'parHtml':function parHtml(html){
            var link,script;
            var reg=/(<link(.*?)[^>]*>)/;
            var reg1=/<script[^>]*>(.|\n)*?(?=<\/script>)<\/script>/
            html=html.replace(reg,function($1){
                link=$1;
                return ''
            });
            html=html.replace(reg1,function($1){
                script=$1;
                return ''
            });
            $('body').append(link);
            $('body').append(script)
            login.alLogin(html)
        },
        'getLoginHtml':function getLoginHtml(md) {
            var url=window.location.href ;

            if(!!md){
                if (url.indexOf("?md=")>0){
                    url = url.split('?')[0];
                }
                url = url +"?md="+md;
            }
            $.ajax({
                url:"http://i.qichedaquan.com/user/comm/toLogin",
                data:{"returnUrl":url},
                dataType : "jsonp",
                success:function (data) {
                    login.parHtml(data)
                },
                error:function (e) {
                    layer.msg("请求登陆失败");
                }
            })
        }
    };

},{"./layer/layer":3}],2:[function(require,module,exports){
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

},{"./mod/carCompareLayer":4,"./mod/citySelect":5,"./mod/favorite":7}],3:[function(require,module,exports){
/*! layer-v3.0.3 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */
 ;!function(e,t){"use strict";var i,n,a=e.layui&&layui.define,o={getPath:function(){var e=document.scripts,t=e[e.length-1],i=t.src;if(!t.getAttribute("merge"))return i.substring(0,i.lastIndexOf("/")+1)}(),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},r={v:"3.0.3",ie:function(){var t=navigator.userAgent.toLowerCase();return!!(e.ActiveXObject||"ActiveXObject"in e)&&((t.match(/msie\s(\d+)/)||[])[1]||"11")}(),index:e.layer&&e.layer.v?1e5:0,path:o.getPath,config:function(e,t){return e=e||{},r.cache=o.config=i.extend({},o.config,e),r.path=o.config.path||r.path,"string"==typeof e.extend&&(e.extend=[e.extend]),o.config.path&&r.ready(),e.extend?(a?layui.addcss("modules/layer/"+e.extend):r.link("skin/"+e.extend),this):this},link:function(t,n,a){if(r.path){var o=i("head")[0],s=document.createElement("link");"string"==typeof n&&(a=n);var l=(a||t).replace(/\.|\//g,""),f="layuicss-"+l,c=0;s.rel="stylesheet",s.href=r.path+t,s.id=f,i("#"+f)[0]||o.appendChild(s),"function"==typeof n&&!function u(){return++c>80?e.console&&console.error("layer.css: Invalid"):void(1989===parseInt(i("#"+f).css("width"))?n():setTimeout(u,100))}()}},ready:function(e){var t="skinlayercss",i="303";return a?layui.addcss("modules/layer/default/layer.css?v="+r.v+i,e,t):r.link("skin/default/layer.css?v="+r.v+i,e,t),this},alert:function(e,t,n){var a="function"==typeof t;return a&&(n=t),r.open(i.extend({content:e,yes:n},a?{}:t))},confirm:function(e,t,n,a){var s="function"==typeof t;return s&&(a=n,n=t),r.open(i.extend({content:e,btn:o.btn,yes:n,btn2:a},s?{}:t))},msg:function(e,n,a){var s="function"==typeof n,f=o.config.skin,c=(f?f+" "+f+"-msg":"")||"layui-layer-msg",u=l.anim.length-1;return s&&(a=n),r.open(i.extend({content:e,time:3e3,shade:!1,skin:c,title:!1,closeBtn:!1,btn:!1,resize:!1,end:a},s&&!o.config.skin?{skin:c+" layui-layer-hui",anim:u}:function(){return n=n||{},(n.icon===-1||n.icon===t&&!o.config.skin)&&(n.skin=c+" "+(n.skin||"layui-layer-hui")),n}()))},load:function(e,t){return r.open(i.extend({type:3,icon:e||0,resize:!1,shade:.01},t))},tips:function(e,t,n){return r.open(i.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:210},n))}},s=function(e){var t=this;t.index=++r.index,t.config=i.extend({},t.config,o.config,e),document.body?t.creat():setTimeout(function(){t.creat()},30)};s.pt=s.prototype;var l=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];l.anim=["layer-anim","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],s.pt.config={type:0,shade:.3,fixed:!0,move:l[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},s.pt.vessel=function(e,t){var n=this,a=n.index,r=n.config,s=r.zIndex+a,f="object"==typeof r.title,c=r.maxmin&&(1===r.type||2===r.type),u=r.title?'<div class="layui-layer-title" style="'+(f?r.title[1]:"")+'">'+(f?r.title[0]:r.title)+"</div>":"";return r.zIndex=s,t([r.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+a+'" times="'+a+'" style="'+("z-index:"+(s-1)+"; background-color:"+(r.shade[1]||"#000")+"; opacity:"+(r.shade[0]||r.shade)+"; filter:alpha(opacity="+(100*r.shade[0]||100*r.shade)+");")+'"></div>':"",'<div class="'+l[0]+(" layui-layer-"+o.type[r.type])+(0!=r.type&&2!=r.type||r.shade?"":" layui-layer-border")+" "+(r.skin||"")+'" id="'+l[0]+a+'" type="'+o.type[r.type]+'" times="'+a+'" showtime="'+r.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+s+"; width:"+r.area[0]+";height:"+r.area[1]+(r.fixed?"":";position:absolute;")+'">'+(e&&2!=r.type?"":u)+'<div id="'+(r.id||"")+'" class="layui-layer-content'+(0==r.type&&r.icon!==-1?" layui-layer-padding":"")+(3==r.type?" layui-layer-loading"+r.icon:"")+'">'+(0==r.type&&r.icon!==-1?'<i class="layui-layer-ico layui-layer-ico'+r.icon+'"></i>':"")+(1==r.type&&e?"":r.content||"")+'</div><span class="layui-layer-setwin">'+function(){var e=c?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return r.closeBtn&&(e+='<a class="layui-layer-ico '+l[7]+" "+l[7]+(r.title?r.closeBtn:4==r.type?"1":"2")+'" href="javascript:;"></a>'),e}()+"</span>"+(r.btn?function(){var e="";"string"==typeof r.btn&&(r.btn=[r.btn]);for(var t=0,i=r.btn.length;t<i;t++)e+='<a class="'+l[6]+t+'">'+r.btn[t]+"</a>";return'<div class="'+l[6]+" layui-layer-btn-"+(r.btnAlign||"")+'">'+e+"</div>"}():"")+(r.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],u,i('<div class="layui-layer-move"></div>')),n},s.pt.creat=function(){var e=this,t=e.config,a=e.index,s=t.content,f="object"==typeof s,c=i("body");if(!t.id||!i("#"+t.id)[0]){switch("string"==typeof t.area&&(t.area="auto"===t.area?["",""]:[t.area,""]),t.shift&&(t.anim=t.shift),6==r.ie&&(t.fixed=!1),t.type){case 0:t.btn="btn"in t?t.btn:o.btn[0],r.closeAll("dialog");break;case 2:var s=t.content=f?t.content:[t.content,"auto"];t.content='<iframe scrolling="'+(t.content[1]||"auto")+'" allowtransparency="true" id="'+l[4]+a+'" name="'+l[4]+a+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+t.content[0]+'"></iframe>';break;case 3:delete t.title,delete t.closeBtn,t.icon===-1&&0===t.icon,r.closeAll("loading");break;case 4:f||(t.content=[t.content,"body"]),t.follow=t.content[1],t.content=t.content[0]+'<i class="layui-layer-TipsG"></i>',delete t.title,t.tips="object"==typeof t.tips?t.tips:[t.tips,!0],t.tipsMore||r.closeAll("tips")}e.vessel(f,function(n,r,u){c.append(n[0]),f?function(){2==t.type||4==t.type?function(){i("body").append(n[1])}():function(){s.parents("."+l[0])[0]||(s.data("display",s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]),i("#"+l[0]+a).find("."+l[5]).before(r))}()}():c.append(n[1]),i(".layui-layer-move")[0]||c.append(o.moveElem=u),e.layero=i("#"+l[0]+a),t.scrollbar||l.html.css("overflow","hidden").attr("layer-full",a)}).auto(a),2==t.type&&6==r.ie&&e.layero.find("iframe").attr("src",s[0]),4==t.type?e.tips():e.offset(),t.fixed&&n.on("resize",function(){e.offset(),(/^\d+%$/.test(t.area[0])||/^\d+%$/.test(t.area[1]))&&e.auto(a),4==t.type&&e.tips()}),t.time<=0||setTimeout(function(){r.close(e.index)},t.time),e.move().callback(),l.anim[t.anim]&&e.layero.addClass(l.anim[t.anim]),t.isOutAnim&&e.layero.data("isOutAnim",!0)}},s.pt.auto=function(e){function t(e){e=s.find(e),e.height(f[1]-c-u-2*(0|parseFloat(e.css("padding-top"))))}var a=this,o=a.config,s=i("#"+l[0]+e);""===o.area[0]&&o.maxWidth>0&&(r.ie&&r.ie<8&&o.btn&&s.width(s.innerWidth()),s.outerWidth()>o.maxWidth&&s.width(o.maxWidth));var f=[s.innerWidth(),s.innerHeight()],c=s.find(l[1]).outerHeight()||0,u=s.find("."+l[6]).outerHeight()||0;switch(o.type){case 2:t("iframe");break;default:""===o.area[1]?o.fixed&&f[1]>=n.height()&&(f[1]=n.height(),t("."+l[5])):t("."+l[5])}return a},s.pt.offset=function(){var e=this,t=e.config,i=e.layero,a=[i.outerWidth(),i.outerHeight()],o="object"==typeof t.offset;e.offsetTop=(n.height()-a[1])/2,e.offsetLeft=(n.width()-a[0])/2,o?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=n.width()-a[0]:"b"===t.offset?e.offsetTop=n.height()-a[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=n.width()-a[0]):"rb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=n.width()-a[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?n.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?n.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=n.scrollTop(),e.offsetLeft+=n.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=n.height()-(i.find(l[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},s.pt.tips=function(){var e=this,t=e.config,a=e.layero,o=[a.outerWidth(),a.outerHeight()],r=i(t.follow);r[0]||(r=i("body"));var s={width:r.outerWidth(),height:r.outerHeight(),top:r.offset().top,left:r.offset().left},f=a.find(".layui-layer-TipsG"),c=t.tips[0];t.tips[1]||f.remove(),s.autoLeft=function(){s.left+o[0]-n.width()>0?(s.tipLeft=s.left+s.width-o[0],f.css({right:12,left:"auto"})):s.tipLeft=s.left},s.where=[function(){s.autoLeft(),s.tipTop=s.top-o[1]-10,f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left+s.width+10,s.tipTop=s.top,f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",t.tips[1])},function(){s.autoLeft(),s.tipTop=s.top+s.height+10,f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left-o[0]-10,s.tipTop=s.top,f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",t.tips[1])}],s.where[c-1](),1===c?s.top-(n.scrollTop()+o[1]+16)<0&&s.where[2]():2===c?n.width()-(s.left+s.width+o[0]+16)>0||s.where[3]():3===c?s.top-n.scrollTop()+s.height+o[1]+16-n.height()>0&&s.where[0]():4===c&&o[0]+16-s.left>0&&s.where[1](),a.find("."+l[5]).css({"background-color":t.tips[1],"padding-right":t.closeBtn?"30px":""}),a.css({left:s.tipLeft-(t.fixed?n.scrollLeft():0),top:s.tipTop-(t.fixed?n.scrollTop():0)})},s.pt.move=function(){var e=this,t=e.config,a=i(document),s=e.layero,l=s.find(t.move),f=s.find(".layui-layer-resize"),c={};return t.move&&l.css("cursor","move"),l.on("mousedown",function(e){e.preventDefault(),t.move&&(c.moveStart=!0,c.offset=[e.clientX-parseFloat(s.css("left")),e.clientY-parseFloat(s.css("top"))],o.moveElem.css("cursor","move").show())}),f.on("mousedown",function(e){e.preventDefault(),c.resizeStart=!0,c.offset=[e.clientX,e.clientY],c.area=[s.outerWidth(),s.outerHeight()],o.moveElem.css("cursor","se-resize").show()}),a.on("mousemove",function(i){if(c.moveStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1],l="fixed"===s.css("position");if(i.preventDefault(),c.stX=l?0:n.scrollLeft(),c.stY=l?0:n.scrollTop(),!t.moveOut){var f=n.width()-s.outerWidth()+c.stX,u=n.height()-s.outerHeight()+c.stY;a<c.stX&&(a=c.stX),a>f&&(a=f),o<c.stY&&(o=c.stY),o>u&&(o=u)}s.css({left:a,top:o})}if(t.resize&&c.resizeStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1];i.preventDefault(),r.style(e.index,{width:c.area[0]+a,height:c.area[1]+o}),c.isResize=!0,t.resizing&&t.resizing(s)}}).on("mouseup",function(e){c.moveStart&&(delete c.moveStart,o.moveElem.hide(),t.moveEnd&&t.moveEnd(s)),c.resizeStart&&(delete c.resizeStart,o.moveElem.hide())}),e},s.pt.callback=function(){function e(){var e=a.cancel&&a.cancel(t.index,n);e===!1||r.close(t.index)}var t=this,n=t.layero,a=t.config;t.openLayer(),a.success&&(2==a.type?n.find("iframe").on("load",function(){a.success(n,t.index)}):a.success(n,t.index)),6==r.ie&&t.IE6(n),n.find("."+l[6]).children("a").on("click",function(){var e=i(this).index();if(0===e)a.yes?a.yes(t.index,n):a.btn1?a.btn1(t.index,n):r.close(t.index);else{var o=a["btn"+(e+1)]&&a["btn"+(e+1)](t.index,n);o===!1||r.close(t.index)}}),n.find("."+l[7]).on("click",e),a.shadeClose&&i("#layui-layer-shade"+t.index).on("click",function(){r.close(t.index)}),n.find(".layui-layer-min").on("click",function(){var e=a.min&&a.min(n);e===!1||r.min(t.index,a)}),n.find(".layui-layer-max").on("click",function(){i(this).hasClass("layui-layer-maxmin")?(r.restore(t.index),a.restore&&a.restore(n)):(r.full(t.index,a),setTimeout(function(){a.full&&a.full(n)},100))}),a.end&&(o.end[t.index]=a.end)},o.reselect=function(){i.each(i("select"),function(e,t){var n=i(this);n.parents("."+l[0])[0]||1==n.attr("layer")&&i("."+l[0]).length<1&&n.removeAttr("layer").show(),n=null})},s.pt.IE6=function(e){i("select").each(function(e,t){var n=i(this);n.parents("."+l[0])[0]||"none"===n.css("display")||n.attr({layer:"1"}).hide(),n=null})},s.pt.openLayer=function(){var e=this;r.zIndex=e.config.zIndex,r.setTop=function(e){var t=function(){r.zIndex++,e.css("z-index",r.zIndex+1)};return r.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",t),r.zIndex}},o.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},o.rescollbar=function(e){l.html.attr("layer-full")==e&&(l.html[0].style.removeProperty?l.html[0].style.removeProperty("overflow"):l.html[0].style.removeAttribute("overflow"),l.html.removeAttr("layer-full"))},e.layer=r,r.getChildFrame=function(e,t){return t=t||i("."+l[4]).attr("times"),i("#"+l[0]+t).find("iframe").contents().find(e)},r.getFrameIndex=function(e){return i("#"+e).parents("."+l[4]).attr("times")},r.iframeAuto=function(e){if(e){var t=r.getChildFrame("html",e).outerHeight(),n=i("#"+l[0]+e),a=n.find(l[1]).outerHeight()||0,o=n.find("."+l[6]).outerHeight()||0;n.css({height:t+a+o}),n.find("iframe").css({height:t})}},r.iframeSrc=function(e,t){i("#"+l[0]+e).find("iframe").attr("src",t)},r.style=function(e,t,n){var a=i("#"+l[0]+e),r=a.find(".layui-layer-content"),s=a.attr("type"),f=a.find(l[1]).outerHeight()||0,c=a.find("."+l[6]).outerHeight()||0;a.attr("minLeft");s!==o.type[3]&&s!==o.type[4]&&(n||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-f-c<=64&&(t.height=64+f+c)),a.css(t),c=a.find("."+l[6]).outerHeight(),s===o.type[2]?a.find("iframe").css({height:parseFloat(t.height)-f-c}):r.css({height:parseFloat(t.height)-f-c-parseFloat(r.css("padding-top"))-parseFloat(r.css("padding-bottom"))}))},r.min=function(e,t){var a=i("#"+l[0]+e),s=a.find(l[1]).outerHeight()||0,f=a.attr("minLeft")||181*o.minIndex+"px",c=a.css("position");o.record(a),o.minLeft[0]&&(f=o.minLeft[0],o.minLeft.shift()),a.attr("position",c),r.style(e,{width:180,height:s,left:f,top:n.height()-s,position:"fixed",overflow:"hidden"},!0),a.find(".layui-layer-min").hide(),"page"===a.attr("type")&&a.find(l[4]).hide(),o.rescollbar(e),a.attr("minLeft")||o.minIndex++,a.attr("minLeft",f)},r.restore=function(e){var t=i("#"+l[0]+e),n=t.attr("area").split(",");t.attr("type");r.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(l[4]).show(),o.rescollbar(e)},r.full=function(e){var t,a=i("#"+l[0]+e);o.record(a),l.html.attr("layer-full")||l.html.css("overflow","hidden").attr("layer-full",e),clearTimeout(t),t=setTimeout(function(){var t="fixed"===a.css("position");r.style(e,{top:t?0:n.scrollTop(),left:t?0:n.scrollLeft(),width:n.width(),height:n.height()},!0),a.find(".layui-layer-min").hide()},100)},r.title=function(e,t){var n=i("#"+l[0]+(t||r.index)).find(l[1]);n.html(e)},r.close=function(e){var t=i("#"+l[0]+e),n=t.attr("type"),a="layer-anim-close";if(t[0]){var s="layui-layer-wrap",f=function(){if(n===o.type[1]&&"object"===t.attr("conType")){t.children(":not(."+l[5]+")").remove();for(var a=t.find("."+s),r=0;r<2;r++)a.unwrap();a.css("display",a.data("display")).removeClass(s)}else{if(n===o.type[2])try{var f=i("#"+l[4]+e)[0];f.contentWindow.document.write(""),f.contentWindow.close(),t.find("."+l[5])[0].removeChild(f)}catch(c){}t[0].innerHTML="",t.remove()}"function"==typeof o.end[e]&&o.end[e](),delete o.end[e]};t.data("isOutAnim")&&t.addClass(a),i("#layui-layer-moves, #layui-layer-shade"+e).remove(),6==r.ie&&o.reselect(),o.rescollbar(e),t.attr("minLeft")&&(o.minIndex--,o.minLeft.push(t.attr("minLeft"))),r.ie&&r.ie<10||!t.data("isOutAnim")?f():setTimeout(function(){f()},200)}},r.closeAll=function(e){i.each(i("."+l[0]),function(){var t=i(this),n=e?t.attr("type")===e:1;n&&r.close(t.attr("times")),n=null})};var f=r.cache||{},c=function(e){return f.skin?" "+f.skin+" "+f.skin+"-"+e:""};r.prompt=function(e,t){var a="";if(e=e||{},"function"==typeof e&&(t=e),e.area){var o=e.area;a='style="width: '+o[0]+"; height: "+o[1]+';"',delete e.area}var s,l=2==e.formType?'<textarea class="layui-layer-input"'+a+">"+(e.value||"")+"</textarea>":function(){return'<input type="'+(1==e.formType?"password":"text")+'" class="layui-layer-input" value="'+(e.value||"")+'">'}(),f=e.success;return delete e.success,r.open(i.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:l,skin:"layui-layer-prompt"+c("prompt"),maxWidth:n.width(),success:function(e){s=e.find(".layui-layer-input"),s.focus(),"function"==typeof f&&f(e)},resize:!1,yes:function(i){var n=s.val();""===n?s.focus():n.length>(e.maxlength||500)?r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(e.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",s,{tips:1}):t&&t(n,i,s)}},e))},r.tab=function(e){e=e||{};var t=e.tab||{},n=e.success;return delete e.success,r.open(i.extend({type:1,skin:"layui-layer-tab"+c("tab"),resize:!1,title:function(){var e=t.length,i=1,n="";if(e>0)for(n='<span class="layui-layer-tabnow">'+t[0].title+"</span>";i<e;i++)n+="<span>"+t[i].title+"</span>";return n}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=t.length,i=1,n="";if(e>0)for(n='<li class="layui-layer-tabli xubox_tab_layer">'+(t[0].content||"no content")+"</li>";i<e;i++)n+='<li class="layui-layer-tabli">'+(t[i].content||"no  content")+"</li>";return n}()+"</ul>",success:function(t){var a=t.find(".layui-layer-title").children(),o=t.find(".layui-layer-tabmain").children();a.on("mousedown",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0;var n=i(this),a=n.index();n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"),o.eq(a).show().siblings().hide(),"function"==typeof e.change&&e.change(a)}),"function"==typeof n&&n(t)}},e))},r.photos=function(t,n,a){function o(e,t,i){var n=new Image;return n.src=e,n.complete?t(n):(n.onload=function(){n.onload=null,t(n)},void(n.onerror=function(e){n.onerror=null,i(e)}))}var s={};if(t=t||{},t.photos){var l=t.photos.constructor===Object,f=l?t.photos:{},u=f.data||[],d=f.start||0;s.imgIndex=(0|d)+1,t.img=t.img||"img";var y=t.success;if(delete t.success,l){if(0===u.length)return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var p=i(t.photos),h=function(){u=[],p.find(t.img).each(function(e){var t=i(this);t.attr("layer-index",e),u.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(h(),0===u.length)return;if(n||p.on("click",t.img,function(){var e=i(this),n=e.attr("layer-index");r.photos(i.extend(t,{photos:{start:n,data:u,tab:t.tab},full:t.full}),!0),h()}),!n)return}s.imgprev=function(e){s.imgIndex--,s.imgIndex<1&&(s.imgIndex=u.length),s.tabimg(e)},s.imgnext=function(e,t){s.imgIndex++,s.imgIndex>u.length&&(s.imgIndex=1,t)||s.tabimg(e)},s.keyup=function(e){if(!s.end){var t=e.keyCode;e.preventDefault(),37===t?s.imgprev(!0):39===t?s.imgnext(!0):27===t&&r.close(s.index)}},s.tabimg=function(e){if(!(u.length<=1))return f.start=s.imgIndex-1,r.close(s.index),r.photos(t,!0,e)},s.event=function(){s.bigimg.hover(function(){s.imgsee.show()},function(){s.imgsee.hide()}),s.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),s.imgprev()}),s.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),s.imgnext()}),i(document).on("keyup",s.keyup)},s.loadi=r.load(1,{shade:!("shade"in t)&&.9,scrollbar:!1}),o(u[d].src,function(n){r.close(s.loadi),s.index=r.open(i.extend({type:1,id:"layui-layer-photos",area:function(){var a=[n.width,n.height],o=[i(e).width()-100,i(e).height()-100];if(!t.full&&(a[0]>o[0]||a[1]>o[1])){var r=[a[0]/o[0],a[1]/o[1]];r[0]>r[1]?(a[0]=a[0]/r[0],a[1]=a[1]/r[0]):r[0]<r[1]&&(a[0]=a[0]/r[1],a[1]=a[1]/r[1])}return[a[0]+"px",a[1]+"px"]}(),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,isOutAnim:!1,skin:"layui-layer-photos"+c("photos"),content:'<div class="layui-layer-phimg"><img src="'+u[d].src+'" alt="'+(u[d].alt||"")+'" layer-pid="'+u[d].pid+'"><div class="layui-layer-imgsee">'+(u.length>1?'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>':"")+'<div class="layui-layer-imgbar" style="display:'+(a?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(u[d].alt||"")+"</a><em>"+s.imgIndex+"/"+u.length+"</em></span></div></div></div>",success:function(e,i){s.bigimg=e.find(".layui-layer-phimg"),s.imgsee=e.find(".layui-layer-imguide,.layui-layer-imgbar"),s.event(e),t.tab&&t.tab(u[d],e),"function"==typeof y&&y(e)},end:function(){s.end=!0,i(document).off("keyup",s.keyup)}},t))},function(){r.close(s.loadi),r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){u.length>1&&s.imgnext(!0,!0)}})})}},o.run=function(t){i=t,n=i(e),l.html=i("html"),r.open=function(e){var t=new s(e);return t.index}},e.layui&&layui.define?(r.ready(),layui.define("jquery",function(t){r.path=layui.cache.dir,o.run(layui.jquery),e.layer=r,t("layer",r)})):"function"==typeof define&&define.amd?define(["jquery"],function(){return o.run(e.jQuery),r}):function(){o.run(e.jQuery),r.ready()}()}(window);
},{}],4:[function(require,module,exports){
var cookie = require('./cookie')

require('./../layer/layer');
/**
 * 车款选择，先写死dom，后期如需复用再改进
 */

var carSelecter = function(opt){

    var selectArr = []

    init()

    function init(){    
        bindEvents()
        $('.car-type-scroll-list').html('<dl></dl>')
        $('.car-style-scroll-list').html('<dl></dl>')
    }

    function bindEvents(){  
        $(document).on('click',function(){  
            $('.brand_scroll_area,.js_car_type,.js_car_style').hide()
            $('.choice_brand').show()
        })
        $('.search_input').on('click',function(event){
            event.stopPropagation()
        })
        $('.js_brand').on('click',showCarBrand)
        $('.choice_brand').on('click','.brand-list-a li',showCarType)
        $('.js_car_type').on('click','dd',showCarStyle)
        $('.js_car_style').on('click','dd',onSelect)
        $('.js_b_tit').on('click',function(event){  
            fixPosition('brand')
        })
        $('.car_style_scroll_area .choice_route span:eq(0)').on('click',function(event){  
            fixPosition('brand')
        })
        $('.car_style_scroll_area .choice_route span:eq(1)').on('click',function(event){  
            fixPosition('type')
        })
        $('.brand-letter-index span').on('click',function(){ 
            var letter = $(this).text()
            var parent
            $('.brand-list-a li').each(function(i,el){  
                var text = $.trim($(el).text()).substr(0,1)
                if(text == letter && !parent){
                    parent = $(el).closest('.brand-list-a')
                }
            })
            var top = parent.position().top + $('.brand-scroll-list').scrollTop() - 8
            $('.brand-scroll-list').scrollTop(top)
        })
    }

    function onSelect(event){  
        var el = $(event.currentTarget) 
        var id = el.attr('id')
        var name = el.find('span').text()
        selectArr[2] = el.attr('year') + ' ' + name
        $('.js_car_style').hide()
        $('.choice_brand').show() 
        if(id){
            opt.onSelect({
                id: id,
                text: selectArr.join('-')
            })
        }
    }

    function fixPosition(type){ 
        var height = $('.search_input').offset().top-$(window).scrollTop() - 50
        $('.choice_brand').hide()
        $('.js_car_style').hide()
        $('.js_car_type').hide()

        if(type == 'brand'){
            $('.choice_brand').show()
            $('.brand_scroll_area').show()
            $('.brand-scroll-list,.brand-scroll-list-box').css('height',height)
            $('.brand-scroll-list ul li').css({ 
                width: 182
            })
            $('.brand-letter-index').css({
                height: height,
                width: 40,
                'overflow-y': 'auto'
            }) 
        }else if(type == 'type'){
            $('.js_car_type').show()
            $('.brand_scroll_area').hide()
            $('.car-type-scroll-list').css('height',height)
        }else if(type == 'style'){
            $('.js_car_style').show()
            $('.car-style-scroll-list').css('height',height)
        }
    }

    function showCarBrand(){
        fixPosition('brand')
    }

    function showCarType(event){ 
        var el = $(event.currentTarget)
        var id = el.attr('id')
        if(id){
            var name = el.find('span').text()
            var html = ''
            $('.js_b_tit').html(name)
            selectArr[0] = name
            fixPosition('type')
            $.ajax({    
                url: 'http://car.qichedaquan.com/carSerialSummary/getCarSerialNames?brandid=' + id,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data){
                    for(var i=0;i<data.length;i++){ 
                        html += '<dd id="'+ data[i].id +'">'+ data[i].name +'</dd>'
                    }
                    if(data.length === 0){  
                        html += '<dd>暂无</dd>'
                    }
                    $('.choice_car_type dl').html(html)
                }
            })
        }
    }

    function showCarStyle(event){  
        var el = $(event.currentTarget)
        var id = el.attr('id')
        if(id){
            var name = el.text()
            var html = '' 
            $('.car_style_scroll_area .choice_route span:eq(0)').html(selectArr[0])
            $('.car_style_scroll_area .choice_route span:eq(1)').html(name)
            selectArr[1] = name
            fixPosition('style')
            $.ajax({    
                url: 'http://car.qichedaquan.com/carSerialSummary/getCarParamNames?serialid=' + id,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data){    
                    var years = {}
                    var sale_state = '';
                    for(var i=0;i<data.length;i++){ 
                        var item = data[i]
                        if(!years[item.caryear]){
                            years[item.caryear] = true
                            html += '<dt>'+ item.caryear +'款</dt>'
                        }
                        if(item.salestate=="停售"){
                            sale_state = "停售"
                        }else if(item.salestate=="未上市"){
                            sale_state = "未上市"
                        }else{
                            if(item.dealerminprice>0){
                                sale_state = item.dealerminprice+'万起';
                            }else{
                                sale_state = "暂无报价"
                            }
                        }
                        html += '<dd id="'+ item.id +'" year="'+ item.caryear +'款"><span title="'+ item.name +'">'+ item.name +'</span><i>'+ sale_state +'</i></dd>'
                    }
                    if(data.length === 0){  
                        html += '<dd>暂无</dd>'
                    }
                    $('.choice_car_style dl').html(html)
                }
            })
        }
    }

}

var callbacks = {}; //最简单的事件监听
var emit = function (name, da) {
    var call = callbacks[name];
    if (call) {
        var i = 0, l = call.length;
        for (; i < l; i++) {
            call[i](da);
        }
    }
}

/**
 * 车型对比弹出层
 */

var carCompareLayer = (function(){ 

    var STORE_NAME = 'car_compare_data'
    var cache
    var el 

    try{    
        cache = JSON.parse($.cookie(STORE_NAME,undefined,{path:'/'}))
    }catch(e){   
        cache = []
    }
    //渲染列表
    function renderList(){ 
        var html = ''
        var link = ''
        for(var i=0;i<cache.length;i++){    
            html += '<li><a>'+ cache[i].text +'</a><i class="delete_icon"></i></li>'
            link += ',' + cache[i].id
        }
        $('.js_search_his').html(html)
        $('.js_constract i').html(cache.length)
        //判断对比按钮状态
        if(cache.length){   
            $('.dis_click').hide()
            $('.sure_click').css('display','block').attr('href','/carparam/muti/'+link.substr(1))
        }else{  
            $('.dis_click').show()
            $('.sure_click').hide()
        }
        setBtnState()
    }

    //修改页面对比按钮状态
    function setBtnState(){  
        $('a.contrast_btn').show();
        $('a.contrast_btn').siblings('span').hide();

        for(var i=0;i<cache.length;i++){
            var el = $('#'+cache[i].id);
            if(!el.hasClass('contrast_btn')){   
                el = el.parents('.contrast_btn')
            }
            //$('#'+cache[i].id).parents('.contrast_btn').hide();
            //$('#'+cache[i].id).parents('.contrast_btn').siblings('span').show();
            el.hide()
            el.siblings('span').show();
        }
    }

    function init(){    
        carSelecter({
            onSelect: addCar
        })
        bindEvents()
        renderList()
    }

    function bindEvents(){ 
        $('.type_constract')
            .on('click','.delete_icon',removeCar)
            .on('click','.clear_all',removeAllCars)
            .on('click','.js_hide',function(event){event.stopPropagation();$('.js_con_list').hide()})
            .on('click','.js_constract',function(event){event.stopPropagation();$('.js_con_list').toggle()})
        //点击页面车型对比弹出框消失
        $(document).on('click',function(){  
            $('.js_con_list').hide();
        })
    }
    //判断是否存在
    function hasCar(carid){  
        for(var i=0;i<cache.length;i++){  
            if(carid === cache[i].id){ 
                return true
            }  
        }
        return false
    }
    //添加一个
    function addCar(car,success,error){ 
        if(cache.length === 10){
            error && error()    
            layer.msg('最多选择10个车款。');
        }else{  
            if(!hasCar(car.id)){
                success && success(car)
                cache.push(car)
                $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
                renderList()
            }else{  
                error && error()
                layer.msg('已添加到对比。');
            }
        }
        $('.js_con_list').show()
    }
    //删除一个
    function removeCar(event){  
        event.stopPropagation()
        var target = event.currentTarget
        if(target){
            var li = $(target).closest('li')
            var index = $('.js_search_his li').index(li)
            cache.splice(index,1)
            $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
            renderList();

            emit('remove');
        }
    }
    //清空
    function removeAllCars(event){ 
        event.stopPropagation()
        cache = []
        $.cookie(STORE_NAME,JSON.stringify(cache),{path:'/'})
        renderList()
    }

    return {    
        init: init,
        addCar: addCar,
        hasCar: hasCar,
        getData: function(){ 
            return cache
        },
        setBtnState: setBtnState,
        on: function (name, fn) {
            if (callbacks[name]) {
                callbacks[name].push(fn);
            } else {
                callbacks[name] = [fn];
            }
        }
    }

})();

$(function(){
    if($('.type_constract')[0]){
        carCompareLayer.init()
    }
    $('#position_fixed').css('z-index',999)
})


module.exports = carCompareLayer
},{"./../layer/layer":3,"./cookie":6}],5:[function(require,module,exports){

//网页城市选择交互
var citySelect = function (target,city,current) {
	var citySelect=(function (target,city) {
		//点击城市切换按钮，显示城市选择模块，同时让字体颜色改变
		$('#'+target).on('click',function (e) {
			$('#'+city).show();
			carBrandChose();
		});
		function mouseWheel(obj,upfun,downfun){
			if(obj.addEventListener){
				obj.addEventListener("mousewheel",fn);
				obj.addEventListener("DOMMouseScroll",fn)
			}else{
				obj.attachEvent("onmousewheel",fn);
			}
			function fn(e){
				var ev=e||window.event;
				//鼠标滚轮滚动的方向
				//火狐 ev.detail  向上-3  向下3
				//IE chrome      ev.wheelDelta  向上120 向下-120
				var val=ev.detail||ev.wheelDelta;
				if(val==-3||val==120){
					upfun();
				}else if(val==3||val==-120){
					downfun();
				}
				if(ev.preventDefault){
					ev.preventDefault();
				}else{
					ev.returnValue=false;
				}
			}
		}
		function carBrandChose() {
			var out=document.querySelector('#'+city+' .city_scroll')
			var inner=document.querySelector('#'+city+' .city_chose_region');
			var scrollbtn=document.querySelector('#'+city+' .scrollbtn');
			var scrollbar=document.querySelector('#'+city+' .scrollbar');
			var innerH=inner.offsetHeight;
			var outH=$(out).height();
			var scrollbarH=scrollbar.offsetHeight;
			var bili=innerH/outH;
			var tops=0;
			var topsC=0;
			var speed=20;
			var scrollbtnH=scrollbarH/bili;
			scrollbtn.style.height=scrollbtnH+"px";
			var lenH=scrollbarH-scrollbtnH;
			if(bili<1){
				scrollbar.style.display="none";
			}else{
				scrollbtn.onclick=function (e) {
					var ev=e||window.event;
					if(scrollbtn.stopPropagation){
						ev.stopPropagation();
					}else{
						return  ev.cancelBubble=true;
					}
				}
				scrollbtn.onmousedown = function (e) {
					var ev=e||window.event;
					var lenY=ev.clientY-this.offsetTop;
					if(ev.preventDefault){
						ev.preventDefault()
					}else{
						ev.returnValue=false;
					}
					document.onmousemove = function (e) {
						var ev = e || window.event;
						tops = ev.clientY - lenY;
						if(tops<0){
							tops=0;
						}
						if(tops>lenH){
							tops=lenH;
						}
						scrollbtn.style.top = tops + "px";
						var innerT=tops*bili;
						inner.style.marginTop=-innerT+"px";
					};
					document.onmouseup = function () {
						document.onmousemove = null;
						document.onmouseup = null;
					}
				};
				mouseWheel(out,function(){
					tops-=speed;
					setTop()
				},function(){
					tops+=speed;
					setTop()
				});
				scrollbar.onclick=function (e) {
					var ev=e||window.event;
					tops=ev.offsetY;
					setTop()
				};

				$('#'+city+' .hot_city_num a').on('click',function () {
					var curN=$(this).text().toString();
					var regN=/curN/i;
					var  allNum=$('#'+city+' .city_chose_region dl dt .province_tx').text().toString();
					allNum.replace(regN,function () {
					})
				});
				$('#'+city+' .hot_city_num a').on('click',function (e) {
					e=e||window.event;
					var tar=e.target||e.srcElement;
					e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
					e.preventDefault();
					var myTop=0;
					var selectL=$(this).text();
					var weNeed;
					var allProvinceL=$('#'+city+' .city_chose_region dl dt .province_tx');
					for(var i=0;i<allProvinceL.length;i++){
						if($(allProvinceL[i]).text()==selectL){
							weNeed=allProvinceL[i]
							break;
						}else{
							myTop+=$(allProvinceL[i]).parents('dl').height()+9
						}
					}
					topsC=myTop;
					if(topsC>=innerH-378){
						topsC=innerH-378;
					}
					setTopC();

				});
				function setTopC(){
					if(topsC<0){
						topsC=0;
					}
					scrollbtn.style.top=topsC/bili+"px";
					inner.style.marginTop=-topsC+"px";
				}


				document.onkeydown=function (e) {
					var ev=e||event;
					if(ev.keyCode==38){
						tops-=speed;
						setTop()
					}else if(ev.keyCode==40){
						tops+=speed;
						setTop()
					}
				}
				function setTop(){
					if(tops<0){
						tops=0;
					}
					if(tops>=lenH){
						tops=lenH;
					}
					scrollbtn.style.top=tops+"px";
					inner.style.marginTop=-tops*bili+"px";
				}
			}

		}
	});
//hover城市选择按钮，字体和三角符号变色；
	var cityHover=(function (target,city) {
		$().on('mouseover',function (e) {
			$('#'+target+' .changeAdd').css({'color':'#fff'})
			$('#'+target+' .triangle').css({'border-top-color':'#fff'})
		});
		$("#"+target).on('mouseout',function (e) {
			$('#'+target+' .changeAdd').css({'color':'#999'})
			$('#'+target+' .triangle').css({'border-top-color':'#999'})
		});
		$("#"+target).on('mousedown',function () {
			$('#'+target+' .changeAdd').css({'color':'#398be4'})
			$('#'+target+' .triangle').css({'border-top-color':'#398be4'});
		});
		$("#"+target).on('mouseup',function () {
			$('#'+target+' .changeAdd').css({'color':'#fff'})
			$('#'+target+' .triangle').css({'border-top-color':'#fff'});
		});

		//城市首字母的hover&&press交互效果
		$('#'+city+' .hot_city_num a').mouseover(function () {
			$(this).css({'background':'#398be4','color':'#fff'})
		});
		$('#'+city+' .hot_city_num a').mouseout(function () {
			$(this).css({'background':'#eee','color':'#333'})
		});
		$('#'+city+' .hot_city_num a').mousedown(function () {
			$(this).css({'background':'#1064c1','color':'#fff'})
		});
		$('#'+city+' .hot_city_num a').mouseup(function () {
			$(this).css({'background':'#398be4','color':'#fff'})
		});


		//城市 名称的hover&&press效果
		$('#'+city+' .city_chose_region dd a').mouseover(function (e) {
			e=e||window.event;
			// e.cancelB city_chose_regionubble=true;
			// e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			$(this).css({'background':'#398be4','color':'#fff'})
		});
		$('#'+city+' .city_chose_region dd a').mouseout(function (e) {
			// e=e||window.event;
			// e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			$(this).css({'background':'#fff','color':'#333'})
		});
		$('#'+city+' .city_chose_region dd a').mousedown(function (e) {
			$(this).css({'background':'#1064c1','color':'#fff'})
		});
		$('#'+city+' .city_chose_region dd a').mouseup(function (e) {
			$(this).css({'background':'#398be4','color':'#fff'})
		});

		//点击关闭按钮，城市选择模块隐藏
		$('#'+city+' .city_search_input .delete_city').on('click',function () {
			$('#'+city).hide();
		});

		//城市输入框获取焦点显示搜索内容框，失去焦点隐藏
		$('#'+city+' .input').on('focus',function (e) {
			// $('#city_chose').show();
			$('#'+city+' .city_search_input .input_letters_search').css({"display":"block"});
			$('#'+city+' .city_search_input .input_letters').val('');
		});
		$('#'+city+' .city_search_input .input_letters').on('blur',function (e) {
			// $('#city_chose').show();
			$('#'+city+' .city_search_input .input_letters').val('请输入城市');
			$('#'+city+' .city_search_input .input_letters_search').css({"display":"none"})
		});
	});

//城市模块hover显示，离开隐藏
	var cityChange=(function (current,city) {
		$('#'+city+' .city_chose_region dd a').on('click',function () {
			$('#'+current).html($(this).text()+'<i></i>');
			$('#'+city).hide();
			flag=false;
		})
		$('#'+city+' .city_hot_search a').on('click',function () {
			$('#'+current).html($(this).text()+'<i></i>');
			$('#'+city).hide();
			flag=false;
		});
	});
	citySelect(target,city);
	cityHover(target,city);
	cityChange(current,city);
}

module.exports = function (target,city,current) {
	return new citySelect(target,city,current);
}

},{}],6:[function(require,module,exports){
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

})(jQuery);

},{}],7:[function(require,module,exports){

/**
 * [favoriteMod description]收藏
 * @param  {[type]}   type     [0   收藏，1取消收藏]
 * @param  {[type]}   objectid   [数据id]
 * @param  {Function} favoritetype [收藏类型]
 * @return {[type]}            [description]
 */
require('./../_login_alert.js');
var userPath = "http://i.qichedaquan.com";
var path;
var collect = $('#collect');
var objectid = collect.attr("shareid");
var favoritetype = collect.attr("sharetype");
require('./../layer/layer');
$(function(){
    bindEvents();
});
function bindEvents(){
    isfavorite(objectid,favoritetype,function(response){});
    
    collect.click(function(){
        //判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            if(window.login){
                login.getLoginHtml&&login.getLoginHtml();
            }
            
            return;
        }
        favoriteMod(objectid,favoritetype,function(data,type){
            if(type == 1 && data.code == 10000 && data.data == 1){
                  $("#collect").attr("op-data",0);
                collect.find('i').attr('class','icon-collect').end().find('span').text('收藏');
               
            }else{
                  $("#collect").attr("op-data",1);
                collect.find('i').attr('class','icon-collected').end().find('span').text('已收藏');
            }
        })
    })
};
//收藏或取消收藏
function favoriteMod(objectid,favoritetype,callback){
    
        var type = $("#collect").attr("op-data");

        if(type == 1){
            path = userPath + "/favorite/cancel?favoritetype="+favoritetype+"&objectid=" + objectid;
        }else{
            path = userPath + "/favorite/add?favoritetype="+favoritetype+"&objectid=" + objectid;
        }

        $.ajax({
            type: "get",
            url: path,
            dataType: "jsonp",
            cache: false,
            jsonp: 'callback',
            success: function (data) {
                callback&&callback(data,type);
            },
            error: function (msg) {
                layer.msg("操作出错，请稍后重新发送");
            }
        });
    
}

//判断是否被收藏

function isfavorite(objectid,favoritetype,cb){
    //判断是否登录
    if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
        
        return;
    }

    path = userPath + "/favorite/isfavorite?favoritetype="+favoritetype+"&objectid=" + objectid;

    $.ajax({
        type: "get",
        url: path,
        dataType: "jsonp",
        cache: false,
        jsonp: 'callback',
        success: function (response) {
            if(response.code = 10000 && response.data == 1){
                $("#collect").attr("op-data",1);
                collect.find('i').attr('class','icon-collected').end().find('span').text('已收藏');
                   
            }else{
                $("#collect").attr("op-data",0);
                collect.find('i').attr('class','icon-collect').end().find('span').text('收藏');
            }
            cb&&cb(response);
        },
        error: function (msg) {
            layer.msg("操作出错，请稍后重新发送");
        }
    });
}
module.exports = {
    favoriteMod: favoriteMod,
    isfavorite: isfavorite
};

},{"./../_login_alert.js":1,"./../layer/layer":3}]},{},[2])