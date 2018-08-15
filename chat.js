
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwZ9TkDieYI4AFopofxnHjoCy95vvpdFc",
    authDomain: "b-b-room.firebaseapp.com",
    databaseURL: "https://b-b-room.firebaseio.com",
    projectId: "b-b-room",
    storageBucket: "b-b-room.appspot.com",
    messagingSenderId: "224909053616"
};
firebase.initializeApp(config);
var database = firebase.database();

//use this to make a call to database and get info for tab selected
$(".chat_selection").on("click", function(event){
    thisEvent = event;
    console.log(event);
    console.log(thisEvent.currentTarget.dataset.pick);
    //get the data from the user chats out of firebase
    //for each one create a button that has the chat name and users in chat

});

$("#create_room").on("click", function(event){
    rooms = database.ref("/rooms");

    event.preventDefault();

    title = $("#roomTitle").val().trim();
    category = $("#roomCategorySelect").val().trim();
    description = $("#roomDescription").val().trim();

    var r =confirm("Create room "+title+"?");

    if (r == true) {
        var newRoom = {
            title: title,
            category: category,
            description: description
        };

        rooms.push(newRoom);
    } else {
        $("#roomTitle").val("");
        $("#roomCategorySelect").val("");
        $("#roomDescription").val("");
    }


});