(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
    var msgPageNo=1;
    var sysPageNo=1;

    getData(3,msgPageNo);//第一页加载数据
    getData(1,sysPageNo);//系统消息
    /**
     * 请求数据
     * @param type
     * @param pageNo
     */
    function getData(type,pageNo) {
        $.ajax({
            url:"/personal/queryMessage/"+type,
            data:{"type":type,"pageNo":pageNo},
            dataType:"JSON",
            success:function (data) {
                if (1==type){
                    createSysHtml(data);
                }
                if (3==type){
                    createMsgHtml(data);
                }
            },
            error:function(xmlHttpRequest){
                $('.loading').hide();
                if (xmlHttpRequest.status != 200) {
                    alert("数据加载异常,请刷新重试"+xmlHttpRequest.status);
                }
            }
        });
    }

    /**
     * 构建 问答消息html
     * @param data
     */
    function createMsgHtml(data) {
        if( data.totalCount==0){
            $("#wenda-box .load_more_module").hide();
            $("#wenda_id .no_content_container").show();
        }else {
            $("#wenda_id .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#wenda-box .load_more_module").show();
                $("#wenda-box .load_more").show();
                $("#wenda-box .loading").hide();
                $("#wenda-box .no_more").hide();
                msgPageNo=data.pageNo+1;
            }else{
                $("#wenda-box .load_more_module").show();
                $("#wenda-box .loading").hide();
                $("#wenda-box .load_more").hide();
                $("#wenda-box .no_more").show().css("display","block");
                if(data.pageNo==1){
                    $("#wenda-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){
                html+='<div class="wenda_msg clearfix" data-id="'+list[i].id+'">';
                html+='<p class="img"><a href="#"><img src="http://static.qcdqcdn.com/wap/img/icon_wenda.png" alt=""></a></p>';
                html+='<div class="right">';
                html+='<p class="title">汽车大全管家</p>';
                html+='<p class="des"><a href="http://ask.m.qichedaquan.com/answer?question_id='+list[i].content.question_key+'">'+list[i].content.content+'</a></p>';
                html+='<p class="other"><span class="time">'+list[i].createdTime+'</span></p>';//<span class="delete">删除</span></p>
                html+='</div>';
                html+='</div>';

            }
            $("#msgContent").append(html);
        }
        $(".swiper-wrapper").height($("#wenda-box").height());
    }

    /**
     * 构建 系统消息Html
     * @param data
     */
    function createSysHtml(data) {
        if( data.totalCount==0){
            $("#sys-box .load_more_module").hide();
            $("#sys_id .no_content_container").show();
        }else {
            $("#sys_id .no_content_container").hide();
            if(data.pageNo<data.totalPage){
                $("#sys-box .load_more_module").show();
                $("#sys-box .load_more").show();
                $("#sys-box .loading").hide();
                $("#sys-box .no_more").hide();
                sysPageNo=data.pageNo+1;
            }else{
                $("#sys-box .load_more_module").show();
                $("#sys-box .load_more").hide();
                $("#sys-box .loading").hide();
                $("#sys-box .no_more").show().css("display","block");
                if(data.pageNo==1){
                    $("#sys-box .load_more_module").hide();
                }
            }
            var html="";
            var list=data.list;
            for(var i=0;i<list.length;i++){
                html+='<div class="wenda_msg clearfix" data-id="'+list[i].id+'">';
                html+='<p class="img"><a href="#"><img src="http://static.qcdqcdn.com/wap/img/icon_wenda.png" alt=""></a></p>';
                html+='<div class="right">';
                html+='<p class="title">汽车大全管家</p>';
                html+='<p class="des">'+list[i].content+'</p>';
                html+='<p class="other"><span class="time">'+list[i].createdTime+'</span><span class="delete">删除</span></p>';
                html+='</div>';
                html+='</div>';
            }
            $("#sysContent").append(html);
        }
        if (sysPageNo>2){//翻页的时候 需要，第一次进入页面时候不需要
            $(".swiper-wrapper").height($("#sys-box").height());
        }
    }

    /**
     * 删除消息
     * @param id
     */
    function onDelete(id) {
        $.ajax({
            url:"/personal/msg/delete",
            data:{"ids":id},
            type:"POST",
            dataType:"JSON",
            success:function (data) {
                if (data.errorCode!=10000){
                    alert(data.resultMsg);
                }
            }
        });
    }

    /**
     * 系统消息加载更多
     */
    $("#sys-box .load_more").click(function () {
        $("#sys-box .load_more").hide();
        $("#sys-box .loading").show().css("display","block");
        getData(1,sysPageNo);
    });
    /**
     * 问答消息加载更多
     */
    $("#wenda-box .load_more").click(function () {
        $("#wenda-box .load_more").hide();
        $("#wenda-box .loading").show().css("display","block");
        getData(3,msgPageNo);
    });

    var deleteMessage=(function(){
        var parentsIndex,currentId1;

        //删除数据
        $('#sys_id').delegate('.delete','click',function(){
            $('.mask').show();
            currentId1='sys_id';
            $('.confirm_delete').show();
            parentsIndex=$(this).parents('.wenda_msg').index();
        })

        $('#cancel').on('click',function(){
            $('.mask').hide();
            $('.confirm_delete').hide();
        })
        //内容为空时显示提示
        $('.wenda').each(function(){
            if($(this).find('.wenda_msg').length<=0){
                $(this).find('.no_content_container').show();
                $(this).next().hide();
            }else{
                $(this).find('.no_content_container').hide();
                $(this).next().show();
            }
        })
        $('#confirm').on('click',function(){
            // 先隐藏遮罩层和弹框
            $('.mask').hide();
            $('.confirm_delete').hide();
            var count=$("#sys_count").attr("data-count");
            var id=$('#sys_id .wenda_msg').eq(parentsIndex).attr("data-id");
            //删除对应的DOM节点
            if($('#sys_id .wenda_msg').length==1){
                $('#sys_id .wenda_msg').eq(parentsIndex).remove()
                $(' #sys_id .no_content_container').show()
                if(currentId1=='sys_id'){
                    onDelete(id);
                    count--;
                    currentId1='';
                }
            }else{
                $('#sys_id .wenda_msg').eq(parentsIndex).remove()
                if(currentId1=='sys_id'){
                    onDelete(id);
                    count--;
                    currentId1='';
                }
            }
            $(".swiper-wrapper").height($("#wenda-box").height());
            $('#sys_count').text("("+count+")");
            $("#sys_count").attr("data-count",count);
        })
    })()


    var deleteMessage=(function(){
        var parentsIndex,currentId;

        $('#wenda_id').delegate('.delete','click',function(){
            currentId='wenda_id'
            $('.mask').show();
            $('.confirm_delete').show();
            parentsIndex=$(this).parents('.wenda_msg').index();
        })

        $('#cancel').on('click',function(){
            $('.mask').hide();
            $('.confirm_delete').hide();
        })
        $('#confirm').on('click',function(){
            // 先隐藏遮罩层和弹框
            $('.mask').hide();
            $('.confirm_delete').hide();
            var count=$("#wenda_count").attr("data-count");
            var id=$('#wenda_id .wenda_msg').eq(parentsIndex).attr("data-id");
            //删除对应的DOM节点
            if($('#wenda_id .wenda_msg').length==1){
                $('#wenda_id .wenda_msg').eq(parentsIndex).remove()
                $(' #wenda_id .no_content_container').show()
                if(currentId=='wenda_id'){
                    onDelete(id);
                    count--;
                    currentId='';
                }
            }else{
                $('#wenda_id .wenda_msg').eq(parentsIndex).remove()
                if(currentId=='wenda_id'){
                    onDelete(id);
                    count--;
                    currentId='';
                }
            }
            $(".swiper-wrapper").height($("#sys-box").height());
            $('#wenda_count').text("("+count+")");
            $("#wenda_count").attr("data-count",count);

        })


    })()

})

},{}]},{},[1])