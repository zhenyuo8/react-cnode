fis.set('project.files',['src/**','mock/**'])

//fis.hook('relative');
fis.hook('commonjs');

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        sourceMap: true,
        useInlineMap: true
    })
});

fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
})

fis.match('/src/(**)', {  
    release: '$1'
})

fis.match('src/(img/**)',{   
    release: '/$1'
})

fis.match('src/html/(**)',{   
    release: '/$1'
})

fis.match('src/html/0/**',{   
    release: false
})

fis.match('/src/js/templates/**',{    
    release: false
})
//js处理
fis.match('/src/js/{lib,pages,components,utils}/**', {
    isMod: true
});

fis.match('{service.js,util.js,app.js}', {
    isMod: true
});

fis.match('{swpier.css,base.css,mod_head.less}',{ 
    packOrder: -99
})
//css处理
fis.match('*.{less,css}', {
  packTo: '/css/aio.css',
  query: '?t='+Date.now()
});


function replacer(opt) {
    if (!Array.isArray(opt)) {
        opt = [opt];
    }
    var r = [];
    opt.forEach(function (raw) {
        r.push(fis.plugin('replace', raw));
    });
    return r;
};

/**
 * 本地环境
 */

fis.match('**', {
  deploy: replacer([{
        from: '<!--skip',
        to: ''
    },{
       from: 'skip-->',
       to: '' 
    },{
       from: '<!--modjs-->',
       to: '<script src="/js/mod.js"></script>'
    },{
       from: '${time}',
       to: Date.now() 
    },{
       from: '${url_base}',
       to: '' 
    },{
       from: '${static_base}',
       to: '' 
    },{
        from: '${api_base}',
        to: 'https://m.api.qichedaquan.com'
    }]).concat(fis.plugin('local-deliver'))
})


/**
 * 测试环境 
 */

fis.media('test').match('mod.js',{    
    packOrder: -99
})
.match('*.js',{    
    packTo: '/js/aio.js',
    query: '?t='+Date.now()
})
.match('*.{less,css}', {
    packTo: '/css/aio.css',
    query: '?t='+Date.now()
})
.match('/mock/**',{    
    release: false
})


fis.media('test').match('**', {
 domain: '/h5' ,
  deploy: 
    replacer([{
        from: '<!--skip',
        to: ''
    },{
       from: 'skip-->',
       to: '' 
    },{
       from: '${time}',
       to: Date.now() 
    },{
       from: '${url_base}',
       to: '/h5' 
    },{
       from: '${static_base}',
       to: '/h5' 
    },{
        from: '${api_base}',
        to: 'http://172.16.0.102:11300'
    }]).concat([
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver',{
            to: './dist2'
        })
    ])
})

/**
 * 正式环境 
 */
fis.media('prod').match('mod.js',{    
    packOrder: -99
})
.match('*.js',{    
    packTo: '/js/aio.js',
    optimizer: fis.plugin('uglify-js'),
    query: '?t='+Date.now()
})
.match('*.{less,css}', {
    packTo: '/css/aio.css',
    optimizer: fis.plugin('clean-css'),
    query: '?t='+Date.now()
})
.match('/mock/**',{    
    release: false
})
.match('/src/js/templates/**',{    
    preprocessor: function(content){
        return content.replace(/\.stop/g,'___stop').replace(/\.prevent/g,'___prevent')
    },
    optimizer: fis.plugin('html-minifier',{
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true
    })
})

fis.media('prod').match('**', {
  domain: '//jsx.qichedaquan.com/h5',
  deploy: 
    replacer([{
        from: '<!--skip',
        to: ''
    },{
       from: 'skip-->',
       to: '' 
    },{ 
        from: '___',
        to: '.'
    },{
       from: '${time}',
       to: Date.now() 
    },{
       from: '${url_base}',
       to: '' 
    },{
       from: '${static_base}',
       to: '//jsx.qichedaquan.com/h5' 
    },{
        from: '${api_base}',
        to: 'https://m.api.qichedaquan.com'
    }]).concat([
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver',{
            to: './dist_prod'
        })
    ])
})