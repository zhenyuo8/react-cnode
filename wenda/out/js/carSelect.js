(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/3/9.
 */
$(function () {
	var flag = false;
	var bOk = false;
	var carSearch = function () {
		var searchDataChar;
		$('#for_input_brand').on('click', function (e) {
			e = e || window.event;
			var tar = e.target || e.srcElement;
			if (tar.id == 'search_brand' || tar.id == 'search_down') {
				if (!flag) {
					$('#car_brand_select').css('visibility', 'visible');
					$('#search_serial').attr('disabled', 'disabled');
					$('#search_serial').val('');
					flag = true;
					if (!bOk) {//判断bOk对车名称只绑定一次，
						bOk = !bOk;
					}
				} else {
					$('#car_brand_select').css('visibility', 'hidden');
					flag = false;
				}
			} else {
				flag = false;
			}
		});
		$('#for_input_brand').on('focus', function (e) {
			$('#search_brand').css('border-color', '#398be4');

			$('#car_brand_select').css('visibility', 'visible');
			flag = true;
		});
		$('#for_input_brand').on('blur', function (e) {
			$('#search_brand').css('border-color', '#dadada');
			$('#search_down').addClass('default1').removeClass('hover');
			$('#car_brand_select').css('visibility', 'hidden');
			flag = false;
		})

		//选择车品牌，显示该品牌对应的所有系列，并让品牌选择框隐藏
		$('#brand_car_name').on('click', function (e) {
			e = e || window.event;
			var tar = e.target || e.srcElement;
			var dataChar = $(tar).attr('data-char');
			$('.search_brand').val($(tar).text());
			$('#search_serial').attr('readonly', 'readonly');
			// $('.car_serial_select').css({'visibility': 'visible'});
			$('#search_brand').css('border-color', '#dadada');
			$('#search_down').removeClass('hover').addClass('default1')
			$('#search_serial').css('border-color', '#398be4');
			$('#serial_search_down').addClass('hover').removeClass('default1');
			$('#car_brand_select').css('visibility', 'hidden');
			//调用函数（ajax)将对应品牌的车型系列，绑定到模板中；

		});


		//选择车品牌
		$('#car_name dd').on('click', function (e) {
			e = e || window.event;
			var tar = e.target || e.srcElement;
			var dataChar = $(tar).attr('data-char');
			$('.search_brand').val($(tar).text());
			$('.car_serial_select').css({'visibility': 'visible'});
			$('#car_brand_select').css('visibility', 'hidden');
		});
		$('#car_brand_select').on('mouseover', function () {
			$('#search_brand').css('border-color', '#398be4');
			$('#search_down').addClass('hover').removeClass('default1');
			$('#car_brand_select').css('visibility', 'hidden');
			$('#car_brand_select').css('visibility', 'visible');
			flag = true;
		});
		$('#car_brand_select').on('mouseout', function () {
			$('#search_brand').css('border-color', '#dadada');
			$('#search_down').addClass('default1').removeClass('hover');
			$('#car_brand_select').css('visibility', 'hidden');
			flag = false;
		});
		//选择车型号
		$('#for_input_serial').on('click', function () {
			if (!flag) {
				if ($('#search_brand').val() !== '') {
					$('.car_serial_select').css({'visibility': 'visible'});
					$('#search_serial').css('border-color', '#398be4');
					$('#serial_search_down').addClass('hover').removeClass('default1');
					flag = true;
				} else {
					$('.car_serial_select').css({'visibility': 'hidden'});
					$('#serial_search_down').addClass('default1').removeClass('hover');
					$('#search_serial').css('border-color', '#dadada');
					flag = false;
				}
			} else {
				$('.car_serial_select').css({'visibility': 'hidden'});
				$('#serial_search_down').addClass('default1').removeClass('hover');
				$('#search_serial').css('border-color', '#dadada');
				flag = false;
			}
		});

		$('.car_serial_select').on('mouseover', function () {
			$('#search_serial').css('border-color', '#398be4');
			$('#serial_search_down').addClass('hover').removeClass('default1');
			$('.car_serial_select').css('visibility', 'visible');
			flag = true;
		});
		$('.car_serial_select').on('mouseout', function () {
			$('#search_serial').css('border-color', '#dadada');
			$('#serial_search_down').addClass('default1').removeClass('hover');
			$('.car_serial_select').css('visibility', 'hidden');
			flag = false;
		});

		//搜索 已选的车品牌车型
		$('#search_new').on('click', function (e) {
			e = e || window.event;
			var tar = e.target || e.srcElement;
			var carBrand = $('#search_brand').val();
			var carSerial = $('.search_serial').val();
			searchDataChar = $('.search_serial').attr('data-char');
			if (carBrand && carSerial) {
				if (carBrand != carSerial) {
					window.open('http://car.qichedaquan.com/carSerialSummary/' + searchDataChar)
				}
			} else {
				// window.open('http://car.qichedaquan.com/')
			}
		});

		//    找新车

		$('#search_new').on('mouseover', function () {
			$('#search_new').css({'background': "#ff9103"})
		});
		$('#search_new').on('mouseout', function () {
			$('#search_new').css({'background': "#ffa903"})
		})

		$('#search_new').on('mousedown', function () {
			$('#search_new').css({'background': "#ff8003"})
		})
		$('#search_new').on('mouseup', function () {
			$('#search_new').css({'background': "#ff9103"})
		})

		//    按条件搜车

		$('.for_select').on('mouseover', function () {
			$('.icon-select-default_03').addClass('hover').removeClass('default1');
			$('.for_conditional').css('color', "#3a8be4")
		});
		$('.for_select').on('mouseout', function () {
			$('.icon-select-default_03').addClass('default1').removeClass('hover');
			$('.for_conditional').css('color', "#666666")
		});
		$('.for_select').on('mousedown', function () {
			$('.icon-select-default_03').addClass('press').removeClass('hover');
			$('.for_conditional').css('color', "#1673d9")
		});
		$('.for_select').on('mouseup', function () {
			$('.icon-select-default_03').addClass('hover').removeClass('press');
			$('.for_conditional').css('color', "#1673d9")
		});


		//点击车型，将车型名称赋值给input框
		$('#car_brand_container').on('click', function (e) {
			e = e || window.event;
			var tar = e.target || e.srcElement;
			if (tar.tagName == 'A') {

				var searchWords = $(tar).text();
				$('#search_serial').attr('disabled', false);
				$('#search_serial').val(searchWords);

				$('#search_serial').attr('data-char', $(tar).attr('data-char'));
				$('.car_serial_select').css({'visibility': 'hidden'});
			}


		});
	}
	carSearch();
});
},{}]},{},[1])