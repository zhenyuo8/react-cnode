/*****
 *@author: linyh
 *@from: Global style wenda_answer（问答-回答正文）
 *@description: 陈璐
 *@date: name (2017.03.04)
*/


$(function(){


    //底部固定回复数量点击回到页面第一条评论
    $('.review_btn').on('click',function(){
        var w_height=$(window).height();
        var p_height=$('.pub_head').height();
        var t_height=$('.main_text_module').height();
        var w_top=p_height+t_height+30;
        if($('.wrap').height() <= w_height){
            return;
        }else{
            $("body,html").animate({scrollTop:w_top},500);
        }
    })

    // 弹层效果
    var $mask = $(".mask"),
        $maskUp = $(".zsh_sf_mask"),
        $review = $("#review"),
        $replay = $(".comment_reply");
        $fixedTip = $(".zsh_wx");

    $(".show_more").on("click",function(){
        $(this).hide();
        $(".commnet_text").css("max-height","100%");
    })

    // 收藏
    var isChecked = true;
    $(".collect_btn").on("click",function(){
        if(isChecked == true){
            $(this).css("backgroundImage","url('img/sc_bg_h.png')");
            $(".action_tips").fadeIn().text("收藏成功");
            setInterval(function(){
                $(".action_tips").fadeOut();
            },1200);
            isChecked = false;
        }else{
            $(this).css("backgroundImage","url('img/star.png')");
            $(".action_tips").fadeIn().text("取消收藏");
            setInterval(function(){
                $(".action_tips").fadeOut();
            },1200);
            isChecked = true;
        }
    })


    // 评论
    showReview($review);
    // 回复
    showReview($replay);
    function showReview(reviewBtn){
        reviewBtn.on("click",function(){
            $(".mask").fadeIn();
            $(".review_area").animate({'bottom':'0'},500,function(){
                $("#replyContent").focus();
                isIos(true);    //ios浏览器调起软键盘fixed失效
                if(reviewBtn == $review){
                    $('.reply_b').hide().siblings(".publish").show();
                    $("#replyContent").attr("placeholder","请输入内容...");
                    $("#replyContent").val("");
                }else if(reviewBtn == $replay){
                    $(".publish").hide().siblings('.reply_b').show();
                    $("#replyContent").attr("placeholder","回复周子昕");
                    $("#replyContent").val("");
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

    //删除或举报
    $(".want_do").on("click",function(e){
        e.stopPropagation();
        if($(this).find(".delete_alarm").css("display") == "none"){
            //删除举报不同时出现，多条删除不同时出现
            $(this).find(".delete_alarm").show()
                   .parents(".comment_list").siblings().find(".delete_alarm").hide()
                   .parents(".answer_module").siblings('.main_text_module').find(".delete_alarm").hide();
            $(this).parents(".main_text_module").siblings('.answer_module').find(".delete_alarm").hide();

            $(this).find(".delete_alarm img").on("click",function(){
                $mask.fadeIn();
                if($(this).hasClass('delete')){
                    $(".delete_sure").animate({'bottom': '50%'}, 500);
                }else if($(this).hasClass('alarm')){
                    $("#alarmArea").animate({'bottom': '0'}, 500);
                }
            })
        }else{
            $(this).find(".delete_alarm").hide();
        }
    })
    $(document).click(function(e){
        e.stopPropagation();
        $(".delete_alarm").hide();
    })

    $(".re_btn a").on("click",function(){
        var tipText = $(this).text()+"成功";
        $(".review_tips").text(tipText).fadeIn();
        // 隐藏评论输入框
        $mask.fadeOut();
        $(".review_area").animate({'bottom':'-100%'},500,function(){
            isIos(false);
        });
        setInterval(function(){
            $(".review_tips").fadeOut();
        },2000);
    })

    // 显示分享弹层
    showMask($mask,$("#share"),$(".zsh_shareLayer"),"0");
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
    // 隐藏举报
    hideMask($mask,$("#cancle_turn"),$("#alarmArea"));
    // 隐藏删除
    hideMask($mask,$("#cancleDelete"),$(".delete_sure"));
    // 隐藏微信分享提示层
    function hideMask(mask,hideBtn,hideClass){
        hideBtn.on("click",function(){
            mask.fadeOut();
            hideClass.animate({'bottom':'-100%'},500,function(){
                isIos(false);
            });
        });
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

    //选择城市
    $("#where").on("click",function(){
        $(".mask_area").fadeIn();
        $(".right_module_province").animate({"right":"0"}, 500);
    })

    /* 抽屉效果*/
    // 城市选择所有弹层隐藏
    function hideCity(){
        $(".mask_area").fadeOut();
        $(".right_module_province").animate({right:"-100%"}, 500);
        $(".right_module_city").animate({right:"-100%"}, 500);
    }
    // 点击你在哪里出现抽屉
    $("#publishArea").on("click",function(){
        $(".mask_area").fadeIn();
        $(".right_module_province").animate({right:"0"}, 500);
    })
    // 点击直辖市回到首页，点击省份出现市层
    $("#otherProvince").on("click","dl dd",function(){
        var checkedCity = $(this).find("span").text();
        if($(this).hasClass("zxs")){
            hideCity();
            $("#thisWhere").text(checkedCity);
            $(".now_place").show();
            $('.where').hide();
        }else{
            $(".right_module_city").animate({right:"0"}, 500);
        }
    })
    // 回到省层或选中市回到首页
    $(".right_module_city").on("click","ul li",function(){
        var checkedCity = $(this).find("a").text();
        if($(this).hasClass("checked_province")){
            $(".right_module_city").animate({right:"-100%"}, 500);
        }else{
            hideCity();
            $("#thisWhere").text(checkedCity);
            $(".now_place").show();
            $('.where').hide();
        }
    })
    //直辖市
    $(".zxs_province").on("click","dd span",function(){
        var checkedCity = $(this).text();
        hideCity();
        $("#thisWhere").text(checkedCity);
        $(".now_place").show();
        $('.where').hide();
    })
    // 点击右侧遮罩退出抽屉
    $(".mask_area").on("click",function(){
        hideCity();
    })
    // 点击x显示你在哪里
    $("#publishArea").on("click","#hideCurArea",function(event){
        event.stopPropagation();
        $(this).parents(".now_place").hide()
               .siblings('.where').show();
    })

    /* 上传图片 */
    loadImg();
    function loadImg(){
        var input = $("#choose_img")[0];
    	var result= $(".publish_img")[0];
    	if ( typeof(FileReader) === 'undefined' ){
    		result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
    		input.setAttribute( 'disabled','disabled' );
    	} else {
    		// input.addEventListener( 'change',readFile,false );
        }

    	$(".publish_img").on("click",".del",function (e) {
    		var target = e.target;
    		$(target).parent().remove();
    		$(".publish_img label").css("display","inline");
    	});

    }
    function readFile(){
    	var file = this.files[0];
        //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    	if(!/image\/\w+/.test(file.type)){
    		alert("请确保文件为图像类型");
    		return false;
    	}
    	var reader = new FileReader();
    	reader.readAsDataURL(file);
    	reader.onload = function(e){
    		$(".publish_img").prepend("<span><img src='../img/p_del.png' class='del'><img src='"+this.result+"'></span>");
    		$(".publish_img label").css("display","none");
    	}
    }

})
