/**
 * 配置 
 * http://172.16.0.102:11300/car/carlevel/configs/?serialId=2204
 */
$.fn.touches = function (options) {
        var setting = {
            init: null,//初始化
            touchstart: null,  //按下
            touchmove: null, //滑动
            touchend: null //抬起
        };
        options = $.extend(setting,options);
        var $this = this, touchesDiv = $this[0];
        if (!$this[0]) return;
        touchesDiv.addEventListener('touchstart', function (ev) {
            options.touchstart && options.touchstart.call($this, ev);
            function fnMove(ev) {
                options.touchmove && options.touchmove.call($this, ev);
            };


            function fnEnd(ev) {
                options.touchend && options.touchend.call($this, ev);
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            };
            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);
            return false;
        }, false)
        options.init && options.init.call($this);
    }

// var ajax = require('../util').ajax
// require('../components/iscroll')



function onScroll(){  
    var top = $(window).scrollTop() + $('.occupy_seat').height() + $('.pub_head').height() + 10
    var target = $('.param_table_head .title_box').filter(function(){
        var elTop = $(this).offset().top
        return elTop <= top
    })
    target = target.eq(target.length-1)
    var targetText = target.text()||"基本信息";
    $('.param_title .title').html(targetText)
}


var n,g

function setIScroll(){  
    var h = $("#wrapper-header");
    var k = $("#wrapper-body");
    function p(q) {
        if (h.site == "") {
            h.site = Math.abs(this.x - h.x) > Math.abs(this.y - h.y) ? "x": "y";
        }
        if (h.site == "x") {
            q.preventDefault();
            g.scrollTo(this.x, 0, 0, false);
        } else {
            this.disable();
        }
    }
    function i() {
        var q = this;
        clearInterval(q.interval);
        q.interval = setInterval(function() {
            g.scrollTo(q.x, 0, 0, false);
            if (q.ox == q.x) {
                clearInterval(q.interval);
            }
            q.ox = q.x;
        },
        30);
    }
    n = new iScroll(h[0], {
        hScroll: true,
        vScroll: false,
        mouseWheel: true,
        scrollbarClass: "nonebar",
        bounce: false,
        momentum: true,
        lockDirection: true,
        //userTransiton: true,
        onScrollMove: p,
        onTouchEnd: i,
        onBeforeScrollStart: function(q) {
            h.x = this.x;
            h.y = this.y;
        },
        onScrollStart: function() {
            h.site = "";
        }
    });
    h.touches({
        touchstart: function() {
            n.enable();
        },
        touchend: function() {
            n.enable();
        }
    });
    function f(q) {
        if (k.site == "") {
            k.site = Math.abs(this.x - k.x) > Math.abs(this.y - k.y) ? "x": "y";
        }
        if (k.site == "x") {
            q.preventDefault();
            n.scrollTo(this.x, 0, 0, false);
        } else {
            this.disable();
        }
    }
    function j() {
        var q = this;
        clearInterval(q.interval);
        q.interval = setInterval(function() {
            n.scrollTo(q.x, 0, 0, false);
            if (q.ox == q.x) {
                clearInterval(q.interval);
            }
            q.ox = q.x;
        },
        30);
    }
    g = new iScroll(k[0], {
        hScroll: true,
        vScroll: false,
        mouseWheel: true,
        scrollbarClass: "nonebar",
        momentum: true,
        bounce: false,
        lockDirection: true,
        //userTransiton: true,
        onScrollMove: f,
        onTouchEnd: j,
        onBeforeScrollStart: function(q) {
            k.x = this.x;
            k.y = this.y;
        },
        onScrollStart: function() {
            k.site = "";
        }
    });
    k.touches({
        touchstart: function() {
            g.enable();
        },
        touchend: function() {
            g.enable();
        }
    });
    
}


module.exports = {
    mounted: function(){
        setIScroll()
        $(window).on('scroll',onScroll)
    },
    destroyed: function(){
        if(n){
            n.destroy()
            g.destroy()
            n = g = null
        }
        $(window).off('scroll',onScroll)
    },
    refresh: function(){
        setTimeout(function(){
            n.refresh()
            g.refresh()
        },100)
    }
}