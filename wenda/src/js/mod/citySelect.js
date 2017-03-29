
//网页城市选择交互
var citySelect = function (target,city,current) {
	var citySelect=(function (target,city) {
		//点击城市切换按钮，显示城市选择模块，同时让字体颜色改变
		$(target).on('click',function (e) {
			$(city).show();
			carBrandChose();
		});
		function mouseWheel(obj,upfun,downfun){
			if(obj.addEventListener){
				obj.addEventListener("mousewheel",fn);
				obj.addEventListener("DOMMouseScroll",fn)
			}else{
				obj.attachEvent("onmousewheel",fn);
			}
			function fn(e){
				var ev=e||window.event;
				//鼠标滚轮滚动的方向
				//火狐 ev.detail  向上-3  向下3
				//IE chrome      ev.wheelDelta  向上120 向下-120
				var val=ev.detail||ev.wheelDelta;
				if(val==-3||val==120){
					upfun();
				}else if(val==3||val==-120){
					downfun();
				}
				if(ev.preventDefault){
					ev.preventDefault();
				}else{
					ev.returnValue=false;
				}
			}
		}
		function carBrandChose() {
			var out=document.querySelector(city+' .city_scroll')
			var inner=document.querySelector(city+' .city_chose_region');
			var scrollbtn=document.querySelector(city+' .scrollbtn');
			var scrollbar=document.querySelector(city+' .scrollbar');
			var innerH=inner.offsetHeight;
			var outH=$(out).height();
			var scrollbarH=scrollbar.offsetHeight;
			var bili=innerH/outH;
			console.log(bili)
			var tops=0;
			var topsC=0;
			var speed=20;
			var scrollbtnH=scrollbarH/bili;
			scrollbtn.style.height=scrollbtnH+"px";
			var lenH=scrollbarH-scrollbtnH;
			if(bili<1){
				scrollbar.style.display="none";
			}else{
				scrollbtn.onclick=function (e) {
					var ev=e||window.event;
					if(scrollbtn.stopPropagation){
						ev.stopPropagation();
					}else{
						return  ev.cancelBubble=true;
					}
				}
				scrollbtn.onmousedown = function (e) {
					var ev=e||window.event;
					var lenY=ev.clientY-this.offsetTop;
					if(ev.preventDefault){
						ev.preventDefault()
					}else{
						ev.returnValue=false;
					}
					document.onmousemove = function (e) {
						var ev = e || window.event;
						tops = ev.clientY - lenY;
						if(tops<0){
							tops=0;
						}
						if(tops>lenH){
							tops=lenH;
						}
						scrollbtn.style.top = tops + "px";
						var innerT=tops*bili;
						inner.style.marginTop=-innerT+"px";
					};
					document.onmouseup = function () {
						document.onmousemove = null;
						document.onmouseup = null;
					}
				};
				mouseWheel(out,function(){
					tops-=speed;
					setTop()
				},function(){
					tops+=speed;
					setTop()
				});
				scrollbar.onclick=function (e) {
					var ev=e||window.event;
					tops=ev.offsetY;
					setTop()
				};

				$(city+' .hot_city_num a').on('click',function () {
					var curN=$(this).text().toString();
					var regN=/curN/i;
					var  allNum=$(city+' .city_chose_region dl dt .province_tx').text().toString();
					allNum.replace(regN,function () {
						console.log(arguments)
					})
				});
				$(city+' .hot_city_num a').on('click',function (e) {
					e=e||window.event;
					var tar=e.target||e.srcElement;
					e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
					e.preventDefault();
					var myTop=0;
					var selectL=$(this).text();
					var weNeed;
					var allProvinceL=$(city+' .city_chose_region dl dt .province_tx');
					for(var i=0;i<allProvinceL.length;i++){
						if($(allProvinceL[i]).text()==selectL){
							weNeed=allProvinceL[i]
							break;
						}else{
							myTop+=$(allProvinceL[i]).parents('dl').height()+9
						}
					}
					topsC=myTop;
					if(topsC>=innerH-378){
						topsC=innerH-378;
					}
					setTopC();

				});
				function setTopC(){
					if(topsC<0){
						topsC=0;
					}
					scrollbtn.style.top=topsC/bili+"px";
					inner.style.marginTop=-topsC+"px";
				}


				document.onkeydown=function (e) {
					var ev=e||event;
					if(ev.keyCode==38){
						tops-=speed;
						setTop()
					}else if(ev.keyCode==40){
						tops+=speed;
						setTop()
					}
				}
				function setTop(){
					if(tops<0){
						tops=0;
					}
					if(tops>=lenH){
						tops=lenH;
					}
					scrollbtn.style.top=tops+"px";
					inner.style.marginTop=-tops*bili+"px";
				}
			}

		}
	});
//hover城市选择按钮，字体和三角符号变色；
	var cityHover=(function (target,city) {
		$().on('mouseover',function (e) {
			$(target+' .changeAdd').css({'color':'#fff'})
			$(target+' .triangle').css({'border-top-color':'#fff'})
		});
		$(target).on('mouseout',function (e) {
			$(target+' .changeAdd').css({'color':'#999'})
			$(target+' .triangle').css({'border-top-color':'#999'})
		});
		$(target).on('mousedown',function () {
			$(target+' .changeAdd').css({'color':'#398be4'})
			$(target+' .triangle').css({'border-top-color':'#398be4'});
		});
		$(target).on('mouseup',function () {
			$(target+' .changeAdd').css({'color':'#fff'})
			$(target+' .triangle').css({'border-top-color':'#fff'});
		});

		//城市首字母的hover&&press交互效果
		$(city+' .hot_city_num a').mouseover(function () {
			$(this).css({'background':'#398be4','color':'#fff'})
		});
		$(city+' .hot_city_num a').mouseout(function () {
			$(this).css({'background':'#eee','color':'#333'})
		});
		$(city+' .hot_city_num a').mousedown(function () {
			$(this).css({'background':'#1064c1','color':'#fff'})
		});
		$(city+' .hot_city_num a').mouseup(function () {
			$(this).css({'background':'#398be4','color':'#fff'})
		});


		//城市 名称的hover&&press效果
		$(city+' .city_chose_region dd a').mouseover(function (e) {
			e=e||window.event;
			// e.cancelB city_chose_regionubble=true;
			// e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			$(this).css({'background':'#398be4','color':'#fff'})
		});
		$(city+' .city_chose_region dd a').mouseout(function (e) {
			// e=e||window.event;
			// e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			$(this).css({'background':'#fff','color':'#333'})
		});
		$(city+' .city_chose_region dd a').mousedown(function (e) {
			$(this).css({'background':'#1064c1','color':'#fff'})
		});
		$(city+' .city_chose_region dd a').mouseup(function (e) {
			$(this).css({'background':'#398be4','color':'#fff'})
		});

		//点击关闭按钮，城市选择模块隐藏
		$(city+' .city_search_input .delete_city').on('click',function () {
			$(city).hide();
		});

		//城市输入框获取焦点显示搜索内容框，失去焦点隐藏
		$(city+' .input').on('focus',function (e) {
			// $('#city_chose').show();
			$(city+' .city_search_input .input_letters_search').css({"display":"block"});
			$(city+' .city_search_input .input_letters').val('');
		});
		$(city+' .city_search_input .input_letters').on('blur',function (e) {
			// $('#city_chose').show();
			$(city+' .city_search_input .input_letters').val('请输入城市');
			$(city+' .city_search_input .input_letters_search').css({"display":"none"})
		});
	});

//城市模块hover显示，离开隐藏
	var cityChange=(function (current,city) {
		$(city+' .city_chose_region dd a').on('click',function () {
			$(current).html($(this).text()+'<i></i>');
			$(city).hide();
			flag=false;
		})
		$(city+' .city_hot_search a').on('click',function () {
			$(current).html($(this).text()+'<i></i>');
			$(city).hide();
			flag=false;
		});
	});
	citySelect(target,city);
	cityHover(target,city);
	cityChange(current,city);
}

module.exports = function (target,city,current) {
	return new citySelect(target,city,current);
}
