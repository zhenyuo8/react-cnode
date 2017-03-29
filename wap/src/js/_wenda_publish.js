/**
 * Created by Administrator on 2017/3/3.
 */

window.onload = function(){
	var input = $("#choose_img")[0];
	var result= $(".publish_img")[0];
	if ( typeof(FileReader) === 'undefined' ){
		result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
		input.setAttribute( 'disabled','disabled' );
	}
	// } else {
		// input.addEventListener( 'change',readFile,false );}
	// $('.counter').textCounter({
	// 	target: '#textarea',
	// 	count: 500,
	// 	alertAt: 500
	// })
	$(".publish_img").on("click","span",function (e) {
		var target = e.target;
		$(target).parent().remove();
		if($(".publish_img span").length==8){
			$(".publish_img label").css("display","inline");
		}
	});
	$(".type_msg_list .sub_type_list li").on("click",function (e) {
		var target = e.target;
		var typeText = $(this).find(".type_name").text();
		$(".publish_bound .fl").prepend("<span class='cho_car'>"+typeText+"<img src='img/delete_red.png' alt=''></span>");
	});
	$(".publish_bound .fl").on("click",".cho_car",function (e) {
		var target = e.target;
		if($(target)[0].src){
			$(target).parent().remove();
		}else{
			$(target).remove();
		}
	});

}
function readFile(){
	var file = this.files[0];
	// console.log(file);
//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
	if(!/image\/\w+/.test(file.type)){
		alert("请确保文件为图像类型");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		$(".publish_img").prepend("<span><img src='img/p_del.png' class='del'><img src='"+this.result+"'></span>");
		if($(".publish_img span").length>=9){
			$(".publish_img label").css("display","none");
		}
	}
}
