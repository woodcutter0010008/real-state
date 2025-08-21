// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let propertiesData = [];
let filteredProperties = [];
let currentFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeThemeToggle();
    initializeStickyContact();
    initializeAnimations();
    initializeProperties();
    initializeTestimonials();
    initializeForms();
    initializeMap();
    initializeCalculator();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial content
    loadPropertiesData();
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== STICKY CONTACT BUTTON =====
function initializeStickyContact() {
    const stickyContact = document.getElementById('sticky-contact');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            stickyContact.classList.add('show');
        } else {
            stickyContact.classList.remove('show');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.service-card, .property-card, .team-member, .blog-card, .achievement, .office');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== PROPERTIES SECTION =====
function initializeProperties() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter properties
            currentFilter = this.getAttribute('data-filter');
            filterProperties();
        });
    });
}

function loadPropertiesData() {
    // Sample properties data
    propertiesData = [
        {
            id: 1,
            title: "Luxury Beverly Hills Estate",
            location: "Beverly Hills, CA",
            price: "$12,500,000",
            status: "For Sale",
            category: "sale",
            bedrooms: 6,
            bathrooms: 8,
            sqft: 8500,
            image: "property-1.jpg",
            featured: true
        },
        {
            id: 2,
            title: "Manhattan Penthouse",
            location: "New York, NY",
            price: "$8,900,000",
            status: "For Sale",
            category: "sale",
            bedrooms: 4,
            bathrooms: 5,
            sqft: 4200,
            image: "property-2.jpg",
            featured: true
        },
        {
            id: 3,
            title: "Miami Beach Condo",
            location: "Miami Beach, FL",
            price: "$15,000/month",
            status: "For Rent",
            category: "rent",
            bedrooms: 3,
            bathrooms: 3,
            sqft: 2800,
            image: "property-3.jpg",
            featured: true
        },
        {
            id: 4,
            title: "Malibu Ocean View Villa",
            location: "Malibu, CA",
            price: "$18,750,000",
            status: "New Construction",
            category: "new",
            bedrooms: 5,
            bathrooms: 7,
            sqft: 6800,
            image: "property-4.jpg",
            featured: true
        },
        {
            id: 5,
            title: "Downtown Luxury Loft",
            location: "Los Angeles, CA",
            price: "$3,500,000",
            status: "For Sale",
            category: "sale",
            bedrooms: 2,
            bathrooms: 3,
            sqft: 2200,
            image: "property-5.jpg",
            featured: false
        },
        {
            id: 6,
            title: "Hamptons Estate",
            location: "The Hamptons, NY",
            price: "$25,000/month",
            status: "For Rent",
            category: "rent",
            bedrooms: 7,
            bathrooms: 9,
            sqft: 12000,
            image: "property-6.jpg",
            featured: false
        }
    ];
    
    filteredProperties = propertiesData.filter(p => p.featured);
    renderProperties();
}

function filterProperties() {
    if (currentFilter === 'all') {
        filteredProperties = propertiesData;
    } else {
        filteredProperties = propertiesData.filter(property => property.category === currentFilter);
    }
    renderProperties();
}

function renderProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    
    if (!propertiesGrid) return;
    
    propertiesGrid.innerHTML = '';
    
    filteredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });
    
    // Re-observe new elements for animations
    const newCards = propertiesGrid.querySelectorAll('.property-card');
    newCards.forEach(card => {
        card.classList.add('fade-in');
        // Trigger animation after a short delay
        setTimeout(() => card.classList.add('visible'), 100);
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/400x250/1a237e/ffffff?text=Luxury+Property'">
            <div class="property-status">${property.status}</div>
            <div class="property-price">${property.price}</div>
        </div>
        <div class="property-content">
            <h3 class="property-title">${property.title}</h3>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${property.location}</span>
            </div>
            <div class="property-features">
                <div class="feature">
                    <i class="fas fa-bed"></i>
                    <span>${property.bedrooms} Beds</span>
                </div>
                <div class="feature">
                    <i class="fas fa-bath"></i>
                    <span>${property.bathrooms} Baths</span>
                </div>
                <div class="feature">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${property.sqft.toLocaleString()} sqft</span>
                </div>
            </div>
            <div class="property-actions">
                <a href="#" class="property-link" onclick="viewPropertyDetails(${property.id})">
                    View Details <i class="fas fa-arrow-right"></i>
                </a>
                <button class="btn-primary" onclick="openContactModal()">
                    <i class="fas fa-phone"></i>
                    Contact
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function loadMoreProperties() {
    // Simulate loading more properties
    const additionalProperties = propertiesData.filter(p => !p.featured);
    filteredProperties = [...filteredProperties, ...additionalProperties];
    renderProperties();
    
    // Hide load more button
    const loadMoreBtn = document.querySelector('.load-more-container');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function viewPropertyDetails(propertyId) {
    // This would typically open a detailed property modal or navigate to a property page
    const property = propertiesData.find(p => p.id === propertyId);
    if (property) {
        alert(`Viewing details for: ${property.title}\nThis would open a detailed property view.`);
    }
}

// ===== SEARCH FUNCTIONALITY =====
function searchProperties() {
    const location = document.getElementById('location').value;
    const propertyType = document.getElementById('property-type').value;
    const priceRange = document.getElementById('price-range').value;
    
    // This would typically make an API call to search properties
    console.log('Searching properties:', { location, propertyType, priceRange });
    
    // For demo purposes, show an alert
    alert(`Searching for ${propertyType || 'any'} properties in ${location || 'all locations'} with price range ${priceRange || 'any'}`);
    
    // Scroll to properties section
    scrollToSection('properties');
}

// ===== TESTIMONIALS =====
function initializeTestimonials() {
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
}

function nextTestimonial() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');
    
    currentTestimonial = (currentTestimonial + 1) % slides.length;
    
    slides[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

function prevTestimonial() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');
    
    currentTestimonial = currentTestimonial === 0 ? slides.length - 1 : currentTestimonial - 1;
    
    slides[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

function currentTestimonialSlide(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');
    
    currentTestimonial = index - 1;
    
    slides[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

// ===== FORMS =====
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simulate form submission
    showLoadingState(e.target);
    
    setTimeout(() => {
        hideLoadingState(e.target);
        showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
        e.target.reset();
        closeContactModal();
    }, 2000);
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push('First name must be at least 2 characters long');
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push('Last name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('. '));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }
    
    // Simulate subscription
    showLoadingState(e.target);
    
    setTimeout(() => {
        hideLoadingState(e.target);
        showSuccessMessage('Successfully subscribed to our newsletter!');
        e.target.reset();
    }, 1500);
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        if (form.id === 'contact-form') {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        } else if (form.id === 'newsletter-form') {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
        }
    }
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            .notification.success {
                border-left: 4px solid #4caf50;
            }
            .notification.error {
                border-left: 4px solid #f44336;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .notification.success .notification-content i {
                color: #4caf50;
            }
            .notification.error .notification-content i {
                color: #f44336;
            }
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
            }
            .notification-close:hover {
                background: #f5f5f5;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ===== MODAL FUNCTIONS =====
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('contact-modal');
    if (modal && e.target === modal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// ===== MORTGAGE CALCULATOR =====
function initializeCalculator() {
    const inputs = document.querySelectorAll('#home-price, #down-payment, #interest-rate, #loan-term');
    
    inputs.forEach(input => {
        input.addEventListener('input', calculateMortgage);
    });
    
    // Calculate initial values
    calculateMortgage();
}

function calculateMortgage() {
    const homePrice = parseFloat(document.getElementById('home-price').value) || 0;
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const loanTerm = parseInt(document.getElementById('loan-term').value) || 30;
    
    if (homePrice <= 0) {
        clearCalculatorResults();
        return;
    }
    
    const loanAmount = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
        monthlyPayment = loanAmount / numberOfPayments;
    }
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    updateCalculatorResults(monthlyPayment, totalInterest, totalPayment);
}

function updateCalculatorResults(monthlyPayment, totalInterest, totalPayment) {
    document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('total-payment').textContent = formatCurrency(totalPayment);
}

function clearCalculatorResults() {
    document.getElementById('monthly-payment').textContent = '$0';
    document.getElementById('total-interest').textContent = '$0';
    document.getElementById('total-payment').textContent = '$0';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ===== GOOGLE MAPS =====
function initializeMap() {
    // This function will be called by the Google Maps API
    // For now, we'll create a placeholder
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #666;">
                <div style="text-align: center;">
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem; color: #1a237e;"></i>
                    <p>Interactive Map Loading...</p>
                    <p style="font-size: 0.875rem;">Replace YOUR_API_KEY in the Google Maps script with a valid API key</p>
                </div>
            </div>
        `;
    }
}

function initMap() {
    // This function will be called by Google Maps API
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const map = new google.maps.Map(mapElement, {
        zoom: 10,
        center: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'all',
                stylers: [{ color: '#1a237e' }]
            }
        ]
    });
    
    // Add markers for office locations
    const offices = [
        { lat: 34.0736, lng: -118.4004, title: 'Beverly Hills Office' },
        { lat: 40.7589, lng: -73.9851, title: 'Manhattan Office' },
        { lat: 25.7907, lng: -80.1300, title: 'Miami Office' }
    ];
    
    offices.forEach(office => {
        new google.maps.Marker({
            position: { lat: office.lat, lng: office.lng },
            map: map,
            title: office.title,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#1a237e"/>
                        <path d="M20 10C16.6863 10 14 12.6863 14 16C14 21 20 30 20 30S26 21 26 16C26 12.6863 23.3137 10 20 10ZM20 19C18.3431 19 17 17.6569 17 16C17 14.3431 18.3431 13 20 13C21.6569 13 23 14.3431 23 16C23 17.6569 21.6569 19 20 19Z" fill="white"/>
                    </svg>
                `)
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function setupEventListeners() {
    // Add any additional event listeners here
    
    // Smooth scroll for all internal links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            scrollToSection(targetId);
        }
    });
    
    // Add loading states to buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-primary, .btn-secondary')) {
            const btn = e.target;
            const originalText = btn.innerHTML;
            
            // Add loading state for demo purposes
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        }
    });
}

// ===== ABOUT VIDEO FUNCTIONALITY =====
function playAboutVideo() {
    // This would typically open a video modal or player
    alert('This would open a company introduction video. You can integrate with YouTube, Vimeo, or host your own video.');
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== ANALYTICS INTEGRATION =====
function trackEvent(eventName, properties = {}) {
    // This is where you would integrate with analytics services like Google Analytics, Mixpanel, etc.
    console.log('Track Event:', eventName, properties);
}

// Track form submissions
document.addEventListener('submit', function(e) {
    const formId = e.target.id;
    if (formId) {
        trackEvent('Form Submission', { formId });
    }
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn-primary, .btn-secondary')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button Click', { buttonText });
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape
    if (e.key === 'Escape') {
        closeContactModal();
    }
    
    // Navigate testimonials with arrow keys
    if (document.querySelector('.testimonials-slider:focus-within')) {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    }
});

// Add focus management for modals
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// ===== LOADING PERFORMANCE =====
// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'hero-video.mp4',
        'property-1.jpg',
        'property-2.jpg',
        'about-image.jpg'
    ];
    
    criticalImages.forEach(src => {
        if (src.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = src;
            video.preload = 'metadata';
        } else {
            const img = new Image();
            img.src = src;
        }
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadCriticalImages);

console.log('LuxeEstates website initialized successfully!');