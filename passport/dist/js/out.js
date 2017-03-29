/**
 *
 * Created by wangxy on 2017/3/4.
 */
function readURLMy(input) {
    //判断你图片的大小和类型
    var file = input.value;

    if (!/.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(file)) {
        $("#error_photo_type").html('您选择的图片不符合规则，请重新选择');
        $("#error_photo_type").show();
        $('form').hide();
        $('.cur_img_right').hide();
        $('.js_cur_img').show();
        return false;
    } else {
        if (((input.files[0].size).toFixed(2)) >= (3 * 1024 * 1024)) {
            $("#error_photo_type").html('您选择的图片不符合规则，请重新选择');
            $("#error_photo_type").show();
            $('form').hide();
            $('.cur_img_right').hide();
            $('.js_cur_img').show();
            return false;
        }
    }
    $("#error_photo_type").hide();
    $('form').show();
    $('.cur_img_right').show();
    $('.js_cur_img').hide();
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            $mainImg.removeAttr('src');
            $mainImg.attr('src', e.target.result);
            console.log(e.target.result);
            //$mainImg.css("width","200px");
            //$mainImg.css("height","200px");
            $pimg.removeAttr('src');
            $pimg.attr('src', e.target.result);
            $pimg2.removeAttr('src');
            $pimg2.attr('src', e.target.result);
            $pimg3.removeAttr('src');
            $pimg3.attr('src', e.target.result);
            //显示三个预览图
            $preview.show();
            $preview2.show();
            $preview3.show();


            jcrop_api = $.Jcrop('#target', {
                setSelect: [20, 20, 200, 200],
                onChange: updatePreview,
                onSelect: updatePreview,
                boxWidth: 322,
                aspectRatio: xsize / ysize
            });
            var bounds = jcrop_api.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            $preview.appendTo(jcrop_api.ui.holder);
            $preview2.appendTo(jcrop_api.ui.holder);
            $preview3.appendTo(jcrop_api.ui.holder);
            //触发一下选择
            jcrop_api.setSelect([20, 20, 200, 200])
        };
        if (jcrop_api != undefined) {
            jcrop_api.destroy();
        }
    }
    function updatePreview(c) {
        $("#x").val(c.x);
        $("#y").val(c.y);
        $("#w").val(c.w);
        $("#h").val(c.h);
        if (parseInt(c.w) > 0) {
            var rx = xsize / c.w;
            var ry = ysize / c.h;

            $pimg.css({
                width: Math.round(rx * boundx) + 'px',
                height: Math.round(ry * boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });

            var rx = xsize2 / c.w;
            var ry = ysize2 / c.h;

            $pimg2.css({
                width: Math.round(rx * boundx) + 'px',
                height: Math.round(ry * boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
            var rx = xsize3 / c.w;
            var ry = ysize3 / c.h;

            $pimg3.css({
                width: Math.round(rx * boundx) + 'px',
                height: Math.round(ry * boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }
    };

}