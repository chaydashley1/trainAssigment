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

firebase.initializeApp(firebaseConfig); //Puedes colocar una variable identificando el firebase

var trainData = firebase.database();
var trainName = "";
var destination = "";
var firstTime = "";
var frecuency = "";

$("#addInfoSubmit").on("click", function(event) {
  event.preventDefault(); //IMPORTANTE ESTO LLEVA INFO a FIREBASE

  var trainName = $("#trainName-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = $("#firstTime-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();

  // objects are made up of KEY VALUE PAIRS
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  alert("New train added");

  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

trainData.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());
    const template = `
    <tr>
      <td>${childSnapshot.val()}</td>
      <td>Hi</td>
      <td>Hi</td>
      <td>Hi</td>
      <td>Hi</td>
    </tr>
  `;

    // full list of items to the well
    $("tbody").append(
      "<div class='well'><span class='member-name'> " +
        childSnapshot.val().name +
        " </span><span class='member-email'> " +
        childSnapshot.val().email +
        " </span><span class='member-age'> " +
        childSnapshot.val().age +
        " </span><span class='member-comment'> " +
        childSnapshot.val().comment +
        " </span></div>"
    );

    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
