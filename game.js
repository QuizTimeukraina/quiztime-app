import questions from './questions.js';

let category = localStorage.getItem("category") || "fun";
let filtered = questions.filter(q => q.category === category);
let used = [];

let score = 0;
let currentQuestion = 0;
let timer;
let timeLeft = 30;
let answered = false;

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const questionCounter = document.getElementById("questionCounter");

function startTimer() {
  timeLeft = 30;
  timerDisplay.textContent = `⏳ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏳ ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      showCorrectAnswer();
    }
  }, 1000);
}

function showQuestion() {
  if (filtered.length === 0) {
    questionEl.textContent = "🙈 Питань більше немає!";
    answersEl.innerHTML = "";
    timerDisplay.textContent = "";
    questionCounter.textContent = "";
    nextBtn.style.display = "none";
    return;
  }

  answered = false;
  answersEl.innerHTML = "";
  const q = filtered.splice(Math.floor(Math.random() * filtered.length), 1)[0];
  used.push(q);

  questionEl.textContent = q.question;
  questionCounter.textContent = `🧩 Питання: ${used.length}`;
  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans;
    btn.onclick = () => selectAnswer(i, q.correct);
    answersEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(index, correct) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const btns = document.querySelectorAll(".answer-btn");
  btns.forEach((btn, i) => {
    if (i === correct) btn.classList.add("correct");
    else btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (index === correct) {
    const points = timeLeft;
    score += points;
    scoreDisplay.textContent = `💰 Монети: ${score}`;
    localStorage.setItem("coins", score);
  }

  nextBtn.style.display = "block";
}

function showCorrectAnswer() {
  selectAnswer(-1, used.at(-1).correct);
}

nextBtn.addEventListener("click", () => {
  nextBtn.style.display = "none";
  showQuestion();
});

showQuestion();
