"use strict";

jQuery(document).ready(function ($) {
    window.location.hash = "#home";
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-menu').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 70)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });

    $('#learn_more_btn').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 70)
                }, 1000);
                return false;
            }
        }
    });

    $('#vertical-carousel-btn').click(function(){
        console.log($('#vertical-carousel-text')[0].innerText);
        if($('#vertical-carousel-text')[0].innerText == 'Learn More About Us'){
            $('#vertical-carousel-text')[0].innerText = 'Meet Our Team Members';
        }
        else{
            $('#vertical-carousel-text')[0].innerText = 'Learn More About Us';
        }
    });

    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('#contact-button').click(function(){
            $('#snackbar').addClass('show');
            setTimeout(function(){  
                $('#snackbar').removeClass('show'); 
            }, 3000);
    });

    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $.localScroll();



// scroll Up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    }); 

    if($.browser.chrome){
        $('#vid').attr("controls", "controls");
    }
    //End
});
