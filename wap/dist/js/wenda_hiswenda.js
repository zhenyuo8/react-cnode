(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style tab切换
 *@description: 
 *@date: name (2017.02.23)
*/




module.exports = function (menu,content,clname,show,eve) {
	var eve=eve|| e ;
	var lis=document.getElementById(menu),
			con=document.getElementById(content),
		    jsCon=$(con).find(".js-con");
		if(eve=='click'){
			$(lis).delegate('.js-menu','click',function(){
				var index=$(this).index();
				$(this).addClass(clname).siblings().removeClass(clname);
				$(jsCon).eq(index).addClass(show).siblings().removeClass(show);
			})
		}else if(eve=='mouseover'){
			$(lis).delegate('.js-menu','mouseover',function(){
				var index=$(this).index();
				$(this).addClass(clname).siblings().removeClass(clname);
				$(jsCon).eq(index).addClass(show).siblings().removeClass(show);
			})
		}
}



},{}],2:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global style wenda_hiswenda  TA的问答
 *@description:
 *@date: name (2017.03.03)
*/



var tab= require('./_tab');
$(function(){

	ConEmpty();
	showIntro();
	// Link();
	showAll();

	//我的提问、回答切换
    var swiper = new Swiper('.swiper-container', {
        pagination: '',
        initialSlide: 1,
        paginationClickable: true,
        autoHeight: true,
        onSlideChangeStart: function(swiper){
            var li_index=swiper.activeIndex;
            $('.ans_expert_type li').eq(li_index).addClass('ans_active').siblings().removeClass('ans_active');
        }
    });
    $('.ans_expert_type li').on('click',function(){
        var index=$(this).index();
        $(this).addClass('ans_active').siblings().removeClass('ans_active');
        swiper.slideTo(index, 500, false);
    })

    //没有内容时页面样式
    function ConEmpty(){
    	var screenHeight=$(window).height()/2;
    	var topHeight=$('.ans_expert_main').offset().top/2;
    	var htmlHeight=(screenHeight-topHeight)*2;

    	$('.ans_expert_content').each(function(){
    		if($(this).find('.ans_expert_box').length>=1){
    			return;
    		}else{
    			$('.ans_empty').css("height",htmlHeight).show();
    			$('.crumbs,.video_fte').hide();
    		}
    	})
    }

    //个人简介点击展开
    function showIntro(){
    	$('.ans_expert_introduce').on('click',function(){
    		$(this).removeClass('ans_over');
    		ConEmpty();
    	})
    }

    //TA的回答中点赞
    /*function Link(){
    	$('.reply_zan').one('click',function(){
    		var num=parseInt($(this).find('span').text());
    		num++;
    		$(this).find('i').css({
                'background':'url(img/comment_zan2.png)',
                'background-size':'cover'
            });
    		$(this).find('span').text(num).css('color','#ff3131');
    	})
    }*/

    //TA的回答中问题展开全部
    function showAll(){
    	$('body').on('click','.ans_unfold',function(event){
    		var event = event ? event:window.event;
    		event.stopPropagation();
    		$('.recom_text2').removeClass('recon_over');
    		$(this).hide();
    	})
    }

    //分享弹层的显示
    var Share={
        showShare:function(){
            var share_mask=$('.mask2');
            var share_content=$('.zsh_shareLayer');
            $('.ans_expert_share').on('click',function(event){
                event.stopPropagation();
                share_mask.fadeIn();
                share_content.css({
                    bottom: "0",
                    transition: "bottom 0.4s"
                })
            });
            //点击取消
            $('.zsh_cancel').on('click',function(event){
                event.stopPropagation();
                share_mask.fadeOut();
                share_content.css({
                    bottom: "-4.36rem",
                    transition: "bottom 0.4s"
                })
            })
        },
        //分享弹层中点击微信
        clickWX:function(){
            function myBrowser(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
            };
            var mb = myBrowser();
            $('.zsh_shareLayer li').eq(0).on('click',function(){
                if ("Safari" == mb) {
                    $('.zsh_sf_mask').fadeIn();
                    $('.zsh_sf_layer').show();
                }else{
                    //直接调用
                }
            });
            $(document).on('click',function(event){
                event.stopPropagation();
                var target=event.target;
                if($(target).attr('class')=='zsh_wx'){
                    return;
                }else{
                    $('.zsh_sf_mask').fadeOut();
                    $('.zsh_sf_layer').hide();
                    $('.mask2').fadeOut();
                    $('.zsh_shareLayer').css({
                        bottom: "-4.36rem",
                        transition: "bottom 0.4s"
                    })
                }
            })
        }
    }
    Share.showShare();
    Share.clickWX();
})

},{"./_tab":1}]},{},[2])