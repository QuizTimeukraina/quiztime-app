const API_URL = "https://quiztime-app.onrender.com"; // ← ЗАМЕНИ на свой backend!

export async function getQuestions() {
  try {
    const res = await fetch(`${API_URL}/game/questions`);
    return await res.json();
  } catch (err) {
    console.error("Помилка при завантаженні питань:", err);
    return [];
  }
}

export async function sendResult(telegramId, score) {
  try {
    await fetch(`${API_URL}/game/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegramId, score }),
    });
  } catch (err) {
    console.error("Помилка при збереженні результату:", err);
  }
}

export async function checkSubscription(telegramId) {
  try {
    const res = await fetch(`${API_URL}/stripe/status/${telegramId}`);
    const data = await res.json();
    return data.isSubscribed;
  } catch (err) {
    console.error("Помилка перевірки підписки:", err);
    return false;
  }
}

