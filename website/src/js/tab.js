function Tab(menu,content,clname,show,eve){
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
