<?php
/**
 * WordPress の基本設定
 *
 * このファイルは、インストール時に wp-config.php 作成ウィザードが利用します。
 * ウィザードを介さずにこのファイルを "wp-config.php" という名前でコピーして
 * 直接編集して値を入力してもかまいません。
 *
 * このファイルは、以下の設定を含みます。
 *
 * * MySQL 設定
 * * 秘密鍵
 * * データベーステーブル接頭辞
 * * ABSPATH
 *
 * @link http://wpdocs.osdn.jp/wp-config.php_%E3%81%AE%E7%B7%A8%E9%9B%86
 *
 * @package WordPress
 */

// 注意:
// Windows の "メモ帳" でこのファイルを編集しないでください !
// 問題なく使えるテキストエディタ
// (http://wpdocs.osdn.jp/%E7%94%A8%E8%AA%9E%E9%9B%86#.E3.83.86.E3.82.AD.E3.82.B9.E3.83.88.E3.82.A8.E3.83.87.E3.82.A3.E3.82.BF 参照)
// を使用し、必ず UTF-8 の BOM なし (UTF-8N) で保存してください。

// ** MySQL 設定 - この情報はホスティング先から入手してください。 ** //
/** WordPress のためのデータベース名 */
define('DB_NAME', 'kick01_press');

/** MySQL データベースのユーザー名 */
define('DB_USER', 'kick01');

/** MySQL データベースのパスワード */
define('DB_PASSWORD', 'ybA7hh8vYPa7VkSF9bjK');

/** MySQL のホスト名 */
define('DB_HOST', 'mysql631.db.sakura.ne.jp');

/** データベースのテーブルを作成する際のデータベースの文字セット */
define('DB_CHARSET', 'utf8mb4');

/** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
define('DB_COLLATE', '');

/**#@+
 * 認証用ユニークキー
 *
 * それぞれを異なるユニーク (一意) な文字列に変更してください。
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org の秘密鍵サービス} で自動生成することもできます。
 * 後でいつでも変更して、既存のすべての cookie を無効にできます。これにより、すべてのユーザーを強制的に再ログインさせることになります。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '2gWW9D1(vTQbLlk.PTX!X(Rfe1 ZP-c-ZK4kRzo,:kqT$f1WK<ga$0Q1:fX{1x~~');
define('SECURE_AUTH_KEY',  'OOyNW`}rd])b/bg]MnBQ#_xP&RGIN?ZI+Op{8?c<8U5kwK0_$#Y]I*peJv=}h}0D');
define('LOGGED_IN_KEY',    ',sn{@>yj)Hfr1mlvF %?t<^<OIK,%F.A0Swu5.m@C~Egd2g@myS0D;oD#l;4~&Py');
define('NONCE_KEY',        'Fnt9`-c!_Z2z1l]?@Mcn|K9Ah?!(:l}%.eK2ClQT1yE;}0yauhf;rx>{KX 2OFk|');
define('AUTH_SALT',        'Vt_1tp5pWL?o;~@e.#(SOr*i;ZcU$](Ig~{Ncqax*}Ea$tReM}#izP%=+F@tTni9');
define('SECURE_AUTH_SALT', 'TY:%Y#8i]:)`z1p]hFgmSWeBw~So`4mW*jvrWYd8A&PX3bc;;6bGAP882r}DG};v');
define('LOGGED_IN_SALT',   '[2?WKWDRHrbzO!2xkYH<rjAI{(;~,E).a%ABMUxO]Gg~ULwGl0YPPUpUmsV<vB5s');
define('NONCE_SALT',       '[Wx${dly!D:zc.@)ITGJQiUrk7_HFut;>er*6<H5$bNc7-^5GVz)*[ 0j6b!j^vB');

/**#@-*/

/**
 * WordPress データベーステーブルの接頭辞
 *
 * それぞれにユニーク (一意) な接頭辞を与えることで一つのデータベースに複数の WordPress を
 * インストールすることができます。半角英数字と下線のみを使用してください。
 */
$table_prefix  = 'wpkt_';

/**
 * 開発者へ: WordPress デバッグモード
 *
 * この値を true にすると、開発中に注意 (notice) を表示します。
 * テーマおよびプラグインの開発者には、その開発環境においてこの WP_DEBUG を使用することを強く推奨します。
 *
 * その他のデバッグに利用できる定数については Codex をご覧ください。
 *
 * @link http://wpdocs.osdn.jp/WordPress%E3%81%A7%E3%81%AE%E3%83%87%E3%83%90%E3%83%83%E3%82%B0
 */
define('WP_DEBUG', true);

/* 編集が必要なのはここまでです ! WordPress でブログをお楽しみください。 */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
