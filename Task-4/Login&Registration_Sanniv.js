document.addEventListener('DOMContentLoaded', () => {
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');

    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    const switchForms = (show, hide) => {
        hide.style.opacity = '0';
        hide.style.transform = 'scale(0.95)';
        setTimeout(() => {
            hide.style.display = 'none';
            show.style.display = 'block';
            setTimeout(() => {
                show.style.opacity = '1';
                show.style.transform = 'scale(1)';
            }, 50);
        }, 500);
    };

    // Toggle between login and register forms
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms(registerFormContainer, loginFormContainer);
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms(loginFormContainer, registerFormContainer);
    });

    // Show/hide password
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                button.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                button.textContent = 'Show';
            }
        });
    });

    // Validation
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const passwordStrengthMeter = document.getElementById('password-strength-meter');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const confirmPassword = document.getElementById('confirm-password');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;

        passwordStrengthMeter.className = '';
        if (password.length > 0) {
            if (strength <= 2) {
                passwordStrengthMeter.classList.add('weak');
            } else if (strength <= 4) {
                passwordStrengthMeter.classList.add('medium');
            } else {
                passwordStrengthMeter.classList.add('strong');
            }
        }

        return password.length >= 8;
    };

    registerPassword.addEventListener('input', () => {
        checkPasswordStrength(registerPassword.value);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const showError = (element, message) => {
            element.textContent = message;
            if (message) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        };

        // Reset errors
        showError(emailError, '');
        showError(passwordError, '');
        showError(confirmPasswordError, '');

        // Validate email
        if (!validateEmail(registerEmail.value)) {
            showError(emailError, 'Invalid email format.');
            valid = false;
        }

        // Validate password
        if (!checkPasswordStrength(registerPassword.value)) {
            showError(passwordError, 'Password must be at least 8 characters long.');
            valid = false;
        }

        // Validate confirm password
        if (registerPassword.value !== confirmPassword.value) {
            showError(confirmPasswordError, 'Passwords do not match.');
            valid = false;
        }

        if (valid) {
            // Mock registration and login
            localStorage.setItem('loggedInUser', registerEmail.value);
            alert('Registration successful! You are now logged in.');
            // Redirect or update UI
            window.location.href = '#'; // Or a logged-in page
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('login-email').value;
        // In a real app, you'd check credentials against a server
        // Here we just mock it
        localStorage.setItem('loggedInUser', loginEmail);
        alert('Login successful!');
        // Redirect or update UI
        window.location.href = '#'; // Or a logged-in page
    });

    // Check login state
    if (localStorage.getItem('loggedInUser')) {
        // You can add logic here to show a logged-in state
        console.log(`User ${localStorage.getItem('loggedInUser')} is logged in.`);
    }
});
