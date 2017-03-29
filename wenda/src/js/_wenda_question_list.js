/**
 * Created by Administrator on 2017/3/9.
 */
var tab= require('./_tab');
$(function () {
	//提问，问答切换
	tab('q_choose','new_question','t_active','ul_show','click');
	$(".search_type").on("click","label",function () {
		$(this).attr("class","lab_active").siblings(".lab_active").attr("class","");
	})
})