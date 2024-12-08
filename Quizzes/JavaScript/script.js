// Global Variables
let questions = [];
let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let timer, progressBarTimer, progressWidth = 0;

// DOM Elements
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Fetch questions and start the quiz
fetch('JavaScript.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayInstructions();
    })
    .catch(error => console.error('Error loading questions:', error));

// --------------- Display Instructions ---------------
function displayInstructions() {
    info_box.classList.add("activeInfo");
    document.querySelector(".info_box .restart").onclick = startQuiz;
}

// --------------- Start the Quiz ---------------
function startQuiz() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");

    showQuestion(que_count);
    updateQuestionCounter(que_numb);
    startTimer(timeValue);
    startProgressBar();
}
// Quit Quiz Button Functionality
document.getElementById("exitQuizBtn").onclick = () => {
    window.location.href = "../Quiz.html"; // Redirect to Quiz.html
};

// --------------- Show the Question ---------------
function showQuestion(index) {
    const currentQuestion = questions[index];
    const questionText = document.querySelector(".que_text");

    // Create question and options dynamically
    questionText.innerHTML = `<span>${currentQuestion.numb}. ${currentQuestion.question}</span>`;
    option_list.innerHTML = currentQuestion.options.map(option => `<div class="option"><span>${option}</span></div>`).join("");

    // Attach click event to each option
    const options = option_list.querySelectorAll(".option");
    options.forEach(option => option.onclick = () => optionSelected(option));
}

// --------------- Option Selection ---------------
function optionSelected(answer) {
    clearInterval(timer);
    clearInterval(progressBarTimer);

    const userAnswer = answer.textContent;
    const correctAnswer = questions[que_count].answer;
    const allOptions = option_list.children;

    if (userAnswer === correctAnswer) {
        userScore++;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", `<div class="icon tick"><i class="fas fa-check"></i></div>`);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", `<div class="icon cross"><i class="fas fa-times"></i></div>`);

        // Highlight the correct answer
        [...allOptions].forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", `<div class="icon tick"><i class="fas fa-check"></i></div>`);
            }
        });
    }

    // Disable all options and show the Next button
    [...allOptions].forEach(option => option.classList.add("disabled"));
    next_btn.classList.add("show");
}

// --------------- Next Button Click ---------------
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestion(que_count);
        updateQuestionCounter(que_numb);
        resetTimers();
    } else {
        endQuiz();
    }
};

// --------------- Restart Quiz ---------------
document.querySelector(".result_box .restart").onclick = () => {
    resetQuiz();
    startQuiz();
};

// --------------- Quit Quiz ---------------
document.querySelector(".result_box .quit").onclick = () => {
    window.location.href = "../Quiz.html"; // Redirect to Quiz.html
};

// --------------- Update Question Counter ---------------
function updateQuestionCounter(index) {
    bottom_ques_counter.innerHTML = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
}

// --------------- Reset Quiz Timer and Progress Bar ---------------
function resetTimers() {
    clearInterval(timer);
    clearInterval(progressBarTimer);
    startTimer(timeValue);
    startProgressBar();
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

// --------------- Show the Result ---------------
function endQuiz() {
    clearInterval(timer);
    clearInterval(progressBarTimer);
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    const totalQuestions = questions.length;

    // Save the quiz results to localStorage (optional for persistence)
    localStorage.setItem('quizResults', JSON.stringify({
        score: userScore,
        totalQuestions: totalQuestions,
        unansweredQuestions: totalQuestions - userScore // Example logic
    }));

    // Dynamically display results on the same page
    const scoreText = result_box.querySelector(".score_text");
    let scoreMessage = `and sorry 😐, You got only <p>${userScore}</p> out of <p>${totalQuestions}</p>`;

    if (userScore > 3) {
        scoreMessage = `and congrats! 🎉, You got <p>${userScore}</p> out of <p>${totalQuestions}</p>`;
    } else if (userScore > 1) {
        scoreMessage = `and nice 😎, You got <p>${userScore}</p> out of <p>${totalQuestions}</p>`;
    }

    scoreText.innerHTML = `<span>${scoreMessage}</span>`;

    // Optionally show additional stats
    const additionalStats = result_box.querySelector(".additional_stats");
    additionalStats.innerHTML = `
        <p>Total Questions: ${totalQuestions}</p>
        <p>Unanswered Questions: ${totalQuestions - userScore}</p>
    `;
}


// --------------- Start the Timer ---------------
function startTimer(time) {
    timer = setInterval(() => {
        timeCount.textContent = time < 10 ? "0" + time : time;
        time--;

        if (time < 0) {
            clearInterval(timer);
            timeText.textContent = "Time Off";
            selectCorrectAnswerAutomatically();
        }
    }, 1000);
}

// --------------- Start the Progress Bar ---------------
function startProgressBar() {
    let time = 0;
    progressBarTimer = setInterval(() => {
        time += 1;
        time_line.style.width = time + "px";

        if (time > 549) {
            clearInterval(progressBarTimer);
        }
    }, 20);
}

// --------------- Auto-select Correct Answer When Time Runs Out ---------------
function selectCorrectAnswerAutomatically() {
    const correctAnswer = questions[que_count].answer;
    const allOptions = option_list.children;

    [...allOptions].forEach(option => {
        if (option.textContent === correctAnswer) {
            option.classList.add("correct");
            option.insertAdjacentHTML("beforeend", `<div class="icon tick"><i class="fas fa-check"></i></div>`);
        }
        option.classList.add("disabled");
    });
    next_btn.classList.add("show");
}

// --------------- Reset the Quiz ---------------
function resetQuiz() {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 10;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    progressWidth = 0;
    showQuestion(que_count);
    updateQuestionCounter(que_numb);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}
