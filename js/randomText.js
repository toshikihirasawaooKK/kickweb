 //ランダムで運勢を出す。

var a=["大吉","中吉","小吉", "末吉","凶"];
var x;
x=Math.floor(Math.random()*5);
//document.write(a[x]);


var b = document.getElementById('uranai');
b.innerHTML = a[x];
