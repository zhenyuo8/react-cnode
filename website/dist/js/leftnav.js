/**
 * 左侧主品牌树js功能
 */
var leftTool = {
    //以下为实现点击A-Z实现滚动
    treeHref:function(num){
        var target = $('#letter'+num)
        var top = target.position().top + $('#treev1').scrollTop()
        $('#treev1').scrollTop(top)
    },
    //修复显示位置
    fixPosition: function(){
        var $nav = $('#leftNav')
        var $tree = $('#treev1');
        var $type = $('#pro_type');
        //导航为参考标准
        var pos = $type.offset()
        var def_top = $nav.offset().top
        var new_top = def_top - pos.top

        $(window).on('scroll resize',function(){
            var w_height = $(window).height()
            var w_scrolltop = $(window).scrollTop()
            // 修改缩放屏幕布局错乱
            var bpos;
            if($('.treeMainv1')[0]){
                bpos = $('.treeMainv1').offset().left-270;
            }else if($('.brand-show-area')[0]){
                bpos = $('.brand-show-area').offset().left-270;
            }else if($('.fc-db')[0]){
                bpos = $('.fc-db').offset().left-270;
            }else if($('.rightTree')[0]){
                bpos = $('.rightTree').offset().left-270;
            }else{
                bpos = pos.left;
            }
            
            //底部版权高度
            var f_top = $('.footer').offset().top
            var f_height = w_scrolltop + w_height - f_top
            f_height = f_height > 0 ? f_height : 0

            if(w_scrolltop > pos.top){
                $nav.css({
                    position: 'fixed',
                    left: bpos,
                    top: new_top
                });
                $type.css({
                    'position':'fixed',
                    'top':0,
                    'left':bpos
                });
                $tree.css('height',w_height-f_height-new_top-164)
            }else{
                $nav.css({
                    position: 'absolute',
                    left: 0,
                    top: 0
                });
                $type.css({
                    'position':'relative',
                    'top':0,
                    'left':0
                });
                $tree.css('height',w_height+w_scrolltop-f_height-def_top-164)
            }
        })

        $(window).trigger('scroll')
    },
    //固定到选择分类
    scrollToSelected: function(){
        var curUrl,allA;
        var regAll=/(\/\w+(\/\w+((\-)?\d+)?)+)/ig;
        curUrl=window.location.pathname;
        allA=$('#treev1').find('.mainBrand');
        var subA=$('.subBrand');
        var len=allA.length;

        for(var i=0;i<len;i++){
            var curA=allA[i];
            allA[i].index=i;
            $(allA[i]).attr('href').replace(regAll,function (){
                if(arguments[1]==curUrl){
                    $('#treev1').scrollTop($(allA[allA[i].index]).offset().top-259)
                    $(allA[allA[i].index]).children('i').toggleClass('active')
                    $(allA[allA[i].index]).children('i').addClass('now')
                }
            });
        }
        for(var j=0;j<subA.length;j++){
            subA[j].index=j;
            $(subA[j]).attr('href').replace(regAll,function () {
                if(arguments[1]==curUrl){
                  $(subA[j]).children('big').css('color','#398be4')
                    $('#treev1').scrollTop($(subA[subA[j].index]).offset().top-259)
                }
            })
        }

    },
    //点击展开，并改变箭头指向
    unfold:function(){
        $('#leftNav').on('click','.mainBrand,.brandType',function(){
            $(this).find('i').toggleClass('active').end().siblings('.tree-items,ul').toggle();
            $(this).find('i').siblings('big').toggleClass('active');
        });
        $('#leftNav').on('click','.current i',function (e) {
            e=e||window.event;
            var tar=e.target||e.srcElement;
            if($(this).hasClass('active')||$(this).hasClass('now')){
                e.preventDefault();
                e.stopPropagation();
                e.cancelBubble=true;
                $(this).parent('a').siblings('.tree-items,ul').toggle();
                $(this).toggleClass('active')
            }

        })



    },
    init: function(){
        $('.leftNav').css('height','auto')
        $('#tree-bottom').hide()
        this.unfold()
        this.fixPosition()
        this.scrollToSelected()
    }
};

$(function(){
    if($('#treev1')[0]){
        leftTool.init()
    }
})
