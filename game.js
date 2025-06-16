// game.js

const API_URL = 'https://quiztime-backend.onrender.com'; // 🟢 Замени, если нужно
const tg = window.Telegram.WebApp;
const telegramId = localStorage.getItem("telegramId");

let currentQuestion = null;

async function getQuestion() {
  try {
    const res = await fetch(`${API_URL}/question?telegramId=${telegramId}`);
    const data = await res.json();

    if (!data || !data.question) {
      document.getElementById("question").innerText = "Питання закінчились!";
      document.getElementById("answers").innerHTML = "";
      document.getElementById("nextBtn").style.display = "none";
      return;
    }

    currentQuestion = data;
    showQuestion(data);
  } catch (err) {
    document.getElementById("question").innerText = "Помилка завантаження питання.";
    console.error(err);
  }
}

function showQuestion(q) {
  document.getElementById("question").innerText = q.question;

  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.className = "answer-btn";
    btn.addEventListener("click", () => submitAnswer(index));
    answersBox.appendChild(btn);
  });

  document.getElementById("nextBtn").style.display = "none";
}

async function submitAnswer(answerIndex) {
  try {
    const res = await fetch(`${API_URL}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        telegramId,
        questionId: currentQuestion._id,
        answerIndex
      })
    });

    const result = await res.json();
    const allBtns = document.querySelectorAll(".answer-btn");

    allBtns.forEach((btn, idx) => {
      if (idx === currentQuestion.correctIndex) {
        btn.style.backgroundColor = "green";
      } else if (idx === answerIndex) {
        btn.style.backgroundColor = "red";
      } else {
        btn.style.opacity = 0.5;
      }
      btn.disabled = true;
    });

    document.getElementById("nextBtn").style.display = "block";

  } catch (err) {
    alert("Помилка надсилання відповіді.");
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getQuestion();

  document.getElementById("nextBtn").addEventListener("click", () => {
    getQuestion();
  });
});
