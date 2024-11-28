document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("togglePassword");
    const feedback = document.getElementById("feedback");

    // Password visibility toggle
    togglePasswordButton.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePasswordButton.textContent = type === "password" ? "Show" : "Hide";
    });

    // Form validation and submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (validateEmail(email) && validatePassword(password)) {
            feedback.style.display = 'block';
            feedback.textContent = "Login successful!";
            feedback.className = "feedback-message success"; // Show success message

            setTimeout(() => {
                // Redirect or handle login logic
                // window.location.href = "dashboard.html"; // Uncomment this for real use
            }, 1000);
        } else {
            feedback.style.display = 'block';
            feedback.textContent = "Please enter a valid email and password.";
            feedback.className = "feedback-message error"; // Show error message
        }
    });

    // Email validation helper function
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Password validation helper function (requires at least 6 characters)
    function validatePassword(password) {
        return password.length >= 6;
    }
});

// Handle the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic hardcoded login (you can replace this with your server-side logic)
    if (email === 'codex@gmail.com' && password === '12345') {
      // Redirect to the quiz page if credentials are correct
      window.location.href = 'index.html';
    } else {
      // Show an error message if credentials are incorrect
      document.getElementById('errorMessage').style.display = 'block';
    }
  });