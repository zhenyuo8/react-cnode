(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function($){
    var ms = {
        init:function(obj,args){
            return (function(){
                ms.fillHtml(obj,args);
                ms.bindEvent(obj,args);
            })();
        },
        //填充html
        fillHtml:function(obj,args){
            return (function(){
                obj.empty();
                //上一页
                if(args.current > 1){
                    obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
                }else{
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                if(args.current != 1 && args.current > 4 && args.pageCount != 4){
                    obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
                }
                if(args.current-3 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                    obj.append('<a class="dian">...</a>');
                }
                var start = args.current -3,end = args.current+3;
                if((start > 1 && args.current < 3)||args.current == 1){
                    end++;
                }
                if(args.current > args.pageCount-3 && args.current >= args.pageCount){
                    start--;
                }
                for (;start <=end; start++) {
                    if(start <= args.pageCount && start >= 1){
                        if(start != args.current){
                            obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
                        }else{
                            obj.append('<span class="current">'+ start +'</span>');
                        }
                    }
                }
                if(args.current + 2 <args.pageCount-1 && args.current >= 1 && args.pageCount > 5){
                    obj.append('<a class="dian">...</a>');
                }
                if(args.current != args.pageCount && args.current < args.pageCount -3  && args.pageCount != 4){
                    obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
                }
                //下一页
                if(args.current < args.pageCount){
                    obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
                }else{
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                }
            })();
        },
        //绑定事件
        bindEvent:function(obj,args){
            return (function(){
                obj.on("click","a.tcdNumber",function(){
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click","a.prevPage",function(){
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current-1);
                    }
                });
                //下一页
                obj.on("click","a.nextPage",function(){
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current+1);
                    }
                });
            })();
        }
    }
    $.fn.createPage = function(options){
        var args = $.extend({
            pageCount : 100,
            current : 1,
            backFn : function(){}
        },options);
        ms.init(this,args);
    }
})(jQuery);
},{}]},{},[1])