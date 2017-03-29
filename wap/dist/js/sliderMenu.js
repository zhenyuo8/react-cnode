(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingnig
 *@from: Global style 综述页抽屉/购车计算器页面中右侧抽屉
 *@description:
 *@date: name (2017.02.23)
*/




$(function(){
    //年款、排量、变速箱
    var rightMenu = $('.zsh_drawer'),//整个抽屉
        btn=$('.classify li'),//事件触发元素
        left_btn=$('.slider_btn'),//左侧按钮
        mask1=$('.mask2'),//半透明遮罩
        mask2=$('.mask_area'),//半透明遮罩
        lis=$('.drawerList li');//抽屉中的每一项
    //切换城市
    var cityBtn=$('#city'),
        provinceMenu=$('.right_module_province'),
        cityLi=$('.other_province').find('dd:not([class="zxs"])'),
        cityMenu=$('.right_module_city'),
        back=$('.checked_province'),
        li=cityMenu.find('li:not([class="checked_province"])'),
        zxs=$('.other_province').find('.zxs'),
        current=$('.current'),
        zxsh=$('.zxs_province').find('span');

    //购车计算器
    var cal_jiaoqing=$('.rightMenu_jiaoqing'),
        cal_chechuan=$('.rightMenu_chechuan');
    var cal_rm_jiaoqing=$('.cal_rm_jiaoqing'),
        cal_rm_chechuan=$('.cal_rm_chechuan');

    //购车计算器中选择车款||车款综述，配置中选择车款
    var car_type_btn=$('.choiceCity');
    var sel_rightMenu=$('.right_module'),
        sel_btn=$('.brand_box li'),
        sel_li=$('.car_type_list li'),
        sels_li=$('.cartype_list li'),
        sel_rightMenu_cars=$('.right_module_cars'),
        sel_cars_li=sel_rightMenu_cars.find('li'),
        hot_cars = $("#hot_list ul li");
    var sel_back=$('.back_car');

    //年款、排量、变速箱调用
    showNav(btn, rightMenu, "right");
    //车款综述中选择车款调用
    showNav(car_type_btn, sel_rightMenu, "right");
    showNav(sel_li, sel_rightMenu_cars, "right");
    //切换城市调用
    showNav(cityBtn, provinceMenu, "right");
    showNav(cityLi, cityMenu, "right");
    //购车计算器调用
    showNav(cal_jiaoqing, cal_rm_jiaoqing, "right");
    showNav(cal_chechuan, cal_rm_chechuan, "right");
    //购车计算器中选择车款调用
    showNav(hot_cars, sel_rightMenu, "right");
    showNav(sel_btn, sel_rightMenu, "right");
    showNav(sels_li, sel_rightMenu_cars, "right");

    function showNav(btn, navDiv, direction) {
        btn.on('click', function () {
            mask1.fadeIn();
            mask2.fadeIn();
            left_btn.show();
            if (direction == "right") {
                navDiv.css({
                    right: "0",
                    transition: "right 0.6s"
                });
            }
            var tap=$(this).attr('tap');
            navDiv.attr('tap',tap);

        });
    }
    /*$(".right_module_province").on("click","span",function (e) {
        var target = e.target;
        $("#city").html($(target).html());
    });*/
	$(".right_module_city").on("click","a",function (e) {
		var target = e.target;
		$("#city").html($(target).html());
	});
    mask1.on('click',function(){
        hideNav();
    });
    mask2.on('click',function(){
        hideNav();
    });
    sel_li.on('click',function(){
        hideNav();
    });
    lis.on('click',function(){
        hideNav();
    });
    left_btn.on('click',function(){
        hideNav();
    });
    back.on('click',function(){
        cityMenu.css({
            right: "-100%",
            transition: "right .6s"
        });
    });
    li.on('click',function(){
        hideNav();
    });
    zxs.on('click',function(){
        hideNav();
    });
    zxsh.on('click',function(){
        hideNav();
    });
    current.on('click',function(){
        hideNav();
    });
    sel_cars_li.on('click',function(){
        hideNav();
    });
    sel_back.on('click',function(){
        sel_rightMenu_cars.css({
            right: "-100%",
            transition: "right .6s"
        });
    })

    function hideNav() {
        sel_rightMenu.css({
            right: "-100%",
            transition: "right .6s"
        });
        sel_rightMenu_cars.css({
            right: "-100%",
            transition: "right .6s"
        });
        rightMenu.css({
            right: "-100%",
            transition: "right .6s"
        });
        provinceMenu.css({
            right: "-100%",
            transition: "right .6s"
        });
        cityMenu.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_jiaoqing.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_chechuan.css({
            right: "-100%",
            transition: "right .6s"
        });
        left_btn.hide();
        mask1.fadeOut();
        mask2.fadeOut();
    }
})

},{}]},{},[1])