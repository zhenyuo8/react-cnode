
    /**
     * Created by Administrator on 2017/1/15.
     */
    $(function () {
        var flag=false;
        //网页头部城市选择交互
        var headerClick=(function () {
            //点击城市切换按钮，显示城市选择模块，同时让字体颜色改变
            $('#city_position').on('click',function (e) {
                e=e||window.event;
                var tar=e.target||e .srcElement;
                // e.cancelBubble=true;
                // e.stopPropagation();
                // e.preventDefault();
                if(tar.id=='city_position'||tar.id=='city_position_qie'||tar.id=='city_position_triangle'){
                    if(!flag){
                        $('#city_chose').show();
                        // $('.changeAdd').css({'color':'#398be4'});
                        // $(' #city_position .triangle').css({'border-top-color':'#398be4'});
                        flag=true;
                    }else{
                        $('#city_chose').hide();
                        flag=false
                    }
                }else{
                    flag=false;
                    return
                }
            });

            $('#login_third').on('mouseover',function(){
              $(this).css('color',"#fff")
            })
        })();

        //hover城市选择按钮，字体和三角符号变色；
        var cityHover=(function () {
            $('#city_position').on('mouseover',function (e) {
                $('.changeAdd').css({'color':'#fff'})
                $('#city_position .triangle').css({'border-top-color':'#fff'})
            });
            $('#city_position').on('mouseout',function (e) {
                $('.changeAdd').css({'color':'#999'})
                $('#city_position .triangle').css({'border-top-color':'#999'})
            });
            $('#city_position').on('mousedown',function () {
                $('.changeAdd').css({'color':'#398be4'})
                $(' #city_position .triangle').css({'border-top-color':'#398be4'});
            });
            $('#city_position').on('mouseup',function () {
                $('.changeAdd').css({'color':'#fff'})
                $(' #city_position .triangle').css({'border-top-color':'#fff'});
            });

            //城市首字母的hover&&press交互效果
            $('.hot_city_num a').mouseover(function () {
                $(this).css({'background':'#398be4','color':'#fff'})
            });
            $('.hot_city_num a').mouseout(function () {
                $(this).css({'background':'#eee','color':'#333'})
            });
            $('.hot_city_num a').mousedown(function () {
                $(this).css({'background':'#1064c1','color':'#fff'})
            });
            $('.hot_city_num a').mouseup(function () {
                $(this).css({'background':'#398be4','color':'#fff'})
            });

            //城市 名称的hover&&press效果
            $('.city_chose_region dd a').mouseover(function (e) {
                e=e||window.event;
                // e.cancelBubble=true;
                // e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
                $(this).css({'background':'#398be4','color':'#fff'})
            });
            $('.city_chose_region dd a').mouseout(function (e) {
                // e=e||window.event;
                // e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
                $(this).css({'background':'#fff','color':'#333'})
            });
            $('.city_chose_region dd a').mousedown(function (e) {
                $(this).css({'background':'#1064c1','color':'#fff'})
            });
            $('.city_chose_region dd a').mouseup(function (e) {
                $(this).css({'background':'#398be4','color':'#fff'})
            });

            //点击关闭按钮，城市选择模块隐藏
            $('.delete_city').on('click',function () {
                $('#city_chose').hide();
            });
            $(document).on('click',function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                if($('#city_chose').css('display')=='block'){
                    if(tar.id!=='city_position_qie'&&tar.id!=='input_letters'){
                        $('#city_chose').hide();
                        flag=false;
                    }
                    if($(tar).hasClass('city_search_result')){

                    }
                }

            });


            //城市输入框获取焦点显示搜索内容框，失去焦点隐藏
            $('.input').on('focus',function (e) {
                // $('#city_chose').show();
                $('#input_letters_search').css({"display":"block"});
                $('#input_letters').val('');
            });
            $('#input_letters').on('blur',function (e) {
                // $('#city_chose').show();
                $('#input_letters').val('请输入城市');
                $('#input_letters_search').css({"display":"none"})
            });

            //头部跳转二级页面nav
            $("#total_nav_content li").mouseover(function(e){
                // $(this).css('background',"#126acc");
                $(this).addClass("bg").siblings().removeClass("bg");

            });
            $("#total_nav_content li").mousedown(function(e){

                $(this).addClass("active").removeClass('bg')

            });
            $("#total_nav_content li").mouseup(function(e){
                $(this).addClass('bg').removeClass("active")
            });

            //    登入注册切换
            $('.header_nav_right li').on('mouseover',function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                if(tar.id!=='nav_line'){
                    $(this).addClass('bg').siblings().removeClass('bg');
                }
                if(tar.id=='app_id'){
                    $(this).addClass('bg').siblings().removeClass('bg');
                    $('.header_hover .triangle').css({'border-top-color':'#fff'})
                }
                if(tar.id=='login_id'||tar.id=='register_id'){
                    $(this).addClass('bg').siblings().removeClass('bg');
                    $('.header_hover .triangle').css({'border-top-color':'#999'})
                }
            });

        })();



        //城市模块hover显示，离开隐藏
        var cityChange=(function () {
            $('#city_chose_region dd a').on('click',function () {
                $('.header_nav_left .default_address a').text($(this).text());
                $('#city_chose').hide();
                flag=false;
            })
            $('.city_hot_search a').on('click',function () {
                $('.header_nav_left .default_address a').text($(this).text());
                $('#city_chose').hide();
                flag=false;
            });

        })();

        //播放按钮点击交互
        var playClick=(function () {
            $('.iconSpan3').mouseover(function () {
                $(this).removeClass('icon-play-norme').addClass('icon-play-hover')
            });
            $('.iconSpan3').mouseout(function () {
                $(this).removeClass('icon-play-hover').addClass('icon-play-norme')
            });
            $('.iconSpan3').mousedown(function () {
                $(this).removeClass('icon-play-hover').addClass('icon-play-press')
            });
            $('.iconSpan3').mouseup(function () {
                $(this).removeClass('icon-play-press').addClass('icon-play-hover')
            });
        })();

        //轮播图文字描述背景色效果
        var bannerImgClick=(function () {
            $('.car_small_img li a').mouseover(function () {
                $(this).find('.img_description').css({'background':'#398be4','opacity':'0.8'})
            });
            $('.car_small_img li a').mouseout(function () {
                $(this).find('.img_description').css({'background':'#000','opacity':'0.8'})
            });
            $('.car_small_img li a').mousedown(function () {
                $(this).find('.img_description').css({'background':'#126acc','opacity':'0.8'})
            });
            $('.car_small_img li a').mouseup(function () {
                $(this).find('.img_description').css({'background':'#398be4','opacity':'0.8'})
            });

            $('.car_big_img a').mouseover(function () {
                $(this).find('.img_description').css({'background':'#398be4','opacity':'0.8'})
            });
            $('.car_big_img a').mouseout(function () {
                $(this).find('.img_description').css({'background':'#000','opacity':'0.8'})
            });
            $('.car_big_img a').mousedown(function () {
                $(this).find('.img_description').css({'background':'#126acc','opacity':'0.8'})
            });
            $('.car_big_img a').mouseup(function () {
                $(this).find('.img_description').css({'background':'#398be4','opacity':'0.8'})
            });



            //点击左键交互
            $('.left').mousedown(function () {
                $(this).addClass('icon-bannerLeft-btn-press').removeClass('icon-bannerLeft-btn-hover')
            });
            $('.left').mouseup(function () {

                $(this).addClass('icon-bannerLeft-btn-hover').removeClass('icon-bannerLeft-btn-press')
            });
            $('.left').mouseover(function () {
                $(this).addClass('icon-bannerLeft-btn-hover').removeClass('icon-bannerLeft-btn-default')
            });
            $('.left').mouseout(function () {
                $(this).addClass('icon-bannerLeft-btn-default').removeClass('icon-bannerLeft-btn-hover')
            });


            //点击右键交互
            $('.right').mousedown(function () {
                $(this).addClass('icon-bannerRight-btn-press').removeClass('icon-bannerRight-btn-hover')
            });
            $('.right').mouseup(function () {
                $(this).addClass('icon-bannerRight-btn-hover').removeClass('icon-bannerRight-btn-press')
            });
            $('.right').mouseover(function () {
                $(this).addClass('icon-bannerRight-btn-hover').removeClass('icon-bannerRight-btn-default')
            });
            $('.right').mouseout(function () {
                $(this).addClass('icon-bannerRight-btn-default').removeClass('icon-bannerRight-btn-hover')
            });
        })();

        //汽车图标hover&&press效果
        var iconsHoverPress=(function () {
            var reg=/^(icon-\w+)-(\w+)/ig;
            $('#carIcon_detail_ul li').on('mouseover',function (e) {
                var e=e||window.event;
                var tar=e.target||e.srcElement;
                var curClassName=$(this).find('i').attr('class')

                var nowClassName=curClassName.replace(reg,function () {
                    return arguments[1]+'-hover'
                });
                $(this).find('i').removeClass(curClassName).addClass(nowClassName);

            });
            $('#carIcon_detail_ul li').on('mousedown',function (e) {
                var e=e||window.event;
                var tar=e.target||e.srcElement;
                var curClassName=$(this).find('i').attr('class')
                var nowClassName=curClassName.replace(reg,function () {
                    return arguments[1]+'-press'
                });
                $(this).find('i').removeClass(curClassName).addClass(nowClassName);

            });
            $('#carIcon_detail_ul li').on('mouseup',function (e) {
                var e=e||window.event;
                var tar=e.target||e.srcElement;
                var curClassName=$(this).find('i').attr('class');

                var nowClassName=curClassName.replace(reg,function () {
                    return arguments[1]+'-hover'
                });
                $(this).find('i').removeClass(curClassName).addClass(nowClassName);

            });
            var $aLi=$('#carIcon_detail_ul li');
            $.each($aLi,function (index,item) {
                var curClass=null;
                var nowClassName;
                $(item).on('mouseout',function () {
                    curClass=$(item).find('.icons').find('i').attr('class')
                    nowClassName=curClass.replace(reg,function () {
                        return arguments[1]+'-norme'
                    });
                    $(item).find('.icons').find('i').removeClass(curClass).addClass(nowClassName)
                })
            })
        })();

        //tab模块切换hover效果
        var tabChange=(function () {
            $("#car_class_tab .hover1 a").mouseover(function(e){
                e=e||window.event;
                var tar=e.target||e.srcElement;
                if(tar.id=='beijing_market'){
                    return;
                }else{

                    $(tar).parent().addClass("on").siblings().removeClass("on");
                    $("#tab_car div").hide().eq($(this).parent().index()).show();
                }
            })

            $('#car_class_tab .hover1 a').mouseout(function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                $(tar).addClass('on').siblings().removeClass('on')

            })
        })();

        //汽车品牌选择
        var carSelect=(function () {
            var flag=false;
            $('#for_input_brand').on('click',function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                if(tar.id=='search_brand'||tar.id=='search_down'||tar.id=='for_input_brand'){
                    if(!flag){
                        $('#car_brand_select').css('visibility','visible');
                        $('#search_brand').css('border-color','#398be4');
                        $('#search_down').addClass('hover').removeClass('default1');
                        flag=true;
                    }else{
                        $('#car_brand_select').css('visibility','hidden');
                        $('#search_brand').css('border-color','#dadada');
                        $('#search_down').addClass('default1').removeClass('hover');
                        flag=false;
                    }
                }else{
                    flag=false;
                    return;
                }
            });

            //点击车品牌字母，将该品牌字母置顶
            $('#car_letters').on('click',function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                $(this).addClass('active').siblings().removeClass('active');
                var lettersValue=$(tar).text();
                moveToTop(lettersValue);
            });
            $('#car_letters span').on('click',function () {
                $(this).addClass('active').siblings().removeClass('active');
            })

            //点击字母，滚动到对应首字母车品牌位置
            function moveToTop(lettersValue) {
                var allDl=$('#brand_car_name dl');
                var reg=/^letters_(\w)/ig;
                var topMove=null;
                for(var i=0;i<allDl.length;i++){
                    var cur=allDl[i];
                    var keyWords=$(cur).attr('id').replace(reg,function () {
                        return arguments[1];
                    });
                    if(keyWords==lettersValue){
                        $('#brand_car_name').animate({top:-(topMove)})
                    }else{//1px为border,不包含在height中，每一个dl都有，所以需要累加1px
                        topMove+=$(cur).height()+1;
                    }
                }
            }
        })();

        //车市左边切换模块
        var tabPrice=(function () {
            $('.price_list li').mouseover(function () {
                $(this).addClass('bg').siblings().removeClass('bg');
                $(".carMarket_left_tab_content").eq($(this).index()).addClass("show").siblings().removeClass("show");
            })

            $('.hot-list .fl .js-menu').on('mouseover',function () {
                $(this).addClass('active').siblings().removeClass('active');
                $('.show_now .js-con').eq($(this).index()).addClass('js-show').siblings().removeClass('js-show');

            });

            $('#js-left-tap li').on('mouseover',function () {
                $('#js-tab-warp ul').eq($(this).index()).show().siblings().hide()
            })
        })();


        //footer
        //footer top值根据body高度来展示；
        var footerOffsetTop=(function () {
            var bodyHeight=$(document.body).height();
            var clientHeight=$(window).height();
            var  footerHeight=$('.footer').height();
            if(bodyHeight<clientHeight){
                $('.footer').css({'position':'fixed','bottom':0})
            }else{
                $('.footer').css({'position':'relative','bottom':0})
            }
        })();
        $('#input_city_search .city_search_result').on('click',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            if(tar.tagName=='SPAN'){

            }

        })

    });
