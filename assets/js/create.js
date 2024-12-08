document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createAccountForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const feedback = document.getElementById("feedback");

    // Function to toggle visibility for a specific field
    function togglePasswordField(inputId, lockIconId, eyeIconId) {
        const inputField = document.getElementById(inputId);
        const lockIcon = document.getElementById(lockIconId);
        const eyeIcon = document.getElementById(eyeIconId);

        const isPasswordHidden = inputField.type === "password";
        inputField.type = isPasswordHidden ? "text" : "password";

        // Show or hide icons based on the state of the password visibility
        if (isPasswordHidden) {
            lockIcon.style.display = "none";  // Hide the lock icon
            eyeIcon.style.display = "inline-block";  // Show the eye icon
        } else {
            lockIcon.style.display = "inline-block";  // Show the lock icon
            eyeIcon.style.display = "none";  // Hide the eye icon
        }
    }

    // Attach event listeners for Password field
    document.getElementById("togglePasswordLock").addEventListener("click", () => {
        togglePasswordField("password", "togglePasswordLock", "togglePasswordEye");
    });

    document.getElementById("togglePasswordEye").addEventListener("click", () => {
        togglePasswordField("password", "togglePasswordLock", "togglePasswordEye");
    });

    // Attach event listeners for Confirm Password field
    document.getElementById("toggleConfirmPasswordLock").addEventListener("click", () => {
        togglePasswordField("confirmPassword", "toggleConfirmPasswordLock", "toggleConfirmPasswordEye");
    });

    document.getElementById("toggleConfirmPasswordEye").addEventListener("click", () => {
        togglePasswordField("confirmPassword", "toggleConfirmPasswordLock", "toggleConfirmPasswordEye");
    });

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validate form
        if (validateForm(username, email, password, confirmPassword)) {
            feedback.classList.remove("error", "center-text");
            feedback.classList.add("success");
            feedback.textContent = "Account created successfully!";
            feedback.style.display = "block";

            // Store account in localStorage
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            accounts.push({ username, email, password });
            localStorage.setItem('accounts', JSON.stringify(accounts));

            // Redirect to login page
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to login page
            }, 1500);
        } else {
            feedback.classList.remove("success");
            feedback.classList.add("error", "center-text");
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