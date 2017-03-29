    var readURLMy=(function (input, type) {
        //判断你图片的大小和类型
        var file = input.value;
        console.log(file);
        if (!/.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(file)) {
            alertDiv({type:"2",des:"您选择的图片规格不符合规则，请重新选择",time:"3000",fn:function(){}});
            return false;
        } else {
            if (((input.files[0].size).toFixed(2)) >= (6 * 1024 * 1024)) {
                alertDiv({type:"2",des:"您选择的图片大小不符合规则，请重新选择",time:"3000",fn:function(){}});
                return false;
            }
        }
        var formData = new FormData();
        if (1 == type) {
            formData.append("file", document.getElementById("camera_input").files[0]);
        } else {
            formData.append("file", document.getElementById("file_input").files[0]);
        }
        $(".load_mask").show();//显示加载中
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
                $(".load_mask").hide();
                if (data.errorCode != 10000) {
                    if (data.errorCode == -1) {
                        alertDiv({type:"2",des:"图片审核未通过,上传失败",time:"3000",fn:function(){
                                $(".user_img_up").animate({'bottom':'-100%'}, 500,function(){
                                    $(".mask_nojt").fadeOut();
                                });
                                window.location.reload()
                            }
                        });
                    } else {
                        alertDiv({type:"2",des:"上传失败",time:"3000",fn:function(){
                                $(".user_img_up").animate({'bottom':'-100%'}, 500,function(){
                                    $(".mask_nojt").fadeOut();
                                });
                                window.location.reload()
                            }
                        });
                    }
                } else {
                    alertDiv({type:"2",des:"上传成功",time:"3000",fn:function(){
                            $(".user_img_up").animate({'bottom':'-100%'}, 500,function(){
                                $(".mask_nojt").fadeOut();
                            });
                            window.location.reload()
                        }
                    });
                }

            },
            error: function () {
                $(".load_mask").hide();
                alertDiv({type:"2",des:"上传失败-异常",time:"3000",fn:function(){
                        $(".user_img_up").animate({'bottom':'-100%'}, 500,function(){
                            $(".mask_nojt").fadeOut();
                        });
                        window.location.reload()
                    }
                });
            }
        });
    });
