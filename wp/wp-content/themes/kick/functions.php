<?php

/**
 * 初期化
 */
add_theme_support( 'post-thumbnails' );
add_image_size( 'news_list', 630, 400, true );
add_filter( 'show_admin_bar', '__return_false' );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'rel_canonical' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );



/**
 * カスタム投稿作成
 */
add_action('init','create_post_type');
function create_post_type() {
	$exampleSupports = array(
		'title',
		'thumbnail',
		'editor'
	);
  register_post_type('news',
    array(
      'label' => 'news',
      'public' => true,
      'menu_position' => 5,
			'hierarchical' => true,
			'has_archive' => true,
			'show_in_rest' => true,
      'supports' => $exampleSupports
    )
  );

  register_taxonomy(
    'news_category',
    'news',
    array(
      'label' => 'カテゴリ',
      'labels' => array(
        'all_items' => '記事',
        'add_new_item' => 'カテゴリを追加'
      ),
			'query_var' => true,
			'hierarchical' => true,
			'rewrite' => array('slug'=>'news/'),
			'show_in_rest' => true
    )
  );
}



/**
 * wp_head不要な記述削除
 */
 function head_init() {
	wp_deregister_script('jquery');
 }

 add_action('wp_enqueue_scripts', 'head_init');



 /**
  * リライト設定
	*/
	add_rewrite_rule('news/([^/]+)/?$', 'index.php?news_category=$matches[1]', 'top');

	/**
	 * restAPI
	 */
	 function get_news_feed(){
	   register_rest_route(
	     'wp/v1/', 'news',
	     array(
	       'method' => 'GET',
	       'args' => array(
	         'paged' => array(
	           'default' => 1,
	           'sanitize_callback' => 'absint'
	         )
	       ),
	       'callback' => 'news_add'
	    ));
	 }

	 function news_add() {
		$result = array();

		$query = new WP_Query(array(
			'post_type' => 'news',
			'posts_per_page' => 3
		));

		$items = array();
		while($query->have_posts()) {
			$query->the_post();
			$item = array();
			$item['title'] = get_the_title();
			$item['date'] = get_the_time("Y.m.d");
			$item['permalink'] = get_the_permalink();
			$item['content'] = mb_substr(strip_tags(get_the_content()), 0, 120, 'UTF-8');
			$item['thumbnail'] = get_the_post_thumbnail_url(
				get_the_ID(), 'news_list');
			$items[] = $item;
			}
			$result['items'] = $items;

			return $result;
		}

	 add_action('init', 'get_news_feed');
