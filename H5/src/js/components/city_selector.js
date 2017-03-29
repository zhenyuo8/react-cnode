/**
 * 城市选择
 */

var util = require('../util')
var ajax = util.ajax
var filterDataByLetter = util.filterDataByLetter

//数据缓存
var cache = []
var plcCache = [
    {cityid: '201', cityname: '北京'},
    {cityid: '2601', cityname: '天津'},
    {cityid: '2401', cityname: '上海'},
    {cityid: '3101', cityname: '重庆'}
]

function inPLC(id){   
    return id == '2' || id == '2' || id == '24' || id == '31'
}


module.exports = {  
    template: __inline('../templates/city_selector.html'),
    props: ['initcity'],
    data: function(){   
        return {    
            data: cache,
            plcData: plcCache,
            currentProvince: [],
            currentCity: this.initcity,
            visible: false,
            cityVisible: false
        }
    },
    methods: {  
        close: function(){
            this.visible = false
        },
        selectProvince: function(data){ 
            if(data.citylist){
                this.cityVisible = true
                this.currentProvince = data.citylist
                $(".mask_area",this.$el).fadeIn();
            }
        },
        hideCity: function(){  
            this.cityVisible = false 
            $(".mask_area",this.$el).fadeOut(300);
        },
        selectCity: function(city){
            var newCity = { 
                cityid: city.cityid,
                cityname: city.cityname
            }
            this.currentCity = newCity
            this.hideCity()
            this.visible = false
            this.$emit('select',newCity)
            util.setUserCity(newCity)
        },
        //选中直辖市
        selectPlcity: function(city){  
            var newCity = { 
                cityid: city.cityid,
                cityname: city.cityname
            }
            this.currentCity = newCity
            this.visible = false
            this.$emit('select',newCity)
            util.setUserCity(newCity)
        }
    },
    watch: {    
        visible: function(show){    
            var self = this
            if(show && cache.length === 0){  
                ajax({  
                    url: '/news/city/queryCityList',
                    success: function(res){ 
                        var data = res.data.filter(function(el){
                            return el.citylist && el.citylist.length && !inPLC(el.provinceid)
                        })
                        data = filterDataByLetter(data).list
                        cache = data.sort(function(a,b){
                            return a.initial.charCodeAt(0) - b.initial.charCodeAt(0)
                        })
                        self.data = cache
                    } 
                })
                
            }
        }
    },
    created: function(){},
    mounted: function(){
        //放到根元素   
        document.body.appendChild(this.$el)
    },
    destroyed: function(){
        $(this.$el).remove()
    }
}