// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyAL2n8WnuMVOZEWUis9NAT9Q4xQgirNYmA",
//     authDomain: "zorbow-7f5bf.firebaseapp.com",
//     databaseURL: "https://zorbow-7f5bf.firebaseio.com",
//     projectId: "zorbow-7f5bf",
//     storageBucket: "zorbow-7f5bf.appspot.com",
//     messagingSenderId: "712210913728"
//   };
// firebase.initializeApp(config);
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
        subject = $("<a href='#'>").attr("data-room", data.val().subject);
        subject.attr("class", "room");
        subject.text(data.val().subject);
        game.append(subject);
        $("#subjects").prepend(game);
    });
    //pull the options under path games/choices
}


function runGameChoice(choice){

}

$("#game_choice").on("click", function(){
    choice = $("#game_choices").val();
    chooseGame(choice);
})