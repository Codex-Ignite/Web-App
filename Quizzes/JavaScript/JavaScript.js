// Function to fetch quiz data from the JSON file
async function fetchQuizzes() {
  const response = await fetch('JavaScript.json');
  const quizData = await response.json();
  return quizData;
}

// Function to display quizzes
async function displayQuizzes() {
  const quizzes = await fetchQuizzes();
  const quizContainer = document.getElementById("quiz-container");
  let quizHTML = '';

  for (const category in quizzes) {
    quizHTML += `<h2>${category} Quiz</h2>`;
    quizzes[category].forEach((quiz, index) => {
      quizHTML += `
        <div class="quiz-item">
          <p>${quiz.question}</p>
          <div class="options">
            ${quiz.options.map((option, i) => `
              <label>
                <input type="radio" name="quiz-${category}-${index}" value="${option}" />
                ${option}
              </label>
            `).join('')}
          </div>
        </div>
      `;
    });
  }

  quizContainer.innerHTML = quizHTML;
}

// Function to handle the quiz submission
function handleSubmit() {
  let score = 0;
  let totalQuestions = 0;
  let unansweredQuestions = 0;  // Keep track of unanswered questions

  fetchQuizzes().then((quizzes) => {
    for (const category in quizzes) {
      quizzes[category].forEach((quiz, index) => {
        totalQuestions++;
        const selectedOption = document.querySelector(`input[name="quiz-${category}-${index}"]:checked`);

        // Check if an option was selected
        if (selectedOption) {
          if (selectedOption.value === quiz.answer) {
            score++;  // Increase score if the answer is correct
          }
        } else {
          unansweredQuestions++;  // Keep track of unanswered questions
        }
      });
    }

    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
      You scored ${score} out of ${totalQuestions}.
      <br>Unanswered Questions: ${unansweredQuestions}.
    `;
  });
}

// Event listener for the submit button
document.getElementById("submit-btn").addEventListener("click", handleSubmit);

// Initialize quiz display
displayQuizzes();
