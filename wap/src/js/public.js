/*
*  页面零碎公共js
*/


$(function(){
    //初始化
    function init(){
        goHistory();
    }

    //返回上级页面
    function goHistory(){
        $("#goHistory").click(function() {
        	window.history.back();
        });
    }
    
    init();
});
