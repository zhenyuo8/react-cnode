/**
 * title: xxx（车型名称）询底价
 * share {
 *  title: 【汽车大全】奥迪A4L 询底价
 *  desc:查报价、比配置、看图片、享优惠，来汽车大全就对了！
 * }
 * weibo: 【汽车大全】奥迪A4L 询底价 分享自@汽车大全
 * 询价
 * http://172.16.0.102:11300/dealer/dealerPromotion/getCarPromoteRankList?cityId=1507&lowPrice=40
 */

var util = require('../util')
var ajax = util.ajax
var CitySelector = require('../components/city_selector')
var CHANNEL_KEY = 'qcdqh5_channel'

module.exports = {  
    template: __inline('../templates/price.html'),
    components: {
        CitySelector: CitySelector
    },
    data: function(){
        return {
            serialId: this.$route.query.serialId,
            q_serialId: this.$route.query.q_serialId || this.$route.query.serialId,
            dealerId: this.$route.query.dealerId,
            channel: this.$route.query.channel || util.Cookie.get(CHANNEL_KEY),
            carinfo: {},
            carpic: '',
            carlist: [],
            dealerlist: [],
            no_dealerlist: false,
            username: '',
            phone: '',
            code: '',
            selectedCity: util.getUserCity(),
            carlayerVisible: false,
            needCode: false,
            sendCode_state: 0,
            sendCode_text: '获取验证码',
            isUsernameError: false,
            isPhoneError: false,
            isCodeError: false
        }
    },
    computed: {
        carId: function(){
            return this.carinfo.id || this.$route.query.carId
        },
        selectedDealers: function(){
            return this.dealerlist.filter(function(el){
                return el.selected === true
            })
        }
    },
    watch: {
        carId: function(val,a){
            this.getDealer()
        }
    },
    methods: {
        //显示城市选择
        showCitySelector: function(){
            this.$refs.citypicker.visible = true
        },
        //城市选择回调
        onSelect: function(city){
            this.selectedCity = city
            this.getDealer()
        },
        //显示车款选择
        showCarLayer: function(){
            this.carlayerVisible = true
            $("#mask_area2").show();
            VueGlobal.mask = true
        },
        //隐藏车款选择
        hideCarLayer: function(){
            this.carlayerVisible = false
            $("#mask_area2").fadeOut(300);
            VueGlobal.mask = false
        },
        hideError: function(name){
            switch(name){
                case 'username':
                    this.isUsernameError = false
                    break
                case 'phone':
                    this.isPhoneError = false
                    break
                case 'code':
                    this.isCodeError = false
                    break
            }
        },
        check: function(name){
            switch(name){
                case 'username':
                    if(this.username.length < 1 || this.username.length > 6){
                        this.isUsernameError = true
                        return false
                    }
                    if(!/^[\u4e00-\u9fa5]+$/.test(this.username)){ 
                        this.isUsernameError = true
                        return false
                    }
                    return true
                    break
                case 'phone':
                    if(this.phone.length < 11){
                        this.isPhoneError = true
                        return false
                    }
                    return true
                    break
                case 'code':
                    if(this.needCode && this.code == ''){
                        this.isCodeError = true
                        return false
                    }else{
                        if(!this.needCode){
                            return true
                        }
                        return true
                    }
                    break
            }
        },
        checkAll: function(){
            var f1 = this.check('username')
            var f2 = this.check('phone')
            var f3 = this.check('code')
            return f1 && f2 && f3
        },
        //发送验证码
        sendCode: function(){
            var self = this
            if(!this.check('phone')){
                return
            }
            if(this.sendCode_state === 1 || this.sendCode_state === 2){
                return
            }
            this.sendCode_state = 1
            ajax({
                url: '/user/code/send/' + this.phone,
                cache: false,
                success: function(res){
                    if(res.code === 10000){
                        //发送成功，倒计时
                        if(res.sub_code === 0){
                            self.sendCode_text = '60S后重新获取'
                            self.sendCode_state = 2
                            self.timeout()
                        }else{
                            alert(res.sub_msg)
                        }
                    }else{
                        //发送失败
                        self.sendCode_text = '获取验证码'
                        self.sendCode_state = 3
                    }
                }
            })
        },
        timeout: function(){
            var self = this
            var time = 60
            var timer = setInterval(function(){
                if(time === 1){
                    clearInterval(timer)
                    self.sendCode_state = 3
                    self.sendCode_text = '获取验证码'
                }else{
                    time--
                    self.sendCode_text = time + 'S后重新获取'
                }
            },1000)
        },
        //选择其他车款
        selectCar: function(el){
            this.carinfo = el
            this.hideCarLayer()
        },
        //选择经销商
        selectDealer: function(el){
            if(this.dealerlist.length === 1 && el.selected){
                return
            }
            if(this.selectedDealers.length === 5 && !el.selected){
                alert('最多选择5家经销商')
                return
            }
            el.selected = !el.selected
        },
        //获取车款列表
        getCars: function(){
            var self = this
            ajax({
                url: '/car/carparm/queryCarparam',
                data: {
                    serialid: this.q_serialId,
                    salestate: 1
                },
                success: function(res){
                    var temp = res.data.datas.filter(function(el){
                        return el.salestate === 1 /*|| el.salestate === 0*/
                    })
                    self.carlist = util.filterCarList(res.data.datas)
                    if(self.carId){
                        var temp2 = temp.filter(function(item){
                            return item.id == self.carId
                        })
                        if(temp2.length){
                            self.carinfo = temp2[0]
                        }else{
                            self.carinfo = temp[0]
                        }
                    }else{
                        self.carinfo = temp[0]
                    }
                }
            })
        },
        //获取经销商列表
        getDealer: function(){
            var self = this
            ajax({
                url: '/dealer/dealerinfo/list',
                data: {
                    pageSize: 30,
                    cityId: this.selectedCity.cityid,
                    serialId: this.q_serialId,
                    carId: this.carId,
                    dealerIds: this.dealerId,
                    mustHasPrice: 1,
                    //orderType: 1,
                    queryType: 3
                },
                success: function(res){
                    var data = res.data.dataList
                    data.forEach(function(el,i){
                        el.selected = i<3 ? true : false
                    })
                    self.dealerlist = data
                    self.no_dealerlist = data.length ? false : true
                }
            })
        },
        //请求验证码开关
        checkCodeOpen: function(){
            var self = this
            ajax({
                url: '/news/piece_content_app?names=submitorder_checkcode_openbutton',
                cache: false,
                success: function(res){
                    if(res.code === 10000){
                        res.data.forEach(function(el){
                            if(el.piece_key === 'submitorder_checkcode_openbutton'){
                                var result = JSON.parse(el.piece_value)
                                self.needCode = result.submitcheckcode_h5 === 1
                            }
                        })
                    }
                }
            })
        },
        //提交询价
        submit: function(){
            var self = this
            if(!this.checkAll()){
                return
            }

            if(this.selectedDealers.length === 0){  
                alert('最少选择1家经销商')
                return
            }

            var dealerid = this.selectedDealers.map(function(el){ return el.dealerId }).join(',')
            var dealerids = dealerid
            if(this.selectedDealers.length === 1){
                dealerids = null
            }else{
                dealerid = null
            }

            ajax({
                url: '/dealer/dealerOrder/SaveOrder',
                cache: false,
                data: {
                    serialid: this.q_serialId,
                    carid: this.carId,
                    dealerid: dealerid,
                    dealerids: dealerids,
                    username: this.username,
                    //usergender: '',
                    usermobile: this.phone,
                    checkcode: this.code,
                    cityid: this.selectedCity.cityid,
                    channel: this.channel, //渠道
                    //useremail: '',
                    productid: 4,
                    sourceid: 1
                },
                success: function(res){
                    if(res.code === 10000){
                        //alert('提交成功')
                        $('.mask_p').show()
                        $('.submit_success').show()
                        setTimeout(function(){
                            window.history.go(-1)
                        },2000)
                    }else if(res.code === 20001){
                        self.code = ''
                        self.isCodeError = true
                    }else{
                        alert(res.msg)
                    }
                }
            })
        },
        closeTip: function(){
            $('.mask_p').hide()
            $('.submit_success').hide()
            window.history.go(-1)
        }
    },
    created: function(){
        this.checkCodeOpen()
        this.getCars()
        //待优化
        if(this.carId){
            this.getDealer()
        }
        if(this.channel){   
            util.Cookie.set(CHANNEL_KEY,this.channel)
        }
        var self = this
        ajax({
            url: '/carpic/serialpic/queryBottomPicBySerialId/' + this.q_serialId,
            success: function(res){
                if(res.code === 10000){
                    self.carpic = res.data.imgUrl || 'http://static.qcdqcdn.com/img/noImg.png'
                }
                VueGlobal.setDocTitle(res.data.serialName+' 询底价')
                VueGlobal.setShareConfig({
                    title: '【汽车大全】'+ res.data.serialName +' 询底价',
                    desc: '查报价、比配置、看图片、享优惠，来汽车大全就对了！',
                    imgUrl: res.data.imgUrl 
                })
            }
        })
    }
}
