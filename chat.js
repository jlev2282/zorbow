
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

//use this to make a call to database and get info for tab selected
$(".chat_selection").on("click", function(event){
    thisEvent = event;
    console.log(event);
    console.log(thisEvent.currentTarget.dataset.pick);
    //get the data from the user chats out of firebase
    //for each one create a button that has the chat name and users in chat

});