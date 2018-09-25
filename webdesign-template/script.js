$(function() {
	$('.toggles button').click(function(){
		var get_id = this.id;
		var get_current = $('.posts .' + get_id);

		$('.post').not(get_current).hide(500);
		get_current.show(500);
	});

	$('#showall').click(function(){
		$('.post').show(500);
	});
});


$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
		nav:true,
		loop:true,
		responsiveClass:true,
		responsive:{
			420:{
				items:3,
				loop:true
			},
			421:{
				items:8,
				loop:true
			}	
	}
	});
});

