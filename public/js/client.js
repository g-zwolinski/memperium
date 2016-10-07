var adresSerwera = "http://128.199.61.130/";
var iloscObslugiwanychSerwisow=10;
var portale = ["demotywatory","kwejk","sadistic","faktopedia","bezuzyteczna","jbzd","chamsko","komixxy","mistrzowie","joemonster"];
var j = 0;
var oldJCzyParametrPrzekazany = j;
//wrzuts

var iloscWrzutow = 0;
var wrzuts={};
$.getJSON('./content/content.js', function(data) { 
  wrzuts=data;
  if(data==undefined||data==null){
    setTimeout(function() {
      window.location.reload();
    }, 500);
  }
  j = Object.keys(data).length-1;
  iloscWrzutow = j;
  displayCookies();
  document.cookie="wrzutsAmount="+iloscWrzutow+";expires=Wed, 18 Dec 2023 12:00:00 GMT";

  ladujKolejne20();
}); 
var ileWrzutowZostaloWczytanych = 0;

var pozycjaNaLiscie = -1;
var pozycjaKursora = 0;
var czyPokazywac = {
    demotywatory: "true",
    kwejk: "true",
    sadistic: "true",
    faktopedia: "true",
    bezuzyteczna: "true",
    jbzd: "true",
    chamsko: "true",
    komixxy: "true",
    mistrzowie: "true",
    joemonster: "true"
};

function myFunction() {
  //alert("Strona wykorzystuje pliki cookie.");
  showHidePortal();
  sweetAlert("Polityka Prywatno�ci i Plik�w Cookies", "Uprzejmie informujemy, i� strona wykorzystuje pliki cookie do zapami�tania Twojego wyboru przegl�danych portali oraz pozycji scrollbar'a, �eby zapewni� jak najwi�kszy komfort przy korzystaniu z naszego serwisu.", "info");
  document.cookie="czyPokazanoAlertOCookie="+1+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
}

var prawdaJakMobilny = 0;
$(window).load(function(){
   $("body, html").css("opacity","1");
   $("body, html").css("filter","alpha(opacity=100)");
   //sprawdz czy bylo rozwiniete menu, jak tak, to rozwin
  var expandMenu=getCookie("expandMenu");
  if (expandMenu==null) {expandMenu=0;}
  if (expandMenu!="") {expandMenu=expandMenu;}
  //console.log("expandMenu", expandMenu);

  if(expandMenu==1){
    showHidePortal();
  }


  var czyPokazanoAlertOCookie=getCookie("czyPokazanoAlertOCookie");
  if (czyPokazanoAlertOCookie==null) {czyPokazanoAlertOCookie=0;}
  if (czyPokazanoAlertOCookie!="") {czyPokazanoAlertOCookie=czyPokazanoAlertOCookie;}

  if(czyPokazanoAlertOCookie==0){
    myFunction();
  }
  
  //setTimeout(changeLinks(), 000);
  //RYSUJ POWIADOMIENIE O COOKIE
  /*
  var CookieAlert={defines:{divID:"CookieAlert",cookieName:"agreeCookies",cookieValue:"yes",cookieExpire:3},options:{style:"dark",position:"bottom",opacity:1,displayTime:0,text:"Ten serwis wykorzystuje pliki cookies. Korzystanie z witryny oznacza zgodÃƒâ€žÃ‚â„¢ na ich zapis lub odczyt wg ustawieÃ„Â¹Ã‚â€ž przeglÃƒâ€žÃ‚â€¦darki.",cookiePolicy:"http://cookiealert.sruu.pl/o-ciasteczkach"},setCookie:function(e,o,i){document.cookie=e+"="+escape(o)+(null===i?"":"; expires="+i.toGMTString())+"; path=/"},checkCookie:function(e){if(""!==document.cookie){var o=document.cookie.split("; ");for(i=0;i<o.length;i++){var t=o[i].split("=")[0],n=o[i].split("=")[1];if(t==e)return unescape(n)}}},removeDiv:function(e){var o=document.getElementById(e);document.body.removeChild(o);var i=new Date;i.setMonth(i.getMonth()+this.defines.cookieExpire),this.setCookie(this.defines.cookieName,this.defines.cookieValue,i)},fadeOut:function(e,o){div=document.getElementById(o),div.style.opacity=e/100,div.style.filter="alpha(opacity="+e+")",1==e&&(div.style.display="none",done=!0)},init:function(e){var o=CookieAlert;window.onload=function(){for(var i in e)o.options[i]=e[i];var t=document.createElement("div");t.setAttribute("id",o.defines.divID);var n="position:fixed;"+o.options.position+":-1px;left:0px;right:0px;width:90%;z-index:1000;padding:10px;font-family:Arial;font-size:14px;padding-bottom:30px;margin: 0 auto;opacity:"+o.options.opacity+";";switch(o.options.style){case"light":n+="background-color:#FFF; color:#373737; text-shadow: 1px 1px 0px rgba(0,0,0,0.1); border-top:1px solid #ccc; border-bottom:1px solid #ccc; box-shadow:0px 0px 8px rgba(0, 0, 0, 0.15);";break;case"dark":n+="background-color:#1b1b1b; color:#999; text-shadow: 1px 1px 0px rgba(255,255,255,0.1); border-top:1px solid #444; border-bottom:1px solid #444; box-shadow:0px 0px 8px rgba(0, 0, 0, 0.15);"}t.setAttribute("style",n);var s='<div style="width:52px;display:inline-block;vertical-align:middle;text-align:right;">';s+='<a href="'+o.options.cookiePolicy+'"><img src="http://cookiealert.sruu.pl/images/'+o.options.style+'/info.png" style="border:0;" title="Informacje o ciasteczkach"/></a>',s+='<img src="http://cookiealert.sruu.pl/images/'+o.options.style+'/close.png" id="CookieAlertClose" style="border:0;cursor:pointer;margin-left:8px;" title="Zamknij komunikat"/>',s+="</div>";var a='<div style="width:calc(100% - 72px);display:inline-block;vertical-align:middle;text-align:center;">'+o.options.text+"</div>"+s;t.innerHTML=a,o.checkCookie(o.defines.cookieName)!=o.defines.cookieValue&&(document.body.appendChild(t),document.getElementById("CookieAlertClose").addEventListener("click",function(){o.removeDiv(o.defines.divID)},!1),o.options.displayTime>0&&setTimeout(function(){for(var e=100;e>=1;e--)setTimeout("CookieAlert.fadeOut("+e+", CookieAlert.defines.divID)",-1*(e-100)*5)},o.options.displayTime))}}};

  CookieAlert.init({
    style: 'dark',
    position: 'bottom',
    opacity: '0.7',
    displayTime: 30000,
    cookiePolicy: 'http://cookiealert.sruu.pl/o-ciasteczkach',
    text: 'Ten serwis wykorzystuje pliki cookies. Korzystanie z witryny oznacza zgodÃ„â„¢ na ich zapis lub odczyt wg ustawieÃ…â€ž przeglÃ„â€¦darki.'
  });
*/
  if(typeof window.orientation !== 'undefined'){prawdaJakMobilny=1;}



    setTimeout(function() {
      if(_("wrzuts")==null||_("wrzuts")==undefined){
        window.location.reload();
      }
    }, 2000);
  
});

$(function() {
  $('#sticky_navigation').css({ 'position': 'fixed', 'top':0, 'left':0 });
  $('#sticky_navigation_wrapper2').css({ 'position': 'fixed', 'top':50, 'left':0 });
});

function _(id){
    return document.getElementById(id);
}

//NIE DZIALA- DO AKTUALIZACJI
function changeLinks(){
  l = document.links;
  for(var i=0; i<l.length; i++) {
    var linkToCheck = l[i].getAttribute("href");
    //console.log(l[i]);
    for(var indeksPortals = 0; indeksPortals < 10; indeksPortals++){
        if((linkToCheck.indexOf('http://'+portale[indeksPortals]) ==0)||
          (linkToCheck.indexOf('http://www.'+portale[indeksPortals]) ==0)){
          var linkDoPodmiany = "http://memperium.pl/index.html?a="+linkToCheck;
       //   console.log(linkToCheck,linkToCheck.indexOf('http://'+portale[indeksPortals]),linkToCheck.indexOf('http://www.'+portale[indeksPortals]),linkDoPodmiany);
          //
          
          l[i].href=linkDoPodmiany;
          //console.log(linkToCheck,linkToCheck.indexOf('http://'+portale[indeksPortals]),linkToCheck.indexOf('http://www.'+portale[indeksPortals]),linkDoPodmiany);


       }

    }
   
  }



}

function showHidePortal(){
  //console.log(_("sticky_navigation_wrapper2").style.display);
  if(_("showHideButton").className=="selected"){
    _("showHideButton").className="";
    _("showHideButton").backgroundColor="white";
    _("sticky_navigation_wrapper2").style.display="none";
    document.cookie="expandMenu="+0+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
  }else{
    _("showHideButton").className="selected";
    _("showHideButton").backgroundColor="black";
    _("sticky_navigation_wrapper2").style.display="block";
    document.cookie="expandMenu="+1+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
  }
}
function FindByAttributeValue(attribute, value)    {
  var All = document.getElementsByTagName('*');
  for (var i = 0; i < All.length; i++)       {
    if (All[i].getAttribute(attribute) == value) { return All[i]; }
  }
}

var czyZaznaczycLewyGuzik = false;
var czyZaznaczycPrawyGuzik = false;

function goUpList(){
  czyZaznaczycPrawyGuzik=false;
//  console.log(key+1,pozycjaNaLiscie);
  for(var key =0;key<iloscWrzutow;key++){
   // console.log(key+1,pozycjaNaLiscie);
    if(wrzuts[key].link==_("iframe").src){

      pozycjaNaLiscie=parseInt(key);
   //   console.log(key+1,pozycjaNaLiscie);

      do{
        if(wrzuts[key+1]==undefined){
      //    console.log(wrzuts[key].link);
     //     console.log("+alert koniec listy");
          czyZaznaczycLewyGuzik=true;
          return;
        }
        if((key+1)<=iloscWrzutow&&czyPokazywac[wrzuts[key+1].portal]=="true"){
          pozycjaNaLiscie++;

          changeIframeSrc(wrzuts[key+1].link);

        }else{
         // console.log(wrzuts[key].link,_("iframe").src,pozycjaNaLiscie,iloscWrzutow);
              //pozycjaNaLiscie=iloscWrzutow;
        }
         
        key++;
        if(key>iloscWrzutow){
          czyZaznaczycLewyGuzik=true;
          //_("navigatorL").style.backgroundColor = "black";
        }else{
          czyZaznaczycLewyGuzik=false;
        }
      }while(key>iloscWrzutow||czyPokazywac[wrzuts[key].portal]!="true")
       //pozcyjaNaLiscie=
    }else{

    }
  }
}

function goDownList(){
  czyZaznaczycLewyGuzik=false;
  //console.log(key-1,pozycjaNaLiscie);
  for(var key =1;key<=iloscWrzutow;key++){
    //console.log(key-1,pozycjaNaLiscie);
    if(wrzuts[key].link==_("iframe").src){

      pozycjaNaLiscie=parseInt(key);
  //    console.log(key-1,pozycjaNaLiscie);
      

      do{
        if(wrzuts[key-1]==undefined){
      //    console.log(wrzuts[key].link);
    //      console.log("-alert koniec listy");
          czyZaznaczycPrawyGuzik=true;
          return;
        }


        if(((key-1)>=0)&&(czyPokazywac[wrzuts[key-1].portal]=="true")){

          pozycjaNaLiscie--;
          //pomin reklame na demotach
/*
          if(((wrzuts[key-1].link).indexOf('//pewex') > -1)||((wrzuts[key-1].link).indexOf('http://demotywatory.plhttp') > -1)){
            
            return;
          }else{
            changeIframeSrc(wrzuts[key-1].link);
          }
*/
          changeIframeSrc(wrzuts[key-1].link);

        }else{
          //console.log(wrzuts[key].link,_("iframe").src,pozycjaNaLiscie,iloscWrzutow);
              //pozycjaNaLiscie=iloscWrzutow;
        }

        key--;
        if(key<0){
          czyZaznaczycPrawyGuzik=true;
              //_("navigatorL").style.backgroundColor = "black";
        }else{
          czyZaznaczycPrawyGuzik=false;
        }

      }while(czyPokazywac[wrzuts[key].portal]!="true"||key<0)   
        //pozcyjaNaLiscie=
    }else{

    }
  }
}

function goTo(){
  var ref = event.target.getAttribute("valToPassToChilds");
  if(ref!=null||ref!=undefined||ref!=""){

  //  console.log(ref);
    changeIframeSrc(ref);
  }
}




function changeIframeSrc(src){

  if(src!=null){

    if(_("iframe")!=null){
      if(src==adresSerwera){
        _("iframe").src="";
        _("iframe").style.display="none";
      }else{
        znajdzIndeksPoUrl(src);
        //tutaj pokaz guziki

        //sprawdz czy w linku znajduje sie '//pewex', jezeli tak, to jest nieprawidlowy (do reklam z demotow)
        if((src.indexOf('//pewex') > -1)||(src.indexOf('http://demotywatory.plhttp') > -1)){
          changeIframeSrc("http://memperium.pl/error.html");
        }else{
          _("iframe").src=src;
          _("iframe").style.display="block";
          //_("iframe").style.height="block";
          //iResize(_("iframe"));

          _("wrzuts").innerHTML="";
          _("wrzuts").style.display="none";

          $("body, html").animate({scrollTop :0}, '500',function(){
          //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
            //alert('Hello');
          });
        }
         
        
          // 
        
/*

        _("iframe").src=src;
        _("iframe").style.display="block";
        //_("iframe").style.height="block";
        //iResize(_("iframe"));

        _("wrzuts").innerHTML="";
        _("wrzuts").style.display="none";

        $("body, html").animate({scrollTop :0}, '500',function(){
        //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
          //alert('Hello');
        });

*/
      }
    }else{
      
    }
  }
}

var czyKliknietoRefresh = "false";
var czyWidacIframe = "false";

function goToPage(element){
  var ref = event.target.getAttribute("href");

  if(ref!=null||ref!=undefined||ref!=""){
            


    if(ref==adresSerwera||ref=="http://memperium.pl/"||ref=="http://www.memperium.pl/"){
      //zapisz ze kliknieto, w intervale sprawdz co jest wyswietlane 
      //document.cookie="scrollPosition="+top+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
      //window.location.reload();

      czyKliknietoRefresh="true";


    }else{

      changeIframeSrc(ref);
    //  console.log(ref);
      
      
    }     
  }
}
  
document.onclick = function (e) {
  e = e ||  window.event;
  var element = e.target || e.srcElement;

  if (element.tagName == 'A') {
    if(element.getAttribute("val")==null||element.getAttribute("val")==undefined){

      goToPage(element);
      return false;
    }else{

      /*
      for (var key=0; key<iloscObslugiwanychSerwisow;key++){
        document.cookie=portale[key]+"="+czyPokazywac[portale[key]]+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
        if(czyPokazywac[portale[key]]=="true"){
          _(portale[key]+"m").className="selected";
        }else{
          _(portale[key]+"m").className="";
        }
        //console.log(czyPokazywac[portale[key]]);
      }
      window.location.reload(); 
      */
    }
    
     // prevent default action and stop event propagation
  }else{
    //goTo(element);
    //return false; 
  //  console.log(element.getAttribute("class"));
    if(element.getAttribute("class")==null&&_("sticky_navigation_wrapper2").style.display=="block"){
      console.log("ukrywac menu po wcisnieciu pustego pola, jezeli jest widoczne? bo nie wiem")
      //showHidePortal();
    }
    if(element.getAttribute("class")=="fb-like"){
   //   console.log("like");
    }
  }
};

//zczytaj pozycje scrolla
if(interval!=undefined){
  //clearInterval(interval);
}
if(intervalII!=undefined){
  //clearInterval(intervalII);
}

var interval = setInterval(function() {
//  console.log("interval");
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  //console.log();
  var height = $('#wrzuts').height();
 // console.log(top,height);
  if(height!=0&&top!=0){
    var pos = top/height;
    pozycjaKursora = "top";
  // console.log(pos>=0.7);
    if(pos>=0.7&&(_("iframe").src==""||_("iframe").src==adresSerwera||_("iframe").src==undefined||_("iframe").src=="http://memperium.pl/"||_("iframe").src=="http://memperium.pl"||_("iframe").src=="http://www.memperium.pl/"||_("iframe").src=="http://www.memperium.pl")){
     //  console.log(pos);
      ladujKolejne20();
     // setChildsAtrr();
    }
  }
}, 500);

/*
var interval = setInterval(function() {
  changeLinks();
}, 2000);
*/
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var intervalII = setInterval(function() {



  if(_("iframe")!=null&&_("iframe").src!=null&&_("iframe")!=undefined&&_("iframe")!=""&&_("iframe")!=adresSerwera&&_("iframe").src!="http://memperium.pl/"&&_("iframe").src!="http://memperium.pl"&&_("iframe").src!="http://www.memperium.pl/"&&_("iframe").src!="http://www.memperium.pl"){
      
    _("iframe").style.height=h*20+"px";
      //console.log(h, window.innerHeight);

    if(_("iframe").style.display=="none"||_("iframe").style.display==""||_("wrzuts").style.display=="block"){
    //  console.log("1");
      _("navigatorL").style.display = "none";
      _("navigatorR").style.display = "none";
      _("dodajWpis").style.display = "block";
    }else{
   //   console.log("2");
      _("navigatorL").style.display = "block";
      _("navigatorR").style.display = "block";
      _("dodajWpis").style.display = "none";
    }
      

    //var tmpWrzut = wrzuts[pozycjaNaLiscie];
  /*
    if(pozycjaNaLiscie==iloscWrzutow||czyZaznaczycLewyGuzik){
     // _("navigatorL").style.backgroundColor = "black";
    }else{
        
    if($('#navigatorL').is(":hover")){
       // _("navigatorL").style.backgroundColor = "black";
      }else{
      //  _("navigatorL").style.backgroundColor = "#fff";
      }
    }

    if(pozycjaNaLiscie==0||czyZaznaczycPrawyGuzik){
      //_("navigatorR").style.backgroundColor = "black";
    }else{
      if($('#navigatorR').is(":hover")){
       // _("navigatorR").style.backgroundColor = "black";
      }else{
       // _("navigatorR").style.backgroundColor = "#fff";
      }
    }//console.log("zapis scrolPos");
  */
  }else{
    if(_("iframe").style.display=="none"||_("iframe").style.display==""||_("wrzuts").style.display=="block"){
    //  console.log("1");
      _("navigatorL").style.display = "none";
      _("navigatorR").style.display = "none";
      _("dodajWpis").style.display = "block";
    }else{
     // console.log("2");
      _("navigatorL").style.display = "block";
      _("navigatorR").style.display = "block";
      _("dodajWpis").style.display = "none";
    }
      

  }
    

        
  if(czyJuzUstawiono!=undefined){
    if(czyJuzUstawiono==true){
    //  console.log("interval2", czyJuzUstawiono);
      if(_("iframe").style.display=="none"||_("iframe").src=="none"||_("iframe").src==""||_("iframe").src==adresSerwera||_("iframe").src==undefined||_("iframe").src=="http://memperium.pl/"||_("iframe").src=="http://memperium.pl"||_("iframe").src=="http://www.memperium.pl/"||_("iframe").src=="http://www.memperium.pl"){
        //console.log("iframe niewidoczny");
        czyWidacIframe = "false";
        _("wrzuts").style.display="block";
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        document.cookie="scrollPosition="+top+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
       // console.log("scrollposition", top);

        document.cookie="czyByloWidacIframe=false;expires=Wed, 18 Dec 2023 12:00:00 GMT";
        if(top>0){
          _("menuTitle").innerHTML = "Wr�� na pocz�tek";
        }else{
          _("menuTitle").innerHTML = "Memperium.pl";
        }
      }else{
        _("menuTitle").innerHTML = "Memperium.pl";
        //console.log("iframe widoczny");
        czyWidacIframe = "true";
        document.cookie="czyByloWidacIframe=true;expires=Wed, 18 Dec 2023 12:00:00 GMT";
      }
    } 
  }
  
        
  if(czyKliknietoRefresh=="true"){
                
                //console.log(czyKliknietoRefresh);
                
    if(czyWidacIframe=="true"){
      //console.log("kliknieto refresh z wlaczoym iframe");
      
      if(czyJuzUstawiono){
        czyKliknietoRefresh="false";
        window.location.reload(); 
      }
      
                
    }
      

    if(czyWidacIframe=="false"){
      //document.cookie="scrollPosition=0;expires=Wed, 18 Dec 2023 12:00:00 GMT";
      //console.log("kliknieto refresh z wylaczoym iframe");
      czyKliknietoRefresh="false";
      if(czyJuzUstawiono){
        window.location.reload(); 
      }
    }

  }
        //console.log("zapis scrolPos");
    //console.log(czyPokazywac.length);
    
  for (var key=0; key<iloscObslugiwanychSerwisow;key++){
    //document.cookie=portale[key]+"="+czyPokazywac[portale[key]]+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
    if(czyPokazywac[portale[key]]=="true"){
      _(portale[key]+"m").className="selected";
      _(portale[key]+"m").backgroundColor="black";
    }

    if(czyPokazywac[portale[key]]=="false"){
      _(portale[key]+"m").className="";
      _(portale[key]+"m").backgroundColor="white";
    }
    //console.log(czyPokazywac[portale[key]]);
  }

  document.cookie="wrzutsAmount="+iloscWrzutow+";expires=Wed, 18 Dec 2023 12:00:00 GMT";


  /*
  var expandMenuTMP=getCookie("expandMenu");
  if (expandMenuTMP==null) {expandMenuTMP=0;}
  if (expandMenuTMP!="") {expandMenuTMP=expandMenuTMP;}
  //console.log(top,iloscWrzutow,czyPokazywac);
  //console.log()
  if(expandMenuTMP==0){
    _("showHideButton").className="";
    _("showHideButton").backgroundColor="white";
  }else{
    _("showHideButton").className="selected";
    _("showHideButton").backgroundColor="black";
  }
*/


}, 300);

function displayCookies() {
  var scrolPos=getCookie("scrollPosition");
  if (scrolPos==null) {scrolPos="";}
  if (scrolPos!="") {scrolPos=scrolPos;}
  //console.log(scrolPos);

  var amoountInCookies=getCookie("wrzutsAmount");
  if (amoountInCookies==null) {amoountInCookies="";}
  if (amoountInCookies!="") {amoountInCookies=amoountInCookies;}
 // console.log(amoountInCookies,iloscWrzutow);

  if(amoountInCookies<iloscWrzutow){
    document.cookie="scrollPosition="+"0"+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
    document.cookie="wrzutsAmount="+iloscWrzutow+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
   // console.log("nieaktulna tresc");
   // window.location.reload();  

  }else{

      // window.location.reload();    
  }
  for (var key=0; key<iloscObslugiwanychSerwisow;key++){
   // console.log(czyPokazywac[key]);
    czyPokazywac[portale[key]]=getCookie(portale[key]);
    if (czyPokazywac[portale[key]]==null) {czyPokazywac[portale[key]]="";}
    if (czyPokazywac[portale[key]]!="") {czyPokazywac[portale[key]]=czyPokazywac[portale[key]];}
    //console.log(czyPokazywac[key]);
    for (var key=0; key<iloscObslugiwanychSerwisow;key++){
      if(czyPokazywac[portale[key]]=="true"){
        _(portale[key]+"m").className="selected";
        _(portale[key]+"m").backgroundColor="black";
      }
      if(czyPokazywac[portale[key]]=="false"){
        _(portale[key]+"m").className="";
        _(portale[key]+"m").backgroundColor="white";
      }
          //console.log(czyPokazywac[portale[key]]);
    }
  }
 // getUrlFromUrl();
}

function getCookie(name) {
  var nameEQ = name + "=";
  //alert(document.cookie);
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
  var c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1);
  if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
  }
  return null;
} 

function znajdzIndeksPoUrl(url){
  //console.log(url);
  for(var key =0;key<=iloscWrzutow;key++){

    if(wrzuts[key].link==url){
      pozycjaNaLiscie = key;

      return;
    }
  }
}

function sprawdzCzyOstatniAlboPierwszyZPortalu(key,portal){
  //console.log(wrzuts[key],key);
  var counterLocal = 0;
  for(var i =0; i<key;i++){
    var tempWrzut = wrzuts[key];
    counterLocal++;
    if(tempWrzut[portal]==portal){
      return false;
    }
  }
  for(var i =key; i<=iloscWrzutow;i++){
    var tempWrzut = wrzuts[key];
    counterLocal++;
    if(tempWrzut[portal]==portal){
      return false;
    }
  }
  if(counterLocal==iloscWrzutow){
    return true;
  }
}

//JSON.parse(JSON.stringify());
function selectePortal(){
  //showHidePortal();

  for (var key=0; key<iloscObslugiwanychSerwisow;key++){
     // _(portale[key]+"m").className="";
     // _(portale[key]+"m").backgroundColor="white";
  }

  czyZaznaczycLewyGuzik=false;
  czyZaznaczycPrawyGuzik=false;

  var portal = event.target.getAttribute("val");
//  console.log(portal);
    //console.log(portal);
    if(czyPokazywac[portal]=="true"){
      czyPokazywac[portal]="false";
      document.cookie=portal+"="+ czyPokazywac[portal]+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
      //_(portale[portal]+"m").className="";
      //_(portale[portal]+"m").backgroundColor="white";
      //event.target.className="";
      //event.target.backgroundColor="white";
    }else{
      if(czyPokazywac[portal]=="false"){
        czyPokazywac[portal]="true";
        document.cookie=portal+"="+ czyPokazywac[portal]+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
        //_(portale[portal]+"m").className="selected";
       // _(portale[portal]+"m").backgroundColor="black";
      }
      
      //event.target.className="selected";
      //event.target.backgroundColor="black";
        
    }
//wyczysc diva, zaladuj 20
   _("wrzuts").innerHTML="";
  j=wrzuts.length-1;
  iloscWrzutow=j;
  document.cookie="wrzutsAmount="+iloscWrzutow+";expires=Wed, 18 Dec 2023 12:00:00 GMT";
  document.cookie="scrollPosition=0;expires=Wed, 18 Dec 2023 12:00:00 GMT";
  for (var key=0; key<iloscObslugiwanychSerwisow;key++){
    if(czyPokazywac[portale[key]]=="true"){
      _(portale[key]+"m").className="selected";
      _(portale[key]+"m").backgroundColor="black";
    }
    if(czyPokazywac[portale[key]]=="false"){
      _(portale[key]+"m").className="";
      _(portale[key]+"m").backgroundColor="white";
    }
        //console.log(czyPokazywac[portale[key]]);
  }
    //document.cookie="scrollPosition=0;expires=Wed, 18 Dec 2023 12:00:00 GMT";
    //console.log(j);
    //ladujKolejne20();
  if(czyWidacIframe=="true"){
    //var doc = document.documentElement;
    //var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    //document.cookie="scrollPosition="+top+";expires=Wed, 18 Dec 2023 12:00:00 GMT";    
    //window.location.reload();
  }else{
    $("body, html").animate({scrollTop :0}, '500',function(){
      ladujKolejne20();
    });
    
   // window.location.reload();
      
  }
  //sweetAlert(_(portale[portal]+"m").className);
  //showHidePortal();
}


//do sesji, zapisac tez ostatnia pozycje scrolla

    
var czyMoznaDodac = new Boolean(true);
//console.log(j);
function ladujKolejne20(){
 // console.log("ladujekolejne");
  var counter = 0;
//  var fbDOM = document.createElement("div");
 // var fbDivStr='<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.5";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>';
//  fbDOM.innerHTML = fbDivStr;
  /*
  if(_("wrzuts")==null||_("wrzuts")==undefined){
    setTimeout(function() {
      document.getElementById("wrzuts").appendChild(fbDOM);
    }, 50);
  }else{
    document.getElementById("wrzuts").appendChild(fbDOM);
  }
  if (typeof(FB) != 'undefined' && FB != null ) {
    FB.XFBML.parse(document.getElementById('wrzuts'));
  }else{
    setTimeout(function() {
      FB.XFBML.parse(document.getElementById('wrzuts'));
    }, 50);
  }
  */
  //if(FB!=undefined){
    
  //}
   // console.log(wrzuts[j].length);
  if(_("wrzuts")!=null&&_("wrzuts")!=undefined){
    do{
    //  console.log(counter);
      //if(czyMoznaDodac==true){
        //czyMoznaDodac=false;
        if(wrzuts[j]!=undefined){
          if(czyPokazywac[wrzuts[j].portal]=="true"){
            //console.log(wrzuts[j]);
            counter++;
            ileWrzutowZostaloWczytanych++;
            var wrzutDOM = document.createElement("div");

     /* // Z iframFB
            if(wrzuts[j].portal=="demotywatory"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><div class="content" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);" >www.'+wrzuts[j].portal+'.pl</br><iframe height="30px" src="'+adresSerwera+'content/content'+j+'.html'+'"></iframe></div></div>';
            }

                  
            if(wrzuts[j].portal=="kwejk"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><h2 class="title">'+'<a href="'+wrzuts[j].link+'">'+wrzuts[j].title+'</a></h2><div  class="content" czyPrzekazanoArgument="false"  valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">www.'+wrzuts[j].portal+'.pl</br><iframe src="'+adresSerwera+'content/content'+j+'.html'+'"></iframe></div></div>';
            }
            if(wrzuts[j].portal=="sadistic"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><h2 class="title">'+'<a href="'+wrzuts[j].link+'">'+wrzuts[j].title+'</a></h2><div  class="content"  czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">www.'+wrzuts[j].portal+'.pl</br><iframe src="'+adresSerwera+'content/content'+j+'.html'+'"></iframe></div></div>';            
            }

    */

      // BEZ iframFB
            if(wrzuts[j].portal=="demotywatory"||wrzuts[j].portal=="faktopedia"||wrzuts[j].portal=="bezuzyteczna"||wrzuts[j].portal=="temysli"||wrzuts[j].portal=="cytaty"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><div class="content" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);" >www.'+wrzuts[j].portal+'.pl</br><div class="share" data-layout="button_count" val="bylebycosbylo" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" onclick="fbShare(this);">Podziel si� na fejsie</div>&nbsp;<div class="like" val="bylebycosbylo" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" onclick="fblike(this);">Polub na fejsie</div></div></div>';
            }

                  
            if(wrzuts[j].portal=="kwejk"||wrzuts[j].portal=="sadistic"||wrzuts[j].portal=="jbzd"||wrzuts[j].portal=="chamsko"||wrzuts[j].portal=="komixxy"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><h2 class="title">'+'<a href="'+wrzuts[j].link+'">'+wrzuts[j].title+'</a></h2><div  class="content" czyPrzekazanoArgument="false"  valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">www.'+wrzuts[j].portal+'.pl</br><div class="share" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" val="bylebycosbylo" onclick="fbShare(this);">Podziel si� na fejsie</div>&nbsp;<div class="like" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" val="bylebycosbylo" onclick="fblike(this);">Polub na fejsie</div></div></div>';
            }
            if(wrzuts[j].portal=="joemonster"||wrzuts[j].portal=="mistrzowie"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><h2 class="title">'+'<a href="'+wrzuts[j].link+'">'+wrzuts[j].title+'</a></h2><div  class="content" czyPrzekazanoArgument="false"  valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">www.'+wrzuts[j].portal+'.org</br><div class="share" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" val="bylebycosbylo" onclick="fbShare(this);">Podziel si� na fejsie</div>&nbsp;<div class="like" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" val="bylebycosbylo" onclick="fblike(this);">Polub na fejsie</div></div></div>';
            }
            /*
            if(wrzuts[j].portal=="sadistic"){
              var toSend = '<div align="center" class="'+wrzuts[j].portal+'"><h2 class="title">'+'<a href="'+wrzuts[j].link+'">'+wrzuts[j].title+'</a></h2><div  class="content"  czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">'+wrzuts[j].content+'</div><div class="contentFoot" czyPrzekazanoArgument="false" valToPassToChilds="'+wrzuts[j].link+'" onclick="goTo(this);">www.'+wrzuts[j].portal+'.pl</br><div class="share" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" val="bylebycosbylo" onclick="fbShare(this);">Podziel siÃƒâ€žÃ‚â€šÃ„Â¹Ã‚Å¾ na fejsie</div>&nbsp;<div class="like" data-layout="button_count" data-href="http://memperium.pl/index.html?a='+wrzuts[j].link+'"  wrzutTitle="'+wrzuts[j].title+'" portalType="'+wrzuts[j].portal+'" val="bylebycosbylo" onclick="fblike(this);">Polub na fejsie</div></div></div>';
            }
*/

            var wrzutDOM = document.createElement("div");
            wrzutDOM.innerHTML = toSend;
            wrzutDOM.style.width ='100vw';
            wrzutDOM.style.textAlign ='center';
            wrzutDOM.style.marginTop ='10px';
            wrzutDOM.style.marginBottom ='10px';
            //DODAJ JEZELI TO NIE SA 'TEMYSLI' LUB 'CYTATY', POMIN ZLE LINK Z DEMOTOW (indexOf('http://demotywatory.plhttp') > -1)
            if((wrzuts[j].portal!="temysli")&&(wrzuts[j].portal!="cytaty")&&((wrzuts[j].link).indexOf('http://demotywatory.plhttp') < 0)){
              if(_("wrzuts")!=null&&_("wrzuts")!=undefined){
               // console.log("a");

                  //console.log("aa");
                 
                  document.getElementById("wrzuts").appendChild(wrzutDOM);
                  //czyMoznaDodac=true;

                
              }else{
                //czyMoznaDodac=true;
               // console.log("b");
                document.getElementById("wrzuts").appendChild(wrzutDOM);
              }
            }
            
            
            
                 // console.log(wrzutDOM);
          }
        }
        j--;
            //narysuj jak jest prawda w czyPokazywac, licz do 50
            //po wybraniu innej sekwencji portali, rysuj od nowa
        if(counter==20||j==0){
         // console.log(counter);
          setChildsAtrr();
         /*
          setTimeout(function() {
            document.getElementById("wrzuts").appendChild(fbDOM);
            FB.XFBML.parse(document.getElementById('wrzuts'));
          }, 200);
          */

                
        }
      //}
      
    }while(counter<20&&j>=0)
  }else{
    setTimeout(function() {
      ladujKolejne20();
    }, 500);
  }
  
}

function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrom)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have. (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}


function setChildsAtrr(){
  var x = document.getElementsByClassName("content");

  for(var i =0; i<x.length;i++){
    if(x[i]!=undefined){
      var divWrzut = x[i];
      var valToPass = divWrzut.getAttribute("valToPassToChilds");
      if(divWrzut.getAttribute("czyPrzekazanoArgument")=="false"){
        var ileChilds = divWrzut.childNodes.length;
        var childs = divWrzut.childNodes;
       // console.log(ileChilds);
        for(var ii =1; ii<=ileChilds;ii++){
           //console.log(ii);
          var childDomElement = childs[ii];
          //console.log(isElement(childDomElement));
          if(isElement(childDomElement)){
            childDomElement.setAttribute("valToPassToChilds", valToPass);

            //max width
            childDomElement.href = "";
            childDomElement.setAttribute("style", "max-width: 90%");

          }
          //childDomElement.setAttribute("valToPassToChilds", valToPass);
        }
                      
        divWrzut.setAttribute("czyPrzekazanoArgument", "true");
        var linkWContencie = divWrzut.getElementsByTagName("a");   
        for(var ii =0; ii<linkWContencie.length;ii++){
          if(linkWContencie[ii]!=undefined){
            //wylacz zewnetrzne link
            //console.log(linkWContencie[ii]);
            linkWContencie[ii].href="";
            linkWContencie[ii].setAttribute("target", "");
            linkWContencie[ii].setAttribute("valToPassToChilds", valToPass);
            linkWContencie[ii].setAttribute("onclick", "return false;");
            linkWContencie[ii].setAttribute("val", "bylebyBylo123");
          }
        }
        var imgWContencie = divWrzut.getElementsByTagName("img");   
        for(var ii =0; ii<imgWContencie.length;ii++){
          if(imgWContencie[ii]!=undefined){
            //wylacz zewnetrzne link
            //console.log(imgWContencie[ii]);
            imgWContencie[ii].href="";
            imgWContencie[ii].setAttribute("target", "");
            imgWContencie[ii].setAttribute("valToPassToChilds", valToPass);
            imgWContencie[ii].setAttribute("onclick", "goTo(this);");
            imgWContencie[ii].setAttribute("val", "bylebyBylo123");
          }
        }

                    
      }
    }
  }
}

/*
function usunLinkZewnetrzne(domElements){
  for(var ii =0; ii<domElements.length;ii++){
    if(domElements[ii]!=undefined){
            //wylacz zewnetrzne link
      linkWContencie[ii].href="";
    }
  } 
}
*/

function fbShare(){
  var linkToShare = event.target.getAttribute("data-href");
  var titleToShare = event.target.getAttribute("wrzutTitle");
  var portalToShare = event.target.getAttribute("portalType");
  // console.log(linkToShare,titleToShare,portalToShare,'http://memperium.pl/'+pictureLink+'.jpg');

  var pictureLink = portalToShare;

  if(portalToShare=="joemonster"||portalToShare=="mistrzowie"){
    portalToShare = portalToShare+".org";
  }else{
    portalToShare = portalToShare+".pl";
  }

  if(titleToShare==null||titleToShare==""||titleToShare==undefined){
    titleToShare = "Sprawd� na memperium.pl";
  }else{
    titleToShare = '"'+titleToShare+'"';
  }
  FB.ui({
    method: 'share',
    name: titleToShare,
    href: linkToShare,
    picture: 'http://memperium.pl/'+pictureLink+'.jpg',
    caption: '"'+titleToShare+'" (Memperium.pl)',
    description: portalToShare+': '+titleToShare
  });
}

function fblike(){
  var linkToShare = event.target.getAttribute("data-href");
  var titleToShare = event.target.getAttribute("wrzutTitle");
  var portalToShare = event.target.getAttribute("portalType");

  //console.log(linkToShare,titleToShare,portalToShare);
  FB.ui({
    method: 'like',
    name: titleToShare,
    href: linkToShare,
    caption: titleToShare+' (Memperium.pl)',
    description: portalToShare+': '+titleToShare
  });
}