$(function(){
	function init(){
		bindEvents()
	}
	function markShow(fn){
		var fn=fn ||  function(){};
		$('.comm_mark').fadeIn("300",fn());
	}
	function markH(fn){
		var fn=fn ||  function(){};
		$('.comm_mark').fadeOut("300",fn());
	}
	function bindEvents(){
		$('body ').delegate('.reply_btn', 'click', function() {
			markShow(function(){
				$('.comm_form_box ').animate({'bottom':'0px','display':'block'},200)
			})
		});
		$('body .comm_form_box ').delegate('.cancel','click',function(){
			markH(function(){
				$('.comm_form_box ').animate({'bottom':'-100%','display':'none'},200)
			})
		});
		//评论区点赞
		$('.comm_box').delegate('.comm_mum','click',function(){
				$(this).addClass('yi_zan').removeClass('no_zan')
		})

	}
	init()
})