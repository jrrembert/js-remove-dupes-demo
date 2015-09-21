'use strict';

var emailArray = ['clint@sounders.com', 'obefemi@sounders.com', 
                  'lamar@sounders.com', 'gonzalo@sounders.com', 
                  'osvaldo@sounders.com', 'brad@sounders.com', 
                  'leo@sounders.com', 'zach@sounders.com', 
                  'chad@sounders.com', 'tyrone@sounders.com']

var duplicateArrayLength = 10000;      // Number of times to copy emailArray.
var duplicateArrayLoopNumber = 10; // Number of times to run de-dupe function.

function removeDupes(array) {
    // Given an array, remove duplicate values if present and return a new array.
    var arrayObject = {}; // Store unique values. Will refer to as dict because Python.
    var newArray = [];
    var newArrayIndex = 0;

    for (var i = 0; i < array.length; i++) {
        var arrayItem = array[i];

        if (!arrayObject.hasOwnProperty(arrayItem)) {
            // If an item isn't in our dict, add to our new array and update dict.
            arrayObject[arrayItem] = 1;
            newArray[newArrayIndex++] = arrayItem;
        }
    }

    return newArray;
}

function removeDupesEcma6(array) {
    // Alternative implementation celebrating the awesomeness of sets.
    return new Set(array); // Someone: "That's it?" Me: "Yep, that's it.""
}

function run() {
    var arraySize = document.getElementById('array-length').value || 
        duplicateArrayLength;
    var loopNum = document.getElementById('loop-number').value || 
        duplicateArrayLoopNumber;

    var emailArrayWithDupes = makeDuplicates(emailArray, arraySize);
    var shuffledEmailArray = shuffle(emailArrayWithDupes);
    var arrayLength = shuffledEmailArray.length;

    function dedupe(dedupeFunc, id) {
        var date = new Date();

        for (var i = 0; i < loopNum; i++) {
            dedupeFunc(shuffledEmailArray);
        }

        var time = document.getElementById(id);
        time.innerHTML = dedupeFunc.name + " execution time: ( " + 
            arrayLength + " items running " + loopNum + " time(s) )<br>" + 
            (new Date() - date) / duplicateArrayLoopNumber + " ms/run";
    }

    dedupe(removeDupes, 'removedupes-time');
    dedupe(removeDupesEcma6, 'removedupesecma6-time');
}

/* Helper functions */

function makeDuplicates(array, dupeArrayNum) {
    // Given an array
    var newArray = [];

    while ( dupeArrayNum-- ) {
        newArray = newArray.concat(array);
    };

    return newArray;
}

function shuffle(array) {
  // Taken verbatim from: 
  //    http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // Using to randomize array to better check performance characteristics.
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;
}