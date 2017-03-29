(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function () {
    var idArr=new Array();
    Array.prototype.indexOf = function(el){
        for (var i=0,n=this.length; i<n; i++){
            if (this[i] === el){
                return i;
            }
        }
        return -1;
    }
    Array.prototype.del=function(n) {
        if(n<0)
            return this;
        else
            return this.slice(0,n).concat(this.slice(n+1,this.length));
    }

    function addCheckId(id) {
        var index=idArr.indexOf(id);
        if(index>=0){
            idArr=idArr.del(index)
        }
        idArr.push(id);
    }
    function delCheckId(id) {
        var index=idArr.indexOf(id);
        if(index>=0){
            idArr=idArr.del(index)
        }
    }
    function sendClear(type) {
        $.ajax({
            url:"/personal/msg/clear/"+type,
            type:"POST",
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    alert("清空失败!");
                }else {
                    window.location.reload();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }
    function sendDelete(id) {
        $.ajax({
            url:"/personal/msg/delete",
            type:"POST",
            data:{"ids":id},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    alert("删除失败!");
                }else {
                    window.location.reload();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }
    function sendDeleteIds(ids) {
        $.ajax({
            url:"/personal/msg/delete",
            type:"POST",
            data:{"ids":ids},
            dataType:"json",
            success:function (data) {
                if(data.errorCode!=10000){
                    alert("删除失败!");
                }else{
                    window.location.reload();
                }
            },
            error:function (XMLHttpRequest,textStatus,errorThrown) {
                alert("请求异常");
            }
        });
    }
    var setGrey=(function () {
        var flag=false;
        var js_account_tab_arr=$('#js_account_tab .tab');
        $.each(js_account_tab_arr,function (index,item) {
            if($(item).hasClass('count0')){
                $(item).children('a').css({'color':'#aaa','font-weight':"normal"});
            }
        });

        $('#js_account_tab .tab').on('click',function (e) {
            e=e||window.event;
            var  tar=e.target||e.srcElement;
            $(this).children('a').addClass('active');
            $(this).siblings().children('a').removeClass('active');
            if(tar.id=='comment_msg'){
                $('#clear_a').show();
                $('#clear_aa').hide();
            }else if(tar.id=='system_msg'){
                $('#clear_a').hide();
                $('#clear_aa').show();
            }

            $('.account_con .content_490').eq($(this).index()).show().siblings().hide();
        });

        $('.container').on('mouseover','em',function () {
            $(this).siblings('span').css('display','inline-block')
        })
        $('.container').on('mouseout','em',function () {
            $(this).siblings('span').css('display','none')
        });

//            消息红点点击消息
        $('#js_account_tab').on('click','#comment_msg, #system_msg',function () {
            $(this).children('em').css('display','none');
            $('#message_sys_a').children('em').hide();
        })

//            取消收藏模块确认模块弹出
        $('#js_content_490').on('click','em',function () {
            if(!flag){
                $(this).siblings('.cancel_confirm_delete').show();
                $(this).parent().siblings().children('.cancel_confirm_delete').hide();
                flag=true;
            }else{
                $(this).parent().siblings().children('.cancel_confirm_delete').hide();
                $(this).siblings('.cancel_confirm_delete').hide();
                flag=false;
            }
        })
    })();


    var selectButton=(function () {
        var flag;
        $('.img_container span').on('click',function () {
            var id=$(this).attr("data-id");
            if($(this).children('i').css('display')=='none'){
                $(this).parents('.container').addClass('select');
                addCheckId(id);
                $(this).children('i').css('display','inline-block')
            }else{
                delCheckId(id);
                $(this).parents('.container').removeClass('select');
                $(this).children('i').css('display','none')
            }

        });
        $('.message_sys').on('click',function () {
            $(this).find('em').hide();
        });
        $('#comment_msg').on('click',function () {
            $('#clear_a').show()
        })

//      删除所选

        $('#delete_a').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if (idArr.length>0){
                alertDiv({type:"1",des:"您确定要删除所选消息吗",fn:function () {
                    sendDeleteIds(idArr.toString());
                }});
            }else{
                alertDiv({type:"2",des:"您没有选中要删除的系统消息哦",time:"1000"});
                //alert("您没有选中要删除的系统消息哦");
            }
        });
        $()
        //清空所有
        $('#clear_a1').on('click',function () {
            alertDiv({type:"1",des:"您确定要清空所有消息吗",fn:function () {
                sendClear(1);//系统消息
            }});

        });
        $('#clear_a').on('click',function () {
            alertDiv({type:"1",des:"您确定要清空所有消息吗",fn:function () {
                sendClear(3);//问答消息
            }});
        });



        $('.xdel-button').on('click',function () {
            var id=$(this).attr("data-id");
            alertDiv({type:"1",des:"您确定要删除该消息吗",fn:function () {
                sendDelete(id);
            }});
        })

    })();

    //   判断消息是否存在
    var messageExist=(function () {
        var regMessage=/(\d+)/g;
        var n,m;
        var a=$('#system_msg').text();
        var b=$('.comment_msg #comment_msg').text();
        var curUrl=window.location.pathname;
        var reg=/^\/personal\/(\w+)/;
        curUrl.replace(reg,function () {
            if(arguments[1]=='personalMessage'){
                b.replace(regMessage,function () {
                    if(arguments[1]==0){
                        console.log('ok')
                        $('#delete_id').hide();
                        return m=arguments[1];
                    }
                });
            }
            if(arguments[1]=='personalSysMessage'){
                a.replace(regMessage,function () {
                    if(arguments[1]==0){
                        $('#delete_id').hide();
                        return n=arguments[1];
                    }
                });
            }
        })
    })();



});
},{}]},{},[1])