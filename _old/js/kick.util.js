if(!('console' in window)){window.console = {};window.console.log = function(str){return str};}

jQuery.fn.extend({
    customAnimation:function(p,t,e,c){
        var params = p;
        var time = (t == null)? 300 : t ;
        var easing = null;
        var callback = c;

        if(e != null){
            if(typeof e == 'string'){
                easing = e;
            } else {
                callback = e;
            }
        }

        var $this = jQuery(this);
        if(Util.isIE9){
            easing = 'easeOutQuint';
            $this.animate(params,time,easing,callback);
        } else {
            //if(params.x !=null)
            if(easing == null) easing = 'ease';
            $this.transition(params,time,easing,callback);
        }
        return this;
    }
});

var Util = {
	isSP:(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0),
	isTablet:(navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0),
    isSafari:((navigator.userAgent.indexOf('Safari') > -1) && (navigator.userAgent.indexOf('Chrome') == -1)),
    isiOS:navigator.userAgent.match(/(iPhone|iPod)/),
    isAndroid:navigator.userAgent.match(/Android/),
    isAndroidChrome:(navigator.userAgent.match(/Android/) && /Chrome/.test(navigator.userAgent) && !/Version/.test(navigator.userAgent)),
    isAndroidChromeType2:(navigator.userAgent.match(/Android/) && /Chrome/.test(navigator.userAgent)),
    isIE8:(navigator.userAgent.match(/(MSIE\s)([0-9]+\.[0-9]+)/) && ((navigator.userAgent.match(/(MSIE\s)([0-9]+\.[0-9]+)/))? parseFloat(RegExp.$2) : null ) <=8),
    isIE9:(navigator.userAgent.match(/(MSIE\s)([0-9]+\.[0-9]+)/) && ((navigator.userAgent.match(/(MSIE\s)([0-9]+\.[0-9]+)/))? parseFloat(RegExp.$2) : null ) <=9),
    isIE:(navigator.userAgent.match(/(MSIE\s)([0-9]+\.[0-9]+)/) || navigator.userAgent.match(/Trident/)),
    isIEVersion:(navigator.userAgent.match(/(MSIE\s|rv:)([0-9]+\.[0-9]+)/))? parseFloat(RegExp.$2) : null ,
    isEdge:navigator.userAgent.match(/Edge/),
    getUniqueArr:function(arr) {
		var storage = {};
		var re = [];
		var i, value;
		for (i = 0; i < arr.length; i++) {
			value = arr[i];
			if (!(value in storage)) {
				storage[value] = true;
				re.push(value);
			}
		}
		return re;
	},
    getArrayShuffle:function(arr) {
        var m = arr.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }
    },
    getWindowSize:function(){
        var r = (window.devicePixelRatio)? window.devicePixelRatio : 1 ;
        var w = (document.body.clientWidth)? document.body.clientWidth : window.innerWidth;
        var h = (window.innerHeight)? window.innerHeight : document.documentElement.clientHeight ;
        return {w:w,h:h,r:r};
    },
    getScrollY:function(){
        return (window.scrollY == null)? document.documentElement.scrollTop : window.scrollY ;
    },
    getAngle:function(p1,p2){
        var angle = Math.atan2((p1.y-p2.y),(p1.x-p2.x))/(Math.PI/180);
        angle = (angle < 0)? 360 - Math.abs(angle) : angle;
        return angle;
    },
    getDirection:function(angle){
        if((angle <= 45 && angle >= 0) || (angle <= 360 && angle >= 315)){
            return 'left';
        } else if(angle >= 135 && angle <= 225){
            return 'right';
        } else if(angle > 45 && angle < 135){
            return 'down';
        } else {
            return 'up';
        }
    },
	setAnchor:function(_target){
        if(!_target) _target = $("body");
		$('a[href^="#"]',_target).bind("click",function() {
			var s = 350;
			var h= $(this).attr("href");
			var t = $(h == "#" || h == "" ? 'html' : h);
			var p = t.offset().top;
			$("html,body").animate({scrollTop:p}, s, 'swing');
			return false;
		});
	},
    setOsName:function(){
        var name = "";
        if(navigator.platform.indexOf("Win") != -1){
            name = "windows";
        }
        $("html").addClass(name);
    },
    setBrowserName:function(){
        var name = "";
        if(navigator.userAgent.match(/(firefox)/i)){
            name = "firefox";
        } else if(Util.isIE) {
            name = "ie";
            name += " ie"+Util.isIEVersion;
        } else if(Util.isEdge){
            name = "edge";
        } else if(navigator.userAgent.match(/(webkit)/i)){
            name = "webkit";
        }
        $("html").addClass(name);
    },
	windowAnimationFrameSetting:function(){
		var requestAnimationFrame =
									window.requestAnimationFrame ||
									window.mozRequestAnimationFrame ||
									window.webkitRequestAnimationFrame ||
									window.msRequestAnimationFrame;
		var cancelAnimationFrame =
									window.cancelAnimationFrame ||
									window.mozcancelAnimationFrame ||
									window.webkitcancelAnimationFrame ||
									window.mscancelAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
    	window.cancelAnimationFrame = cancelAnimationFrame;
	}
}

var CustomEasing = function(){
    var defaultEasing = "linear";
    var defaultFps = 1000/60;
    var defaultTotaltime = 1000;

    var isDraw = true;
    var fps = defaultFps;
    var count = 0;
    var easing = defaultEasing;
    var totaltime = defaultTotaltime;
    var startVal,stopVal,callback,result,value;

    this.onCreate = function(params){
        isDraw = true;
        fps = (params.fps == null)? defaultFps : params.fps;
        count = 0;
        easing = (params.easing == null)? defaultEasing : params.easing ;
        totaltime = (params.totaltime == null)? defaultTotaltime : params.totaltime;
        startVal = params.startVal;
        stopVal = params.stopVal;
        callback = params.callback;
        value = stopVal - startVal;
    }

    this.onDraw = function(){
        if(!isDraw) return result;
        var t = fps*count/totaltime;

        if(t>1){
            t=1;
            isDraw = false;
            if(callback != null) callback();
        } else {
            if(easing == defaultEasing){
                result = value*t;
            } else {
                result = $.easing[easing](0,t,0,value,1);
            }
            result += startVal;
            count++;
        }
        return result;
    }

    return this;
}

var ImageLoadClass = function(t){
    var _this = this;
    var target = (t==null)? "body" : t ;
    var arr = [];
    var count = 0;
    var timeoutId,imgObj,isRemove = false;
    var TIMEOUT = 2000;
    this.ONPROGRESS = "onProgress";
    this.ONLOADEND = "onLoadEnd";
    this.jq = $(this);
    this.bind = function(evt,func){this.jq.bind(evt,func);}
    this.unbind = function(evt,func){this.jq.unbind(evt,func);}

    this.addImg = function(a){
        arr = arr.concat(a);
    }

    this.onLoad = function(){
        count = 0;
        $("img",target).each(function(){
            var s = $(this).attr("src");
            if(s != null) arr.push(s);
        });

        $("*",target).each(function(){
            var b = $(this).css('background-image').match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+[a-z]/g);
            if(b != null) arr.push(b[0]);
        });

        arr = Util.getUniqueArr(arr);
		
		if(arr.length == 0){
			_this.jq.trigger(_this.ONLOADEND);
		}else{
			loop();	
		}
    }

    this.onRemove = function(){
        isRemove = true;
        if(imgObj){
            imgObj.onload = null;
            imgObj.onerror = null;
        }
        clearTimeout(timeoutId);
        timeoutId = null;
        arr = null;
    }

    function loop(){
        imgObj = new Image();
        imgObj.onload = function(){
            onProgress();
        };
        imgObj.onerror = function(){
            onProgress();
        };

        timeoutId = setTimeout(function(){
            imgObj.onload = null;
            imgObj.onerror = null;
            onProgress();
        },TIMEOUT);

        imgObj.src = arr[count];
    }

    function onProgress(){
        if(isRemove) return;
        clearTimeout(timeoutId);
        count++;
        _this.jq.trigger(_this.ONPROGRESS,{par:count/arr.length});
        if(count == arr.length){
            _this.jq.trigger(_this.ONLOADEND);
        } else {
            loop();
        }
    }

    return this;
}

var isTablet = function(){
	var flag = false;
	var ua = navigator.userAgent;
	 if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        flag = true;
    }
	return flag;
} 

var changeViewport = function(s){
	var size = s;
	if(!isTablet()){
	 	$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1">');
    } else {
        $('head').prepend('<meta name="viewport" content="width='+size+'">');
	}
}

var ImageChangeClass = function(){
    var spSize = 750;

    this.onResize = function(s){
		$("[data-src]").each(function(index, element) {
            var src = $(this).attr("data-src");
            if(!src) return true;
            if(s.w <= spSize && src.indexOf("/sp/") == -1 && !$(this).hasClass("notSP")) {
                var arr = src.split("/");
                arr.splice(arr.length - 1, 0, 'sp');
                $(this).attr('src', arr.join("/"));
            } else {
                $(this).attr('src', src);
            }
        });
    }

    return this;
}

var getWindowTop = function(){
	return $(window).offset().top;
}

var getWindowData = function(){
	var wt = $(window).scrollTop();
	var wh = window.innerHeight;
	var ww = window.innerWidth;
	return {top:wt,height:wh,width:ww};
}

var getHash = function(){
	var hash = location.hash;
	var hashName = urlHash.replace(/#/g,"") ;
	return {hash:hash,name:hashName};
}

var CanvasBaseClass = function(t){

	var _this = this;
	var target = t;
	var $canvas;
	var $wrap;
	var contentArray = [];
	this.stage = new createjs.Stage("canvas");
	
	this.onCreat = function(){
		$canvas = $(target);
		$wrap = $canvas.closest("div");
		//_this.stage = new createjs.Stage("canvas");
		
		createjs.Ticker.addEventListener("tick", handleTick);
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		
		_this.onResize();
	}
	
	this.addChild = function(itm){
		contentArray.push(itm)
		_this.stage.addChild(itm.obj); // 表示リストに追加
	}

	this.addChildArray = function(itm){
		contentArray.push(itm);
		for(var i = 0; itm.obj.length > i; i++){
			_this.stage.addChild(itm.obj[i]);
		}
	}
		
	this.addParticleArray = function(itm){
		contentArray.push(itm);
	}
	
	this.onResize = function(){
		if(!Util.isSP){
		_this.stage.canvas.width = $wrap.innerWidth();
		_this.stage.canvas.height = $wrap.innerHeight();
		}else{
			_this.stage.canvas.width = $wrap.innerWidth()*2;
			_this.stage.canvas.height = $wrap.innerHeight()*2;
			$canvas.css({"width":$wrap.innerWidth(),"height":$wrap.innerHeight()});
		}
	}

	this.updata = function(){
		// Stageの描画を更新します
		_this.stage.update();	
	}
	
	this.onBlur = function(){
		createjs.Ticker.reset();
		//0.7.1だと以下のプロパティが初期化されずに再スタートできなくなる
		//masterだと修正されているのでそのうちいらなくなるっぽい
		createjs.Ticker._timerId = null;
		createjs.Ticker._inited = false;
	}
	
	this.onFocus = function(){
		createjs.Ticker.init();
		createjs.Ticker.addEventListener('tick',handleTick);
		//_this.timeline.gotoAndPlay('start');
		//Tweenも使っているのであれば以下も必要
		createjs.Ticker.addEventListener('tick',createjs.Tween);
	}
	
	function handleTick() {
		for(var i = 0; contentArray.length > i; i++){
			// オブジェクト更新
			if(contentArray[i].act != null) contentArray[i].act(contentArray[i]);
			
			// パーティクルを発生
			if(contentArray[i].particle) {
				contentArray[i].obj = contentArray[i].emitPar(contentArray[i].obj);
				contentArray[i].obj = contentArray[i].updatePar(contentArray[i].obj);
			};
		}
		_this.stage.update();
	}
	$(window).on("blur",_this.onBlur);
	$(window).on("focus",_this.onFocus);
	$(window).on("resize",_this.onResize);
	$(_this.onCreat);
	return this;
}

var GooglemapClass = function(t,lon,lat,z,img,pd){
	var target = t;
	var zoom = z;
	var iconimg = (img != null)? img : null;
	var pointdata = (pd != null)? pd : null;
	
	var marker = [];
	var infoWindow = [];
	
	var latlng = new google.maps.LatLng(lon,lat);
	var latlngCenter = new google.maps.LatLng(lon+0.0003,lat);
	var myOptions = {
	  zoom: zoom, /*拡大比率*/
	  center: latlngCenter, /*表示枠内の中心点*/
	  //disableDefaultUI: true,
	  scrollwheel: false, /*マウスホイール無効*/
	  //draggable: false, /*ドラッグ、スワイプ無効*/
	  mapTypeId: google.maps.MapTypeId.ROADMAP/*表示タイプの指定*/
	};
	var map = new google.maps.Map(document.getElementById(target), myOptions);
	
	/*アイコン設定▼*/
	if(iconimg){
	var icon = new google.maps.MarkerImage(iconimg.img,
	  new google.maps.Size(iconimg.w,iconimg.h),/*アイコンサイズ設定*/
	  new google.maps.Point(0,0)/*アイコン位置設定*/
	  );
	}
	
	if(pointdata){
		 // マーカー毎の処理
		for (var i = 0; i < pointdata.length; i++) {
			markerLatLng = new google.maps.LatLng({lat: Number(pointdata[i].lat),lng: Number(pointdata[i].lon)}); // 緯度経度のデータ作成
			marker[i] = new google.maps.Marker({ // マーカーの追加
				position: markerLatLng, // マーカーを立てる位置を指定
				map: map, // マーカーを立てる地図を指定
				icon:icon
			});
		   infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
				content: '<div class="sample">' + pointdata[i].name + '</div>' // 吹き出しに表示する内容
		   });
			markerEvent(i); // マーカーにクリックイベントを追加
		}
		
	}else{
		var markerOptions = {
		  position: latlng,
		  map: map,
		  icon: icon
		};
		marker = new google.maps.Marker(markerOptions);
	}
	
	// マーカーにクリックイベントを追加
	function markerEvent(i) {
		marker[i].addListener('click', function() { // マーカーをクリックしたとき
			infoWindow[i].open(map, marker[i]); // 吹き出しの表示
		});
	}
}



var SnsShare = function(){
    var tw_url = "https://twitter.com/intent/tweet?text=";
    var fb_url = "https://www.facebook.com/sharer/sharer.php?u=";
	var gp_url = "https://plus.google.com/share?hl=ja&url=";
	var ln_url = "http://line.me/R/msg/text/?";

    var p1 = "sharewindow";
    var p2 = "width=640,height=460, menubar=no, toolbar=no, scrollbars=yes";
    this.onCreate = function(){

        var url = encodeURIComponent($('meta[property="og:url"]').attr("content"));
        var tw_txt = encodeURIComponent($('meta[property="og:description"]').attr("content"));
		var add_txt = encodeURIComponent("");

        var fb_href = fb_url+url;
        $(".js-share_fb")
            .attr({href:fb_href,target:"_blank"})
            .bind("click",function(){
                if(!Util.isBreakpoint){
                    window.open(fb_href,p1,p2);
                    return false;
                }
            });

        var tw_href = tw_url+tw_txt+add_txt+"&url="+url;
        $(".js-share_tw")
            .attr({href:tw_href,target:"_blank"})
            .bind("click",function(){
                if(!Util.isBreakpoint){
                    window.open(tw_href,p1,p2);
                    return false;
                }
            });
			
		var gp_href = gp_url+url;
        $(".js-share_gp")
            .attr({href:gp_href,target:"_blank"})
            .bind("click",function(){
                if(!Util.isBreakpoint){
                    window.open(gp_href,p1,p2);
                    return false;
                }
            });
		
		var ln_href = ln_url+url;
        $(".js-share_ln")
            .attr({href:ln_href,target:"_blank"})
            .bind("click",function(){
                if(!Util.isBreakpoint){
                    window.open(ln_href,p1,p2);
                    return false;
                }
            });
    }
    return this;
}

var FormClass = function(t){
	var parent = new BaseClass();
	var postPHP = "sendMail.php";
	parent.target = null;
	
	parent.onCreate = function(){
		parent.target = $(t);
		parent.target.submit(parent.onSubmit);
	}
	
	parent.onSubmit = function(){
		
		$(".error p",parent.target).html("");
		$(".error").removeClass("active");
		
		var data = new Object();
		var check = true;
		$("input,textarea",parent.target).each(function(index, element) {
            var o = $(this).val();
			if(!o) check = false;
			data[$(this).attr("name")] = o;
        });
		if(check){ 
			$.ajax({
				type:"POST",
				url:postPHP,
				data:data,
				dataType:"json",
				success: onSubmitCallback,
				cache:false,
				timeout:5000,
				error:function(XMLHttpRequest, textStatus, errorThrown){
					onSubmitCallback(null);
				}
			});
		}else{
			onSubmitCallback(null);
		}
		return false;
	}
	
	function onSubmitCallback(json){
		var isError = false;
		if(json == null || json.result == 0) isError = true;
		if(isError){
			$(".error p",parent.target).html("送信に失敗しました。<br class='onlySp'>お手数ですが、内容をご確認の上、しばらくたってから再度お試しください。");
			$(".error").addClass("active");
		} else {
			$("form",parent.target).slideUp('slow',function(){
				$(".comp p",parent.target).html("メール送信が完了致しました。<br>ご連絡ありがとうございます。");
				$(".comp").addClass("active");
			});
		}
	}
	
	return parent;
}


var SoundClass = function(path){
	var parent = new BaseClass();
	parent.isStart = false;
    parent.isLoad = false;
    parent.isActive = false;
    parent.target = null;
	parent.path = path;
	parent.soundID = null;
	
	parent.onCreate = function(){
		parent.soundID = parent.path.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
		createjs.Sound.registerSound(parent.path,soundID);
	}
	
	function onStart(){
		createjs.Sound.play(soundID);	
	}
	function onStop(){
		createjs.Sound.onStop(soundID);	
	}
	
	parent.onCreate = function(){ onCreate(); }
    parent.sup.onCreate = function(){ onCreate(); }
    parent.onLoad = function(){ onLoad(); }
    parent.sup.onLoad = function(){ onLoad(); }
    parent.onResize = function(size){ onResize(size); }
    parent.sup.onResize = function(size){ onResize(size); }
    parent.onScroll = function(st){ onScroll(st); }
    parent.sup.onScroll = function(st){ onScroll(st); }
    parent.onStart = function(){ onStart(); }
    parent.onStop = function(){ onStop(); }
    parent.onActive = function(){}
    return parent;
}

var BaseClass = function(){
    this.sup = {};
    this.jq = $(this);
    this.bind = function(evt,func){this.jq.bind(evt,func);}
    this.unbind = function(evt,func){this.jq.unbind(evt,func);}
    this.onCreate = function(){}
    this.onLoad = function(){}
    this.onResize = function(){}
    this.onScroll = function(){}
    this.onBlur = function(){}
    this.onFocus = function(){}
    this.onDraw = function(){}
    this.tickEvent = function(){}
    this.onChangeBreakPoint = function(b){}
    this.drinkMove = function(b){}
    this.onStart = function(){}
    this.onStop = function(){}
    this.onActive = function(){}
    return this;
}