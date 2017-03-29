(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Administrator on 2017/3/4.
 */
(function($) {

	$.fn.textCounter = function(o){

		o = $.extend( {}, $.fn.textCounter.defaults, o );

		return this.each(function(i, el){

			var $e = $(el);
			var $target = $(o.target);
			if ( typeof o.count === 'string' ) {
				// Rather than a literal value given for count, use the specified attribute
				// of the target element.
				o.count = parseInt($target.attr(o.count));
			}

			// predefined count minus existing content
			$e.html(o.count - $target.text().length);

			$(o.target).keyup(function(e){
				var cnt = this.value.length;
				if (cnt <= (o.count-o.alertAt)) {
					// clear skies
					$e.removeClass('tcAlert tcWarn');
				} else if ( (cnt > (o.count-o.alertAt)) && (cnt < (o.count-o.warnAt)) ) {
					// getting close
					$e.removeClass('tcAlert tcWarn').addClass('tcAlert');
				} else if ( cnt >= (o.count-o.warnAt) ){
					// over limit
					$e.removeClass('tcAlert tcWarn').addClass('tcWarn');
					if (o.stopAtLimit) { this.value = this.value.substring(0, o.count); }
				}
				var str = o.formatStr.replace(/\{count\}/,this.value.length).replace(/{total}/,o.count)
				$e.html(str);
			}).trigger('keyup');

		});

	};

	$.fn.textCounter.defaults = {
		count: 10,
		alertAt: 10,
		warnAt: 0,
		formatStr: '{count}/{total}',
		target: '#myTextarea',
		stopAtLimit: true
	};

}(jQuery));
},{}]},{},[1])