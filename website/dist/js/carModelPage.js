(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*****
 *@author: jianingning
 *@from: 用于车型详解中左侧固定菜单鼠标停留
 *@date: name (2017.01.16)
*/
var carModelIntroPaged = (function(){	

	var data = []
	var pager

	function init(config){	
		data = config
		initNav()
		initPage()
		bindEvents()
		loadHTML(0)
	}

	function bindEvents(){	
		$('#floating_menu').on('click','li',function(event){	
			event.preventDefault()
			pager.goPage($(this).index() + 1)
		})
	}

	function initNav(){	
		var html = ''
		for(var i=0;i<data.length;i++){	
			html += '<li class="h"><a href="javascript:void(0)">'+ data[i].title +'</a></li>'
		}
		$('#floating_menu').html(html)
	}

	function initPage(){	
		$(".car_m_page").createPage({
			pageCount: data.length,
			current: 1,
			backFn: function(p){   
				loadHTML(p-1)
			}
		});
		pager = $(".car_m_page").data('pager')
	}

	function loadHTML(index){
		$('.car-type-introduce-con').load(data[index].url)
		$('#floating_menu li').removeClass('f_active').eq(index).addClass('f_active')
		if(index > 0){	
			$('.prevPage').html('上一页：' + data[index-1].title)
		}
		if(index < data.length-1){	
			$('.nextPage').html('下一页：'+ data[index+1].title)
		}
		$(window).scrollTop($('.car_m_middle_news').offset().top)
	}

	return {	
		init: init
	}

})();

$(function(){	
	carModelIntroPaged.init(carSerialDetail.data)
})

},{}]},{},[1])