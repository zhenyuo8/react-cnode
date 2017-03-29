
var lightning=function(des,fn){
	var des=des?des:'汽车大全'
	var fn=fn?fn:function(){}
	var div=$('<div id="ligtning">'+des+'</div>');
	var fontSize='30x';
	var dpr=$('html').attr('data-dpr');
	if(dpr==1){
		fontSize='15px'
	}else if(dpr==2){
		fontSize='30x'
	}else if(dpr==3){
		fontSize='45x'
	}else{
		fontSize='30x'
	}
	console.log(dpr)
	var divCss={
		'display':'none',
	    'font-size':'30px',
	    'color': '#fff',
	    'width': '3.467rem',
	    'line-height': '1.333rem',
	    'text-align': 'center',
	    'background-color': '#000',
	    'border-radius': '0.107rem',
	    'filter': 'alpha(opacity=60)',
	    'opacity': '.6',
	    'margin': '-0.667rem 0 0 -1.733rem',
	    'position': 'fixed',
	    'top': '50%',
	    'left': '50%',
	    'z-index': '99'
	};
	div.css(divCss);
	div.css('font-size',fontSize)
	$('body').append(div);
	$('#ligtning').fadeIn().fadeOut(function(){
		$('#ligtning').remove()
	});
	fn()

}

