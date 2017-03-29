(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/1/16.
 */
$(function () {
	var articleBig=function () {
		//导航左边hover && press
		$('.left h2').on('mousedown',function () {
			$('.left h2 a').css('color','#126acc')
		});
		$('.left h2 a').on('mouseup',function () {
			$('.left h2 a').css('color','#398be4')
		});


		//评论
		$('.icon_pos span').on('mouseover',function () {
			$(this).addClass('icon-text_hover').removeClass('icon-text_norme')
		})
		$('.icon_pos span').on('mouseout',function () {
			$(this).addClass('icon-text_norme').removeClass('icon-text_hover')
		})
		$('.icon_pos span').on('mousedown',function () {
			$(this).addClass('icon-text_press').removeClass('icon-text_hover')
		})
		$('.icon_pos span').on('mouseup',function () {
			$(this).addClass('icon-text_hover').removeClass('icon-text_press')
		});


		//3.2 怎加评论功能  增加评论回复功能 dongbo
		//发表评论输入框获取，失去焦点
		$(".text_area").focus(function(){
			$(".submit").css("background","#FFA904");
		})
		$(".text_area").blur(function(){
			var val=$(this).val();
			if(val != '' && val != '文明上网，理性发言'){
				$(".submit").css("background","#FFA904");
			}else{
				$(".submit").css("background","#aaa");
			}

		})
		//评论回复事件
		$(".submit").click(function() {
			if( !isLogin){
				login.getLoginHtml();
			}

			var s_html = $(".text_area").val();
			if (s_html == '' || s_html == '文明上网，理性发言') {
				alert('请输入评论内容sss！');
				return;
			} else {
				var text =$('.text_area').val();
				var html=$($("textarea").val());
				$("textarea").val(html.text());
				$(this).css('background','#aaa')

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
				params.userImage = userAvatar;//"http://static.xingyuanauto.com:8888/img/pic/photo.png";
				params.content = text;
				Page.ajaxPost(path,params,true,function(response) {
					debugger;
					if(response.code == 10000) {

						var newsitem =
							" <div class='comments-type clearfix'>" +
							"<dl class='clearfix'>" +
							"<dt class='fl photo-box po-r'>" +
							"<img src='"+userAvatar+"' width='60' height='60'/>" +
							"<span class='photo-mask'></span>" +
							"<span class='floor'></span>" +
							"</dt>" +
							"<dd class='fr'>" +
							"<p class='fl nt'>" +
							"<span class='c-name'>"+ params.userName+"</span>" +
							"<span class='c-time'>"+ formatDate(new Date())+"</span>" +
							" </p>" +
							"<p class='c-con fl'>" + text + "</p>" +
							"<p class='c-zan fr' >"+
							"<span class='icon-zan_l c-zan-icon  fl' comment-id='"+response.data+"' vote_count='0'></span>"+
							"<span class='c-zan-num fl'>（0）</span>"+
							"<span class='icon-text_norme reply-btn fl s_flag'></span>"+
							"</p>"+
							//"<p class='c-zan fr'>" +
							//"<span class='fl zan_wrap' comment-id='"+response.data+"'>" +
							//"<span class='icon-fine_norme fl'></span>" +
							//"<span class='c-zan-num fl'>（0）</span>" +
							//"</span>" +
							//"<span class='icon-text_norme reply-btn fl'></span>" +
							//"</p>" +
							"</dd>" +
							"</dl>" +
							"<textarea class='reply-box'></textarea><input type='button' value='发布' class='reply-release fr' comment-id="+response.data+"/>"+
							"</div>";
						$(".comments-con").prepend(newsitem);
					}
					else{
						alertDiv({type:"2",des:response.msg,time:"500"});
					}
				},function() {

				});

			}

		});
		$('.comments-con').delegate('.c-zan-icon',"click",function(){
			var commentSpan = $(this);

			//评论id
			var commentId= parseInt(commentSpan.attr("comment-id"));
			var voteCount= parseInt(commentSpan.attr("vote_count"));
			//ajax请求路径
			var path = "/comment/voteComment";

			var params = {};
			params.commentId = commentId;
			params.userId = userId;

			Page.ajaxPost(path,params,true,function(response) {
				debugger;
				console.log(response.code);
				if(response.code == 10000) {
					//num=voteCount
					//num=num.replace('（','');
					//num=num.replace('）','');
					var  num=parseInt(voteCount);
					num++;
					commentSpan.parent().find(".c-zan-num").html('（'+num+'）');
				} else{
					alertDiv({type:"2",des:response.msg,time:"500"});
				}
			},function() {
				alertDiv({type:"2",des:response.msg,time:"500"});
			});


		});
		$(".textarea").placeholder({
			'word': '文明上网，理性发言'
		});
		$(".login").on('click',function(){
			login.getLoginHtml();
		});
		//注册
		$(".sign").on('click',function(){
			window.open("http://i.qichedaquan.com/user/register.html?callback="+window.location.href);
		});
		//评论中点击回复按钮
		$(".comments-con").delegate('.reply-btn','click',function(){
			if( !isLogin){
				login.getLoginHtml();
			}
			if($(this).hasClass('s_flag')){
				$(this).parents(".comments-type").find(".reply-box,.reply-release").show();
				$(this).removeClass('s_flag');
			}else{
				$(this).parents(".comments-type").find(".reply-box,.reply-release").hide();
				$(this).addClass('s_flag');
			}
		})
		$(".reply-box").placeholder({
			'word':'回复：'
		});
		$(".comments-con").delegate('.reply-release','click',function(){
			var release_html=$(this).prev().val();
			if(release_html==''||release_html=='回复：'){
				return;
			}else if (release_html.indexOf("</script>")>0){
				alert("内容包含特殊字符");
				return;
			}else{
				var _this=this;
				//新闻id
				var newsid = $("#newsId").val();
				var commentSpan = $(this);


				//评论id
				var commentId= parseInt(commentSpan.attr("comment-id"));

				//用户id
				var userId = userId;
				//ajax请求路径
				var path = "/comment/addReply";
				release_html =  release_html.replace(/\n|\r\n/g,"<br>");
				var params = {};
				params.commentId = commentId;
				params.newsId = newsid;
				params.userId = userId;
				params.userName = nickName;
				params.userImage =  userAvatar;
				params.content = release_html;
				Page.ajaxPost(path,params,true,function(response) {
						debugger;
						console.log(response.code);
						if(response.code == 10000) {
							$(_this).hide();
							$(_this).prev().hide();
							var a=$(_this).parents('.comments-type').find('.c-con');
							var b=$(_this).parents('.comments-type').find('.c-name').html();
							var c=$(_this).parents('.comments-type').find('.c-time').html();
							var a_html=a.html();
							var r=$(_this).parents('.comments-type').find('.r_box');
							var newsitem =
								" <div class='comments-type clearfix'>" +
								"<dl class='clearfix'>" +
								"<dt class='fl photo-box po-r'>" +
								"<img src='"+userAvatar+"' width='60' height='60'/>" +
								"<span class='photo-mask'></span>" +
								"<span class='floor'></span>" +
								"</dt>" +
								"<dd class='fr'>" +
								"<p class='fl nt'>" +
								"<span class='c-name'>"+params.userName+"</span>" +
								"<span class='c-time'>"+formatDate(new Date())+"</span>" +
								" </p>" +
								'<div class="r_box">'+
								'<div class="c-borderB fl">'+
								'<p>'+
								'<span class="c-borderB-new">'+b+'发布于'+c+'</span>'+
								'<span class="c-borderB-con">'+a_html+'</span>'+
								'</p>'+
								'</div>'+
								'</div>'+
								"<p class='c-con fl'>" + release_html + "</p>" +
								"<p class='c-zan fr'  comment-id='"+response.data+"'>"+
								"<span class='icon-zan_l c-zan-icon  fl'  comment-id='"+response.data+"' vote_count='0'></span>"+
								"<span class='c-zan-num fl'>（0）</span>"+
								"<span class='icon-text_norme reply-btn fl s_flag'></span>"+
								"</p>"+
								//"<p class='c-zan fr'>" +
								//"<span class='fl zan_wrap' comment-id='"+response.data+">" +
								//"<span class='icon-fine_norme fl'></span>" +
								//"<span class='c-zan-num fl'>（0）</span>" +
								//"</span>" +
								//"<span class='icon-text_norme reply-btn fl'></span>" +
								//"</p>" +
								"</dd>" +
								"</dl>" +
								"<textarea class='reply-box'></textarea><input type='button' value='发布' class='reply-release fr' comment-id="+response.data+"/>"+
								"</div>";
							$(".reply-box").val('');
							$(".comments-con").prepend(newsitem);
						} else{
							alertDiv({type:"2",des:response.msg,time:"500"});
						}
					},
					function() {

					});

			}
		});


		//导航右边hover && press
		$('.right .comment_part').on('mouseover',function () {
			$('.right .text').css('color','#126acc')
		});
		$('.right .comment_part').on('mouseout',function () {
			$('.right .text').css('color','#333')
		});
		$('.right .comment_part').on('mousedown',function () {
			$('.right .text').css('color','#126acc')
		});
		$('.right .comment_part').on('mouseup',function () {
			$('.right .text').css('color','#398be4')
		})
		//    btn切换效果；
		$('#img_inner').on('mouseover',function () {
			$('#img_inner span').css('display','block')
		})
		$('#img_inner').on('mouseout',function () {
			$('#img_inner span').css('display','none')
		})
		//    底部按钮交互效果


		$('.right_article span').on('mouseover',function (e) {
			console.log(this)
			e=e||window.event;
			var tar=e.target||e.srcElement
			if(tar.id=='try_drive'||tar.id=='change'){
				$(this).css({'background':'#398be4','color':'#fff','border':'1px solid transparent'})
			}
		});
		$('.right_article span').on('mouseout',function (e) {
			console.log(this)
			e=e||window.event;
			var tar=e.target||e.srcElement
			if(tar.id=='try_drive'||tar.id=='change'){
				$(this).css({'background':'#eee','color':'#333','border':'1px solid #dadada'})
			}
		});
		$('.right_article span').on('mousedown',function (e) {
			console.log(this)
			e=e||window.event;
			var tar=e.target||e.srcElement
			if(tar.id=='try_drive'||tar.id=='change'){
				$(this).css({'background':'#126acc','color':'#fff','border':'1px solid #dadada'})
			}
		});
		$('.right_article span').on('mouseup',function (e) {
			console.log(this)
			e=e||window.event;
			var tar=e.target||e.srcElement
			if(tar.id=='try_drive'||tar.id=='change'){
				$(this).css({'background':'#398be4','color':'#fff','border':'1px solid #dadada'})
			}
		});

	};

	//循环img_banner_container图片至picList
	var picList = [];
	var picLen = $('.img_banner_container img');
	function picListFun(){
		for(var i=0;i<picLen.length;i++){
			picList.push(picLen.eq(i).attr('src'));
		}
	}
	picListFun();
	$('.countPages').find('.total').html(picLen.length);
	var picIndex = 0;
	var n;
	var imgTab=function () {
		//点击图片弹出大图页面
		$('.car-type-introduce-con img').on('click',function (event) {
			event.stopPropagation();
			var regExp =/_\d{4}x\d{4}/;
			var src = $(this).attr('src');
			var articalPicSrc = src.replace(regExp,"");
			$('#big_img').show();

			for(var i=0;i<picList.length;i++){
				if(picList[i]===articalPicSrc){
					picIndex = i;
				}
			}
			n=picIndex;
			$('#img_inner').find('.img_banner_container').css({left:-n*800},600)
			$('.countPages').find('.now').html(n+1);
		});
		var $imgContainer=$('#img_inner').find('.img_banner_container');
		var $img=$('.img_banner_container').children('img');
		//点击右侧按钮
		$('.right_btn').on('click',function (event) {
			event.stopPropagation();
			if(n<$img.length-1){
				n++;
				$('#img_inner').find('.img_banner_container').animate({left:-n*800},600)
				$('.countPages').find('.now').html(n+1);
			}else{
				alert('这是最后一张图片了')
			}
		});
		//点击左侧按钮
		$('.left_btn').on('click',function (event) {
			event.stopPropagation();
			if(n>0){
				n--;
				$('#img_inner').find('.img_banner_container').animate({left:-n*800},600);
				$('.countPages').find('.now').html(n+1);
			}else{
				alert('这已经是第一张图片了，谢谢~~')
			}
		})
	};

	var allComment=function () {
		var flag=false;
		$('.zan_wrap img').on('mouseover',function () {

			$(this).attr({'src':"img/zan_h.png"})
			$('.c-zan-num').css('color','#ff9103')
		})
		$('.zan_wrap img').on('mouseout',function () {

			$(this).attr({'src':"img/zan_c_03.png"})
			$('.c-zan-num').css('color','#ffa903')
		});
		$('.zan_wrap img').on('mousedown',function () {

			$(this).attr({'src':"img/zan_c.png"})
			$('.c-zan-num').css('color','#ff8003')
		});
		$('.zan_wrap img').on('mouseup',function () {

			$(this).attr({'src':"img/zan_h.png"})
			$('.c-zan-num').css('color','#ff9103')
		});
		// $('.icon-text_norme img').on('mouseover',function () {
		//     $(this).attr({'src':"img/comments_icon_h.png"})

		// });
		$('.icon-text_norme img').on('mouseout',function () {
			$(this).attr({'src':"img/messge_03.png"})

		});
		$('.icon-text_norme img').on('mousedown',function () {
			$(this).attr({'src':"img/comments_icon_c.png"})

		});
		// $('.icon-text_norme img').on('mouseup',function () {
		//     $(this).attr({'src':"img/comments_icon_h.png"})

		// });


		$('.reply-release').on('click',function () {
			$('.reply-box,.reply-release').hide();
			flag=false;
		})

	};

	var videoDetail=function () {
		$('.pagination li').on('mouseover',function () {
			$(this).addClass('active').siblings().removeClass('active')
		})
		$('.pagination li').on('click',function () {
			$(this).addClass('active').siblings().removeClass('active')
		})
		$('.hot_article_container li').on('mouseover',function () {
			$(this).find('a').css({'text-decoration':'underline','color':"#398be4"})
		})
		$('.hot_article_container li').on('mouseout',function () {
			$(this).find('a').css({'text-decoration':'none','color':"#333"})
		})
	};

	//发表评论模块交互，输入内容，发布按钮变色；
	// var textSend=function () {
	//     $('textarea').on('keydown',function () {
	//             $('.submit').css('background','#ff8003')
	//     })
	//     //3.2 怎加评论功能  增加评论回复功能   注释以下内容  dongbo
	//     // $('textarea').on('keyup',function () {

	//     // })
	//     // $('.submit').on('click',function () {
	//     //     var html=$($("textarea").val());
	//     //     $("textarea").val(html.text());
	//     //     $(this).css('background','#aaa')
	//     // })

	// };
	// textSend();
	videoDetail();
	imgTab();
	articleBig();
	allComment();
})


},{}]},{},[1])