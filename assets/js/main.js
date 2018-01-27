"use strict";


jQuery(document).ready(function ($) {


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

    $('#contact-button').click(function(e){
        e.preventDefault();
        var name = $('#name-field').innerText;
        var email = "austin.atmaja@gmail.com";
        var text = $('#message-field')[0].value;
        var dataString = 'name='+ name + '&email=' + email + '&text=' + text;

        $.ajax({
            type: "POST",
            url: "email.php",
            data: dataString,
            success: function(){
                alert('Contact request sent');
            },
            error: function(xhr, status){
                console.log(xhr.error);
            }
        });
    }); 


    //End
});
