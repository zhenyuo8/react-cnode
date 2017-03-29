require('./layer/layer');
window.login={
        'alLogin':function alLogin(html) {
            var html=html || '';
            var div=$('<div id="login_box" class="login_box">'+html+'</div>');
            $('body').append(div);
        },
        'parHtml':function parHtml(html){
            var link,script;
            var reg=/(<link(.*?)[^>]*>)/;
            var reg1=/<script[^>]*>(.|\n)*?(?=<\/script>)<\/script>/
            html=html.replace(reg,function($1){
                link=$1;
                return ''
            });
            html=html.replace(reg1,function($1){
                script=$1;
                return ''
            });
            $('body').append(link);
            $('body').append(script)
            login.alLogin(html)
        },
        'getLoginHtml':function getLoginHtml(md) {
            var url=window.location.href ;

            if(!!md){
                if (url.indexOf("?md=")>0){
                    url = url.split('?')[0];
                }
                url = url +"?md="+md;
            }
            $.ajax({
                url:"http://i.qichedaquan.com/user/comm/toLogin",
                data:{"returnUrl":url},
                dataType : "jsonp",
                success:function (data) {
                    login.parHtml(data)
                },
                error:function (e) {
                    layer.msg("请求登陆失败");
                }
            })
        }
    };
