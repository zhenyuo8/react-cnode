(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-30 09:42:50
 * @version $Id$
 */


function a () {}
function b () {}
function c () {}

exports.a = a;
exports.b = b;
exports.c = c;
},{}],2:[function(require,module,exports){
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-30 09:42:50
 * @version $Id$
 */



var sansan = require('./b');
sansan.a();



var data = [
		{name: '项目1'},
		{name: '项目2'},
		{name: '项目3'},
		{name: '项目4'},
		{name: '项目5'}
	];

var html = doT.compile(listTpl)(data);

var box = document.getElementById('box');
box.innerHTML = html;
},{"./b":1}]},{},[2])