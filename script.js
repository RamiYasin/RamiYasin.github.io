function splitRandomly(dataArray) {
    if (dataArray.length === 0) {
        console.log("Das Array ist leer.");
        return { firstHalf: [], secondHalf: [] };
    }

    // Berechne die Länge der Hälfte des Arrays
    var halfLength = Math.ceil(dataArray.length / 2);

    // Array mit den Indizes des Arrays füllen
    var indices = Array.from({ length: dataArray.length }, (_, i) => i);

    // Zufällige Indizes für die erste Hälfte auswählen
    var firstHalfIndices = [];
    for (var i = 0; i < halfLength; i++) {
        var randomIndex = Math.floor(Math.random() * indices.length);
        firstHalfIndices.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
    }

    // Die verbleibenden Indizes sind für die zweite Hälfte
    var secondHalfIndices = indices;

    // Erstelle die beiden Hälften basierend auf den ausgewählten Indizes
    var firstHalf = firstHalfIndices.map(index => dataArray[index]);
    var secondHalf = secondHalfIndices.map(index => dataArray[index]);

    return { firstHalf: firstHalf, secondHalf: secondHalf };
}

document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("addButton");
    var textInput = document.getElementById("textInput");
    var team1 = document.getElementById("team1");
    var team2 = document.getElementById("team2");

    addButton.addEventListener("click", function() {
        var inputText = textInput.value.trim();
        if (inputText !== "") {
            // Aufteilen der eingegebenen Daten
            var dataArray = inputText.split(/\r?\n/);
            var splittedArrays = splitRandomly(dataArray);
            var firstHalf = splittedArrays.firstHalf;
            var secondHalf = splittedArrays.secondHalf;

            // Füge Elemente von firstHalf in team1 hinzu
            team1.innerHTML = "";
            firstHalf.forEach(function(element) {
                var li = document.createElement("li");
                li.textContent = element;
                team1.appendChild(li);
            });

            // Füge Elemente von secondHalf in team2 hinzu
            team2.innerHTML = "";
            secondHalf.forEach(function(element) {
                var li = document.createElement("li");
                li.textContent = element;
                team2.appendChild(li);
            });

            // Leere das Texteingabefeld
            textInput.value = "";
        }
    });
});
