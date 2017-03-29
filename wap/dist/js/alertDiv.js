/*页面半透明提示弹层*/
// 引用示例：alertDiv({type:"2",des:"您选择的图片大小不符合规则，请重新选择",time:"3000",fn:function(){}});

function alertDiv(opt){
    if(!opt){
        return;
    }
    var _opt = {
        type: '',
        des: '',
        time: '',
        fn: function(){}
    };
    var opt = $.extend(_opt,opt);
    if(opt.type == 1){

    }else if(opt.type == 2){
        var $divT = $('<div class="action_tips" id="actionTips"></div>');
        var $spanT = $('<span class="tips">'+opt.des+'</span>');
        var cssObj = {
            'width': '100%',
            'height': '1.333rem',
            'text-align': 'center',
            'margin-top': '-.667rem',
            'position': 'fixed',
            'top': '50%',
            'left': '0',
            'z-index':'99'
        };
        var cssSpan = {
            'color':'#fff',
            'display': 'inline-block',
            'line-height': '1.333rem',
            'padding': '0 0.8rem',
            'background-color': '#000',
            'border-radius': '0.107rem',
            'filter': 'alpha(opacity=60)',
            'opacity': '.6'
        };
        $($divT).append($spanT);
        $('body').append($divT);
        $($spanT).css(cssSpan);
        $($divT).css(cssObj);
        setTimeout(function(){
            $('#actionTips').remove();
            opt.fn();
        },opt.time);
    }
}
