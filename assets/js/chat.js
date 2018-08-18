// $(document).ready(function(){
//     $(".one").fadeIn(500);
//     $(".two").fadeIn(1000);
//     $(".three").fadeIn(1500);
//     $(".four").fadeIn(2000);
//     $(".five").fadeIn(2500);
//     $(".six").fadeIn(3000);
// });


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
var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();
var rooms = database.ref("/rooms");
var user;
localStorage.setItem("inRoom", "null");
localStorage.setItem("signedIn", "null");
if (localStorage.getItem("signedIn") == "null") {
    var signedIn = false;
} else {
    var signedIn = localStorage.getItem("signedIn");
}
if (localStorage.getItem("inRoom") == "null") {
    var inRoom = false;
} else {
    var inRoom = localStorage.getItem("inRoom");
}

var chosenRoom;

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
        $("#roomName").text("Congratulations "+username+"!");
        $("#messages").html("The "+title+" room has been created. Head over to the 'Rooms' tab to use it.");
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
    $("#roomlist").empty();
    $("#messages").empty();
    $("#roomName").text($room);
    rooms.child($room).child("/messages").on("child_added", function(snapshot){
        // console.log(snapshot.val());

        timeSent = snapshot.val().time;
        timeSent = moment(timeSent, "X").format("h:mm a");

        $("#messages").append("<p><span>"+ snapshot.val().user + "</span> ("+timeSent+"): " + snapshot.val().message + "</p>");

    });
    $("#messages").scrollTop($("#messages")[0].scrollHeight);


    // rooms.child($room).child("/messages").orderByChild("time").on("value", function(snapshot) {
    //     console.log(snapshot);

    //     // Keeps div scrolled to bottom on each update.
    // });
}

//run this once a room is selected and when user submits new message
// if (inRoom == true) {
//     // Update chat on screen when new message detected - ordered by 'time' value
//     rooms.child(chosenRoom).child("/messages").orderByChild("time").on("child_added", function(data) {
//         alert("Info added!");
//         currentMessage = data.val();
//         $("#messages").append("<p><span>"+ currentMessage.user + "</span>: " + currentMessage.message + "</p>");

//         // Keeps div scrolled to bottom on each update.
//         $("#messages").scrollTop($("#messages")[0].scrollHeight);
//     });
// }


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
    if (signedIn === false) {
        $("#user").text("Welcome "+username+"!");
    } else {
        $("#user").text("Welcome "+username+"! You are signed in as "+user+".");
    }
}

//retrieve the chat room for room clicked on and populate with info
$(document).on("click", ".room", function(event) {
    $room = $(this)[0].dataset.room;
    chosenRoom = $room;
        loadChatRoom($room);
        inRoom = true;
});

//updates current chat room when the send button is clicked
$(document).on("click", "#chat_send", function() {
    input = $("#chat_input");
    if (inRoom === false) {
        input.val("");
        return false;
    } else {
        if (input.val() !== "") {
            var message = input.val().trim();
            timeOfCreation = moment().format("X");
            rooms.child(chosenRoom).child("/messages").push({
                user: username,
                message: message,
                time: timeOfCreation
            });
            input.val("");
        }

        loadChatRoom(chosenRoom);
    }

    
});



function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      user = result.user;
    //   console.log(token)
    localStorage.setItem("signedIn", "true");		

      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(errorCode)
      console.log(errorMessage)
   });
   getGuest();
}

function googleSignout() {
   firebase.auth().signOut()
  
	
   .then(function() {
        localStorage.setItem("signedIn", false);
        window.location.replace("index.html");
    //   console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
