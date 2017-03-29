
/**
 * [favoriteMod description]收藏
 * @param  {[type]}   type     [0   收藏，1取消收藏]
 * @param  {[type]}   objectid   [数据id]
 * @param  {Function} favoritetype [收藏类型]
 * @return {[type]}            [description]
 */
require('./../_login_alert.js');
var userPath = "http://i.qichedaquan.com";
var path;
var collect = $('#collect');
var objectid = collect.attr("shareid");
var favoritetype = collect.attr("sharetype");
require('./../layer/layer');
$(function(){
    bindEvents();
});
function bindEvents(){
    isfavorite(objectid,favoritetype,function(response){});
    
    collect.click(function(){
        //判断是否登录
        if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
            if(window.login){
                login.getLoginHtml&&login.getLoginHtml();
            }
            
            return;
        }
        favoriteMod(objectid,favoritetype,function(data,type){
            if(type == 1 && data.code == 10000 && data.data == 1){
                  $("#collect").attr("op-data",0);
                collect.find('i').attr('class','icon-collect').end().find('span').text('收藏');
               
            }else{
                  $("#collect").attr("op-data",1);
                collect.find('i').attr('class','icon-collected').end().find('span').text('已收藏');
            }
        })
    })
};
//收藏或取消收藏
function favoriteMod(objectid,favoritetype,callback){
    
        var type = $("#collect").attr("op-data");

        if(type == 1){
            path = userPath + "/favorite/cancel?favoritetype="+favoritetype+"&objectid=" + objectid;
        }else{
            path = userPath + "/favorite/add?favoritetype="+favoritetype+"&objectid=" + objectid;
        }

        $.ajax({
            type: "get",
            url: path,
            dataType: "jsonp",
            cache: false,
            jsonp: 'callback',
            success: function (data) {
                callback&&callback(data,type);
            },
            error: function (msg) {
                layer.msg("操作出错，请稍后重新发送");
            }
        });
    
}

//判断是否被收藏

function isfavorite(objectid,favoritetype,cb){
    //判断是否登录
    if($.cookie('USER_SESSION') == null || $.cookie('USER_SESSION') == '' || $.cookie('USER_SESSION') == undefined){
        
        return;
    }

    path = userPath + "/favorite/isfavorite?favoritetype="+favoritetype+"&objectid=" + objectid;

    $.ajax({
        type: "get",
        url: path,
        dataType: "jsonp",
        cache: false,
        jsonp: 'callback',
        success: function (response) {
            if(response.code = 10000 && response.data == 1){
                $("#collect").attr("op-data",1);
                collect.find('i').attr('class','icon-collected').end().find('span').text('已收藏');
                   
            }else{
                $("#collect").attr("op-data",0);
                collect.find('i').attr('class','icon-collect').end().find('span').text('收藏');
            }
            cb&&cb(response);
        },
        error: function (msg) {
            layer.msg("操作出错，请稍后重新发送");
        }
    });
}
module.exports = {
    favoriteMod: favoriteMod,
    isfavorite: isfavorite
};
