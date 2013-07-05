$(document).ready(function() {
    
    /*
    $('.home-page .preview-list a').on('click', function(e) {
        
        e.preventDefault();
        
        var source = $(this).find('img').attr('src');
        
        $('.home-page .preview-list li.active').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.home-page .preview img').attr('src', $(this).find('img').attr('src'));
        
        $(window).scrollTop(0);
        
    });
    */
    
    
    /*
    showScrollUpBtn();
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        
        $(document).on('touchmove touchend', function() {
            showScrollUpBtn();
        });
        
    }
    $(document).on('scroll', function() {
        showScrollUpBtn();
    });    
    
    $('#scroll-up').on('click', function() {
        $('html, body').animate({scrollTop: '0px'}, { duration: 200, complete: showScrollUpBtn });
        showScrollUpBtn();
    });    
    
    function showScrollUpBtn() {
        
        if ($(window).scrollTop() > 0) {
            $('#scroll-up').css('display', 'block');
        }
        else {
            $('#scroll-up').css('display', 'none');
        }
        
    }
    */
    
    $('.slider-wrap, .collage-wrap').addClass('no-display');
});

$(window).load(function() {
    
    $('.slider-wrap, .collage-wrap').removeClass('no-display');

    var $window = $(window),
        slideNum = parseInt(location.hash.replace('#', '')) || 0,
        $slider = $('#slider'),
        $collage = $('#collage'),
        $sliderWrap = $('.slider-wrap'),
        $backToCollage = $('#back-to-gallery'),
        $collageLink = $('#collage a'),
        $leftControl = $('.control-left'),
        $rightControl = $('.control-right'),
        slideCounter = 0;
    
    
    $collage.masonry();
    
    
    $slider.css('width', function() {
        
        var width = 0;
        
        $(this).find('li').each(function() {
            
            slideCounter++;
            
            $(this).css('width', $(this).find('img').width());
            $(this).attr('data-slide-id', slideCounter);
            width = width + $(this).width() + parseInt($(this).css('margin-left'));
            
        });
        
        return width;
        
    });

    
    
    if ($collage.find('a[href="#'+slideNum+'"]').length == 0) {
        
        $('.wrapper').removeClass('slider-enabled');
        $sliderWrap.addClass('no-display');
        
    }
    else {
        
        $('.wrapper').addClass('slider-enabled');
        $collage.addClass('no-display');
        moveToSlide(slideNum);
        
    }
    
    
    setTimeout(function(){
        $slider.addClass('transition');
    }, 100);     
    
    
    $collageLink.on('click', function() {
        
        $('.wrapper').addClass('slider-enabled');
        
        $collage.addClass('no-display');
        $sliderWrap.removeClass('no-display');
        
        slideNum = parseInt($(this).attr('href').split('#')[1]);
        
        $slider.removeClass('transition');
        moveToSlide(slideNum);
        
        setTimeout(function(){
            $slider.addClass('transition');
        }, 100);        
        
    });
    
    $backToCollage.on('click', function() {
        
        $('.wrapper').removeClass('slider-enabled');
        
        $collage.removeClass('no-display');
        $sliderWrap.addClass('no-display');
        
        $collage.masonry();
        
    });
    
    
    $leftControl.on('click', function(e) {
        
        e.preventDefault();
        prev();
        
    });
    
    $rightControl.on('click', function(e) {
        
        e.preventDefault();
        next();
        
    });
    
    
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
        
        console.log(slideNum);
        
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
        
    }
    
    
});
