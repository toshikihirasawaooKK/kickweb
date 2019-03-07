// var ContactMailPartsClass = function(t){
//     var parent = new BaseClass();
//     var $target = t;
//     var $error;
//     var name;
//     var type;
//     var inputType;
//     var required;
//     var isAppend = false;

//     var V_NULL = 100;
//     var V_TEL_ERROR = 200;
//     var V_MAIL_ERROR = 300;

//     onCreate();
//     function onCreate(){
//         name = $target.attr("name");
//         type = $target.attr("data-type");
//         inputType = $target.attr("type");
//         required = ($target.attr("data-required") === "true");

//         if(inputType !== "submit"){
//             $target.bind("blur",onBlur);
//         }
//     }

//     function onBlur(){
//         var val = $(this).val();

//         if(required && val == ""){
//             attentionChange(V_NULL);
//         } else if(val !== ""){
//             attentionChange(validateCheck(val));
//         } else {
//             attentionClear();
//         }
//     }

//     function validateCheck(val){
//         var errorCode = -1;
//         switch(type){
//             case "email":
//                 if(!mailCheck(val)){
//                     errorCode = V_MAIL_ERROR;
//                 }
//                 break;
//             case "tel":
//                 if(!telCheck(val)){
//                     errorCode = V_TEL_ERROR;
//                 }
//                 break;
//         }
//         return errorCode;
//     }

//     function attentionChange(val){
//         var text = "";
//         switch(val){
//             case V_NULL:
//                 text = "入力してください";
//                 break;
//             case V_TEL_ERROR:
//                 text = "半角数字で正しく入力してください";
//                 break;
//             case V_MAIL_ERROR:
//                 text = "メールアドレスを正しく入力してください";
//                 break;
//         }

//         if(text !== ""){
//             if(!$error || $error.length <= 0){
//                 $error = $('<span class="error"></span>').insertAfter($target);
//                 isAppend = true;
//             }
//             $error.text(text);
//         } else {
//             attentionClear();
//         }
//     }

//     function attentionClear(){
//         if(isAppend){
//             $error.remove();
//             isAppend = false;
//         }
//     }

//     function telCheck(val){
//         if(val.match(/[0-9-]{6,9}$|[0-9-]{12}/)){
//             return true;
//         } else {
//             return false;
//         }
//     }

//     function mailCheck(val){
//         //copy http://emailregex.com/
//         if(val.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
//             return true;
//         } else {
//             return false;
//         }
//     }

//     parent.onCheck = function(){
//         var val = $target.val();
//         var re = false;
//         if(required && val === ""){
//             re = true;
//             attentionChange(V_NULL);
//         } else if(val !== ""){
//             var v = validateCheck(val);
//             if(v !== -1) re = true;
//             attentionChange(v);
//         }

//         return re;
//     }

//     parent.getVal = function(){
//         var val = $target.val();
//         return {key:name,value:val};
//     }

//     return parent;
// }

var ContactSectionClass = function(){
    var parent = new BaseSectionAnimationClass("#contact.page .contact.section");
    parent.onCreate = function(){
        parent.inheritance.onCreate();
    }
    parent.onActive = function(){
        parent.inheritance.onActive();
    }
    return parent;
}

var CheckBoxClass = function(){
    var parent = new BaseClass();

    parent.onCreate = function(){
        var checkboxBtn = $('.checkbox-btn');
        var submitBtn = $('.css_button');

        checkboxBtn.on('click', function(){
            if(this.checked){
                submitBtn.prop("disabled", false);
            } else {                
                submitBtn.prop("disabled", true);
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

var ContactPageClass = function(){
    var parent = new PjaxPageClass();
    var $target,$form,$loader;
    var parts;
    var isSend = false;
    var timerId;

    parent.parts = {
        s1:new ContactSectionClass(),
        checkBox: new CheckBoxClass(),
        map: new AccessPageClass()
    };

    // parent.onCreate = function(){
    //     parent.super.onCreate();
    //     $target = $("#contact.page");

    //     $form = $("form",$target);

    //     $loader = $(".css_loader",$target);

    //     parts = [];
    //     $("form input").each(function(){
    //         var p = new ContactMailPartsClass($(this));
    //         parts.push(p);
    //     });
    //     $("form textarea").each(function(){
    //         var p = new ContactMailPartsClass($(this));
    //         parts.push(p);
    //     });

    //     $form.on("submit",onSubmit);
    // }

    // parent.onRemove = function(){
    //     parent.super.onRemove();
    //     $form.off("submit",onSubmit);

    //     $target = null;
    //     $form = null;
    //     $loader = null;
    // }

    // function onSubmit(){
    //     if(isSend) return false;
    //     var checkArr = [];
    //     for(var i=0; i<parts.length; i++){
    //         checkArr.push(parts[i].onCheck());
    //     }

    //     if(checkArr.indexOf(true) !== -1) return false;
    //     isSend = true;
    //     loaderVisible(true);

    //     $(".form_page.input",$target).slideUp();
    //     $(".form_page.complete",$target).slideDown();

    //     timerId = setTimeout(function(){
    //         var data = {};
    //         for(var i=0; i<parts.length; i++){
    //             var o = parts[i].getVal();
    //             data[o.key] = o.value;
    //         }

    //         $.ajax({
    //             type:"POST",
    //             url:"/php/sendMail.php",
    //             data:data,
    //             dataType:"json",
    //             success: onSubmitCallback,
    //             cache:false,
    //             timeout:5000,
    //             error:function(XMLHttpRequest, textStatus, errorThrown){
    //                 onSubmitCallback(null);
    //             }
    //         });
    //     },1000);

    //     return false;
    // }

    // function onSubmitCallback(json){
    //     var isError = false;
    //     if(json === null || json.result === 0){
    //         isError = true;
    //     }

    //     if(isError){
    //         $(".form_page.complete p",$target).html("送信に失敗しました。<br>お手数ですが、しばらくたってから再度お試しください。");
    //     } else {
    //         $(".form_page.complete p",$target).html("メール送信が完了致しました。<br>ご連絡ありがとうございます。");
    //     }

    //     loaderVisible(false);
    // }

    // function loaderVisible(b){
    //     if(b){
    //         $loader.stop(true,false)
    //             .css({opacity:0,display:"block"})
    //             .animate({opacity:1},300);
    //     } else {
    //         $loader.stop(true,false)
    //             .animate({opacity:0},300,function(){ $(this).css({display:"none"}); });
    //     }
    // }

    return parent;
}
