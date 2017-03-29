/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-30 09:42:50
 * @version $Id$
 */


var listTpl = require('./tpl/list.html')

var doT = require('../lib/doT');

var sansan = require('./b');

var san = a(10, 2);

var data = [
		{name: '项目1'},
		{name: '项目2'},
		{name: '项目3'},
		{name: '项目4'},
		{name: '项目5'}
	];

var html = doT.compile(listTpl)(data);

var box = document.getElementById('box');
//box.innerHTML = html;