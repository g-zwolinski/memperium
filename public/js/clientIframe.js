function goTo(){
    this.getAttribute("href");
    console.log(this.getAttribute("href"))
}


function setWidths(polowaSzerokosci){
    $(".content").each(function(index){
        // if you need element's ID
        //var divID = this.id;
        //cache your element if you intend to use it multiple times
        //var clickedDiv = $(this);
        // add CSS class to it
        //clickedDiv.addClass("add-some-class");
        // do other stuff that needs to be done
        console.log($(this).width());
        $(this).parent().width($(this).width());
    });
}





/*
function setWidth(width){


    $("div").each(function(index) {
        var widthToSet = 0;
        var wrzutClass = $(this).attr('class');
        var divToSet;
        if(wrzutClass=="demotywatory"||wrzutClass=="sadistic"||wrzutClass=="kwejk"){
            $(this).children(div)
            \
            //divToSet = $(this)[0];

            //console.log(divToSet);
           // $(this).children().each(setWidth(divToSet));
           // console.log( index + ": " + $( this ).text() );
            \        }
      //console.log( index + ": " + $( this ).text() );
    });



}


function setWidth() {    
                var childrenClass = $(this).attr('class');
                if(childrenClass=="content"){
                    widthToSet = $(this).width();
                    $(this).width(width/2);
                    console.log(widthToSet);
                    if(widthToSet>(width/2)){
                        divToSet.styles.width=widthToSet+"px";
                        $(this).width(widthToSet);
                    }
                }

                //totalWidth = totalWidth + $(this).width();
            }

*/
setWidths($(window).width()/2);
$(window).resize(function(){
    setWidths($(window).width()/2);
});

