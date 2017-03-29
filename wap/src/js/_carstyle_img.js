$(document).ready(function() {
 //图片页没有图片时显示-高度设置
 
    imgEmpty();
    function imgEmpty(){
      var w_height=$(window).height();
      var h_height=$('.pub_head').height();
      var n_height;

      if($(".carNav").length!=0){
      		n_height=$('.carNav').height()+$('.condition_choice').height();
      }else{
      		n_height=$('.carType_tab').height()+$('.condition_choice').height();
      }
      var f_height=$('.crumbs').height()+$('.video_fte').height()+60;
      var e_height=w_height-h_height-n_height-f_height;
      $('.carstyle_img_empty').css('height',e_height);
    }
});
