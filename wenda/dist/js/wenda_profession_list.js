(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Zhangyx on 2015/10/15.
 */

;(function($){
    var Caroursel = function (caroursel){
        var self = this;
        this.caroursel = caroursel;
        this.posterList = caroursel.find(".poster-list");
        this.posterItems = caroursel.find(".poster-item");
        this.firstPosterItem = this.posterItems.first();
        this.lastPosterItem = this.posterItems.last();
        this.prevBtn = this.caroursel.find(".poster-prev-btn");
        this.nextBtn = this.caroursel.find(".poster-next-btn");

        this.setting = {
            "width":"1000",
            "height":"270",
            "posterWidth":"640",
            "posterHeight":"270",
            "dealy":"1000"
        }

        $.extend(this.setting,this.getSetting())

        this.setFirstPosition();

        this.setSlicePosition();

        this.rotateFlag = true;
        this.prevBtn.bind("click",function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.rotateAnimate("left")
            }
        });
        this.nextBtn.bind("click",function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.rotateAnimate("right")
            }
        });
        if(this.setting.isAutoplay){
            // this.autoPlay();
            // this.caroursel.hover(function(){clearInterval(self.timer)},function(){self.autoPlay()})
        }
    };
    Caroursel.prototype = {
        // autoPlay:function(){
        //   var that = this;
        //   this.timer =  window.setInterval(function(){
        //       that.prevBtn.click();
        //   },that.setting.dealy)
        // },
        rotateAnimate:function(type){
            var that = this;
            var zIndexArr = [];
            if(type == "left"){
                this.posterItems.each(function(){
                   var self = $(this),
                    prev = $(this).next().get(0)?$(this).next():that.firstPosterItem,
                    width = prev.css("width"),
                    height = prev.css("height"),
                    zIndex = prev.css("zIndex"),
                    left = prev.css("left"),
                    top = prev.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        "width":width,
                        "height":height,
                        "left":left,
                        "top":top,
                    },that.setting.speed,function(){
                        that.rotateFlag = true;
                    });
                });
                this.posterItems.each(function(i){
                    $(this).css("zIndex",zIndexArr[i]);
                });
            }
            if(type == "right"){
                this.posterItems.each(function(){
                    var self = $(this),
                    next = $(this).prev().get(0)?$(this).prev():that.lastPosterItem,
                        width = next.css("width"),
                        height = next.css("height"),
                        zIndex = next.css("zIndex"),
                        left = next.css("left"),
                        top = next.css("top");
                        zIndexArr.push(zIndex);
                    self.animate({
                        "width":width,
                        "height":height,
                        "left":left,
                        "top":top,
                    },that.setting.speed,function(){
                        that.rotateFlag = true;
                    });
                });
                this.posterItems.each(function(i){
                    $(this).css("zIndex",zIndexArr[i]);
                });
            }
        },
        setFirstPosition:function(){
            this.caroursel.css({"width":this.setting.width,"height":this.setting.height});
            this.posterList.css({"width":this.setting.width,"height":this.setting.height});
            var width = (this.setting.width - this.setting.posterWidth) / 2;

            this.prevBtn.css({"zIndex":Math.ceil(this.posterItems.size()/2)});
            this.nextBtn.css({"zIndex":Math.ceil(this.posterItems.size()/2)});
            this.firstPosterItem.css({
                "width":this.setting.posterWidth,
                "height":this.setting.posterHeight,
                "left":"0px",
	            // "left":width,
                "zIndex":Math.ceil(this.posterItems.size()/2),
                "top":this.setVertialType(this.setting.posterHeight)
            });
        },
        setSlicePosition:function(){
            var _self = this;
            var sliceItems = this.posterItems.slice(1),
                level = Math.floor(this.posterItems.length/2),
                leftItems = sliceItems.slice(0,level),
                rightItems = sliceItems.slice(level),
                posterWidth = this.setting.posterWidth,
                posterHeight = this.setting.posterHeight,
                Btnwidth = (this.setting.width - this.setting.posterWidth) / 2,
                gap = 360,
	            // gap = Btnwidth/level,
                containerWidth = this.setting.width;

            var i = 1;
            var leftWidth = posterWidth;
            var leftHeight = posterHeight;
            var zLoop1 = level;
            leftItems.each(function(index,item){
                leftWidth = posterWidth;
                leftHeight = posterHeight;
                $(this).css({
                    "width":leftWidth,
                    "height":leftHeight,
                    // "left": (720+(360*i))+"px",
	                "left": i*gap,
	                // "left": Btnwidth + i*gap,
                    "zIndex":zLoop1--,
                    "top":_self.setVertialType(leftHeight),

                });
                i++;
            });

            var j = level;
            var zLoop2 = 1;
            var rightWidth = posterWidth;
            var rightHeight = posterHeight;
            rightItems.each(function(index,item){
                // var rightWidth = posterWidth * _self.setting.scale;
                // var rightHeight = posterHeight*_self.setting.scale;
                $(this).css({
                    "width":posterWidth,
                    "height":posterHeight,
	                "left": containerWidth -( Btnwidth - j*gap + rightWidth),
                    "zIndex":zLoop2++,
                    "top":_self.setVertialType(rightHeight)
                });
                j--;
            });
        },
        getSetting:function(){
            var settting = this.caroursel.attr("data-setting");
            if(settting.length > 0){
                return $.parseJSON(settting);
            }else{
                return {};
            }
        },
        setVertialType:function(height){
            var algin = this.setting.algin;
            if(algin == "top") {
                return 0
            }else if(algin == "middle"){
                return (this.setting.posterHeight - height) / 2
            }else if(algin == "bottom"){
                return this.setting.posterHeight - height
            }else {
                return (this.setting.posterHeight - height) / 2
            }
        }
    }
    Caroursel.init = function (caroursels){
        caroursels.each(function(index,item){
            new Caroursel($(this));
        })  ;
    };
    window["Caroursel"] = Caroursel;

    $(".poster-next-btn").click(function () {
	    var li = $(".poster-list li");
	    for(var i=0;i<li.length;i++){
	        if($(li[i]).css("left")=="720px"){
		        $(li[i]).attr("class","optical poster-item").siblings(li).attr("class","poster-item");
            }
        }
	    if($(".dot .dot_active").attr("alt")=="6"){
		    $(".dot p:nth-child(1)").attr("class","dot_active").siblings(".dot_active").attr("class","");
        }else{
		    $(".dot .dot_active").next().attr("class","dot_active").siblings(".dot_active").attr("class","");
        }


    })
	$(".poster-prev-btn").click(function () {
		var li = $(".poster-list li");
		// console.log(li)
		for(var i=0;i<li.length;i++){
			if($(li[i]).css("left")=="0px"){
				$(li[i]).attr("class","optical poster-item").siblings(li).attr("class","poster-item");
			}
		}
		if($(".dot .dot_active").attr("alt")=="1"){
		    $(".dot p:nth-child(6)").attr("class","dot_active").siblings(".dot_active").attr("class","");
        }else{
			$(".dot .dot_active").prev().attr("class","dot_active").siblings(".dot_active").attr("class","");
        }

	});
    var list = $(".poster-list li");
    for(var j=0;j<list.length;j++){
        if($(list[j]).attr("class").indexOf("optical")>-1){
	        $(".dot").append("<p class='dot_active'alt='"+(j+1)+"'></p>")
        }else{
	        $(".dot").append("<p alt='"+(j+1)+"'></p>")
        }

    }
})(jQuery)
},{}]},{},[1])