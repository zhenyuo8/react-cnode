/**
 * Created by Administrator on 2017/2/25.
 */
$(document).ready(function () {
        var selectBtn=(function () {
            $('.diy li').on('click',function () {
               $(this).find("i").find('em').css('display','inline-block');
                $(this).find("i").css('border-color','#3a8be4')
                $(this).siblings().find('em').hide();
                $(this).siblings().find('i').css('border-color','#dadada');
            })
        })()
});