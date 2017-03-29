(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*****
 *@author: jianingning
 *@from: Global js carModelIntroduce
 *@date: name (2017.01.24)
*/




(function($){
    var ms = {
        init:function(obj,args){
            ms.fillHtml(obj,args);
            ms.bindEvent(obj,args);
            return {    
                goPage: function(page){ 
                    args.current = page
                    ms.fillHtml(obj,args);
                    if(typeof(args.backFn)=="function"){
                        args.backFn(page);
                    }
                }
            }
        },

        fillHtml:function(obj,args){
            return (function(){
                obj.empty();

                if(args.current > 1){
                    obj.append('<a href="javascript:;" class="prevPage" style="display:inline-block;">上一页</a>');
                }else{
                    obj.remove('.prevPage');
                    // obj.append('<a href="javascript:;" class="disabled">上一页</a>');
                }
                if(args.current != 1 && args.current >= 3 && args.pageCount != 3){
                    obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
                }
                if(args.current-2 > 1 && args.current <= args.pageCount && args.pageCount > 4){
                    obj.append('<a class="dian">...</a>');
                }
                var start = args.current -1,end = args.current+1;
                if((start > 1 && args.current < 1)||args.current == 1){
                    end++;
                }
                if(args.current > args.pageCount-3 && args.current >= args.pageCount){
                    start--;
                }

                for (;start <= end; start++) {
                    if(start <= args.pageCount && start >= 1){
                        if(start != args.current){
                            obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
                        }else{
                            obj.append('<span class="current">'+ start +'</span>');
                        }
                    }
                }
                if(args.current + 1 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 2){
                    obj.append('<a class="dian">...</a>');
                }
                if(args.current != args.pageCount && args.current < args.pageCount -1  && args.pageCount != 4){
                    obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
                }

                if(args.current <args.pageCount){
                    obj.append('<a href="javascript:;" class="nextPage" style="display:inline-block;">下一页</a>');
                }else{
                    obj.remove('.nextPage');
                    // obj.append('<a href="javascript:;"class="disabled">下一页</a>');
                }
            })();
        },
        bindEvent:function(obj,args){
            return (function(){
                obj.on("click","a.tcdNumber",function(){
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });

                obj.on("click","a.prevPage",function(){
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current-1);
                    }
                });

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
        if(!$(this).data('pager')){  
            var args = $.extend({
                pageCount : 10,
                current : 1,
                backFn : function(){}
            },options);
            var api = ms.init(this,args);
            $(this).data('pager',api)
        }
    }
})(jQuery);


},{}]},{},[1])