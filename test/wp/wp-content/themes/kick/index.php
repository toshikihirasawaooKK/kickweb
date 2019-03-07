<?php get_header(); ?>

<div id="pjax_target">

<main id="main">
<div class="inner">

<div id="news" class="page">

<div class="news section fcl">
  <h2 class="din_bold"><img class="js-imgchange" src="/img/ttl_news.svg" data-src="/img/ttl_news.svg" alt="NEWS"></h2>

  <div class="news_content news_page">
    <div class="sort sort-list">
      <dl class="sort_nav sort_nav-category">
        <dt>CATEGORY:</dt>
        <dd>
          <ul class="sort_list_btn">
            <?php
              $terms = get_terms('news_category', 'hide_empty=0');
              foreach ($terms as $term){
                echo '<li><a class="class="js-pjax" href="/news?n='. $term->slug .'">'. $term->name .'</a></li>';
              }
            ?>
          </ul>
        </dd>
      </dl>
      <dl class="sort_nav sort_nav-year">
        <dt>YEAR:</dt>
        <dd>
          <ul class="sort_list_btn">
            <li><a href="<?php echo add_query_arg(array('y'=>'2017'));?>">2017</a></li>
            <li><a href="#">2016</a></li>
            <li><a href="#">2015</a></li>
            <li><a href="#">2014</a></li>
          </ul>
        </dd>
      </dl>
    </div><!-- /sort -->

    <div class="news_list">
      <?php $customPostArg = array(
          'post_per_page' => 9,
          'post_type' => 'news'
        );
        $customPosts = get_posts($customPostArg);
      ?>
      <?php if(have_posts()): while(have_posts()): the_post(); ?>
        <?php $terms = wp_get_object_terms($post->ID, 'news_category'); ?>
      <div class="news_list_item<?php foreach($terms as $term){echo ' '. $term -> slug;}?>">
        <a href="<?php the_permalink(); ?>">
          <div class="news_list_img">
            <?php the_post_thumbnail('news_list'); ?>
          </div>
          <h3 class="news_list_title"><?php the_title(); ?></h3>
          <time class="news_list_time"><?php the_time("y.m.d"); ?></time>
          <div class="news_list_txt newsBar">
            <?php
              if(mb_strlen($post->post_content, 'UTF-8')>102){
                  $content= mb_substr(strip_tags($post->post_content), 0, 102, 'UTF-8');
                  echo $content;
              }else{
                  echo strip_tags($post->post_content);
              }
              ?>
          </div>
          <span class="news_list_link din">READ MORE...</span>
        </a>
      </div>
      <?php endwhile; endif; ?>
      <?php wp_reset_postdata(); ?>
    </div>
  </div>
</div>

<div class="moreBtn"><a href="#"><img src="/img/more_btn.svg" alt=""></a></div>

<div class="access section fcl">
<h2 class="din_bold"><img class="js-imgchange" src="/img/ttl_access.svg" data-src="/img/ttl_access.svg" alt="ACCESS"></h2>
<div class="body">

<p>
〒107-0052　東京都港区赤坂8-5-32 <br class="onlySp">TanakaKoma Bldg. 6F<br>
T.03-6434-7217 / F.03-6434-7218
</p>

<p>
青山一丁目駅<br>
東京メトロ半蔵門線・銀座線、都営地下鉄大江戸線「出口4南」より徒歩3分
</p>

</div><!-- /body -->
</div><!-- /section -->

</div><!-- /page -->

</div><!-- /inner -->
</main><!-- /main -->

</div><!-- /pjax_target -->

<<?php get_footer(); ?>
