var firebaseConfig = {
    apiKey: "AIzaSyDGR9DVuOs53174_Q_AbXZdcXqnwwqnOjM",
    authDomain: "trainassigment.firebaseapp.com",
    databaseURL: "https://trainassigment.firebaseio.com",
    projectId: "trainassigment",
    storageBucket: "",
    messagingSenderId: "244652900993",
    appId: "1:244652900993:web:4a75ff8996887f0c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

                  
  var trainName="";
  var destination="";
  var firstTime="";
  var frecuency="";

  $("#addInfoSubmit").on("click", function(event) {
    event.preventDefault(); //IMPORTANTE ESTO LLEVA INFO a FIREBASE

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    frecuency = $("#frecuency-input").val().trim();

    alert("something");
  });

 




 

//   // Code for the push
//   dataRef.ref().push({

//     trainName: trainName,
//     destination: destination,
//     firstTime: firstTime,
//     frecuency: frecuency,


//     dateAdded: firebase.database.ServerValue.TIMESTAMP
//   });
