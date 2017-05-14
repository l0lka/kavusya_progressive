var $ = jQuery = require('jquery');
var Handlebars = require('handlebars');

require('./bootstrap_custom');

$(function() {
    var topoffset = 50;

    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('../../build/sw.js')
    //         .then(function(){
    //             console.log('Service Worker Active');
    //         })
    // }

    $.getJSON('../data/coffee.json', function(data){
        $('.loader').fadeOut(1000);
        var slideshowTemplate = $('#slideshow-template').html();
        var slideshowScript = Handlebars.compile(slideshowTemplate);

        var adoptionTemplate = $('#specials-template').html();
        var adoptionScript = Handlebars.compile(adoptionTemplate);

        var appointmentTemplate = $('#appointments-template').html();
        var appointmentScript = Handlebars.compile(appointmentTemplate);

        $('#slideshow-content').append(slideshowScript(data));
        $('#specials-content').append(adoptionScript(data));
        $('#appointments-content').append(appointmentScript(data));

        //Replace IMG inside carousels with background image

        $('#slideshow .item img').each(function () {
            var imgSrc = $(this).attr('src');
            $(this).parent().css({'background-image': 'url(' + imgSrc + ')'});
            $(this).remove();
        });

        //Activate carousel
        $('.carousel').carousel({
            pause: false
        })
    });


    $(document).on('click', '.opencoffeemodal', function () {
        $('.modal-coffeename').html($(this).data('coffeename'));
        $('.modal-coffeebreed').html($(this).data('coffeebreed'));
        $('.modal-coffeeowner').html($(this).data('coffeeowner'));
        $('.modal-coffeeinfo').html($(this).data('coffeeinfo'));
        $('.modal-coffeeimage').attr('src', 'images/menu/' + $(this).data('coffeeimage') + '.jpg');
        $('.modal-coffeeimage').attr('alt', $(this).data('coffeeimage') + ' photo');
    });

    $('.navbar-fixed-top').on('activate.bs.scrollspy', function () {
        var hash = $(this).find('li.active a').attr('href');

        if (hash != '#slideshow') {
            $('header nav').addClass('inbody');
        } else {
            $('header nav').removeClass('inbody');
        }
    });

    //Use smooth scrolling when clicking on navigation
    $('.navbar a').click(function() {
        if (location.pathname.replace(/^\//,'') ===
            this.pathname.replace(/^\//,'') &&
            location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top-topoffset+2
                }, 500);
                return false;
            } //target.length
        } //click function
    }); //smooth scrolling


    $('body').scrollspy({
        target: 'header .navbar',
        offset: topoffset

    });
});



