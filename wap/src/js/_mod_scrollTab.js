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
