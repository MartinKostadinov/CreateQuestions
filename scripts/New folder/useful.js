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

// vl. mkov
// https://codepen.io/puglyfe/pen/QELpGy
//sticky footer https://jsfiddle.net/0cx30dqf/
//Iconkite na kontakti s before
// sticky https://codepen.io/SelenIT/pen/QELpww
//footer cont
//https://codepen.io/paulfleury/pen/pvvzGx dva slidera
//http://j4n.co/blog/Creating-your-own-css-grid-system

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

/** Define values for keycodes */
var VK_ENTER = 13;
var VK_SPACE = 32;
function Checkbox(el) {
    this.el = el;

    this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.el.addEventListener('click', this.toggle.bind(this));

    // Initialize role and aria-checked state.
    this.el.setAttribute('role', 'checkbox');
    if (this.el.hasAttribute('checked')) {
        this.el.setAttribute('aria-checked', 'true');
    } else {
        this.el.setAttribute('aria-checked', 'false');
    }
}
Checkbox.prototype.handleKeyDown = function (e) {
    switch (e.keyCode) {
        case VK_ENTER:
        case VK_SPACE: {
            // function
            break;
        }
    }
};
Checkbox.prototype.toggle = function () {
    if (this.el.hasAttribute('checked')) {
        this.el.removeAttribute('checked');

        // Keep checked attribute and aria-checked in sync.
        this.el.setAttribute('aria-checked', 'false');
    } else {
        this.el.setAttribute('checked', '');

        // Keep checked attribute and aria-checked in sync.
        this.el.setAttribute('aria-checked', 'true');
    }
};
function Checkbox(el) {
    this.el = el;

    this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.el.addEventListener('click', this.toggle.bind(this));

    // Initialize role and aria-checked state.
    this.el.setAttribute('role', 'checkbox');
    if (this.el.hasAttribute('checked')) {
        this.el.setAttribute('aria-checked', 'true');
    } else {
        this.el.setAttribute('aria-checked', 'false');
    }
    var checkboxes = slice(document.querySelectorAll('.checkbox'));
    for (var checkbox of checkboxes)
        checkbox.logic = new Checkbox(checkbox);
}