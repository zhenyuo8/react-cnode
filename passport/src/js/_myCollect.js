/**
 * Created by Administrator on 2017/2/22.
 */
$(document).ready(function () {
    var deleteCollect=(function () {
        $('.container em').on('click',function () {
            console.log(this)
            $('.cancel_confirm_delete').show();
            // $('.cancel_confirm_delete').show()
        })

        if($('.content_article ').children('.container').length<=10){
            $('.tcdPageCode').hide()
        }else{
            $('.tcdPageCode').show()
        }
    })()
})