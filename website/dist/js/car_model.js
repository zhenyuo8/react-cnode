//创建时间2017-01-16   用于车型详解中左侧固定菜单鼠标停留

$(document).ready(function(){
	$('#floating_menu li').on('click',function(){
			var index=$(this).index();
			var prev_text=$(this).prev().find('a').html(),
				next_text=$(this).next().find('a').html();
			$(this).addClass('f_active').removeClass('h');
			$(this).siblings().addClass('h').removeClass('f_active');
			$('#car_m_wrap .js-con').eq(index).addClass('show').siblings().removeClass('show');
			if(prev_text==undefined){
				$('.car_m_page').find('.prevPage').remove();
				$('.car_m_page').prepend('<a href="javascript:;" class="disabled">上一页</a>');
			}else{
				$('.car_m_page').find('.disabled,.prevPage').remove();
				$('.car_m_page').prepend('<a href="javascript:;" class="prevPage">上一页：'+prev_text+'</a>');
			}
			if(next_text==undefined){
				$('.car_m_page').find('.nextPage').remove();
				$('.car_m_page').append('<a href="javascript:;" class="disabled">下一页</a>');
			}else{
				$('.car_m_page').find('.disabled,.nextPage').remove();
				$('.car_m_page').append('<a href="javascript:;" class="prevPage">下一页：'+next_text+'</a>');
			}
	})
	$('.car_m_page').delegate('.tcdNumber','click',function(){
		var a_html=$(this).html();
		var p_text=$('.floating_menu').find('a').eq(a_html-2).html();
		var n_text=$('.floating_menu').find('a').eq(a_html).html();
		if(p_text==undefined){
			$('.car_m_page').find('.prevPage').remove();
			$('.car_m_page').prepend('<a href="javascript:;" class="disabled">上一页</a>');
		}else{
			$('.car_m_page').find('.disabled,.prevPage').remove();
			$('.car_m_page').prepend('<a href="javascript:;" class="prevPage">上一页：'+p_text+'</a>');
		}
		if(n_text==undefined){
			$('.car_m_page').find('.nextPage').remove();
			$('.car_m_page').append('<a href="javascript:;" class="disabled">下一页</a>');
		}else{
			$('.car_m_page').find('.disabled,.nextPage').remove();
			$('.car_m_page').append('<a href="javascript:;" class="prevPage">下一页：'+n_text+'</a>');
		}
	})
})