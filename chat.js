
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
            description: description
        };

        rooms.push(newRoom);

        $("#chat_stage").html("<a>The <a href='#rooms'"+title+"</a> room has been created. Head over to the 'Rooms' tab to use it.");
        $("#roomTitle").val("");
        $("#roomCategorySelect").val("");
        $("#roomDescription").val("");
});

//shows all the current chat rooms when you click on the room tab
$("#room_tab").on("click", function() {
    $("#roomlist").empty();
    rooms.orderByChild("title").on("child_added", function(data) {
        chatroom = $("<li>").html("<button class='btn btn-info btn-lg'>"+data.val().title+"</button>");
        $("#roomlist").prepend(chatroom);
    });
});


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