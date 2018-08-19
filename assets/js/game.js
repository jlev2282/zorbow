var database = firebase.database();
var subjects = database.ref("/games").child("/subjects");

//controls the selection and loading of game
function chooseGame(choice){

}

//puts the options from firebase onto the screen 
function loadChoices(){
    //conect with firebase
    $("#subjects").empty();
    subjects.orderByChild("subject").on("child_added", function(data) {
        game = $("<div>");
        subject = $("<a href='#'>").attr("data-subject", data.val().subject);
        subject.attr("class", "subject");
        subject.text(data.val().subject);
        game.append(subject);
        $("#subjects").prepend(game);
    });
    //pull the options under path games/choices
}

//loads selected subject
$(document).on("click", ".subject", function(event) {
    $subject = $(this)[0].dataset.subject;
    chosenSubject = $subject;
    runGameChoice(chosenSubject);
    inGame = true;
});


function runGameChoice(choice){
    alert(choice+" game is about to begin!");
}
