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

    var tName = childSnapshot.val().name; //Asignar variable a childSnapshot
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var timeArr = tFirstTrain.split(":");

    var trainTime = moment().hours(timeArr[0]); //horas y minutos
    moment().minutes(timeArr[1]);

    var maxMoment = moment.max(moment(), trainTime); //Llega a punto B / asigna para guardar variable
    var tMinutes = moment.max(moment(), trainTime);
    var tArrivalb = moment.max(moment(), trainTime);

    if (maxMoment === trainTime) {
      var tArrival = trainTime.format("hh:mm A");
      var tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;

      tArrival = moment().add(tMinutes, "m");
      moment().format("hh:mm A");
    }

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);

    // full list of items to the well
    $("tbody").append(
      "<div class='well'><span class='trainName-input'> " +
        childSnapshot.val().name +
        " </span><span class='destination-input'> " +
        childSnapshot.val().destination +
        " </span><span class='firstTime-input'> " +
        childSnapshot.val().firstTime +
        " </span><span class='frequency-input'> " +
        childSnapshot.val().frequency +
        " </span></div>"
    );

    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
