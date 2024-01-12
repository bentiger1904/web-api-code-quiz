document.addEventListener("DOMContentLoaded", function () {
    // Timer variables
    var timeEl = document.getElementById("time");
    var timer;
    var timeLeft = 100;
  
    // Quiz variables
    var currentQuestionIndex = 0;
    var correctAnswers = 0;
    var highScores=[]
    var feedbackEl = document.getElementById("feedback");

    const correctSound= new Audio ("assets/sfx/correct.wav")
    const wrongSound= new Audio ("assets/sfx/incorrect.wav")
  
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
   // Display the first question
    displayQuestion();
  }

  // Display Question function
  function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    document.getElementById("question-title").textContent = currentQuestion.title;
    document.getElementById("choices").innerHTML = "";

    currentQuestion.choices.forEach(function (choice) {
      var button = document.createElement("button");
      button.textContent = choice;
      document.getElementById("choices").appendChild(button);
    });
  }

  // Check Answer function
  function checkAnswer(userChoice) {
    var currentQuestion = questions[currentQuestionIndex];

    if (userChoice === currentQuestion.answer) {  
    feedbackEl.classList.remove("hide")
      feedbackEl.textContent = "Correct!";
      correctSound.play()
      correctAnswers += 5;
      currentQuestionIndex++;
      setTimeout(()=>{
        feedbackEl.classList.add("hide")
      },1000)
   
    } else {
      feedbackEl.classList.remove("hide")
      feedbackEl.textContent = "Wrong!";
      wrongSound.play()
      timeLeft -= 10;
      currentQuestionIndex++;
      setTimeout(()=>{
        feedbackEl.classList.add("hide")
      },1000)
   
    }
   

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  // End Quiz function
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("question").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").textContent = correctAnswers;
  }

  // Submit Score function
  function submitScore() {
    var initials = document.getElementById("initials").value.trim();
    highScores=JSON.parse(localStorage.getItem("highscores")) ||[]
    if (initials === "" || initials.length > 3) {
      alert("Please enter no more than 3 characters and try again.");
    } else {
      // Save the score and initials
      var user ={
        initials: initials,
        score:correctAnswers

      }
      highScores.push(user)
      localStorage.setItem("highscores", JSON.stringify(highScores))



      
      // After saving, redirect to highscores.html
      window.location.href = "highscores.html";
    }
  }
});