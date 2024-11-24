let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from the JSON file
fetch('QuizApp.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion();
  })
  .catch(error => console.error('Error fetching questions:', error));

// Display the current question and choices
function displayQuestion() {
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  
  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  
  choicesElement.innerHTML = '';
  currentQuestion.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.onclick = () => checkAnswer(choice);
    choicesElement.appendChild(button);
  });
}

// Check if the chosen answer is correct
function checkAnswer(selectedChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  
  if (selectedChoice === currentQuestion.answer) {
    score++;
  }
  
  currentQuestionIndex++;
  displayQuestion();
}

// Show the final result
function showResult() {
  const quizElement = document.getElementById('quiz');
  const resultElement = document.getElementById('result');
  
  quizElement.style.display = 'none';
  resultElement.textContent = `You scored ${score} out of ${questions.length}`;
}
