document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('remember');
    const loginBtn = document.querySelector('.login-btn');
    const spinner = document.querySelector('.spinner');
    const btnText = document.querySelector('.btn-text');

    // Error message elements
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Input focus effects
    [username, password].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.background = 'rgba(255, 255, 255, 0.15)';
        });
    });

    // Form validation
    function validateUsername(username) {
        return username.length >= 4;
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    // Show error message
    function showError(element, message) {
        element.style.display = 'block';
        element.textContent = message;
    }

    // Hide error message
    function hideError(element) {
        element.style.display = 'none';
    }

    // Simulate login process
    function simulateLogin() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.5;
                if (success) {
                    resolve();
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 2000);
        });
    }

    // Handle form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset errors
        hideError(usernameError);
        hideError(passwordError);

        let isValid = true;

        // Validate username
        if (!validateUsername(username.value)) {
            showError(usernameError, 'Username must be at least 4 characters long');
            isValid = false;
        }

        // Validate password
        if (!validatePassword(password.value)) {
            showError(passwordError, 'Password must be at least 6 characters long');
            isValid = false;
        }

        if (isValid) {
            // Show loading state
            loginBtn.disabled = true;
            btnText.style.opacity = '0';
            spinner.style.display = 'block';

            try {
                await simulateLogin();
                
                // Success animation
                loginBtn.style.background = '#22c55e';
                btnText.textContent = 'Success!';
                btnText.style.opacity = '1';
                spinner.style.display = 'none';

                // Save remember me preference
                if (rememberMe.checked) {
                    localStorage.setItem('rememberedUser', username.value);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Redirect after success
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);

            } catch (error) {
                // Error animation
                loginBtn.style.background = '#ef4444';
                btnText.textContent = 'Failed!';
                btnText.style.opacity = '1';
                spinner.style.display = 'none';

                setTimeout(() => {
                    // Reset button state
                    loginBtn.style.background = 'white';
                    btnText.textContent = 'Login';
                    loginBtn.disabled = false;
                }, 2000);
            }
        }
    });

    // Social login buttons hover effect
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        username.value = rememberedUser;
        rememberMe.checked = true;
    }

    // Add ripple effect to login button
    loginBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });

    // Add floating label animation
    document.querySelectorAll('.input-field input').forEach(input => {
        input.addEventListener('input', function() {
            const label = this.previousElementSibling;
            if (this.value) {
                label.classList.add('float');
            } else {
                label.classList.remove('float');
            }
        });
    });
});

// Add some dynamic background effects
function createParticles() {
    const particles = document.createElement('div');
    particles.classList.add('particles');
    document.body.appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particles.appendChild(particle);
    }
}

// Initialize particles
createParticles();