// Authentication functionality

// Import showToast function (assuming it's in utils.js)
import { showToast } from "./utils.js"

// DOM Elements
const logoutBtn = document.getElementById("logout-btn")
const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")
const loginButton = document.getElementById("login-button")
const registerButton = document.getElementById("register-button")

// Logout functionality
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    // Clear user data from localStorage
    localStorage.removeItem("user")

    // Show success message
    showToast("Logged out", "You have been successfully logged out.", "success")

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)
  })
}

// Login form submission
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Get form data
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    // Disable button and show loading state
    loginButton.disabled = true
    loginButton.textContent = "Logging in..."

    try {
      // In a real app, we would call the API
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user info in localStorage
      const user = {
        id: "123456",
        name: "John Doe",
        email: email,
        phone: "+1 (555) 123-4567",
        isLoggedIn: true,
      }

      localStorage.setItem("user", JSON.stringify(user))

      // Show success message
      showToast("Login successful", "Welcome back to SkyWay!", "success")

      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } catch (error) {
      // Show error message
      showToast("Login failed", error.message || "Invalid email or password.", "error")
    } finally {
      // Re-enable button and restore text
      loginButton.disabled = false
      loginButton.textContent = "Login"
    }
  })
}

// Register form submission
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Get form data
    const name = document.getElementById("register-name").value
    const email = document.getElementById("register-email").value
    const phone = document.getElementById("register-phone").value
    const password = document.getElementById("register-password").value
    const confirmPassword = document.getElementById("confirm-password").value

    // Validate passwords match
    if (password !== confirmPassword) {
      showToast("Registration failed", "Passwords do not match.", "error")
      return
    }

    // Disable button and show loading state
    registerButton.disabled = true
    registerButton.textContent = "Creating account..."

    try {
      // In a real app, we would call the API
      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user info in localStorage
      const user = {
        id: "123456",
        name: name,
        email: email,
        phone: phone,
        isLoggedIn: true,
      }

      localStorage.setItem("user", JSON.stringify(user))

      // Show success message
      showToast("Registration successful", "Your account has been created!", "success")

      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } catch (error) {
      // Show error message
      showToast("Registration failed", error.message || "Could not create account.", "error")
    } finally {
      // Re-enable button and restore text
      registerButton.disabled = false
      registerButton.textContent = "Create account"
    }
  })
}

// Check if user is logged in and redirect if needed
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("user"))
  const currentPage = window.location.pathname.split("/").pop()

  // Pages that require authentication
  const authRequiredPages = ["profile.html", "booking.html", "payment.html", "confirmation.html"]

  // Pages that should redirect to home if already logged in
  const noAuthPages = ["login.html"]

  if (authRequiredPages.includes(currentPage) && (!user || !user.isLoggedIn)) {
    // Redirect to login page if not logged in
    showToast("Authentication required", "Please log in to access this page.", "warning")
    window.location.href = "login.html"
  } else if (noAuthPages.includes(currentPage) && user && user.isLoggedIn) {
    // Redirect to home page if already logged in
    window.location.href = "index.html"
  }
}

// Call checkAuth when DOM is loaded
document.addEventListener("DOMContentLoaded", checkAuth)
