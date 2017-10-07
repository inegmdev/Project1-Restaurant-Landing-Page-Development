$(document).ready(function () {

	// DOM
	var $header = $('header');
	var $mainSectionBg = $('.section.main-section .background-img');
	var $nav = $header.find('nav');
	var $mainSection = $('.section.main-section');


	// common functions
	var stickyScroll = function () {
		var overallHeaderHeight = $header.height() + parseInt($header.css('padding-top')) + parseInt($header.css('padding-bottom'));
		var mainSectionOverallHeight = $mainSection.height() + parseInt($mainSection.css('padding-top'));
		if ($(window).scrollTop() >= mainSectionOverallHeight - overallHeaderHeight) {
			$header.addClass('sticky');
		} else {
			$header.removeClass('sticky');
		}
	}
	stickyScroll();



	/* nav-btn : Nav button click event */
	var clicked = false;
	$header.find('.nav-btn').click(function () {
		var $this = $(this);
		if (!clicked) {
			clicked = true;
			$this.parent().toggleClass('show-nav-list');
			setTimeout(function () {
				clicked = false;
			}, 700);
		}
	});
	/* nav-list : Check the click outside nav-list */
	$(document).on('click', function (e) {
		// check if the clicked target has a relation with the nav-list
		// if it isn't hide the nav-list
		if ($(e.target).closest('nav').length == 0 && $nav.hasClass('show-nav-list')) {
			$nav.removeClass('show-nav-list');
		}
	});
	/*window.scroll : check if scrolled enough to change the style of the navigation bar */
	$(window).scroll(stickyScroll);



	(function menuSlider() {
		var $sliderContainer = $('.menu-slider');
		var $slider = $('.slider');
		var $sliderBanner = $sliderContainer.find('.slider-banner');
		var $sliderItems = $sliderBanner.find('.slider-item');
		var itemsLength = $sliderItems.length;
		var $nextBtn = $sliderContainer.find('.arrow.next');
		var $prevBtn = $sliderContainer.find('.prev.arrow');

		var slidesToShow = 3;
		var activeSlides = slidesToShow;
		var itemWidth = 0;
		var itemsWidth = 0;

		function fixWidth() {
			// Calculate the new itemWidth
			itemWidth = Math.floor($slider.width() / slidesToShow);
			// Set the outerWidth of each slider item to be Slider.width/slidesToShow
			$sliderItems.outerWidth(itemWidth);
			// Set the $banner.width 
			itemsWidth = itemWidth * itemsLength;
			$sliderBanner.width(itemsWidth);
			// Debug
			console.log('New calculated itemWidth:', itemWidth);
		}
		fixWidth();

		function fixCurrentSlide() {
			fixWidth();
			if (activeSlides > itemsLength) activeSlides = itemsLength - slidesToShow;
			$sliderBanner.css('left', -(activeSlides - slidesToShow) * itemWidth);
		}
		fixCurrentSlide();

		function responsiveAdjust() {
			var windowWidth = $(window).width();
			activeSlides -= slidesToShow;
			if (windowWidth <= 991 && windowWidth > 550) {
				slidesToShow = 2;
			} else if (windowWidth <= 550)
				slidesToShow = 1;
			else {
				slidesToShow = 3;
			}
			activeSlides += slidesToShow;
			fixWidth();
			fixCurrentSlide();
			checkArrowStatus();
		}
		responsiveAdjust();

		$(window).resize(function () {
			responsiveAdjust();
		});



		function checkArrowStatus() {
			if (activeSlides == slidesToShow) {
				$prevBtn.addClass('disabled');
				$nextBtn.removeClass('disabled');
			} else if (activeSlides > slidesToShow && activeSlides < itemsLength) {
				$prevBtn.removeClass('disabled');
				$nextBtn.removeClass('disabled');
			} else {
				$prevBtn.removeClass('disabled');
				$nextBtn.addClass('disabled');
			}
		}
		checkArrowStatus();


		// Variable used to throttle the clicking event
		var clickedSlider = false;

		/*
		    Click Handler for the nextBtn
		 */
		$nextBtn.click(function () {

			responsiveAdjust();

			var currentLeft = parseInt($sliderBanner.css('left'));
			var currentRight = parseInt($sliderBanner.css('right'));

			if (!clickedSlider) {
				var nextLeft = currentLeft - itemWidth;
				var nextRight = currentRight + itemWidth;
				console.log('currentRight:', currentRight, ',nextRight:', nextRight, ',the remaining Right:', (itemsWidth - (slidesToShow * itemWidth)));
				if (nextRight <= (itemsWidth - (slidesToShow * itemWidth))) {
					activeSlides++;
					$sliderBanner.css('left', nextLeft);
					$sliderBanner.css('right', nextRight);
				}
				checkArrowStatus();
				clickedSlider = true;
				setTimeout(function () {
					clickedSlider = false;
				}, 400);
			}
		});

		/*
		    Click Handler for the nextBtn
		 */
		$prevBtn.click(function () {
			responsiveAdjust();
			var currentLeft = parseInt($sliderBanner.css('left'));
			var currentRight = parseInt($sliderBanner.css('right'));

			if (!clickedSlider) {
				var nextLeft = currentLeft + itemWidth;
				var nextRight = currentRight - itemWidth;
				console.log('currentLeft:', currentLeft, ',nextLeft:', nextLeft);
				if (nextLeft <= 0) {
					activeSlides--;
					currentRight -= itemWidth;
					$sliderBanner.css('right', currentRight);
					$sliderBanner.css('left', -currentRight);
				}
				checkArrowStatus();
				clickedSlider = true;
				setTimeout(function () {
					clickedSlider = false;
				}, 400);
			}
		});

	})();



	(function testimonialSlider() {
		var $sliderContainer = $('.chief-slider');
		var $slider = $sliderContainer.find('.slider');
		var $sliderBanner = $sliderContainer.find('.slider-banner');
		var $sliderItems = $sliderBanner.find('.slider-item');
		var itemsLength = $sliderItems.length;
		var $nextBtn = $sliderContainer.find('.arrow.next');
		var $prevBtn = $sliderContainer.find('.prev.arrow');

		var slidesToShow = 1;
		var activeSlides = slidesToShow;
		var itemWidth = 0;
		var itemsWidth = 0;

		function fixWidth() {
			// Calculate the new itemWidth
			itemWidth = Math.floor($slider.width() / slidesToShow);
			// Set the outerWidth of each slider item to be Slider.width/slidesToShow
			$sliderItems.outerWidth(itemWidth);
			// Set the $banner.width 
			itemsWidth = itemWidth * itemsLength;
			$sliderBanner.width(itemsWidth);
			// Debug
			console.log('New calculated itemWidth:', itemWidth);
		}
		fixWidth();

		function fixCurrentSlide() {
			fixWidth();
			if (activeSlides > itemsLength) activeSlides = itemsLength - slidesToShow;
			$sliderBanner.css('left', -(activeSlides - slidesToShow) * itemWidth);
		}
		fixCurrentSlide();

		function responsiveAdjust() {
			fixWidth();
			fixCurrentSlide();
			checkArrowStatus();
		}
		responsiveAdjust();

		$(window).resize(function () {
			responsiveAdjust();
		});



		function checkArrowStatus() {
			if (activeSlides == slidesToShow) {
				$prevBtn.addClass('disabled');
				$nextBtn.removeClass('disabled');
			} else if (activeSlides > slidesToShow && activeSlides < itemsLength) {
				$prevBtn.removeClass('disabled');
				$nextBtn.removeClass('disabled');
			} else {
				$prevBtn.removeClass('disabled');
				$nextBtn.addClass('disabled');
			}
		}
		checkArrowStatus();


		// Variable used to throttle the clicking event
		var clickedSlider = false;

		/*
		    Click Handler for the nextBtn
		 */
		$nextBtn.click(function () {

			responsiveAdjust();

			var currentLeft = parseInt($sliderBanner.css('left'));
			var currentRight = parseInt($sliderBanner.css('right'));

			if (!clickedSlider) {
				var nextLeft = currentLeft - itemWidth;
				var nextRight = currentRight + itemWidth;
				console.log('currentRight:', currentRight, ',nextRight:', nextRight, ',the remaining Right:', (itemsWidth - (slidesToShow * itemWidth)));
				if (nextRight <= (itemsWidth - (slidesToShow * itemWidth))) {
					activeSlides++;
					$sliderBanner.css('left', nextLeft);
					$sliderBanner.css('right', nextRight);
				}
				checkArrowStatus();
				clickedSlider = true;
				setTimeout(function () {
					clickedSlider = false;
				}, 400);
			}
		});

		/*
		    Click Handler for the nextBtn
		 */
		$prevBtn.click(function () {
			responsiveAdjust();
			var currentLeft = parseInt($sliderBanner.css('left'));
			var currentRight = parseInt($sliderBanner.css('right'));

			if (!clickedSlider) {
				var nextLeft = currentLeft + itemWidth;
				var nextRight = currentRight - itemWidth;
				console.log('currentLeft:', currentLeft, ',nextLeft:', nextLeft);
				if (nextLeft <= 0) {
					activeSlides--;
					currentRight -= itemWidth;
					$sliderBanner.css('right', currentRight);
					$sliderBanner.css('left', -currentRight);
				}
				checkArrowStatus();
				clickedSlider = true;
				setTimeout(function () {
					clickedSlider = false;
				}, 400);
			}
		});

	})();





});