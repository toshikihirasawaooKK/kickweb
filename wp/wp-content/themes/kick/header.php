<?php

$image_id = get_post_thumbnail_id();
$image_url = wp_get_attachment_image_src($image_id, 'news_list');

?>


<!DOCTYPE html>
<html lang="ja">
<head>
<script src="https://use.typekit.net/bps5aae.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<meta name="description" content="We are a Creative Produce Company We are here to break through convention and design new values.">
<meta name="keywords" content="株式会社キック,株式会社kiCk,キック,kiCk,kiCk inc.">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>NEWS｜kiCk</title>

<meta name="twitter:card" content="summary_large_image">
<?php if(is_singular('news')) { ?>
<meta property="og:title" content="<?php the_title(); ?>">
  <?php  }else{ ?>
<meta property="og:title" content="kiCk inc. / 株式会社kiCk">
<?php } ?>
<meta property="og:type" content="website">
<meta property="og:url" content="<?php echo the_permalink(); ?>">
<?php if(is_singular('news')) { ?>
  <meta property="og:image" content="<?php echo $image_url[0]; ?>">
<?php  }else{ ?>
  <meta property="og:image" content="http://www.kick.co.jp/img/ogp.png">
<?php } ?>
<meta property="og:description" content="We are a Creative Produce Company We are here to break through convention and design new values.">
<meta property="fb:app_id" content="1034122110070406">

<script src="/js/jquery-3.2.1.min.js"></script>
<script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.autopager-1.0.0.js"></script>
<script src="/js/jquery.easing.1.3.js"></script>
<script src="/js/jquery.transit.min.0.9.12.js"></script>
<script src="/js/jquery.drawsvg.min.js"></script>
<script src="/js/jquery.pjax.js"></script>
<script src="/js/util.js"></script>
<script src="/js/access.js"></script>
<script src="/js/contact.js"></script>
<script src="/js/index.js"></script>
<script src="/js/member.js"></script>
<script src="/js/recruit.js"></script>
<script src="/js/service.js"></script>
<script src="/js/works.js"></script>
<script src="/js/news.js"></script>
<script src="/js/worksdetail.js"></script>
<script src="/js/privacypolicy.js"></script>
<script src="/js/main.js"></script>

<link rel="stylesheet" property="stylesheet" href="/css/base.css" media="all">
<link rel="stylesheet" property="stylesheet" href="/css/news.css" media="all">
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwfyc_MYm04m1OP8aGMueQalqOtlNQqX4&callback=googlemapcallback"></script>

<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-60173075-5', 'auto');
ga('send', 'pageview');
</script>

<?php wp_head(); ?>
</head>
<body>


<header id="header">
<div class="space"></div>
<div class="base">
<div class="wrap">
<div class="inner fcl">
<h1><a href="/" class="js-pjax"><img src="/img/header_logo.svg" alt="kiCk"></a></h1>

<div class="nav_toggle onlySp"><a href=""><img src="/img/sp/nav.svg" alt=""><img src="/img/sp/nav_close.svg" alt=""></a></div>

<nav id="nav">
<div class="nav_inner">
<ul class="css_hover_nav din_bold">
<li><a href="/" class="js-pjax">ABOUT US</a></li>
<li><a href="/services.html" class="js-pjax">SERVICE</a></li>
<li><a href="/works.html" class="js-pjax">WORKS</a></li>
<li><a href="/members.html" class="js-pjax">MEMBER</a></li>
<li><a href="/recruit.html" class="js-pjax">RECRUIT</a></li>
<li><a href="/contact.html" class="js-pjax">CONTACT</a></li>
<li><a href="/news/">NEWS</a></li>
</ul>

<div class="facebook onlySp js-facebook_news">
<div class="logo"><a href="https://www.facebook.com/kickworld7/" target="_blank"><img src="/img/top_icon_fb.svg" alt="facebook"></a></div>
<p><a href="" target="_blank">
<span class="date din_light"></span>
<span class="txt yugo"></span>
</a></p>
</div><!-- /facebook -->

</div><!-- /nav_inner -->
</nav><!-- /nav -->

</div><!-- /inner -->
</div><!-- /wrap -->
</div><!-- /base -->
</header><!-- /header -->
