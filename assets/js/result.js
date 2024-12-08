const results = JSON.parse(localStorage.getItem('quizResults'));

    if (results) {
      const resultsContainer = document.getElementById('results-container');
      resultsContainer.innerHTML = `
        <p>You scored <strong>${results.score}</strong> out of <strong>${results.totalQuestions}</strong> questions.</p>
        <p>Unanswered Questions: <strong>${results.unansweredQuestions}</strong>.</p>
      `;
    } else {
      const resultsContainer = document.getElementById('results-container');
      resultsContainer.innerHTML = `<p>Error: No quiz results found for HTML Quiz. Please take the quiz first.</p>`;
    }

    function clearResults() {
      localStorage.removeItem('quizResults');
      window.location.reload();
    }

    const cssResults = JSON.parse(localStorage.getItem('cssQuizResults'));

    if (cssResults) {
      const cssResultsContainer = document.getElementById('css-results-container');
      cssResultsContainer.innerHTML = `
    <p>You scored <strong>${cssResults.score}</strong> out of <strong>${cssResults.totalQuestions}</strong> questions.</p>
    <p>Unanswered Questions: <strong>${cssResults.unansweredQuestions}</strong>.</p>
  `;
    } else {
      const cssResultsContainer = document.getElementById('css-results-container');
      cssResultsContainer.innerHTML = `<p>Error: No quiz results found for the CSS Quiz. Please take the quiz first.</p>`;
    }

    function clearCssResults() {
      localStorage.removeItem('cssQuizResults');
      window.location.reload();
    }

    const jsResults = JSON.parse(localStorage.getItem('jsQuizResults'));

    if (jsResults) {
      const jsResultsContainer = document.getElementById('js-results-container');
      jsResultsContainer.innerHTML = `
    <p>You scored <strong>${jsResults.score}</strong> out of <strong>${jsResults.totalQuestions}</strong> questions.</p>
    <p>Unanswered Questions: <strong>${jsResults.unansweredQuestions}</strong>.</p>
  `;
    } else {
      const jsResultsContainer = document.getElementById('js-results-container');
      jsResultsContainer.innerHTML = `<p>Error: No quiz results found for the JavaScript Quiz. Please take the quiz first.</p>`;
    }

    function clearJsResults() {
      localStorage.removeItem('jsQuizResults');
      window.location.reload();
    }

    const mixedResults = JSON.parse(localStorage.getItem('mixedQuizResults'));

    if (mixedResults) {
      const mixedResultsContainer = document.getElementById('mixed-results-container');
      mixedResultsContainer.innerHTML = `
    <p>You scored <strong>${mixedResults.score}</strong> out of <strong>${mixedResults.totalQuestions}</strong> questions.</p>
    <p>Unanswered Questions: <strong>${mixedResults.unansweredQuestions}</strong>.</p>
  `;
    } else {
      const mixedResultsContainer = document.getElementById('mixed-results-container');
      mixedResultsContainer.innerHTML = `<p>Error: No quiz results found for the Mixed Quizzes. Please take the quiz first.</p>`;
    }

    function clearMixedResults() {
      localStorage.removeItem('mixedQuizResults');
      window.location.reload();
    }




    const logo = document.getElementById('logo');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    logo.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      content.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
      if (!sidebar.contains(event.target) && !logo.contains(event.target)) {
        sidebar.classList.remove('active');
        content.classList.remove('active');
      }
    });