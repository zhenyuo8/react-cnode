(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/20.
 */
$(document).ready(function () {
    var timer;
    $('.upload_img_left span').on('click', function () {
        // $('form').show();
        // $('.cur_img_right').show();
        // $('.js_cur_img').hide();
    });
    $("#uploadPhoto").click(function () {
        //$("#imgWait").show();
        var formData = new FormData();
        formData.append("file", document.getElementById("fcupload").files[0]);
        formData.append("x", $("#x").val());
        formData.append("y", $("#y").val());
        formData.append("w", $("#w").val());
        formData.append("h", $("#h").val());
        $.ajax({
            url: "/personal/upload",
            type: "POST",
            data: formData,
            /**
             *必须false才会自动加上正确的Content-Type
             */
            contentType: false,
            /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            success: function (data) {
                if (data.errorCode != 10000) {
                    if(data.errorCode == -1){
                        alertDiv({type:"2",des:"图片审核未通过,上传失败",time:"3000",fn:function(){window.location.reload()}});
                    }else{
                        alertDiv({type:"2",des:"上传失败",time:"3000",fn:function(){}});
                    }
                } else {
                    alertDiv({type:"2",des:"上传成功",time:"3000",fn:function(){}});
                }

            },
            error: function () {
                alertDiv({type:"2",des:"上传失败",time:"3000",fn:function(){}});
            }
        });
    });
})

},{}]},{},[1])