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
var map;
var geocoder;
var mapFunctions;
// initiate new Map
function initMap() {
    geocoder = new google.maps.Geocoder();
    var sofia = { lat: 42.671608, lng: 23.427946 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: sofia
    });
    mapFunctions.addAdressToList(geocoder, map);

}

//add script tag which calls the google API
$(function ($) {
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg1B_j8Ll8pPCxki4E7RLIzLQUBKXWKBI&callback=initMap";
    document.body.appendChild(script);
});

mapFunctions = {
    //Get request function  - returns promise
    getRequest: function (url) {
        var getDataPromise = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = getRequest;
            xhr.open('GET', url, true);
            xhr.onerror = function (e) {
                alert(xhr.statusText);
            };
            xhr.send(null);

            function getRequest(e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (xhr.responseText === 'Not found') {
                        reject(Error('Not Found, contanct admin'));
                        alert(xhr.statusText);
                    } else {
                        var response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                }
            }
        });
        return getDataPromise;
    },
    //Function for adding the offices to the list, and activatin the function
    // for adding the  map markers
    addAdressToList: function (geocoder, map) {
        var getOfficesContainer = document.querySelector('.offices__list');
        var that = this;
        var allOffices, getAdresseInfo;

        getAdresseInfo = this.getRequest('./API/offices.json').then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var officeInfo = data[i];
                var name = officeInfo.name;
                var address = officeInfo.address;
                var atm = officeInfo.atm;
                var workHours = officeInfo.extendedTime;


                //create first <span> tag  for Offices name
                var officeName = document.createElement('span');
                officeName.textContent = name;
                officeName.className = 'office__details';

                //create the second span tag for the offices address
                var officeAddress = document.createElement('span');
                officeAddress.textContent = address;
                officeAddress.className = 'office__details';

                //create <li> tag
                var createListItem = document.createElement('li');
                createListItem.className = 'office';
                createListItem.setAttribute('data-atm', atm);
                createListItem.setAttribute('data-workHours', workHours);

                //append first span to the Li
                createListItem.appendChild(officeName);
                //append the second span
                createListItem.appendChild(officeAddress);


                //append li to the ul
                getOfficesContainer.appendChild(createListItem);

            }
            //add the addresses markers to the map
            that.addAdress(data, geocoder, map);
        });
    },
    // function for storring the infoWindow  string
    createInfoWindow: function (element) {
        var contentString = '<div id="info__content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3 class="info__name">' + element.name + '</h3>' +
            '<span class="info__address">' + element.address + '</span>' +
            '</div>';
        return contentString;
    },
    //check if there is opended infowidow and if true close it
    closeOpenedWindow: function () {
        if (this.lastOpenedWindow) {
            this.lastOpenedWindow.close();
        }
    },
    //append markers to map
    defineTimeOut: function (office, image, geocoder, map) {
        var that = this;
        geocoder.geocode({ 'address': office.address }, function (results, status) {
            var contentString = that.createInfoWindow(office);

            if (status == 'OK') {
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    icon: image

                });
                google.maps.event.addListener(map, 'click', function () {
                    infowindow.close();
                });
                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        that.closeOpenedWindow();
                        infowindow.open(map, marker);
                        that.lastOpenedWindow = infowindow;
                    };
                })(marker));
                //set markers values
                marker.mainMap = map;
                marker.name = office.name;
                marker.address = office.address;
                marker.atm = office.atm;
                marker.workHours = office.extendedTime;
                marker.setVisible(true);

                //make  markers array
                that.markersArr.push(marker);
            } else {
                //if the markers hit the limit from Google wait 1 sec, and call
                //the function again
                if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {

                    setTimeout(function () {
                        that.defineTimeOut(office, image, geocoder, map);
                    }, 1000);
                }
                console.log('Geocode was not succesful' + status);
            }
        });

    },
    // Get addresses from the list item and set the locations  ont the map
    addAdress: function (offices, geocoder, map) {
        that = this;
        //Custom marker
        var image = {
            url: '../images/marker.png',
            size: new google.maps.Size(43, 55),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 55)
        };
        for (var i = 0; i < offices.length; i++) {
            var office = offices[i];
            var address = office.address;
            var atm = office.atm;
            var workHours = office.extendedTime;
            that.defineTimeOut(office, image, geocoder, map);

        }
    },
    // Function for settings the filters logic on click
    checkFiltersData: function (e) {
        var that = this;
        var checkbox = e.target;
        var nameAttr = checkbox.getAttribute('value');
        var markers = mapFunctions.markersArr;
        var listOfOffices = document.querySelectorAll('.office');
        var checkBoxStatus = checkbox.checked;
        var temp = '';
        
        //hide infowindow on filtering
        mapFunctions.closeOpenedWindow();

        if (nameAttr === 'atm') {
            temp = 'workHours';
        } else {
            temp = 'atm';
        }
        //check the list of offices  and filter them
        for (var j = 0; j < listOfOffices.length; j++) {
            var element = listOfOffices[j];

            if (checkbox.checked) {
                if (element.getAttribute('data-' + nameAttr) === 'false') {
                    element.classList.add('js-hidden');
                }
            } else {
                if (element.getAttribute('data-' + nameAttr) === 'false' && element.getAttribute('data-' + temp.toLocaleLowerCase()) !== 'false') {
                    element.classList.remove('js-hidden');
                } else if ((element.getAttribute('data-' + nameAttr) === 'false' && element.getAttribute('data-' + temp.toLocaleLowerCase()) === 'false')) {
                    element.classList.add('js-hidden');
                }

            }

        }
        //check the list of markers and filter them
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            if (checkbox.checked) {
                if (marker[nameAttr] === false) {
                    marker.setVisible(false);
                }
            } else {
                if (marker[nameAttr] === false && marker[temp] !== false) {
                    marker.setVisible(true);
                } else if (marker[nameAttr] === false && marker[temp] === false) {
                    marker.setVisible(false);
                }

            }
        }
    },
    // Function for showing  the info window on the map when the selected
    // office is clicked
    showInfoPanel: function (e) {
        var element = e.target;
        var markers = mapFunctions.markersArr;
        var officeName;
        var infowindow;
        //check if th clicked element is LI 
        if (element && element.tagName !== 'LI') {
            element = element.parentNode;
        }
        
        officeName = element.firstChild.textContent;

        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            if (marker.name === officeName) {
                google.maps.event.trigger(marker, 'click');
            }

        }
    },
    init: function () {
        this.markersArr = [];
        this.lastOpendeWindow = null;
        this.atmCheckBox = document.getElementById('atm');
        this.extendedHours = document.getElementById('lTime');
        this.officesList = document.getElementById('module2__list');
        this.atmCheckBox.addEventListener('click', this.checkFiltersData, false);
        this.extendedHours.addEventListener('click', this.checkFiltersData, false);
        this.officesList.addEventListener('click', this.showInfoPanel, false);
    }
};
mapFunctions.init();