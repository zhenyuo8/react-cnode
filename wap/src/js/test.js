exports.sendData=function(url,fn){
	$.ajax({
	            url:url,
	            dataType : "jsonp",
	            success:function (data) {
	            	console.log(data);
	            		if(data.code===10000){
	      			fn(data);
	            		}
	            		return;
	            },
	            error:function () {
	               alert("请求数据失败");
	            }
        	});
}
