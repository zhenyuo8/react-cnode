(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style articlereview
 *@description: 陈璐
 *@date: name (2017.03.01)
*/

$(function(){

    //var tabMsg = require('./_mod_scrollTab');
    setHeight();

    // 弹层效果
    var $mask = $(".mask"),
        $review = $(".review_input");


    // 评论
    showReview($review);
    
    function showReview(reviewBtn){
        reviewBtn.on("click",function(){
            var  $this=$(this);
            $(".mask").fadeIn();
            $("#replyContent").focus();
            isIos(true);
            $(".review_area").animate({'bottom':'0'},500,function(){
                    $('.reply_btn').css('display','none');
                    $(".publish").show();
                    $("#replyContent").attr("placeholder","我来说两句...");
                    $("#replyContent").val("");
                    $("#b").html("0");
            });
        })
    }
    $(".review_content").delegate('.comment_reply',"click",function(){
        var  $this=$(this);
        $(".mask").fadeIn();
        $("#replyContent").focus();
        isIos(true);
        $(".review_area").animate({'bottom':'0'},500,function(){
          $("#replySend").attr("comment-id",$this.attr("comment-id"));
          $(".publish").hide();
          $('.reply_btn').css('display','block');
          $("#replyContent").attr("placeholder","回复"+ $this.parents("dl").find(".comment_name").text());
          $("#replyContent").val("");
          $("#b").html("0");

        });
    })
    //textarea输入框数字限定
    var LastCount=0;
    function CountStrByte(Message,Used){
        var ByteCount=0;
        var StrValue=Message.value;
        var StrLength=Message.value.length;
        var MaxValue=200;
        if(LastCount!=StrLength){
            for(i=0;i <StrLength;i++){
                    ByteCount=ByteCount+1;
                    if(ByteCount>MaxValue){
                            Message.value=StrValue.substring(0,i);
                            ByteCount=MaxValue;
                            break;
                    };
            }
            Used.innerHTML=ByteCount;
        }else{
            Used.innerHTML=ByteCount;
        }
    }
    $("#replyContent").on('keydown',function(){
        var inAnswer=document.getElementById('replyContent');
        var b=document.getElementById('b');
        CountStrByte(inAnswer,b);
    })
    $("#replyContent").on('keyup',function(){
        var inAnswer=document.getElementById('replyContent');
        var b=document.getElementById('b');
        CountStrByte(inAnswer,b);
    })

    //设置默认页面高度
    function setHeight(){
        var w_height=$(window).height();
        var h_height=$('.pub_head').height();
        var t_height=$('.tab_title').height();
        var s_height=$('.small_nav').height();
        var f_height=$('.video_fte').height();
        var z_height=$('.zhanwei').height();
        var content_height=w_height-h_height-t_height-s_height-f_height-z_height-30; 
        $('.review_swiper_box').each(function(){
            $(this).css('min-height',content_height)
        })
    }

    $("#publishSend").click(function() {
        //查看cookie 判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        if( !isLogin){
          return;
        }
        var queryType = $("#queryType").val();

        var text =$("#replyContent").val();
        //  var text =$('.text_area').val();
        //ajax请求路径
        var path = "/comment/addComment";
        //新闻id
        var newsId = $("#newsId").val();
        var params = {};
        text =  text.replace(/\n|\r\n/g,"<br>");
        params.newsId = newsId;
        params.userId = userId;
        params.userName = nickName;
        params.userImage = userAvatar;
        //params.userId = 33;
        //params.userName = "seven";
        //params.userImage = "http://static.xingyuanauto.com:8888/img/pic/photo.png";//"http://static.xingyuanauto.com:8888/img/pic/photo.png";
        params.content = text;
        Page.ajaxPost(path,params,true,function(response) {
            //debugger;
            if(response.code == 10000) {

                var newsitem = '<dl class="comment_list clearfix">'+
                    '<dt><img src="'+params.userImage+'"></dt>'+
                    '<dd>'+
                    '<span class="comment_name">'+params.userName+'</span>'+
                    '<span class="comment_tier"></span>'+
                    '</dd>'+
                    '<dd class="commnet_text">'+text+'</dd>'+
                '<dd>'+
                '<span class="comment_time">'+formatDate(new Date())+'</span>'+
                    '<span class="comment_interaction">'+
                    '<span class="comment_zan">'+
                    '<i class="comment_zan_icon"></i>'+
                   '<i class="comment_zan_num">0</i>'+
                    '</span>'+
                    '<span class="comment_reply" comment-id="'+response.data+'">'+'</span>'+
                    '</span>'+
                    '</dd>'+
                    '</dl>';
                if(queryType=='hot'){
                    $(".hot_review").prepend(newsitem);
                }else{
                    $(".newest_review").prepend(newsitem);
                }

                $(".action_tips").text("评论成功").fadeIn();
            }
            else{
                $(".action_tips").text(response.msg).fadeIn();
                //alertDiv({type:"2",des:response.msg,time:"500"});
            }
        },function() {

        });
    });
    $("#replySend").click(function() {
        //查看cookie 判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        if( !isLogin){
            return;
        }
        var queryType = $("#queryType").val();
        var cla="hot_review";
        if(queryType=="time"){
            cla="newest_review";
        }
        //评论id
        var commentId=parseInt($(this).attr("comment-id"));
       var context= $("."+cla).find(".comment_reply[comment-id='"+commentId+"']").parents("dl").find(".commnet_text").text();
       var name= $("."+cla).find(".comment_reply[comment-id='"+commentId+"']").parents("dl").find(".comment_name").text();
        var text =$("#replyContent").val();
        if(text==''||text=='回复：'){
            return;
        }else if (text.indexOf("</script>")>0){
            alert("内容包含特殊字符");
            return;
        }else{

            //新闻id
            var newsid = $("#newsId").val();

            //ajax请求路径
            var path = "/comment/addReply";
            text =  text.replace(/\n|\r\n/g,"<br>");
            var params = {};
            params.commentId = commentId;
            params.newsId = newsid;
            params.userId = userId;
            params.userName = nickName;
            params.userImage = userAvatar;
            //params.userId = 33;
            //params.userName = "seven";
            //params.userImage = "http://static.xingyuanauto.com:8888/img/pic/photo.png";// userAvatar;
            params.content =text;
            Page.ajaxPost(path,params,true,function(response) {
                    debugger;
                    console.log(response.code);
                    if(response.code == 10000) {

                        var newsitem =
                            '<dl class="comment_list clearfix">'+
                            '<dt><img src="'+ params.userImage+'"></dt>'+
                            '<dd>'+
                            '<span class="comment_name">'+params.userName+'</span>'+
                            '<span class="comment_tier"></span>'+
                            '</dd>'+
                            '<dd class="commnet_text">'+text+'</dd>'+
                            '<dd class="reply">'+
                            '<span>'+name+'发布评论</span>'+
                            '<p>'+context+'</p>'+
                            '</dd>'+
                            '<dd>'+
                            '<span class="comment_time">'+formatDate(new Date())+'</span>'+
                            '<span class="comment_interaction">'+
                            '<span class="comment_zan">'+
                            '<i class="comment_zan_icon"></i>'+
                            '<i class="comment_zan_num">0</i>'+
                            '</span>'+
                            '<span class="comment_reply" comment-id="'+response.data+'">'+'</span>'+
                            '</span>'+
                            '</dd>'+
                            '</dl>';
                        //$(".reply-box").val('');

                        if(queryType=='hot'){
                            $(".hot_review").prepend(newsitem);
                        }else{
                            $(".newest_review").prepend(newsitem);
                        }
                        $(".action_tips").text("回复成功").fadeIn();
                    } else{
                        $(".action_tips").text(response.msg).fadeIn();
                    }
                },
                function() {

                });

        }
    });


    $(".load_more").click(function()  {
        $("#loading").css("display","inline-block");
        var pageNum;
        var queryType = $("#queryType").val();
        if(queryType=='hot'){
            pageNum= $("#hotPage").val();
        }else{
            pageNum = $("#timePage").val();
        }
        //新闻id
        var newsid = $("#newsId").val();
        var path = "/comment/pageOnSelect";
        var params = {};
        params.newsid = newsid;
        params.pageNo = parseInt(pageNum)+1;

        if(queryType=='hot'){
            $("#hotPage").val( params.pageNo);
        }else{
            $("#timePage").val( params.pageNo);
        }
        params.queryType = queryType;
        Page.ajaxPost(path,params,true,function(response) {
                //debugger;
                if(response.code == 10000) {
                    var comments=response.data.comment;
                    var pages=response.data.page;
                    if(pages.totalPage==params.pageNo){
                        $(".load_more").hide();

                        $(".no_more").css("display","inline-block");
                    }
                    if(comments.length>0){
                        // $(".comments-con").empty();
                        $.each(comments ,function(n,obj) {
                             var zan="";
                            if(obj.voteId){
                                zan=" comment_zan_checked"
                            }

                            var newsitem =
                                '<dl class="comment_list clearfix">' +
                                '<dt><img src="' + obj.userHeadurl + '"></dt>' +
                                '<dd>' +
                                '<span class="comment_name">' + obj.userName + '</span>' +
                                '<span class="comment_tier"></span>' +
                                '</dd>' +
                                '<dd class="commnet_text">' +  obj.commentSummary + '</dd>';
                            if (obj.referUserId) {
                                if (obj.referUserId > 0) {
                                    newsitem = newsitem + '<dd class="reply">' +
                                        '<span>' + obj.referUserName + '发布评论</span>' +
                                        '<p>' + obj.referSummary + '</p>' +
                                        '</dd>';
                                }
                            }
                            newsitem = newsitem + '<dd>' +
                                '<span class="comment_time">' + formatDate(obj.createTime) + '</span>' +
                                '<span class="comment_interaction">' +
                                '<span class="comment_zan'+zan+'" comment-id="'+obj.commentId+'">' +
                                '<i class="comment_zan_icon"></i>' +
                                '<i class="comment_zan_num">' + obj.voteCount + '</i>' +
                                '</span>' +
                                '<span class="comment_reply" comment-id="' + obj.commentId + '">' + '</span>' +
                                '</span>' +
                                '</dd>' +
                                '</dl>';
                            if (queryType == 'time') {
                                $(".newest_review").append(newsitem);

                            }
                            else {
                                $(".hot_review").append(newsitem);

                            }
                        });
                        //加载页面后重新调整区域高度
                        $("#loading").hide();
                        if(queryType=='hot'){

                            $("#reviewModule").height($(".hot_swiper").height());
                        }else{
                            $("#reviewModule").height($(".newest_swiper").height());

                        }
                    }
                }
            }
            ,
            function() {

            });
    });

    $("#time").on('click',function() {
        $("#queryType").val('time');
        var timePage = $("#timePage").val();
        if (timePage == '0') {

            //新闻id
            var newsid = $("#newsId").val();
            var queryType = "time";

            var path = "/comment/pageOnSelect";
            var pageNum=1;
            var params = {};
            params.newsid = newsid;
            params.pageNo = pageNum;
            params.queryType = queryType;
            Page.ajaxPost(path,params,true,function(response) {
                    if(response.code == 10000) {
                        var comments=response.data.comment;
                        var pages=response.data.page;
                        if(pages.totalPage==params.pageNo){
                            $(".load_more").hide();

                            $(".no_more").css("display","inline-block");
                        }
                        if(comments.length>0){
                            // $(".comments-con").empty();
                            $.each(comments ,function(n,obj) {
                                var zan="";
                                if(obj.voteId){
                                    zan=" comment_zan_checked"
                                }
                                var newsitem =
                                    '<dl class="comment_list clearfix">' +
                                    '<dt><img src="' + obj.userHeadurl + '"></dt>' +
                                    '<dd>' +
                                    '<span class="comment_name">' + obj.userName + '</span>' +
                                    '<span class="comment_tier"></span>' +
                                    '</dd>' +
                                    '<dd class="commnet_text">' +  obj.commentSummary + '</dd>';
                                if (obj.referUserId) {
                                    if (obj.referUserId > 0) {
                                        newsitem = newsitem + '<dd class="reply">' +
                                            '<span>' + obj.referUserName + '发布评论</span>' +
                                            '<p>' + obj.referSummary + '</p>' +
                                            '</dd>';
                                    }
                                }
                                newsitem = newsitem + '<dd>' +
                                    '<span class="comment_time">' + formatDate(obj.createTime) + '</span>' +
                                    '<span class="comment_interaction">' +
                                    '<span class="comment_zan'+zan+'" comment-id="'+obj.commentId+'">' +
                                    '<i class="comment_zan_icon"></i>' +
                                    '<i class="comment_zan_num">' + obj.voteCount + '</i>' +
                                    '</span>' +
                                    '<span class="comment_reply" comment-id="' + obj.commentId + '">' + '</span>' +
                                    '</span>' +
                                    '</dd>' +
                                    '</dl>';
                                if (queryType == 'time') {
                                    $(".newest_review").append(newsitem);

                                }
                                else {
                                    $(".hot_review").append(newsitem);
                                }
                            });
                            $("#reviewModule").height($(".newest_swiper").height());//加载页面后重新调整区域高度
                            $("#timePage").val(1);
                        }
                    }
                }
                ,
                function() {

                });
        }

    });
            //loadMoreData(1,newsid,time);

    $("#hot").on('click',function() {
        $("#queryType").val('hot');

        var hotPage = $("#hotPage").val();
        if (hotPage == '0') {

            //新闻id
            var newsid = $("#newsId").val();
            var queryType = "hot";

            var path = "/comment/pageOnSelect";
            var pageNum=1;
            var params = {};
            params.newsid = newsid;
            params.pageNo = pageNum;
            params.queryType = queryType;
            Page.ajaxPost(path,params,true,function(response) {
                    if(response.code == 10000) {
                        var comments=response.data.comment;
                        var pages=response.data.page;
                        if(pages.totalPage==params.pageNo){
                            $(".load_more").hide();

                            $(".no_more").css("display","inline-block");
                        }
                        if(comments.length>0){
                            // $(".comments-con").empty();
                            $.each(comments ,function(n,obj) {
                                var zan="";
                                if(obj.voteId){
                                    zan=" comment_zan_checked"
                                }
                                var newsitem =
                                    '<dl class="comment_list clearfix">' +
                                    '<dt><img src="' + obj.userHeadurl + '"></dt>' +
                                    '<dd>' +
                                    '<span class="comment_name">' + obj.userName + '</span>' +
                                    '<span class="comment_tier"></span>' +
                                    '</dd>' +
                                    '<dd class="commnet_text">' +  obj.commentSummary + '</dd>';
                                if (obj.referUserId) {
                                    if (obj.referUserId > 0) {
                                        newsitem = newsitem + '<dd class="reply">' +
                                            '<span>' + obj.referUserName + '发布评论</span>' +
                                            '<p>' + obj.referSummary + '</p>' +
                                            '</dd>';
                                    }
                                }
                                newsitem = newsitem + '<dd>' +
                                    '<span class="comment_time">' + formatDate(obj.createTime) + '</span>' +
                                    '<span class="comment_interaction">' +
                                    '<span class="comment_zan'+zan+'" comment-id="'+obj.commentId+'">' +
                                    '<i class="comment_zan_icon"></i>' +
                                    '<i class="comment_zan_num">' + obj.voteCount + '</i>' +
                                    '</span>' +
                                    '<span class="comment_reply" comment-id="' + obj.commentId + '">' + '</span>' +
                                    '</span>' +
                                    '</dd>' +
                                    '</dl>';
                                if (queryType == 'time') {
                                    $(".newest_review").append(newsitem);

                                }
                                else {
                                    $(".hot_review").append(newsitem);
                                }
                            });
                            $("#reviewModule").height($(".hot_swiper").height());//加载页面后重新调整区域高度
                            $("#hotPage").val(1);
                        }
                    }
                }
                ,
                function() {

                });
        }
    });

    // 隐藏评论输入框
    hideMask($mask,$(".cancle"),$(".review_area"));
    function hideMask(mask,hideBtn,hideClass){
        hideBtn.on("click",function(){
            mask.fadeOut();
            hideClass.animate({'bottom':'-100%'},500,function(){
                isIos(false);
            });
        })
    }
    // 发布状态提示
    $(".re_btn a").on("click",function(){
        //var tipText = $(this).text()+"成功";
        //$(".action_tips").text(tipText).fadeIn();
        // 隐藏评论输入框
        $mask.fadeOut();
        $(".review_area").animate({'bottom':'-100%'},500,function(){
            isIos(false)
        });
        setInterval(function(){
            $(".action_tips").fadeOut();
        },2000);
    })
    // 发布回复按钮可点击状态
    $("#replyContent").on("input",function(){
        if($(this).val() == ''){
            $(".re_btn").find("a").css("color","#ccc");
        }else{
            $(".re_btn").find("a").css("color","#2799fe");
        }
    })

    // 点赞
    $("#reviewModule").delegate('.comment_zan',"click",function(){
        if($(this).hasClass('comment_zan_checked')){
            //$(this).removeClass('comment_zan_checked');
            $(".action_tips").text("已赞").fadeIn();
        }else{
            var commentSpan = $(this);

            //评论id
            var commentId= parseInt(commentSpan.attr("comment-id"));
            var voteCount= parseInt(commentSpan.find(".comment_zan_num").text());
            //ajax请求路径
            var path = "/comment/voteComment";

            var params = {};
            params.commentId = commentId;
            if(userId){
                params.userId  =userId;
            }else{
                params.userId=0;
            }

            Page.ajaxPost(path,params,true,function(response) {
               // debugger;
                console.log(response.code);
                if(response.code == 10000) {
                    //num=voteCount
                    //num=num.replace('（','');
                    //num=num.replace('）','');
                    var  num=parseInt(voteCount);
                    num++;
                    commentSpan.find(".comment_zan_num").html(num);
                    commentSpan.addClass('comment_zan_checked');
                    $(".action_tips").text("点赞成功").fadeIn();
                } else{
                    $(".action_tips").text(response.msg).fadeIn();
                }
            },function() {
                $(".action_tips").text(response.msg).fadeIn();
            });
        }
        setInterval(function(){
            $(".action_tips").fadeOut();
        },2000);
    })

    //tab切换
    var swiper = new Swiper('.swiper-container', {
        pagination: '',
        paginationClickable: true,
        autoHeight: true,
        onSlideChangeStart: function(swiper){
            var li_index=swiper.activeIndex;
            if(li_index==0){

            }
            else if(li_index==0){

            }
            $('.tab_title li').eq(li_index).find("a").addClass('current');
            $('.tab_title li').eq(li_index).siblings().find("a").removeClass('current');
        }
    });
    $('.tab_title li').on('click',function(){
        var index=$(this).index();
        $(this).find("a").addClass('current')
        $(this).siblings().find("a").removeClass('current');
        swiper.slideTo(index, 500, false);
    })

})
},{}]},{},[1])