document.addEventListener('DOMContentLoaded', function() {
    // Initialize the bus seat layout
    initializeSeats();
    
    // Initialize the schedule data
    populateScheduleData();
    
    // Add event listeners
    document.getElementById('search-btn').addEventListener('click', searchSchedule);
    document.getElementById('booking-form').addEventListener('submit', bookTicket);
    
    // Route card selection
    const routeCards = document.querySelectorAll('.route-card .btn-small');
    routeCards.forEach(card => {
        card.addEventListener('click', selectRoute);
    });

    // Set default date for schedule search
    setDefaultDate();

    // Setup smooth scrolling for navigation
    setupSmoothScrolling();

    // Setup contact form submission
    setupContactForm();

    // Setup newsletter subscription
    setupNewsletterForm();
});

// Initialize bus seats
function initializeSeats() {
    const seatsContainer = document.getElementById('seats-container');
    
    // Clear existing seats
    seatsContainer.innerHTML = '';
    
    // Generate 40 seats (10 rows x 4 seats)
    for (let i = 1; i <= 40; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat available';
        seat.textContent = i;
        seat.dataset.seatNumber = i;
        
        // Randomly mark some seats as booked (for demo purposes)
        if (Math.random() < 0.3) {
            seat.className = 'seat booked';
        } else {
            seat.addEventListener('click', toggleSeatSelection);
        }
        
        seatsContainer.appendChild(seat);
    }
}

// Toggle seat selection
function toggleSeatSelection(e) {
    const seat = e.target;
    
    if (seat.classList.contains('available')) {
        seat.classList.remove('available');
        seat.classList.add('selected');
    } else if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        seat.classList.add('available');
    }
    
    updateSelectedSeats();
}

// Update selected seats display and total price
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsInput = document.getElementById('selected-seats');
    const totalPriceInput = document.getElementById('total-price');
    
    // Update selected seats input
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seatNumber);
    selectedSeatsInput.value = seatNumbers.join(', ');
    
    // Calculate and update total price (assuming $10 per seat)
    const totalPrice = selectedSeats.length * 10;
    totalPriceInput.value = `${totalPrice}`;
}

// Populate schedule data
function populateScheduleData() {
    const scheduleData = [
        { busNo: 'BG101', from: 'Agra', to: 'Delhi', departure: '08:00 AM', arrival: '12:00 PM', price: 'Rs.285' },
        { busNo: 'BG102', from: 'Mumbai', to: 'Bangalore', departure: '10:00 AM', arrival: '02:00 PM', price: 'Rs.1881' },
        { busNo: 'BG103', from: 'Delhi', to: 'Mumbai', departure: '02:00 PM', arrival: '06:00 PM', price: 'Rs.3599' },
        { busNo: 'BG201', from: 'Agra', to: 'Lucknow', departure: '09:00 AM', arrival: '02:00 PM', price: 'Rs.450' },
        { busNo: 'BG202', from: 'Jaipur', to: 'Bikaner', departure: '01:00 PM', arrival: '06:00 PM', price: 'Rs.520' },
        { busNo: 'BG301', from: 'Chennai', to: 'Bengalore', departure: '07:00 AM', arrival: '01:00 PM', price: 'Rs.400' },
        { busNo: 'BG302', from: 'Goa', to: 'Mumbai', departure: '11:00 AM', arrival: '05:00 PM', price: 'Rs.1200' },
        { busNo: 'BG401', from: 'Pune', to: 'Goa', departure: '08:30 AM', arrival: '11:30 AM', price: 'Rs.2000' },
        { busNo: 'BG402', from: 'Hyderabad', to: 'Mumbai', departure: '03:30 PM', arrival: '06:30 PM', price: 'Rs.1200' }
    ];
    
    const scheduleTableBody = document.querySelector('#schedule-table tbody');
    
    // Clear existing data
    scheduleTableBody.innerHTML = '';
    
    // Populate table with schedule data
    scheduleData.forEach(bus => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${bus.busNo}</td>
            <td>${bus.from}</td>
            <td>${bus.to}</td>
            <td>${bus.departure}</td>
            <td>${bus.arrival}</td>
            <td>${bus.price}</td>
            <td><button class="btn-small book-btn">Book</button></td>
        `;
        
        scheduleTableBody.appendChild(row);
    });
    
    // Add event listeners to book buttons
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the bus details from the row
            const row = this.closest('tr');
            const busNo = row.cells[0].textContent;
            const from = row.cells[1].textContent;
            const to = row.cells[2].textContent;
            const departure = row.cells[3].textContent;
            const price = row.cells[5].textContent;
            
            // Store the selected bus info in session storage
            sessionStorage.setItem('selectedBus', JSON.stringify({
                busNo,
                from,
                to,
                departure,
                price
            }));
            
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Search schedule
function searchSchedule() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    
    if (!from || !to || !date) {
        alert('Please select departure city, destination city, and date.');
        return;
    }
    
    // Get human-readable city names
    const fromCity = document.getElementById('from').options[document.getElementById('from').selectedIndex].text;
    const toCity = document.getElementById('to').options[document.getElementById('to').selectedIndex].text;
    
    // For demo purposes, filter the schedule table to show only matching routes
    const scheduleTableBody = document.querySelector('#schedule-table tbody');
    const rows = scheduleTableBody.querySelectorAll('tr');
    
    let matchFound = false;
    
    rows.forEach(row => {
        const rowFrom = row.cells[1].textContent;
        const rowTo = row.cells[2].textContent;
        
        if (rowFrom.includes(fromCity) && rowTo.includes(toCity)) {
            row.style.display = '';
            matchFound = true;
        } else {
            row.style.display = 'none';
        }
    });
    
    if (!matchFound) {
        alert(`No buses found from ${fromCity} to ${toCity} on ${date}. Please try different cities or date.`);
    }
}

// Select route from popular routes section
function selectRoute(e) {
    const routeCard = e.target.closest('.route-card');
    const routeName = routeCard.querySelector('h3').textContent;
    
    // Extract from and to cities from route name
    const [from, to] = routeName.split(' to ');
    
    // Set the values in the schedule search form
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    
    // Find and select the matching options
    Array.from(fromSelect.options).forEach(option => {
        if (option.text.includes(from)) {
            option.selected = true;
        }
    });
    
    Array.from(toSelect.options).forEach(option => {
        if (option.text.includes(to)) {
            option.selected = true;
        }
    });
    
    // Scroll to schedule section
    document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
    
    // Trigger search
    searchSchedule();
}

// Book ticket
function bookTicket(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const selectedSeats = document.getElementById('selected-seats').value;
    const totalPrice = document.getElementById('total-price').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!selectedSeats) {
        alert('Please select at least one seat.');
        return;
    }
    
    // Get selected bus info from session storage
    let busInfo = { busNo: 'N/A', from: 'N/A', to: 'N/A', departure: 'N/A' };
    const storedBusInfo = sessionStorage.getItem('selectedBus');
    if (storedBusInfo) {
        busInfo = JSON.parse(storedBusInfo);
    }
    
    // In a real application, you would send this data to a server
    // For demo purposes, just show a confirmation message
    const confirmationMessage = `
        Booking Confirmed!
        
        Bus: ${busInfo.busNo}
        Route: ${busInfo.from} to ${busInfo.to}
        Departure: ${busInfo.departure}
        
        Passenger: ${name}
        Email: ${email}
        Phone: ${phone}
        Seats: ${selectedSeats}
        Total: ${totalPrice}
        
        Thank you for booking with myTour!
    `;
    
    alert(confirmationMessage);
    
    // Reset form and seat selection
    document.getElementById('booking-form').reset();
    resetSeatSelection();
    
    // Clear session storage
    sessionStorage.removeItem('selectedBus');
}

// Reset seat selection
function resetSeatSelection() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('available');
    });
    
    document.getElementById('selected-seats').value = '';
    document.getElementById('total-price').value = '';
}

// Set default date to today
function setDefaultDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const formattedDate = yyyy + '-' + mm + '-' + dd;
        dateInput.value = formattedDate;
        dateInput.min = formattedDate; // Prevent selecting past dates
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup contact form submission
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields in the contact form.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, just show a confirmation message
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
}

// Setup newsletter subscription
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, just show a confirmation message
            alert(`Thank you for subscribing to our newsletter with ${email}!`);
            
            // Reset form
            this.reset();
        });
    }
}

// Add active class to current navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add animation when elements come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.route-card, .schedule-search, .booking-container, .contact-container');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.route-card, .schedule-search, .booking-container, .contact-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll to trigger animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Fix for Font Awesome steering wheel icon
document.addEventListener('DOMContentLoaded', function() {
    // Font Awesome 5 doesn't have fa-steering-wheel, so we'll replace it with fa-steering-wheel from Font Awesome 6 or use an alternative
    const driverIcon = document.querySelector('.driver-area i');
    if (driverIcon && driverIcon.classList.contains('fa-steering-wheel')) {
        driverIcon.classList.remove('fa-steering-wheel');
        driverIcon.classList.add('fa-car'); // Using car icon as an alternative
    }
});
window.addEventListener('load', animateOnScroll);