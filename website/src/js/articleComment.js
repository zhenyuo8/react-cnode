/**
 * Created by Administrator on 2017/1/16.
 */
$(function () {
    require('./layer/layer');
    var articleBig=function () {
        //导航左边hover && press
        $('.left h2').on('mousedown',function () {
            $('.left h2 a').css('color','#126acc')
        });
        $('.left h2 a').on('mouseup',function () {
            $('.left h2 a').css('color','#398be4')
        });


        //评论
        $('.icon_pos span').on('mouseover',function () {
            $(this).addClass('icon-text_hover').removeClass('icon-text_norme')
        })
        $('.icon_pos span').on('mouseout',function () {
            $(this).addClass('icon-text_norme').removeClass('icon-text_hover')
        })
        $('.icon_pos span').on('mousedown',function () {
            $(this).addClass('icon-text_press').removeClass('icon-text_hover')
        })
        $('.icon_pos span').on('mouseup',function () {
            $(this).addClass('icon-text_hover').removeClass('icon-text_press')
        });


        //导航右边hover && press
        $('.right .comment_part').on('mouseover',function () {
            $('.right .text').css('color','#126acc')
        });
        $('.right .comment_part').on('mouseout',function () {
            $('.right .text').css('color','#333')
        });
        $('.right .comment_part').on('mousedown',function () {
            $('.right .text').css('color','#126acc')
        });
        $('.right .comment_part').on('mouseup',function () {
            $('.right .text').css('color','#398be4')
        })
    //    btn切换效果；
        $('#img_inner').on('mouseover',function () {
            $('#img_inner span').css('display','block')
        })
        $('#img_inner').on('mouseout',function () {
            $('#img_inner span').css('display','none')
        })
    //    底部按钮交互效果


        $('.right_article span').on('mouseover',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement
            if(tar.id=='try_drive'||tar.id=='change'){
                $(this).css({'background':'#398be4','color':'#fff','border':'1px solid transparent'})
            }
        });
        $('.right_article span').on('mouseout',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement
            if(tar.id=='try_drive'||tar.id=='change'){
                $(this).css({'background':'#eee','color':'#333','border':'1px solid #dadada'})
            }
        });
        $('.right_article span').on('mousedown',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement
            if(tar.id=='try_drive'||tar.id=='change'){
                $(this).css({'background':'#126acc','color':'#fff','border':'1px solid #dadada'})
            }
        });
        $('.right_article span').on('mouseup',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement
            if(tar.id=='try_drive'||tar.id=='change'){
                $(this).css({'background':'#398be4','color':'#fff','border':'1px solid #dadada'})
            }
        });

    };

    var imgTab=function () {
        var n=0;
        var $imgContainer=$('#img_inner').find('.img_banner_container');
        var $img=$('.img_banner_container').children('img');
        $('.left_btn').on('click',function () {
            if(n<$img.length-1){
                n++;
                $('#img_inner').find('.img_banner_container').animate({left:-n*800},600)
            }else{
                layer.msg('这是最后一张图片了')
            }
        })
        $('.right_btn').on('click',function () {
            if(n>0){
                n--;
                $('#img_inner').find('.img_banner_container').animate({left:-n*800},600)
            }else{
                layer.msg('这一句是第一张图片了，谢谢~~')
            }
        })
    };

    var allComment=function () {
        var flag=false;
        $('.zan_wrap img').on('mouseover',function () {

            $(this).attr({'src':"img/zan_h.png"})
            $('.c-zan-num').css('color','#ff9103')
        })
        $('.zan_wrap img').on('mouseout',function () {

            $(this).attr({'src':"img/zan_c_03.png"})
            $('.c-zan-num').css('color','#ffa903')
        });
        $('.zan_wrap img').on('mousedown',function () {

            $(this).attr({'src':"img/zan_c.png"})
            $('.c-zan-num').css('color','#ff8003')
        });
        $('.zan_wrap img').on('mouseup',function () {

            $(this).attr({'src':"img/zan_h.png"})
            $('.c-zan-num').css('color','#ff9103')
        });
        $('.icon-text_norme img').on('mouseover',function () {
            $(this).attr({'src':"img/comments_icon_h.png"})

        });
        $('.icon-text_norme img').on('mouseout',function () {
            $(this).attr({'src':"img/messge_03.png"})

        });
        $('.icon-text_norme img').on('mousedown',function () {
            $(this).attr({'src':"img/comments_icon_c.png"})

        });
        $('.icon-text_norme img').on('mouseup',function () {
            $(this).attr({'src':"img/comments_icon_h.png"})

        });


        $('.reply-release').on('click',function () {
            $('.reply-box,.reply-release').hide();
            flag=false;
        })

    };

    var videoDetail=function () {
        $('.pagination li').on('mouseover',function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
        $('.pagination li').on('click',function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
        $('.hot_article_container li').on('mouseover',function () {
            $(this).find('a').css({'text-decoration':'underline','color':"#398be4"})
        })
        $('.hot_article_container li').on('mouseout',function () {
            $(this).find('a').css({'text-decoration':'none','color':"#333"})
        })
    };

    //发表评论模块交互，输入内容，发布按钮变色；
    var textSend=function () {
        $('textarea').on('keydown',function () {
                $('.submit').css('background','#ff8003')
        })
        $('textarea').on('keyup',function () {

        })
        $('.submit').on('click',function () {
            var html=$($("textarea").val());
            $("textarea").val(html.text());
            $(this).css('background','#aaa')
        })

    };
    textSend();
    videoDetail();
    imgTab();
    articleBig();
    allComment();
})