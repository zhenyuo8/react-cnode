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


    bindImage:function (lists) {
        var str='';
        var urlCur=''
        var ary=lists;
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
    clickChange:function (lists) {
        var curIndex;
        var that=this;
        var n=lists.length-1;
        var i=0;
        var $right=$('.right_btn');
        var $left=$('.left_btn');
        $('.btn_box .right_btn').css('display','inline-block')
        $('.btn_box .left_btn').css('display','inline-block');
        curIndex=$('#img_inner .active').index();
        $right.on('click',function () {
            if(i>=n){
                i=0;
            }else{
	            i++;
            }
            $("#img_inner img").attr("src",lists[i]);
        })
        $left.on('click',function () {
	        if(i<=0){
		        i=n;
	        }else{
		        i--;
	        }
	        $("#img_inner img").attr("src",lists[i]);
        })



    },

    //弹出大图页，和关闭 大图页
    openClose:function () {
        $('.car-type-introduce-con div').on('click',function (event) {
            event.stopPropagation();

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

    init:function (lists) {
        this.bindImage(lists);
        // this.adjustPosition();
        this.clickChange(lists);
        this.openClose();
    }
};

// window.onload=function () {
    tabImage.init(list);
// }
// $(document).ready(function () {
//
// })
