/**
 * title: xxx（车型名称）配置参数
 * share: {
 *  title:【汽车大全】 奥迪A4L 配置参数
 *  desc: 查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo:【汽车大全】 奥迪A4L 配置参数 分享自@汽车大全
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

var ajax = require('../util').ajax
require('../components/iscroll')


function onScroll(){  
    var top = $(window).scrollTop() + $('.occupy_seat').height()+4
    var target = $('.param_table_head .title_box').filter(function(){
        var elTop = $(this).offset().top
        return elTop <= top
    })
    target = target.eq(target.length-1)
    $('.param_title .title').html(target.text())
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
    template: __inline('../templates/config.html'),
    data: function(){
        return {  
            serialId: this.$route.query.serialId,
            cars: [],
            isCateVisible: false,
            isSameVisible: true
        } 
    },
    methods: {
        getData: function(){
            var self = this
            ajax({  
                url: '/car/carlevel/configs/',
                data: {
                    serialId: this.serialId,
                    salestate: 1
                },
                success: function(res){    
                    var result = []
                    res.data.forEach(function(el){
                        result.push(el.param)
                    })
                    self.cars = result
                }
            })  

            //分享
            ajax({  
                url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                success: function(res){    
                    VueGlobal.setDocTitle(res.data.serialName+' 配置参数')
                    VueGlobal.setShareConfig({
                        title: '【汽车大全】'+ res.data.serialName +' 配置参数',
                        desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                        imgUrl: res.data.imgUrl
                    })
                }
            })    
        },
        removeCar: function(index){
            this.cars.splice(index,1)
        },
        filterCarParam: function(val){
            if(val === undefined || val === '' || val == '无'){  
                return '<i class="icon_none">—</i>'
            }else{  
                if(val == '有'){
                    return '<i class="icon_has"></i>'
                }
                if(val == '选配'){    
                    return '<i class="icon_choose"></i>'
                }
                return val
            }
        },
        isSame: function(name){
            var data = JSON.parse(JSON.stringify(this.cars))
            if(!data.length || !data[0][name]){return 'none'}
            var val = data[0][name] 
            for(var i=1;i<data.length;i++){ 
                var next = data[i][name]   
                if(val != next){    
                    return 'not_same'
                }
            }
            return 'same'
        },
        goToPos: function(index){
            var target = $('#p_'+index)
            var top = target.offset().top 
            if($('.param_type_list').css('position') == 'absolute'){
                top = top -  $('.page-header').height()
            }else{
               top = top -  $('.occupy_seat').height()
            }
            $('html,body').scrollTop(top)
        },
        toggleSame: function(){
            this.isSameVisible = !this.isSameVisible
            var visible = this.isSameVisible
            $('.param_table_cont tr').each(function(i,el){
                if($(el).hasClass('same')){ 
                    $(el).toggle(visible)
                    $('.param_table_head tr').eq(i).toggle(visible)
                }
            })
        }
    },
    watch: {    
        cars: function(){
            this.$nextTick(function(){
                n.refresh()
                g.refresh()
            })
        }
    },
    created: function(){
        this.getData()
    },
    mounted: function(){
        setIScroll()
        $(window).on('scroll',onScroll)
        /*$('body').on('touchmove',function(e){
            e.preventDefault()
        })*/
    },
    destroyed: function(){
        if(n){
            n.destroy()
            g.destroy()
            n = g = null
        }
        $(window).off('scroll',onScroll)
    }
}