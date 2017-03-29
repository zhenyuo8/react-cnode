$(document).ready(function () {
    $('#suvUl li').each(function () {
        if ($(this).attr("data-show") && $(this).attr("data-show") == "ok") {
            $("#suvUlInput").html($(this).html());
            $("#suvUlInput").addClass("active");
            $("#suvUlInput").addClass("c");
        }
    });
    $('#driveUl li').each(function () {
        if ($(this).attr("data-show") && $(this).attr("data-show") == "ok") {
            $("#driveInput").html($(this).html());
            $("#driveInput").addClass("active");
            $("#driveInput").addClass("c");
        }
    });
    $('#fourWheelUl li').each(function () {
        if ($(this).attr("data-show") && $(this).attr("data-show") == "ok") {
            $("#fourWheelInput").html($(this).html());
            $("#fourWheelInput").addClass("active");
            $("#fourWheelInput").addClass("c");
        }
    });
    $('.Js-select-type-con .Js-h,input[type="checkbox"]').click(function (e) {
        var type = $(this).find('a').attr("datatype");
        var val = $(this).find('a').attr("data-val");
        if (type && type.length > 0 && type != "" && val && val.length > 0 && val != "") {
            var href = setUrlParams(type, val);
            window.location.href = href;
        }

    })

    $("#gzd-sort").click(function () {
        var type = $(this).attr("data-type");
        var cl = $(this).parent().attr("class");
        if ("active" == cl) {
            if (type == 'b1') {
                var href = setUrlParams("s", 1);
                window.location.href = href;
            } else {
                var href = setUrlParams("s", 2);
                window.location.href = href;
            }
        } else {
            if (type == 'b1') {
                var href = setUrlParams("s", 1);
                window.location.href = href;
            } else {
                var href = setUrlParams("s", 2);
                window.location.href = href;
            }
        }
    });

    $("#jg-sort").click(function () {
        var type = $(this).attr("data-type");
        var cl = $(this).parent().attr("class");
        if ("active" == cl) {
            if (type == 'b1') {
                var href = setUrlParams("s", 3);
                window.location.href = href;
            } else {
                var href = setUrlParams("s", 4);
                window.location.href = href;
            }
        } else {
            if (type == 'b1') {
                var href = setUrlParams("s", 4);
                window.location.href = href;
            } else {
                var href = setUrlParams("s", 3);
                window.location.href = href;
            }
        }

    });

    $(".more_checkbox").click(function (e) {
        var argStr = "more=";
        var vals = "";
        $(".more_checkbox").each(function () {
            if ($(this).is(':checked')) {
                if (vals == "") {
                    vals = $(this).attr("data-val");
                } else {
                    vals += "_" + $(this).attr("data-val");
                }
            }
        });
        //if (vals.trim().length > 0) {
        var href = setUrlParams("more", vals);
        window.location.href = href;
        //}
    });

    $('.Js-drop-down .ho').click(function (event) {
        var type = $(this).attr("datatype");
        var val = $(this).attr("data-val");
        if (type && type.length > 0 && type != "" && val && val.length > 0 && val != "") {
            var href = setUrlParams(type, val);
            window.location.href = href;
        }
    });

    $('.pade_turning a').click(function () {
        var val = $(this).attr("page-no");
        if (val && val != null && val != "") {
            var href = setUrlParams("page", val);
            window.location.href = href;
        }
    });

    function setUrlParams(name,val){
        var q = location.search.substr(1);
        var href = "/carConditionSelect/index";
        var parArr=new Array();
        if(name!="page"){
            q=delUrlParams(q,"page");
        }
        if (q!=null&&q!=undefined&&q!=""){
            parArr=q.split("&");
            if (parArr!=null && parArr.length>0){
                var isCons=false;
                for(var i=0;i<parArr.length;i++){
                   var valArr= parArr[i].split("=");
                   var newPar="";
                   if(valArr[0]==name){
                       newPar=name+"="+val;
                       parArr[i]=newPar;
                       isCons=true;
                       break;
                   }
                }
                if(!isCons){
                    var newPar=name+"="+val;
                    parArr.push(newPar);
                }
            }
        }else{
           var newPar=name+"="+val;
           parArr.push(newPar);
        }
        var params=parArr.join("&");
        return href+"?"+params;
    }
    // function setUrlParams(name,value) {
    //     var q = location.search.substr(1);
    //     var href = "/carConditionSelect/index";
    //     var argStr = '';
    //     if (q && q.trim().length > 0 && q != "") {
    //         var qs = q.split('&');
    //         if (q.indexOf(key + "=") >= 0) {
    //             for (var i = 0; i < qs.length; i++) {
    //                 if (qs[i].trim().length > 0 && qs[i] != "") {
    //                     var oKey = qs[i].substring(0, qs[i].indexOf('='));
    //                     var oVal = qs[i].substring(qs[i].indexOf('=') + 1);
    //                     if (oKey == key) {
    //                         oVal = val;
    //                     }
    //                     if (argStr && argStr.trim().length > 0 && argStr != "") {
    //                         argStr += "&" + oKey + '=' + oVal;
    //                     } else {
    //                         argStr += oKey + '=' + oVal;
    //                     }
    //                 }
    //             }
    //         } else {
    //             argStr += q + "&" + key + "=" + val;
    //         }
    //     } else {
    //         return href + "?" + key + "=" + val;
    //     }
    //     return href + "?" + argStr;
    // }
    function delUrlParams(url,name) {
        var reg = new RegExp("(\\\?|&)" + name + "=([^&]*)(|$)");
        return url.replace(reg,"");
    }

    $('.Js-enter').on('click', function () {
        var priceMin = parseInt($('.Js-mim').val());
        var priceMan = parseInt($('.Js-max').val());
         if(priceMan=="NaN" || priceMin=="NaN"){
            return;
        }

        if (priceMin < priceMan) {
            var href = setUrlParams("p", priceMin + "-" + priceMan);
            window.location.href = href;
        }
    });
})


