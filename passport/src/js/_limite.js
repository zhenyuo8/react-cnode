/*****
 *@author: jianingning
 *@from: Global style 文字多出内容用省略号代替
 *@description:
 *@date: name (2017.03.18)
*/




$(function(){
	function text(obj,el,num,type){
		console.log(obj);
		if(obj==''||obj=='undefind'){
			return;
		}else{
			$(obj).each(function(){
				var text=$(obj).find(el).text();
				var newText;
				console.log(text.length);
				if(text.length>100){
					if(type == 1){
						newText=text.substr(0,num)+'...';
					}else if(type == 2){
						newText=text.substr(0,num)+'...”';
					}
					console.log(newText);
				}else {
					return;
					console.log(newText);
				}
				console.log(newText);
				$(this).find(el).text(newText);
			})
		}
	}
	text('.com_hide_box','.com_hide',98,2);
})
