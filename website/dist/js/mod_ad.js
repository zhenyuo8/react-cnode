/**
 * 
 * @authors zhangbs
 * @date    2017-03-02
 * @version 
 */

$(function(){
	bindEvents();
	function bindEvents(){
		
		$('.car_intro li').hover(function() {
			$(this).find('.img_box').show();
		}, function() {
			$(this).find('.img_box').hide();
		});
	}
	
})
