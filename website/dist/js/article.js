(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./layer/layer":2}],2:[function(require,module,exports){
/*! layer-v3.0.3 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */
 ;!function(e,t){"use strict";var i,n,a=e.layui&&layui.define,o={getPath:function(){var e=document.scripts,t=e[e.length-1],i=t.src;if(!t.getAttribute("merge"))return i.substring(0,i.lastIndexOf("/")+1)}(),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},r={v:"3.0.3",ie:function(){var t=navigator.userAgent.toLowerCase();return!!(e.ActiveXObject||"ActiveXObject"in e)&&((t.match(/msie\s(\d+)/)||[])[1]||"11")}(),index:e.layer&&e.layer.v?1e5:0,path:o.getPath,config:function(e,t){return e=e||{},r.cache=o.config=i.extend({},o.config,e),r.path=o.config.path||r.path,"string"==typeof e.extend&&(e.extend=[e.extend]),o.config.path&&r.ready(),e.extend?(a?layui.addcss("modules/layer/"+e.extend):r.link("skin/"+e.extend),this):this},link:function(t,n,a){if(r.path){var o=i("head")[0],s=document.createElement("link");"string"==typeof n&&(a=n);var l=(a||t).replace(/\.|\//g,""),f="layuicss-"+l,c=0;s.rel="stylesheet",s.href=r.path+t,s.id=f,i("#"+f)[0]||o.appendChild(s),"function"==typeof n&&!function u(){return++c>80?e.console&&console.error("layer.css: Invalid"):void(1989===parseInt(i("#"+f).css("width"))?n():setTimeout(u,100))}()}},ready:function(e){var t="skinlayercss",i="303";return a?layui.addcss("modules/layer/default/layer.css?v="+r.v+i,e,t):r.link("skin/default/layer.css?v="+r.v+i,e,t),this},alert:function(e,t,n){var a="function"==typeof t;return a&&(n=t),r.open(i.extend({content:e,yes:n},a?{}:t))},confirm:function(e,t,n,a){var s="function"==typeof t;return s&&(a=n,n=t),r.open(i.extend({content:e,btn:o.btn,yes:n,btn2:a},s?{}:t))},msg:function(e,n,a){var s="function"==typeof n,f=o.config.skin,c=(f?f+" "+f+"-msg":"")||"layui-layer-msg",u=l.anim.length-1;return s&&(a=n),r.open(i.extend({content:e,time:3e3,shade:!1,skin:c,title:!1,closeBtn:!1,btn:!1,resize:!1,end:a},s&&!o.config.skin?{skin:c+" layui-layer-hui",anim:u}:function(){return n=n||{},(n.icon===-1||n.icon===t&&!o.config.skin)&&(n.skin=c+" "+(n.skin||"layui-layer-hui")),n}()))},load:function(e,t){return r.open(i.extend({type:3,icon:e||0,resize:!1,shade:.01},t))},tips:function(e,t,n){return r.open(i.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:210},n))}},s=function(e){var t=this;t.index=++r.index,t.config=i.extend({},t.config,o.config,e),document.body?t.creat():setTimeout(function(){t.creat()},30)};s.pt=s.prototype;var l=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];l.anim=["layer-anim","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],s.pt.config={type:0,shade:.3,fixed:!0,move:l[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},s.pt.vessel=function(e,t){var n=this,a=n.index,r=n.config,s=r.zIndex+a,f="object"==typeof r.title,c=r.maxmin&&(1===r.type||2===r.type),u=r.title?'<div class="layui-layer-title" style="'+(f?r.title[1]:"")+'">'+(f?r.title[0]:r.title)+"</div>":"";return r.zIndex=s,t([r.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+a+'" times="'+a+'" style="'+("z-index:"+(s-1)+"; background-color:"+(r.shade[1]||"#000")+"; opacity:"+(r.shade[0]||r.shade)+"; filter:alpha(opacity="+(100*r.shade[0]||100*r.shade)+");")+'"></div>':"",'<div class="'+l[0]+(" layui-layer-"+o.type[r.type])+(0!=r.type&&2!=r.type||r.shade?"":" layui-layer-border")+" "+(r.skin||"")+'" id="'+l[0]+a+'" type="'+o.type[r.type]+'" times="'+a+'" showtime="'+r.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+s+"; width:"+r.area[0]+";height:"+r.area[1]+(r.fixed?"":";position:absolute;")+'">'+(e&&2!=r.type?"":u)+'<div id="'+(r.id||"")+'" class="layui-layer-content'+(0==r.type&&r.icon!==-1?" layui-layer-padding":"")+(3==r.type?" layui-layer-loading"+r.icon:"")+'">'+(0==r.type&&r.icon!==-1?'<i class="layui-layer-ico layui-layer-ico'+r.icon+'"></i>':"")+(1==r.type&&e?"":r.content||"")+'</div><span class="layui-layer-setwin">'+function(){var e=c?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return r.closeBtn&&(e+='<a class="layui-layer-ico '+l[7]+" "+l[7]+(r.title?r.closeBtn:4==r.type?"1":"2")+'" href="javascript:;"></a>'),e}()+"</span>"+(r.btn?function(){var e="";"string"==typeof r.btn&&(r.btn=[r.btn]);for(var t=0,i=r.btn.length;t<i;t++)e+='<a class="'+l[6]+t+'">'+r.btn[t]+"</a>";return'<div class="'+l[6]+" layui-layer-btn-"+(r.btnAlign||"")+'">'+e+"</div>"}():"")+(r.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],u,i('<div class="layui-layer-move"></div>')),n},s.pt.creat=function(){var e=this,t=e.config,a=e.index,s=t.content,f="object"==typeof s,c=i("body");if(!t.id||!i("#"+t.id)[0]){switch("string"==typeof t.area&&(t.area="auto"===t.area?["",""]:[t.area,""]),t.shift&&(t.anim=t.shift),6==r.ie&&(t.fixed=!1),t.type){case 0:t.btn="btn"in t?t.btn:o.btn[0],r.closeAll("dialog");break;case 2:var s=t.content=f?t.content:[t.content,"auto"];t.content='<iframe scrolling="'+(t.content[1]||"auto")+'" allowtransparency="true" id="'+l[4]+a+'" name="'+l[4]+a+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+t.content[0]+'"></iframe>';break;case 3:delete t.title,delete t.closeBtn,t.icon===-1&&0===t.icon,r.closeAll("loading");break;case 4:f||(t.content=[t.content,"body"]),t.follow=t.content[1],t.content=t.content[0]+'<i class="layui-layer-TipsG"></i>',delete t.title,t.tips="object"==typeof t.tips?t.tips:[t.tips,!0],t.tipsMore||r.closeAll("tips")}e.vessel(f,function(n,r,u){c.append(n[0]),f?function(){2==t.type||4==t.type?function(){i("body").append(n[1])}():function(){s.parents("."+l[0])[0]||(s.data("display",s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]),i("#"+l[0]+a).find("."+l[5]).before(r))}()}():c.append(n[1]),i(".layui-layer-move")[0]||c.append(o.moveElem=u),e.layero=i("#"+l[0]+a),t.scrollbar||l.html.css("overflow","hidden").attr("layer-full",a)}).auto(a),2==t.type&&6==r.ie&&e.layero.find("iframe").attr("src",s[0]),4==t.type?e.tips():e.offset(),t.fixed&&n.on("resize",function(){e.offset(),(/^\d+%$/.test(t.area[0])||/^\d+%$/.test(t.area[1]))&&e.auto(a),4==t.type&&e.tips()}),t.time<=0||setTimeout(function(){r.close(e.index)},t.time),e.move().callback(),l.anim[t.anim]&&e.layero.addClass(l.anim[t.anim]),t.isOutAnim&&e.layero.data("isOutAnim",!0)}},s.pt.auto=function(e){function t(e){e=s.find(e),e.height(f[1]-c-u-2*(0|parseFloat(e.css("padding-top"))))}var a=this,o=a.config,s=i("#"+l[0]+e);""===o.area[0]&&o.maxWidth>0&&(r.ie&&r.ie<8&&o.btn&&s.width(s.innerWidth()),s.outerWidth()>o.maxWidth&&s.width(o.maxWidth));var f=[s.innerWidth(),s.innerHeight()],c=s.find(l[1]).outerHeight()||0,u=s.find("."+l[6]).outerHeight()||0;switch(o.type){case 2:t("iframe");break;default:""===o.area[1]?o.fixed&&f[1]>=n.height()&&(f[1]=n.height(),t("."+l[5])):t("."+l[5])}return a},s.pt.offset=function(){var e=this,t=e.config,i=e.layero,a=[i.outerWidth(),i.outerHeight()],o="object"==typeof t.offset;e.offsetTop=(n.height()-a[1])/2,e.offsetLeft=(n.width()-a[0])/2,o?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=n.width()-a[0]:"b"===t.offset?e.offsetTop=n.height()-a[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=n.width()-a[0]):"rb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=n.width()-a[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?n.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?n.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=n.scrollTop(),e.offsetLeft+=n.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=n.height()-(i.find(l[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},s.pt.tips=function(){var e=this,t=e.config,a=e.layero,o=[a.outerWidth(),a.outerHeight()],r=i(t.follow);r[0]||(r=i("body"));var s={width:r.outerWidth(),height:r.outerHeight(),top:r.offset().top,left:r.offset().left},f=a.find(".layui-layer-TipsG"),c=t.tips[0];t.tips[1]||f.remove(),s.autoLeft=function(){s.left+o[0]-n.width()>0?(s.tipLeft=s.left+s.width-o[0],f.css({right:12,left:"auto"})):s.tipLeft=s.left},s.where=[function(){s.autoLeft(),s.tipTop=s.top-o[1]-10,f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left+s.width+10,s.tipTop=s.top,f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",t.tips[1])},function(){s.autoLeft(),s.tipTop=s.top+s.height+10,f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left-o[0]-10,s.tipTop=s.top,f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",t.tips[1])}],s.where[c-1](),1===c?s.top-(n.scrollTop()+o[1]+16)<0&&s.where[2]():2===c?n.width()-(s.left+s.width+o[0]+16)>0||s.where[3]():3===c?s.top-n.scrollTop()+s.height+o[1]+16-n.height()>0&&s.where[0]():4===c&&o[0]+16-s.left>0&&s.where[1](),a.find("."+l[5]).css({"background-color":t.tips[1],"padding-right":t.closeBtn?"30px":""}),a.css({left:s.tipLeft-(t.fixed?n.scrollLeft():0),top:s.tipTop-(t.fixed?n.scrollTop():0)})},s.pt.move=function(){var e=this,t=e.config,a=i(document),s=e.layero,l=s.find(t.move),f=s.find(".layui-layer-resize"),c={};return t.move&&l.css("cursor","move"),l.on("mousedown",function(e){e.preventDefault(),t.move&&(c.moveStart=!0,c.offset=[e.clientX-parseFloat(s.css("left")),e.clientY-parseFloat(s.css("top"))],o.moveElem.css("cursor","move").show())}),f.on("mousedown",function(e){e.preventDefault(),c.resizeStart=!0,c.offset=[e.clientX,e.clientY],c.area=[s.outerWidth(),s.outerHeight()],o.moveElem.css("cursor","se-resize").show()}),a.on("mousemove",function(i){if(c.moveStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1],l="fixed"===s.css("position");if(i.preventDefault(),c.stX=l?0:n.scrollLeft(),c.stY=l?0:n.scrollTop(),!t.moveOut){var f=n.width()-s.outerWidth()+c.stX,u=n.height()-s.outerHeight()+c.stY;a<c.stX&&(a=c.stX),a>f&&(a=f),o<c.stY&&(o=c.stY),o>u&&(o=u)}s.css({left:a,top:o})}if(t.resize&&c.resizeStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1];i.preventDefault(),r.style(e.index,{width:c.area[0]+a,height:c.area[1]+o}),c.isResize=!0,t.resizing&&t.resizing(s)}}).on("mouseup",function(e){c.moveStart&&(delete c.moveStart,o.moveElem.hide(),t.moveEnd&&t.moveEnd(s)),c.resizeStart&&(delete c.resizeStart,o.moveElem.hide())}),e},s.pt.callback=function(){function e(){var e=a.cancel&&a.cancel(t.index,n);e===!1||r.close(t.index)}var t=this,n=t.layero,a=t.config;t.openLayer(),a.success&&(2==a.type?n.find("iframe").on("load",function(){a.success(n,t.index)}):a.success(n,t.index)),6==r.ie&&t.IE6(n),n.find("."+l[6]).children("a").on("click",function(){var e=i(this).index();if(0===e)a.yes?a.yes(t.index,n):a.btn1?a.btn1(t.index,n):r.close(t.index);else{var o=a["btn"+(e+1)]&&a["btn"+(e+1)](t.index,n);o===!1||r.close(t.index)}}),n.find("."+l[7]).on("click",e),a.shadeClose&&i("#layui-layer-shade"+t.index).on("click",function(){r.close(t.index)}),n.find(".layui-layer-min").on("click",function(){var e=a.min&&a.min(n);e===!1||r.min(t.index,a)}),n.find(".layui-layer-max").on("click",function(){i(this).hasClass("layui-layer-maxmin")?(r.restore(t.index),a.restore&&a.restore(n)):(r.full(t.index,a),setTimeout(function(){a.full&&a.full(n)},100))}),a.end&&(o.end[t.index]=a.end)},o.reselect=function(){i.each(i("select"),function(e,t){var n=i(this);n.parents("."+l[0])[0]||1==n.attr("layer")&&i("."+l[0]).length<1&&n.removeAttr("layer").show(),n=null})},s.pt.IE6=function(e){i("select").each(function(e,t){var n=i(this);n.parents("."+l[0])[0]||"none"===n.css("display")||n.attr({layer:"1"}).hide(),n=null})},s.pt.openLayer=function(){var e=this;r.zIndex=e.config.zIndex,r.setTop=function(e){var t=function(){r.zIndex++,e.css("z-index",r.zIndex+1)};return r.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",t),r.zIndex}},o.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},o.rescollbar=function(e){l.html.attr("layer-full")==e&&(l.html[0].style.removeProperty?l.html[0].style.removeProperty("overflow"):l.html[0].style.removeAttribute("overflow"),l.html.removeAttr("layer-full"))},e.layer=r,r.getChildFrame=function(e,t){return t=t||i("."+l[4]).attr("times"),i("#"+l[0]+t).find("iframe").contents().find(e)},r.getFrameIndex=function(e){return i("#"+e).parents("."+l[4]).attr("times")},r.iframeAuto=function(e){if(e){var t=r.getChildFrame("html",e).outerHeight(),n=i("#"+l[0]+e),a=n.find(l[1]).outerHeight()||0,o=n.find("."+l[6]).outerHeight()||0;n.css({height:t+a+o}),n.find("iframe").css({height:t})}},r.iframeSrc=function(e,t){i("#"+l[0]+e).find("iframe").attr("src",t)},r.style=function(e,t,n){var a=i("#"+l[0]+e),r=a.find(".layui-layer-content"),s=a.attr("type"),f=a.find(l[1]).outerHeight()||0,c=a.find("."+l[6]).outerHeight()||0;a.attr("minLeft");s!==o.type[3]&&s!==o.type[4]&&(n||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-f-c<=64&&(t.height=64+f+c)),a.css(t),c=a.find("."+l[6]).outerHeight(),s===o.type[2]?a.find("iframe").css({height:parseFloat(t.height)-f-c}):r.css({height:parseFloat(t.height)-f-c-parseFloat(r.css("padding-top"))-parseFloat(r.css("padding-bottom"))}))},r.min=function(e,t){var a=i("#"+l[0]+e),s=a.find(l[1]).outerHeight()||0,f=a.attr("minLeft")||181*o.minIndex+"px",c=a.css("position");o.record(a),o.minLeft[0]&&(f=o.minLeft[0],o.minLeft.shift()),a.attr("position",c),r.style(e,{width:180,height:s,left:f,top:n.height()-s,position:"fixed",overflow:"hidden"},!0),a.find(".layui-layer-min").hide(),"page"===a.attr("type")&&a.find(l[4]).hide(),o.rescollbar(e),a.attr("minLeft")||o.minIndex++,a.attr("minLeft",f)},r.restore=function(e){var t=i("#"+l[0]+e),n=t.attr("area").split(",");t.attr("type");r.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(l[4]).show(),o.rescollbar(e)},r.full=function(e){var t,a=i("#"+l[0]+e);o.record(a),l.html.attr("layer-full")||l.html.css("overflow","hidden").attr("layer-full",e),clearTimeout(t),t=setTimeout(function(){var t="fixed"===a.css("position");r.style(e,{top:t?0:n.scrollTop(),left:t?0:n.scrollLeft(),width:n.width(),height:n.height()},!0),a.find(".layui-layer-min").hide()},100)},r.title=function(e,t){var n=i("#"+l[0]+(t||r.index)).find(l[1]);n.html(e)},r.close=function(e){var t=i("#"+l[0]+e),n=t.attr("type"),a="layer-anim-close";if(t[0]){var s="layui-layer-wrap",f=function(){if(n===o.type[1]&&"object"===t.attr("conType")){t.children(":not(."+l[5]+")").remove();for(var a=t.find("."+s),r=0;r<2;r++)a.unwrap();a.css("display",a.data("display")).removeClass(s)}else{if(n===o.type[2])try{var f=i("#"+l[4]+e)[0];f.contentWindow.document.write(""),f.contentWindow.close(),t.find("."+l[5])[0].removeChild(f)}catch(c){}t[0].innerHTML="",t.remove()}"function"==typeof o.end[e]&&o.end[e](),delete o.end[e]};t.data("isOutAnim")&&t.addClass(a),i("#layui-layer-moves, #layui-layer-shade"+e).remove(),6==r.ie&&o.reselect(),o.rescollbar(e),t.attr("minLeft")&&(o.minIndex--,o.minLeft.push(t.attr("minLeft"))),r.ie&&r.ie<10||!t.data("isOutAnim")?f():setTimeout(function(){f()},200)}},r.closeAll=function(e){i.each(i("."+l[0]),function(){var t=i(this),n=e?t.attr("type")===e:1;n&&r.close(t.attr("times")),n=null})};var f=r.cache||{},c=function(e){return f.skin?" "+f.skin+" "+f.skin+"-"+e:""};r.prompt=function(e,t){var a="";if(e=e||{},"function"==typeof e&&(t=e),e.area){var o=e.area;a='style="width: '+o[0]+"; height: "+o[1]+';"',delete e.area}var s,l=2==e.formType?'<textarea class="layui-layer-input"'+a+">"+(e.value||"")+"</textarea>":function(){return'<input type="'+(1==e.formType?"password":"text")+'" class="layui-layer-input" value="'+(e.value||"")+'">'}(),f=e.success;return delete e.success,r.open(i.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:l,skin:"layui-layer-prompt"+c("prompt"),maxWidth:n.width(),success:function(e){s=e.find(".layui-layer-input"),s.focus(),"function"==typeof f&&f(e)},resize:!1,yes:function(i){var n=s.val();""===n?s.focus():n.length>(e.maxlength||500)?r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(e.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",s,{tips:1}):t&&t(n,i,s)}},e))},r.tab=function(e){e=e||{};var t=e.tab||{},n=e.success;return delete e.success,r.open(i.extend({type:1,skin:"layui-layer-tab"+c("tab"),resize:!1,title:function(){var e=t.length,i=1,n="";if(e>0)for(n='<span class="layui-layer-tabnow">'+t[0].title+"</span>";i<e;i++)n+="<span>"+t[i].title+"</span>";return n}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=t.length,i=1,n="";if(e>0)for(n='<li class="layui-layer-tabli xubox_tab_layer">'+(t[0].content||"no content")+"</li>";i<e;i++)n+='<li class="layui-layer-tabli">'+(t[i].content||"no  content")+"</li>";return n}()+"</ul>",success:function(t){var a=t.find(".layui-layer-title").children(),o=t.find(".layui-layer-tabmain").children();a.on("mousedown",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0;var n=i(this),a=n.index();n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"),o.eq(a).show().siblings().hide(),"function"==typeof e.change&&e.change(a)}),"function"==typeof n&&n(t)}},e))},r.photos=function(t,n,a){function o(e,t,i){var n=new Image;return n.src=e,n.complete?t(n):(n.onload=function(){n.onload=null,t(n)},void(n.onerror=function(e){n.onerror=null,i(e)}))}var s={};if(t=t||{},t.photos){var l=t.photos.constructor===Object,f=l?t.photos:{},u=f.data||[],d=f.start||0;s.imgIndex=(0|d)+1,t.img=t.img||"img";var y=t.success;if(delete t.success,l){if(0===u.length)return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var p=i(t.photos),h=function(){u=[],p.find(t.img).each(function(e){var t=i(this);t.attr("layer-index",e),u.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(h(),0===u.length)return;if(n||p.on("click",t.img,function(){var e=i(this),n=e.attr("layer-index");r.photos(i.extend(t,{photos:{start:n,data:u,tab:t.tab},full:t.full}),!0),h()}),!n)return}s.imgprev=function(e){s.imgIndex--,s.imgIndex<1&&(s.imgIndex=u.length),s.tabimg(e)},s.imgnext=function(e,t){s.imgIndex++,s.imgIndex>u.length&&(s.imgIndex=1,t)||s.tabimg(e)},s.keyup=function(e){if(!s.end){var t=e.keyCode;e.preventDefault(),37===t?s.imgprev(!0):39===t?s.imgnext(!0):27===t&&r.close(s.index)}},s.tabimg=function(e){if(!(u.length<=1))return f.start=s.imgIndex-1,r.close(s.index),r.photos(t,!0,e)},s.event=function(){s.bigimg.hover(function(){s.imgsee.show()},function(){s.imgsee.hide()}),s.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),s.imgprev()}),s.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),s.imgnext()}),i(document).on("keyup",s.keyup)},s.loadi=r.load(1,{shade:!("shade"in t)&&.9,scrollbar:!1}),o(u[d].src,function(n){r.close(s.loadi),s.index=r.open(i.extend({type:1,id:"layui-layer-photos",area:function(){var a=[n.width,n.height],o=[i(e).width()-100,i(e).height()-100];if(!t.full&&(a[0]>o[0]||a[1]>o[1])){var r=[a[0]/o[0],a[1]/o[1]];r[0]>r[1]?(a[0]=a[0]/r[0],a[1]=a[1]/r[0]):r[0]<r[1]&&(a[0]=a[0]/r[1],a[1]=a[1]/r[1])}return[a[0]+"px",a[1]+"px"]}(),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,isOutAnim:!1,skin:"layui-layer-photos"+c("photos"),content:'<div class="layui-layer-phimg"><img src="'+u[d].src+'" alt="'+(u[d].alt||"")+'" layer-pid="'+u[d].pid+'"><div class="layui-layer-imgsee">'+(u.length>1?'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>':"")+'<div class="layui-layer-imgbar" style="display:'+(a?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(u[d].alt||"")+"</a><em>"+s.imgIndex+"/"+u.length+"</em></span></div></div></div>",success:function(e,i){s.bigimg=e.find(".layui-layer-phimg"),s.imgsee=e.find(".layui-layer-imguide,.layui-layer-imgbar"),s.event(e),t.tab&&t.tab(u[d],e),"function"==typeof y&&y(e)},end:function(){s.end=!0,i(document).off("keyup",s.keyup)}},t))},function(){r.close(s.loadi),r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){u.length>1&&s.imgnext(!0,!0)}})})}},o.run=function(t){i=t,n=i(e),l.html=i("html"),r.open=function(e){var t=new s(e);return t.index}},e.layui&&layui.define?(r.ready(),layui.define("jquery",function(t){r.path=layui.cache.dir,o.run(layui.jquery),e.layer=r,t("layer",r)})):"function"==typeof define&&define.amd?define(["jquery"],function(){return o.run(e.jQuery),r}):function(){o.run(e.jQuery),r.ready()}()}(window);
},{}]},{},[1])