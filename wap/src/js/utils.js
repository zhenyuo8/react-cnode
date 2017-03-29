var utils = {   
    scrollNav: function(){  

    },
    //回到顶部
    goTop: function(){
        var windowHeight = $(window).height();
        $(window).scroll(function(){
            if($(window).scrollTop()>windowHeight){
                $("#goTop").show();
            }else{
                $("#goTop").hide();
            }
        })
        $("#goTop").on("click",function(){
            $("html,body").animate({scrollTop:0}, 500);
            return false;
        })
    }
}