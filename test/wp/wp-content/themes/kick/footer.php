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
</body>
</html>
