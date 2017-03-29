/*****
 *@author: jianingning
 *@from: 车系中图片页引用  用于设置页面中的各种状态
 *@date: name (2017.01.13)
*/




$(document).ready(function(){
	//车款列li的宽度设置
	$('.imgs_m_uls').eq(0).find('li').css({'width':'207px','margin-right':'0px'});
	//款式li的样式设置
	$(".imgs_m_uls").each(function(){
		$(this).find("li:nth-of-type(3n)").css("margin-right","0");
	})
	$('.imgs_m_uls').delegate('.imgs_m_li','click',function(){
		$(this).css('border-color','#3a8be4');
		$(this).find('i').css('display','inline-block');
	})
	$('.imgs_m_uls').delegate('i','click',function(){
		$(this).parent().remove();
	})
	//其他颜色
	$(".other_color").on({
		mouseover:function(){
			$(this).find("ul").show();
		},
		mouseout:function(){
			$(this).find("ul").hide();
		}
	})
	$(".color_menu").delegate("li","click",function(event){
		$(this).parent().hide();
		event.stopPropagation();
	})
	//图片展示的样式设置
	$(".picture-show-list_content").each(function(){
		$(this).find("li:nth-of-type(4n)").css("margin-right","0");
	})
	$('.imgs_m_year li').on('click',function(){
		$(this).addClass('imgs_weight').siblings().removeClass('imgs_weight');
	})
	//图片展示的tab切换
	$('.picture-show-nav').delegate('.imgs_type','click',function(){
		var index=$(this).index();
		$(this).addClass('p_type_weight').removeClass("p_type_h");
		$(this).siblings().removeClass('p_type_weight').addClass("p_type_h");
		$('.picture-show-list_content').eq(index-1).show().siblings().hide();
	})
	$('.imgs_all_type').click(function(){
		$('.picture-show-list_content').show();
		$(this).addClass('p_type_weight').removeClass("p_type_h");
		siblings().removeClass('p_type_weight').addClass("p_type_h");
	})
})