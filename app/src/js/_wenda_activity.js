/**
 * Created by Administrator on 2017/3/21.
 */
$(function () {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isiOS){
		$("#ios").show();
	}else{
		$("#ios").hide();
	}
	var pageSlider = PageSlider.case();
	$(".sec2").bind('DOMNodeInserted', function(e) {
		if($(".sec2").attr("class").indexOf(current)){
			$(".sec2").addClass("example");
		}
	});
})