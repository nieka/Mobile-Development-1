
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var data = null;
var selecteditem = null;
var categorieObject = {
    soort: null
};


/*Event listeners*/
$("#B_film").on("click",function(event){
    categorieObject.soort = "film";
    $.mobile.changePage( "#lijst", { transition: "slide"} );
});

$("#B_serie").on("click",function(event){
    categorieObject.soort = "serie";
    $.mobile.changePage( "#lijst", { transition: "slide"} );
});

$("#B_tekenfilm").on("click",function(event){
    categorieObject.soort = "tekenfilm";
    $.mobile.changePage( "#lijst", { transition: "slide"} );
});
$("#B_submit").on("click",function(event){
    var input = {};
    var categorie = $("#select-choice-categorie").val();
    input.naam = $("#naam").val();
    input.omschrijving = $("#omschrijving").val();
    input.releaseDatum = $("#date").val();

    switch (categorie){
        case 'film' :
            films.push(input);
            break;
        case 'serie':
            serie.push(input);
            break;
        case 'tekenfilm':
            tekenfilms.push(input);
            break;
    }

    $.mobile.changePage( "#Overzicht", { transition: "slide"} );
});

$('#listview').on('click', 'a', function(event) {
    if(this.id.indexOf("B_delete") > -1){
        var id = this.id.split(" ");
        switch (categorieObject.soort){
            case "film" : films.splice(id[1],1);
                break;
            case "serie" : serie.splice(id[1],1);
                break;
            case "tekenfilm" : tekenfilms.splice(id[1],1);
        }
        //refeash page so listview is loaded again
        $.mobile.changePage( "#Overzicht", { transition: "slide"} );
    }else {
        selecteditem = data[this.id];
        $.mobile.changePage( "#item", { transition: "slide"} );
    }

});


$(document).on('pagebeforeshow', '#lijst', function(){
    var categorie = categorieObject.soort;
    $("#listview").empty();
    switch (categorie){
        case "film" : data = films;
            break;
        case "serie" : data = serie;
            break;
        case "tekenfilm" : data = tekenfilms;
    }

    $('#lijst [data-role="header"]').html('<h1> Categorie ' + categorie + '</h1>');

    for(var i=0; i < data.length; i++){
        $("#listview").append("<li><a href='#' id='" + i +"'> " + data[i].naam +   "</a>" +
            "<a href='#' id='B_delete " + i + "' data-position-to='window' data-transition='pop'></a>" +
            "</li>");
    }

    $('#listview').listview('refresh');


});

$(document).on('pagecreate', '#item', function(){
    $('#item [data-role="header"]').html('<h1>' + selecteditem.naam + '</h1>');
    $('#item [role="main"]').html(
        '<b>Omschrijving: </b>' +
        '<br>' +
        selecteditem.omschrijving);
});


