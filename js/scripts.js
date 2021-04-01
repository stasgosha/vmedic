// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .mobile-top-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});



document.addEventListener('DOMContentLoaded', function(){

	// Page Nav Highlighting
	// Cache selectors
	let topMenu = $('.page-nav');

	let lastId,
		topMenuHeight = 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});

	// Bind to scroll
	$(window).scroll(function() {
		let fromTop = $(this).scrollTop() + topMenuHeight + 300;

		let cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop){
				if ($(this).offset().top + $(this).outerHeight() > $(window).scrollTop() + $(window).height()) {
					return this;
				}
			}
		});

		cur = cur[cur.length - 1];
		let id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems.removeClass("active");
			menuItems.filter("[href='#" + id + "']").addClass("active");
		}
	});

	// Mobile top nav
	$('.mobile-top-nav').each(function(i, el){
		let currentLayer = 1;

		function goDeep(selector) {
			currentLayer++;

			console.log(selector);

			$(selector).show().siblings().hide();
			$(el).attr('data-layer', currentLayer);
		}

		function goBack(){
			currentLayer--;
			$(el).attr('data-layer', currentLayer);
		}

		$(el).find('[data-subnav]').click(function(e){
			e.preventDefault();

			goDeep( $(this).data('subnav') );
		});

		$(el).find('.back-link').click(function(e){
			e.preventDefault();

			goBack();
		});

		let tabMenu = $(el).find('.tab-menu');

		tabMenu.find('.menu-item-has-children').click(function(e){
			$(this).find('.sub-menu').stop().slideToggle(300);
			$(this).toggleClass('opened');
		});

		tabMenu.find('.menu-item-has-children a').click(e => e.preventDefault());
	});

	// header search
	$('.header-search-block .block-opener').click(function(e){
		e.preventDefault();

		$(this).closest('.header-search-block').toggleClass('opened');
	});

	// Accordions
	$('.accordion, .js-accordion').each(function(i, el){
		$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			$(el).find('> .ac-content').stop().slideToggle(300);
			// $(el).find('.slick-slider').slick('setPosition');
			$(el).toggleClass('opened');
		});

		if ($(el).hasClass('opened-on-load')) {
			$(el).find('.ac-header').trigger('click');
		}
	});

	// Sticky Page Nav
	// if ( $('section').is('.services-top-section') ) {
	// 	$('.services-top-section').each(function(i, el){
	// 		let sectionBottom = $(el).find('.section-bottom');

	// 		let pageNavTopOffset = sectionBottom.offset().top;
	// 		let headerHeight = 72;


	// 		$(window).scroll(function(e){
	// 			let diff = $(window).scrollTop() + headerHeight - pageNavTopOffset;

	// 			if ($(window).scrollTop() + headerHeight > pageNavTopOffset) {
	// 				sectionBottom.css({
	// 					transform: 'translateY('+diff+'px)'
	// 				});
	// 			} else{
	// 				sectionBottom.css({
	// 					transform: 'translateY(0)'
	// 				});
	// 			}
	// 		});
	// 	});
	// }

	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	$('[data-fancybox]').fancybox();

	// Fields
	$('.input-wrapper input').on('change keyup', function(e){
		if ($(this).val() !== '') {
			$(this).addClass('not-empty');
		} else{
			$(this).removeClass('not-empty');
		}
	});

	// Select Field
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: true,
		fakeDropInBody: false
	});

	jcf.replace( $('.select-field select') );

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M10 2L8 0 0 8.2l8 8.2 2-2-6.2-6.2L10 2z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M0 2l2-2 8 8.2-8 8.2-2-2 6.2-6.2L0 2z"/></svg></button>'
	}

	$('.actions-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 600,
		...arrowsButtons
	});

	equalSlideHeight('.actions-slider');

	$('.clinic-doctors-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 600,
		...arrowsButtons,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	equalSlideHeight('.clinic-doctors-slider');

	$('.licenses-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 600,
		...arrowsButtons,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	equalSlideHeight('.licenses-slider');

	$('.gallery-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 600,
		...arrowsButtons,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	equalSlideHeight('.gallery-slider');

	$('.partners-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 600,
		...arrowsButtons,
		responsive: [
			{
				breakpoint: 1330,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			}
		]
	});

	// Filter
	$('.section-filter-block').each(function(i, el){
		$(el).find('.show-more-options-btn').click(function(e){
			e.preventDefault();

			$(this).toggleClass('active');

			$(el).find('.block-hidden-content').stop().slideToggle(300);
		});
	});

	// Location select
	function updateSelectedLocation(el, selected){
		$(el).find('.selected-option').html(selected.clone(true));

		$(selected).addClass('selected').siblings().removeClass('selected');

		$(el).find('.dropdown').removeClass('visible');
		$(el).removeClass('dropdown-opened');
	}

	$('.location-select').each(function(i, el){
		let preselected = $(el).find('.option.selected');

		if (preselected.length > 0) {
			updateSelectedLocation(el, preselected.eq(0));
		} else{
			updateSelectedLocation(el, $(el).find('.dropdown .option').eq(0));
		}

		$(el).find('.selected-option').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			$(el).toggleClass('dropdown-opened');
			$(el).find('.dropdown').toggleClass('visible');
		});

		$(el).find('.dropdown .option').click(function(e){
			updateSelectedLocation(el, $(this));
		});
	});

	$(document).mouseup(function (e){
		var div = $(".location-select");
		if (!div.is(e.target)
			&& div.has(e.target).length === 0) {
			
			div.removeClass('dropdown-opened').find('.dropdown').removeClass('visible');
		}
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 72;

		if ($(window).width() < 992) {
			offset = 56;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	// if ($(window).width() < 768) {
	// 	$('.mobile-top-nav a').click(function(e){
	// 		$('.menu-opener').trigger('click');
	// 	});
	// }

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 90
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').parent().siblings().find('[data-tab]').removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab');

		goToTab(dest, $(this));

		// $(dest).find('.slick-slider').slick('setPosition');
	});

	$(".filter-nav, .tabs-nav, .cmp-tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});


	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');
		$(this).find('.block-overlay').fadeOut(300);

		let videoId = $(this).find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = $(this).data('video-id');
		}

		if (videoId == undefined) {
			$(this).find('video')[0].play();
		} else{
			let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			} else if(videoType == 'vimeo'){
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});

function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', 0);
}