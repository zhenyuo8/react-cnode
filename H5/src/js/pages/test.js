var CitySelector = require('../components/city_selector')

//var IScroll = require('../components/iscroll_vue')

module.exports = {  
    template: __inline('../templates/test.html'),
    components: {
        //iscroll: IScroll
    },
    data: function(){   
        return {    
            selectedCity: { 
                cityid: "201",
                cityname: '北京'
            }
        }
    },
    components: {   
        CitySelector: CitySelector
    },
    methods: {  
        showCitySelector: function(){   
            console.log('show')
            this.$refs.citypicker.visible = true
        },
        onSelect: function(city){   
            this.selectedCity = city
        }
    }
}