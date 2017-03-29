/*****
 *@author: linyh
 *@from: Global style articleDetail
 *@description: 陈璐
 *@date: name (2017.02.24)
*/

(function(){

    var basePath = "http://news.m.qichedaquan.com";
    var userPath = "http://i.m.qichedaquan.com";

    //var picPath = "http://localhost:8989/wap/";
    var picPath = "http://static.qcdqcdn.com/wap/";

    // 文章目录
    showCatalog();
    function showCatalog(){
        $("#loadMore").on("click",function(){
            $("#morePage").show();
            $("#catalog").show();
            $(this).hide();
        })

        $("#catalog").on("click",function(){
            $(".mask").show();
            $("#catalog_area").animate({'bottom':'0'},500,function(){
                $("#cancle_turn").show();
                isBodyScroll(true);
            });
        })

        $("#cancle_turn").on("click",function(){
            $(".mask").hide();
            $(this).hide();
            $("#catalog_area").animate({'bottom':'-100%'},500,function(){
                isBodyScroll(false);
            });
        })
    }


    $("#catalog_area").on("click",".catalog_list li",function(){
        $("#cancle_turn").fadeOut();
        $(".mask").fadeOut();
        $("#catalog_area").animate({"bottom":"-100%"},500);
    })


    $(".article_content img").bind("click",function(e){
        var index = $(".article_content img").index(this);
        var newsid = $("#newsid").val();
        window.location.href = picPath + "article_picture.html?newsid=" + newsid + "&picindex=" + index;
    });

    //点赞

    //文章点赞
    $('.zan').on('click',function(){
        //新闻id
        var newsid = $("#newsid").val();

        //ajax请求路径
        var path = basePath+"/comment/voteByjsonp";

        //判断是否已点赞  1 点赞  0 未点赞
        if($.cookie('article_zan_'+newsid) == 1){
            alertDiv({type:"2",des:"已点赞",time:"3000",fn:function(){}});
            return false;
        }

        var params = {};
        params.newsId = newsid;
        $.ajax({
            type: "POST",
            url: path,
            data: params,
            dataType:"jsonp",
            cache: false,
            jsonp:'jsonCallback',
            success: function (response) {
                if(response.code == 10000) {
                    alertDiv({type:"2",des:"点赞成功",time:"3000",fn:function(){}});
                    if($("#span_dz_id").html().indexOf("万")==-1){
                        var num=$("#span_dz_id").html();
                        num=parseInt(num);
                        num++;
                        $("#span_dz_id").html(num);
                    }
                    $(".zan").addClass("zan_checked");
                    $.cookie('article_zan_'+newsid,1);
                }else{
                    alertDiv({type:"2",des:response.msg,time:"3000",fn:function(){}});
                }
            },
            error: function (msg) {
                alertDiv({type:"2",des:"操作出错，请稍后重新发送",time:"3000",fn:function(){}});
            }
        });

    })

    //评论中的点赞
    $('.hot_review').delegate('.comment_zan ',"click",function(){


        var _this=this;
        var commentId = $(this).attr("op-date");
        var voteId = $(this).attr("op-child");

        //ajax请求路径
        var path = basePath + "/comment/voteCommentByjsonp";

        //判断是否已点赞  1 点赞  0 未点赞
        if($.cookie('comment_zan_'+commentId) == 1 ){
            alertDiv({type:"2",des:"已点赞",time:"3000",fn:function(){}});
            return false;
        }

        var params = {};
        params.commentId = commentId;
        $.ajax({
            type: "POST",
            url: path,
            data: params,
            dataType:"jsonp",
            cache: false,
            jsonp:'jsonCallback',
            success: function (response) {
                if(response.code == 10000) {
                    alertDiv({type:"2",des:"已点赞",time:"3000",fn:function(){}});
                    var num=$(_this).find(".comment_zan_num").html();
                    num=parseInt(num);
                    num++;
                    $(_this).find(".comment_zan_num").html(num);
                    //选中
                    $(_this).addClass("comment_zan_checked");
                    //更新cookie
                    $.cookie('comment_zan_'+commentId,1);
                }else{
                    alertDiv({type:"2",des:response.msg,time:"3000",fn:function(){}});
                }
            },
            error: function (msg) {
                alertDiv({type:"2",des:"操作出错，请稍后重新发送",time:"3000",fn:function(){}});
            }
        });

    })

    // 收藏
    $(".collect").on("click",function(){
        //查看cookie 判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        collect();
    })

    //底部收藏
    $(".collect_btn").on("click",function(){
        //查看cookie 判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        collect();
    })

    function  collect(){
        //新闻id
        var newsid = $("#newsid").val();
        //获取收藏类型 1 已收藏 0 未收藏
        var type = $("#em_collect").attr("collect");
        var path = userPath + "/favorite/add?favoritetype=4&objectid=" + newsid;
        if(type == 1){
            path = userPath + "/favorite/cancel?favoritetype=4&objectid=" + newsid;
        }
        $.ajax({
            type: "get",
            url: path,
            dataType:"jsonp",
            cache: false,
            jsonp:'callback',
            success: function (response) {
                if(response.code == 10000) {
                    if (type == 1){
                        alertDiv({type:"2",des:"取消收藏",time:"3000",fn:function(){}});
                        $("#em_collect").attr("collect",0);
                        $('#em_collec').html('收藏本文');

                        $(".collect").removeClass("collect_checked");
                        $(".collect_btn").removeClass("collect_btn_checked");
                    }else{
                        alertDiv({type:"2",des:"收藏成功",time:"3000",fn:function(){}});
                        $("#em_collect").attr("collect",1);
                        $('#em_collec').html('取消收藏');
                        $(".collect").addClass("collect_checked");
                        $(".collect_btn").addClass("collect_btn_checked");
                    }
                }else{
                    alertDiv({type:"2",des:response.msg,time:"3000",fn:function(){}});
                }
            },
            error: function (msg) {
                alertDiv({type:"2",des:"操作出错，请稍后重新发送",time:"3000",fn:function(){}});
            }
        });
    }


    // 弹层效果
    var $mask = $(".mask"),
        $maskUp = $(".zsh_sf_mask"),
        $review = $("#review"),
        $fixedTip = $(".zsh_wx");

    //回复
    $(".hot_review").delegate('.comment_reply','click',function(){
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        var username = $(this).attr("data-name");
        var commentid = $(this).attr("data-comment");
        $(".reply").attr("data-comment",commentid);
        $("#replyContent").focus();
        isIos(true);
        $(".mask").fadeIn();
        $(".review_area").animate({'bottom':'0'},500,function(){
            $(".publish").hide().siblings('.reply').show();
            $("#replyContent").attr("placeholder","回复"+username);
        });
    })

    // 评论
    showReview($review);
    function showReview(reviewBtn){
        reviewBtn.on("click",function(){
            //根据cookie判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
                var url = window.location.href;
                window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
                return;
            }
            $(".mask").fadeIn();
            $("#replyContent").focus();
            isIos(true);
            $(".review_area").animate({'bottom':'0'},500,function(){
                if(reviewBtn == $review){
                    $('.reply').hide().siblings(".publish").show();
                    $("#replyContent").attr("placeholder","我来说两句...");
                }else{
                    $(".publish").hide().siblings('.reply').show();
                    $("#replyContent").attr("placeholder","回复雨晴");
                }
            });
        })
    }

    $("#replyContent").on("input",function(){
        if($(this).val() == ''){
            $(".re_btn").find("a").css("color","#ccc");
        }else{
            $(".re_btn").find("a").css("color","#2799fe");
        }
    })



    //评论事件
    $(".publish").click(function() {
        //根据cookie判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        //评论内容
        var s_html = $("#replyContent").val();
        if (s_html == '' || s_html == '我来说两句...') {
            alertDiv({type:"2",des:"请输入评论内容！",time:"3000",fn:function(){}});
            return;
        }
        //新闻id
        var newsid = $("#newsid").val();
        //ajax请求路径
        var path = basePath + "/comment/addCommentByjsonp";

        var params = {};
        params.newsId = newsid;
        params.content = s_html;
        $.ajax({
            type: "POST",
            url: path,
            data: params,
            dataType:"jsonp",
            cache: false,
            jsonp:'jsonCallback',
            success: function (response) {
                if(response.code == 10000) {
                    //回复框隐藏
                   /* $mask.fadeOut();
                    $(".review_area").animate({'bottom':'-100%'},500);
                    //更新评论数
                    if($("#pl_num_id").html().indexOf("万")==-1){
                        var num=$("#pl_num_id").html();
                        num=parseInt(num);
                        num++;
                        $("#pl_num_id").html(num);
                    }*/
                    window.location.href = basePath + "/comment/pages?newsid="+newsid+"&pageNo=1&queryType=time";
                }else{
                    alertDiv({type:"2",des:response.msg,time:"3000",fn:function(){}});
                }
            },
            error: function (msg) {
                alertDiv({type:"2",des:"操作出错，请稍后重新发送",time:"3000",fn:function(){}});
            }
        });

    });

    //回复
    $(".reply").click(function() {
        //根据cookie判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            var url = window.location.href;
            window.location.href = "http://i.m.qichedaquan.com/user/login?callback="+url;
            return;
        }
        var s_html = $("#replyContent").val();
        if (s_html == '' || s_html.indexOf("回复")>0) {
            alertDiv({type:"2",des:"请输入回复内容！",time:"3000",fn:function(){}});
            return;
        }
        var _this=this;
        //新闻id
        var newsid = $("#newsid").val();
        var commentId = $(this).attr("data-comment");

        //ajax请求路径
        var path = basePath + "/comment/addReplyByjsonp";

        var params = {};
        params.commentId = commentId;
        params.newsId = newsid;
        params.content = s_html;
        $.ajax({
            type: "POST",
            url: path,
            data: params,
            dataType:"jsonp",
            cache: false,
            jsonp:'jsonCallback',
            success: function (response) {
                if(response.code == 10000) {
                    //回复框隐藏
                 /*   $mask.fadeOut();
                    $(".review_area").animate({'bottom':'-100%'},500);
                    //更新评论数
                    if($("#pl_num_id").html().indexOf("万")==-1){
                        var num=$("#pl_num_id").html();
                        num=parseInt(num);
                        num++;
                        $("#pl_num_id").html(num);

                    }*/
                window.location.href = basePath + "/comment/pages?newsid="+newsid+"&pageNo=1&queryType=time";
                }else{
                    alertDiv({type:"2",des:response.msg,time:"3000",fn:function(){}});
                }
            },
            error: function (msg) {
                alertDiv({type:"2",des:"操作出错，请稍后重新发送",time:"3000",fn:function(){}});
            }
        });




    });



    $('#replyContent').on('keyup',textarea_maxlen)
    function textarea_maxlen(){
        var text=$(this).val();
        var length=text.length;
        $("#numid").html(length);
    }


    // 显示分享弹层
    showMask($mask,$("#share"),$(".zsh_shareLayer"),"0");
    // 显示微信提示弹层
    showMask($maskUp,$(".wx"),$(".wx_fixed_tip"),"40%");
    function showMask(mask,showBtn,showClass,bottomSize){
        showBtn.on("click",function(){
            mask.fadeIn();
            showClass.animate({'bottom':bottomSize},500);
        })
    }

    // 隐藏分享弹层
    hideMask($mask,$(".zsh_cancel"),$(".zsh_shareLayer"));
    // 隐藏评论输入框
    hideMask($mask,$(".cancle"),$(".review_area"));
    // 隐藏微信分享提示层
    hideMask($maskUp,$maskUp,$(".wx_fixed_tip"));
    function hideMask(mask,hideBtn,hideClass){
        hideBtn.on("click",function(){
            mask.fadeOut();
            hideClass.animate({'bottom':'-100%'},500,function(){
                isIos(false);
            });
        })
    }

    // 显示隐藏底部固定分享微信提示弹层
    fixShare($fixedTip);
    fixShare($maskUp);
    function fixShare(shareBtn){
        shareBtn.on("click",function(){
            if(shareBtn == $fixedTip){
                $maskUp.fadeIn();
                $(".zsh_sf_layer").fadeIn();
            }else if(shareBtn == $maskUp){
                $maskUp.fadeOut();
                $(".zsh_sf_layer").fadeOut();
            }
        })
    }

})();
