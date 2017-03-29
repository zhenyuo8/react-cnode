(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: linyh
 *@from: Global style articleDetail
 *@description: 陈璐
 *@date: name (2017.02.24)
*/

(function(){

    // 文章目录
    showCatalog();

    function showCatalog(){
        $("#loadMore").on("click",function(){
            $("#morePage").show();
            $("#catalog").show();
            $(this).hide();
        })

        $("#catalog").on("click",function(){
            $(".mask").show();
            $("#catalog_area").animate({'bottom':'0'},500,function(){
                $("#cancle_turn").show();
                isBodyScroll(true);
            });
        })

        $("#cancle_turn").on("click",function(){
            $(".mask").hide();
            $(this).hide();
            $("#catalog_area").animate({'bottom':'-100%'},500,function(){
                isBodyScroll(false);
            });
        })
    }

    // 收藏
    var isChecked = true;
    $(".collect_btn").on("click",function(){
        if(isChecked == true){
            $(this).css("backgroundImage","url('img/sc_bg_h.png')");
            alertDiv({type:"2",des:"收藏成功",time:"2000",fn:function(){}});
            isChecked = false;
        }else{
            $(this).css("backgroundImage","url('img/star.png')");
            alertDiv({type:"2",des:"取消收藏",time:"2000",fn:function(){}});
            isChecked = true;
        }
    })

    // 弹层效果
    var $mask = $(".mask"),
        $maskUp = $(".zsh_sf_mask"),
        $review = $("#review"),
        $replay = $(".comment_reply"),
        $fixedTip = $(".zsh_wx");

    // 评论
    showReview($review);
    // 回复
    showReview($replay);
    function showReview(reviewBtn){
        reviewBtn.on("click",function(){
            $(".mask").fadeIn();
            $(".review_area").animate({'bottom':'0'},500,function(){
                if(reviewBtn == $review){
                    $('.reply').hide().siblings(".publish").show();
                    $("#replyContent").attr("placeholder","我来说两句...");
                }else if(reviewBtn == $replay){
                    $(".publish").hide().siblings('.reply').show();
                    $("#replyContent").attr("placeholder","回复雨晴");
                }
            });
        })
    }

    $("#replyContent").on("input",function(){
        if($(this).val() == ''){
            $(".re_btn").find("a").css("color","#ccc");
        }else{
            $(".re_btn").find("a").css("color","#2799fe");
        }
    })

    // 显示分享弹层
    showMask($mask,$("#share"),$(".zsh_shareLayer"),"0");
    // 显示微信提示弹层
    showMask($maskUp,$(".wx"),$(".wx_fixed_tip"),"40%");
    function showMask(mask,showBtn,showClass,bottomSize){
        showBtn.on("click",function(){
            mask.fadeIn();
            showClass.animate({'bottom':bottomSize},500);
        })
    }

    // 隐藏分享弹层
    hideMask($mask,$(".zsh_cancel"),$(".zsh_shareLayer"));
    // 隐藏评论输入框
    hideMask($mask,$(".cancle"),$(".review_area"));
    // 隐藏微信分享提示层
    hideMask($maskUp,$maskUp,$(".wx_fixed_tip"));
    function hideMask(mask,hideBtn,hideClass){
        hideBtn.on("click",function(){
            mask.fadeOut();
            hideClass.animate({'bottom':'-100%'},500);
        })
    }

    // 显示隐藏底部固定分享微信提示弹层
    fixShare($fixedTip);
    fixShare($maskUp);
    function fixShare(shareBtn){
        shareBtn.on("click",function(){
            if(shareBtn == $fixedTip){
                $maskUp.fadeIn();
                $(".zsh_sf_layer").fadeIn();
            }else if(shareBtn == $maskUp){
                $maskUp.fadeOut();
                $(".zsh_sf_layer").fadeOut();
            }
        })
    }

})();

},{}]},{},[1])