document.addEventListener('DOMContentLoaded', function() {
    // Initialize date pickers
    flatpickr("#train-date", {
        minDate: "today",
        dateFormat: "d M, Y",
        disableMobile: "true"
    });

    flatpickr("#cab-date", {
        minDate: "today",
        dateFormat: "d M, Y",
        disableMobile: "true"
    });

    flatpickr("#cab-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        disableMobile: "true"
    });

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Ride type selector
    const rideTypes = document.querySelectorAll('.ride-type');
    
    rideTypes.forEach(type => {
        type.addEventListener('click', () => {
            // Remove active class from all ride types
            rideTypes.forEach(type => type.classList.remove('active'));
            
            // Add active class to clicked ride type
            type.classList.add('active');
            
            // Check the radio input
            const radio = type.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });

    // Swap stations functionality
    const swapBtn = document.getElementById('swap-stations');
    const fromInput = document.getElementById('train-from');
    const toInput = document.getElementById('train-to');
    
    swapBtn.addEventListener('click', () => {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
    });

    // Station suggestions
    const stations = [
        "Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", 
        "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
        "New Delhi", "Mumbai Central", "Chennai Central", "Howrah", "Bengaluru",
        "Secunderabad", "Ahmedabad Junction", "Pune Junction", "Jaipur Junction", "Lucknow Junction"
    ];

    function showSuggestions(input, suggestionsElement) {
        const value = input.value.toLowerCase();
        const suggestionsContainer = document.getElementById(suggestionsElement);
        
        if (value.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const filteredStations = stations.filter(station => 
            station.toLowerCase().includes(value)
        );
        
        if (filteredStations.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        suggestionsContainer.innerHTML = '';
        filteredStations.forEach(station => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = station;
            item.addEventListener('click', () => {
                input.value = station;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(item);
        });
        
        suggestionsContainer.style.display = 'block';
    }

    fromInput.addEventListener('input', () => showSuggestions(fromInput, 'from-suggestions'));
    toInput.addEventListener('input', () => showSuggestions(toInput, 'to-suggestions'));

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-icon')) {
            document.getElementById('from-suggestions').style.display = 'none';
            document.getElementById('to-suggestions').style.display = 'none';
        }
    });

    // Train booking form submission
    const trainBookingForm = document.getElementById('train-booking-form');
    const trainResultsSection = document.getElementById('train-results');
    const trainResultsContainer = document.getElementById('train-results-container');
    
    trainBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Get form values
        const from = document.getElementById('train-from').value;
        const to = document.getElementById('train-to').value;
        const date = document.getElementById('train-date').value;
        const travelClass = document.getElementById('train-class').value;
        const passengers = document.getElementById('train-passengers').value;
        
        // Simulate API call delay
        setTimeout(() => {
            // Generate train results
            generateTrainResults(from, to, date, travelClass, passengers);
            
            // Hide loading overlay
            document.getElementById('loading-overlay').style.display = 'none';
            
            // Show results section
            trainResultsSection.style.display = 'block';
            
            // Scroll to results
            trainResultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });

    // Generate train results
    function generateTrainResults(from, to, date, travelClass, passengers) {
        // Clear previous results
        trainResultsContainer.innerHTML = '';
        
        // Sample train data
        const trains = [
            {
                name: "Rajdhani Express",
                number: "12301",
                departure: "06:55",
                arrival: "22:30",
                duration: "15h 35m",
                price: 1245,
                availability: "Available"
            },
            {
                name: "Shatabdi Express",
                number: "12002",
                departure: "08:30",
                arrival: "14:45",
                duration: "6h 15m",
                price: 945,
                availability: "WL 5"
            },
            {
                name: "Duronto Express",
                number: "12213",
                departure: "23:00",
                arrival: "14:30",
                duration: "15h 30m",
                price: 1150,
                availability: "Available"
            },
            {
                name: "Tejas Express",
                number: "22120",
                departure: "16:00",
                arrival: "22:15",
                duration: "6h 15m",
                price: 1550,
                availability: "Available"
            }
        ];
        
        // Create result cards
        trains.forEach(train => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');
            
            resultCard.innerHTML = `
                <div class="result-info">
                    <h3 class="result-title">${train.name} (${train.number})</h3>
                    <div class="result-details">
                        <div class="result-detail">
                            <i class="fas fa-clock"></i>
                            <span>${train.departure} - ${train.arrival}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-hourglass-half"></i>
                            <span>${train.duration}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-chair"></i>
                            <span>${travelClass}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${date}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-ticket-alt"></i>
                            <span>${train.availability}</span>
                        </div>
                    </div>
                </div>
                <div class="result-price">
                    <div class="price-amount">₹${train.price * parseInt(passengers)}</div>
                    <div class="price-text">for ${passengers} passenger(s)</div>
                    <button class="btn btn-primary btn-sm book-train-btn" data-train="${train.name}" data-price="${train.price * parseInt(passengers)}">Book Now</button>
                </div>
            `;
            
            trainResultsContainer.appendChild(resultCard);
        });
        
        // Add event listeners to book buttons
        document.querySelectorAll('.book-train-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const trainName = this.getAttribute('data-train');
                const price = this.getAttribute('data-price');
                
                // Show booking confirmation
                showBookingConfirmation('train', {
                    type: 'Train',
                    name: trainName,
                    from: from,
                    to: to,
                    date: date,
                    class: travelClass,
                    passengers: passengers,
                    price: price
                });
            });
        });
    }

    // Cab booking form submission
    const cabBookingForm = document.getElementById('cab-booking-form');
    const cabResultsSection = document.getElementById('cab-results');
    const cabResultsContainer = document.getElementById('cab-results-container');
    
    cabBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Get form values
        const rideType = document.querySelector('input[name="ride-type"]:checked').value;
        const pickup = document.getElementById('cab-pickup').value;
        const destination = document.getElementById('cab-destination').value;
        const date = document.getElementById('cab-date').value;
        const time = document.getElementById('cab-time').value;
        const cabType = document.getElementById('cab-type').value;
        
        // Simulate API call delay
        setTimeout(() => {
            // Generate cab results
            generateCabResults(rideType, pickup, destination, date, time, cabType);
            
            // Hide loading overlay
            document.getElementById('loading-overlay').style.display = 'none';
            
            // Show results section
            cabResultsSection.style.display = 'block';
            
            // Scroll to results
            cabResultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });

    // Generate cab results
    function generateCabResults(rideType, pickup, destination, date, time, cabType) {
        // Clear previous results
        cabResultsContainer.innerHTML = '';
        
        // Sample cab data
        const cabs = [
            {
                type: "Mini",
                capacity: "3 passengers",
                price: rideType === 'city' ? 249 : (rideType === 'outstation' ? 1499 : 599),
                eta: "3 min"
            },
            {
                type: "Sedan",
                capacity: "4 passengers",
                price: rideType === 'city' ? 349 : (rideType === 'outstation' ? 1899 : 799),
                eta: "5 min"
            },
            {
                type: "SUV",
                capacity: "6 passengers",
                price: rideType === 'city' ? 499 : (rideType === 'outstation' ? 2499 : 1099),
                eta: "7 min"
            },
            {
                type: "Luxury",
                capacity: "4 passengers",
                price: rideType === 'city' ? 899 : (rideType === 'outstation' ? 3999 : 1899),
                eta: "10 min"
            }
        ];
        
        // Filter by selected cab type if specified
        let filteredCabs = cabs;
        if (cabType) {
            filteredCabs = cabs.filter(cab => cab.type.toLowerCase() === cabType);
        }
        
        // Create result cards
        filteredCabs.forEach(cab => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');
            
            resultCard.innerHTML = `
                <div class="result-info">
                    <h3 class="result-title">${cab.type}</h3>
                    <div class="result-details">
                        <div class="result-detail">
                            <i class="fas fa-users"></i>
                            <span>${cab.capacity}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-clock"></i>
                            <span>ETA: ${cab.eta}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${pickup} to ${destination}</span>
                        </div>
                        <div class="result-detail">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${date}, ${time}</span>
                        </div>
                    </div>
                </div>
                <div class="result-price">
                    <div class="price-amount">₹${cab.price}</div>
                    <div class="price-text">${rideType === 'rental' ? 'for 4 hours' : 'total fare'}</div>
                    <button class="btn btn-primary btn-sm book-cab-btn" data-cab="${cab.type}" data-price="${cab.price}">Book Now</button>
                </div>
            `;
            
            cabResultsContainer.appendChild(resultCard);
        });
        
        // Add event listeners to book buttons
        document.querySelectorAll('.book-cab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cabType = this.getAttribute('data-cab');
                const price = this.getAttribute('data-price');
                
                // Show booking confirmation
                showBookingConfirmation('cab', {
                    type: 'Cab',
                    cabType: cabType,
                    rideType: rideType.charAt(0).toUpperCase() + rideType.slice(1),
                    pickup: pickup,
                    destination: destination,
                    date: date,
                    time: time,
                    price: price
                });
            });
        });
    }

    // Show booking confirmation
    function showBookingConfirmation(bookingType, details) {
        const bookingModal = document.getElementById('booking-modal');
        const bookingDetails = document.getElementById('booking-details');
        
        // Generate booking ID
        const bookingId = 'BK' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        
        // Clear previous details
        bookingDetails.innerHTML = '';
        
        // Add booking ID and common details
        const detailsHTML = `
            <div class="booking-detail">
                <span class="detail-label">Booking ID:</span>
                <span>${bookingId}</span>
            </div>
            <div class="booking-detail">
                <span class="detail-label">Booking Type:</span>
                <span>${details.type}</span>
            </div>
        `;
        
        // Add specific details based on booking type
        let specificDetailsHTML = '';
        
        if (bookingType === 'train') {
            specificDetailsHTML = `
                <div class="booking-detail">
                    <span class="detail-label">Train:</span>
                    <span>${details.name}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">From:</span>
                    <span>${details.from}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">To:</span>
                    <span>${details.to}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Date:</span>
                    <span>${details.date}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Class:</span>
                    <span>${details.class}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Passengers:</span>
                    <span>${details.passengers}</span>
                </div>
            `;
        } else if (bookingType === 'cab') {
            specificDetailsHTML = `
                <div class="booking-detail">
                    <span class="detail-label">Cab Type:</span>
                    <span>${details.cabType}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Ride Type:</span>
                    <span>${details.rideType}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Pickup:</span>
                    <span>${details.pickup}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Destination:</span>
                    <span>${details.destination}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Date:</span>
                    <span>${details.date}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Time:</span>
                    <span>${details.time}</span>
                </div>
            `;
        }
        
        // Add price detail
        const priceDetailHTML = `
            <div class="booking-detail">
                <span class="detail-label">Total Price:</span>
                <span>₹${details.price}</span>
            </div>
        `;
        
        // Set booking details
        bookingDetails.innerHTML = detailsHTML + specificDetailsHTML + priceDetailHTML;
        
        // Show modal
        bookingModal.style.display = 'flex';
    }

    // Modal functionality
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const closeBookingModal = document.getElementById('close-booking-modal');
    
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
    
    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'flex';
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            document.getElementById('booking-modal').style.display = 'none';
        });
    });
    
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    closeBookingModal.addEventListener('click', () => {
        document.getElementById('booking-modal').style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (e.target === document.getElementById('booking-modal')) {
            document.getElementById('booking-modal').style.display = 'none';
        }
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide loading overlay
            document.getElementById('loading-overlay').style.display = 'none';
            
            // Hide modal
            loginModal.style.display = 'none';
            
            // Show success message
            alert('Login successful!');
        }, 1000);
    });

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide loading overlay
            document.getElementById('loading-overlay').style.display = 'none';
            
            // Hide modal
            signupModal.style.display = 'none';
            
            // Show success message
            alert('Account created successfully!');
        }, 1000);
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide loading overlay
            document.getElementById('loading-overlay').style.display = 'none';
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Your message has been sent successfully. We will get back to you soon!');
        }, 1000);
    });

    // Offers slider functionality
    const offersDots = document.querySelectorAll('.offers-dots .dot');
    const offersSlider = document.querySelector('.offers-slider');
    
    offersDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            offersDots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Calculate scroll position
            const cardWidth = document.querySelector('.offer-card').offsetWidth + 20; // card width + gap
            const scrollPosition = index * cardWidth;
            
            // Scroll to position
            offersSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });

    // Testimonials slider functionality
    const testimonialsDots = document.querySelectorAll('.testimonials-dots .dot');
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    testimonialsDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            testimonialsDots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Calculate scroll position
            const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 20; // card width + gap
            const scrollPosition = index * cardWidth;
            
            // Scroll to position
            testimonialsSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });

    // Popular card booking buttons
    document.querySelectorAll('.popular-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const route = this.closest('.popular-card').querySelector('.popular-title').textContent;
            const [from, to] = route.split(' to ');
            
            // Set values in train booking form
            document.getElementById('train-from').value = from;
            document.getElementById('train-to').value = to;
            
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
            
            // Ensure train tab is active
            document.querySelector('.tab-btn[data-tab="train-tab"]').click();
        });
    });

    // Cab service booking buttons
    document.querySelectorAll('.service-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
            
            // Ensure cab tab is active
            document.querySelector('.tab-btn[data-tab="cab-tab"]').click();
            
            // Set ride type based on service
            if (serviceTitle === 'City Rides') {
                document.querySelector('.ride-type input[value="city"]').closest('.ride-type').click();
            } else if (serviceTitle === 'Outstation') {
                document.querySelector('.ride-type input[value="outstation"]').closest('.ride-type').click();
            } else if (serviceTitle === 'Hourly Rentals') {
                document.querySelector('.ride-type input[value="rental"]').closest('.ride-type').click();
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Remove active class from all links
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Hide mobile menu if open
                    mainNav.classList.remove('show');
                }
            }
        });
    });

    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });

    // Initialize the page
    document.querySelector('.nav-link[href="#"]').classList.add('active');
});