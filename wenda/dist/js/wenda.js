(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global js wenda(问答页面)
 *@date: name (2017.03.08)
*/



$(function(){

	$(".lj_textarea").placeholder({isUseSpan:true});

    selectCar();
    //选择品牌，选择系列
    function selectCar(){
        var show=true;
        //选择品牌菜单显示隐藏
        $('#for_input_brand').on('click',function(event){
            event.stopPropagation();
            if(show){
            	if($(this).attr("isclick")=="false"){
            		return;
	            }
                $('#car_brand_select').show();
                show=false;
	            $("#for_input_serial").attr("isclick","false");
            }else{
                $('#car_brand_select').hide();
                show=true;
            }
        })
        $('#brand_car_name').on('click',function(e){
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var text=$(tar).text();
            $('#search_brand').val(text);
            $('#car_brand_select').hide();
            $('.lj_xilie').css('color','#333');
            $('#for_input_serial').attr('isclick','true');
        })     
         //选择系列菜单显示隐藏       
        $('#for_input_serial').on('click',function(event){
            if($(this).attr('isclick')=="false"){
                return;
            }else{
               event.stopPropagation();
               $('#car_serial_select').show();
	           $('#for_input_brand').attr('isclick','false');
            }    
        }) 
        $('#car_brand_container').on('click',function(e){
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var text2=$(tar).text();
            $('#search_serial').val(text2).css('color','#333')
            $('.car_serial_select').hide();
            $(".lj_relevance_btn").attr("disabled",false)
	        $('#for_input_brand').attr('isclick','true');
        }) 
        //点击关联
        $('.lj_relevance_btn').on('click',function(){
            var s_text=$('#search_serial').val();
            var con='<span>'+s_text+'<img src="img/delete.png" class="lj_re_delete"></span>';
            $('.lj_relevance_show').append(con);
            if($('.lj_relevance_show span').length>=5){
	            $('.lj_relevance_btn').attr("disabled",true);
	            $('#for_input_brand').attr("isclick",false);
	            $("#search_brand").attr("class","lj_pinpai lj_xilie");
            }
            $('#search_brand').val('请选择品牌');
            $('#search_serial').val('请选择系列').css('color','#999');
	        $(".lj_relevance_btn").attr("disabled",true)
	        $('#for_input_serial').attr("isclick",false);

        })
        //点击字母
        $('#car_letters').on('click',function(e){
            e=e||window.event;
            e.stopPropagation();
            var tar=e.target||e.srcElement;
            $(tar).addClass('active').siblings().removeClass('active');
        })
        //点击其他地方下拉菜单消失
        $(document).on('click',function(event){
            event.stopPropagation();
            $('#car_brand_select').hide();
            $('#car_serial_select').hide();
            show = true; 
        });
    }
    //点击删除
    $('.lj_relevance_show').delegate('img','click',function(){
        $(this).parent().remove();
	    if($('.lj_relevance_show span').length>=4){
		    $('.lj_relevance_btn').attr("disabled",false);
		    $('#for_input_brand').attr("isclick",true);
		    $("#search_brand").attr("class","lj_pinpai");
	    }
    })       
     /*删除图片*/
	$('.lj_add_img').delegate('.lj_img_delete','click',function(){
		$(this).parent().remove();
		if($(".lj_add_img .lj_img_box").length==7){
			$(".lj_add_box").show();
		}
	})
	//textarea输入框数字限定
	var LastCount=0; 
 	function CountStrByte(Message,Used){ 
		var ByteCount=0; 
		var StrValue=Message.value; 
		var StrLength=Message.value.length; 
		var MaxValue=500; 
		if(LastCount!=StrLength){ 
  			for(i=0;i <StrLength;i++){ 
    				ByteCount=ByteCount+1; 
    				$('.lj_textarear_box').css('border-color','#398be4');
    				$('.lj_textarea').css('color','#333');
    				if(ByteCount>MaxValue){ 
       						Message.value=StrValue.substring(0,i); 
       						ByteCount=MaxValue; 
       						break; 
      				};
  			} 
			Used.innerHTML=ByteCount; 
		}else{
			$('.lj_textarear_box').css('border-color','#dadada');
			Used.innerHTML=ByteCount;
		}
 	}
 	$('#inAnswer').on('keydown',function(){
 		var inAnswer=document.getElementById('inAnswer');
 		var b=document.getElementById('b');
 		CountStrByte(inAnswer,b);
 	})
 	$('#inAnswer').on('keyup',function(){
 		var inAnswer=document.getElementById('inAnswer');
 		var b=document.getElementById('b');
 		CountStrByte(inAnswer,b);
 		if($(this).val()!=""){
 			$(".lj_issue_btn").addClass("active");
	    }else{
		    $(".lj_issue_btn").removeClass("active")
	    }
 	})
    //点击发布
    $('.lj_issue_btn').on('click',function(){
        if($('.lj_textarea').val().length<10){
            $('.mask,.lj_hint').show();
	        $(".lj_textarear_box").attr("class","lj_textarear_box error");
        }else {
            return;
        }
    });
 	/*点击弹出框消失*/
	$(".lj_hint_delete").click(function () {
		$('.mask,.lj_hint').hide();
		$(".lj_textarear_box").attr("class","lj_textarear_box normal");
	});

    $('.lj_hint_know').on('click',function(){
        $('.mask,.lj_hint').hide();
	    $(".lj_textarear_box").attr("class","lj_textarear_box normal");
    })

    //点击清空位置
    $('.lj_delete').on('click',function(){
        $('.lj_address').hide();
	    $('.lj_delete').html('获取位置');
    })

})


},{}]},{},[1])