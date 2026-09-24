
// Mock Authentication Flow using localStorage

function handleSignup(event) {
    event.preventDefault();
    
    // Get form elements
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Ensure elements exist
    if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput) {
        console.error('Signup form fields not found.');
        return;
    }
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (firstName && lastName && email && password) {
        // Save to localStorage
        localStorage.setItem('user_first_name', firstName);
        localStorage.setItem('user_last_name', lastName);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_password', password);
        
        // Redirect to login page
        window.location.href = 'login.html';
    } else {
        alert('Please fill out all fields.');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    // Get form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (!emailInput || !passwordInput) {
        console.error('Login form fields not found.');
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Get stored credentials
    const storedEmail = localStorage.getItem('user_email');
    const storedPassword = localStorage.getItem('user_password');
    
    if (email === storedEmail && password === storedPassword) {
        // Redirect to dashboard
        window.location.href = 'client-dashboard.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

function initDashboard() {
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (welcomeMessage) {
        const firstName = localStorage.getItem('user_first_name') || 'Guest';
        const lastName = localStorage.getItem('user_last_name') || '';
        
        // Ensure proper spacing and capitalization
        let fullName = (firstName + ' ' + lastName).trim();
        if (fullName === '') {
            fullName = 'Guest';
        }
        
        welcomeMessage.textContent = 'Welcome back ' + fullName;
    }
}
