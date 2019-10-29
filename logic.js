$(document).ready(function(){

const firebaseConfig = {
    apiKey: "AIzaSyBA9sGkNXUyBW0tjkPVadw4zjhhvQQdnSw",
    authDomain: "ed-s-ucd-class-project.firebaseapp.com",
    databaseURL: "https://ed-s-ucd-class-project.firebaseio.com",
    projectId: "ed-s-ucd-class-project",
    storageBucket: "ed-s-ucd-class-project.appspot.com",
    messagingSenderId: "196441893781",
    appId: "1:196441893781:web:11040ab43cee32c9cbe49c"
};

firebase.initializeApp(firebaseConfig);

const trainData = firebase.database();

$("#add-train-btn").on("click", function(event){
      
    event.preventDefault();

    const trainName = $("#train-name-input").val().trim();
      
    const destination = $("#destination-input").val().trim();

    const firstTrain = $("#first-train-input").val().trim();

    const frequency = $("frequency-input").val().trim();

    const newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    trainData.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

    trainData.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        const tName = childSnapshot.val().name;

        const tDestination = childSnapshot.val().destination;

        const tFrequency = childSnapshot.val().frequency;

        const tFirstTrain = childSnapshot.val().firstTrain;

        
        const timeArr = tFirstTrain.split(":");
        
        const trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);

        const maxMoment = moment.max(moment(), trainTime);
          
        let tMinutes;
          
        let tArrival;

        if (maxMoment === trainTime){
            tArrival = trainTime.format("hh:mm A");
            
            tMinutes = trainTime.diff(moment(), "minutes");

        } else {
            let differenceTimes = moment().diff(trainTime, "minutes");
              
            let tRemainder = differenceTimes % tFrequency;
            
            tMinutes = tFrequency - tRemainder;

            tArrival = moment().add(tMinutes, "m").format("hh:mm A");
        }
          
        $("#train-table > tbody").append(
            $("<tr>").append(
              $("<td>").text(tName),
              $("<td>").text(tDestination),
              $("<td>").text(tFrequency),
              $("<td>").text(tArrival),
              $("<td>").text(tMinutes)
            )

      );
  });
});

