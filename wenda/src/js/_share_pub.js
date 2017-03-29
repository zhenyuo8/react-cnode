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
						$("#ewm").removeClass('display_n');
					}else if(event.type == 'mouseleave'){
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
