
const mainEl = document.querySelector("main");
var startBtn = document.querySelector("#start-btn");
var timerEl = document.querySelector("#timerEl");
var scoreEl = document.querySelector("#score")
var scoreTotal = 1
var userInformationSubmit = document.querySelector('#user-information')

var time = 101;
var interval;
var questionIndex = 0;
var lastQuestionCorrect = "";
scoreEl.textContent = "score: 0"


var questionsList = [
  {
  question: "What is Goku's iconic blast?",
  answers: ["yee-ha", "hema-hema-hey", "kamehameha", "final flash" ],
  correct: 2
},
{
  question: "Who is the main protagonist of Tokyo Ghoul?",
  answers:["Ben 10", "Ken Kaneki", "Spongebob", "Joe Goldberg"],
  correct: 1
},
{
  question: "Who is the most hated character in Naruto?",
  answers: ["Madara", "Choji", "Naruto", "Sakura"],
  correct: 3
},
{
  question: "Which part of the body did Lelouch's geass take place?",
  answers: ["hand", "left finger", "eye", "elbow"],
  correct: 2
},
{
  question: "What race is Meliodas from?",
  answers: ["Wolves", "Cats", "Gods", "Demons"],
  correct: 3
},
{
  question: "Which breathing technique does Tanjiro use at the beginning of Demon Slayer?",
  answers: ["Deep", "Rapid", "Water", "asthma"],
  correct: 2
}
]

function displayQuestion() {
  mainEl.innerHTML = "";

  if(questionIndex >= questionsList.length) {
    endgame();
    return;
  }

  var h2El = document.createElement('h2');
  h2El.textContent = questionsList[questionIndex].question;
  mainEl.appendChild(h2El);

  var btnDivEl = document.createElement("div");
  mainEl.appendChild(btnDivEl);
  btnDivEl.style.cssText = 'width: 300px; height: 40px; display: flex; flex-direction: column;'

  var pEl = document.createElement('p');
  pEl.textContent  = lastQuestionCorrect;
  
  mainEl.appendChild(pEl);

  btnDivEl.addEventListener('click', function (event) {
    var target = event.target;

    if (target.getAttribute("class") !== 'btn' ) return;

    var clickedQuestionIndex = parseInt(target.getAttribute("data-index"));

    if (clickedQuestionIndex === questionsList[questionIndex].correct) {
      alert("You chose the right answer.");
      scoreEl.textContent = "score: " + scoreTotal++
      console.log(scoreEl)
    } else {
      time = time - 10
      alert("You chose the wrong answer. -10 seconds!");
    }

    questionIndex++


      displayQuestion();

  });

  for (var i = 0; i < questionsList[questionIndex].answers.length; i++) {
    var buttonEl = document.createElement('button');
    buttonEl.textContent = questionsList[questionIndex].answers[i];
    buttonEl.setAttribute("class", "btn");
    buttonEl.setAttribute('data-index', i);
    btnDivEl.appendChild(buttonEl);
  }
}





startBtn.addEventListener("click", function(event) {
  mainEl.innerHTML = "";

  interval = setInterval(function() {
    time--;
    timerEl.textContent = `Time: ${time}`

    if (time <= 0) {
      clearInterval(interval);
      endgame();
      return;
    }
  }, 1000);


  displayQuestion();

});

function storeUser() {
  var name = document.getElementById("myInput").value;
  localStorage.setItem("username", name);
  document.getElementById("name-output").innerHTML = localStorage.getItem("username");
  localStorage.setItem("playerInitials", JSON.stringify(scoreList));

}

function storeScore() {
  localStorage.setItem("score", scoreInput);

}

var scoresList = [];



function endgame()  {
  clearInterval(interval);

  storeUser();
  storeScore();
}