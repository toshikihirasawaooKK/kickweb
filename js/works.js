var WorksSortClass = function(){
    var parent = new BaseClass();
    var $target,$sortNav;
    var STATIC_CATEGORY = ["movie","graphic","web","promotion","event","tieup","other"];
    parent.onCreate = function(){
        $target = $("#works .items ul");
        $sortNav = $("#works .sort ul li");
        var urlVars = Util.getUrlVars();

        var category = urlVars.c;
        if(STATIC_CATEGORY.indexOf(category) === -1) category = null;

        var sortNum = 0;
        if(category){
            $("li",$target).each(function(){
                var _this = $(this);
                var d = $(this).attr("data-category");
                if(d.indexOf(category) === -1){
                    _this.hide();
                }
            });
            sortNum = getSortNavIndex(category);
        }
        $sortNav.eq(sortNum).addClass("active");
    }

    function getSortNavIndex(category){
        var index = 0;
        $sortNav.each(function(i){
            var d = $("a",$(this)).attr("data-type");
            if(category == d) {
                index = i;
                return false;
            }
        });
        return index;
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

var WorksPageClass = function(){
    var parent = new PjaxPageClass();

    parent.parts = {
        sort: new WorksSortClass(),
        map: new AccessPageClass()
    };

    return parent;
}
