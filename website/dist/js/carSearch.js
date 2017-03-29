(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function () {
    var flag=false;
    var bOk=false;
    var carSearch=function () {
        var searchDataChar;
        $('#for_input_brand').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if(tar.id=='search_brand'||tar.id=='search_down'){
                if(!flag){
                    $('#car_brand_select').css('visibility','visible');
                    $('#search_serial').attr('disabled','disabled');
                    $('#search_serial').val('');
                    brandSelect();
                    flag=true;
                    if(!bOk){//判断bOk对车名称只绑定一次，
                        bOk=!bOk;
                    }
                }else{
                    $('#car_brand_select').css('visibility','hidden');
                    flag=false;
                }
            }else{
                flag=false;
            }
        });
        $('#for_input_brand').on('focus',function (e) {
            $('#search_brand').css('border-color','#398be4');
            $('#car_brand_select').css('visibility','visible');
            brandSelect()
            flag=true;
        });
        $('#for_input_brand').on('blur',function (e) {
            $('#search_brand').css('border-color','#dadada');
            $('#search_down').addClass('default1').removeClass('hover');
            $('#car_brand_select').css('visibility','hidden');
            flag=false;
        })
        //选择车品牌，显示该品牌对应的所有系列，并让品牌选择框隐藏
        $('#brand_car_name').on('click','a',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var dataChar=$(tar).attr('data-char');
            $('.search_brand').val($(tar).text());
            $('#search_serial').attr('readonly','readonly');
            // $('.car_serial_select').css({'visibility': 'visible'});
            $('#search_brand').css('border-color','#dadada');
            $('#search_down').removeClass('hover').addClass('default1')
            $('#search_serial').css('border-color','#398be4');
            $('#serial_search_down').addClass('hover').removeClass('default1');
            $('#car_brand_select').css('visibility','hidden');
            //调用函数（ajax)将对应品牌的车型系列，绑定到模板中；
            getCarSerialDetail(dataChar);
        });


        //选择车品牌
        $('#car_name dd').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var dataChar=$(tar).attr('data-char');
            $('.search_brand').val($(tar).text());
            $('.search_serial').val($(tar).text());
            $('.scrollbtn_serial').click();
            // $('.car_serial_select').css({'visibility': 'visible'});
            $('#car_brand_select').css('visibility','hidden');
        });
        $('#car_brand_select').on('mouseover',function () {
            if(!this.flag){
                this.flag=true;
                $('#car_letters span').eq(0).click();
            }
            $('#search_brand').css('border-color','#398be4');
            $('#search_down').addClass('hover').removeClass('default1');
            $('#car_brand_select').css('visibility','hidden');
            $('#car_brand_select').css('visibility','visible');
            // brandSelect();
            flag=true;
        });
        $('#car_brand_select').on('mouseout',function () {
            $('#search_brand').css('border-color','#dadada');
            $('#search_down').addClass('default1').removeClass('hover');
            $('#car_brand_select').css('visibility','hidden');
            flag=false;
        });
        //选择车型号
        $('#for_input_serial').on('click',function () {
            if(!flag){
                if($('#search_brand').val()!==''){
                    // $('.scrollbtn_serial').click();
                    $('.car_serial_select').css({'visibility': 'visible'});
                    $('#search_serial').css('border-color','#398be4');
                    $('#serial_search_down').addClass('hover').removeClass('default1');
                    flag=true;
                }else {
                    $('.car_serial_select').css({'visibility': 'hidden'});
                    $('#serial_search_down').addClass('default1').removeClass('hover');
                    $('#search_serial').css('border-color','#dadada');
                    flag=false;
                }
            }else {
                $('.car_serial_select').css({'visibility': 'hidden'});
                $('#serial_search_down').addClass('default1').removeClass('hover');
                $('#search_serial').css('border-color','#dadada');
                flag=false;
            }
        });

        $('.car_serial_select').on('mouseover',function () {
            if(!this.flag){
                this.flag=true;
                $('.scrollbtn_serial').click();
            }
            $('#search_serial').css('border-color','#398be4');
            $('#serial_search_down').addClass('hover').removeClass('default1');
            $('.car_serial_select').css('visibility','visible');
            flag=true;
        });
        $('.car_serial_select').on('mouseout',function () {
            $('#search_serial').css('border-color','#dadada');
            $('#serial_search_down').addClass('default1').removeClass('hover');
            $('.car_serial_select').css('visibility','hidden');
            flag=false;
        });

        //搜索 已选的车品牌车型
        $('#search_new').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            var carBrand=$('#search_brand').val();
            var carSerial=$('.search_serial').val();
            searchDataChar=$('.search_serial').attr('data-char');
            if(carBrand&&carSerial){
                if(carBrand!=carSerial){
                    window.open('http://car.qichedaquan.com/carSerialSummary/'+searchDataChar)
                }
            }else{
                // window.open('http://car.qichedaquan.com/')
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
            $('.icon-select-default_03').addClass('hover').removeClass('default1');
            $('.for_conditional').css('color',"#3a8be4")
        });
        $('.for_select').on('mouseout',function () {
            $('.icon-select-default_03').addClass('default1').removeClass('hover');
            $('.for_conditional').css('color',"#666666")
        });
        $('.for_select').on('mousedown',function () {
            $('.icon-select-default_03').addClass('press').removeClass('hover');
            $('.for_conditional').css('color',"#1673d9")
        });
        $('.for_select').on('mouseup',function () {
            $('.icon-select-default_03').addClass('hover').removeClass('press');
            $('.for_conditional').css('color',"#1673d9")
        });


        //点击车型，将车型名称赋值给input框
        $('#car_brand_container').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if(tar.tagName=='A'){
                var searchWords=$(tar).text();
                $('#search_serial').attr('disabled',false);
                $('#search_serial').val(searchWords);
                $('#search_serial').attr('data-char',$(tar).attr('data-char'));
                $('.car_serial_select').css({'visibility': 'hidden'});

            }
        });
    };

    //针对firefox下input框有disabled属性无法点击处理
    var disabledCompatibility=(function () {
        if(window.navigator.userAgent.indexOf('Firefox')>-1){
            $('#for_input_brand').append('<span id="firefox_span" class="firefox_span"></span>');
            $('#for_input_serial').append('<span id="firefox_span1" class="firefox_span"></span>');
            $('.firefox_span').css({"display":"block","position":"absolute","width":"248px","height":"24px","top":0
            })
        }
        $('#firefox_span').on('click',function (e) {
            e=e||window.event;
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            e.preventDefault();
            if(!flag){
                $('#car_brand_select').css('visibility','visible');
                $('#search_brand').css('border-color','#398be4');
                $('#search_down').addClass('hover').removeClass('default1');
                $('#search_serial').attr('disabled','disabled');
                $('#search_serial').val('');
                brandSelect();
                flag=true;
                if(!bOk){//判断bOk对车名称只绑定一次，
                    bOk=!bOk;
                }
            }else{
                $('#car_brand_select').css('visibility','hidden');
                $('#search_brand').css('border-color','#dadada');
                $('#search_down').addClass('default1').removeClass('hover');
                flag=false;
            }
        })
        $('#firefox_span1').on('click',function (e) {
            e=e||window.event;
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            e.preventDefault();
            if(!flag){
                $('.car_serial_select').css({'visibility': 'visible'});
                $('#search_serial').css('border-color','#398be4');
                $('#serial_search_down').addClass('hover').removeClass('default1');
                flag=true;
            }else {
                $('.car_serial_select').css({'visibility': 'hidden'});
                $('#serial_search_down').addClass('default1').removeClass('hover');
                $('#search_serial').css('border-color','#dadada');
                flag=false;
            }
        })
    })()
    function mouseWheel(obj,upfun,downfun){
        if(obj.addEventListener){
            obj.addEventListener("mousewheel",fn);
            obj.addEventListener("DOMMouseScroll",fn)
        }else{
            obj.attachEvent("onmousewheel",fn);
        }
        function fn(e){
            var ev=e||window.event;
            //鼠标滚轮滚动的方向
            //火狐 ev.detail  向上-3  向下3
            //IE chrome      ev.wheelDelta  向上120 向下-120
            var val=ev.detail||ev.wheelDelta;
            if(val==-3||val==120){
                upfun();
            }else if(val==3||val==-120){
                downfun();
            }
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                ev.returnValue=false;
            }
        }
    }

    function brandSelect() {
        var out=document.querySelector("#car_brand_select #car_name");
        var inner=document.querySelector("#brand_car_name");
        var scrollbtn=document.querySelector("#car_name .scrollbtn");
        var scrollbar=document.querySelector("#car_name .scrollbar");
        var innerH=inner.offsetHeight;
        var outH=out.offsetHeight;
        var scrollbarH=scrollbar.offsetHeight;
        var bili=innerH/outH;
        var tops;
        var speed=20;
        var topMove;
        var scrollbtnH=scrollbarH/bili;
        scrollbtn.style.height=scrollbtnH+"px";
        var lenH=scrollbarH-scrollbtnH;
        if(bili<1){
            scrollbar.style.display="none";
        }else{
            scrollbtn.onclick=function (e) {
                var ev=e||window.event;
                if(scrollbtn.stopPropagation){
                    ev.stopPropagation();
                }else{
                    return ev.cancelBubble=true;
                }
            }
            scrollbtn.onmousedown = function (e) {
                var ev=e||window.event;
                var lenY=ev.clientY-this.offsetTop;
                if(ev.preventDefault){
                    ev.preventDefault()
                }else{
                    ev.returnValue=false;
                }
                document.onmousemove = function (e) {
                    var ev = e || window.event;
                    tops = ev.clientY - lenY;
                    if(tops<0){
                        tops=0;
                    }
                    if(tops>lenH){
                        tops=lenH;
                    }
                    scrollbtn.style.top = tops + "px";
                    var innerT=tops*bili;
                    inner.style.top=-innerT+"px";
                }
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
            mouseWheel(out,function(){
                tops-=speed;
                setTop()
            },function(){
                tops+=speed;
                setTop()
            })
            scrollbar.onclick=function (e) {
                var ev=e||window.event;
                tops=ev.offsetY;
                setTop()
            }
            document.onkeydown=function (e) {
                var ev=e||event;
                if(ev.keyCode==38){
                    tops-=speed;
                    setTop()
                }else if(ev.keyCode==40){
                    tops+=speed;
                    setTop()
                }
            };


            $('#car_letters').on('click',function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
                e.preventDefault();
                var topH=0;
                if($(tar).hasClass('default')) return;
                var lettersValue=$(tar).text();
                var allDl=$('#brand_car_name dl');
                for(var i=0;i<allDl.length;i++){
                    var cur=allDl[i].id;
                    var keyWords=cur.slice(8);
                    if(keyWords==lettersValue){
                        break;
                    }else{//1px为border,不包含在height中，每一个dl都有，所以需要累加1px
                        if(topH>=innerH-482){
                            topH=innerH-482;
                            // tops=innerH-482;
                        }else{
                            topH+=$(allDl[i]).height()+1;
                        }

                    }
                }
                tops=topH/bili;
                setTopC()
            });
            function setTopC(){
                if(tops<0){
                    tops=0;
                }
                if(tops>=lenH){
                    tops=lenH;
                }

                scrollbtn.style.top=tops+"px";
                inner.style.top=-tops*bili+"px";
            }

            function setTop(){
                if(tops<0){
                    tops=0;
                }
                if(tops>=lenH){
                    tops=lenH;

                }
                scrollbtn.style.top=tops+"px";
                inner.style.top=-tops*bili+"px";
            }
        }
    }


    function serialSelect() {
        var out=document.querySelector(".car_serial_select .serial_name");
        var inner=document.querySelector(".car_serial_select #car_brand_container");
        var scrollbtn=document.querySelector(".serial_name .scrollbtn_serial");
        var scrollbar=document.querySelector(".serial_name .scrollbar_serial");
        var innerH=inner.offsetHeight;
        var outH=out.offsetHeight;
        var scrollbarH=scrollbar.offsetHeight;
        var bili=innerH/outH;
        var tops;
        var speed=20;
        var topMove;
        var scrollbtnH=scrollbarH/bili;
        scrollbtn.style.height=scrollbtnH+"px";
        var lenH=scrollbarH-scrollbtnH;
        // $('#car_brand_container').siblings('div').addClass('scrollbar_serial')
        // $('#car_brand_container').siblings('div').children('div').addClass('scrollbtn_serial')
        if(bili<1){
            scrollbar.style.display="none";
        }else{
            scrollbtn.onclick=function (e) {
                var ev=e||window.event;
                if(scrollbtn.stopPropagation){
                    ev.stopPropagation();
                }else{
                    return ev.cancelBubble=true;
                }
            }
            scrollbtn.onmousedown = function (e) {
                var ev=e||window.event;
                var lenY=ev.clientY-this.offsetTop;
                if(ev.preventDefault){
                    ev.preventDefault()
                }else{
                    ev.returnValue=false;
                }
                document.onmousemove = function (e) {
                    var ev = e || window.event;
                    tops = ev.clientY - lenY;
                    if(tops<0){
                        tops=0;
                    }
                    if(tops>lenH){
                        tops=lenH;
                    }
                    scrollbtn.style.top = tops + "px";
                    var innerT=tops*bili;
                    inner.style.top=-innerT+"px";
                }
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
            mouseWheel(out,function(){
                tops-=speed;
                setTop()
            },function(){
                tops+=speed;
                setTop()
            })
            scrollbar.onclick=function (e) {
                var ev=e||window.event;
                tops=ev.offsetY;
                setTop()
            }
            document.onkeydown=function (e) {
                var ev=e||event;
                if(ev.keyCode==38){
                    tops-=speed;
                    setTop()
                }else if(ev.keyCode==40){
                    tops+=speed;
                    setTop()
                }
            };
            function setTop(){
                if(tops<0){
                    tops=0;
                }
                if(tops>=lenH){
                    tops=lenH;

                }
                scrollbtn.style.top=tops+"px";
                inner.style.top=-tops*bili+"px";
            }
        }

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
    window.serialSelect=serialSelect;
});
},{}]},{},[1])