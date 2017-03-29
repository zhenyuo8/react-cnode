/*****
 *@author: jianingning
 *@from: Global style 文字多出内容用省略号代替
 *@description:
 *@date: name (2017.03.18)
*/




$(function(){
	function text(obj,el,num){
		if(obj==''||obj=='undefind'){
			return
		}else{
			$(obj).each(function(){
				var text=$(obj).find(el).text();
				var newText;
				if(text.length>100){
					newText=text.substr(0,num)+'...';
				}else {
					return;
				}
				$(this).find(el).text(newText);
			})
		}
	}
	text('.q_content','.q_text',92);
	text('.a_content','.q_text',94);
	text('.link','p',94);
	text('.profession_brilliant','.limite',150);
	text('.profession_brilliant','h3',50);
	text('.zhj_con_quote','span',92);
})
