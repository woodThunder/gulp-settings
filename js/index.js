$(document).ready(function() {
	var mySwiper = new Swiper('.banner_index', {
		autoHeight: true,
		loop: true,
		pagination: '.banner_index .swiper-pagination',
		paginationClickable: true,

		onInit: function(swiper) {
			swiperAnimateCache(swiper);
			swiperAnimate(swiper);
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper);
		}
	})
	//无图图像
	var nullimg = 'images/error.png';
	function lod(t) {
	    t.onerror = null;
	    t.src = nullimg;  
	}
})
