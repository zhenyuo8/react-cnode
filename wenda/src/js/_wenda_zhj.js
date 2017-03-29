/*****
 *@author: jianingning
 *@from: Global style wenda_zhj(问答中别人看专家)
 *@description: 
 *@date: name (2017.03.09)
*/



var tab= require('./_tab');
$(function(){

	text();
	Link();
	noNum();
	bnoNum();
	showShare();
	conEmpty();

	//提问，问答切换
	tab('zhj_answer_type','zhj_answer_content','zhj_active','zhj_show','click');

	//提问-文字截断
	function text(){
		var bro=navigator.userAgent;
		$('.zhj_con_text').each(function(){
			var text=$(this).text();
			var newText
			if(text.length>155){
				if(bro.indexOf("MSIE 8.0")>0){
					newText=text.substr(0,155)+'...';
				}else {
					newText=text.substr(0,155)+'...';
				} 
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
		$('.zhj_con_quote').each(function(){
			var s_text=$(this).find('span').text();
			var s_newText;
			if(s_text.length>110){
				if(bro.indexOf("MSIE 8.0")>0){
					s_newText=s_text.substr(0,98)+'...';
				}else{
					s_newText=s_text.substr(0,108)+'...';
				}
				$(this).find('span').text(s_newText);
			}else {
				return;
			}
		});	
	}
	//点赞
	function Link(){
		var sign=true;
		$('.zhj_zan').on('click',function(){
			if(sign){
				var num= parseInt($(this).find('i').text());
				num++;
				$(this).find('i').text(num);
				$(this).find(".zhj_zan_icon").css("background","url('../img/zan_c.png')")
				sign=false;
			}else{
				var num= parseInt($(this).find('i').text());
				num--;
				$(this).find('i').text(num);
				$(this).find(".zhj_zan_icon").css("background","url('../img/zan_kong.png')")
				sign=true;
			}
			
		})
	}
	//如果没有提问总数
	function noNum(){
		//专家页
		var number=parseInt($('.zhj_zong').find('span').text());
		if(number<10){
			$('.zhj_num').hide();
			$('.zhj_ans_btn').css('margin-left','293px');
		}else{
			return;
		}
	}
	function bnoNum(){
		//标兵
		var b_number=parseInt($('.biaobing_num').find('span').text());
		if(b_number<10){
			$('.biaobing_num').parent().hide();
			$('.biaobing_noborder').css({
				'width':'658px',
				'text-align':'center'
			});
			$('.biaobing_ans_btn').css('margin-left','0');
		}else{
			return;
		}
	}
	//推荐给朋友
	function showShare(){
		// $('.zhj_recommend').on({
		//
    		// mouseover:function(){
    		// 	$(".zhj_share_box").show();
    		// },
		//
    		// mouseout:function(){
		// 	    $(".zhj_share_box").hide();
    		// }
		//
  		// });
  		$('.wx').on({
  			mouseover:function(){
    			$('.zhj_erweima').show();
    		},  

    		mouseout:function(){
    			$('.zhj_erweima').hide();
    		}
  		})
	}
	//内容为空时显示
	function conEmpty(){
		$('.zhj_list_wrap').each(function(){
			var conlis=$(this).find('.zhj_con_list').length;
			if(conlis<=0){
				$(this).parents('.zhj_con').find('.zhj_empty').show();
				$(this).parents('.zhj_con').find('.tcdPageCode').hide();
			}else {
				return;
			}
		})
	}
})