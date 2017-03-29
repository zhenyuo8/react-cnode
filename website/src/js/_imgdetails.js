/**
 * Created by admin on 2017/1/3.
 */
 /*
$(function(){
    var data=data1;
    $('.Js-u2 li:nth-of-type(3n)').css('marginRight','0px');
    //(function(){
    //    var url='../data/imgwaiguan.json';
    //    $.ajax({
    //        type:'get',
    //        url:url,
    //        success:function(data){
    //            _data=data;
    //            $('#Js-showImg').attr('src',_data[0].Url.replace('{0}','12'))
    //        }
    //    });
    //})();
    //图片初始化
    (function(){
        $('#Js-showImg').attr('src',data1[0].Url.replace('{0}','12'));
        $('.show-img').attr('shownum','0');
    })();
    //右侧tab切换 hover
    $('.Js-u1').delegate('li','mouseenter mouseleave',function(event){
        if(event.type == "mouseenter"){
            var _targe=event.target;
            var _flag=$(_targe).attr('flag');
            if(_flag){
                $(_targe).addClass('hover')
            }
        }else if(event.type == "mouseleave"){
            var _targe=event.target;
            var _flag=$(_targe).attr('flag');
            if(_flag){
                $(_targe).removeClass('hover')
            }
        }
    })
    //右侧tab切换 点击
    //var arrDataId=['../data/imgwaiguan.json','../data/imgneishi.json','../data/kongjian.json','../data/tujie.json','../data/guanfang.json','../data/chezhan.json','../data/imgwaiguan.json','../data/kongjian.json','../data/tujie.json','../data/guanfang.json','../data/chezhan.json','../data/guanfang.json','../data/kongjian.json','../data/imgwaiguan.json','../data/imgneishi.json','../data/kongjian.json','../data/tujie.json','../data/guanfang.json','../data/chezhan.json','../data/imgwaiguan.json','../data/kongjian.json','../data/tujie.json','../data/guanfang.json','../data/chezhan.json','../data/guanfang.json','../data/kongjian.json']
    //$('.Js-u1').delegate('li','click',function(event){
    //    $('.Js-u1 li').removeClass('active');
    //    $('.Js-u1 li').attr('flag','true');
    //    $(this).addClass('active');
    //    $(this).attr('flag','false');
    //    var _dataId=$(this).attr('data-id');
    //    if($(this).attr('isloading')=='true'){
    //        getData(_dataId,this);
    //        $(this).attr('isloading','false');
    //    }else {
    //        return;
    //    }
    //});
    $('.Js-u1').delegate('li','click',function(event){
        $('.Js-u1 li').removeClass('active');
        $('.Js-u1 li').attr('flag','true');
        $(this).addClass('active');
        $(this).attr('flag','false');
        var _dataId=$(this).attr('data-id');
        getData(_dataId)
        $('#Js-showImg').attr('src',data[0].Url.replace('{0}','12'));
        $('.show-img').attr('shownum','0');
    });
    //不同颜色车型 点击
    //$('.Js-u2').delegate('li','click',function(event){
    //    $('.Js-u2 li').removeClass('active');
    //    $(this).addClass('active');
    //    var _dataId=$(this).attr('data-id');
    //    if($(this).attr('isloading')=='true'){
    //        getData(_dataId,this);
    //        $(this).attr('isloading','false');
    //    }else {
    //        return;
    //    }
    //});
    $('.Js-u2').delegate('li','click',function(event){
        $('.Js-u2 li').removeClass('active');
        $(this).addClass('active');
        var _dataId=$(this).attr('data-id');
        getData(_dataId)
        $('#Js-showImg').attr('src',data[0].Url.replace('{0}','12'));
        $('.show-img').attr('shownum','0');
    });
    //$('.u3 ').delegate('li','click',function(){
    //    $('.u3 li').removeClass('active');
    //    $(this).addClass('active');
    //    var _dataId=$(this).attr('data-id');
    //    if($(this).attr('isloading')=='true'){
    //        getData(_dataId,this);
    //        $(this).attr('isloading','false');
    //    }else {
    //        return;
    //    }
    //})
    $('.u3 ').delegate('li','click',function(){
        $('.u3 li').removeClass('active');
        $(this).addClass('active');
        var _dataId=$(this).attr('data-id');
        getData(_dataId)
        $('#Js-showImg').attr('src',data[0].Url.replace('{0}','12'));
        $('.show-img').attr('shownum','0');
    })
    //$('.year_type ul').delegate('li','click',function(){
    //    var _dataId=$(this).attr('data-id');
    //    if($(this).attr('isloading')=='true'){
    //        getData(_dataId,this);
    //        $(this).attr('isloading','false');
    //    }else {
    //        return;
    //    }
    //});
    $('.year_type ul').delegate('li','click',function(){
        var _dataId=$(this).attr('data-id');
        getData(_dataId)
        $('#Js-showImg').attr('src',data[0].Url.replace('{0}','12'));
        $('.show-img').attr('shownum','0');
    });
    //$('.car-type ul').delegate('li','click',function(){
    //    var _dataId=$(this).attr('data-id');
    //    if($(this).attr('isloading')=='true'){
    //        getData(_dataId,this);
    //        $(this).attr('isloading','false');
    //    }else {
    //        return;
    //    }
    //})
    $('.car-type ul').delegate('li','click',function(){
        var _dataId=$(this).attr('data-id');
        getData(_dataId)
        $('#Js-showImg').attr('src',data[0].Url.replace('{0}','12'));
        $('.show-img').attr('shownum','0');
    })

    //function getData(dataId,ele){
    //    $.ajax({
    //        type:'get',
    //        url:arrDataId[dataId-1],
    //        success:function(data){
    //            _data=data;
    //            $('#Js-showImg').attr('src',_data[0].Url.replace('{0}','12'));
    //            $('.show-img').attr('shownum','0');
    //            $(ele).attr('isloading','true')
    //        }
    //    });
    //
    //}
    function getData(dataId){

        switch (dataId){
            case '1':
                data=data1;
                break;
            case '2':
                data=data2;
                break;
            case '3':
                data=data3;
                break;
            case '4':
                data=data4;
                break;
            case '5':
                data=data5;
                break;
            case '6':
                data=data6;
                break;
            case '7':
                data=data1;
                break;
            case '8':
                data=data2;
                break;
            case '9':
                data=data3;
                break;
            case '10':
                data=data4;
                break;
            case '11':
                data=data5;
                break;
            case '12':
                data=data6;
                break;
            case '13':
                data=data1;
                break;
            case '14':
                data=data2;
                break;
            case '15':
                data=data3;
                break;
            case '16':
                data=data4;
                break;
            case '17':
                data=data5;
                break;
            case '18':
                data=data6;
                break;
            case '19':
                data=data1;
                break;
            case '20':
                data=data2;
                break;
            case '21':
                data=data3;
                break;
            case '22':
                data=data4;
                break;
            case '23':
                data=data5;
                break;

        }
    }

    //焦点图事件
    $('.Js-show-img').delegate('img','mousemove',function(event){
        function getEvent(event) {
            return event || window.event;
        }
        function getX(event) {
            var e = getEvent(event);
            //非IE，IE
            return e.pageX || e.clientX + document.body.scrollLeft;
        }
        var _offsetLeft=parseInt(this.offsetLeft);
        var eleWidth=parseInt($(this).width());
        var clientX=parseInt(getX(event))
        if((_offsetLeft+eleWidth/2)>clientX){
            $(this).css('cursor','url(img/left-p.png),auto');
            this.style.cssText = "cursor:url(img/left.ico),auto;";
        }else{
            $(this).css('cursor','url(img/right-p.png),auto');
            this.style.cssText = "cursor:url(img/right.ico),auto;";
        }
    });
    //焦点图点击切换图片事件
    $('.show-img').on('click',function(){
        function getEvent(event) {
            return event || window.event;
        }
        function getX(event) {
            var e = getEvent(event);
            //非IE，IE
            return e.pageX || e.clientX + document.body.scrollLeft;
        }
        var event = arguments.callee.caller.arguments[0] || window.event;
        var _offsetLeft=parseInt(this.offsetLeft);
        var eleWidth=parseInt($(this).width());
        var clientX=parseInt(getX(event))
        if((_offsetLeft+eleWidth/2)>clientX){
            var num=parseInt($('.show-img').attr('shownum'));
            num++;
            if(num>=data.length){
                num=0
            }
            console.log('ok')
            $('#Js-showImg').attr('src',data[num].Url.replace('{0}','12'));
            $('.show-img').attr('shownum',num)
        }else{
            var num=parseInt($('.show-img').attr('shownum'))
            num--;
            if(num<0){
                num=data.length-1
            }
            console.log('ok1')
            $('#Js-showImg').attr('src',data[num].Url.replace('{0}','12'));
            $('.show-img').attr('shownum',num);
        }
    })
})
*/
$(function(){
    require('./layer/layer');
    $(".carYearSelect li").click(function() {
        var selectCarYear = $(this).attr("data-carYear");
        $("#defaultCarYear").attr("data-carYear",selectCarYear);
        $("#defaultCarYear").html(selectCarYear +"款");
    });
    $(".carStyleSelect li").click(function() {
        var selectCarStyleId = $(this).attr("data-id");
        var selectCarStyleName = $(this).find("a").html();
        $("#defaultCarStyle").attr("data-id",selectCarStyleId);
        $("#defaultCarStyle").html(selectCarStyleName);
    });
   dynamicGetData();
   var data = null;
   function dynamicGetData() {
       // 数据需要ajax获取
       var urlspell = $("#carSerialUrlSpell").val();
       var defaultCarYear = 0;
       var defx = $("#defaultCarYear").attr("data-carYear");
       if (defx != null && defx != undefined && defx != '') {
           try {
               defaultCarYear = parseInt(defx);
           }
           catch(err)
           {
               //在此处理错误
               defaultCarYear = 0;
           }

       }
       var defaultCarStyle = 0;
       var carstylex = $("#defaultCarStyle").attr("data-id");
       if (carstylex != null && carstylex != undefined && carstylex != '') {
           defaultCarStyle = parseInt(carstylex);
       }
       var defaultCategoryId = 0;
       var defaultCategoryType = 0;
       $("#categoryUl li").each(function() {
           if ($(this).hasClass("active")) {
               var categoryIdx = $(this).attr('data-categoryId');
               if (categoryIdx != null && categoryIdx != undefined && categoryIdx != ''  ) {
                   defaultCategoryId = parseInt(categoryIdx);
               }

               var categoryTypex = $(this).attr('data-categoryType');
               if (categoryTypex != null && categoryTypex != undefined && categoryTypex != ''  ) {
                   defaultCategoryType = parseInt(categoryTypex);
               }
           }
       });
       var defaultWgId = 0;
       $("#wgUl li").each(function() {
           if ($(this).hasClass("active")) {
               defaultWgId = $(this).attr("data-id");
           }
       });
       var defaultNsId = 0;
       $("#nsUl li").each(function() {
           if ($(this).hasClass("active")) {
               defaultNsId = $(this).attr("data-id");
           }
       });
       //alert("urlspell:"+urlspell);
       //alert("defaultCarYear:"+defaultCarYear);
       //alert("defaultCarStyle:"+defaultCarStyle);
       //alert("defaultCategoryId:"+defaultCategoryId);
       //alert("defaultCategoryType:"+defaultCategoryType);
       //alert("defaultWgId:"+defaultWgId);
       //alert("defaultNsId:"+defaultNsId);
       var params = {};
       params.urlspell = urlspell;
       params.carYear = defaultCarYear;
       params.carId = defaultCarStyle;
       params.categoryId = defaultCategoryId;
       params.categoryType = defaultCategoryType;
       params.wgId = defaultWgId;
       params.nsId = defaultNsId;
       Page.ajaxPost("/serialpic/detailpics",params,true,function(response) {
           //console.log(response);
           if (response.code == 10000) { // 访问成功
               data=null;
               data = response.data;
               //console.log(list);
               //dealWithImg(list);
               var flag = true;
               for (var i = 0; i < data.length; i ++) {
                   var imgData = data[i];
                   if (imgData.imgId == $("#imgIdx").val()) {
                      /* $('#Js-showImg').attr('src',imgData.imgUrl);
                       $('.show-img').attr('shownum',num);*/
                       $('#Js-showImg').attr('src',imgData.imgUrl);
                       $('.show-img').attr('shownum',imgData.imgId);
                       flag = false;
                       break;
                   }
               }
               if (flag) {
                   $('#Js-showImg').attr('src',data[0].imgUrl);
                   $('.show-img').attr('shownum',data[0].imgId);
               }
               flag = true;
               //焦点图点击切换图片事件
               $('.show-img').on('click',function(e){

                   //console.log(data);
                   function getEvent(event) {
                       return event || window.event;
                   }
                   function getX(event) {
                       var e = getEvent(event);
                       //非IE，IE
                       return e.pageX || e.clientX + document.body.scrollLeft;
                   }
                   var _offsetLeft=parseInt(this.offsetLeft);
                   var eleWidth=parseInt($(this).width());
                   var clientX=parseInt(getX(event))
                   if((_offsetLeft+eleWidth/2)>clientX){

                      /* var num=parseInt($('.show-img').attr('shownum'))
                       num--;
                       if(num<0){
                           num=data.length-1
                       }
                       console.log(num)
                       console.log(data[num].imgUrl)
                       $('#Js-showImg').attr('src',data[num].imgUrl);
                       $('.show-img').attr('shownum',num);*/

                       var imgId=parseInt($('.show-img').attr('shownum'));
                       for (var j=0;j<data.length;j++) {
                           if (imgId==data[j].imgId) {
                               if (j>=1) {
                                   $('#Js-showImg').attr('src',data[j-1].imgUrl);
                                   $('.show-img').attr('shownum',data[j-1].imgId);
                               } else {
                                   $('#Js-showImg').attr('src',data[data.length-1].imgUrl);
                                   $('.show-img').attr('shownum',data[data.length-1].imgId);
                               }
                           }
                       }
                   }else{
                       var imgId=parseInt($('.show-img').attr('shownum'));
                       for (var j=0;j<data.length;j++) {
                           if (imgId==data[j].imgId) {
                               if ((j+1) >= data.length) {
                                   $('#Js-showImg').attr('src',data[0].imgUrl);
                                   $('.show-img').attr('shownum',data[0].imgId);
                               } else {
                                   $('#Js-showImg').attr('src',data[j+1].imgUrl);
                                   $('.show-img').attr('shownum',data[j+1].imgId);
                               }
                           }
                       }
                      /* $('#Js-showImg').attr('src',data[num].imgUrl);
                       $('.show-img').attr('shownum',num);*/
                   }
                   e.preventDefault();
               })
           } else {
               $('#Js-showImg').attr('src',"");
               layer.msg("未获取到数据");
           }
       });
   }
        // 点击右侧分类
        $('.Js-u1').delegate('li','click',function(event){
            $('.Js-u1 li').removeClass('active');
            $('.Js-u1 li').attr('flag','true');
            $(this).addClass('active');
            $(this).attr('flag','false');
            var categoryType = $(this).attr("data-categoryType");
            if (categoryType != '1') {
                $('.Js-u2 li').removeClass('active');
                $(".u3 li").removeClass("active");
            }
            dynamicGetData();
            //$('#Js-showImg').attr('src',data[0].imgUrl);
            $('.show-img').attr('shownum','0');
        });
        // 右侧外观
        $('.Js-u2').delegate('li','click',function(event){
            $('.Js-u2 li').removeClass('active');
            $('.Js-u2 li').attr('flag','true');
            var defaultCategoryType = 0;
            $("#categoryUl li").each(function() {
                if ($(this).hasClass("active")) {
                    var categoryTypex = $(this).attr('data-categoryType');
                    if (categoryTypex != null && categoryTypex != undefined && categoryTypex != ''  ) {
                        defaultCategoryType = parseInt(categoryTypex);
                    }
                }
            });
            $(this).addClass('active');
            // 如果是实拍图分类则直接请求
            if (defaultCategoryType == 1) {
                dynamicGetData();
            } else {
                // 如果不是实拍图分类则定位到实拍图分类上 再发送请求
                $("#categoryUl li").each(function() {
                    var categoryTypex = $(this).attr('data-categoryType');
                    if (categoryTypex != null && categoryTypex != ''
                        && categoryTypex != undefined && categoryTypex == '1') {
                        $(this).addClass('active');
                        $(this).siblings().removeClass("active");
                        return false;
                    }
                });
                dynamicGetData();
            }
            //$('#Js-showImg').attr('src',data[0].imgUrl);
            $('.show-img').attr('shownum','0');
        });
        // 右侧内饰
        $('.u3 ').delegate('li','click',function(){
            $(".u3 li").removeClass("active");
            var defaultCategoryType = 0;
            $("#categoryUl li").each(function() {
                if ($(this).hasClass("active")) {
                    var categoryTypex = $(this).attr('data-categoryType');
                    if (categoryTypex != null && categoryTypex != undefined && categoryTypex != ''  ) {
                        defaultCategoryType = parseInt(categoryTypex);
                    }
                }
            });
            $(this).addClass('active');
            // 如果是实拍图分类则直接请求
            if (defaultCategoryType == 1) {
                dynamicGetData();
            } else {
                // 不是实拍图的时候把当前的选中去掉
                // 如果不是实拍图分类则定位到实拍图分类上 再发送请求
                $("#categoryUl li").each(function() {
                    var categoryTypex = $(this).attr('data-categoryType');
                    if (categoryTypex != null && categoryTypex != ''
                        && categoryTypex != undefined && categoryTypex == '1') {
                        $(this).addClass('active');
                        $(this).siblings().removeClass("active");
                        return false;
                    }
                });
                dynamicGetData();
            }

        })
        // 点击年款
        $('.year_type ul').delegate('li','click',function(){
            var urlspell = $("#carSerialUrlSpell").val();
            var imgId = $("#imgId").val();
            var defaultCarYear = 0;
            var defx = $("#defaultCarYear").attr("data-carYear");
            if (defx != null && defx != undefined && defx != '') {
                try {
                    defaultCarYear = parseInt(defx);
                }
                catch(err)
                {
                    //在此处理错误
                    defaultCarYear = 0;
                }

            }
            var url = "http://pic.qichedaquan.com/serialpic/detail/"+urlspell+"/0";
            if (defaultCarYear != null && defaultCarYear != undefined && defaultCarYear != '' && defaultCarYear > 0) {
                url += "?carYear="+defaultCarYear;
            }
            window.location.href = url;
        });
        // 点击车款
        $('.car-type ul').delegate('li','click',function(){
            var urlspell = $("#carSerialUrlSpell").val();
            var imgId = $("#imgId").val();
            var defaultCarYear = 0;
            var defx = $("#defaultCarYear").attr("data-carYear");
            if (defx != null && defx != undefined && defx != '') {
                try {
                    defaultCarYear = parseInt(defx);
                }
                catch(err)
                {
                    //在此处理错误
                    defaultCarYear = 0;
                }

            }
            var url = "http://pic.qichedaquan.com/serialpic/detail/"+urlspell+"/0";
            if (defaultCarYear != null && defaultCarYear != undefined && defaultCarYear != '' && defaultCarYear > 0) {
                url += "?carYear="+defaultCarYear;
            }
            var defaultCarStyle = 0;
            var carstylex = $("#defaultCarStyle").attr("data-id");
            if (carstylex != null && carstylex != undefined && carstylex != '') {
                defaultCarStyle = parseInt(carstylex);
            }
            if (defaultCarStyle != null && defaultCarStyle != undefined && defaultCarStyle != '' && defaultCarStyle > 0) {
                url += "&carId="+defaultCarStyle;
            }
            window.location.href = url;
        })
    //焦点图事件
    $('.Js-show-img').delegate('img','mousemove',function(event){
        function getEvent(event) {
            return event || window.event;
        }
        function getX(event) {
            var e = getEvent(event);
            //非IE，IE
            return e.pageX || e.clientX + document.body.scrollLeft;
        }
        var _offsetLeft=parseInt(this.offsetLeft);
        var eleWidth=parseInt($(this).width());
        var clientX=parseInt(getX(event))
        if((_offsetLeft+eleWidth/2)>clientX){
            $(this).css('cursor','url(/img/left-p.png),auto');
            this.style.cssText = "cursor:url(/img/left.ico),auto;";
        }else{
            $(this).css('cursor','url(/img/right-p.png),auto');
            this.style.cssText = "cursor:url(/img/right.ico),auto;";
        }
    });
    $('.Js-u2 li:nth-of-type(3n)').css('marginRight','0px');
    //图片初始化
    //右侧tab切换 hover
    $('.Js-u1').delegate('li','mouseenter mouseleave',function(event){
        if(event.type == "mouseenter"){
            var _targe=event.target;
            var _flag=$(_targe).attr('flag');
            if(_flag){
                $(_targe).addClass('hover')
            }
        }else if(event.type == "mouseleave"){
            var _targe=event.target;
            var _flag=$(_targe).attr('flag');
            if(_flag){
                $(_targe).removeClass('hover')
            }
        }
    });

})

