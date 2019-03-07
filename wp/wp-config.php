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
define('AUTH_KEY',         '$9SMf_7:0=B&-K.s9G?/Mr|?LYBxokq_<:unR-!WYl0AP4~bAr%hhj2?*wC(D3AX');
define('SECURE_AUTH_KEY',  'LM6VcBtRLT+%(V/Jhxw$v@$i]D&c>=?z|4U[ABtT%Eut2VAr2P|2]&1hE]g}G7Sr');
define('LOGGED_IN_KEY',    '6/X-FO_>3?&y[77hzHl[FNXJTF5^a1`}0e;8h&f#yzye|yA_U[K{2:<kBx#sGPrZ');
define('NONCE_KEY',        '-0o)Ls<@=WC]r[6|(|B9H#ISzzAP#S;fi,60t@@nn3+vW,LfSRb0mR-?iH8eibrr');
define('AUTH_SALT',        '(/w3BK#8SU:*H2k2cg3Z<sXW=osjNOuw_,VFl{.ojN@&j6?v)S3Di@TJ{ovyQx(J');
define('SECURE_AUTH_SALT', '~OFlT/)?mGL[CzIA}h +T:u16>7COD{:9$%IvKf4Q=a@lj@ 3bWu(5I>Wh0{Wuf%');
define('LOGGED_IN_SALT',   'aq Wq.4]Z&t7$61!36hEWS)!k]gp([2R(UGi|Co=itwGv|0-dKQfZ@P,nlXdq0nr');
define('NONCE_SALT',       '4,gnCt8wb*3MDe?+09{$NzT~~+&!-.QRIa3&3fNLuI6qUJ3%+LPbK3daZN2cH(|-');

/**#@-*/

/**
 * WordPress データベーステーブルの接頭辞
 *
 * それぞれにユニーク (一意) な接頭辞を与えることで一つのデータベースに複数の WordPress を
 * インストールすることができます。半角英数字と下線のみを使用してください。
 */
$table_prefix  = 'wp_';

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
define('WP_DEBUG', false);

/* 編集が必要なのはここまでです ! WordPress でブログをお楽しみください。 */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
