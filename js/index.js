$(function(){
    /**
    *将汉字编码
    */
    function tounicode(data){
       if(data == '') return '请输入汉字';
       var str ='';
       for(var i=0;i<data.length;i++){
          str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
       }
       return str;
    }

    var bindHtml=(function(){
        var reg=/[\u4e00-\u9fa5]+/g
        var inputCity,firstName,upIndex,downIndex;
        var cityArr=[];
        var data=['北京','北戴河','南昌','南京','南极','武汉','武昌','苏州','苏苏']
        $('#input-name').on('input',function(e){
            var htmlStr='';
            cityArr=[];
            inputCity=$(this).val();
            if(inputCity==''){
                $('#show-name').html('');
                cityArr=[];
            }
            if(!inputCity.match(reg)) return;
            firstName=inputCity.slice(0,1);
            // 对全国所有的城市进行筛选，将含有输入文字关键字的城市名称放入数组中
            for(var i=0;i<data.length;i++){
                if(data[i].slice(0,1)==firstName){
                    cityArr.push(data[i]);
                }
            }
            $('#show-name').show();
            // 如果未找到输入的第一个文字对应的城市名，提示信息！
            if(cityArr.length==0){
                htmlStr+='<li class="message">未找到包含该文字的城市名!</li>';
                // return;
            }
            // 如果数组长度不为0；则循环该数组，用字符串的方式拼接起来，渲染到对应的容器内；
            $.each(cityArr,function(index,item){
                htmlStr+='<li>'+item+'</li>'
            });
            $('#show-name').html(htmlStr);
            downIndex=-1;
            upIndex=$('#show-name li').length;
        })

        $(document).on('keydown',function(e){
            e=e||window.evnet;
            if(e.keyCode==38){//up向上键切换
                selectCity(upIndex-1)
                if(upIndex>=-1){
                    upIndex-=1;
                    downIndex=upIndex;
                }else{
                    upIndex=$('#show-name li').length;
                    downIndex=-1;
                    selectCity(upIndex)
                }
            }
            if(e.keyCode==40){//down按向下键切换
                if(downIndex<$('#show-name li').length-1){
                    downIndex+=1;
                    upIndex=downIndex;
                }else{
                    downIndex=0;
                    upIndex=$('#show-name li').length;
                }
                selectCity(downIndex);

            }
            // 对应回车键，拿到当前还有class类名为select的li标签的内容，将它复制给input输入框；
            if(e.keyCode==13){
                $('#input-name').val($('.select').text());
                $('#show-name').hide();
            }
        })

        // 获取选中城市名字
        $('#show-name').on('click',function(e){
            e=e||window.event;
            var tar =e.target||e.srcElement;
            if(tar.tagName=='LI'){
                $('#input-name').val($(tar).text());
                $('#show-name').hide();
            }
        })

        // 点击搜索按钮
        $('#search-btn').on('click',function() {
            var keyWords=$('#input-name').val();
            if(keyWords){
                window.location.href="https://www.baidu.com/s?wd="+keyWords;
            }
        })
    })()



    function selectCity(index) {
        $('#show-name li').eq(index).addClass('select').siblings().removeClass('select')
    }
})
