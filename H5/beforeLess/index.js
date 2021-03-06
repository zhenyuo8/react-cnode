/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';


var less = require('less');
var root = fis.project.getProjectPath();

module.exports = function(content, file, conf){
    conf.paths = [ file.dirname, root ];
    if (conf.syncImport === undefined) conf.syncImport = true;
    if (conf.relativeUrls === undefined) conf.relativeUrls = true;
    var parser = new(less.Parser)(conf);
    content = content
            .replace(/\/\*.*?\*\//g,'')
            .replace(/@import\s+['|"](.*?)['|"];/g,'@import (reference) "$1";')
    parser.parse(content, function (err, tree) {
        if(err){
            throw err;
        } else {
            if(parser.imports){
                fis.util.map(parser.imports.files, function(path){
                    file.cache.addDeps(path);
                });
            }
            content = tree.toCSS(conf);
        }
    });
	return content;
};
