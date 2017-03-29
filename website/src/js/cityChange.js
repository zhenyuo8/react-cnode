/**
 * Created by admin on 2017/1/8.
 */
$(function () {
    var flag=false;
    $('#city_position').on('click',function (e) {
        e=e||window.event;
        var tar =e.target||e.srcElement;
        if(!flag){
            $('#city_chose').css('display',"block");
            bindCity();
            flag=true;
        }else{
             $('#city_chose').css('display',"none");
            flag=false;
        }

        if(tar.tagName=='SPAN'){
            if(!flag){
                $('#city_chose').css('display',"block");
                flag=true;
                bindCity()
            }else{
                $('#city_chose').css('display',"none");
                flag=false;
            }
        }else{
            // $('#city_chose').css('display',"none");
        }

    });
    $('#input_letters').on('focus',function (e) {
        e=e||window.event;
        var tar=e.target||e.srcElement;
        $('#input_letters_search').css({"display":"block"})
    })

    function bindCity() {
        var that=this;
        this.data=null;
        $.ajax({
            url:'data/cityData.json',
            type:'GET',
            async:true,
            dataType:'json',
            success:function (result) {
                that.data=result;
                cityTemplate(that.data)
            }
        })
    }

    function cityTemplate(data) {
        data.sort(function (a,b) {
            a=a.nameSpell.slice(0,1).toUpperCase();
            b=b.nameSpell.slice(0,1).toUpperCase();
            return a.localeCompare(b)
        });
        $('#city_chose_region').html( _.template($('#cityTemplate').html(), data) );
    }
});