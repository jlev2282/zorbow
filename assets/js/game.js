//controls the selection and loading of game
function chooseGame(choice){

}

//puts the options from firebase onto the screen 
function loadChoices(){
    //conect with firebase

    //pull the options under path games/choices
}

function runGameChoice(choice){

}

$("#game_choice").on("click", function(){
    choice = $("#game_choices").val();
    chooseGame(choice);
})