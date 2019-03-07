<?
$result = array();
$post = $_POST;
$type = "";
$error = false;

if(isset($post["name"])&&isset($post["organization"])&&isset($post["tel"])&&isset($post["email"])&&isset($post["other"])){
	$type = "contact";
}else if(isset($post["name"])&&isset($post["tel"])&&isset($post["email"])&&isset($post["other"])){
	$type = "recruit";
}else{
	$error = true;
}
	

if(!$error){

//文字コードの設定
mb_language("uni");
mb_internal_encoding("UTF-8");

$post = array();
$post = $_POST;
foreach($post as $key => $val){
$post[$key] = stripslashes($val);
}

//送信先のメールアドレス、タイトル、本文、ヘッダー(送信者のメールアドレス)
$send = "kickinfo@kick.co.jp";
$subject = "kiCkホームページ＿メールフォームより送信";
$header = "From:from@www.kick.co.jp";

if($type == "recruit"){

$message = <<<Echo
ホームページから問合せがありました。
問い合わせの内容は以下になります。
────────────────────────────────

┃お名前
{$post['name']}

┃電話番号
{$post['tel']}

┃メールアドレス
{$post['email']}

┃お問い合わせ内容
{$post['other']}


────────────────────────────────

Echo;

}else if($type == "contact"){
	
$message = <<<Echo
ホームページから問合せがありました。
問い合わせの内容は以下になります。
────────────────────────────────

┃お名前
{$post['name']}

┃会社名
{$post['organization']}

┃電話番号
{$post['tel']}

┃メールアドレス
{$post['email']}

┃お問い合わせ内容
{$post['other']}


────────────────────────────────

Echo;
}

//メールの送信:管理者へ
$mailresult = mb_send_mail($send, $subject, $message, $header);
if($mailresult){
	$result["result"] = 1;
} else {
	$result["result"] = 0;
}


} else {
	$result["result"] = 0;
}
echo json_encode($result);
?>