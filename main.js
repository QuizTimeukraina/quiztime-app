const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

document.getElementById("startBtn").addEventListener("click", () => {
  window.location.href = "game.html";
});

document.getElementById("ratingBtn").addEventListener("click", () => {
  alert("Рейтинг буде доступний найближчим часом!");
});

document.getElementById("prizesBtn").addEventListener("click", () => {
  alert("🎁 Призи:\n\n1 місце — 40 000 грн\n2 місце — 10 000 грн\n3 місце — 2 500 грн\n\nУмови: Грайте кожного дня, набирайте більше монет, та входьте в топ 3 гравців!");
});

document.getElementById("shareBtn").addEventListener("click", () => {
  if (tg.shareGame) {
    tg.shareGame();
  } else {
    alert("Поділитися можна лише через Telegram");
  }
});
