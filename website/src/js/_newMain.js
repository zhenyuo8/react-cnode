require('./layer/layer');
function showVideo(){
	$('.vidplayer').show();
	$(window).scroll(function(){
		if($(window).scrollTop()>504){
			$('object,#movie_player').addClass('minplayer');
			$(".v-mask").show();
		}else{
			$('object,#movie_player').removeClass('minplayer');
			$(".v-mask").hide();
		}
	})
}
$(document).ready(function(){
     //var basePath = "http://localhost:8080";
   // var basePath = "http://v.qichedaquan.com";
    var basePath = "http://v.qichedaquan.com";
    var userPath = "http://i.qichedaquan.com";

    //登录
    $(".login").on('click',function(){
        login.getLoginHtml();
    });
    //注册
    $(".sign").on('click',function(){
        window.open("http://i.qichedaquan.com/user/register.html?callback="+window.location.href);
    });
//详情页
	//右侧视频播放排行视频和第一行标题鼠标滑过
	$('body').delegate("#ranking-con-box .ranking-play","mouseenter mouseleave",function(event){
		var type = event.type;
		if(type=="mouseenter"){
			$(this).next().find("li:eq(0)").find("a").addClass("a_hover");
			$(this).find(".ranking-play-btn").show();
		}
		if(type=="mouseleave"){
			$(this).next().find("li:eq(0)").find("a").removeClass("a_hover");
			$(this).find(".ranking-play-btn").hide();
		}
	});
	$('body').delegate("#ranking-con-box .ranking_f_li","mouseenter mouseleave",function(event){
		var type = event.type;
		if(type=="mouseenter"){
			$(this).parents(".ranking-con").find(".ranking-play-btn").show();
			$(this).find("a").addClass("a_hover")
		}
		if(type=="mouseleave"){
			$(this).parents(".ranking-con").find(".ranking-play-btn").hide();
			$(this).find("a").removeClass("a_hover")
		}
	});
	//点赞，
	$('.zan').one("click",function(){

        var _this = this;
        //视频id
        var videoId = $("#videoId").val();
        //用户id
        var userId = 101;
        //ajax请求路径
        var path = basePath+"/comment/voteByjsonp";

        //判断是否已点赞  1 点赞  0 未点赞
        if($.cookie('video_zan_'+videoId) == 1){
            layer.msg("该视频，你已点赞");
            return false;
        }

        var params = {};
        params.newsId = videoId;
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
                    if($(_this).find(".zan_num").html().indexOf("万")==-1){
                        var num=parseInt($(_this).find(".zan_num").html());

                        num++;
                        $(_this).find(".zan_num").html(num);
                        $(_this).css('background','#aaa');
                    }

                    $.cookie('video_zan_'+videoId,1);
                }else{
                    layer.msg(response.msg);
                }
            },
            error: function (msg) {
                layer.msg("操作出错，请稍后重新发送");
            }
        });

	})
    //收藏
	$('.collection').click(function(){
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            login.getLoginHtml();
        }else{
            var _this = this;
            //视频id
            var videoId = $("#videoId").val();
            //获取收藏类型 1 已收藏 0 未收藏
            var type = $(".collection").attr("collect");
            var path = userPath + "/favorite/add?favoritetype=5&objectid=" + videoId;
            if(type == 1){
                if(!window.confirm('您确定要取消收藏文章吗？')){
                    return;
                }
                path = userPath + "/favorite/cancel?favoritetype=5&objectid=" + videoId;
            }
            $.ajax({
                type: "get",
                url: path,
                dataType: "jsonp",
                cache: false,
                jsonp: 'callback',
                success: function (response) {
                    if (response.code == 10000 && response.data > 0) {
                        if (type != 1){
                            $(".collection").attr("collect",1);
                            $(_this).css('background','#aaa');
                            $('.coll_text').html('已收藏');
                        }else {
                            $(".collection").attr("collect",0);
                            $('.collection').removeAttr('style');
                            $('.coll_text').html('收藏视频');
                        }
                    } else {
                        layer.msg(response.msg);
                    }
                },
                error: function (msg) {
                    layer.msg("操作出错，请稍后重新发送");
                }
            });
        }

	})
	//分享微信二维码显示
	$(".wx").hover(function(){
		$(".Qr-code").show();
	},function(){
		setTimeout(function(){
			$(".Qr-code").hide();
		},1000)
	})
	//右侧相关视频点击
	$(".vn-right-list li").eq(0).find("a").css("color","#1064c1");
	showVideo();
	$(".vn-right-list").delegate('li','click',function(){
		$(this).find('a').css("color","#1064c1");
		$(this).siblings().find('a').css("color","#333");
		$(this).find('span').addClass('icon-blue_sanjiao sanjiao-style').removeClass('icon-blue_dian');
		$(this).siblings().find('span').addClass('icon-blue_dian').removeClass('icon-blue_sanjiao sanjiao-style');
		$(this).parent().prepend($(this));
		var video_id=$(this).attr('flag')+'1203';
		$(".vidplayer").hide();
		var con='<embed type="application/x-shockwave-flash" src="http://static.youku.com/v1.0.0155/v/swf/player.swf?VideoIDS='+video_id +'" width="704" height="460" id="movie_player" name="movie_player" bgcolor="#FFFFFF" quality="high" allowfullscreen="true" wmode="opaque" allowscriptaccess="always" flashvars="showAd=0&Cp=0&Light=on&THX=&Tid=0&Version=/v1.0.0662&show_ce=1&isAutoPlay=true" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
		$(".playArea").html('').append(con);
		$(".vn-play a").click(function(){
			showVideo();
		})
	})
	//相关视频中点击更多
	// $(".vn-more").click(function(){
	// 	var sign=$(".sanjiao-style").parent().attr("newtarget");
 //        window.open("video.html?newtarget="+sign,"newwindow")
 //    })
	//评论中点击回复按钮
	$(".comments-con").delegate('.reply-btn','click',function(){
		if($(this).hasClass('s_flag')){
			$(this).parents(".comments-type").find(".reply-box,.reply-release").show();
			$(this).removeClass('s_flag');
			$(this).css({
				'background-image': 'url("http://static.xingyuanauto.com:8888/img/sprite.png")',
				'background-position': '0px -322px'
			})
		}else{
			$(this).parents(".comments-type").find(".reply-box,.reply-release").hide();
			$(this).addClass('s_flag');
			$(this).css({
				'background-image': 'url("http://static.xingyuanauto.com:8888/img/sprite.png")',
				'background-position': '0px -343px'
			})
		}
	})
	//查看全部评论点击
	var r_len=$(".comments-con1").find(".comments-type").size();
	if(r_len==0){
		$(".see-more-c").hide();
	}else{
		$(".see-more-c").show();
	}
	//发表评论输入框获取，失去焦点
	$(".textarea").focus(function(){
		$(document).keyup(function(){
			var val=$(".textarea").val();
			if(val != '' && val != '文明上网，理性发言'){
				$(".submit").css("background","#FFA904");
			}else{
				$(".submit").css("background","#aaa");
			}
		})
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
	$(".comments-con").delegate('.reply-box','focus',function(event){
		var _this=this;
		$(document).keyup(function(){
			var val=$(_this).val();
			if(val != '' && val != '回复'){
				$(_this).next().css("background","#FFA904");
			}else{
				$(_this).next().css("background","#aaa");
			}
		})
	})
	//回复中的点赞
    $('.comments-con').delegate('.zan_wrap',"click",function(){

        var _this=this;
        var commentId = $(this).attr("op-date");

        var voteId = $(this).attr("op-child");

        //ajax请求路径
        var path = basePath + "/comment/voteCommentByjsonp";

        //判断是否已点赞  1 点赞  0 未点赞
        if($.cookie('video_comment_zan_'+commentId) == 1 || voteId > 0){
          //  alert("该评论，你已点赞");
            return false;
        }

        var params = {};
        params.commentId = commentId;
        //params.userId = userId;
        $.ajax({
            type: "POST",
            url: path,
            data: params,
            dataType:"jsonp",
            cache: false,
            jsonp:'jsonCallback',
            success: function (response) {
                if(response.code == 10000) {
                    var num=$(_this).find('.c-zan-num').html();
                    num=num.replace('（','');
                    num=num.replace('）','');
                    num=parseInt(num);
                    num++;
                    $(_this).find('.c-zan-num').html('（'+num+'）').css('color','#aaa');
                    $(_this).find('.c-zan-icon').css('background-image','url("http://static.xingyuanauto.com:8888/img/zan_gray.png")');
                    $(_this).removeClass('zan_wrap_h');
                    $.cookie('video_comment_zan_'+commentId,1) ;
                }else{
                    layer.msg(response.msg);
                }
            },
            error: function (msg) {
                layer.msg("操作出错，请稍后重新发送");
            }
        });


	})
    //评论回复事件
    $(".submit").click(function() {
        //根据cookie判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            //login.getLoginHtml();
            return;
        }
        //评论内容
        var s_html = $(".textarea").val();
        if (s_html == '' || s_html == '文明上网，理性发言') {
            layer.msg('请输入评论内容！');
            return;
        }
        s_html = s_html.replace(/\n|\r\n/g,"<br>");
        //视频id
        var videoId = $("#videoId").val();
        //用户id
        //var userId = 101;
        //ajax请求路径
        var path = basePath + "/comment/addCommentByjsonp";

        var params = {};
        params.newsId = videoId;
        params.userId = $("#userid").val();
        params.userName = $("#username").val();
        params.userImage =$("#userimg").val();
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
                        "<img src='http://static.xingyuanauto.com:8888/img/pic/photo.png' width='60' height='60'/>" +
                        "<span class='photo-mask'></span>" +
                        "<span class='floor'></span>" +
                        "</dt>" +
                        "<dd class='fr'>" +
                        "<p class='fl nt'>" +
                        "<span class='c-name'>"+params.userName+"</span>" +
                        "<span class='c-time'></span>" +
                        " </p>" +
                        "<p class='c-con fl'>" + s_html + "</p>" +
                        "<p class='c-zan fr'>" +
                        "<span class='fl zan_wrap'>" +
                        "<span class='icon-fine_norme fl'><img src='http://static.xingyuanauto.com:8888/img/zan_c_03.png' alt=''></span>" +
                        "<span class='c-zan-num fl'>（0）</span>" +
                        "</span>" +
                        "<span class='icon-text_norme reply-btn fl'><img src='http://static.xingyuanauto.com:8888/img/messge_03.png' alt=''></span>" +
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
                    if($("#span_pl_num").html().indexOf("万")==-1){
                        var num=$("#span_pl_num").html();
                        num=parseInt(num);
                        num++;
                        $("#span_pl_num").html(num);
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
        var _this=this;
        //视频id
        var videoId = $("#videoId").val();
        var commentId = $(this).next().val();
        release_html = release_html.replace(/\n|\r\n/g,"<br>");
        //用户id
        var userId = 101;
        //ajax请求路径
        var path = basePath + "/comment/addReplyByjsonp";

        var params = {};
        params.commentId = commentId;
        params.newsId = videoId;
        params.userId = $("#userid").val();
        params.userName = $("#username").val();
        params.userImage =$("#userimg").val();
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
                    var r_con = '<div class="c-borderB fl"><p><span class="c-borderB-new">'+params.userName+'发布于'+new Date()+' 发表在' +
                        '21</span><span class="c-borderB-con">'+a_html+'</span></p></div>';
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
                    if($("#span_pl_num").html().indexOf("万")==-1){
                        var num=$("#span_pl_num").html();
                        num=parseInt(num);
                        num++;
                        $("#span_pl_num").html(num);
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

})