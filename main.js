const tg = window.Telegram.WebApp;

let user = null;

window.addEventListener("DOMContentLoaded", () => {
  tg.ready();
  tg.expand();

  user = tg.initDataUnsafe?.user;

  localStorage.setItem("telegramId", user?.id || "");

  document.getElementById("startBtn")?.addEventListener("click", () => {
    window.location.href = "game.html";
  });

  document.getElementById("ratingBtn")?.addEventListener("click", () => {
    alert("Рейтинг буде доступний незабаром!");
  });

  document.getElementById("prizesBtn")?.addEventListener("click", () => {
    alert("1 місце — 40 000 грн\n2 місце — 10 000 грн\n3 місце — 2 500 грн");
  });

  document.getElementById("shareBtn")?.addEventListener("click", () => {
    tg.shareGame();
  });
});
