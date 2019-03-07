<footer id="footer">
<div class="inner">
<div class="pagetop"><a href="#"><img class="js-imgchange" src="/img/btn_pagetop.svg" data-src="/img/btn_pagetop.svg" alt="page top"></a></div>
<div class="txt">
<a href="privacypolicy.html" class="privacypolicy" target="_blank"><img class="js-imgchange" src="/img/s.gif" data-src="/img/footer_privacy.svg" alt="PRIVACY POLICY"></a>
<small class="copyright">
<img class="js-imgchange" src="/img/s.gif" data-src="/img/footer_copy.svg" alt="Copyright kiCk inc.All Rights Reserved.">
</small>
</div><!--/txt-->
</div><!-- /inner -->
</footer><!-- /footer -->


<script>
  var maxpage = <?php echo $wp_query->max_num_pages; ?>;
  $(function(){
    $.autopager({
        content: '.news_list_item',// 読み込むコンテンツ
        link: '.moreBtn a', // 次ページへのリンク
        autoLoad: false,// スクロールの自動読込み解除

        start: function(current, next){
          $('.moreBtn').css('display', 'none');
        },

        load: function(current, next){
            $('.moreBtn').css('display', 'block');
            if( current.page >= maxpage ){ //最後のページ
                $('.moreBtn').hide(); //次ページのリンクを隠す
            }
        }
    });
  });

  $('.moreBtn a').click(function(){ // 次ページへのリンクボタン
   $.autopager('load'); // 次ページを読み込む
   return false;
  });
</script>

<script>
  function initMap() {

      // 地図の初期中心座標を指定
      var latLng = new google.maps.LatLng(35.672001, 139.726323);
      var POSITION = {lat:35.672001,lng:139.726323};
      var map = new google.maps.Map(document.getElementById("#access.page .googlemap"),
      {
        zoom: 15,
        center: POSITION,
        mapTypeControl:false,
        fullscreenControl:false
      }
      );

      // マーカーの設定
      var marker = new google.maps.Marker({
          position: POSITION,
          map: mapObject,
          icon:iconImage
      });

      var mapStyle = [
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
      var iconImage = {
          url: "./img/map_pin.svg",
          scaledSize: new google.maps.Size(40, 68)
      };
      if(Util.isIE) iconImage.url = "./img/map_pin.png";
      var mapType = new google.maps.StyledMapType(mapStyle);

      // map.mapTypes.set('GrayScaleMap', mapType);
      // map.setMapTypeId('GrayScaleMap');
  }

</script>
</body>
</html>
