(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/3/2.
 */
var tabImage={
    adjustPosition:function (urlCur) {
        var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
        var clientWidth=document.documentElement.clientWidth||document.body.clientWidth;
        var bodyHeight;
        var footerHeight=$('.article_footer').height();
        var headerHeight=$('.article_header').height();
        var img=new Image();
        img.src=urlCur.src;
        img.onload=function () {
             bodyHeight=this.height;
            if(bodyHeight<clientHeight){
                $('.article_footer').css({"position":"absolute","top":clientHeight-footerHeight})
                $('.article_img').css('height',clientHeight-headerHeight-footerHeight+70);
                $('#img_inner img').css('margin-top',(clientHeight-130-bodyHeight)/2);
                $('#img_inner img').css('margin-bottom',(clientHeight-130-bodyHeight)/2);
                $('.img_box a').css('top',($('.article_img').height()-67)/2)
            }else{
                $('#img_inner img').css('margin-top','auto');
                $('#img_inner img').css('margin-bottom','auto');
                $('.article_footer').css({"position":"static","bottom":0});
                $('.article_img').css('height',bodyHeight+104);
                $('.img_box span').css('top',(clientHeight-67-headerHeight)/2)
            }
        };
        $('.btn_box').css('top',(clientHeight-footerHeight-67)/2)
    },
    //绑定图片url,第一张图片url复制给src,第二张开始讲url赋值给img的自定义属性data-src属性上


    bindImage:function () {
        var str='';
        var urlCur=''
        var ary=['img/pic/pic_11.jpg','img/pic/pic_03.jpg','img/pic/pic_13.jpg'];
        for(var i=0;i<ary.length;i++){
            str+=i==0?'<img class="active" src='+ary[i]+' alt="">':'<img src="" data-src='+ary[i]+' alt="">';
        }
        $('#img_inner').html(str);
        var allImage=$('#img_inner img');
        for(var j=0;j<allImage.length;j++){
            if($(allImage[j]).hasClass('active')){
                urlCur=allImage[j];
                this.adjustPosition(urlCur);
            }
        }
    },
    clickChange:function () {
        var curIndex;
        var that=this;
        var n=$('#img_inner img').length-1;
        var i=0;
        var $right=$('.right_btn');
        var $left=$('.left_btn');
        $('.btn_box .right_btn').css('display','inline-block')
        $('.btn_box .left_btn').css('display','none');
        curIndex=$('#img_inner .active').index();
        $right.on('click',function () {
            var box=document.getElementById('img_inner');
            var prevImg=box.getElementsByTagName('img')[i]
            var prevUrl=prevImg.src;
            prevImg.setAttribute('data-src',prevUrl);
            i++;
            if(i<=n){
                var urlCur=box.getElementsByTagName('img')[i];
                var nextUrl=urlCur.getAttribute('data-src');
                $('#img_inner img').eq(i).addClass('active').siblings().removeClass('active');
                $('#img_inner img').eq(i).attr('src',nextUrl)
                $('#img_inner img').eq(i).siblings().attr('src','');
                that.adjustPosition(urlCur);
                if(i==n){
                    $('.btn_box .right_btn').css('display','none')
                    $('.btn_box .left_btn').css('display','inline-block');
                }
            }
            if(i>=1){
                $('.btn_box .left_btn').css('display','inline-block');
            }
        })
        $left.on('click',function () {
            var box=document.getElementById('img_inner');
            var prevImg=box.getElementsByTagName('img')[i];
            var prevUrl=prevImg.src;
            prevImg.setAttribute('data-src',prevUrl);
            i--;
            if(i>=0){
                var urlCur=box.getElementsByTagName('img')[i];
                var nextUrl=urlCur.getAttribute('data-src');
                $('#img_inner img').eq(i).addClass('active').siblings().removeClass('active');
                $('#img_inner img').eq(i).attr('src',nextUrl);
                $('#img_inner img').eq(i).siblings().attr('src','');
                that.adjustPosition(urlCur);
                if(i==0){
                    $('.btn_box .right_btn').css('display','inline-block');
                    $('.btn_box .left_btn').css('display','none');
                }
            }
            if(i>=1){
                $('.btn_box .right_btn').css('display','inline-block')
            }
        })



    },

    //弹出大图页，和关闭 大图页
    openClose:function () {
        $('.car-type-introduce-con img').on('click',function (event) {
            event.stopPropagation();
            var regExp =/_\d{4}x\d{4}/;
            var src = $(this).attr('src');
            var articalPicSrc = src.replace(regExp,"");
            $('.big_image').show();
            // $('.article-body').hide();
            $('.header').hide();
            $('.footer').hide();
        });

        $('.delete_bg').on('click',function () {
            $('.big_image').hide();
            // $('.article-body').show();
            $('.header').show();
            $('.footer').show();
        })
    },

    init:function () {
        this.bindImage();
        // this.adjustPosition();
        this.clickChange();
        this.openClose();
    }
};

// window.onload=function () {
    tabImage.init();
// }
// $(document).ready(function () {
//
// })

},{}]},{},[1])