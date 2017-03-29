/**
 * Created by admin on 2017/2/14.
 */

//初始化数据

$(function(){
    template.helper("filterData", function(data){
        if(typeof data =='number'){
            return data
        }else if(data=="有"){
            return '<span class="bg_icon bp_icon"></span>'
        }else if(data=="选配"){
            return '<span class="bg_icon xp_icon"></span>'
        }else if(data=="无"){
            return '<span class="bg_icon null_icon"></span>'
        }else if(data=="待查"){
            return null
        }else{
            return data
        }
    });
    var html = template('car_compare_con_tpl', paradata);
    var floatTophtml = template('floatTop', paradata);
    document.getElementById('car_compare_con').innerHTML = html;
    document.getElementById('floatTop_box').innerHTML = floatTophtml;
    Array.prototype.unique = function()
    {
        var n = [];
        for(var i = 0; i < this.length; i++)
        {
            if (n.indexOf(this[i]) == -1) n.push(this[i]);
        }
        return n;
    };
    function showDiff(){
        $(".car_compare_con tr").not(".car_compare_con .first_tr").not(".car_compare_con .title_box").each(function(){
            var htmlArr=[]
            $(this).find("td").each(function(){
                htmlArr.push($(this).html())
            });
            if(htmlArr.unique().length<9 &&htmlArr.unique().length!=1 ){
                $(this).find('td').css('background','#d8eaff')
            }else if((htmlArr.unique().length==9)){
                $(this).find('td').css('background','#d8eaff')
            }
        })
    }
    function hideSame(flag){
        $(".car_compare_con tr").not(".car_compare_con .first_tr").not(".car_compare_con .title_box").each(function(){
            var htmlArr=[]
            $(this).find("td").each(function(){
                htmlArr.push($(this).html())
            });
            if( htmlArr.unique().length==1 && flag=='hide'){
                $(this).hide()
            }else if( htmlArr.unique().length==1 && flag=='show'){
                $(this).show()
            }
        })
    }
    function hideNullDataEle(flag){
        $(".car_compare_con tr").not(".car_compare_con .first_tr").not(".car_compare_con .title_box").each(function(){
            var htmlArr=[]
            $(this).find("td").each(function(){
                if($(this).html()==""){
                    htmlArr.push($(this).html())
                }
            });
            if( htmlArr.length==9 && flag=='hide'){
                $(this).hide()
            }else if( htmlArr.length==9 && flag=='show'){
                $(this).show()
            }
        })
    }
    //高亮显示不同项 隐藏相同参数 点击
    $(".div1").on("click",function(){
        if($('.div1').find('span').hasClass('active')){
            $('.div1').find('span').removeClass('active');
            $(".car_compare_con tr").not(".car_compare_con .first_tr").not(".car_compare_con .title_box").find("td").css('background','')
        }else{
            $('.div1').find('span').addClass('active')
            showDiff()
        }
    });
    $(".div2").on("click",function(){
        if($('.div2').find('span').hasClass('active')){
            $('.div2').find('span').removeClass('active');
            hideSame("show")
        }else{
            $('.div2').find('span').addClass('active');
            hideSame("hide")
        }
    });
    $(".div3").on("click",function(){
        if($('.div3').find('span').hasClass('active')){
            $('.div3').find('span').removeClass('active');
            hideNullDataEle("show")
        }else{
            $('.div3').find('span').addClass('active');
            hideNullDataEle("hide")
        }
    });
    //表头 初始化年款

})