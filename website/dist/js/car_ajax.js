/*****
 *@author: jianingning
 *@from: Global js carArticle
 *@date: name (2017.01.24)
*/

$(document).ready(function(){
    var signs=1;
    $('.more_button').click(function(){
        var isload=$(this).attr("isload");
        var _this=this;
        if(isload=="true"){
            $(this).attr("isload","false");
            signs++;
            $(this).val('正在加载……');
            setTimeout(function(){
                $.ajax({
                    type:'get',
                    url:'data/carArticle.json?page='+signs,
                    async:true,
                    success:function(data){
                        $(_this).attr("isload","true");
                        var con=data.articleCon;
                        var num=data.num;
                        if(num=="1"){
                            for(i=0;i<con.length;i++){
                                var mainCon='<li>'+
                                        '<a href="javascript:void(0);">'+
                                        '<dl class="clearfix">'+
                                        '<dt class="fl">'+
                                        '<img src="'+con[i].articleImg+'" />'+
                                        '</dt>'+
                                        '<dd class="fr">'+
                                        '<h1>'+con[i].articleTit+
                                        '</h1>'+
                                        '<p class="news-text">'+con[i].articleText+
                                        '</p>'+
                                        '<p class="reading-messages">'+
                                        '<span class="car_a_time">'+con[i].articleTime+
                                        '</span>'+
                                        '<span class="car_a_read">阅读<i>（'+con[i].articleRead
                                        '）</i></span>'+
                                        '<span car_a_message>留言<i>('+con[i].articleMessage
                                        ')</i></span>'+
                                        '</p>'+
                                        '</dd>'+
                                        '</dl>'+
                                        '</a>'+
                                        '</li>';
                                $('.car_a_list').append(mainCon);
                                $('.more_button').val('加载更多');
                            } 
                            $(_this).attr("isload","true"); 
                        }else if (num == "0"){
                            $('.more_button').val('没有更多了');
                        }    
                    }
                })
            },2000)
        }else{
            return;
        }    
    })
})