
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

$("#chats").on("click", function(){
    //get the data from the user chats out of firebase
    //for each one create a button that has the chat name and users in chat

})