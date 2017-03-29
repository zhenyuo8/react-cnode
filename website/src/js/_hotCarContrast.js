/*热门车型对比*/
$(".car_type_contrast dl dd span i").on("click",function(){
    var $checkedBox = $(this).parents("dl").find("dd");
    if($(this).hasClass('checked')){
        $(this).removeClass('checked');
    }else{
        $(this).addClass('checked');
    }
    if($checkedBox.find("i").hasClass('checked')){
        $(".start_contrast_btn span").addClass('display_n').siblings('a').removeClass('display_n');
    }else{
        $(".start_contrast_btn span").removeClass('display_n').siblings('a').addClass('display_n');
    }
})
