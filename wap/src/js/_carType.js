/*****
 *@author: jianingning
 *@from: Global style 车款中的综述，图片，配置页面
 *@description:
 *@date: name (2017.02.28)
*/


window.onload=function(){
    //选择车款抽屉弹出禁止body滑动
    $('.choiceCity').on('click',function(){
        isBodyScroll(true);
    })
    $('.car_type_list li').on('click',function(){
        isBodyScroll(false);
    })
    //城市选择抽屉弹出禁止body滑动
    $('#city').on('click',function(){
        isBodyScroll(true);
    })
    $('.zxs,.mask2').on('click',function(){
        isBodyScroll(false);
    })
    $('.right_module_city').find('li[class!="checked_province"]').on('click',function(){
        isBodyScroll(false);
    })
}
var tab= require('./_tab');
$(function(){

    showMenu();

    var closestPos = $('#dealerDistance');
    getPosition(closestPos);

    //距离最近
    function getPosition(getPosBtn){
        getPosBtn.on("click",function(){
            getLocation();
        })
        // 获取地理位置
        function getLocation(){
            if (navigator.geolocation){
                var option = {
                        enableHighAccuracy : true,
                        timeout : 5000,
                        maximumAge : 0
                    };
                navigator.geolocation.getCurrentPosition(showPosition,errorPosition,option);
            }else{
                console.log( "该浏览器不支持获取地理位置.");
            }
        }
        // 获取位置成功
        function showPosition(position){
            var thisPos = "纬度: " + position.coords.latitude +
            "<br />经度: " + position.coords.longitude;
            console.log(thisPos);   //打印经纬度
        }
        // 获取位置失败
        function errorPosition(error){
             switch(error.code)
             {
                case error.PERMISSION_DENIED:
                console.log("用户拒绝获取地理位置请求.")
                break;

                case error.POSITION_UNAVAILABLE:
                console.log("网络信息不可用.")
                break;

                case error.TIMEOUT:
                console.log("请求地理位置超时.")
                break;

                case error.UNKNOWN_ERROR:
                console.log("未知错误.")
                break;
            }
        }
    }


    //综述页中经销商默认和距离最近tab切换
    tab('zsh_dealer_type','zsh_dealer_content','dealer_active','show','click');

    //车款配置页面固定菜单显示隐藏
    function showMenu(){
        $('.menu_show').on('click',function(){
            $(this).hide();
            $('.menu_close,.param_catalog').show();
        })
        $('.menu_close').on('click',function(){
            $(this).hide();
            $('.param_catalog').hide();
            $('.menu_show').show();
        })
    }
})
