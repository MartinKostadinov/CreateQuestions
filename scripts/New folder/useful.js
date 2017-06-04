(function () {
    //replate html symbols
    String.prototype.htmlEscape = function () {
        let escapedString = String(this)
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
            currentSlide = (n + $slideItems.length) % $slideItems.length;
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

        $('.bullets').on('click', '.bullet', function () {
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
        var slideInterval = setInterval(function () {
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

        $('.bullets').on('click', '.bullet', function () {
            var $t = $(this).index('.bullet');
            firstCarusel.changeSlide($t);
            clearInterval(slideInterval);
        });

    });
}(jQuery));
$(document).ready(function () {
    // 'use strict';
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

    $('#carusel').slick({
        accessibility: true,
        dots: true,
        appendDots: $('.dot-navigation'),
        appendArrows: $('#main-gallery-container'),
        asNavFor: $('.description'),
        prevArrow: $leftSlideButton,
        nextArrow: $rightSlideButton,
        autoplay: false,
        autoplaySpeed: 200,
        slidesToShow: 1,
        slidesToScroll: 1

    });
    $('.description').slick({
        accessibility: true,
        asNavFor: $('#carusel'),
        appendDots: $('.dot-navigation'),
        appendArrows: $('#main-gallery-container'),
        slidesToShow: 1,
        slidesToScroll: 1

    });
    // vl. mkov
    // class="slick-prev"  na buttona koito e prev
    //class="slick-next"  na buttona koito e next
    //zaduljitelno div parrent div childs bez klasove
    // dots: true, dobavq dots
    // appendDots: $('.bullets'), promenq containera na dotsa
    //.slick-dots li  za customize na dotsa
    //.slick-active za dobavqne na active class
    // https://codepen.io/puglyfe/pen/QELpGy
    //git https://tortoisegit.org/docs/tortoisegit/tgit-preface-source.html
    //sticky footer https://jsfiddle.net/0cx30dqf/
    //Iconkite na kontakti s before
    // sticky https://codepen.io/SelenIT/pen/QELpww
    //footer cont
    //https://codepen.io/paulfleury/pen/pvvzGx dva slidera
    //nav-cont - text-align justify
    //nav
    //   width: 25%;
    // display: inline-block;
    // vertical-align: top;
    // text-align: left;
    // tel col  
    // width: 33.33%;
    // display:inline-block;
    // vertical-align: to;
    // font-size: 13px;
    // a  > <span>zapitvania...</span> 2332323
    // min-height:60px;
    // white-space:nowrap;
    // padding:0 0 0 80px;
    //http://j4n.co/blog/Creating-your-own-css-grid-system
    $('.carusel__img').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            $img = $this.find('img'),
            $imgSrc = $img.attr('src'),
            $closePopUp = $('.icon--close');

        $('.pop-up').bPopup({
            content: 'image',
            contentContainer: '.pop-up__single-img',
            loadUrl: $imgSrc,
            closeClass: 'icon--close'
        });

        // var $popUpList = $('.pop-up__list'),
        //     $imgListItems = $('.carusel__img').children(),
        //     fragment = document.createDocumentFragment();

        // $imgListItems.each(function () {

        //     var $imgSrc = $(this).attr('src'),
        //         li = document.createElement('div'),
        //         img = document.createElement('img');
        //     imgSrc = $(img).attr('src', $imgSrc);

        //     li.className = 'pop-up__items';
        //     img.className = 'pop-up__img';

        //     li.append(img);
        //     fragment.appendChild(li);
        // });
        // $popUpList.append(fragment);

    });

//  sticky footer
// html, body {
//   height: 100%;
// }
// body {
//   display: flex;
//   flex-direction: column;
// }
// .content {
//   flex: 1 0 auto;
// }


    $('.pop-up__list').on('click', '.pop-up__items', function () {
        $('.pop-up__img-cont').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: $('.pop-up__list')
        });
        $('.pop-up__list').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: $('.pop-up__list'),
            appendArrows: $('.pop-up__ctrls'),
            prevArrow: $('.js--pop-up--prev'),
            nextArrow: $('.js--pop-up--next'),
            centerMode: true,
            focusOnSelect: true
        });
    });
});

.pop-up {
    background: #fff;
    display: none;
    border:1px solid black;
    box-sizing: border-box;
}
.pop-up__galery {
    height: 40px;
    max-width: 560px;
    padding: 10px 45px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}
.pop-up__img-cont {
    max-width: 560px;
    padding: 10px;
    position: relative;
}
.pop-up img {
    width: 100%;
    height: 100%;
    display: block;
}
.pop-up__list {
    overflow: hidden;
    text-align: center;
    font-size: 0;
}
.pop-up__items {
    max-width: 80px;
    padding: 5px;
    display: inline-block;
}
.pop-up__desc {
    margin-top: 20px;
    text-align: center;
}
.pop-up__title {
    font-size: 30px;
    padding: 10px 0;
    margin: 0;
    color: darkblue;
}
.pop-up__text {
    padding: 10px 0;
    font-size: 14px;
}