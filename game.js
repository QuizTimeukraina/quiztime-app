const tg = window.Telegram.WebApp;
tg.ready();

let score = 0;
let currentQuestion = 0;
let timer;
let timeLeft = 30;
let answered = false;
let questions = [];

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const questionCounter = document.getElementById("questionCounter");

async function fetchQuestions() {
  const category = localStorage.getItem("category") || "random";
  try {
    const res = await fetch(`https://quiztime-backend.onrender.com/api/questions?category=${category}`);
    const data = await res.json();
    questions = data;
    showQuestion();
  } catch (err) {
    questionEl.textContent = "❌ Не вдалося завантажити питання.";
    backBtn.style.display = "block";
    backBtn.onclick = () => {
      window.location.href = "index.html";
    };
  }
}

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
  answered = false;
  answersEl.innerHTML = "";
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  questionCounter.textContent = `🧩 Питання: ${currentQuestion + 1}`;

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans;
    btn.onclick = () => selectAnswer(i);
    answersEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  const correct = questions[currentQuestion].correct;
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
  }

  nextBtn.style.display = "block";
}

function showCorrectAnswer() {
  selectAnswer(-1);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    nextBtn.style.display = "none";
    showQuestion();
  } else {
    questionEl.textContent = `🎉 Гру завершено!\nВаш результат: ${score} монет`;
    answersEl.innerHTML = "";
    timerDisplay.textContent = "";
    nextBtn.style.display = "none";
    questionCounter.textContent = "";
  }
});

fetchQuestions();
