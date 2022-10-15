(function ($) {
    
    "use strict";

    /***------------- Fixed Menu  -----------------***/

    var posWrapHeader = $('.topbar').height();
    var header = $('.container-menu-header');

    $(window).on('scroll',function(){

        if($(this).scrollTop() >= posWrapHeader) {
            $('.header').addClass('fixed-header');
            $(header).css('top',-posWrapHeader); 

        }  
        else {
            var x = - $(this).scrollTop(); 
            $(header).css('top', x); 
            $('.header').removeClass('fixed-header');
        }  
    });

    /***------------- Show Menu Mobile  -----------------***/

    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.wrap-side-menu').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu');

    for(var i = 0; i < arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu').slideToggle();
            $(this).toggleClass('turn-arrow');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.wrap-side-menu').css('display') == 'block'){
                $('.wrap-side-menu').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }
            if($('.sub-menu').css('display') == 'block'){
                $('.sub-menu').css('display','none');
                $('.arrow-main-menu').removeClass('turn-arrow');
            }
        }
    });

    /***-------------- Back Top ---------------***/

    $(window).scroll(function(){
        if(this.scrollY > 500){
            $('.btn-scroll').addClass("show");
        }else{
            $('.btn-scroll').removeClass("show");
        }
    });

    $('.btn-scroll').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });
       
    /***----------- Slider Home ----------***/

    function mainSlider() {
        var BasicSlider = $(".slider-active");
        BasicSlider.on("init", function (e, slick) {
            var $firstAnimatingElements = $(".single-slider:first-child").find("[data-animation]");
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on(
            "beforeChange",
            function (e, slick, currentSlide, nextSlide) {
                var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find("[data-animation]");
                doAnimations($animatingElements);
            }
        );
        BasicSlider.slick({
            autoplay: false,
            autoplaySpeed: 4000,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow:
                '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
            nextArrow:
                '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    },
                },
            ],
        });

        function doAnimations(elements) {
            var animationEndEvents =
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data("delay");
                var $animationType = "animated " + $this.data("animation");
                $this.css({
                    "animation-delay": $animationDelay,
                    "-webkit-animation-delay": $animationDelay,
                });
                $this
                    .addClass($animationType)
                    .one(animationEndEvents, function () {
                        $this.removeClass($animationType);
                    });
            });
        }
    }
    mainSlider();

    /***---------- Background Image ---------***/

    $("[data-background]").each(function () {
        $(this).css(
            "background-image",
            "url(" + $(this).attr("data-background") + ")"
        );
    });

    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /***------------ Video Popup -----------***/

	const videoSrc = $("#playerOne").attr("src");

	$(".video-btn, #video-popup").on("click", function() {
		if ($("#video-popup").hasClass("open")) {
			$("#video-popup").removeClass("open");
			$("#playerOne").attr("src", "");
		}
		else {
			$("#video-popup").addClass("open");
			if ($("#playerOne").attr("src") == '') {
				$("#playerOne").attr("src", videoSrc);
			}
		}
	});

    /***------------ Video Slider -----------***/

    $(".video-slider").owlCarousel({
        items: 4,
        dots: false,
        autoplay: false,
        margin: 0,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
        }
    });

    /***------------ Products Slider -----------***/

    $(".product-slider").owlCarousel({
        items:1,
        autoplay:false,
        autoplayTimeout: 5000,
        loop:true,
        nav:true,
        navText: ["<img src='assets/img/products/prev.png'>","<img src='assets/img/products/next.png'>"],
        dots:false
    });

    /***------------ Testimonial Slider -----------***/

    $(".testimonial-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    /***------------ Products Details Slider -----------***/

    $(".product-details-slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    $('.product-details-slider img').on('click', function() {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product-item-large').attr('src');
        if (imgurl != bigImg) {
            $('.product-item-large').attr({
                src: imgurl
            });
        }
    });
    

})(jQuery);
