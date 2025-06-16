const allQuestions = [
  {
    question: "Столиця України?",
    answers: ["Харків", "Київ", "Львів", "Одеса"],
    correct: 1
  },
  {
    question: "Який океан найбільший?",
    answers: ["Атлантичний", "Індійський", "Тихий", "Північний Льодовитий"],
    correct: 2
  },
  {
    question: "Скільки днів у високосному році?",
    answers: ["365", "366", "364", "360"],
    correct: 1
  },
  {
    question: "Хто написав 'Кобзар'?",
    answers: ["Леся Українка", "Іван Франко", "Тарас Шевченко", "Гоголь"],
    correct: 2
  },
  {
    question: "Яка планета найбільша?",
    answers: ["Земля", "Марс", "Юпітер", "Сатурн"],
    correct: 2
  }
];

// Перемішуємо масив питань
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default shuffle(allQuestions);
