/**
 * title:
 * share {
 *  title:
 *  desc:
 * }
 * weibo:
 * 搜索
 */

var ajax = require('../util').ajax
var STORE_KEY = 'qcdqh5_search_kw'

module.exports = {
    template: __inline('../templates/search.html'),
    data: function(){
        return {
            kw: '',
            list: [],
            history: JSON.parse(localStorage.getItem(STORE_KEY)) || [],
            hotserials: [],
            showList: false,
            loading: true
        }
    },
    watch: {
        kw: function(val){
           /* if($.trim(val)){
                this.showList = true
                this.getData()
            }else{
                this.showList = false
            }*/
        }
    },
    methods: {
        clearKw: function(){
            this.kw = ''
            this.showList = false
        },
        input: function(){
            if($.trim(this.kw)){
                this.showList = true
                this.getData()
            }else{
                this.showList = false
            }
        },
        getData: function(){
            this.loading = true
            var self = this
            ajax({
                url: '/car/serial/findSerialListByShowname',
                data: {
                    showName: $.trim(this.kw)
                },
                success: function(res){
                    self.loading = false
                    self.list = res.data
                }
            })
        },
        save: function(data){
            for(var i=0;i<this.history.length;i++){
                if(data.serialId == this.history[i].serialId){
                    this.history.splice(i,1)
                }
            }
            this.history.unshift(data)
            this.history = this.history.slice(0,6)
            localStorage.setItem(STORE_KEY,JSON.stringify(this.history))
        },
        clear: function(){
            this.history = []
            localStorage.setItem(STORE_KEY,JSON.stringify([]))
        }
    },
    created: function(){
        var self = this
        ajax({
            url: '/car/serial/getHotlCarSerials',
            data: {
                num: 6
            },
            success: function(res){
                self.hotserials = res.data
            }
        })
        VueGlobal.setDocTitle('选车')
        VueGlobal.setShareConfig({
            title: '从车盲到专家，用汽车大全就够了！',
            desc: '买车无忧，用车不愁，快用【汽车大全】，你喜欢的车子都在这儿！'
        })
    },
    mounted: function(){
        $('.search_input',this.$el).focus()
    }
}
