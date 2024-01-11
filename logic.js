document.addEventListener("DOMContentLoaded", function () {
    // Timer variables
    var timeEl = document.getElementById("time");
    var timer;
    var timeLeft = 100;
  
    // Quiz variables
    var currentQuestionIndex = 0;
    var correctAnswers = 0;
    var feedbackEl = document.getElementById("feedback");
  
    // Start button click event
    document.getElementById("start").addEventListener("click", startQuiz);
  
    // Answer button click event
    document.getElementById("choices").addEventListener("click", function (event) {
      if (event.target.matches("button")) {
        checkAnswer(event.target.textContent.trim());
      }
    });
  
    // Submit button click event
    document.getElementById("submit").addEventListener("click", function () {
      submitScore();
    });
    
// Start Quiz function
function startQuiz() {
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("question").classList.remove("hide");

    // Start the timer
    timer = setInterval(function () {
      timeLeft--;
      timeEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  