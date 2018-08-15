
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
var rooms = database.ref("/rooms");


//use this to make a call to database and get info for tab selected
$(".chat_selection").on("click", function(event){
    thisEvent = event;
    // console.log(event);
    // console.log(thisEvent.currentTarget.dataset.pick);
    //get the data from the user chats out of firebase
    //for each one create a button that has the chat name and users in chat

});

//will create a room and enter into firebase
$("#create_room").on("click", function(event){

    event.preventDefault();

    title = $("#roomTitle").val().trim();
    category = $("#roomCategorySelect").val().trim();
    description = $("#roomDescription").val().trim();

    var r =confirm("Create room "+title+"?");

    //only works in full browser, not mobile
    //will assume true and create room
        var newRoom = {
            title: title,
            category: category,
            description: description
        };

        rooms.push(newRoom);

        $("#chat_stage").html("<a>The <a href='#rooms'"+title+"</a> room has been created. Head over to the 'Rooms' tab to use it.");
        $("#roomTitle").val("");
        $("#roomCategorySelect").val("");
        $("#roomDescription").val("");
});

$("#room_tab").on("click", function() {
    $("#roomlist").empty();
    rooms.orderByChild("title").on("child_added", function(data) {
        chatroom = $("<li>").html("<a href='#'>"+data.val().title+"</a>");
        $("#roomlist").prepend(chatroom);
    });
});

rooms.on("value", function(snapshot) {
    // console.log(snapshot.val());
    $("#rooms").prepend(snapshot.val());
}, function(error) {
    console.log("Error: "+error.code);
});