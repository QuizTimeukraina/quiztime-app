// ✅ Получаем объект Telegram WebApp
const tg = window.Telegram.WebApp;

// 👤 Пользователь Telegram
let user = null;

// ▶️ Когда всё загрузится
window.addEventListener("DOMContentLoaded", () => {
  tg.ready();
  tg.expand(); // Разворачивает WebApp на весь экран

  user = tg.initDataUnsafe.user;

  // Пример — сохранить Telegram ID
  localStorage.setItem("telegramId", user?.id || "");

  // Кнопка "Почати гру"
  document.getElementById("startBtn").addEventListener("click", () => {
    window.location.href = "game.html";
  });

  // Кнопка "Рейтинг"
  document.getElementById("ratingBtn").addEventListener("click", () => {
    alert("Рейтинг буде доступний незабаром!");
  });

  // Кнопка "Призи"
  document.getElementById("prizesBtn").addEventListener("click", () => {
    alert("1 місце — 40 000 грн\n2 місце — 10 000 грн\n3 місце — 2 500 грн");
  });

  // Кнопка "Поділитися"
  document.getElementById("shareBtn").addEventListener("click", () => {
    tg.shareGame(); // Вбудована функція Telegram
  });
});
