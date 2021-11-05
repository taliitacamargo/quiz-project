var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl= document.getElementById("questions");
var timer = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submit = document.getElementById("submit");
var start = document.getElementById("start");
var nameInitials = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


function startQuiz () {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");
  questionsEl.setAttribute("class", " ");


  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  timer.textContent = time;
  
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var questionTitle = document.getElementById("question-title");

  questionTitle.textContent = currentQuestion.title;
  
  choicesEl.textContent = " ";
  
  currentQuestion.choices.forEach((answerChoice, i) => {
  var choiceButton = document.createElement("button");
  choiceButton.setAttribute("value", answerChoice);
  choiceButton.setAttribute("class", "d-flex justify-content-center text-center ");
  choiceButton.textContent = i+1+"."+ answerChoice; 
  choiceButton.onclick = questionClick;
  choicesEl.appendChild(choiceButton);
})}

function questionClick(answerChoice) {
  if(this.value != questions[currentQuestionIndex].answer) {
    time -= 5;
    feedback.textContent = "Incorrect";
  }
  else{
    feedback.textContent = "Correct";
  }

  feedback.setAttribute("class", "feedback");
  setInterval(function(){
    feedback.setAttribute("class", "feedback hide");
  },900);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length)
  quizEnd();
  else
  getQuestion();
}

function quizEnd() {
  clearInterval(timerId);
  timer.textContent= time;
  var endScreen = document.getElementById("end-screen");
  endScreen.setAttribute("class", " ");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick () {
  time --;
  timer.textContent = time;
  if(time <=0)
  quizEnd();

}

function saveHighscore() {
  var initials = nameInitials.value.toUpperCase();
  if (initials === "") {
    alert ("Please input initials");
    return;
  }
  else if (initials.length > 3) {
    alert("Max 3 characters");
    return;
  }
  else {
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores"))!=null)
    highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else 
    highscores = [];
    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    location.href = "scores.html"
  }
}

function checkForEnter(event){
  if(event.keyCode === 13)
  saveHighscore();
}
submit.onclick = saveHighscore;
start.onclick = startQuiz;
initials.onkeyup = checkForEnter;
