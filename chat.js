
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAL2n8WnuMVOZEWUis9NAT9Q4xQgirNYmA",
    authDomain: "zorbow-7f5bf.firebaseapp.com",
    databaseURL: "https://zorbow-7f5bf.firebaseio.com",
    projectId: "zorbow-7f5bf",
    storageBucket: "zorbow-7f5bf.appspot.com",
    messagingSenderId: "712210913728"
  };
firebase.initializeApp(config);
var database = firebase.database();
var rooms = database.ref("/rooms");
var inRoom = false;

if (localStorage.getItem("name") === null) {
    var username = "Guest";
} else {
    var username = localStorage.getItem("name");
}


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

    //only works in full browser, not mobile
    //will assume true and create room
        var newRoom = {
            title: title,
            category: category,
            description: description,
        };

        rooms.child(title).set(newRoom);

        $("#chat_stage").html("The <a href='#rooms'>"+title+"</a> room has been created. Head over to the 'Rooms' tab to use it.");
        $("#roomTitle").val("");
        $("#roomCategorySelect").val("");
        $("#roomDescription").val("");

        timeOfCreation = moment().format("X");

        rooms.child(title).child("/messages").push({
            time: timeOfCreation,
            user: username,
            message: "I'm the first message in this chatroom!"
        })
});

//shows all the current chat rooms when you click on the room tab
$("#room_tab").on("click", function() {
    loadRooms();
});

function setUserName(){

}

//populates the room tab on page load
function loadRooms(){
    $("#roomlist").empty();
    rooms.orderByChild("title").on("child_added", function(data) {
        chatroom = $("<div>");
        room = $("<a href='#'>").attr("data-room", data.val().title);
        room.attr("class", "room");
        room.text(data.val().title);
        chatroom.append(room);
        $("#roomlist").prepend(chatroom);
    });
}

function loadChatRoom($room) {
    rooms.child($room).on("value", function(snapshot){
        console.log(snapshot.val().messages);
    });
}

//run this once a room is selected and when user submits new message
function updateMessages()
{

}

// updates the username to the name in localstorage when submit clicked in profile page
$("#userUpdate").on("click", function(){
    username = $("#userName").val();
    localStorage.setItem("name", username);
    redirect();
});

function redirect() {
    window.location.replace("chat.html");
    return false;
}

//gets the user name and sets it in footer
function getGuest() {
    $("#user").text("Welcome "+username+"!");
}


rooms.on("value", function(snapshot) {
    // console.log(snapshot.val());
    // $("#roomlist").empty();
    // rooms.orderByChild("title").on("child_added", function(data) {
    //     chatroom = $("<li>").html("<button class='btn btn-info btn-lg'>"+data.val().title+"</button>");
    //     $("#roomlist").prepend(chatroom);
    // });
}, function(error) {
    console.log("Error: "+error.code);
});

//retrieve the chat room for room clicked on and populate with info
$(document).on("click", ".room", function(event) {
    $room = $(this)[0].dataset.room;
    if (inRoom == true) {
        //prompt user, if they would like to exit current room and go to other room?

    } else {
        loadChatRoom($room);
        inRoom = true;
    }
});

//updates current chat room when the send button is clicked
$(document).on("click", "#chat-send", function() {
    if ($("#chat-input").val() !== "") {
        var message = $("#chat-input").val();
        "roomnameref".push({
            name: username,
            message: message,
            time: firebase.database.ServerValue.TIMESTAMP,
        })
    }
})