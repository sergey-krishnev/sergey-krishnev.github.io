$( document ).ready(function() {
    $('#exampleFormControlTextarea1').hide();
    console.log( "ready!" );
    fillFunctorSelector();
    fillRelationSelector();
    fillClazzSelector();
    fillTmodelSelector();
    generateIfSubmit();
});

function generateIfSubmit() {
    $('#generator-form').on("submit", function(event) {
        event.preventDefault();
        var functorInTex = $("#functor-current-select img")[0].src.replace("http://latex.codecogs.com/gif.latex?","");
        var relationInTex = $("#relation-current-select img")[0].src.replace("http://latex.codecogs.com/gif.latex?","");
        var clazzInTex = $("#clazz-current-select img")[0].src.replace("http://latex.codecogs.com/gif.latex?","");
        var tModelName = $( "#tmodel-selection option:selected" ).text();
        getTemplatesByTmodel(tModelName, functorInTex, relationInTex, clazzInTex);
        $('#exampleFormControlTextarea1').show();
    })
}

function getTemplatesByTmodel(tModelName, functorInTex, relationInTex, clazzInTex) {
    let templateLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/5/public/full?alt=json"
    $.getJSON(templateLink, function(data) {
        var text = "";
        var array = data.feed.entry; 
        for (i = 5; i < array.length; i+=3) {
            text += array[i].content.$t + '\n'
          }
          while (text.includes("ForTheorem$NameSpecificRelation")) {
            text = text.replace("ForTheorem$NameSpecificRelation", relationInTex);
          }
          while (text.includes("ForTheorem$NameSpecificFunctor")) {
            text = text.replace("ForTheorem$NameSpecificFunctor", functorInTex);
          }
        $("#exampleFormControlTextarea1").html(text);
    });
}

function clickFunctor(id) {
    markSelectedElement("functor", id);
}

function clickRelation(id) {
    markSelectedElement("relation", id);
}

function clickClazz(id) {
    markSelectedElement("clazz", id);
}

function markSelectedElement(type, id) {
    $("#"+ type + "-current-select").html('<img src="' + document.getElementById(type + "-item-" + id).getElementsByTagName("img")[0].src + '" border="0"/> is selected');
}

function fillFunctorSelector() {
    let functorLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/1/public/full?alt=json"
    $.getJSON(functorLink, function(data) {
        var text = "";
        var array = data.feed.entry;
        var id = 0; 
        for (i = 3; i < array.length; i+=3) {
            text += '<button id="functor-item-'+ id +'" class="dropdown-item" onclick="clickFunctor('+ '\'' + id + '\'' +')" data-toggle="tooltip" title="'+ array[i+1].content.$t +' with properties: ' + array[i+2].content.$t
            +'"><img src="http://latex.codecogs.com/gif.latex?'+ array[i].content.$t +'" border="0"/></button>';
            id++;
          }
        $("#functor-selection").html(text);
    });
}

function fillRelationSelector() {
    let relationLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/2/public/full?alt=json"
    $.getJSON(relationLink, function(data) {
        var text = "";
        var array = data.feed.entry; 
        var id = 0; 
        for (i = 3; i < array.length; i+=3) {
            text += '<button id="relation-item-'+ id +'" class="dropdown-item" onclick="clickRelation('+ '\'' + id + '\'' +')" data-toggle="tooltip" title="'+ array[i+1].content.$t +' with properties: ' + array[i+2].content.$t
            +'"><img src="http://latex.codecogs.com/gif.latex?' + array[i].content.$t + '" border="0"/></button>';
            id++;
          }
        $("#relation-selection").html(text);
    });
}

function fillClazzSelector() {
    let clazzLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/3/public/full?alt=json"
    $.getJSON(clazzLink, function(data) {
        var text = "";
        var array = data.feed.entry; 
        var id = 0; 
        for (i = 3; i < array.length; i+=3) {
            text += '<button id="clazz-item-'+ id +'" class="dropdown-item" onclick="clickClazz('+ '\'' + id + '\'' +')" data-toggle="tooltip" title="'+ array[i+1].content.$t +' with properties: ' + array[i+2].content.$t
            +'"><img src="http://latex.codecogs.com/gif.latex?' + array[i].content.$t + '" border="0"/></button>';
            id++;
          }
        $("#clazz-selection").html(text);
    });
}
function fillTmodelSelector() {
    let tmodelLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/4/public/full?alt=json"
    $.getJSON(tmodelLink, function(data) {
        var text = "";
        var array = data.feed.entry; 
            text += '<option selected disabled>Select T-model</option>';
        for (i = 4; i < array.length; i+=4) {
            text += '<option class="tmodel-item" title="{'+ array[i+1].content.$t +'}\n{'+ array[i+2].content.$t +'}\n{'+ array[i+3].content.$t +'}">' + array[i].content.$t + '</option>';
            
          }
        $("#tmodel-selection").html(text);
    });
}