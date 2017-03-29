var ajax = require('util').ajax

module.exports = {  
    getAds: function(opt,callback){

        var p = $.extend({platform:'h5'},opt)

        var url = p.area ? '/app/getAdsByArea' : '/app/getAds'

        if(p.area){ 
            p.provinceId = (userIpData && userIpData.pid) || '2'
        }

        ajax({  
            url: url,
            data: p,
            success: function(res){
                if(res.code === 10000 && res.data.length){
                    try{
                        var adData = JSON.parse(res.data[0].adData)
                        adData.forEach(function(el){
                            el.isAd = true
                        })
                        callback(adData)
                    }catch(e){
                        callback([])
                    }
                }else{
                    //callback([])
                }
            }
        })

    }
}