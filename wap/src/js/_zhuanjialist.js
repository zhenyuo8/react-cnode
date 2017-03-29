$(function(){
	var li_height=$('.current').height();
	$('.invite_expert_ul').css('height',li_height);
	var swiper = new Swiper('.swiper-container', {
        pagination: '',
        slidesPerView: 3,
        loop : true,
		nextButton: '.swiper-button-prev',
		prevButton: '.swiper-button-next',
        spaceBetween: 30,
        slideToClickedSlide: true,
        onSlideChangeStart: function(swiper){
            var li_index=swiper.activeIndex;

            var li_title=$('.swiper-slide').eq(li_index+1).find('.sc-content').find('span').text();

            var li_con=$('.swiper-slide').eq(li_index+1).find('.sc-content').find('p').text();

            $('.expert_news_text1').text(li_title);
            $('.expert_news_text2').text(li_con);

	        $('.swiper-slide').eq(li_index+1).addClass('current').removeClass('normal');
	        $('.swiper-slide').eq(li_index+1).siblings().removeClass('current').addClass('normal');
        }
    });
})