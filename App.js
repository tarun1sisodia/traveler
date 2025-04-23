// Common functionality for all pages

// DOM Elements
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMobile = document.querySelector(".nav-mobile")
const loginBtn = document.querySelector(".login-btn")
const userProfileMenu = document.querySelector(".user-profile-menu")
const currentYearElements = document.querySelectorAll("#current-year")
const toastContainer = document.querySelector(".toast-container")

// Set current year in footer
currentYearElements.forEach((element) => {
  element.textContent = new Date().getFullYear()
})

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMobile.classList.toggle("hidden")

    // Toggle icon
    const icon = mobileMenuToggle.querySelector("i")
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
}

// Tab functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab-button")) {
    const tabId = e.target.getAttribute("data-tab")
    const tabButtons = e.target.parentElement.querySelectorAll(".tab-button")
    const tabPanes = e.target.closest(".tabs").querySelectorAll(".tab-pane")

    // Remove active class from all buttons and panes
    tabButtons.forEach((button) => button.classList.remove("active"))
    tabPanes.forEach((pane) => pane.classList.remove("active"))

    // Add active class to clicked button and corresponding pane
    e.target.classList.add("active")
    document.getElementById(`${tabId}-tab`).classList.add("active")
  }
})

// Format date function
function formatDate(dateString) {
  if (!dateString) return ""

  const date = new Date(dateString)
  const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Format time function
function formatTime(timeString) {
  if (!timeString) return ""

  // If timeString is already in HH:MM format, return it
  if (/^\d{1,2}:\d{2}$/.test(timeString)) {
    return timeString
  }

  const date = new Date(timeString)
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

// Format currency function
function formatCurrency(amount) {
  return "$" + Number.parseFloat(amount).toFixed(2)
}

// Generate random ID
function generateId(prefix = "") {
  return prefix + Math.floor(Math.random() * 1000000)
}

// Show toast notification
function showToast(title, message, type = "info", duration = 5000) {
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  let iconClass = "fa-info-circle"
  if (type === "success") iconClass = "fa-check-circle"
  if (type === "error") iconClass = "fa-exclamation-circle"
  if (type === "warning") iconClass = "fa-exclamation-triangle"

  toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `

  toastContainer.appendChild(toast)

  // Add event listener to close button
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.style.animation = "slideOut 0.3s ease forwards"
    setTimeout(() => {
      toast.remove()
    }, 300)
  })

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode === toastContainer) {
      toast.style.animation = "slideOut 0.3s ease forwards"
      setTimeout(() => {
        toast.remove()
      }, 300)
    }
  }, duration)
}

// API base URL
const API_BASE_URL = "http://localhost:3000/api"

// Fetch API wrapper
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Mock API for development (when backend is not available)
const mockAPI = {
  // Mock flights data
  flights: [
    {
      id: "1",
      airline: "SkyWay Airlines",
      airlineLogo: "images/airline-1.jpg",
      flightNumber: "SK101",
      origin: "New York",
      originAirport: "JFK",
      destination: "London",
      destinationAirport: "LHR",
      departureTime: "08:30",
      arrivalTime: "20:45",
      departureDate: "May 15, 2023",
      arrivalDate: "May 15, 2023",
      duration: "7h 15m",
      stops: 0,
      price: 549,
      aircraft: "Boeing 787",
      class: "Economy",
      features: ["Wi-Fi", "In-flight Entertainment", "Meals Included", "USB Power"],
    },
    {
      id: "2",
      airline: "Global Airways",
      airlineLogo: "images/airline-2.jpg",
      flightNumber: "GA205",
      origin: "New York",
      originAirport: "JFK",
      destination: "London",
      destinationAirport: "LHR",
      departureTime: "10:15",
      arrivalTime: "22:30",
      departureDate: "May 15, 2023",
      arrivalDate: "May 15, 2023",
      duration: "7h 15m",
      stops: 1,
      price: 489,
      aircraft: "Airbus A350",
      class: "Economy",
      features: ["Wi-Fi", "In-flight Entertainment", "Meals Available for Purchase"],
    },
    {
      id: "3",
      airline: "Atlantic Air",
      airlineLogo: "images/airline-3.jpg",
      flightNumber: "AA310",
      origin: "New York",
      originAirport: "JFK",
      destination: "London",
      destinationAirport: "LHR",
      departureTime: "16:45",
      arrivalTime: "05:00",
      departureDate: "May 15, 2023",
      arrivalDate: "May 16, 2023",
      duration: "7h 15m",
      stops: 0,
      price: 599,
      aircraft: "Boeing 777",
      class: "Economy",
      features: ["Wi-Fi", "In-flight Entertainment", "Meals Included", "Extra Legroom"],
    },
    {
      id: "4",
      airline: "SkyWay Airlines",
      airlineLogo: "images/airline-1.jpg",
      flightNumber: "SK202",
      origin: "New York",
      originAirport: "JFK",
      destination: "London",
      destinationAirport: "LHR",
      departureTime: "19:30",
      arrivalTime: "07:45",
      departureDate: "May 15, 2023",
      arrivalDate: "May 16, 2023",
      duration: "7h 15m",
      stops: 0,
      price: 529,
      aircraft: "Boeing 787",
      class: "Economy",
      features: ["Wi-Fi", "In-flight Entertainment", "Meals Included", "USB Power"],
    },
    {
      id: "5",
      airline: "Global Airways",
      airlineLogo: "images/airline-2.jpg",
      flightNumber: "GA115",
      origin: "New York",
      originAirport: "JFK",
      destination: "London",
      destinationAirport: "LHR",
      departureTime: "21:15",
      arrivalTime: "09:30",
      departureDate: "May 15, 2023",
      arrivalDate: "May 16, 2023",
      duration: "7h 15m",
      stops: 1,
      price: 459,
      aircraft: "Airbus A330",
      class: "Economy",
      features: ["In-flight Entertainment", "Meals Available for Purchase"],
    },
    {
      id: "6",
      airline: "Atlantic Air",
      airlineLogo: "images/airline-3.jpg",
      flightNumber: "AA410",
      origin: "New York",
      originAirport: "JFK",
      destination: "London",
      destinationAirport: "LHR",
      departureTime: "23:00",
      arrivalTime: "11:15",
      departureDate: "May 15, 2023",
      arrivalDate: "May 16, 2023",
      duration: "7h 15m",
      stops: 0,
      price: 579,
      aircraft: "Boeing 777",
      class: "Economy",
      features: ["Wi-Fi", "In-flight Entertainment", "Meals Included", "Extra Legroom"],
    },
  ],

  // Mock API methods
  async getFlights(from, to, departDate, returnDate, passengers, tripType) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Filter flights based on search criteria
    return this.flights.filter((flight) => {
      // In a real app, we would filter based on all criteria
      // For demo purposes, we're just checking origin and destination
      return (
        (!from || flight.origin.toLowerCase().includes(from.toLowerCase())) &&
        (!to || flight.destination.toLowerCase().includes(to.toLowerCase()))
      )
    })
  },

  async getFlightById(id) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Find flight by ID
    const flight = this.flights.find((f) => f.id === id)

    if (!flight) {
      throw new Error("Flight not found")
    }

    return flight
  },
}

// Initialize page
function initPage() {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user.isLoggedIn) {
    // Update UI for logged in user
    if (loginBtn) loginBtn.classList.add("hidden")
    if (userProfileMenu) {
      userProfileMenu.classList.remove("hidden")

      // Update user info
      const avatarText = userProfileMenu.querySelector(".avatar-text")
      const userName = userProfileMenu.querySelector(".user-name")
      const userEmail = userProfileMenu.querySelector(".user-email")

      if (avatarText) avatarText.textContent = user.name.charAt(0)
      if (userName) userName.textContent = user.name
      if (userEmail) userEmail.textContent = user.email
    }
  } else {
    // Update UI for logged out user
    if (loginBtn) loginBtn.classList.remove("hidden")
    if (userProfileMenu) userProfileMenu.classList.add("hidden")
  }
}

// Call initPage when DOM is loaded
document.addEventListener("DOMContentLoaded", initPage)
