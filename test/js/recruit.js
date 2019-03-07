var RecruitToggleBoxClass = function(_target){
    var parent = new BaseClass();
    var CL_ACTIVE = "active";
    var $target = _target;
    var isOpen = false;
    parent.onCreate = function(){
        $(".js-slide_toggle_btn",$target).on("click",onClick);
    }

    parent.onRemove = function(){
        $(".js-slide_toggle_btn",$target).off("click",onClick);
        $(".js-slide_toggle_body",$target).stop(true,false);
        $target.removeClass(CL_ACTIVE);
        $target = null;
    }

    function onClick(){
        if(isOpen){
            onClose();
        } else {
            onOpen();
        }
        return false;
    }

    function onOpen(){
        if(isOpen) return;
        isOpen = true;
        $target.addClass(CL_ACTIVE);

        var height = $(".js-slide_toggle_body_inner",$target).outerHeight(true);
        $(".js-slide_toggle_body",$target).stop(true,false).animate({height:height},Util.BASE_TIME,Util.BASE_EASING,function(){
            $(this).css({height:"auto"});
        });
    }

    function onClose(){
        if(!isOpen) return;
        isOpen = false;

        $target.removeClass(CL_ACTIVE);
        $(".js-slide_toggle_body",$target).stop(true,false).animate({height:0},Util.BASE_TIME,Util.BASE_EASING);
    }

    function toTop(){
        var to = $target.offset().top - $("#header .base").outerHeight(true);
        Util.setWindowScroll(to);
    }

    return parent;
}

var RecruitToggleBoxManagerClass = function(){
    var parent = new BaseClass();
    var box;
    parent.onCreate = function(){
        box = [];
        $("#recruit.page .js-slide_toggle").each(function(){
            box.push(new RecruitToggleBoxClass($(this)));
        });

        for(var k in box)box[k].onCreate();
    }

    parent.onRemove = function(){
        for(var k in box)box[k].onRemove();
    }

    return parent;
}

var RecruitMessageSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#recruit.page .message.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}

var RecruitCareerSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#recruit.page .career.section");
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

var RecruitPageClass = function(){
    var parent = new PjaxPageClass();
    parent.parts = {
        s1: new RecruitMessageSectionClass(),
        s2: new RecruitCareerSectionClass(),
        togglebox: new RecruitToggleBoxManagerClass()
        // map: new AccessPageClass()
    }
    return parent;
}
