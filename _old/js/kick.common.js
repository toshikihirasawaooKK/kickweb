var ContentAnimeData = {
"top":{
},
"about":{
	"e1":{
		"c1":{params:{x:-10,y:20},delay:0},
		"c2":{params:{x:-10,y:20},delay:300},
		"c3":{params:{x:-10,y:20},delay:600},
		"c4":{params:{x:-10,y:20},delay:900},
		"c5":{params:{x:-10,y:20},delay:1200}
	},
	"e2":{
		"c1":{params:{x:-10,y:20},delay:0},
		"c2":{params:{x:-10,y:20},delay:300},
		"c3":{params:{x:-10,y:20},delay:600},
		"c4":{params:{x:-10,y:20},delay:900},
		"c5":{params:{x:-10,y:20},delay:1200}
	}
},
"services":{
	"e1":{
		"c1":{params:{x:-10,y:20},delay:0},
		"c2":{params:{x:-10,y:20},delay:300}
	},
	"e2":{
		"c1":{params:{x:-10,y:20},delay:0},
		"c2":{params:{x:-10,y:20},delay:300}
	}
},
"recruit":{
	"e1":{
		"c1":{params:{x:-10,y:20},delay:0},
		"c2":{params:{x:-10,y:20},delay:300}
	},
	"e2":{
		"c1":{params:{x:10,y:20},delay:0},
		"c2":{params:{x:10,y:20},delay:300}
	},
	"e3":{
		"c1":{params:{x:-10,y:20},delay:0},
		"c2":{params:{x:-10,y:20},delay:300}
	}
}
};

var colorPattern = [
		{name:"red",code:"255,0,170"},
		{name:"green",code:"20,200,177"},
		{name:"yellow",code:"241,217,34"},
		{name:"blue",code:"0,189,211"},
		{name:"orange",code:"251,95,57"}
		];

var BgSlideClass = function(t){
	var _this = this;
	var $target = t;
	var nowview = 0;
	var nextview = 0;
	var viewCount = 0;
	var anime = {
		timer:"",
		spd:1000,
		delay:8000,
		scale:1.1,
		scalespd:10000
	}
	var animeflag = true;
	
	this.onCreat = function(){
		$("li",$target).each(function(index, element) {
			if(nowview == index){
				$(this).css({opacity:1,"z-index":3});
				$("div",$(this)).css({scale:1}).customAnimation({scale:anime.scale},anime.scalespd,"linear");
			}else{
				$(this).css({opacity:0,"z-index":1});
			}
        });
		viewCount = $("li",$target).length - 1;
		onStart();
	}
	
	this.onLoad = function(){
	}
	this.onScroll = function(){}
	this.onResize = function(){}
	
	this.onBlur = function(){
		animeflag = false;
		clearTimeout(anime.timer);
	}
	this.onFocus = function(){
		animeflag = true;
		clearTimeout(anime.timer);
		onStart();
	}
	
	this.onRemove = function(){
		clearTimeout(anime.timer);
		nowview = 0;
		nextview = 0;
	}
	
	function onStart(){
		if(!animeflag) return;
		anime.timer = setTimeout(onMove,anime.delay);
	}
	
	function onMove(){	
		nextview = nowview + 1; 
		if(nextview > viewCount) nextview = 0;
		onShow(nextview,function(){
			onReset(nextview,nowview);
			nowview = nextview;
			onStart();
		});
	}
	
	function onReset(next,now){
		$("li",$target).eq(next).css({"z-index":2});
		$("li",$target).eq(now).css({opacity:0,"z-index":1});
		
		//$("div",$("li",$target).eq(next)).css({scale:1});
		$("div",$("li",$target).eq(now)).css({scale:1});
	}
	function onShow(num,callback){
		$("li",$target).eq(num)
		.css({"z-index":3})
		.customAnimation({opacity:1},anime.spd,"ease",callback);
		
		$("div",$("li",$target).eq(num))
		.css({scale:1})
		.customAnimation({scale:anime.scale},anime.scalespd,"linear");
	}
	
	$(_this.onCreat);
	
	return this;
}

var SoundVisualizerClass = function(){
	var _this = this;
	parent.target = null;
	var $btn = $(".js-sound");
	var context,analyserNode,dynamicsNode,soundinstance,cookie;
	var animationId,animationEndId,animationNoPlayId;
	var noPlaySounID,noPlaySoundCount,startTime;
	var weavBaseByteData = [35,40,50,57,65,70,75,80,85,90,95,100,105,110,105,100,95,90,85,80,75,70,65,57,50,40,35,0];
	var weavByteData;
	var noPlayByteData = [];
	var fileURL = "/sound/WebDemo0_ver2_0713.mp3";
	var soundID = "sound";
	var soundflag = false;
	
	this.ON_LOAD_END = "ONLOADEND";
	this.ON_READ = "ONREAD";
	this.ON_STOP = "ONSTOP";
	
	this.jq = $(this);
    this.bind = function(evt,func){this.jq.bind(evt,func);}
    this.unbind = function(evt,func){this.jq.unbind(evt,func);}
	
	this.onCreate = function(){
		
		Util.windowAnimationFrameSetting();
		
		//sound設定
        //オーディオファイルを登録
        createjs.Sound.registerSound( fileURL, soundID);
		createjs.Sound.on("fileload", _this.onLoadEnd);
		
		if(!Util.isIE){
			//ビジュアライザー設定
			FFTSIZE = 32;
			context = createjs.Sound.activePlugin.context;
			analyserNode = context.createAnalyser();
			analyserNode.fftSize = FFTSIZE;
			// 波形データを格納する配列の生成
			analyserNode.connect(context.destination);
			
			dynamicsNode = createjs.Sound.activePlugin.dynamicsCompressorNode;
			dynamicsNode.disconnect();  // disconnect from destination
			dynamicsNode.connect(analyserNode);
		}
		
		cookie = ($.cookie(soundID) == "false")? $.cookie(soundID) : "true";
		$.cookie(soundID,cookie,{ expires: 7 });
	}
	
	this.onLoadEnd = function(){
		_this.jq.trigger(_this.ON_LOAD_END);
		
		var flag = false;
		soundinstance = createjs.Sound.createInstance(soundID);
		
		$(".sound").addClass("active");
		if(!Util.isSP){
			if($.cookie(soundID) == "true"){
				$btn.removeClass("off");
				_this.onStart();
			}else{
				loopStart();
			}
		}else{
			_this.onStop();
			loopStart();
		}
		
		return flag;
	}
	
	this.onStart = function(){
		clearTimeout(noPlaySounID);
		soundinstance.play({loop:-1});
		if(Util.isIE) return;
		ReadSoundData();
	}
	
	this.onStop = function(){
		soundinstance.paused = true;
	}
	
	this.onSoundSwitch = function(){
		clearTimeout(noPlaySounID);
		soundinstance.paused ? soundinstance.paused = false : soundinstance.paused = true;
		if(soundinstance.paused){
			$btn.addClass("off");
			flag = "false";
			if(!Util.isIE){
				window.cancelAnimationFrame(animationId);
				endfreqByteData = freqByteData;
				StopSoundData();
			}
			
		}else{
			soundinstance.play({loop:-1});
			$btn.removeClass("off");
			flag = "true";
			if(!Util.isIE){
				window.cancelAnimationFrame(noPlaySoundData);
				window.cancelAnimationFrame(animationEndId);
				ReadSoundData();
			}
		}
		$.cookie("sound",flag,{ expires: 7 });
	}
	
	function ReadSoundData(){
		freqByteData = new Uint8Array(FFTSIZE / 2);
		analyserNode.getByteFrequencyData(freqByteData);
		_this.jq.trigger(_this.ON_READ,{ByteData:freqByteData,opacity:false});
		animationId = requestAnimationFrame(ReadSoundData);
	}
	
	function StopSoundData(){
		var count = 0;
		var point = 2;
		for(var i=0; endfreqByteData.length > i; i++){
			endfreqByteData[i] = (endfreqByteData[i] - point >= 0)? endfreqByteData[i] - point : 0;
			count = count + endfreqByteData[i];
		}
		_this.jq.trigger(_this.ON_READ,{ByteData:endfreqByteData,opacity:true});
		if(count <= 0){
			window.cancelAnimationFrame(animationEndId);
			loopStart();
		}else{
			animationEndId = requestAnimationFrame(StopSoundData);
		}
	}
	
	function loopStart(){
		noPlaySoundCount = 1;
		weavByteData = $.extend(true, [], weavBaseByteData);
		noPlayByteData = [];
		loop();
	}
	
	function loop(){
		clearTimeout(noPlaySounID);
		noPlaySounID = setTimeout(noPlaySoundData,1000 / 10);
	}
	
	function noPlaySoundData(){
		
		if(weavByteData.length != 0){
			var n = weavByteData.shift();
			noPlayByteData.unshift(n);
		}else{
			var n = noPlayByteData.pop();
			noPlayByteData.unshift(n);
		}
		_this.jq.trigger(_this.ON_READ,{ByteData:noPlayByteData,opacity:true});
		loop();
	}
	
	return this;
}


var AnimationClass = function(id,data,t){
	var _this = this;
	
	this.id = id;
	this.displayflag = false;
	var $target = $("#"+id,t);
	var animeData = data;
	var animationArray = [];
	var default_duration = 500;
	var addClass = false;
	var default_easing = "easeOutCubic";
	
	this.onCreate = function(){
		$("[data-anime]",$target).css({"opacity":0});
		var keys = Object.keys(animeData);
		for( var i=0, l=keys.length; i<l; i+=1) {
			var data = {};
			data.duration = (animeData[keys[i]].duration !=null)? animeData[keys[i]].duration : default_duration;
			data.easing = (animeData[keys[i]].easing !=null)? animeData[keys[i]].easing : default_easing;
			data.addClass = (animeData[keys[i]].addClass !=null)? animeData[keys[i]].addClass : false;
			data.delay = animeData[keys[i]].delay;
			data.params = animeData[keys[i]].params;
			animationArray.push(
				{target:$("[data-anime="+keys[i]+"]",$target),data:data}
			);
		}
		for(var i = animationArray.length; i--;){
			animationArray[i].target
			//.css({"opacity":0,"-webkit-backface-visibility":"hidden","backface-visibility":"hidden"})
			.css({"opacity":0})
			.animate(animationArray[i].data.params,0);
		}
	}
	
	this.onDisplay = function(){
		if(animationArray.length == 0 || _this.displayflag) return; 
		_this.displayflag = true;
		for(var i = 0; i < animationArray.length; i++){
				animationArray[i].target
				.delay(animationArray[i].data.delay)
				.animate(
				{x:0,y:0,"opacity":1},
				animationArray[i].data.duration
				);
			//}
		}
	}
	
	this.onHidden = function(){
		if(animationArray.length == 0 || !_this.displayflag) return; 
		_this.displayflag = false;
		for(var i = 0; i < animationArray.length; i++){
			animationArray[i].target
			.css({"opacity":0})
			.customAnimation(animationArray[i].data.params,0);
			
			if(animationArray[i].data.addClass){
				animationArray[i].target.removeClass(animationArray[i].data.addClass);
			}
		}
	}
	
	_this.onCreate();
	return this;
}

var AnimationManegerClass = function(){
	var _this = this;
	var contentArray = [];
	var data;
	var $target;
	
	this.onCreate = function(d,t){
		data = d;
		$target = $(t);
		contentArray = [];
		if(!data) return;
		var keys = Object.keys(data);
		for( var i=0, l=keys.length; i<l; i+=1){
			contentArray.push(new AnimationClass(keys[i],data[keys[i]],$target));
		}
	}
	
	this.onMove = function(id){
		for(var i = contentArray.length; i--;){
			if(contentArray[i].id == id){
				if(!contentArray[i].displayflag) contentArray[i].onDisplay();
				return;	
			}
		}
	}
	
	this.onScroll = function(e){
		if(!data) return;
		var WS = Util.getWindowSize();
		var stT = $(window).scrollTop() - WS.h/5;
		var stB = $(window).scrollTop() + WS.h - WS.h/5;
		for(var i = contentArray.length; i--;){
			if($("#"+contentArray[i].id).attr("data-scroll") =="off") return;
			var contentTop = $("#"+contentArray[i].id,$target).offset().top;
			var contentBottom = $("#"+contentArray[i].id,$target).height() + contentTop;
			if(stT < contentBottom && stB > contentTop ){
				if(!contentArray[i].displayflag) contentArray[i].onDisplay();
			}
			
		}
	}
	
	this.onRemove = function(){
		for(var i = contentArray.length; i--;){
			contentArray[i].onHidden();
		}
	}
	
	//$(_this.onCreate);
	return this;
}


var defaultPageClass = function(){
	var parent = new ParentClass();
	
	parent.onCreate = function(target){
		parent.id = target;
		parent.target = $("#"+target);
		parent.sup.onCreate();
	}
	
	return parent;
}

var TopPageClass = function(num){
	var parent = new ParentClass();
	var canvas,canvasContext,bgSlideClass;
	
	parent.colorNum = num;
	
	parent.onCreate = function(target){
		parent.id = target;
		parent.target = $("#"+target);
		
		bgSlideClass = new BgSlideClass($(".js-bg_slide",parent.target));
		
		if(!Util.isIE){
			$(".visualizer img",parent.target).hide();
			
		//canvas設定
		canvas = document.getElementById('soundvisualizer');
		canvasContext = canvas.getContext('2d');
		canvas.setAttribute('width', 57 * 10); //frequencyBinCountは、fftSizeの1/2の値
		
		}else{
			//$(".visualizer .canvas",parent.target).hide();
		}
		
		parent.sup.onCreate();
	}
	
	parent.onSound = function(data){
		if(Util.IE) return;
		var baffa = data.ByteData;
		var opa = data.opacity;
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		var len = 11;
		for(var i=0; i < len; i++){
			var w = canvas.width/len;
			var heString = String(Math.floor((baffa[i] / 255)*100));
			var he3String = ( '000' + heString ).slice( -3 );
			var heNumber = Number(heString);
			var block = Number(he3String.substr(0,2));
			var opacity = Number(he3String.slice(-1))/10;
			
			for(var j = 0; j < 11; j++){
				var p = j*10;
				if(p <= heNumber){
					if(p == block*10 && opa){
						canvasContext.fillStyle = "rgba("+colorPattern[parent.colorNum].code+","+opacity+")";
					}else{
						canvasContext.fillStyle = "rgba("+colorPattern[parent.colorNum].code+",1.0)";
					}
					canvasContext.fillRect(w*i, canvas.height - (j*7), w-2, 5);
				}
			}
			
		}
	}
	
	parent.onRemove= function(){
		bgSlideClass.onRemove();
	}
	
	return parent;
}

var worksPageClass = function(){
	var parent = new ParentClass();
	
	parent.onCreate = function(target){
		parent.id = target;
		parent.target = $("#"+target);
		
		parent.animeData = parent.animetionSet("li","a");
		
		parent.animeData = animeData;
		
		parent.sup.onCreate();
	}
	
	return parent;
}

var membersPageClass = function(){
	var parent = new ParentClass();
	var animeData = {};
	
	parent.onCreate = function(target){
		parent.id = target;
		parent.target = $("#"+target);
		
		parent.animeData = parent.animetionSet("li",".list-inner");
		
		parent.sup.onCreate();
	}
	
	return parent;
}

var formPageClass = function(){
	var parent = new ParentClass();
	var formClass;
	
	parent.onCreate = function(target){
		parent.id = target;
		parent.target = $("#"+target);
		
		formClass = new FormClass(parent.target);
		formClass.onCreate();
		
		parent.sup.onCreate();
	}
	
	return parent;
}

var AboutPageClass = function(){
	var parent = new ParentClass();
	
	parent.onCreate = function(target){
		parent.id = target;
		parent.target = $("#"+target);
		
		parent.sup.onCreate();
		
		//map表示
		if($("#map_canvas",parent.target)[0]){
			var lat = Number($("#map_canvas").attr("data-lat"));
			var lon = Number($("#map_canvas").attr("data-lon"));
			GooglemapClass("map_canvas",lat,lon,17,null,null);
		}
	}
	
	return parent;
}


var ParentClass = function(){
   var _this = this;
    var isBlur = false;
    var isCreate = false;
    var isLoad = false;
	
	_this.id = null;
	_this.target = null;
	_this.animeData = null;
	_this.colorNum = null;
	
	var contentAnimeData = ContentAnimeData;
	var animationManegerClass = new AnimationManegerClass();
	var imageChange = new ImageChangeClass();

    function onCreate(){
		if(contentAnimeData[_this.id] || _this.animeData){
			var animeData = (_this.animeData)? _this.animeData : contentAnimeData[_this.id];
			animationManegerClass.onCreate(animeData,_this.target);
			window.scrollTo(0,1);
		}
		isCreate = true;
		_this.onLoad();
    }

    this.onLoad = function(){
        isLoad = true;
        if(!isCreate) return;
        _this.onResize();
    }

    this.onResize = function(){
        var size = Util.getWindowSize();
		imageChange.onResize(size);
        _this.onScroll();
    }

    this.onBlur = function(){
        isBlur = true;
        //onBlur();
    }

    this.onFocus = function(){
        if(!isBlur) return;
        isBlur = false;
		//onFocus();
    }

    this.onScroll = function(){
        var st = Util.getScrollY();
		if(animationManegerClass) animationManegerClass.onScroll();
		/*if($(".headbg")[0]){
			if(st > 100){
				$(".headbg").addClass("stop");	
			}else{
				$(".headbg").removeClass("stop");	
			}
		}*/
    }
	
	this.onRemove = function(){
		if(animationManegerClass) animationManegerClass.onRemove();
	}
	
	this.animetionSet = function(list,target){
		animeData = {};
		var count = 1;
		var beforeElementTop;
		var parallelCount = 1;
		$(list,_this.target).each(function(index, element) {
			$(this).attr("id","e"+count);
			$(target,$(this)).attr("data-anime","co").css({"opacity":0});
			
			var top = $(this).offset().top;
			var adddelay;
			if(beforeElementTop && beforeElementTop == top){
				adddelay = 300*parallelCount;
				parallelCount++;
			}else{
				adddelay = 100;
				parallelCount = 1;
			}
			
			animeData["e"+count] = {"co":{params:{x:-10,y:20},delay:adddelay}};
			count++;
			beforeElementTop = top;
        });
		
		return animeData;
	}
	
    this.sup = {};
    this.onCreate = function(t){ }
	this.sup.onCreate = function(t){ onCreate(); }
	this.onSound = function(data){}
    this.onChangeBreakPoint = function(b){}
    return this;
}

//ページアニメ
var FadeTransition = Barba.BaseTransition.extend({
	start: function() {
		Promise
		.all([this.newContainerLoading, this.fadeOut()])
		.then(this.fadeIn.bind(this));
	},
	fadeOut: function() {
		return $(this.oldContainer).animate({ opacity: 0 }).promise();
	},
	fadeIn: function() {
		var _this = this;
		var $el = $(this.newContainer);
		$(this.oldContainer).hide();
		
		var imgload = new ImageLoadClass($el);
		
		imgload.bind(imgload.ONLOADEND,function(){
			window.scrollTo(0,0);
			$el.css({ visibility : 'visible',opacity :0});
			$el.customAnimation({ opacity: 1 }, 400, function() {
				_this.done();
			});
			
		});
		
		imgload.onLoad();
	}
});

var PageManagerClass = function(){
	var _this = this;
	var $nav,$menubtn,$soundbtn;
	var soundID = "sound01";
	var soundinstance;
	var cookie;
	var pageID;
	var FFTSIZE,freqByteData,endfreqByteData,analyserNode,animationId,animationEndId;
	var flag = {
		"sound":false
	}
	var soundVisualizerClass;
	
	var colorNum = Math.round(Math.random()*4);
	
	var PageClass = {
		"top":new TopPageClass(colorNum),
		"about":new AboutPageClass(),
		"services":new defaultPageClass(),
		"works":new worksPageClass(),
		"works_under":new defaultPageClass(),
		"members":new membersPageClass(),
		"recruit":new formPageClass(),
		"contact":new formPageClass(),
		"privacy_policy":new defaultPageClass()
	}
	
	function onCreat(){
		
		//pjax設定
		Barba.Pjax.getTransition = function() {
		  return FadeTransition;
		};
		Barba.Pjax.start();
		Barba.Dispatcher.on('newPageReady', function(currentStatus,oldStatus,container) {
			ga('send','pageview', location.pathname.slice(1));
			onStart($("main",container).attr("id"));
		});
		
		//viewport設定
		var ua = navigator.userAgent;
		if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
			$('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">');
		} else {
			$('head').prepend('<meta name="viewport" content="width=1024">');
		}
		
		//safari判定
		if(Util.isSafari){
			$("html").addClass("isSafari");
		}
		
		//sound設定
        soundVisualizerClass = new SoundVisualizerClass();
		soundVisualizerClass.onCreate();
		soundVisualizerClass.bind(soundVisualizerClass.ON_READ,soundRead);
		//soundVisualizerClass.bind(soundVisualizerClass.ON_LOAD_END,soundLoadEnd);
		
		$nav = $(".content header nav");
		$menubtn = $(".menubtn a");
		$menubtn.on("click",toggleActive);
		$soundbtn = $(".sound a");
		$soundbtn.on("click",soundSwitch);
		
		$("body").addClass(colorPattern[colorNum].name);
		
		onStart();
	}
	
	function soundRead(event,data){
		if(PageClass[pageID]) PageClass[pageID].onSound(data);
	}
	
	function soundSwitch(){
		soundVisualizerClass.onSoundSwitch();
		return false;
	}
	
	function onStart(t){
		var id;
		if(t != null){
			id = t;
		}else{
			id = $("main").attr("id");
		}
		if(pageID) PageClass[pageID].onRemove();
		PageClass[id].onCreate(id);
		pageID = id;
		reSetPage(pageID);
	}
	
	function reSetPage(name){
		$("a",$nav).removeClass("active no-barba").off("click",noPjaxlink);
		$("a."+name,$nav).addClass("active no-barba").on("click",noPjaxlink);
		if(name == "top"){
			$(".content").addClass("topview");
			$("body").css({"overflow":"hidden"});
		}else{
			$(".content").removeClass("topview");
			$("body").css({"overflow":"auto"});
		}
		
		if($menubtn.hasClass("active")){
			toggleActive();
		}
		
	}
	function noPjaxlink(){ return false; }
	
	function toggleActive(){
		$menubtn.toggleClass("active");
		$nav.toggleClass("active");
		return false;
	}
	
	function onScroll(){ if(PageClass[pageID]) PageClass[pageID].onScroll(); }
	function onLoad() {}
	function onResize() { PageClass[pageID].onResize(); };
	
	
	$(onCreat);
	
	//$(window).bind("load",onLoad);
    $(window).bind("resize orientationchange",onResize);
	$(window).bind("scroll",onScroll);
    //$(window).bind("blur pagehide",onBlur);
    //$(window).bind("focus pageshow",onFocus);
	
	return this;
}

var pageManagerClass = new PageManagerClass();