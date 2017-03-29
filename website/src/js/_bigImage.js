
/**
 * Created by Administrator on 2017/3/2.
 */
var ary = [];
var picIndex = 0;
var tabImage={
    adjustPosition:function (urlCur) {
        var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
        var clientWidth=document.documentElement.clientWidth||document.body.clientWidth;
        var bodyHeight;
        var bodyWidth;
        var bodyHeight_true;
        var footerHeight=$('.article_footer').height();
        var headerHeight=$('.article_header').height();
        var fhH=footerHeight+headerHeight;
        var leastMargin=52;
        var img=new Image();
        img.src=urlCur.src;
        img.onload=function () {
            bodyHeight=this.height;
            bodyWidth=this.width;
            if(bodyHeight+fhH+2*leastMargin<clientHeight){
                if(bodyWidth>=800){
                    bodyHeight_true=800*bodyHeight/bodyWidth;
                    $('#img_inner img').css('margin-top',(clientHeight-bodyHeight_true-fhH)/2+headerHeight);
                    $('.article_footer').css({"position":"absolute","bottom":0,"top":"auto"})
                }else{
                    $('#img_inner img').css('margin-top',(clientHeight-bodyHeight-fhH)/2+headerHeight);
                    $('.article_footer').css({"position":"absolute","bottom":0,"top":"auto"})
                }
                $('.article_img').css('height',clientHeight-headerHeight-footerHeight+58);
                $('.img_box a').css('top',($('.article_img').height()-67)/2)
            }else{
                if(bodyWidth>=800){
                    bodyHeight_true=800*bodyHeight/bodyWidth;
                    $('.article_footer').css({"position":"absolute","bottom":0,"top":"auto"});
                    // $('.article_img').css('height',bodyHeight_true+104+52);

                    if(bodyHeight_true+fhH+2*leastMargin<clientHeight){
                        $('.article_footer').css({"position":"absolute","bottom":0,"top":"auto"});
                        $('.article_img').css('height',clientHeight-footerHeight);
                        $('#img_inner img').css('margin-top',(clientHeight-fhH-bodyHeight_true)/2+headerHeight);
                    }else{
                        $('.article_footer').css({"position":"absolute","top":bodyHeight_true+fhH+leastMargin,"bottom":"auto"});
                        $('.article_img').css('height',bodyHeight_true+fhH+leastMargin);
                        $('#img_inner img').css('margin-top','112px');
                        // $('#img_inner img').css('margin-bottom','122px');
                    }
                }else{
                    $('.article_footer').css({"position":"absolute","top":bodyHeight+52+fhH,"bottom":"auto"});
                    $('.article_img').css('height',bodyHeight+104+52);
                }
                // $('#img_inner img').css('margin-top','112px');
                // $('.img_box span').css('top',(clientHeight-67-headerHeight)/2)
            }
        };
        $('.btn_box').css('top',(clientHeight-67)/2)
    },
    //绑定图片url,第一张图片url复制给src,第二张开始讲url赋值给img的自定义属性data-src属性上


    bindImage:function (index) {
        var str='';
        var urlCur='';
        for(var i=0;i<ary.length;i++){
            str+=i==index?'<img class="active" src='+ary[i]+' data-src='+ary[i]+'>':'<img src="" data-src='+ary[i]+'>';
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
        var curIndex=picIndex;
        var that=this;
        var n=$('#img_inner img').length-1;
        var i=picIndex;
        var $right=$('.right_btn');
        var $left=$('.left_btn');
        var box=document.getElementById('img_inner');
        var prevImg=box.getElementsByTagName('img')[i];
        var prevUrl=prevImg.src;
        prevImg.setAttribute('data-src',prevUrl);
        if(i == 0 ){
            $('.btn_box .left_btn').css('display','none');
        }else{
            $('.btn_box .left_btn').css('display','inline-block');
        }

        if( (i+1) == ary.length){
            $('.btn_box .right_btn').css('display','none');
        }else{
            $('.btn_box .right_btn').css('display','inline-block');
        }
        $right.on('click',function (e) {
            e=e||window.event;
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            e.preventDefault();

            if(i<=n){
                i++;
                $('.countPages').find('.now').html(i+1);
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
            if(i>=0){
                i--;
                $('.countPages').find('.now').html(i+1);
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
        var that=this;
        $('.car-type-introduce-con img').on('click',function (event) {
            event.stopPropagation();
            var regExp =/_\d{2,4}x\d{2,4}/;
            var src = $(this).attr('src');
            var articalPicSrc = src.replace(regExp,"");
            for(var i=0;i<ary.length;i++){
                if(ary[i]===articalPicSrc){
                    picIndex = i;
                }
            }
            that.clickChange();
            that.bindImage(picIndex);
            $('.countPages').find('.now').html(picIndex+1);
            $('.big_image').css('display','block');
            $('.article-body').hide();
            $('.header').hide();
            $('.footer').hide();
        });

        $('.delete_btn').on('click',function () {
            $('.left_btn').unbind('click');
            $('.right_btn').unbind('click');
            $('.big_image').hide();
            $('.article-body').show();
            $('.header').show();
            $('.footer').show();
        })
    },


    init:function () {

        //this.bindImage();
        // this.adjustPosition();

        this.openClose();
    }
};

window.onload=function () {
    //循环img_banner_container图片至picList

    var picLen = $('#img_inner img');
    for(var i=0;i<picLen.length;i++){
        ary.push(picLen.eq(i).attr('src'));
    }
    $('.countPages').find('.total').html(picLen.length);
    tabImage.init();
}
