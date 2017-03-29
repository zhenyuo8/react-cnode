(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/2/22.
 */
$(document).ready(function () {
    var deleteCollect=(function () {
        $('.container em').on('click',function () {
            console.log(this)
            $('.cancel_confirm_delete').show();
            // $('.cancel_confirm_delete').show()
        })

        if($('.content_article ').children('.container').length<=10){
            $('.tcdPageCode').hide()
        }else{
            $('.tcdPageCode').show()
        }
    })()
})
},{}]},{},[1])