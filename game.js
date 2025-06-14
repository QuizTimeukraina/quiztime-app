import { getQuestions, sendResult } from "./api.js";

let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let answered = false;

const telegramId = localStorage.getItem("telegramId");

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

async function startGame() {
  questions = await getQuestions();
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  answered = false;
  timeLeft = 30;
  nextBtn.style.display = "none";

  const q = questions[currentIndex];
  questionEl.textContent = q.question;

  // Перемешиваем ответы
  const shuffled = [...q.answers].sort(() => 0.5 - Math.random());
  const buttons = answersEl.querySelectorAll(".answer-btn");

  shuffled.forEach((text, i) => {
    buttons[i].textContent = text;
    buttons[i].disabled = false;
    buttons[i].classList.remove("correct", "wrong");
    buttons[i].onclick = () => handleAnswer(text, q.correct);
  });

  startTimer();
}

function startTimer() {
  timerEl.textContent = `⏳ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showNext();
    }
  }, 1000);
}

function handleAnswer(selected, correct) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const buttons = answersEl.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
    if (btn.textContent === selected && selected !== correct)
      btn.classList.add("wrong");
  });

  // Больше очков за быстрый ответ
  if (selected === correct) {
    const points = timeLeft >= 25 ? 10 : timeLeft >= 15 ? 7 : 5;
    score += points;
    scoreEl.textContent = `Очки: ${score}`;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", showNext);

async function showNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Гру завершено!";
    answersEl.innerHTML = "";
    timerEl.style.display = "none";
    nextBtn.style.display = "none";

    await sendResult(telegramId, score);
    alert(`Твій результат: ${score} очок`);
  }
}

startGame();
