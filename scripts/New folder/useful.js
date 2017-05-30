(function(){
    //replate html symbols
    String.prototype.htmlEscape = function () {
        let escapedString = String (this)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39');

        return escapedString;
    };
}());
(function ($) {
    $(document).ready(function () {
        'use strict';
        //Caching  the dom
        var
            $caruselCont = $('#main-gallery'),
            $mainGallery = $('#carusel'),//ul
            $slideItems = $mainGallery.children('.slide'),//li
            $rightSlideButton = $caruselCont.find('#right-side-button'),
            $leftSlideButton = $caruselCont.find('#left-side-button'),
            $bullets = $('.bullets').children('.bullet'),
            currentSlide = 0;
        var slideInterval = setInterval(nextSlide, 2500);
        
        function nextSlide() {
            changeSlide(currentSlide + 1);
        }
        function previousSlide() {
            changeSlide(currentSlide - 1);
        }
        function changeSlide(n) {
            $slideItems[currentSlide].className = 'slide';
            $bullets[currentSlide].className = 'bullet';
            currentSlide = (n +$slideItems.length) % $slideItems.length;
            $slideItems[currentSlide].className = 'slide js-slide-visible';
            $bullets[currentSlide].className = 'bullet active';
        }

        $('#right-side-button').on('click ', function () {
            nextSlide();
            clearInterval(slideInterval);
        });
        $('#left-side-button').on('click ', function () {
            previousSlide();
            clearInterval(slideInterval);
        });

        $('.bullets').on('click','.bullet', function (){
                var $t = $(this).index('.bullet');
            changeSlide($t);
            clearInterval(slideInterval);
        });

    });
}(jQuery));
(function ($) {
    $(document).ready(function () {
        'use strict';
        var carusel = (function () {
           var currentSlide = 0;
           var Carusel = function (slideItems, slideClass, slideActiveClass, bulletItems, bulletClass, bulletActiveClass) {
                this.slideItems = slideItems;
                this.slideClass = slideClass;
                this.slideActiveClass = slideActiveClass;
                this.bulletItems = bulletItems;
                this.bulletClass = bulletClass;
                this.bulletActiveClass = bulletActiveClass;
           
            };

            Carusel.prototype.nextSlide = function () {
                this.changeSlide(currentSlide + 1);
            };
            Carusel.prototype.previousSlide = function () {
                this.changeSlide(currentSlide - 1);
            };
            
            Carusel.prototype.changeSlide = function (n) {
                this.slideItems[currentSlide].className = slideClass;
                this.bulletItems[currentSlide].className = bulletClass;
                currentSlide = (n + this.slideItems.length) % $slideItems.length;
                this.slideItems[currentSlide].className = slideClass + ' ' + slideActiveClass;
                this.bulletItems[currentSlide].className = bulletClass + ' ' + bulletActiveClass;
            };

            return Carusel;
        }());
        var
            $caruselCont = $('#main-gallery'),
            $mainGallery = $('#carusel'),//ul
            $slideItems = $mainGallery.children('.slide'),//li
            slideClass = 'slide',
            slideActiveClass = 'js-slide-visible',
            $rightSlideButton = $caruselCont.find('#right-side-button'),
            $leftSlideButton = $caruselCont.find('#left-side-button'),
            $bullets = $('.bullets').children('.bullet'),
            bulletClass = 'bullet',
            bulletActiveClass = 'active';

        var firstCarusel = new carusel($slideItems, slideClass, slideActiveClass, $bullets, bulletClass, bulletActiveClass);
        //auto change  the images
        var slideInterval = setInterval(function (){
            firstCarusel.nextSlide();
        }, 1500);

            $('#right-side-button').on('click ', function () {
                firstCarusel.nextSlide();
                clearInterval(slideInterval);
            });
            $('#left-side-button').on('click ', function () {
                firstCarusel.previousSlide();
                clearInterval(slideInterval);
            });

            $('.bullets').on('click','.bullet', function (){
                    var $t = $(this).index('.bullet');
                firstCarusel.changeSlide($t);
                clearInterval(slideInterval);
            });

        });
    }(jQuery));

