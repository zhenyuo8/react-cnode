/**
 * title: 选车
 * share {
 *  title: 从车盲到专家，用汽车大全就够了！
 *  desc: 买车无忧，用车不愁，快用【汽车大全】，你喜欢的车子都在这儿！
 * }
 * weibo: 从车盲到专家，用@汽车大全 就够了！
 * 
 * 品牌选车(首页)
 */
var util = require('../util')
var service = require('../service')
var ajax = util.ajax
var filterDataByLetter = util.filterDataByLetter

//广告Id
var adIds = [   
    'bc5ebd74-0d06-49b9-9387-aeae981f7f17',
    '495aa402-b164-413b-b302-d60814ef529b',
    '28481596-e9ea-49bb-a203-f06db66ef7ee'
]

function letterFixed(){
    var brandlistPosition = $(".brand_type").position().top - 10;
    if($(window).scrollTop() >= brandlistPosition){
        $(".letter_list").addClass('letter_list_fix');
    }else{
        $(".letter_list").removeClass('letter_list_fix');
    }
}

function scrollToPos(letter){ 
    if(letter){
        var el = $('#letter-' + letter)
        if(letterHideTimer){    
            clearTimeout(letterHideTimer)
        }
        $('html,body').scrollTop(el.offset().top)
        $('.letter_alert').show()
        letterHideTimer = setTimeout(function(){    
            $('.letter_alert').hide()
        },500)
    }else{
        $('html,body').scrollTop(0)
    }
}

var letterHideTimer

module.exports = {  
    template: __inline('../templates/carmaster.html'),
    data: function(){   
        return {
            hotmaster: [],
            hotserials: [],
            masterlist: [],
            letters: [],
            currentMaster: {},
            currentLetter: '',
            carSerialTotal: 0,
            adFocus: [],
            adBrand: [],
            adCars: [],
            swiperOption: {
                 autoplay: 3000
            }
        }
    },
    computed: {
        swiper: function() {
            return this.$refs.focusSwiper.swiper
        }
    },
    methods: {
        showSerial: function(master){ 
            VueGlobal.mask = true
            $(".mask_area").show();
            $(".right_module").animate({right:"0"}, 500);
            var self = this
            ajax({    
                url: '/car/carmaster/seriallist/' + master.id,
                data: {
                    salestate: 1
                },
                success: function(res){    
                    $.each(res.data.brandList,function(i,row){
                        row.carSerialList = row.carSerialList.filter(function(el){
                            return el.salestate === 1
                        })
                    })
                    self.currentMaster = $.extend(true,res.data,master)
                }
            })
        },
        closeSerial: function(){   
            VueGlobal.mask = false
            $('.mask_area').fadeOut(300)
            $(".right_module").animate({right:"-100%"}, 500);
        },
        scrollToPos: function(letter){
            if(letter){
                this.currentLetter = letter
            }
            scrollToPos(letter)
        },
        moveToPos: function(event){
            var top = $('.letter_list').offset().top
            var height = $('.letter_list li:eq(0)').height()
            var len = $('.letter_list li').length
            var y = event.targetTouches[0].pageY
            var pos = Math.round((y - top)/height) - 1
            
            if(pos >= 0 && pos <= len){
                var el = $('.letter_list li:eq('+ pos +') a')[0]
                if(el){ 
                    var letter = el.innerHTML
                    if(letter == '#'){ //↑
                        scrollToPos()
                    }else{
                        this.currentLetter = letter
                        scrollToPos(letter)
                    }
                }
            }
        }
    },
    created: function(){
        VueGlobal.setDocTitle('选车')
        VueGlobal.setShareConfig({  
            title: '从车盲到专家，用汽车大全就够了！',
            desc: '买车无忧，用车不愁，快用【汽车大全】，你喜欢的车子都在这儿！'
        })
        var self = this
        //主品牌列表
        ajax({    
            url: '/car/carmaster/masterlist',
            data: {
                salestate: 1
            },
            success: function(res){ 
                var result = filterDataByLetter(res.data) 
                self.masterlist = result.list
                self.letters = result.letters
            }
        })
        //广告
        service.getAds({ids:adIds[0]},function(res){
            self.adFocus = res
        })
        service.getAds({ids:adIds[1]},function(res){
            self.adBrand = res
        })
        service.getAds({ids:adIds[2]},function(res){
            self.adCars = res
        })
        //热门品牌
        /*
        ajax({  
            url: '/car/carmaster/hotmaster',
            success: function(res){
                self.hotmaster = res.data.slice(0,5)
            }
        })*/
        //热门车型
        /*
        ajax({  
            url: '/car/serial/getHotlCarSerials',
            data: {
                num: 10
            },
            success: function(res){    
                self.hotserials = res.data
            }
        })*/
        //车型款数
        ajax({  
            url: '/car/serial/selectCars',
            success: function(res){    
                self.carSerialTotal = res.data.SerialCount
            }
        })
        $(window).on('scroll',letterFixed)
    },
    mounted: function(){
        var self = this
        $(window).on('resize',function(){
            setTimeout(function(){
                if(self.swiper){
                    self.swiper.update(true)
                }
            },300)
        })
    },
    destroyed: function(){  
        $(window).off('scroll',letterFixed)
    }
}