let currentQuestionIndex = 0;
let timer;
let score = 0;
let totalQuestions = 0;
let unansweredQuestions = 0;

// Fetch quizzes and store them globally
let quizzes;

async function fetchQuizzes() {
  const response = await fetch('mixed.json');
  quizzes = await response.json();  // Store quizzes globally

  // Shuffle questions for each category after fetching
  for (const category in quizzes) {
    shuffleArray(quizzes[category]);
  }
}

// Shuffle function to randomize the question order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Function to display a single quiz question
async function displayQuestion() {
  if (!quizzes) {
    await fetchQuizzes();
  }

  const quizContainer = document.getElementById("quiz-container");
  const category = "HTML";  // Use HTML category for this example

  // Ensure the category exists and quiz for the current index exists
  if (quizzes[category] && quizzes[category][currentQuestionIndex]) {
    const quiz = quizzes[category][currentQuestionIndex];

    let questionHTML = `
      <h2>${category} Quiz</h2>
      <p>${quiz.question}</p>
      <div class="options">
        ${quiz.options.map((option, i) => `
          <label>
            <input type="radio" name="quiz-${category}-${currentQuestionIndex}" value="${option}" />
            ${option}
          </label>
        `).join('')}
      </div>
    `;

    quizContainer.innerHTML = questionHTML;

    // Start the timer for this question
    startTimer();

    // Hide the result container and show the quiz container
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    // Event listener for submit button
    document.getElementById("submit-btn").addEventListener("click", handleSubmit);
  }
}

// Function to start a 15-second timer
function startTimer() {
  let timeLeft = 15;
  const timerElement = document.getElementById("timer");

  // Update the timer every second
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizzes.HTML.length) { // Ensure total questions are handled dynamically
    displayQuestion();
  } else {
    // Save the quiz results to localStorage
    localStorage.setItem('mixedQuizResults', JSON.stringify({
      score: score,
      totalQuestions: totalQuestions,
      unansweredQuestions: unansweredQuestions
    }));

    // Redirect to the results page
    window.location.href = 'results.html'; // This will navigate to results.html page
  }
}

// Function to handle question submission
async function handleSubmit() {
  clearInterval(timer);

  const category = "HTML";
  const quiz = quizzes[category][currentQuestionIndex];
  totalQuestions++;

  const selectedOption = document.querySelector(`input[name="quiz-${category}-${currentQuestionIndex}"]:checked`);

  if (selectedOption) {
    if (selectedOption.value === quiz.answer) {
      score++;  // Increase score if the answer is correct
    }
  } else {
    unansweredQuestions++;  // Track unanswered questions
  }

  nextQuestion();
}

// Function to display the final result
function showResults() {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `
    You scored ${score} out of ${totalQuestions}.
    <br>Unanswered Questions: ${unansweredQuestions}.
  `;

  // Hide the quiz container, submit button, and timer
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("timer").style.display = "none";

  // Show the result container
  resultContainer.style.display = "block";
}

// Initialize quiz display
fetchQuizzes().then(() => displayQuestion());
const logo = document.getElementById('logo');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

// Toggle sidebar visibility when clicking the logo
logo.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  content.classList.toggle('active');
});

// Close sidebar when clicking anywhere outside
document.addEventListener('click', function (event) {
  if (!sidebar.contains(event.target) && !logo.contains(event.target)) {
    sidebar.classList.remove('active');
    content.classList.remove('active');
  }
});