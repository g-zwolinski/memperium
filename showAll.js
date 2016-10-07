var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var adresSerwera = "http://128.199.61.130/";
//mongoose.connect('mongodb://localhost/wrzuty');
var wrzut = require('./wrzut.js');
mongoose.connect('mongodb://localhost/wrzuty');
var fs = require("fs");

var strony = [];



Object.defineProperty(Object.prototype, 'lengthh', {
    get: function () {
        var size = 0, key;
        for (key in this)
            if (this.hasOwnProperty(key))
                size++;
        return size;
    }
});

var amount = 0;
wrzut.find({}, function(err, wrzuts) {
  if (err) throw err;

  // object of all the users
  //console.log(wrzuts);
  /*
portal link>
	<h2 class="title">title</h2>

	<div class="content">content</div>

	<h3 class="contentFoot">portal</h3>

</a>
*/
	amount=wrzuts.lengthh;
	//var counter =0;

	
 
	var jsonfile = require('jsonfile');
	var file = './public/content/content.js';

	jsonfile.writeFile(file, wrzuts, function (err) {
	  console.error(err);
	  process.exit();
	})

	for(var key in wrzuts) {
			  	//var toSend = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><meta property="og:url" content="'+adresSerwera+'index.html?a='+key+'" /><meta property="og:type"          content="website" /><meta property="og:title"         content="Memperium.pl" /><meta property="og:description"   content="'+wrzuts[key].portal+': '+wrzuts[key].title+'" /><meta property="og:image"         content="http://128.199.61.130/'+wrzuts[key].portal+'.jpg" /></head><body><div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.5";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script><div class="fb-like" data-href="'+adresSerwera+'index.html?a='+key+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div></body></html>';
		/*
	  	var toSend = '
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>Memperium</title>

	    <!-- You can use open graph tags to customize link previews.
    Learn more: https://developers.facebook.com/docs/sharing/webmasters -->
	<meta property="og:url"           content="'+adresSerwera+'index.html?a='+j+'" />
	<meta property="og:type"          content="website" />
	<meta property="og:title"         content="Memperium.pl" />
	<meta property="og:description"   content="'+wrzuts[key].portal+': '+wrzuts[key].title+'" />
	<meta property="og:image"         content="http://128.199.61.130/'+wrzuts[key].portal+'.jpg" />

</head>
<body>
<div class="fb-like" data-href="'+adresSerwera+'index.html?a='+j+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>
</body>
</html>';
*/
	  	
		console.log(key);
		//fs.writeFileSync('./public/content/content'+key+".html", toSend , 'utf-8'); 
			
		
	}

/*
	for(var key in wrzuts) {
	  	counter++;
	  	if(wrzuts[key].portal=="demotywatory"){
	  		var toSend = '<div align="center" class="'+wrzuts[key].portal+'"><a class="content"  href="'+wrzuts[key].link+'" onclick="goTo()">'+wrzuts[key].content+'</a></div>';
	  	}
	  	
	  	if(wrzuts[key].portal=="kwejk"){
	  		var toSend = '<div align="center" class="'+wrzuts[key].portal+'"><h2 class="title">'+'<a href="'+wrzuts[key].link+'">'+wrzuts[key].title+'</a></h2><a class="content"  href="'+wrzuts[key].link+'" onclick="goTo()">'+wrzuts[key].content+'</a></div>';
	  	}

	  	if(wrzuts[key].portal=="sadistic"){
	  		var toSend = '<div align="center" class="'+wrzuts[key].portal+'"><h2 class="title">'+'<a href="'+wrzuts[key].link+'">'+wrzuts[key].title+'</a></h2><a class="content"  href="'+wrzuts[key].link+'" onclick="goTo()">'+wrzuts[key].content+'</a><h3 class="contentFoot">www.'+wrzuts[key].portal+'.pl</h3></div>';
	  	}
	  	
	   	//console.log('<a class="'+wrzuts[key].portal+'" href="'+wrzuts[key].link+'"><h2 class="title">'+wrzuts[key].title+'</h2><div class="content">'+wrzuts[key].content+'</div><h3 class="contentFoot">'+wrzuts[key].portal+'</h3></a>');
		//console.log(toSend);
		//console.log('\n');

		
		//10 na strone
		var page = String(parseInt(counter/50));

		if(page.indexOf(".") > -1) {
		    page = page.split('.')[0];
		}
		//console.log(page);

		if(strony[page]==null||strony[page]==undefined){
			strony[page] = toSend;
		}else{
			strony[page] = strony[page] + toSend;
		}
		

		if(counter==amount){
			console.log(strony.length);
			for(var j = 0; j<strony.length; j++){
				fs.writeFileSync('./public/content/content'+j+".html", strony[j] , 'utf-8'); 
			}
			process.exit();
		}
	}

*/
});

var interval = setInterval(function() {
	if(amount==0){
		process.exit();
	}
}, 5000);