(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/17.
 */
$(document).ready(function () {

    function checkNickName(name) {
        var userKey=$("#userKey").val();
        var userSource=$("#userSource").val();
        var callback=$("#callback").attr("href");
        $.ajax({
            url:"/user/checkNickName",
            data:{"nickName":name},
            type:"POST",
            dataType:"json",
            success:function (data) {
                if(data.errorCode==10000){
                    buidPost("/user/submit/"+userSource+"/"+userKey,{"nickName":name,"callback":callback},"_self");
                }else if(data.errorCode==41018){
                    $('#input_username input').val("");
                    alert("昵称存在特殊或敏感字符")
                }else{
                    bindHtml(name);
                    $('#error_notice').show();
                }
            }
        });
    }

    function buidPost(url, params, target){
        var tempform = document.createElement("form");
        tempform.action = url;
        tempform.method = "post";
        tempform.style.display="none"
        if(target) {
            tempform.target = target;
        }

        for (var x in params) {
            var opt = document.createElement("input");
            opt.name = x;
            opt.value = params[x];
            tempform.appendChild(opt);
        }

        var opt = document.createElement("input");
        opt.type = "submit";
        tempform.appendChild(opt);
        document.body.appendChild(tempform);
        tempform.submit();
        document.body.removeChild(tempform);
    }
    function bindHtml(name) {
        var str = '';
        for (var i = 0; i < 5; i++) {
            str += (i == 0) ? '<li class="bg">' + (name+""+Math.round(Math.random()*1000)) + '</li>' : '<li>' + (name+""+Math.round(Math.random()*100)) + '</li>';
        }
        if(str){
            $('.repeat_name_list').html(str)
        }
    }
    var nameRepeat=(function () {
        var name=$("#input_username input").val();

        $('#save_settings').on('click',function () {
            var input_name=$('#input_username input').val();
            if(!input_name){
                alert('请输入您的用户名~')
            }else{
                checkNickName(input_name);
            }
        })

        $('.repeat_name_list').on('mouseover','li',function () {
            $(this).addClass('bg').siblings().removeClass('bg')
        })
        $('.repeat_name_list').on('click','li',function () {
            $('#input_username input').css('border','1px solid #dadada');
            $('#input_username input').val( $(this).text());
            $('#error_notice').css('display','none');

        })

        $("#input_username input").focus(function () {
            $('#error_notice').hide();
        });
    })()
});
},{}]},{},[1])