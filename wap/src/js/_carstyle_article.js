$(document).ready(function() {
 //图片页没有图片时显示-高度设置
 
    imgEmpty();
    function imgEmpty(){
      var w_height=$(window).height();
      var h_height=$('.pub_head').height();
      var n_height=$('.carNav').height();
      var f_height=$('.small_nav').height()+$('.video_fte').height()+30;
      var e_height=w_height-h_height-n_height-f_height;
      $('.carstyle_img_empty').css('height',e_height);
    }
});