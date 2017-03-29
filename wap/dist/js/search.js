(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style index-search（首页-搜索）
 *@description: 陈璐
 *@date: name (2017.02.23)
*/

$(function(){

    // 元素显示同时某个其他元素隐藏
    function showHide(hideClass,showClass){
        $(hideClass).hide();
        $(showClass).show();
    }

    // 本地存储搜索历史记录
    function saveHistory(searchName){
        var nameStr,
            nameAttr,
            nameNewStr;
            nameStr = localStorage.getItem("searchkey");
        showHide(".sh_relevance",".search_module");
        if(nameStr == null){
            nameAttr = [];
        }else{
            nameAttr = nameStr.split(",");
        }
        if($.inArray(searchName,nameAttr) == -1){
            nameAttr.push(searchName);
        }
        nameNewStr = nameAttr.join(",");
        localStorage.setItem("searchkey", nameNewStr);
        location.href = "www.baidu.com";
        // $(".search_input").val("");
    }

    //取搜索记录并显示历史纪录
    /*showHistory();
    function showHistory(){
        var searchValue = localStorage.getItem("searchkey");
        var searchValueAttr;
        if(searchValue == null){
            searchValueAttr = [];
            $("#delete_history").hide();
        }else {
            searchValueAttr = searchValue.split(",");
            $("#delete_history").show();
        }
        for (var i = 0; i <= searchValueAttr.length - 1; i++) {
            if(searchValueAttr[i] != "") {
                $('<li><a href="#">' + searchValueAttr[i] + '</a></li>').prependTo(".history_list");
            }
        }
    }*/

    // 清空历史记录
    $("#delete_history").on("click",function(){
        localStorage.removeItem("searchkey");
        $(".history_list").find("li").remove();
        $(this).hide();
    })

    //点击搜索按钮搜索
    $("#searchBtn").on("click",function(){
        var searchType = $(this).siblings('.search_input').val();
        saveHistory(searchType);
    })

    //点击关联词搜索、点击热门车型搜索、点击搜索历史、
    /*function searchType(btn){
        btn.on("click",function(){
            var searchType = $(this).find("a").text();
            saveHistory(searchType);
        })
    }
    searchType($(".result_list li"));
    searchType($(".hot_list li"));
    searchType($(".history_list li"));

    //搜索框值变化事件
    $(".search_input").on("input",function(){
        if($(this).val() != ''){
            showHide(".search_module",".sh_relevance");
            $(".delete_text").css("display","inline-block");
        }else{
            showHide(".sh_relevance",".search_module");
            $(".delete_text").hide();
        }
    })*/

    // 删除搜索框的值
    $(".delete_text").on("click",function(){
        $(".search_input").val("");
        $(this).hide();
        showHide(".sh_relevance",".search_module");
    })

    // 点击取消
    $("#cancel").on("click",function(){
        showHide(".sh_relevance",".search_module");
        $(".delete_text").hide();
        $(".search_input").val("");
    })

})

},{}]},{},[1])