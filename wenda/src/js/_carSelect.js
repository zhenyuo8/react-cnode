$(function () {
	var flag=false;
	var bOk=false;
	var carSearch=function () {
		var searchDataChar;
		$('#for_input_brand').on('click',function (e) {
			e=e||window.event;
			var tar=e.target||e.srcElement;
			if(tar.id=='search_brand'||tar.id=='search_down'){
				if($('#search_brand').attr("class").indexOf("i_disabled")<=-1){
					$('#car_brand_select').css('visibility','visible');
					$('#search_serial').addClass("i_disabled");
				}else{

				}
			}else{
				flag=false;
			}
		});
		$('#for_input_brand').on('focus',function (e) {
			$('#search_brand').css('border-color','#398be4');
			$('#car_brand_select').css('visibility','visible');
			serialSelect()
			flag=true;
		});
		$('#for_input_brand').on('blur',function (e) {
			$('#search_brand').css('border-color','#dadada');
			$('#search_down').addClass('default1').removeClass('hover');
			$('#car_brand_select').css('visibility','hidden');
			flag=false;
		})
		//选择车品牌，显示该品牌对应的所有系列，并让品牌选择框隐藏
		$('#brand_car_name').on('click','a',function (e) {
			e=e||window.event;
			var tar=e.target||e.srcElement;
			var dataChar=$(tar).attr('data-char');
			$('.search_brand').val($(tar).text().substr(2));
			$('#search_serial').attr('readonly','readonly');
			// $('.car_serial_select').css({'visibility': 'visible'});
			$('#search_brand').css('border-color','#dadada');
			$('#search_down').removeClass('hover').addClass('default1')
			$('#search_serial').css('border-color','#398be4');
			$('#serial_search_down').addClass('hover').removeClass('default1');
			$('#car_brand_select').css('visibility','hidden');
			//调用函数（ajax)将对应品牌的车型系列，绑定到模板中；
			//getCarSerialDetail(dataChar);

		});


		//选择车品牌
		$('#car_name dd').on('click',function (e) {
			e=e||window.event;
			var tar=e.target||e.srcElement;
			var dataChar=$(tar).attr('data-char');
			$('.search_brand').val($(tar).text());
			// $('.search_serial').val($(tar).text());
			// $('.car_serial_select').css({'visibility': 'visible'});
			$('#car_brand_select').css('visibility','hidden');
			$('#search_serial').attr("class","search_serial");
			$('#search_serial').val("请选择车型");
		});
		$('#car_brand_select').on('mouseover',function () {
			$('#search_brand').css('border-color','#398be4');
			$('#search_down').addClass('hover').removeClass('default1');
			$('#car_brand_select').css('visibility','hidden');
			$('#car_brand_select').css('visibility','visible');
			serialSelect();
			flag=true;
		});
		$('#car_brand_select').on('mouseout',function () {
			$('#search_brand').css('border-color','#dadada');
			$('#search_down').addClass('default1').removeClass('hover');
			$('#car_brand_select').css('visibility','hidden');
			flag=false;
		});
		//选择车型号
		$('#for_input_serial').on("click",function (e) {
			e=e||window.event;
			var tar=e.target||e.srcElement;
			if (tar.id=='search_serial'||tar.id=='serial_search_down') {
				if ($('#search_serial').attr("class").indexOf("i_disabled") <= -1) {
					$('.car_serial_select').css({'visibility': 'visible'});
					$('#search_brand').addClass("i_disabled");
				} else {
				}
			}
		});
		//点击车型，将车型名称赋值给input框
		$('#car_brand_container').on('click',function (e) {
			e=e||window.event;
			var tar=e.target||e.srcElement;
			var searchWords=$(tar).text();
			$('#search_serial').val(searchWords);
			$('#search_serial').attr('data-char',$(tar).attr('data-char'));
			$('#search_serial').css('border-color','#398be4');
			$('.car_serial_select').css('visibility','hidden');
			$('#search_brand').removeClass("i_disabled");
			// $('.car_serial_select').hide();
			// flag=true;
		});
	}

	function serialSelect() {
		var out=document.querySelector("#car_brand_select #car_name");
		var inner=document.querySelector("#brand_car_name");
		var scrollbtn=document.querySelector("#car_name .scrollbtn");
		var scrollbar=document.querySelector("#car_name .scrollbar");
		var innerH=inner.offsetHeight;
		var outH=out.offsetHeight;
		var scrollbarH=scrollbar.offsetHeight;
		var bili=innerH/outH;
		var tops=0;
		var speed=20;
		var topMove=0;
		var scrollbtnH=scrollbarH/bili;
		inner.style.position="relative";
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
					return ev.cancelBubble=true;
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
				}
				document.onmouseup = function () {
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}
			mouseWheel(out,function(){
				tops-=speed;
				setTop()
			},function(){
				tops+=speed;
				setTop()
			})
			scrollbar.onclick=function (e) {
				var ev=e||window.event;
				tops=ev.offsetY;
				setTop()
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
			};


			$('#car_letters').on('click',function (e) {
				e=e||window.event;
				var tar=e.target||e.srcElement;
				e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
				e.preventDefault();
				var topH=0;
				var lettersValue=$(tar).text();
				var allDl=$('#brand_car_name dl');
				for(var i=0;i<allDl.length;i++){
					var cur=allDl[i].id;
					var keyWords=cur.slice(8);
					if(keyWords==lettersValue){
						// document.getElementById('car_name').scrollTop=(topMove*482)/6356;
						break;
					}else{//1px为border,不包含在height中，每一个dl都有，所以需要累加1px
						topH+=$(allDl[i]).height()+1;
						console.log(topH)
					}
				}
				topMove=topH;
				setTopC()
			});
			function setTopC(){
				if(topMove<0){
					topMove=0;
				}
				if(topMove>=innerH-482){
					console.log(12)
					if(topMove%482<482){
						topMove=innerH-482;
					}
				}
				scrollbtn.style.top=topMove/bili+"px";
				inner.style.marginTop=-topMove+"px";
			}

			function setTop(){
				if(tops<0){
					tops=0;
				}
				if(tops>=innerH-482){
					tops=innerH-482;
				}
				scrollbtn.style.top=tops+"px";
				inner.style.marginTop=-tops*bili+"px";
			}
		}

	}
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



	//车品牌切换over out效果
	function carOVer() {
		var hoveFlag=false;
		this.flag=null;
		var that=this;
		$('.car_serial_select dl').mouseover(function () {
			$(this).show();
		})
		$('.car_serial_select').mouseover(function (e) {

			if(!that.flag){
				that.flag=true;
				$('.car_serial_select').show();
			}
		})
	}
	// carOVer();
	carSearch();
});