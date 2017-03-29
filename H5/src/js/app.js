
window.$ = require('lib/jquery')
var Vue = require('lib/vue')
var util = require('util')

window.VueGlobal = new Vue({
  data: {
    mask: false
  },
  watch: {
    mask: function(isShow){
     /* if(isShow){ 
        var top = $(window).scrollTop()
        $('html').addClass('fixed_scroll')
        $('#app').css('top',-top)
      }else{ 
        var top = $('#app').offset().top
        $('html').removeClass('fixed_scroll')
        $(window).scrollTop(-top)
      }*/
    }
  },
  methods:{ 
    setDocTitle: util.setDocTitle,
    setShareConfig: util.setShareConfig
  } 
}) 
//on emit
VueGlobal.$on('pageTitle',util.setDocTitle)
VueGlobal.$on('shareConfig',util.setShareConfig)
//公用组件
//路由
var VueRouter = require('lib/vue-router')
//轮播
var VueSwiper = require('components/swiper/index')
//车型头部
var CarserialHeader = require('components/carserial/header')
//内页头部
var PageHeader = require('components/page_header')

//页面组件
var Carserial = require('pages/carserial')
var News = require('pages/news')
var CarMaster = require('pages/carmaster')
var CarFilter = require('pages/carfilter')
var CarFilterResult = require('pages/carfilter_result')
var Dealer = require('pages/dealer')
var Price = require('pages/price')
var PriceAd = require('pages/price_ad')
var Config = require('pages/config')
var Pic = require('pages/piclist')
var Search = require('pages/search')
var DealerNews = require('pages/dealer_news')
var PicView = require('pages/pic_viewpic')
var NewsPicView = require('pages/news_viewpic')
var Video = require('pages/video')


Vue.use(VueSwiper)
Vue.use(VueRouter)

Vue.component('carserial-header',CarserialHeader)
Vue.component('page-header',PageHeader)
Vue.filter('date',util.dateFilter)

//serialId 标记导航，q_serialId 用于其他查询，如经销商详情，经销商询价
var routes = [
  //主品牌(首页)
  { path: '/', name: 'index', component: CarMaster},
  //车型
  { path: '/carserial', name: 'carserial', component: Carserial},
  //条件选车
  { path: '/carselect', name: 'carselect', component: CarFilter},
  //条件选车结果
  { path: '/carselect/show', name: 'carselectshow', component: CarFilterResult},
  //配置
  { path: '/carparam', name: 'carparam', component: Config},
  //搜索
  { path: '/carsearch', name: 'carsearch', component: Search},

  //经销商
  { path: '/dealer', name: 'dealer', component: Dealer},
  //经销商新闻
  { path: '/dealer/news', name: 'dealernews', component: DealerNews},
  //询价
  { path: '/price', name: 'price', component: Price},
  //询价 - 广告投放
  { path: '/price/fad', name: 'pricefad', component: PriceAd},
  //图片列表
  { path: '/pic/list', name: 'piclist', component: Pic},
  //车系大图
  { path: '/pic/viewpic', name: 'picview', component: PicView},
  //文章详情
  { path: '/news/detail', name: 'news', component: News},
  //文章大图
  { path: '/news/viewpic', name: 'newspicview', component: NewsPicView},
  //视频详情
  { path: '/video/detail', name: 'video', component: Video}
]

var router = new VueRouter({
  base: '${url_base}',
  routes: routes,
  mode: 'history'
})
/*
var isRefresh = true
router.beforeEach(function(to,from,next){
  if(!isRefresh){
    _hmt.push(['_trackPageview', to.fullPath]);
  }
  if(isRefresh){
    isRefresh = false
  }
  //$('html,body').scrollTop(0)
  next()
})
*/

//百度事件统计

$('body').on('click','[bdtag]',function(e){
  var label = $(this).attr('bdtag')
  var tag = label.split('_')
  var action = tag.splice(tag.length-1,1)[0]
  var opt_label = tag.splice(tag.length-1)[0]
  _hmt.push(['_trackEvent', tag.join('_'), action, opt_label]);
  /*if(e.currentTarget.tagName === 'A'){  
    e.preventDefault()
    setTimeout(function(){
      window.location.href = e.currentTarget.getAttribute('href')
    },30)
  }*/
})

//微信jssdk
util.wxConfig()

var app = new Vue({
  router: router
}).$mount('#app')
