// var al=require('./lightning')

$(function(){
	function init(){
		bindEvents()
	};
	function bindEvents(){
		//点赞
		$('.fine_box').delegate('.zan','click',function(){
			if($(this).find('.i').hasClass('icon11')){
				// return;
				// $('.yi_zan').fadeIn().fadeOut();
				lightning('已赞')
			}else{
				$(this).find('.i').removeClass('icon1').addClass('icon11');
				var currNum=parseInt($(this).find('.find_num').html());
				currNum++;
				$(this).find('.find_num').html(currNum)
				// $('.yi_zan').fadeIn().fadeOut();
				lightning('已赞')
			}
		})
		//评论区点赞
		$('.hot_comm').delegate('.comm_mum','click',function(){
				$(this).addClass('yi_zan').removeClass('no_zan')
		})
		//收藏
		function sc(){
				if($('.fine_box .sc').find('.i').hasClass('icon22')){
					$('.fine_box .sc').find('.i').removeClass('icon22').addClass('icon2');
					$('.fine_box .sc').find('.i').html('收藏文本');
					// $('.sc_hint').fadeIn().html('取消收藏').fadeOut();
					lightning('取消收藏')
					$('.float_bottom_comm_panel .icon_box').find('.sc').removeClass('sc11').addClass('sc1');
				}else{
					$('.fine_box .sc').find('.i').removeClass('icon2').addClass('icon22');
					$('.fine_box .sc').find('.i').html('已收藏');
					// $('.sc_hint').fadeIn().html('收藏成功').fadeOut();
					lightning('收藏成功')
					$('.float_bottom_comm_panel .icon_box').find('.sc').removeClass('sc1').addClass('sc11');
				}
		}
		$('.fine_box').delegate('.sc','click',function(){
			sc();
		})
		$('.float_bottom_comm_panel').delegate('.sc','click',function(){
			sc()
		})
		//遮罩 点击
		//当前页评论
		$('.we_s').delegate('p','click',function(){
			$('.mark').fadeIn(300,function(){
				$('.comm_box').animate({'bottom':'0px'},200);
						document.getElementById('textarea').focus()
					$('#textarea').trigger('click')

			});
		})
		$('.comm_mark').delegate('.cancel','click',function(){
				$('.comm_box').animate({'bottom':'-100%'},300,function(){
						$('.mark').fadeOut()
				})
		})

		// 评论区回复
		$('.reply_btn').on('click',function(){
			$('.mark').fadeIn(300,function(){
				$('.comm_box').animate({'bottom':'0px'},200)
			});
		})

		$("#textarea").on("input",function(){
			if($(this).val() == ''){
				$(this).parents(".comm_box").find(".submit")
					   .css("color","#ccc");
			}else{
				$(this).parents(".comm_box").find(".submit")
					   .css("color","#2799fe");
			}
		})

		//底部分享面板
		$('.float_bottom_comm_panel').delegate('.share','click',function(){
			$('.mark').fadeIn(300,function(){
				$('.share_box_mark').animate({'bottom':'0px'},200)
			});
		})
		$('.share_box_mark').delegate('.cancel_p','click',function(){
			$('.share_box_mark').animate({'bottom':'-100%'},300,function(){
				$('.mark').fadeOut()
			})
		})
	}




init()
})
