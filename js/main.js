$(document).ready(function() {

	/* Apply discount to all book prices */
	setTimeout(function() {
		applyBookDiscounts();
	}, 100);
	
	/* Navigation burger onclick side navigation show */
	$('.burger-container').on('click', function() {
		$('.main-navigation').toggle('slow');

		if($('#myBtn').hasClass('change')) {
			$('body').addClass('stop-scroll');
		} else {
			$('body').removeClass('stop-scroll');
		}
	});


	/* About me slider */
	$('.about-me-slider').slick({
		slidesToShow: 1,
		prevArrow: '<span class="span-arrow slick-prev"><</span>',
		nextArrow: '<span class="span-arrow slick-next">></span>'
	});

	/* Blog slider */
	$('.blog-slider').slick({
		slidesToShow: 2,
		prevArrow: '<span class="span-arrow slick-prev"><</span>',
		nextArrow: '<span class="span-arrow slick-next">></span>',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});
	
});



var counta = 0;

$(window).scroll(function(e){


	/* Onscroll number counter */
	var statisticNumbers = $('.single-count');
	if(statisticNumbers.length) {
		var oTop = statisticNumbers.offset().top - window.innerHeight;
		if (counta == 0 && $(window).scrollTop() > oTop) {
			$('.count').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				},

				{
					duration: 2000,
					easing: 'swing',
					step: function() {
						$this.text(Math.floor(this.countNum));
					},
					complete: function() {
						$this.text(this.countNum);
					}
				});
			});
			counta = 1;
		}
	}

});

/* Discount Calculation Function */
/* DISCOUNT PERCENTAGE - Change this value to update discount across all pages */
/* Set to 0 to show original price only (no discount effect) */
var DISCOUNT_PERCENTAGE = 20;

function applyBookDiscounts() {
	// Get all price elements
	var priceElements = document.querySelectorAll('.single-book__price');
	
	priceElements.forEach(function(priceElement) {
		var priceText = priceElement.textContent.trim();
		
		// Extract the numeric value (remove ₹ and spaces)
		var originalPrice = parseFloat(priceText.replace('₹', '').replace(/\s/g, ''));
		
		if (!isNaN(originalPrice) && originalPrice > 0) {
			originalPrice = Math.round(originalPrice);
			
			var priceHTML;
			
			// If discount is 0, show original price without any effects
			if (DISCOUNT_PERCENTAGE === 0) {
				priceHTML = '<span class="single-book__price" style="color: #c18f59; font-size: 18px; font-weight: 600; font-style: italic; text-decoration: none;">₹ ' + originalPrice + '</span>';
			} else {
				// Calculate discounted price
				var discountedPrice = originalPrice * (1 - DISCOUNT_PERCENTAGE / 100);
				discountedPrice = Math.round(discountedPrice);
				
				// Create the new HTML structure with discount
				priceHTML = 
					'<div class="single-book__price-wrapper">' +
						'<span class="single-book__price-original">₹ ' + originalPrice + '</span>' +
						'<span class="single-book__price-discounted">₹ ' + discountedPrice + '</span>' +
						'<span class="single-book__discount-badge">' + DISCOUNT_PERCENTAGE + '% OFF</span>' +
					'</div>';
			}
			
			// Replace the old price element with the new structure
			priceElement.outerHTML = priceHTML;
		}
	});
}