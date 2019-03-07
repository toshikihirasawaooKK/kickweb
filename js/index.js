var IndexDrawStringClass = function(){
    var parent = new SectionBaseClass("#top.page .statement .img");

    var drawSvg;
    parent.onCreate = function(){
        parent.super.onCreate();
        drawSvg = $('svg',parent.target).drawsvg({
            duration:140,
            stagger:70
        });
    }

    parent.onResize = function(size){
        var s = (Util.isBreakpoint)? 6 : 6 ;
        var wh2 = size.h - size.h/s;
        var offset = $.extend({},parent.target.offset());
        var top = Math.floor(offset.top);
        var bottom = Math.floor(top + parent.target.outerHeight(true)/2);
        parent.offset = {top:top - wh2,bottom:bottom};

        parent.htmlLast = $("html").outerHeight(true) - size.h - 10;
    }

    parent.onActive = function(){
        drawSvg.drawsvg('animate');
    }

    return parent;
}

var IndexEffectThunderClass = function(){
    var parent = new BaseClass();
    var CL_CLASS = "thunder";
    var stageSize;
    var $target,$me;
    var posArr;

    var timerId;
    var isLoop = false;

    parent.onCreate = function(_target){
        $target = _target;
    }

    parent.onResize = function(size){
        stageSize = size;
    }

    parent.onStart = function(){
        var html = '<div class="'+CL_CLASS+'"></div>';
        posArr = [];

        $target.append(html);
        $me = $("."+CL_CLASS,$target);

        isLoop = true;
        loopStart();
    }

    parent.onStop = function(){
        loopStop();
    }

    parent.onRemove = function(){
        if($me){
            $me.stop(true,false);
            $me = null;
        }
        loopStop();
    }

    function loopStart(){
        if(!isLoop) return;
        var time = Math.floor(Math.random()*5000)+5000;
        timerId = setTimeout(function(){
            run();
        },time);
    }

    function loopStop(){
        isLoop = false;
        clearTimeout(timerId);
    }

    function run(){
        $me.css({opacity:1})
            .animate({opacity:0},100,"easeInQuart",function(){
                $(this) .css({opacity:1});
            })
            .animate({opacity:0.8},100,"easeInQuart")
            .animate({opacity:0},600,"easeInQuart",function(){
                if(isLoop) loopStart();
            });
    }

    return parent;
}

var IndexEffectSnowClass = function(){
    var parent = new BaseClass();
    var CL_CLASS = "snow";
    var INT_MAX = 100;
    var DROP_SIZE = {w:10,h:10};
    var stageSize;
    var $target,$drop;
    var posArr;
    parent.onCreate = function(_target){
        $target = _target;
    }

    parent.onResize = function(size){
        stageSize = size;
    }

    parent.onStart = function(_flag){
        var html = "";
        posArr = [];
        var maxNum = (_flag)? INT_MAX/2 : INT_MAX;

        for(var i=0;i<maxNum; i++){
            html += '<div class="'+CL_CLASS+'"></div>';
        }

        $target.append(html);
        $drop = $("."+CL_CLASS,$target);
        $drop.each(function(i){
            var _this = $(this);
            var l = Math.random()*stageSize.w;
            var t = Math.random()*stageSize.h;
            var s = Math.random()*0.9 + 0.1;
            var r = (Math.random()*1 > 0.5)? 1 : -1;
            _this.css({x:l,y:t,scale:s});
            posArr[i] = {x:l,y:t,scale:s,direction:r};
        });
    }

    parent.onDraw = function(){

        $drop.each(function(i){
            var _this = $(this);
            posArr[i].y += 1*posArr[i].scale;
            posArr[i].x += 0.1*posArr[i].scale * posArr[i].direction;
            _this.css(posArr[i]);

            if(posArr[i].y > stageSize.h + 10){
                posArr[i].y = (DROP_SIZE.h + 10) * -1;
                posArr[i].x = Math.random()*stageSize.w;
                _this.css(posArr[i]);
            }
        });
    }
    return parent;
}

var IndexEffectRainClass = function(){
    var parent = new BaseClass();
    var CL_CLASS = "rain";
    var INT_MAX = 100;
    var DROP_SIZE = {w:1,h:89};
    var stageSize;
    var $target,$drop;
    var posArr;
    parent.onCreate = function(_target){
        $target = _target;
    }

    parent.onResize = function(size){
        stageSize = size;
    }

    parent.onStart = function(_flag){
        var html = "";
        posArr = [];
        var maxNum = (_flag)? INT_MAX/2 : INT_MAX;

        for(var i=0;i<maxNum; i++){
            html += '<div class="'+CL_CLASS+'"></div>';
        }

        $target.append(html);
        $drop = $("."+CL_CLASS,$target);
        $drop.each(function(i){
            var _this = $(this);
            var l = Math.random()*stageSize.w;
            var t = Math.random()*stageSize.h;
            var s = Math.random()*0.75 + 0.25;
            _this.css({x:l,y:t,scale:s});
            posArr[i] = {x:l,y:t,scale:s};
        });
    }

    parent.onDraw = function(){

        $drop.each(function(i){
            var _this = $(this);
            posArr[i].y += 10*posArr[i].scale;
            _this.css(posArr[i]);

            if(posArr[i].y > stageSize.h + 10){
                posArr[i].y = (DROP_SIZE.h + 10) * -1;
                posArr[i].x = Math.random()*stageSize.w;
                _this.css(posArr[i]);
            }
        });
    }

    return parent;
}

var IndexMainVisualEffectClass = function(){
    var parent = new BaseClass();
    var $parentTarget,$target;
    var data;
    var isDraw = false;
    var effect = {
        rain:new IndexEffectRainClass(),
        snow:new IndexEffectSnowClass(),
        thunder:new IndexEffectThunderClass()
    };
    var runEffect = [];

    parent.onCreate = function(_parentTarget){
        $parentTarget = _parentTarget;
        $target = $(".effect",$parentTarget);
        for(var k in effect) effect[k].onCreate($target);
    }

    parent.onResize = function(size){

        var width = size.w;
        var height = $("#top.page .statement.section").offset().top;
        var baseSize = {w:width,h:height};

        var offset = $("#top.page").offset();

        var top = offset.top * -1;
        var left = offset.left * -1;

        $target.css({width:width,height:height,top:top,left:left});
        for(var k in effect) effect[k].onResize(baseSize);
    }

    parent.setWether = function(_data){
        data = _data;

        if(runEffect.length > 0){
            for(var k in runEffect) effect[runEffect[k]].onStop();
        }

        var urlVar = Util.getUrlVars();
        var telop = "";
        if(!urlVar){
            telop = data.telop;
        } else {
            switch (urlVar.w){
                case "snow":
                    telop = "雪";
                    break;
                case "rain":
                    telop = "雨";
                    break;
                case "thunder":
                    telop = "雷";
                    break;
                case "all":
                    telop = "雪雨雷";
                    break;
            }
        }
        runEffect = [];

        if(telop.indexOf("雷") !== -1) runEffect.push("thunder");
        if(telop.indexOf("雪") !== -1) runEffect.push("snow");
        if(telop.indexOf("雨") !== -1) runEffect.push("rain");

        if(runEffect.length > 0){
            $target.fadeIn();
        }

        for(var k in runEffect) effect[runEffect[k]].onStart((runEffect.indexOf("snow") !== -1 && runEffect.indexOf("rain") !== -1));

        onStart_draw();
    }

    parent.onStart = function(){
        onStart_draw();
    }

    parent.onStop = function(){
        onStop_draw();
    }

    parent.onRemove = function(){
        onStop_draw();
        for(var k in effect) effect[k].onRemove();
    }

    function onStart_draw(){
        if(isDraw) return;
        isDraw = true;
        onDraw();
    }

    function onStop_draw(){
        if(!isDraw) return;
        isDraw = false;
        window.cancelAnimationFrame(onDraw);
    }

    function onDraw(){
        for(var k in runEffect) effect[runEffect[k]].onDraw();
        if(isDraw) window.requestAnimationFrame(onDraw);
    }

    return parent;
}

var IndexMainVisualClass = function(){
    var parent = new SectionBaseClass("#top.page .mainvisual");
    var $wrap;
    var youtube;
    var SIZE_MOVE = {w:560,h:315};
    var $movie,$iframe;
    var isApiReady = false;
    var timerId;
    var loopTime = 1000/Util.FPS;
    var isLoop = false;
    var isPlayerVisible = false;

    var effectCl = new IndexMainVisualEffectClass();
    parent.onCreate = function(){
        parent.super.onCreate();
        $wrap = $("#youtube_wrap",parent.target);
        $movie = $("#youtube_wrap .youtube_wrap_inner",parent.target);
        isPlayerVisible = false;
        $movie.css({display:"none",opacity:0});
        isApiReady = false;
        youtube = new YoutubePlayerClass("youtube","p1luRAyaTNo");
        youtube.bind(youtube.EVENT_READY,function(){
            parent.jq.trigger(parent.EVENT_YOUTUBE_READY);
        });
        youtube.onCreate();

        effectCl.onCreate(parent.target);

        if(Util.isBreakpoint){

        } else {
            SIZE_MOVE = {w:890,h:505};
        }
    }

    parent.onLoad = function(){
        parent.super.onLoad();
        youtube.onStart();
    }

    parent.onResize = function(size){
        parent.super.onResize(size);

        var wt = $wrap.offset().top;
        var height = size.h - wt;

        $wrap.css({height:height});

        var baseSize = {w: Math.floor(parent.target.outerWidth()),h:Math.floor(parent.target.outerHeight(true))};
        if(baseSize.h < 420) baseSize.h = 420;

        var scale = 1;
        if(Util.isBreakpoint){
            scale = baseSize.w/SIZE_MOVE.w;
            if(baseSize.h < SIZE_MOVE.h*scale){
                scale = baseSize.h/SIZE_MOVE.h;
            }
            scale *= 1.05;
        } else {
            scale = baseSize.w/960;
            if(baseSize.h < SIZE_MOVE.h*scale){
                scale = baseSize.h/SIZE_MOVE.h;
            }
            scale *= 1.2;
        }

        var mw = Math.ceil(SIZE_MOVE.w * scale);
        var mh = Math.ceil(SIZE_MOVE.h * scale);

        var top = (baseSize.h-mh)/2;
        var left = (baseSize.w-mw)/2;
        if(!Util.isBreakpoint){
            top += -30*scale;
            left += 15*scale;
        } else {
            top += -30*scale;
        }

        $movie.css({width:mw,height:mh,top:top,left:left});
        if($iframe) $iframe.css({width:mw,height:mh});
        effectCl.onResize(size);
    }

    parent.onYouTubeIframeAPIReady = function(){
        if(isApiReady) return;
        isApiReady = true;
        youtube.onYouTubeIframeAPIReady();
        $iframe = $("iframe",$movie);
        parent.onResize(Util.getWindowSize());
    }

    parent.setWether = function(_data){
        effectCl.setWether(_data);
    }

    parent.onStart = function(){
        youtube.onStart();
        startTimer();
        effectCl.onStart();
    }

    parent.onStop = function(){
        youtube.onStop();
        stopTimer();
        effectCl.onStop();
    }

    parent.onRemove = function(){
        parent.super.onRemove();
        stopTimer();
        youtube.unbind(youtube.EVENT_READY);
        youtube.onRemove();
        youtube = null;

        effectCl.onRemove();
    }

    function startTimer(){
        if(isLoop) return;
        isLoop = true;
        timerId = setInterval(function(){
            onEnterFrameEvent();
        },loopTime);
    }

    function stopTimer(){
        if(!isLoop) return;
        isLoop = false;
        clearInterval(timerId);
    }

    function onEnterFrameEvent(){
        var t = youtube.getCurrentTime();
        var d = youtube.getDuration() - 0.5;
        if((t > 0.5 && t <= d) && !isPlayerVisible){
            isPlayerVisible = true;
            $movie.stop(true,false).css({display:"block"}).animate({opacity:1},300);
        } else if(t > d && isPlayerVisible){
            isPlayerVisible = false;
            $movie.stop(true,false).animate({opacity:0},300,function(){$(this).css({display:"none"});});
        }
    }

    return parent;
}

var IndexWeatherClass = function(){
    var parent = new BaseClass();
    parent.EVENT_WEATHER_COMPLETE = "eventWeatherComplete";
    var $target;
    var json;

    var weekChars = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    parent.onCreate = function(){
        $target = $("#top.page .mainvisual .weather");
        $target.css({opacity:0,y:Util.BASE_YPOS});
        onCallApi();
    }

    function onCallApi(){
        $.ajax({
            url:'/php/getwether.php',
            type:'GET',
            dataType:'json',
            timeout:5000,
            complete:function(a,b,c,d){
                onCallApiEnd(a.responseText);
            }
        });
    }

    function onCallApiEnd(_txt){
        json = JSON.parse(_txt);

        var weather = json.forecasts[0];
        var now = new Date(weather.date);
        var date = Util.getFormatDate(now,'YYYY/MM/DD/');
        date += weekChars[now.getDay()];
        var temperature = (weather.temperature.max && weather.temperature.max.celsius)? weather.temperature.max.celsius : '-';

        $(".date",$target).html(date);
        $(".location",$target).html('TOKYO/T: '+temperature+'C&deg');

        parent.jq.trigger(parent.EVENT_WEATHER_COMPLETE,weather);

        $target.animate({opacity:1,y:0},Util.BASE_TIME,Util.BASE_EASING);
    }

    return parent;
}

var IndexStatementSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#top.page .statement.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}

var IndexCompanySectionClass = function(){
    var parent = new BaseSectionAnimationClass("#top.page .company.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}

var IndexFacebookClass = function(){
    var parent = new SectionBaseClass("#top.page .mainvisual .facebook");
    parent.onCreate = function(){
        parent.super.onCreate();
        parent.target.css({opacity:0,y:Util.BASE_YPOS});
    }

    parent.onActive = function(){
        parent.target.animate({opacity:1,y:0},Util.BASE_TIME,Util.BASE_EASING);
    }

	parent.onFacebookSetEvent = function(){}

    return parent;
}



/**
 * トップにnews記事を表示
 */
var IndexNewsFeed = function() {
  var parent = new BaseSectionAnimationClass("#top.page .news.section");

  parent.onCreate = function() {
    parent.inheritance.onCreate();
    onNewsFeed();
  }

  parent.onActive = function(){
      parent.inheritance.onActive();
  }

  function onNewsFeed(){
    var dom = $('#newsFeed');
    $.ajax({
      url: '/wp-json/wp/v1/news',
      dataType: 'json'
    }).done(function(json){
      var data = json.items;
      for(var i =0; i < data.length; i++){
        dom.append('<div class="news_list_item"><a href="'+ data[i].permalink +'"><div class="news_list_img"><img src="'+ data[i].thumbnail +'" alt=""></div><h3 class="news_list_title">'+ data[i].title +'</h3><time class="news_list_time">'+ data[i].date +'</time><div class="news_list_txt newsBar">'+ data[i].content +'</div><span class="news_list_link din_bold">READ MORE...</span></a></div>');
      }
    });
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

var IndexPageClass = function(){
    var parent = new PjaxPageClass();

    parent.parts = {
        s1: new IndexStatementSectionClass(),
        s2: new IndexCompanySectionClass(),
        mv: new IndexMainVisualClass(),
        weather: new IndexWeatherClass(),
        drawtxt: new IndexDrawStringClass(),
        fb: new IndexFacebookClass(),
        news: new IndexNewsFeed(),
        map: new AccessPageClass()
    };

    parent.onCreate = function(){
        parent.super.onCreate();
        parent.parts.mv.bind(parent.parts.mv.EVENT_YOUTUBE_READY,function(){
            parent.jq.trigger(parent.EVENT_YOUTUBE_READY);
        });

        parent.parts.weather.bind(parent.parts.weather.EVENT_WEATHER_COMPLETE,function(e,d){
            parent.parts.mv.setWether(d);
        });
    }

    parent.onFacebookSetEvent = function(){
        parent.parts.fb.onFacebookSetEvent();
    }

    parent.onRemove = function(){
        parent.super.onRemove();
        parent.parts.mv.unbind(parent.parts.mv.EVENT_YOUTUBE_READY);
        parent.parts.weather.unbind(parent.parts.weather.EVENT_WEATHER_COMPLETE);
    }

    return parent;
}
