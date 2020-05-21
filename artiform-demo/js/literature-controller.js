var map;

$( document ).ready(function() {
    fillJournalSelector();
    initMap();
    convertIfSubmit();
});

function fillJournalSelector() {
    let tmodelLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/6/public/full?alt=json";
    $.getJSON(tmodelLink, function(data) {
        var text = "";
            text += '<option selected disabled>Select journal</option>';
            var array = data.feed.entry; 
            for (i = 0; i < array.length; i+=2) {
            text += '<option class="journal-item">' + array[i].content.$t + '</option>';
            
          }
        $("#journal-selection").html(text);
    })
}

function initMap() {
    map = new Map();
    let tmodelLink = "https://spreadsheets.google.com/feeds/cells/1CEFgSFUyFRGWF-YHB-_FhJfwR-g3e0hPkFDa_lOvpIs/6/public/full?alt=json"
    $.getJSON(tmodelLink, function(data) {
        var array = data.feed.entry; 
        for (i = 0; i < array.length; i+=2) {
        map.set(array[i].content.$t, array[i+1].content.$t);  
        }
    })
}

function convertIfSubmit() {

    $('#generator-form').on("submit", function(event) {
        event.preventDefault();
        var inputText = $('#exampleFormControlTextarea1').val();
        var journalName = $( "#journal-selection option:selected" ).text();

        var inputTextTmp = inputText.repeat(1);
        var countOfNameTemplates = 3;
        var names = [];
        var firstNameAbbreviationTmp = [];
        var secondNameAbbreviationTmp = [];
        var lastNameFullTmp = [];
        var titleFullTmp = "";
        var journalNameTmp = "";
        var yearTmp = 0;
        var volumeNumber = 0;
        var issueNumber = 0;
        var firstPage = 0;
        var lastPage = 0;

        var titleFullTmp = inputTextTmp.substring(inputTextTmp.search("[А-Я][.]"), inputTextTmp.search("[А-Я][.]" + 2));
        var notTitleFulltmp = inputTextTmp.substring(inputTextTmp.search("[А-Я][.]"))
        var lastNameWithAll = notTitleFulltmp.split(",");
        firstPage = lastNameWithAll[lastNameWithAll.length-1].split("–")[0];
        lastPage = lastNameWithAll[lastNameWithAll.length-1].split("–")[1];
        volumeNumber = lastNameWithAll[lastNameWithAll.length-2].split(":")[0];
        issueNumber = lastNameWithAll[lastNameWithAll.length-2].split(":")[1];
        yearTmp = lastNameWithAll[lastNameWithAll.length-3];
        for (let i = 0; i < lastNameWithAll.length; i++) { // delete space
                lastNameWithAll[i] = lastNameWithAll[i].trim();
        }
        for (let i = 0; i < lastNameWithAll.length; i++) {
            if (lastNameWithAll[i].search("[А-Я][.]") == -1) {
                break;
            }
            names[i] = lastNameWithAll[i];
        }

        var index = 0; // find 4 Capital letter
        var name = names[names.length - 1].repeat(1);
        var iter = 0;
        while(true) {

            if (iter == 3) {
                index = name.search("[А-Я]");
                break;
            }
                name = name.replace(name.substring(name.search("[А-Я]"), name.search("[А-Я]") + 1), "а");
                iter++;
            }
            journalNameTmp = names[names.length - 1].substring(index);
            names[names.length - 1] = names[names.length - 1].substring(0, index);
            names.length
            
            var template = map.get(journalName);
            template = template.replace("NumOfLiterature", "1");
            template = template.replace("Title$Full", titleFullTmp.replace("\n",""));
            template = template.replace("FirstPage", firstPage);
            template = template.replace("LastPage", lastPage);
            template = template.replace("Volume$Number", volumeNumber.trim());
            template = template.replace("Issue$Number", issueNumber);
            template = template.replace("Year", yearTmp.trim());
            template = template.replace("Journal$Name", journalNameTmp);
            for (let i = 0 ; i < names.length ; i++) {
                var arrName = names[i].split(".");
                if (arrName.length == 3) {
                    template = template.replace("FirstName$Abbreviation", arrName[0].trim());
                    template = template.replace("SecondName$Abbreviation", arrName[1].trim())
                    template = template.replace("LastName$Full", arrName[2].trim())
                }
            }
            while (template.search("FirstName") != -1) {
                if (template.search("FirstName") < template.search("LastName")) {
                    var substring = template.substring(template.search("FirstName"), template.search("LastName") + 13);
                    template = template.replace(substring, "");
                } else {
                    var substring = template.substring(template.search("LastName"), template.search("SecondName") + 24);
                    template = template.replace(substring, "");
                }
            }

            // while (inputTextTmp.search("[А-Я][.]") != -1) {
            //     tmp = inputTextTmp.substring(inputTextTmp.search("[А-Я][.]"), 3);
            //     inputTextTmp = inputTextTmp.replace(firstNameAbbreviationTmp[countOfAuthors],"");
            //     countOfAuthors++;
            
            $("#exampleFormControlTextarea2").html(template);
            // }
    })
}