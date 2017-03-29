$(function () {
    var flag=false;
    var bOk=false;
    var carSearch=function () {
        $('#for_input_brand').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if(tar.id=='search_brand'||tar.id=='search_down'){
                if(!flag){
                    $('#car_brand_select').css('visibility','visible');
                    flag=true;
                    if(!bOk){//判断bOk对车名称只绑定一次，
                        bOk=!bOk;
                    }
                }else{
                    $('#car_brand_select').css('visibility','hidden');
                    flag=false;
                }
            }else{
                // $('#car_brand_select').css('visibility','hidden');
                flag=false;
            }
        });
        $('#for_input_brand').on('focus',function (e) {
            $('#search_brand').css('border-color','#398be4');
            $('#search_down').css('background','url("img/triangle_down_hover_03.png")no-repeat center');
            $('#car_brand_select').css('visibility','visible');
            flag=true;
        });
        $('#for_input_brand').on('blur',function (e) {
            $('#search_brand').css('border-color','#dadada');
            $('#search_down').css('background','url("img/triangle_down_default_03.png")no-repeat center');
            $('#car_brand_select').css('visibility','hidden');
            flag=false;
        })
        $('#car_letters').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var lettersValue=$(tar).text();
            moveToTop(lettersValue);
        });
        //选择车品牌，显示该品牌对应的所有系列，并让品牌选择框隐藏
        $('#brand_car_name').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var dataChar=$(tar).attr('data-char');
            $('.search_brand,.search_serial').val($(tar).text());
            $('.car_serial_select').css({'visibility': 'visible'});
            $('#search_brand').css('border-color','#dadada');
            $('#search_down').css('background','url("img/triangle_down_default_03.png")no-repeat center');
            $('#search_serial').css('border-color','#398be4');
            $('#serial_search_down').css('background','url("img/triangle_down_hover_03.png")no-repeat center');

            $('#car_brand_select').css('visibility','hidden');
            //调用函数（ajax)将对应品牌的车型系列，绑定到模板中；
            // getCarSerialDetail(dataChar)
        });


        //选择车品牌
        $('#car_name dd').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var dataChar=$(tar).attr('data-char');
            $('.search_brand,.search_serial').val($(tar).text());
            $('.car_serial_select').css({'visibility': 'visible'});
            $('#car_brand_select').css('visibility','hidden');
        });
        $('#car_brand_select').on('mouseover',function () {
            $('#search_brand').css('border-color','#398be4');
            $('#search_down').css('background','url("img/triangle_down_hover_03.png")no-repeat center');
            $('#car_brand_select').css('visibility','hidden');
            $('#car_brand_select').css('visibility','visible');
            flag=true;
        });
        $('#car_brand_select').on('mouseout',function () {
            $('#search_brand').css('border-color','#dadada');
            $('#search_down').css('background','url("img/triangle_down_default_03.png")no-repeat center');
            $('#car_brand_select').css('visibility','hidden');
            flag=false;
        });
        //选择车型号
        $('#for_input_serial').on('click',function () {
            $('.car_serial_select').css({'visibility': 'visible'});
        });
        $('.serial_car_name').on('click',function () {

        });

        $('.car_serial_select').on('mouseover',function () {
            $('#search_serial').css('border-color','#398be4');
            $('#serial_search_down').css('background','url("img/triangle_down_hover_03.png")no-repeat center');
            $('.car_serial_select').css('visibility','visible');
        });
        $('.car_serial_select').on('mouseout',function () {
            $('#search_serial').css('border-color','#dadada');
            $('#serial_search_down').css('background','url("img/triangle_down_default_03.png")no-repeat center');
            $('.car_serial_select').css('visibility','hidden');
        });
        $('#car_brand_container dl a').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            $('.search_serial').val($(this).text());
            $('.car_serial_select').css({'visibility': 'hidden'});
        });
        //搜索 已选的车品牌车型
        $('#search_new').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var carBrand=$('#search_brand').val();
            var carSerial=$('.search_serial').val();
            if(carBrand||carSerial){
                window.open('https://www.baidu.com/s?wd='+carBrand+carSerial)
            }
        });

        //    找新车

        $('#search_new').on('mouseover',function () {
            $('#search_new').css({'background':"#ff9103"})
        });
        $('#search_new').on('mouseout',function () {
            $('#search_new').css({'background':"#ffa903"})
        })

        $('#search_new').on('mousedown',function () {
            $('#search_new').css({'background':"#ff8003"})
        })
        $('#search_new').on('mouseup',function () {
            $('#search_new').css({'background':"#ff9103"})
        })

        //    按条件搜车

        $('.for_select').on('mouseover',function () {
            $('.icon-select-default_03').css({'background':'url("img/select-hover_03.png") no-repeat center'});
            $('.for_conditional').css('color',"#3a8be4")
        });
        $('.for_select').on('mouseout',function () {
            $('.icon-select-default_03').css({'background':'url("img/select-default_03.png") no-repeat center'});
            $('.for_conditional').css('color',"#666666")
        });
        $('.for_select').on('mousedown',function () {
            $('.icon-select-default_03').css({'background':'url("img/select-press_03.png") no-repeat center'});
            $('.for_conditional').css('color',"#1673d9")
        });
        $('.for_select').on('mouseup',function () {
            $('.icon-select-default_03').css({'background':'url("img/select-hover_03.png") no-repeat center'});
            $('.for_conditional').css('color',"#1673d9")
        });

        //点击车型，将车型名称赋值给input框
        $('#car_brand_container').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var searchWords=$(tar).text();
            $('.search_serial').val(searchWords);
            $('.car_serial_select').css({'visibility': 'hidden'});
        });
        $('#search_new').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var carBrand=$('#search_brand').val();
            var carSerial=$('.search_serial').val();
            if(carBrand||carSerial){
                window.open('https://www.baidu.com/s?wd='+carBrand+carSerial)
            }
        });
    }
    //车品牌切换over out效果
    function carOVer() {
        var hoveFlag=false;
        this.flag=null;
        var that=this;
        $('.car_serial_select dl').mouseover(function () {
            $(this).show();

        })


        $('.car_serial_select').mouseover(function (e) {

            if(!that.flag){
                that.flag=true;
                $('.car_serial_select').show();
            }
        })

    }

    carOVer();

    carSearch();

    //点击字母，滚动到对应首字母车品牌位置
    function moveToTop(lettersValue) {
        var allDl=$('#brand_car_name dl');
        var reg=/^letters_(\w)/ig;
        var topMove=null;
        for(var i=0;i<allDl.length;i++){
            var cur=allDl[i];
            var keyWords=$(cur).attr('id').replace(reg,function () {
                return arguments[1];
            });
            if(keyWords==lettersValue){
                $('#brand_car_name').animate({top:-(topMove)})
            }else{//1px为border,不包含在height中，每一个dl都有，所以需要累加1px
                topMove+=$(cur).height()+1;
            }
        }
    }
});
