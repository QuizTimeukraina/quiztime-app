const tg = window.Telegram.WebApp;

let user = null;

window.addEventListener("DOMContentLoaded", () => {
  tg.ready();
  tg.expand();

  user = tg.initDataUnsafe?.user || null;
  localStorage.setItem("telegramId", user?.id || "");

  document.getElementById("startBtn").addEventListener("click", () => {
    window.location.href = "category.html";
  });

  document.getElementById("ratingBtn").addEventListener("click", () => {
    alert("📊 Рейтинг буде доступний найближчим часом.");
  });

  document.getElementById("prizesBtn").addEventListener("click", () => {
    alert("🎁 Призи:\n1 місце — 40 000 грн\n2 місце — 10 000 грн\n3 місце — 2 500 грн\n\nЩоб виграти — грай, заробляй монети та займай топове місце у рейтингу.");
  });

  document.getElementById("shareBtn").addEventListener("click", () => {
    tg.shareGame();
  });
});
