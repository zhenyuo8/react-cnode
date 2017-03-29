/*****
 *@author: jianingning
 *@from: Global style myWenda(个人中心的我的问答)
 *@description: 
 *@date: name (2017.03.14)
*/




var tab= require('./_tab');
$(function(){

	text();
	Link();
	conEmpty();

	//我的问答tab切换
	tab('wenda_tab_type','wenda_tab_content','wenda_current','wenda_tab_show','click');

	//提问-文字截断
	function text(){
		//var bro=navigator.userAgent;
		$('.zhj_con_text_r').each(function(){
			var text=$(this).text();
			var newText
			if(text.length>138){
				//if(bro.indexOf("MSIE 8.0")>0){
					newText=text.substr(0,136)+'...';
				//}else {
					//newText=text.substr(0,136)+'...';
				//} 
				$(this).text(newText);
				$(this).next().show();
			}else{
				return;
			}

			$('.zhj_down').on('click',function(){
				$(this).hide();
				$(this).prev().text(text);
			})	
		});
		$('.zhj_con_text_a').each(function(){
			var s_text=$(this).find('a').text();
			var s_newText;
			if(s_text.length>130){
				s_newText=s_text.substr(0,100)+'...';
				$(this).find('a').text(s_newText);
			}else {
				return;
			}
		});
		$('.zhj_con_quote').each(function(){
			var s_text=$(this).find('span').text();
			var s_newText;
			if(s_text.length>100){
				s_newText=s_text.substr(0,98)+'...';
				$(this).find('span').text(s_newText);
			}else {
				return;
			}
		});
		$('.q_content').each(function(){
			var q_text=$(this).find('.q_content_text').text();
			var q_newText;
			if(q_text.length>110){
				q_newText=q_text.substr(0,90)+'...';
				$(this).find('.q_content_text').text(q_newText);
			}else {
				return;
			}
		})	
	}
	//点赞
	function Link(){
		var sign=true;
		$('.zhj_zan').on('click',function(){
			if(sign){
				var num= parseInt($(this).find('i').text());
				num++;
				$(this).find('i').text(num);
				$(this).find('span').css('background','url(../img/zhj_zan.png)');
				sign=false;
			}else{
				var num= parseInt($(this).find('i').text());
				num--;
				$(this).find('i').text(num);
				$(this).find('span').css('background','url(../img/zan_kong.png)');
				sign=true;
			}
			
		})
	}
	//内容为空时显示
	function conEmpty(){
		$('.wenda_tab_con').each(function(){
			var conlis=$(this).find('.zhj_list_wrap').length;
			console.log(conlis);
			if(conlis<=0){
				$(this).find('.zhj_empty').show();
				$(this).find('.tcdPageCode').hide();
			}else {
				return;
			}
		})
	}
})