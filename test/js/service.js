var ServiceGraphClass = function(){
    var parent = new SectionBaseClass("#service.page .tcs.section .body .graph");
    var $img1,$img2,$img3;
    parent.onCreate = function(){
        parent.super.onCreate();

        $img1 = $(".img.i1",parent.target);
        $img2 = $(".img.i2",parent.target);
        $img3 = $(".img.i3",parent.target);

        var css = {opacity:0,y:Util.BASE_YPOS};
        $img1.css(css);
        $img2.css(css);
        $img3.css(css);
    }

    parent.onResize = function(size){
        var wh2 = size.h/2;
        var offset = $.extend({},parent.target.offset());
        var top = Math.floor(offset.top);
        var bottom = Math.floor(top + parent.target.outerHeight(true));
        parent.offset = {top:top - wh2,bottom:bottom};

        parent.htmlLast = $("html").outerHeight(true) - size.h - 10;
    }

    parent.onActive = function(){
        var css = {opacity:1,y:0};
        var time = 800;
        $img2.animate(css,time,Util.BASE_EASING);
        $img3.delay(1000).animate(css,time,Util.BASE_EASING);
        $img1.delay(2000).animate(css,time,Util.BASE_EASING,function(){
            parent.target.addClass("isAnim");
        });
    }

    parent.onRemove = function(){
        parent.super.onRemove();
        $img1.stop(true,false);
        $img2.stop(true,false);
        $img3.stop(true,false);
    }

    return parent;
}

var ServiceServiceSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#service.page .service.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}

var ServiceTCSSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#service.page .tcs.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}

var AccessPageClass = function(){
    var parent = new PjaxPageClass();
    var POSITION = {lat:35.672001,lng:139.726323};
    var GoogleMapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ];
    var $map;

    parent.parts = {
        s1: new AccessSectionClass()
    }

    parent.onCreate = function(){
        parent.super.onCreate();
        $map = $("#access.page .googlemap");
    }

    parent.onGoogleMapCallback = function() {
        onDraw_map();
    }

    function onDraw_map() {
        var mapObject = new google.maps.Map($map.get(0), {
            zoom: 15,
            center: POSITION,
            mapTypeControl:false,
            fullscreenControl:false
        });
        mapObject.setOptions({styles: GoogleMapStyle});

        var iconImage = {
            url: "./img/map_pin.svg",
            scaledSize: new google.maps.Size(40, 68)
        };
        if(Util.isIE) iconImage.url = "./img/map_pin.png";

        var marker = new google.maps.Marker({
            position: POSITION,
            map: mapObject,
            icon:iconImage
        });
    }

    return parent;
}

var ServicePageClass = function(){
    var parent = new PjaxPageClass();
    parent.parts = {
        s1: new ServiceServiceSectionClass(),
        s2: new ServiceTCSSectionClass(),
        graph: new ServiceGraphClass()
        // map: new AccessPageClass()
    }
    return parent;
}
