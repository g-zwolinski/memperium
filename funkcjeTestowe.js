var cheerio = require("cheerio");
var assert = require('assert');
//var url = "";
var http = require("http");

var iloscStronDoSprawdzenia = 1;

function download(url, callback) {
  	http.get(url, function(res) {
    	var data = "";
    	res.on('data', function (chunk) {
     		data += chunk;
    	});
    	res.on("end", function() {
      		callback(data);
    	});
  	}).on("error", function() {
    	callback(null);
  	});
}

function demotywatory(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://demotywatory.pl/page/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $("article").each(function(i, e) {
		      	var content = $(e).find("a").html();
				var title = $(e).find("h2").text();
				var link = "http://demotywatory.pl"+$(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(title!=null&&title!=undefined&&title!=""&&link!="http://demotywatory.pl#"){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					title=title.replace(/[\n\t\r]/g," ");
					content=content.replace(/[\n\t\r]/g," ");


	

				}
		    });
		  }
		});
	}
}

//pobierz aktualny numer strony
//tam leci numeracja od najwiekszych
var stronyNaKwejku=0;
function pobierzAktualnaNajwiekszaStroneKwejka(){
	var url = "http://kwejk.pl";
	download(url, function(data) {
		if (data) {
			var $ = cheerio.load(data);
			$("a.btn-next-page").each(function(i, e) {
			    stronyNaKwejku=parseInt($(e).attr('href').slice(-5))+1;
			    //console.log(stronyNaKwejku);
			    //po pobraniu ile jest stron, pobierz zawartosc
			    kwejk(iloscStronDoSprawdzenia);
			});
		}
	});
}

function kwejk(doKtorejStrony){
	var counter = 0;
	for(var j = 0; j<doKtorejStrony;j++){
		if(stronyNaKwejku!=0){
			var url = "http://kwejk.pl/strona/"+parseInt(stronyNaKwejku-j);
			//console.log(url);
			download(url, function(data) {
			  	if (data) {
			    	// console.log(data);
			    	var $ = cheerio.load(data);
			    	$("article.content ").each(function(i, e) {
			    		//var link = $(e).find("h2>a");
				      	var content = $(e).find("div.self>a").html();
						var title = $(e).find("h1>art-ah0").text();
						var link = $(e).find("div.self>a").attr("href");


						if(title!=null&&title!=undefined&&title!=""&&content!=null&&content!=undefined&&content!=""&&link!=null&&link!=undefined&&link!=""){
							counter++;
							//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');	
							title=title.replace(/[\n\t\r]/g," ");
							content=content.replace(/[\n\t\r]/g," ");
	
						}

			    	});
			  	}
			});
		}
	}
}

var stronyNaSadisticu=0;
function pobierzAktualnaNajwiekszaStroneSadistica(){
	var url = "http://www.sadistic.pl";
	download(url, function(data) {
		if (data) {
			var $ = cheerio.load(data);
			//console.log(data);
			$("div.pagination").each(function(i, e) {
			    stronyNaSadisticu=parseInt($(e).text().slice(0,6));
			    //console.log(stronyNaSadisticu);
			    //po pobraniu ile jest stron, pobierz zawartosc
			    sadistic(iloscStronDoSprawdzenia);
			});
		}
	});
}

function sadistic(doKtorejStrony){
	var counter = 0;
	for(var j = 0; j<doKtorejStrony;j++){
		if(stronyNaSadisticu!=0){
			var url = "http://www.sadistic.pl/portal/"+parseInt(stronyNaSadisticu-j);
			//console.log(url);
			download(url, function(data) {
			  	if (data) {
			    	// console.log(data);
			    	var $ = cheerio.load(data);
			    	$("article.images").each(function(i, e) {
			    		//var link = $(e).find("h2>a");
				      	var content = $(e).find("div.tresc").html();
						var title = $(e).find("header>h2").text();
						var link = "http://www.sadistic.pl/" + $(e).find("header>h2>a").attr("href");


						if(title!=null&&title!=undefined&&title!=""&&content!=null&&content!=undefined&&content!=""&&link!=null&&link!=undefined&&link!=""){
							counter++;
							//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',((content.replace(/[\n\t\r]/g," ")).replace("skin: '/flv/skins/nacht.zip',","")).replace("images/smiles","www.sadistic.pl/images/smiles"),'\n',link,'\n');		

							title=title.replace(/[\n\t\r]/g," ");
							content=content.replace(/[\n\t\r]/g," ");
							content = content.replace(/skin: \W\Wflv\Wskins\Wnacht\Wzip\W\W/g,"");
							//content = content.replace('"images/smiles"','"http://www.sadistic.pl/images/smiles');
							///7\W7/
							//http://www.sadistic.pl/flv/videoPlayer.swf
							content = content.replace(/images\Wsmiles/g,'http://www.sadistic.pl/images/smiles/');
//   plugins: {  '/flv/related-1.swf': { 'onclick': 'link', 'usedock': 'false', 'heading': 'Podobne tematy na Sadistic.pl:', 'file': '/related/393522.xml', 'dimensions': '120x100' }   },
							//content = content.replace(/\W   plugins\W \W \W\Wflv\Wtimeslidertooltipplugin\W2\Wswf\W\W \W \W\W  \W\Wflv\Wrelated\W1\Wswf\W\W \W \Wonclick\W\W \Wlink\W\W \Wusedock\W\W \Wfalse\W\W \Wheading\W\W \WPodobne tematy na Sadistic\Wpl\W\W\W \Wfile\W\W \W\Wrelated\W393534\Wxml\W\W \Wdimensions\W\W \W120x100\W \W   \W/g, ' ');
							content = content.replace(/\W\Wflv\Wtimeslidertooltipplugin\W2\Wswf\W\W \W \W\W/g, "");
							content = content.replace(/\W\Wflv\Wrelated\W1\Wswf\W\W \W \Wonclick\W\W /g, "");
							content = content.replace(/\Wlink\W\W \Wusedock\W\W \Wfalse\W\W \Wheading\W\W \WPodobne tematy na Sadistic\Wpl\W\W\W \Wfile\W\W \W\Wrelated\W393522\Wxml\W\W \Wdimensions\W\W \W120x100\W \W/g, "");
							content = content.replace(/\Wlink\W\W \Wusedock\W\W \Wfalse\W\W \Wheading\W\W \WPodobne tematy na Sadistic\Wpl\W\W\W/g, "");
							content = content.replace(/\Wfile\W\W \W\Wrelated\W393528\Wxml\W\W \Wdimensions\W\W \W120x100\W/g, "");
							
							content = content.replace(/\Wflv\WvideoPlayer\Wswf/g,"http://www.sadistic.pl/flv/videoPlayer.swf");

							//wez link do mp4, wrzuc do diva
							var linkDoFilmu = "";
							var start = content.indexOf('streamer:');
							if(start > -1){
								console.log(start,"stremar found");
								var end = content.indexOf("'", start+15);
								//console.log(content.substring(start+11, end));
								linkDoFilmu = content.substring(start+11, end);
								content=content+'<video width="100%" controls><source src="'+linkDoFilmu+'" type="video/mp4">Your browser does not support HTML5 video.</video>';

					        }

							//pobierz zawartosc streamer: "" ze skryptu sadistica i wrzuc to do video element DOM HTML



							//console.log(content);	
//


						}

			    	});
			  	}
			});
		}
	}
}

function bezuzyteczna(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://bezuzyteczna.pl/page/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $("section").each(function(i, e) {
		      	var content = $(e).find("a").html();
				var link = "http://bezuzyteczna.pl"+$(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");
					content=content.replace(/[\n\t\r]/g," ");
					console.log(link,content);
				}
		    });
		  }
		});
	}
}


function jbzd(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://jbzd.pl/strona/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $("div.content-info").each(function(i, e) {
		    	var title = $(e).find("div.title>a").text();
		      	var content = $(e).find(".media").html();
				var link = $(e).find("div.title>a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");
					content=content.replace(/[\n\t\r]/g," ");
					console.log(title,link,content);
				}
		    });
		  }
		});
	}
}

function chamsko(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://www.chamsko.pl/strona/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".frame").each(function(i, e) {
		    	var title = $(e).find("a>h2").text();
		      	var content = $(e).find(".image").html();
				var link = "http://www.chamsko.pl"+$(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");
					content = content.replace(/href\W\W\W/g,'href="http://www.chamsko.pl/');
					content = content.replace(/src\W\W\W/g,'src="http://www.chamsko.pl/');
					content=content.replace(/[\n\t\r]/g," ");
					console.log(title,link,content);
				}
		    });
		  }
		});
	}
}

function temysli(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://www.temysli.pl/page/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".file-container ").each(function(i, e) {
		      	var content = $(e).find("a").html();
		      	//console.log($(e).html());
				var link = $(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");
					content = content.replace(/href\W\W\W/g,'href="http://www.chamsko.pl/');
					content = content.replace(/src\W\W\W/g,'src="http://www.chamsko.pl/');
					content=content.replace(/[\n\t\r]/g," ");
					console.log(link,content);
				}
		    });
		  }
		});
	}
}

function cytaty(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://cytaty.pl/?page="+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".quote").each(function(i, e) {
		      	var content = $(e).find("a").html();
		      	//console.log($(e).html());
				var link = "http://cytaty.pl"+$(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");

					content = content.replace(/src\W\W\W/g,'src="http://www.cytaty.pl/');
					content=content.replace(/[\n\t\r]/g," ");
					console.log(link,content);
				}
		    });
		  }
		});
	}
}

function joemonsterArt(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://joemonster.org/index.php?pageID="+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".indexart").each(function(i, e) {
		      	var content = $(e).find(".text").html();
		      	var title = $(e).find("a>b").text();
		      	title = title.substring(0, title.length - 14);
		      	//console.log($(e).html());
				var link = "http://joemonster.org"+$(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");

					content = content.replace(/src\W\W\W/g,'src="http://www.cytaty.pl/');
					content=content.replace(/[\n\t\r]/g," ");
					console.log(title,link,content);
				}
		    });
		  }
		});
	}
}

function joemonsterTV(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://joemonster.org/filmy/najnowsze/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".mtv-row").each(function(i, e) {
		      	var content = $(e).find(".mtv-thumb").html();
		      	content = content + $(e).find(".mtv-desc-text").html();
		      	var title = $(e).find("a>b").text();
		      	//console.log($(e).html());
				var link = "http://joemonster.org"+$(e).find("a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");

					content = content.replace(/src\W\W\W/g,'src="http://www.cytaty.pl/');
					content=content.replace(/[\n\t\r]/g," ");
					console.log(title,link,content);
				}
		    });
		  }
		});
	}
}
//	demotywatory(iloscStronDoSprawdzenia)
//	pobierzAktualnaNajwiekszaStroneKwejka();
//	pobierzAktualnaNajwiekszaStroneSadistica();

function komixxy(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://komixxy.pl/page/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".pic").each(function(i, e) {
		    	var title = $(e).find("h1").text();
		      	var content = $(e).find(".pic_image>a").html();
				var link = "http://komixxy.pl"+$(e).find(".pic_image>a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");
					content=content.replace(/[\n\t\r]/g," ");
					console.log("komixxy",title,link,content);
				}
		    });
		  }
		});
	}
}


function mistrzowie(doKtorejStrony){
	var counter = 0;
	for(var j = 1; j<=doKtorejStrony;j++){
		var url = "http://mistrzowie.org/page/"+j;
		download(url, function(data) {
		  if (data) {
		    // console.log(data);
		    var $ = cheerio.load(data);
		    $(".pic_body").each(function(i, e) {
		    	var title = $(e).find("h1").text();
		      	var content = $(e).find("figure>a").html();
				var link = "http://mistrzowie.org"+$(e).find("figure>a").attr("href");
				//jak link == http://demotywatory.pl# tzn, ze demot jest za dlugi i trzeba kliknac w "pokaz caly obrazek" na demotywatory.pl
				if(link!=null&&link!=undefined&&link!=""&&content!=null&&content!=undefined&&content!=""){
					counter++;
					//console.log(counter+". ",title.replace(/[\n\t\r]/g," "),'\n',content.replace(/[\n\t\r]/g," "),'\n',link,'\n');
					//title=title.replace(/[\n\t\r]/g," ");
					content=content.replace(/[\n\t\r]/g," ");
					console.log("mistrzowie",title,link,content);
				}
		    });
		  }
		});
	}
}



//chamsko(iloscStronDoSprawdzenia);

//jbzd(iloscStronDoSprawdzenia);
//cytaty(iloscStronDoSprawdzenia);
mistrzowie(iloscStronDoSprawdzenia);