var MemberProfileBoxClass = function(_target,_flag){
    var parent = new SectionBaseClass(_target);
    var $next,$next2;
    var isSingle = (_flag === 1);
    parent.onCreate = function(){
        parent.super.onCreate();
        if(!isSingle){
            $next = parent.target.next();
            if($next) $next2 = $next.next();
        }

        var css = {opacity:0,y:Util.BASE_YPOS};
        parent.target.css(css);
        if($next) $next.css(css);
        if($next2) $next2.css(css);
    }

    parent.onActive = function(){
        var css = {opacity:1,y:0};
        parent.target.animate(css,Util.BASE_TIME,Util.BASE_EASING);
        if($next) $next.delay(Util.BASE_TIME/4).animate(css,Util.BASE_TIME,Util.BASE_EASING);
        if($next2) $next2.delay(Util.BASE_TIME/2).animate(css,Util.BASE_TIME,Util.BASE_EASING);
    }
    return parent;
}

var MemberProfileBoxManagerClass = function(){
    var parent = new BaseClass();
    var items;
    parent.onCreate = function(){
        items = [];

        var split = (Util.isBreakpoint)? 1 : 3;
        $("#members.page .profile .body ul li").each(function(index){
            if(index <= 5){

            } else {
                if(index%split === 0) items.push(new MemberProfileBoxClass($(this),split));
            }
        });
        for(var k in items)items[k].onCreate();
    }

    parent.onLoad = function(){
        for(var k in items)items[k].onLoad();
    }

    parent.onResize = function(size){
        for(var k in items)items[k].onResize(size);
    }

    parent.onScroll = function(st){
        for(var k in items)items[k].onScroll(st);
    }

    parent.onRemove = function(){
        for(var k in items)items[k].onRemove();
    }

    return parent;
}

var MemberProfileSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#members.page .profile.section");
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

var MemberPageClass = function(){
    var parent = new PjaxPageClass();
    parent.parts = {
        s1: new MemberProfileSectionClass(),
        box: new MemberProfileBoxManagerClass()
        // map: new AccessPageClass()
    };
    return parent;
}
