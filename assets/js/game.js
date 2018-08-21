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
    // 1. add a new game to games/gameplay collection
    // 2. add number of players to gameplay/game/playercount
    // 3. add user(s) to gameplay/game/players
    // 4. add subject to gameplay/game/subject
    // 5. set score of each user to zero
    // 6. set time to 5:00 in seconds of gameplay/game/timer
    // 7. call function to give each player 6 random cards
    // 8. run startGame function
    alert(choice+" game is about to begin!");
}

function startGame() {

}

function anonymousSignIn(){
    firebase.auth().signInAnonymously()
        .then(function() {
            console.log('Logged in as Anonymous!')

        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}
