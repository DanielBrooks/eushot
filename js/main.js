$(document).ready(function() {
    
    $('.slider-wrap, .collage-wrap, .blog-wrap').addClass('no-display');
    
});

$(window).load(function() {
    
    $('.slider-wrap, .collage-wrap, .blog-wrap').removeClass('no-display');
    
    var $window = $(window),
        slideNum = parseInt(location.hash.replace('#', '')) || 0,
        $slider = $('#slider'),
        $collage = $('#collage'),
        $sliderWrap = $('.slider-wrap'),
        $backToCollage = $('#back-to-gallery'),
        $collageLink = $('#collage a'),
        $leftControl = $('.control-left'),
        $rightControl = $('.control-right'),
        slideCounter = 0,
        startX,
        endX,
        startY,
        endY,    
        sliderScrollPos,
        leftBorder,
        rightBorder,
        collageScrollPos;
    
    
    homeSliderInit();
    
    
    $('#blog').masonry();
    $collage.masonry();
    
    $slider.find('li').each(function() {
        
        slideCounter++;
        
        $(this).attr('data-slide-id', slideCounter);
        
    });

    calculateSliderSizes();
    
    $(window).on('orientationchange', function() {
        $('.slider-wrap, .collage-wrap, .blog-wrap').removeClass('no-display');
        $('#blog').masonry();
        
        $collage.masonry();
        calculateSliderSizes();
        homeSliderInit();
    });
    
    
    $collageLink.on('click', function(e) {
        
        e.preventDefault();
        
        collageScrollPos = $window.scrollTop();
        
        $('.wrapper').addClass('slider-enabled');
        
        $sliderWrap.removeClass('no-display');
        $collage.addClass('no-display');
        
        slideNum = parseInt($(this).attr('href').split('#')[1]);
        
        $slider.removeClass('transition');
        moveToSlide(slideNum);
        
        setTimeout(function(){
            $slider.addClass('transition');
        }, 100);        
        
    });
    
    $backToCollage.on('click', function(e) {
        
        e.preventDefault();
        
        $('.wrapper').removeClass('slider-enabled');
        
        $collage.removeClass('no-display');
        $sliderWrap.addClass('no-display');
        
        $collage.masonry();
        
        $('html, body').animate({scrollTop: collageScrollPos}, 250);
        
        history.pushState('', document.title, window.location.pathname);
        
    });
    
    
    $leftControl.on('click', function(e) {
        
        e.preventDefault();
        prev();
        
    });
    
    $rightControl.on('click', function(e) {
        
        e.preventDefault();
        next();
        
    });
    
    
    $sliderWrap.on('mousewheel', function(e) {
        
        e.preventDefault();
        
        var delta = -e.originalEvent.detail || e.originalEvent.wheelDelta;
        
        if (delta < 0) {
            next();
        }
        else if (delta > 0) {
            prev();
        }
        
    });
    
    
    $sliderWrap.on("touchstart", function(event) {
        
        if ( $(event.target).hasClass('control') || $(event.target).closest('a').hasClass('control') ) {
            
            event.preventDefault();
            
            $(event.target).trigger('click');
            
            return;
        }
        
        startX = endX = event.originalEvent.touches[0].pageX;
        startY = endY = event.originalEvent.touches[0].pageY;
        
        $slider.removeClass('transition');
        
        sliderScrollPos = parseInt($slider.css('left'));
        
    });
    
    $sliderWrap.on("touchmove", function(event) {
        
        if ( $(event.target).hasClass('control') || $(event.target).closest('a').hasClass('control') ) {
            
            return;
        }
        
        event.preventDefault();
        
        endX = event.originalEvent.touches[0].pageX;
        endY = event.originalEvent.touches[0].pageY;
        
        if ( (sliderScrollPos + endX - startX <= leftBorder) &&
            (sliderScrollPos + endX - startX >= rightBorder) ) {
            
            $slider.css('left', sliderScrollPos + endX - startX);
            
        }
        else if (sliderScrollPos + endX - startX > leftBorder) {
            
            $slider.css('left', leftBorder);
            
        }
        else if (sliderScrollPos + endX - startX < rightBorder) {
            
            $slider.css('left', rightBorder);
            
        }
        
    });
    
    $sliderWrap.on("touchend", function(event) {
        
        if ( $(event.target).hasClass('control') || $(event.target).closest('a').hasClass('control') ) {
            
            return;
        }
        
        $slider.addClass('transition');
        
        if (Math.abs(endX - startX) > 30) {
            
            if (endX - startX <= 0) {
                
                swipeNext();
                
            }
            else {
                
                swipePrev();
                
            }
            
        }
        else {
            
            $slider.css('left', sliderScrollPos);
            
        }
        
    });
    
    
    function homeSliderInit() {
        
        $('.home-page .preview-slider').anythingSlider();
        $('.preview-slider').css('height', $('.preview-slider').find('img').height());
        
        
    }
    
    
    function calculateSliderSizes() {
        
        $slider.removeClass('transition');
        
        slideNum = parseInt(location.hash.replace('#', '')) || 0;
        
        $slider.css('width', function() {
            
            var width = 0;
            
            $(this).find('li').each(function() {
                $(this).css('width', $(this).find('img').width());
                width = width + $(this).width() + parseInt($(this).css('margin-left'));
                
            });
            
            return width;
            
        });
        
        // Borders have to be calculated BEFORE the slider is hidden
        leftBorder = $sliderWrap.width() / 2 - $slider.find('li[data-slide-id="1"]').width() / 2;
        rightBorder = $sliderWrap.width() / 2 - $slider.width() + $slider.find('li[data-slide-id="'+slideCounter+'"]').width() / 2;
        
        // Determine whether the url is pointing out a specific slide or the collage in general
        if ($collage.find('a[href="#'+slideNum+'"]').length == 0) {
            
            $('.wrapper').removeClass('slider-enabled');
            $sliderWrap.addClass('no-display');
            
        }
        else {
            
            $('.wrapper').addClass('slider-enabled');
            $collage.addClass('no-display');
            moveToSlide(slideNum);
            
        }
        
        // Adding transition effect to the slider. Time out is set for the case when a slide is being opened directly
        setTimeout(function(){
            $slider.addClass('transition');
        }, 100);     
        
    }
    
    
    function swipePrev() {
        
        var $prev = $('li[data-slide-id="'+slideNum+'"]').prev();
        
        
        prev();
        
        if ( parseInt($prev.offset().left) >= $window.width() / 2 - $prev.width() / 2 ) {
            
            swipePrev();
            
        }
        
    }
    
    function swipeNext() {
        
        var $next = $('li[data-slide-id="'+slideNum+'"]').next();
        
        
        next();
        
        if ( parseInt($next.offset().left) <= $window.width() / 2 - $next.width() / 2 ) {
            
            swipeNext();
            
        }
        
    }
    
    
    function prev() {
        
        if (slideNum > 1) {
            slideNum--;
            moveToSlide(slideNum);
        }
        
    }
    
    function next() {
        
        if (slideNum < slideCounter) {
            slideNum++;
            moveToSlide(slideNum);
        }
        
    }
    
    function moveToSlide(slideNum) {
        
        var $theSlide = $('li[data-slide-id="'+slideNum+'"]'),
            slideShift = parseInt($theSlide.offset().left) - ($window.width() / 2 - $theSlide.width() / 2);
        
        if (slideNum == 1) {
            $leftControl.addClass('no-display');
        }
        else if (slideNum == slideCounter) {
            $rightControl.addClass('no-display');
        }
        else {
            $leftControl.removeClass('no-display');
            $rightControl.removeClass('no-display');
        }
        
        $slider.css('left', parseInt($slider.css('left')) - slideShift);
        
        location.href = '#' + slideNum;
        
    }
    
    
});
