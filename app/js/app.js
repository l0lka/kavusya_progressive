var $ = jQuery = require('jquery');
require('./bootstrap_custom');
var Handlebars = require('handlebars');

$(function() {
    var topoffset = 50;

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('../../build/sw.js')
            .then(function(){
                console.log('Service Worker Active');
            })
    }

    $.getJSON('../../data/pets.json', function(data){
        $('.loader').fadeOut(1000);
        var slideshowTemplate = $('#slideshow-template').html();
        var slideshowScript = Handlebars.compile(slideshowTemplate);

        var adoptionTemplate = $('#adoption-template').html();
        var adoptionScript = Handlebars.compile(adoptionTemplate);

        var appointmentTemplate = $('#appointments-template').html();
        var appointmentScript = Handlebars.compile(appointmentTemplate);

        $('#slideshow-content').append(slideshowScript(data));
        $('#adoption-content').append(adoptionScript(data));
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

    $(document).on('click', '.openpetmodal', function () {
        $('.modal-petname').html($(this).data('petname'));
        $('.modal-petbreed').html($(this).data('petbreed'));
        $('.modal-petowner').html($(this).data('petowner'));
        $('.modal-petinfo').html($(this).data('petinfo'));
        $('.modal-petimage').attr('src', 'images/pets/' + $(this).data('petimage') + '.jpg');
        $('.modal-petimage').attr('alt', $(this).data('petimage') + ' photo');
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

    })
});