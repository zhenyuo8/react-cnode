$(function(){
  var tabName=(function(){
    var curName=$('#sortTabTitle li a.current').parent().index()==0?"回复我的":"我回复的";
    console.log(curName)
    $('.small_nav span').text(curName)
  })()

  //没有内容时显示空提示
  $('.message').each(function(){
  	if($(this).find('.same_style').length<=0){
  		$(this).find('.no_content_container').show();
  		$(this).next().hide();
  	}else{
  		$(this).find('.no_content_container').hide();
  		$(this).next().show();
  	}
    $(".tab_module").height($(".sort_swiper_box").eq(0).height());
  })
})
