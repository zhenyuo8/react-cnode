/**
     * Created by admin on 2017/1/5.
     */
    //var basePath = "http://localhost:8080";
    
    var basePath = "http://news.qichedaquan.com";
    var userPath = "http://i.qichedaquan.com";
    require('./layer/layer');
    $(document).ready(function(){


        //收藏 阅读 分享 评论 想编辑提问 功能


        //收藏 阅读 分享 评论 想编辑提问 功能
        (function(){
            $('.recommend-read-word li:nth-of-type(even)').css('marginRight','0')
        })();
        (function(){
            if($('.recommend-read-word li').length<6){
                $('.more_des').hide()
            }
        })();
        //登录
        $(".login").on('click',function(){
            login.getLoginHtml("pl_login");
        });
        //注册
        $(".sign").on('click',function(){
            var surl=window.location.href ;
             if (surl.indexOf("?md=")>0){
                 surl = surl.split('?')[0];
             }
            surl = surl +"?md=pl_login";
            window.open("http://i.qichedaquan.com/user/register.html?callback="+surl);
        });
        //收藏文章
        //$(".car-type-introduce").delegate('.Js-share-read-active .Js-collect','click',function(){
        $('.Js-share-read-active .Js-collect').on('click',function(){
            //查看cookie 判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
                login.getLoginHtml();
                return;
            }
            collect();
        })
        $('#PiecePeoplesCarBuy').delegate('.js-menu','mouseover',function () {
            var index=$(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $('#js-tab-warp ul').eq(index).show().siblings().hide();
        })
        $('.Js-collect-bot').on('click',function(){
            //查看cookie 判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
                login.getLoginHtml("collect-news");
                return;
            }
            collect();
        })

        function  collect(){
            //新闻id
            var newsid = $("#newsid").val();
            //获取收藏类型 1 已收藏 0 未收藏
            var type = $(".icon-shouchang-top").attr("collect");
            var path = userPath + "/favorite/add?favoritetype=4&objectid=" + newsid;
            if(type == 1){
                if(!window.confirm('您确定要取消收藏文章吗？')){
                    return;
                }
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
                            $(".icon-shouchang-top").attr("collect",0);
                            $(".Js-collect-bot").attr("collect",0);
                            $('.Js-collect span').html('收藏文章');
                            $('.shou-box').html('收藏文章')
                            $('.Js-collect span').removeAttr('style');
                            $('.Js-collect-bot').removeAttr('style');

                        }else{
                            $(".icon-shouchang-top").attr("collect",1);
                            $(".Js-collect-bot").attr("collect",1);
                            $('.Js-collect span').html('已收藏');
                            $('.shou-box').html('已收藏')
                            $('.Js-collect span').css('backgroundPosition', '0px -300px')
                            $('.Js-collect-bot').css('backgroundColor', '#aaa');

                        }
                    }else{
                        layer.msg(response.msg);
                    }
                },
                error: function (msg) {
                    layer.msg("操作出错，请稍后重新发送");
                }
            });
        }
        //文章点赞
        $('.Js-fine-c').one('click',function(){
            //新闻id
            var newsid = $("#newsid").val();
            //用户id
            var userId = 101;
            //ajax请求路径
            var path = basePath+"/comment/voteByjsonp";

            //判断是否已点赞  1 点赞  0 未点赞
            if($.cookie('article_zan_'+newsid) == 1){
                //layer.msg("该文章，你已点赞");
                return false;
            }

            var params = {};
            params.newsId = newsid;
            params.userId = userId;
            $.ajax({
                type: "POST",
                url: path,
                data: params,
                dataType:"jsonp",
                cache: false,
                jsonp:'jsonCallback',
                success: function (response) {
                    if(response.code == 10000) {
                        if($("#span_dz_id").html().indexOf("万")==-1){
                            var num=$("#span_dz_id").html();
                            num=parseInt(num);
                            num++;
                            $("#span_dz_id").html(num);
                            $(this).find('a').css('backgroundColor','#aaa');
                        }


                        $.cookie('article_zan_'+newsid,1);
                    }else{
                        layer.msg(response.msg);
                    }
                },
                error: function (msg) {
                    layer.msg("操作出错，请稍后重新发送");
                }
            });

        })
        $('.Js-share-read-active .Js-read').click(function(){
            $('.Js-page-index').hide();
            $('.Js-page-index-box').find('a').removeClass('active')
        })
        $(".comments-con").delegate('.c-zan-icon','click',function(){
            $(this).addClass("icon-zan_c").removeClass("icon-zan_h");
            $(this).next().css("color","#ff8003");
        }) ;
        $(".comments-con").delegate('.reply-btn','mouseenter mouseleave',function(event){
            if(event.type == "mouseenter"){
                $(this).addClass("icon-comments_icon_h").removeClass("icon-comments_icon");
            }else if(event.type == "mouseleave"){
                $(this).addClass("icon-comments_icon").removeClass("icon-comments_icon_h");
            }
        })
        $(".comments-con").delegate('.reply-btn','click',function(){
            //根据cookie判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
                 login.getLoginHtml();

            }else {
                $(this).addClass("icon-comments_icon_c").removeClass("icon-comments_icon_h");
                $(this).parents(".comments-type").find(".reply-box").show();
                $(this).parents(".comments-type").find(".reply-release").show();
            }

        })
        //文章导航条吸顶
        var tarEleTop=$('.Js-share-read-active').offset().top;
        $(window).on('scroll',function(){
            if($(window).scrollTop()>tarEleTop){
                $('.Js-share-read-active').css({
                    'position': 'fixed',
                    'top':'0px',
                    'margin':'0px',
                    'z-index':'100'
                })
            }else if($(window).scrollTop()<tarEleTop){
                $('.Js-share-read-active').css({
                    'position': 'static',
                    'margin-top': '12px'
                })
            }
        })
        //文章导航条 点击分享事件
        $('.Js-share').on('mouseover mouseleave',function(event){
            if(event.type=='mouseover'){
                $('.icon-share-top').css({
                    'background': 'url(http://static.qcdqcdn.com/img/sam_share_h.png)no-repeat left center'
                })
                $('.Js_share_warp').show();
                $('.Js_share_warp').on('mouseover mouseleave',function(event){
                    if(event.type=='mouseover'){
                        $('.Js_share_warp').show();
                        $('.icon-share-top').css({
                            'background': 'url(http://static.qcdqcdn.com/img/sam_share_h.png)no-repeat left center'
                        })
                    }else if(event.type=='mouseleave'){
                        $('.Js_share_warp').hide();
                        $('.icon-share-top').css({
                            'background': 'url(http://static.qcdqcdn.com/img/sprite.png)',
                            'background-position':'0px -135px'
                        })
                    }
                })
            }else if(event.type=='mouseleave'){
                $('.Js_share_warp').hide();
                $('.icon-share-top').css({
                    'background': 'url(http://static.qcdqcdn.com/img/sprite.png)',
                    'background-position':'0px -135px'
                })
            }

        })

        $('.Js_wx_top_share').on('click',function(){
            $('.Js_erweima').toggle()
            $('.Js_close_btn').toggle()
        })
        $('.Js_close_btn').on('click',function(){
            $('.Js_erweima').hide()
            $(this).hide();
        })
        //评论回复事件
        $(".submit").click(function() {
            //根据cookie判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
               // login.getLoginHtml();
                return;
            }
            //评论内容
            var s_html = $(".textarea").val();
            if (s_html == '' || s_html == '文明上网，理性发言') {
                layer.msg('请输入评论内容！');
                return;
            }
            s_html = s_html.replace(/\n|\r\n/g,"<br>");
            //新闻id
            var newsid = $("#newsid").val();
            //ajax请求路径
            var path = basePath + "/comment/addCommentByjsonp";

            var params = {};
            params.userId = $("#userid").val();
            params.userName = $("#username").val();
            params.userImage =$("#userimg").val();
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
                        var newsitem =
                            " <div class='comments-type clearfix'>" +
                            "<dl class='clearfix'>" +
                            "<dt class='fl photo-box po-r'>" +
                            "<img src='"+params.userImage+"' width='60' height='60'/>" +
                            "<span class='photo-mask'></span>" +
                            "<span class='floor'></span>" +
                            "</dt>" +
                            "<dd class='fr'>" +
                            "<p class='fl nt'>" +
                            "<span class='c-name'>"+params.userName+"</span>" +
                            "<span class='c-time'>刚刚</span>" +
                            " </p>" +
                            "<p class='c-con fl'>" + s_html + "</p>" +
                            "<p class='c-zan fr'>" +
                            "<span class='fl zan_wrap' op-date="+response.data+" op-child=''>" +
                            "<span class='icon-fine_norme fl'><img src='http://static.qcdqcdn.com/img/zan_c_03.png' alt=''></span>" +
                            "<span class='c-zan-num fl'>（0）</span>" +
                            "</span>" +
                            "<span class='icon-text_norme reply-btn fl'><img src='http://static.qcdqcdn.com/img/messge_03.png' alt=''></span>" +
                            "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "<textarea class='reply-box' placeholder='回复：'></textarea>" +
                            "<input type='button' value='发布' class='reply-release fr'/>" +
                            "<input type='hidden' value='"+response.data+"' >" +
                            "</div>";
                        $(".comments-con").prepend(newsitem);
                        if($("#div_comment > div").length>=10){
                            $(".see-more-c").show();
                        }
                        $(".textarea").val('');
                        $(".textarea").placeholder({
                            'word': '文明上网，理性发言'
                        });
                        $(".reply-box").placeholder({
                            'word': '回复：'
                        })
                        //更新评论数
                        if($("#span_pl_id").html().indexOf("万")==-1){
                            var num=$("#span_pl_id").html();
                            num=parseInt(num);
                            num++;
                            $("#span_pl_id").html(num);
                        }
                        //更新评论数
                        if($("#pl_num_id").html().indexOf("万")==-1){
                            var n=$("#pl_num_id").html();
                            n = n.substring(1,n.indexOf("条"));
                            n=parseInt(n);
                            n++;
                            $("#pl_num_id").html("("+n+"条)");
                        }
                    }else{
                        layer.msg(response.msg);
                    }
                },
                error: function (msg) {
                    layer.msg("操作出错，请稍后重新发送");
                }
            });

        });
        $(".textarea").placeholder({
            'word': '文明上网，理性发言'
        });
        $(".reply-box").placeholder({
            'word':'回复：'
        });
        $(".comments-con").delegate('.reply-release','click',function(){
            //根据cookie判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
                //login.getLoginHtml();
                return;
            }
            var release_html=$(this).prev().val();
            if(release_html==''||release_html=='回复：'){
                return;
            }else if (release_html.indexOf("</script>")>0){
                layer.msg("内容包含特殊字符");
                return;
            }
            release_html = release_html.replace(/\n|\r\n/g,"<br>");
            var _this=this;
            //新闻id
            var newsid = $("#newsid").val();
            var commentId = $(this).next().val();

            //ajax请求路径
            var path = basePath + "/comment/addReplyByjsonp";

            var params = {};
            params.userId = $("#userid").val();
            params.userName = $("#username").val();
            params.userImage =$("#userimg").val();
            params.commentId = commentId;
            params.newsId = newsid;
            params.content = release_html;
            $.ajax({
                type: "POST",
                url: path,
                data: params,
                dataType:"jsonp",
                cache: false,
                jsonp:'jsonCallback',
                success: function (response) {
                    if(response.code == 10000) {
                        $(_this).hide();
                        $(_this).prev().hide();
                        var a=$(_this).parents('.comments-type').find('.c-con');
                        var a_html=a.html();
                        var r=$(_this).parents('.comments-type').find('.r_box');
                        var r_con = '<div class="c-borderB fl"><p><span class="c-borderB-new">'+params.userName+'发布于刚刚发表' +
                            '</span><span class="c-borderB-con">'+a_html+'</span></p></div>';
                        r.html('').html(r_con);
                        a.html('').html(release_html);
                        $(".reply-box").val('');
                        //更新评论数
                        if($("#span_pl_id").html().indexOf("万")==-1){
                            var num=$("#span_pl_id").html();
                            num=parseInt(num);
                            num++;
                            $("#span_pl_id").html(num);
                        }
                        //更新评论数
                        if($("#pl_num_id").html().indexOf("万")==-1){
                            var n=$("#pl_num_id").html();
                            n = n.substring(1,n.indexOf("条"));
                            n=parseInt(n);
                            n++;
                            $("#pl_num_id").html("("+n+"条)");
                        }
                    }else{
                        layer.msg(response.msg);
                    }
                },
                error: function (msg) {
                    layer.msg("操作出错，请稍后重新发送");
                }
            });




        });




        //上一页 下一页  单页  点击事件
        $('.Js-page-index').delegate('.Js-w38','click',function(){
            $(this).parent().find('a').removeClass('active');
            $(this).find('a').addClass('active');
        })
        //分页下面的微信分享
        $(".Js-wx-share").on('click',function(){
            $('.fenxiang,.dele_close').show();
        })
        $(".dele_close").on('click',function(){
            $('.fenxiang,.dele_close').hide();
        })
        //Tab('js-left-tap','js-tab-warp','active','js-show','mouseover')
        //回到顶部
        $('#go-top').click(function(){
            $('html,body').animate({scrollTop:0},200);
        })
        //监听滚动条 go-top按钮显示   隐藏
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $('#go-top').css('display','block');
            }else{
                $('#go-top').css('display','none');
            }
        });

        //发表评论输入框获取，失去焦点

        $(".textarea").focus(function(){
            $(".submit").css("background","#FFA904");
        })
        $(".textarea").blur(function(){
            var val=$(this).val();
            if(val != '' && val != '文明上网，理性发言'){
                $(".submit").css("background","#FFA904");
            }else{
                $(".submit").css("background","#aaa");
            }

        })
        //回复输入框获取，失去焦点
        $(".comments-con").delegate('.reply-box','focus',function(){
            $(".reply-release").css("background","#FFA904");
        })
        $(".comments-con").delegate('.reply-box','blur',function(){
            var r_val=$(this).val();
            if(r_val != '' && r_val != '回复'){
                $(".reply-release").css("background","#FFA904");
            }else{
                $(".reply-release").css("background","#aaa");
            }
        })
        //回复中的点赞
        $('.comments-con').delegate('.zan_wrap',"click",function(){


            var _this=this;
            var commentId = $(this).attr("op-date");
            var voteId = $(this).attr("op-child");
            //用户id
            var userId = 101;
            //ajax请求路径
            var path = basePath + "/comment/voteCommentByjsonp";

            //判断是否已点赞  1 点赞  0 未点赞
            if($.cookie('comment_zan_'+commentId) == 1 || voteId > 0){
               // layer.msg("该评论，你已点赞");
                return false;
            }

            var params = {};
            params.commentId = commentId;
            params.userId = userId;
            $.ajax({
                type: "POST",
                url: path,
                data: params,
                dataType:"jsonp",
                cache: false,
                jsonp:'jsonCallback',
                success: function (response) {
                    if(response.code == 10000) {
                        var num=$(_this).find(".c-zan-num").html();
                        num=num.replace('（','');
                        num=num.replace('）','');
                        num=parseInt(num);
                        num++;
                        $(_this).find(".c-zan-num").html('（'+num+'）');
                        //更新cookie
                        $.cookie('comment_zan_'+commentId,1);
                        //$.cookie("comment_zan_"+commentId,1, {expires:30,path:'/',domain:'qichedaquan.com',secure: false,raw:false});
                    }else{
                        layer.msg(response.msg);
                    }
                },
                error: function (msg) {
                    layer.msg("操作出错，请稍后重新发送");
                }
            });

        })

        //评论中点击回复按钮
        $(".comments-con").delegate('.reply-btn','click',function(){


            //根据cookie判断是否登录
            if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
                //login.getLoginHtml();
                return;
            }else {
                if($(this).hasClass('s_flag')){
                    $(this).parents(".comments-type").find(".reply-box,.reply-release").show();
                    $(this).removeClass('s_flag');
                    $(this).css({
                        'background-image': 'url("http://static.qcdqcdn.com/img/sprite.png")',
                        'background-position': '0px -322px'
                    })
                }else{
                    $(this).parents(".comments-type").find(".reply-box,.reply-release").hide();
                    $(this).addClass('s_flag');
                    $(this).css({
                        'background-image': 'url("http://static.qcdqcdn.com/img/sprite.png")',
                        'background-position': '0px -343px'
                    })
                }
            }

        })
        //停售年款下拉列表
        $('.imgs_no_border').on('mouseover mouseleave',function(event){
            var event=arguments.callee.caller.arguments[0] || window.event;
            if(event.type=='mouseover'){
                $('.stop_list').show()
                $('.stop_list_w').on('mouseover mouseleave',function(event){
                    if(event.type=='mouseover'){
                        $('.stop_list').show()
                    }else if(event.type=='mouseleave'){
                        $('.stop_list').hide()
                    }
                })
            }else if(event.type=='mouseleave'){
                $('.stop_list').hide()
            }
        })
        $(".stop_list").delegate('li','click',function(){
            $(this).parent().hide();
        })

        //点击删除按钮，大图页面关闭
        $('#delete_bg').on('click',function () {
            $('#big_img').hide();
        })


        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }


        function noScr(){
            var scrollFunc=function(e){
                e=e||window.event;
                if (e&&e.preventDefault){
                    e.preventDefault();
                    e.stopPropagation();
                }else{
                    e.returnvalue=false;
                    return false;
                }
            }
            if(window.addEventListener){
                window.addEventListener('DOMMouseScroll',scrollFunc,false);
                window.addEventListener('mousewheel',scrollFunc,false);
            }
            else{
                window.onmousewheel=scrollFunc;
            }
        }


        $('.textarea').on('keyup',textarea_maxlen)
        $('#div_comment').on('keyup','.reply-box',reply_box_maxlen)
        function textarea_maxlen(){
            var text=$(this).val();
            var length=text.length;
            if(length>500){
                $('.submit').css('background','rgb(170, 170, 170)')
                $('.submit').attr('disabled',true)
            }else{
                $('.submit').css('background','rgb(255, 169, 4)')
                $('.submit').attr('disabled',false)
            }
        }

        function reply_box_maxlen(){
            var text=$(this).val();
            var length=text.length;
            if(length>500){
                $(this).next().css('background','rgb(170, 170, 170)')
                $(this).next().attr('disabled',true)
            }else{
                $(this).next().css('background','rgb(255, 169, 4)')
                $(this).next().attr('disabled',false)
            }
        }




        md();

        function md(){
            //定位描点
            var md=GetQueryString("md");
            if(md !=null && md.toString().length>1)
            {
                var target_top =  $("#"+md).offset().top-200;
                $('html, body').animate({scrollTop:target_top}, 500);
            }
        }

    });