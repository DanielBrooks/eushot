$(document).ready(function() {
    
    $('.home-page .preview-list a').on('click', function(e) {
        
        e.preventDefault();
        
        var source = $(this).find('img').attr('src');
        
        $('.home-page .preview-list li.active').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.home-page .preview img').attr('src', $(this).find('img').attr('src'));
        
    });
    
});
