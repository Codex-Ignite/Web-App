document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const toggleIcons = document.querySelectorAll(".toggle-password");
    const feedback = document.getElementById("feedback");

    // Predefined email and password
    const validEmail = "user@gmail.com";
    const validPassword = "password";

    // Toggle password visibility
    toggleIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const isPasswordHidden = passwordInput.type === "password";
            passwordInput.type = isPasswordHidden ? "text" : "password";

            // Update both icons
            toggleIcons.forEach(icon => {
                icon.classList.toggle('bxs-show', isPasswordHidden);
                icon.classList.toggle('bxs-hide', !isPasswordHidden);
                icon.classList.toggle('bxs-lock-alt', !isPasswordHidden);
            });
        });
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        feedback.style.display = "block";

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Check if the entered email and password match the predefined credentials
        if (email === validEmail && password === validPassword) {
            loginSuccess("Login successful! ");
        } else if (checkAccount(email, password)) {
            loginSuccess("Login successful! ");
        } else {
            // Show error if credentials do not match
            feedback.classList.add("error");
            feedback.textContent = "Invalid email or password. Please try again.";
            setTimeout(() => {
                feedback.style.display = "none";
                feedback.classList.remove("success", "error");
            }, 3000);
        }
    });
    feedback.classList.add("error", "center-text");
    feedback.textContent = "Invalid email or password. Please try again.";


    // Function to check if the entered email and password exist in localStorage
    function checkAccount(email, password) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        return accounts.some(account => account.email === email && account.password === password);
    }

    // Login success feedback
    function loginSuccess(message) {
        feedback.classList.add("success");
        feedback.textContent = message;

        setTimeout(() => {
            window.location.href = "Dash.html"; // Redirect to the dashboard
        }, 2000);
    }
}); 


