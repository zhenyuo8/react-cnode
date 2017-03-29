(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
    /*****
     *@author: linyh
     *@from: Global style tab滑动切换
     *@description: 陈璐
     *@date: name (2017.03.05)
     */

    /* js中引用：var tabMsg = require('./_mod_scrollTab');
     *           tabMsg(box,swiper,title);
    */
    var carparamPageNo=1;
    var carserialPageNo=1;
    var dealerPageNo=1;
    var newsPageNo=1;
    var videoPageNo=1;
    getData(1,carparamPageNo);
    getData(2,carserialPageNo);
    getData(3,dealerPageNo);
    getData(4,newsPageNo);
    getData(5,videoPageNo);
    /**
     * 删除消息
     * @param id
     */
    function onDelete(type,id) {
        $.ajax({
            url:"/favorite/cancel/"+type+"/"+id,
            type:"GET",
            dataType:"JSON",
            success:function (data) {
                if (data.errorCode!=10000){
                    alertDiv({type:"2",des:data.resultMsg,time:"3000",fn:function(){}});
                }
            }
        });
    }

    /**
     * 获取数据
     * @param type
     * @param pageNo
     */
    function getData(type,pageNo) {
        $.ajax({
            url:"/favorite/list/"+type,
            data:{"pageNo":pageNo},
            dataType:"JSON",
            success:function (data) {
                if (1==type){
                    createCarParamHtml(data);
                }
                if (2==type){
                    createCarSerialHtml(data);
                }
                if (3==type){
                    createDealerHtml(data);
                }
                if (4==type){
                    createNewsHtml(data);
                }
                if (5==type){
                    createVideoHtml(data);
                }
            },
            error:function(xmlHttpRequest){
                $('.loading').hide();
                if (xmlHttpRequest.status != 200) {
                    alertDiv({type:"2",des:"数据加载异常,请刷新重试"+xmlHttpRequest.status,time:"3000",fn:function(){}});
                }
            }
        });
    }

    /**
     * 车型创建html
     * @param data
     */
    function createCarSerialHtml(data) {
        if( data.totalCount==0){
            $("#carSerial-box .load_more_module").hide();
            $("#carSerial-box .no_content_container").show();
        }else {
            $("#carSerial-box .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#carSerial-box .load_more_module").show();
                $("#carSerial-box .load_more").show();
                $("#carSerial-box .loading").hide();
                $("#carSerial-box .no_more").hide();
                carserialPageNo=data.pageNo+1;
            }else{
                $("#carSerial-box .load_more_module").show();
                $("#carSerial-box .load_more").hide();
                $("#carSerial-box .loading").hide();
                $("#carSerial-box .no_more").show().css("display","block");
                if(data.pageNo==1){
                    $("#carSerial-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){
                html+='<div class=" model fonts clearfix">';
                html+='<a href="http://car.m.qichedaquan.com/carSerialSummary/'+list[i].serialspell+'">';
                html+='<div class="left clearfix">';
                html+='<div class="img_container">';
                html+='<img src="'+list[i].serialcover+'" alt="">';
                html+='</div>';
                html+='<div class="description">';
                html+='<p class="car_model">'+list[i].serialname+'</p>';
                html+='<p class="price">'+list[i].dealerminprice.toFixed(2)+"-"+list[i].dealermaxprice.toFixed(2)+'万</p>';
                html+='<p class="con_price">指导价： <span>'+list[i].minprice.toFixed(2)+"-"+list[i].maxprice.toFixed(2)+'万</span></p>';
                html+='</div>';
                html+='</div></a>';
                html+='<div class="right clearfix">';
                html+='<a href="http://dealer.m.qichedaquan.com/dealer/askprice/1_'+list[i].serial_id+'">';
                html+='<button type="button" name="button">询底价</button>';
                html+='</a>';
                html+='<span class="delete_collect" data-type="2" data-id="'+list[i].id+'">删除收藏</span>';
                html+='</div>';
                html+='</div>';
            }
            $("#carSerialContent").append(html);
        }
        $(".swiper-wrapper").height($("#carSerial-box").height());
    }

    /**
     * 创建经销商html
     */
    function createDealerHtml(data) {
        if( data.totalCount==0){
            $("#dealer-box .load_more_module").hide();
            $("#dealer-box .no_content_container").show();
        }else {
            $("#dealer-box .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#dealer-box .load_more_module").show();
                $("#dealer-box .load_more").show();
                $("#dealer-box .loading").hide();
                $("#dealer-box .no_more").hide();
                if(data.pageNo==1){
                    $("#dealer-box .load_more_module").hide();
                }
                dealerPageNo=data.pageNo+1;
            }else{
                $("#dealer-box .load_more_module").show();
                $("#dealer-box .load_more").hide();
                $("#dealer-box .loading").hide();
                $("#dealer-box .no_more").show().css("display","block");
                if(data.pageNo==1){
                    $("#news-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){
                html+='<a href="http://dealer.m.qichedaquan.com/'+list[i].dealer_id+'">';
                html+='<div class="dis fonts clearfix">';
                html+='<h2><span>[4S]</span>'+list[i].dealername+'</h2>';
                html+='<p class="brand"><i>品牌 :</i>'+list[i].dealerbrand+'</p>';
                html+='<p class="promte"><i>促销 :</i>'+list[i].dealersale+'</p>';
                html+='<p class="address"><i>地址 :</i>'+list[i].dealeraddress+'</p>';
                html+='<span class="delete delete_collect" data-type="3" data-id="'+list[i].id+'">删除</span>';
                html+='</div>';
                html+='</a>';
            }
            $("#dealerContent").append(html);
        }
        if (dealerPageNo>2){//翻页的时候 需要，第一次进入页面时候不需要
            $(".swiper-wrapper").height($("#dealer-box").height());
        }
    }
    /**
     * 创建新闻html
     * @param data
     */
    function createNewsHtml(data) {
        if( data.totalCount==0){
            $("#news-box .load_more_module").hide();
            $("#news-box .no_content_container").show();
        }else {
            $("#news-box .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#news-box .load_more_module").show();
                $("#news-box .load_more").show();
                $("#news-box .loading").hide();
                $("#news-box .no_more").hide();
                newsPageNo=data.pageNo+1;
            }else{
                $("#news-box .load_more_module").show();
                $("#news-box .load_more").hide();
                $("#news-box .loading").hide();
                $("#news-box .no_more").show().css("display","block");
                if(data.pageNo==1){
                    $("#news-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){

                html+='<div class="article fonts clearfix">';
                html+='<a href="'+list[i].news_m_url+'">';
                html+='<div class="img clearfix">';
                html+='<img src="'+list[i].news_cover+'" alt="">';
                html+='</div>';
                html+='</a>';
                html+='<div class="des_article clearfix">';
                html+='<a href="'+list[i].news_m_url+'">';
                html+='<p class="det_article clearfix">'+list[i].news_title+'</p>';
                html+='</a>';
                html+='<p class="other_article clearfix">';
                html+='<span class="time clearfix"><i></i>'+list[i].createdTime+'</span>';
                html+='<span class="delete delete_collect clearfix" data-type="4" data-id="'+list[i].id+'">删除</span>';
                html+='<span class="comment clearfix">'+list[i].commentcount+'评论</span>';
                html+='</p>';
                html+='</div>';
                html+='</div>';
            }
            $("#newsContent").append(html);
        }
        if (newsPageNo>2){//翻页的时候 需要，第一次进入页面时候不需要
            $(".swiper-wrapper").height($("#news-box").height());
        }
    }

    /**
     * 创建车款html
     * @param data
     */
    function createCarParamHtml(data) {
        if( data.totalCount==0){
            $("#carparam-box .load_more_module").hide();
            $("#carparam-box .no_content_container").show();
        }else {
            $("#carparam-box .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#carparam-box .load_more_module").show();
                $("#carparam-box .load_more").show();
                $("#carparam-box .loading").hide();
                $("#carparam-box .no_more").hide();
                carparamPageNo=data.pageNo+1;
            }else{
                $("#carparam-box .load_more_module").show();
                $("#carparam-box .load_more").hide();
                $("#carparam-box .loading").hide();
                $("#carparam-box .no_more").show().css("display","block");

                if(data.pageNo==1){
                    $("#carparam-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){

                html+='<div class="name fonts clearfix">';
                html+='<a href="http://car.m.qichedaquan.com/carparam/summary/'+list[i].car_id+'">';
                html+='<div class="left clearfix">';
                html+='<div class="img_container">';
                html+='<img src="'+list[i].carcover+'" alt="">';
                html+='</div>';
                html+='<div class="description">';
                if (list[i].caryear!=null && list[i].caryear!=null && list[i].caryear!=undefined){
                    html+='<p class="car_model">'+list[i].caryear+"款 "+list[i].carname+'</p>';
                }else{
                    html+='<p class="car_model">'+list[i].carname+'</p>';
                }

                html+='<p class="price">'+list[i].dealerminprice.toFixed(2)+'万起</p>';
                html+='<p class="con_price">指导价： <span>'+list[i].carprice.toFixed(2)+'万</span></p>';
                html+='</div>';
                html+='</div>';
                html+='</a>';
                html+='<div class="right clearfix">';
                html+='<a href="http://dealer.m.qichedaquan.com/dealer/askprice/2_'+list[i].car_id+'">';
                html+='<button type="button" name="button">询底价</button>';
                html+='</a>';
                html+='<span class="delete_collect" data-type="1" data-id="'+list[i].id+'">删除收藏</span>';
                html+='</div></div>';
            }
            $("#carparamContent").append(html);
        }
        if (carparamPageNo>2){//翻页的时候 需要，第一次进入页面时候不需要
            $(".swiper-wrapper").height($("#carparam-box").height());
        }
    }

    /**
     * 创建视频html
     */
    function createVideoHtml(data) {
        if( data.totalCount==0){
            $("#video-box .load_more_module").hide();
            $("#video-box .no_content_container").show();
        }else {
            $("#video-box .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#video-box .load_more_module").show();
                $("#video-box .load_more").show();
                $("#video-box .loading").hide();
                $("#video-box .no_more").hide();
                videoPageNo=data.pageNo+1;
            }else{
                $("#video-box .load_more_module").show();
                $("#video-box .load_more").hide();
                $("#video-box .loading").hide();
                $("#video-box .no_more").show().css("display","block");
                if(data.pageNo==1){
                    $("#video-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){
                html+='<div class="video fonts clearfix">';
                html+='<a href="'+list[i].video_m_url+'">';
                html+='<div class="video_img">';
                html+='<img src="'+list[i].video_cover+'" alt="">';
                html+='<span class="default"></span>';
                html+='</div>';
                html+='</a>';
                html+='<div class="des_video clearfix">';
                html+='<a href="'+list[i].video_m_url+'">';
                html+='<p class="det_video clearfix">'+list[i].video_title+'</p>';
                html+='</a>';
                html+='<p class="other_video clearfix">';
                html+='<span class="time clearfix"><i></i>21:00</span>';
                html+='<span class="delete delete_collect clearfix" data-type="5" data-id="'+list[i].id+'">删除</span>';
                html+='<span class="comment clearfix">'+list[i].commentcount+'评论</span>';
                html+='</p>';
                html+='</div>';
                html+='</div>';
            }
            $("#videoContent").append(html);
        }
        if (videoPageNo>2){//翻页的时候 需要，第一次进入页面时候不需要
            $(".swiper-wrapper").height($("#video-box").height());
        }
    }

    /**
     * 车型加载更多
     */
    $("#carSerial-box .load_more").click(function () {
        $("#carSerial-box .load_more").hide();
        $("#carSerial-box .loading").show().css("display","block");
        getData(2,carserialPageNo);
    });
    /**
     * 车款加载更多
     */
    $("#carparam-box .load_more").click(function () {
        $("#carparam-box .load_more").hide();
        $("#carparam-box .loading").show().css("display","block");
        getData(1,carparamPageNo);
    });

    /**
     * 文章加载更多
     */
    $("#news-box .load_more").click(function () {
        $("#news-box .load_more").hide();
        $("#news-box .loading").show().css("display","block");
        getData(4,newsPageNo);
    });
    /**
     * 经销商加载更多
     */
    $("#dealer-box .load_more").click(function () {
        $("#dealer-box .load_more").hide();
        $("#dealer-box .loading").show().css("display","block");
        getData(3,dealerPageNo);
    });
    /**
     * 视频加载更多
     */
    $("#video-box .load_more").click(function () {
        $("#video-box .load_more").hide();
        $("#video-box .loading").show().css("display","block");
        getData(5,videoPageNo);
    });

    /**
     * 删除数据
     */
    function doDelete(type,id) {
        $.ajax({
            url:"/favorite/cancel/"+type+"/"+id,
            type:"GET",
            dataType:"JSON",
            success:function (data) {
                if (data.code!=10000){
                    alertDiv({type:"2",des:data.msg,time:"3000",fn:function(){}});
                }
            }
        });
    }

    // 车型 车款收藏删除
    var parentsNode,parentIndex,boxType,boxTypeId;
    $('div').delegate('.delete_collect','click',function(event){
        event.stopPropagation();
        $('.confirm_delete, .mask').show();
        parentsNode=$(this).parents('.delClass');
        parentIndex=$(this).parents('.fonts').index();
        boxType=$(this).attr("data-type");
        boxTypeId=$(this).attr("data-id");
    });

    $('#cancel').on('click',function(event){
        event.stopPropagation();
        $('.confirm_delete, .mask').hide();
        parentsNode=null;
        parentIndex=null;
        boxType=null;
        boxTypeId=null;
    })
    $('#confirm').on('click',function(event){
        event.stopPropagation();
        if(boxTypeId!=null && boxType!=null){
            doDelete(boxType,boxTypeId);
        }
        if($(parentsNode).children('.fonts').length==1){
            $(parentsNode).children('.fonts').eq(parentIndex).remove();
            $(parentsNode).parent('.swiper_box').find('.no_content_container').show();
        }else{
            $(parentsNode).children('.fonts').eq(parentIndex).remove();
            $(".swiper-wrapper").height($(parentsNode).parents(".swiper_box").height());
        }
        $('.confirm_delete, .mask').hide();
        parentsNode=null;
        parentIndex=null;
        boxType=null;
        boxTypeId=null;
    })
})

},{}]},{},[1])