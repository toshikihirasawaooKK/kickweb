<?php

get_header();
?>
<div id="pjax_target">

<main id="main">
<div class="inner">

<div id="news" class="page">

<div class="news news_detail section fcl">
  <div class="news_detail_mv js-anim_nextset"><img src="<?php echo get_field('kv_detail'); ?>" alt=""></div>

  <h2 class="din_bold onlyPc"><img class="js-imgchange" src="/img/ttl_news.svg" data-src="/img/ttl_news.svg" alt="NEWS"></h2>

  <div class="news_content detail_content body">

    <h3 class="detail_title"><?php the_title(); ?></h3>
    <time class="detai_time"><?php the_time('Y.m.d'); ?></time>
    <div class="detai_txt newsBar">
      <?php  while(have_posts()): the_post(); ?>
        <?php the_content(); ?>
      <?php endwhile; ?>
    </div>

    <ul class="relation_category">
      <?php
        $terms = wp_get_object_terms($post->ID, 'news_category');
        foreach($terms as $term){
          echo '<li><a href="/news/'.$term->slug.'">'. $term->name .'</a></li>';
        }
      ?>
    </ul>

    <?php echo do_shortcode('[addtoany]'); ?>
  </div>
</div>

<div class="other_news section">
  <h2 class="din_bold"><img class="js-imgchange" src="/img/ttl_othernews.svg" data-src="/img/ttl_othernews.svg" alt="OTHER NEWS"></h2>
  <div class="news_content body">
    <div class="sort_news din_bold">
      <dl class="sort_nav sort_nav-category">
        <dt>CATEGORY:</dt>
        <dd>
          <ul class="sort_list_btn">
            <?php
              $terms = get_terms('news_category', 'hide_empty=0');
              foreach ($terms as $term){
                echo '<li><a href="/news/'. $term->slug .'">'. $term->name .'</a></li>';
              }
            ?>
          </ul>
        </dd>
      </dl>
      <dl class="sort_nav sort_nav-year">
        <dt>YEAR:</dt>
        <dd>
          <ul class="sort_list_btn">
            <?php
              $year = NULL;
              $args = array(
                'post_type' => 'news',
                'orderby' => 'date',
                'post_status' => 'publish',
                'post_per_page' => -1
              );
              $the_query = new WP_Query($args);
              if($the_query->have_posts()){
                while($the_query->have_posts()): $the_query->the_post();
                if($year != get_the_date('Y')){
                  $year = get_the_date('Y');
                  echo '<li><a href="/news/?='.$year.'">'.$year.'年</a></li>';
                }
              endwhile;
              wp_reset_postdata();
              }
            ?>
          </ul>
        </dd>
      </dl>
    </div><!-- /sort -->

    <div class="news_list">
      <?php
        global $post;
        $args = array(
          'numberposts' => 3,
          'post_type' => 'news',
          'orderby' => 'DESC',
          'post__not_in' => array($post->ID)
        );
      ?>
      <?php $myPosts = get_posts($args); if($myPosts): ?>
      <?php foreach($myPosts as $post): setup_postdata($post); ?>
      <div class="news_list_item">
        <a href="<?php the_permalink(); ?>">
          <div class="news_list_img">
            <?php the_post_thumbnail('news_list'); ?>
          </div>
          <h3 class="news_list_title"><?php the_title(); ?></h3>
          <time class="news_list_time"><?php the_time('Y.m.d'); ?></time>
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
          <span class="news_list_link din_bold">READ MORE...</span>
        </a>
      </div>
    <?php endforeach; ?>
  <?php endif; wp_reset_postdata(); ?>
    </div>
  </div>
</div>


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

<div id="gmap" class="map js-anim"><div class="googlemap"></div></div>

</div><!-- /page -->

</div><!-- /inner -->
</main><!-- /main -->

</div><!-- /pjax_target -->

<?php
  get_footer();
?>
