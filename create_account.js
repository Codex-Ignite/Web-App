document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createAccountForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const feedback = document.getElementById("feedback");

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validate form
        if (validateForm(username, email, password, confirmPassword)) {
            feedback.classList.remove("error");
            feedback.classList.add("success");
            feedback.textContent = "Account created successfully!";
            feedback.style.display = "block";
            
            // Simulate a successful account creation
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect to login page
            }, 1500);
        } else {
            feedback.classList.remove("success");
            feedback.classList.add("error");
            feedback.textContent = "Please fill out all fields correctly.";
            feedback.style.display = "block";
        }
    });

    // Form validation
    function validateForm(username, email, password, confirmPassword) {
        if (!username || !email || !password || !confirmPassword) return false;
        if (password !== confirmPassword) return false;
        if (!validateEmail(email)) return false;
        return true;
    }

    // Email format validation
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
});
