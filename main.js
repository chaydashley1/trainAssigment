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

var trainData = firebase.database(); //Hay que tener una variable que identifique el firebase.database();

var trainName = ""; //variables que estan en blanco y recibiran info
var destination = "";
var firstTime = "";
var frequency = "";

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

  // objects are made up of KEY VALUE / PAIRS
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTime,
    frequency: frequency
  };

  trainData.ref().push(newTrain); //.ref() guarda referencia de firebase

  alert("New train added");

  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
});

trainData.ref().on(
  "child_added", // este child added es parrte de firebase (es como event)
  function(childSnapshot) {
    console.log(childSnapshot.val());

    //   const template = `
    //   <tr>
    //     <td>${childSnapshot.val().name}</td>
    //     <td>${childSnapshot.val().destination}</td>
    //     <td>${childSnapshot.val().firstTime}</td>
    //     <td>${childSnapshot.val().frequency}</td>
    //   </tr>
    // `;

    var tName = childSnapshot.val().name; // a los childSnapshot hay que asignarle una variable
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var timeArr = tFirstTrain.split(":"); // divide entre Horas y minutos

    var trainTime = moment().hours(timeArr[0]); //
    moment().minutes(timeArr[1]);

    var maxMoment = moment.max(moment(), trainTime); // Returns the maximum (most distant future) of the given moment instances.
    var tMinutes;
    var tArrival;

    if (maxMoment === trainTime) {
      var tArrival = trainTime.format("hh:mm A"); // It takes a string of tokens and replaces them with their corresponding values.
      var tMinutes = trainTime.diff(moment(), "minutes"); // get the duration of a difference between two moments
    } else {
      var differenceTimes = moment().diff(trainTime, "minutes"); //variable de restar el tiempo

      var tRemainder = differenceTimes % tFrequency; //lo que sobre (remainder) ES LA VARIABLE FREQUENCY ARRIBA

      tMinutes = tFrequency - tRemainder;

      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);

    // full list of items to the well
    $("tbody").append(
      `<tr>
          <td>
          ${childSnapshot.val().name}
          </td>
          <td>
          ${childSnapshot.val().destination}
        </td>
        <td>
          ${childSnapshot.val().frequency}
          </td>
          <td>
          ${childSnapshot.val().firstTrain}
        </td>
        <td>
        ${tMinutes}
      </td>
      </tr>`
    );

    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
