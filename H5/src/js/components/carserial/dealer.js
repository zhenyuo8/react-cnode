/**
 * title: xxx（车型名称）经销商报价
 * share {
 *  title: 【汽车大全】奥迪A4L最新报价
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】奥迪A4L最新报价 分享自@汽车大全
 * 车型-经销商
 * http://172.16.0.102:11300/dealer/dealerinfo/list?pageSize=30&cityId=1507&serialId=2167&orderType=1
 */
var util = require('../../util')
var ajax = util.ajax
var splitArray = util.splitArray
var CitySelector = require('../city_selector')
var map

module.exports = {  
    template: __inline('../../templates/carserial_dealer.html'),
    components: {   
        CitySelector: CitySelector
    },
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            rows: [],
            originData: [],
            loading: true,
            selectedCity: util.getUserCity(),
            //是否有授权
            geoAccess: false,
            //是否按距离排序
            sortByDistance: false,
            //是否已经计算好距离
            calcDistance: false,
            //经纬度
            point: {},
            swiperOption: {
                pagination : '.swiper-pagination'
            }
        }
    },
    computed: {
        active: function(){
            return this.$route.query.page == 'dealer'
        }
    },
    watch: {    
        'active': function(a){ 
            if(this.active){ 
                this.getData()
                this.getGeo()
            }else{
                this.$refs.citypicker.visible = false
            }
        },
        sortByDistance: function(){
            this.sortData()
        },
        geoAccess: function(){
            if(!this.calcDistance){ 
                this.getData()
            }
        }
    },
    filters: {
        formatDistance: function(val){
            if(val > 1000){    
                return (val/1000).toFixed(2) + 'km'
            }
            return val.toFixed(2) + 'm'
        }
    },
    methods: {  
        showCitySelector: function(){   
            this.$refs.citypicker.visible = true
        },
        onSelect: function(city){   
            this.selectedCity = city
            this.getData()
        },
        getData: function(){
            this.loading = true
            var self = this
            ajax({
                url: '/dealer/dealerinfo/list',
                data: {
                    pageSize: 30,
                    cityId: this.selectedCity.cityid,
                    serialId: this.serialId,
                    mustHasPrice: 1,
                    orderType: 1,
                    queryType: 3
                },
                success: function(res){
                    self.loading = false
                    if(res.code === 10000){
                        self.originData = res.data.dataList.filter(function(el,i){
                            el._id = i
                            if(self.geoAccess){ 
                                self.calcDistance = true
                                if(el.longitude && el.latitude){
                                    var pointA = new BMap.Point(self.point.lng, self.point.lat);
                                    var pointB = new BMap.Point(el.longitude,el.latitude);
                                    el.distance = map.getDistance(pointA,pointB)
                                }
                            }
                            return true
                        })
                        self.sortData()
                    }
                }
            })

            ajax({  
                url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.serialId,
                success: function(res){    
                    //VueGlobal.setDocTitle(res.data.serialName+' 经销商报价')
                    VueGlobal.setShareConfig({
                        title: '【汽车大全】'+ res.data.serialName +' 最新报价',
                        desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                        imgUrl: res.data.imgUrl
                    })
                }
            })
        },
        getGeo: function(){
            var self = this
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS && r.accuracy != null){
                    self.point = r.point
                    self.geoAccess = true
                }else {}     
            },{enableHighAccuracy: true})
            /*
            navigator.geolocation.getCurrentPosition(function(pos){
                alert(JSON.stringify(pos))
                self.point = {
                    lng: pos.coords.longitude,
                    lat: pos.coords.latitude
                }
                self.geoAccess = true
            },function(error){
                console.log(error)
            },{enableHighAccuracy:true});
            */
        },
        sortData: function(){
            var list = JSON.parse(JSON.stringify(this.originData))
            if(this.sortByDistance){    
                list.sort(function(a,b){
                    return a.distance - b.distance
                })
            }else{  
                list.sort(function(a,b){
                    return a._id - b._id
                })
            }
            this.rows = splitArray(list,3)
            //返回第一页
            this.$refs.imageSwiper.swiper.slideTo(0,0)
        }
    },
    created: function(){},
    mounted: function(){
        map = new BMap.Map("__map");
        if(this.active){ 
            this.getData()
            this.getGeo()
        }
    },
    destroyed: function(){
        $('#__map').remove()
        map = null
    }
}