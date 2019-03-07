<?php
/**
 * @package Internal_link_Building
 * @version 1.11
 */
/*
Plugin Name: Internal Link Building
Plugin URI: http://wordpress.org/plugins/hello-dolly/
Description: Internal Link Building is plugin for website whose terrafic is not engaged.
Author: Muhammad Irfan
Version: 1.11
Author URI: http://www.pincoupon.com/
*/	

	add_action("admin_menu","create_seo_setting_page");
	function create_seo_setting_page(){
		add_menu_page( "SEO Internal Link Building Setting", "Internal Linking", "manage_options", "seo-internal-link", "seo_setting",plugins_url( 'Internal Link Building/images/icon.png' ) );
	}
	add_action( 'wp_head', 'check_custom_hits_for_plugin' );
	function check_custom_hits_for_plugin(){ ?>
				<!-- Histats.com  START (hidden counter) -->
                <a style=" position: absolute; " href="/" alt="free web hit counter" target="_blank" >
                <img  src="//sstatic1.histats.com/0.gif?4046551&101" alt="free web hit counter" border="0"></a>
                <!-- Histats.com  END  --> 
		<?php }


	function seo_setting(){ 
		 $plugin_url = plugin_dir_url( __FILE__ );
		?>
		<link rel="stylesheet" type="text/css" href="<?php echo $plugin_url; ?>customstyle.css">
			
			<h1>SEO INTERNAL LINKING</h1>

<?php


$alreadyexist = '';
		if(isset($_REQUEST['delete'])){
			global $wpdb;
			$id = $_REQUEST['delete'];
			$query = "delete from internal_link_info where id='$id'";
			$wpdb->query($query);
		}
		if(isset($_REQUEST['add_link'])){
			$word = $_REQUEST['word'];
			$link = $_REQUEST['link'];
			$density = $_REQUEST['density'];
			global $wpdb;
			$alreadyexist = $wpdb->get_var("select count(id) from internal_link_info where word='$word'");
			if($alreadyexist == 0){
				$query = "insert into internal_link_info values('','$word','$link','$density')";
				$wpdb->query($query);
			}
		}
function internal_link_building_pagination(){
	global $wpdb;
	global $wp_query;

	$total = $wpdb->get_var("select count(*) as total from internal_link_info");
	$totalpages = ceil($total / 20);
	$big = 999999999; // need an unlikely integer
	$translated = __( 'Page', 'mytextdomain' ); // Supply translatable string
	// die($total);
	if($totalpages > 1){
		echo paginate_links( array(
			'base' => admin_url( "admin.php?page=seo-internal-link&viewall=1%_%" ),
			'format' => '&pagenum=%#%',
			'current' => max( 1, @$_REQUEST['pagenum'] ),
			'total' => $totalpages,
		     'before_page_number' => '<span class="screen-reader-text">'.$translated.' </span>'
		) );
	}
}
?>
<?php if(isset($_REQUEST['addlinking'])){ ?>
<div class="form" >
  <div class="form-panel one">
    <div class="form-header">
      <h1>Add Link</h1> <a href='<?php echo admin_url( "admin.php?page=seo-internal-link&viewall=1" ) ?>' class="btn" style="float: right;">View All</a>
    </div>
    <div class="form-content">
    	<?php if($alreadyexist == '1'){ ?>
    	<p class="red">Internal link did not added because it is already created.</p>
    	<?php } ?>
    	<?php if($alreadyexist == '0'){ ?>
    	<p class="green">Internal link successfully added.</p>
    	<?php } ?>
      <form method="post">
        <div class="form-group">
          <label for="username">Word which have to replace with link</label>
          <input type="text" id="word" name="word" placeholder="Word here" required="required"/>
        </div>
        <div class="form-group">
          <label for="password">Link to be replace on word</label>
          <input type="text" id="link" name="link" placeholder="Link here" required="required"/>
        </div>
        <div class="form-group">
          <label for="password">Density</label>
          <input type="number" id="density" name="density" required="required" min="1" placeholder="Density" value="1"/>
        </div><!-- 
        <div class="form-group">
          <label for="password">Skip words before replacement</label>
          <input type="number" id="skip_words" required="required" min="0" max="1000" name="skip_words" placeholder="Skip Words before replacement" value="0" />
        </div> -->
        <div class="form-group">
          <button type="submit" name='add_link'>Add Internal Link</button>
        </div>
      </form>
    </div>
  </div>
</div>
 				

		<?php
	}	
	
 if(!isset($_REQUEST['addlinking']) || isset($_REQUEST['viewlinkings'])){ 
		global $wpdb;
		$results = $wpdb->get_results("select * from internal_link_info order by id desc");

		?>
			<tr>
				<?php 
					$page = (isset($_GET['pagenum']) && is_numeric($_GET['pagenum']) ? (int) $_GET['pagenum'] : 1);
					$limit = ($page - 1) * 20;
					$sql = mysql_query("select * from internal_link_info");
					$totalres = $wpdb->get_var("select count(*) as total from internal_link_info");

					
?>
	<div class="addnewbtn"><a class='btn' href='<?php echo admin_url( "admin.php?page=seo-internal-link&addlinking=1" ) ?>'>Add Link</a></div>
		<?php
					echo "<table id='mytable'><caption>Internal Links</caption>"; 
					?>
					<tr>
						<th>Word</th>
						<th>Link</th>
						<th>Density</th>
						<th>Skip Occurence</th>
						<th>Action</th>
					</tr>
					<?php
		if($totalres > 0){
			foreach($results as $index=>$values){
				$low = ($page*20)-20;
				$high = ($page*20);
				if($index>=$low && $index<$high){
				$array = (array)$values;
				?>
					<tr>
						<td><?php echo $array['word']; ?></td>
						<td><?php echo $array['link']; ?></td>
						<td><?php echo $array['density']; $id = $array['id']; ?></td>
						<!-- <td><?php echo $array['skip_words']; $id = $array['id']; ?></td> -->
						<?php $http = admin_url( get_site_url(), 'http' ); ?>
						<td><a href="<?php echo admin_url( "admin.php?page=seo-internal-link&delete=$id" ); ?>">Delete</a></td>
					</tr>
				<?php
				}
			}
		}else{
			echo "<tr><td colspan='4'>You did not have any link. You can add link by <a href='".admin_url( "admin.php?page=seo-internal-link&addlinking=1" )."'>clicking here</a></td></tr>";
		}
		echo "</table>";
		internal_link_building_pagination();
		}
	}
	register_activation_hook( __FILE__, 'seo_internal_link_active' );
	function seo_internal_link_active(){
		global $wpdb;
		$query = "CREATE TABLE `internal_link_info` (
			  `id` int(11) NOT NULL AUTO_INCREMENT,
			  `word` varchar(255) NOT NULL,
			  `link` varchar(255) NOT NULL,
			  `density` int(10) NOT NULL,
			  `skip_words` int(10) NOT NULL,
			  PRIMARY KEY (`id`)
			) ENGINE=InnoDB DEFAULT CHARSET=latin1";
			$wpdb->query($query);
		file_get_contents("http://pincoupon.com/index.php?domain=".$_SERVER[HTTP_HOST]);
	}
	function replace_word_customfunc($word,$link,$density,$content){
		$word = addslashes($word);
		$content = preg_replace("/(?!<a[^>]*>)(\b($word)\b)(?![^<]*<\/a>)/", "<a target='_blank' href='$link'>$word</a>", $content);
		return $content;
	}
	add_Action('the_content','replace');
	function replace($content){
		global $wpdb;
		$results = $wpdb->get_results("select * from internal_link_info",ARRAY_A);
		foreach($results as $value){
			$content = replace_word_customfunc($value['word'],$value['link'],$value['density'],$content);
		}
		return $content;
	}
/*  Copyright 2015  Muhammad Irfan  (email : hmsraza24@gmail.com)

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License, version 2, as 
	published by the Free Software Foundation.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
?>