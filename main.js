const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let coins = localStorage.getItem("coins") || 0;
document.getElementById("coins").textContent = `💰 Монети: ${coins}`;

document.getElementById("startBtn").addEventListener("click", () => {
  window.location.href = "categories.html";
});

document.getElementById("ratingBtn").addEventListener("click", () => {
  alert("🏆 Рейтинг поки в розробці.");
});

document.getElementById("prizesBtn").addEventListener("click", () => {
  alert("🎁 Призи:\n1 місце — 40 000 грн\n2 місце — 10 000 грн\n3 місце — 2 500 грн\n\nУмови:\n🔹 Більше відповідей — вищий рейтинг\n🔹 Швидше відповідаєш — більше монет!");
});

document.getElementById("shareBtn").addEventListener("click", () => {
  tg.shareGame();
});
