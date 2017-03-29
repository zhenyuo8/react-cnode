/**
 * @param opt参数可配置
 * @constructor 指向Banner这个类
 * @use,将需要轮播区域添加id,new Banner({id:'#box'})即可
 */

function Banner(opt) {
    opt=opt||{};
    this.$box=$(opt.id);
    this.$swiperWrapper=this.$box.find('.swiper-wrapper');
    this.$btnLeft=this.$box.find('.left');
    this.$btnRight=this.$box.find('.right');
    this.timer=null;
    this.n=null;
    this.init();
}
Banner.prototype={
    constructor:Banner,
    init:function () {
        var that=this;
        //对轮播区域实现无痕轮播初始化轮播的length（将轮播的第一个内容复制一份插入到容器的末尾）
        this.initial();
        //开启定时器自动渐隐渐现轮播与焦点自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            that.autoMove();
        },7000);
        //鼠标移入移出效果
        this.overOut();
        //点击焦点切换渐隐渐现
        this.handleChange();
        //点击按钮切换
        this.leftRight();
    },
    initial:function () {
        var clone=this.$swiperWrapper.find('.swiper-slide').first().clone();
        this.$swiperWrapper.append(clone);
        var size=this.$swiperWrapper.find('.swiper-slide').length;
    },
    //自动轮播
    autoMove:function () {
        this.$swiperSlide=this.$swiperWrapper.find('.swiper-slide');
        if(this.n>=this.$swiperSlide.length-1){
            this.$swiperWrapper.css({left:0});
            this.n=0;
        }
        this.n++;
        this.$swiperWrapper.stop().animate({left:-this.n*990},800);
        this.bannerTip()
    },
    //焦点自动轮播根据n和index来改变其class类名
    bannerTip:function () {
        var that=this;
        this.$span=this.$box.find('.banner_tip span');
        var tmpNum=this.n>=this.$span.length?0:this.n;
        $.each(this.$span,function(index,item) {
            item.className=index==tmpNum?'icon-bannerBigTipBlue_03':'icon-bannerTipDefault_03';
        })
    },
    overOut:function () {
        var that=this;
        this.$swiperWrapper.mouseover(function () {
            clearInterval(that.timer);
            that.$btnLeft.show();
            that.$btnRight.show()
        });
        this.$swiperWrapper.mouseout(function () {
            that.timer=setInterval(function () {
                that.autoMove()
            },7000);
            that.$btnLeft.hide();
            that.$btnRight.hide()
        })
        this.$btnLeft.mouseover(function () {
            that.$btnLeft.show();
            that.$btnRight.show()
        });
        this.$btnLeft.mouseout(function () {
            that.$btnLeft.hide();
            that.$btnRight.hide()
        })
        this.$btnRight.mouseover(function () {
            that.$btnLeft.show();
            that.$btnRight.show()
        });
        this.$btnRight.mouseout(function () {
            that.$btnLeft.hide();
            that.$btnRight.hide()
        })
    },
    handleChange:function () {
        var that=this;
        this.$span=this.$box.find('.banner_tip span');
        $.each(this.$span,function (index,item) {
            $(item).mouseover(function () {
                clearInterval(that.timer);
            });
            $(item).click(function () {
                that.n=index;
                that.$swiperWrapper.stop().animate({left:-that.n*990},800);
                that.bannerTip();
            })
            $(item).mouseout(function () {
                that.timer=setInterval(function () {
                    that.autoMove()
                },7000);
            })
        })
    },
    leftRight:function () {
        var that=this;
        this.$swiperSlide=this.$swiperWrapper.find('.swiper-slide');
        this.$btnRight.click(function () {
            that.autoMove()
        });

        this.$btnLeft.click(function () {
            if(that.n<=0){
                that.n=that.$swiperSlide.length-1;
                that.$swiperWrapper.css({left:-that.n*990});
            }
            that.n--;
            that.$swiperWrapper.stop().animate({left:-that.n*990},800);
            that.bannerTip();
        })
    }
};
