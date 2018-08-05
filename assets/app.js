var config = {
  apiKey: "AIzaSyDJWtHbJ1sS20RzxehK7R2b81kd1UCP-6Q",
  authDomain: "train-schedule-hw-2b5c9.firebaseapp.com",
  databaseURL: "https://train-schedule-hw-2b5c9.firebaseio.com",
  projectId: "train-schedule-hw-2b5c9",
  storageBucket: "train-schedule-hw-2b5c9.appspot.com",
  messagingSenderId: "949118001561"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainInfoBtn").on("click", function (event) {
  event.preventDefault();

  var TName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var TTime = moment($("#trainTime").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  var newInfo = {
    name: TName,
    dezzy: destination,
    timey: TTime,
    frequenzy: frequency
  };

  database.ref().push(newInfo);

  console.log(newInfo.name);
  console.log(newInfo.dezzy);
  console.log(newInfo.timey);
  console.log(newInfo.frequenzy);

  alert("Train Time Added!");

  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var TName = childSnapshot.val().name;
  var destination = childSnapshot.val().dezzy;
  var TTime = childSnapshot.val().timey;
  var frequency = childSnapshot.val().frequenzy;

  console.log(TName);
  console.log(destination);
  console.log(TTime);
  console.log(frequency);




  var firstTimeConverted = moment(TTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>").append(
    $("<th>").text(TName),
    $("<th>").text(destination),
    $("<th>").text(frequency),
    $("<th>").text(nextTrain),
    $("<th>").text(tMinutesTillTrain),
  );

  $("#train-input-table > tbody").append(newRow);
});
