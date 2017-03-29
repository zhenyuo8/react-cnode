(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style tab滑动切换
 *@description: 陈璐
 *@date: name (2017.03.05)
*/

/* js中引用：var tabMsg = require('./_mod_scrollTab');
*           tabMsg(box,swiper,title);
*/

    // 滑动切换
    // tab信息(swiper的父元素，每个swiper类名，tab nav id)
    module.exports = function tabMsg(box,swiper,title){
        var tabBox = document.getElementById(box),
            tabSwiper = swiper,
            tabTitleItem = $(title).find("li");
        tabChange(tabBox,tabSwiper,tabTitleItem);
    }

    // tab切换函数(swiper的父元素，每个swiper类名，tab nav li)
    function tabChange(swipeBox,swipeItemClass,tabTitle){
        var startX,startY,offsetX,offsetY,
            Swidth = window.innerWidth;
        var swipeBoxId = "#"+swipeBox.id;

        swipeBox.addEventListener("touchstart",function(e){
            e.stopPropagation();
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        },false);

        swipeBox.addEventListener("touchmove",function(e){
            offsetX = e.touches[0].clientX - startX;
            offsetY = e.touches[0].clientY - startY;
            if(Math.abs(offsetX) > Math.abs(offsetY)){
                e.preventDefault();
            }
        },false);

        swipeBox.addEventListener("touchend",function(e){
            e.stopPropagation();
            var boundary = Swidth/6; //滑动的最小距离
            var currentIndex = $(event.target).parents(swipeItemClass).index();
            var swiperLength = $(swipeItemClass).length;
            var navItemW = tabTitle.width()/2;

            if(offsetX >= boundary) {   //右滑
                if(currentIndex <= 0){
                    return;
                }else{
                    $(swipeBoxId).animate({
                        'left': -(currentIndex-1)*Swidth+'px'
                    },500);

                    $(swipeBoxId).height($(swipeItemClass).eq(currentIndex-1).height());
                    tabTitle.eq(currentIndex-1).find("a").addClass('current')
                            .parents("li").siblings().find("a").removeClass('current');

                    offsetX=0;offsetY=0;
                }
            }else if(offsetX < 0 && offsetX < -boundary) {  //左滑
                if(currentIndex >= swiperLength-1){
                    return;
                }else{
                    $(swipeBoxId).animate({
                        'left': -(currentIndex+1)*Swidth+'px'
                    },500);

                    $(swipeBoxId).height($(swipeItemClass).eq(currentIndex+1).height());
                    tabTitle.eq(currentIndex+1).find("a").addClass('current')
                            .parents("li").siblings().find("a").removeClass('current');

                    offsetX=0;offsetY=0;
                }
            }else {
                return false;
            }
        },false);
    }

},{}],2:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style article(文章)
 *@description: 陈璐
 *@date: name (2017.02.24)
*/

$(function(){

    // var doT = require('./libs/doT');
    var tabMsg = require('./_mod_scrollTab');
    // var artListTpl = require('./tpl/articleList.html');

    // 初始化
/*    function init(){
        // 第一页
        loadArt();
        // 加载更多
        bindClick();
    }

    // 获取文章数据(模块名称，当前第几页，每页条数，成功回调函数)
    function getArtData(moduleIndex,pageIndex,everyPageNum,loadNews){
        $.ajax({
            url: 'http://172.16.0.102:11300/news/newsmobile/newsdata',
            type: 'GET',
            data: {
                'clientType':'m',
                'app_id':'5d81db99484c0019cab240b3d04e9a4a',
                'newsType':moduleIndex,
                'pageSize':everyPageNum,
                'pageNo':pageIndex
            },
            dataType: 'jsonp',
            success: function(jsonData){
                loadNews(jsonData);
            }
        });
    }

    //模版渲染方法
    //重新渲染模板数据（模块id,第一页数据）
    function artHtml(boxId,jsonData){
        var artData = jsonData.data;
        var $newsList = $('<div class="news_list"></div>'),
            $loadMore = $('<div class="load_more_module">'+
                '<a href="javascript:void(0)" class="load_more">加载更多<img src="img/down.png"></a>'+
                '<a href="javascript:void(0)" class="loading"><img src="img/load_icon.png"></a>'+
                '<a href="javascript:void(0)" class="no_more">没有更多了...</a></div>');

        var artHtmlCompile = doT.compile(artListTpl)(artData);
        $(artHtmlCompile).appendTo($newsList);

        $newsList.appendTo(boxId);
        $loadMore.appendTo(boxId);
    }

    //将不同数据渲染出的模板添加进相应模块（初始状态）
    function loadArt() {
        var $newestId = $("#newestNews"),
            $newCarId = $("#newCarNews"),
            $guideId = $("#guideNews"),
            $evaluatingId = $("#evaluatingNews");

        // 最新
        getArtData(0,1,20,function(data){
            artHtml($newestId,data);
        });
        // 新车
        getArtData(1,1,20,function(data){
            artHtml($newCarId,data);
        });
        // 导购
        getArtData(2,1,20,function(data){
            artHtml($guideId,data);
        });
        // 评测
        getArtData(3,1,20,function(data){
            artHtml($evaluatingId,data);
        });
    }

    // 给每个模块的加载更多绑定点击事件
    function bindClick(){
        var $artModule = $(".news_swiper_box");
        $artModule.each(function(index,item){
            var pageIndex = 2;
            $(this).on("click",".swiper_news .load_more_module .load_more",function(){
                pageIndex++;
                clickLoad(pageIndex,item);
            })
        })
    }

    // 加载更多（当前页码，当前模块索引）
    function clickLoad(pageNum,currentBox){
        var $articleBox = $("#news_content");
        var currentIndex = $(currentBox).index(),
            loadTime = 5,
            loadFn;

        // 显示loading状态
        $(currentBox).find(".load_more").hide()
                     .siblings(".no_more").hide()
                     .siblings('.loading').css("display","inline-block");

        loadFn = setInterval(function(){
            loadTime--;
            if(loadTime == 0){
                clearInterval(loadFn);
                getArtData(currentIndex,pageNum,10,function(moreData){
                    var artData = moreData.data;
                    var allPage = artData.pageConfig.totalPage;     //总页数

                    var artHtmlCompile = doT.compile(artListTpl)(artData);
                    $(artHtmlCompile).appendTo($(currentBox).find(".news_list"));
                    $articleBox.height($(currentBox).height());     //加载页面后重新调整区域高度
                    if(pageNum != allPage){
                        $(currentBox).find(".loading").hide()
                                     .siblings('.no_more').hide()
                                     .siblings('.load_more').css("display","inline-block");
                    }else{
                        $(currentBox).find(".loading").hide()
                                     .siblings(".load_more").hide()
                                     .siblings('.no_more').css("display","inline-block");
                        $(currentBox).unbind();     //给当前元素解绑点击事件
                    }
                });
            }
        },100);
    }

    init();
*/

/*--------------------------------------交互------------------------------------------------*/
    /*tab切换*/
    // 为tab选项卡导航每个选项绑定点击事件
    navBindClick();
    function navBindClick(){
        var $newsTabList = $(".tab_title li");
        $newsTabList.each(function(item){
            $(this).bind("click",function(){
                clickNavItem(this);
            });
        });
    }
    // 点击切换
    function clickNavItem(currentNav){
        var tabindex = $(currentNav).index();
        var $swipeBox = $(currentNav).parents(".tab_title").siblings('.tab_module');
        var windowW = $(window).width();

        $(currentNav).find("a").addClass('current');
        $(currentNav).siblings('li').find("a").removeClass('current');

        $swipeBox.animate({
            'left': -tabindex*windowW+'px'
        },500);

        $swipeBox.height($swipeBox.find(".swiper_box").eq(tabindex).height());
    }

    // 新闻模块tab滑动切换
    tabMsg('news_content','.news_swiper_box',"#newsTabTitle");
})

},{"./_mod_scrollTab":1}]},{},[2])