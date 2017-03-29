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
 *@from: Global style calculator(车型中购车计算器)
 *@description: 
 *@date: name (2017.02.25)
*/


window.onload=function(){
    $('.rightMenu_jiaoqing,.rightMenu_chechuan,.rightMenu_disanf,.rightMenu_boli,.rightMenu_huahen,.rightMenu_siji,.rightMenu_chengke').on('click',function(){
        isBodyScroll(true);
    })
    $('.drawerList li,.mask2').on('click',function(){
        isBodyScroll(false);
    })
}
var tab= require('./_tab');
$(function(){

    calSelect();
   // reset();

    //全款中保险切换
    //tab('cal_insurance','cal_recommend_type','recommend_active','recommend_show','click');

    //贷款中保险切换
    // tab('cal_loan_list','cal_loan_content','recommend_active','recommend_show','click');

    //重置页中全款和贷款切换
     // tab('calculate_way','calculate_content','calculate_active','show','click');

    //点击重置
    /**
  function reset(){
       $('.cal_reset').on('click',function(){
           window.location="calculator_empty.html?target="+$(this).attr("target");
       })
    }
    */

    //抽屉
    function calSelect(){
        $('.drawerList li').on('click',function(){
            var tap=$(this).parents('.cal_drawer').attr('tap');
            var text=$(this).text();
            switch (tap){
                case 'q_jiaoqiang':
                  $('.rightMenu_jiaoqing[tap="q_jiaoqiang"]').find('.cal_type_explain').html(text);
                  break;
                case 'q_chechuan':
                  $('.rightMenu_chechuan[tap="q_chechuan"]').find('.cal_type_explain').html(text);
                  break;
                case 'q_disanf':
                  $('.rightMenu_disanf[tap="q_disanf"]').find('.recommend_bizozhu').html("赔付"+text);
                  break;
                case 'q_boli':
                  $('.rightMenu_boli[tap="q_boli"]').find('.recommend_bizozhu').html(text+"玻璃");
                  break;
                case 'q_huahen':
                  $('.rightMenu_huahen[tap="q_huahen"]').find('.recommend_bizozhu').html("赔付"+text);
                  break;
                case 'q_siji':
                  $('.rightMenu_siji[tap="q_siji"]').find('.recommend_bizozhu').html("赔付"+text);
                  break;
                default:
                  $('.rightMenu_chengke[tap="q_chengke"]').find('.recommend_bizozhu').html("赔付"+text);
                  break;
            }
        })
    }

    //推荐保险处是否勾选
    
      var mask=$('.mask2');
      var left_btn=$('.slider_btn');
      var lis=$('.drawerList li');
      var cal_disanf=$('.rightMenu_disanf'),
          cal_boli=$('.rightMenu_boli'),
          cal_huahen=$('.rightMenu_huahen'),
          cal_siji=$('.rightMenu_siji'),
          cal_chengke=$('.rightMenu_chengke');
      var cal_rm_jiaoqing=$('.cal_rm_jiaoqing'),
          cal_rm_chechuan=$('.cal_rm_chechuan'),
          cal_rm_disanf=$('.cal_rm_disanf'),
          cal_rm_boli=$('.cal_rm_boli'),
          cal_rm_huahen=$('.cal_rm_huahen'),
          cal_rm_siji=$('.cal_rm_siji'),
          cal_rm_chengke=$('.cal_rm_chengke');

          showNav(cal_disanf, cal_rm_disanf, "right");
          showNav(cal_boli, cal_rm_boli, "right");
          showNav(cal_huahen, cal_rm_huahen, "right");
          showNav(cal_siji, cal_rm_siji, "right");
          showNav(cal_chengke, cal_rm_chengke, "right");
      
      
      $('.inselect').on('click',function(event){          
          event.stopPropagation();
          return false;
      })
      
      function showNav(el, navDiv, direction) {
          $(el).on('click',function (event){
            event.stopPropagation();
            if($(this).attr('isclick')=='true'){
                mask.fadeIn();
                left_btn.show();
                if (direction == "right") {
                    navDiv.css({
                        right: "0",
                        transition: "right 0.6s"
                    });
                }
              }else{
                return;
              } 
        });      
      }
      mask.on('click',function(){
        hideNav();
      })
      left_btn.on('click',function(){
        hideNav();
      })
      lis.on('click',function(){
        hideNav();
      })
      function hideNav() {
        cal_rm_jiaoqing.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_chechuan.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_disanf.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_boli.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_huahen.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_siji.css({
            right: "-100%",
            transition: "right .6s"
        });
        cal_rm_chengke.css({
            right: "-100%",
            transition: "right .6s"
        });
        left_btn.hide();
        mask.fadeOut();
    }
})
},{"./_tab":1}]},{},[2])