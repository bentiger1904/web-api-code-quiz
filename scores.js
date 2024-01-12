let scores = JSON.parse(localStorage.getItem("highscores")) || [];
let ol = document.querySelector("#highscores");

// Clear Highscores button click event
document.getElementById("clear").addEventListener("click", function () {
  // Clear highscores logic
  localStorage.clear();
  window.location.reload();
});

// Display Highscores
displayHighscores();

// Display Highscores function
function displayHighscores() {
  var highscoresList = document.getElementById("highscores");

  // Retrieve and display highscores logic
  for (let i = 0; i < scores.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${scores[i].initials} ${scores[i].score}`;

    ol.append(li);
  }
}
