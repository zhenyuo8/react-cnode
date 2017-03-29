/*****
 *@author: jianingning
 *@from: Global style tab切换
 *@description: 
 *@date: name (2017.02.23)
*/




module.exports = function (menu,content,clname,show,eve) {
	var eve=eve|| e ;
	var lis=document.getElementById(menu),
			con=document.getElementById(content),
		    jsCon=$(con).find(".js-con");
		if(eve=='click'){
			$(lis).delegate('.js-menu','click',function(){
				var index=$(this).index();
				$(this).addClass(clname).siblings().removeClass(clname);
				$(jsCon).eq(index).addClass(show).siblings().removeClass(show);
			})
		}else if(eve=='mouseover'){
			$(lis).delegate('.js-menu','mouseover',function(){
				var index=$(this).index();
				$(this).addClass(clname).siblings().removeClass(clname);
				$(jsCon).eq(index).addClass(show).siblings().removeClass(show);
			})
		}
}


