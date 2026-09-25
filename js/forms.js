// forms.js

document.addEventListener('DOMContentLoaded', () => {
    const setupForm = (formId, successMessageId, onSuccessCallback) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                
                // Animate to loading state
                btn.innerHTML = '<svg class="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
                btn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    
                    if (onSuccessCallback) {
                        onSuccessCallback(form);
                    } else {
                        form.reset();
                    }
                    
                    const successMsg = document.getElementById(successMessageId);
                    if (successMsg) {
                        successMsg.classList.remove('hidden');
                        gsap.fromTo(successMsg, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
                        
                        setTimeout(() => {
                            gsap.to(successMsg, { opacity: 0, duration: 0.3, onComplete: () => successMsg.classList.add('hidden') });
                        }, 3000);
                    }
                }, 1500);
            });
        }
    };

    // Redirect to 404 page after contact form submission
    setupForm('contact-form', 'contact-success', (form) => {
        form.reset();
        setTimeout(() => {
            window.location.href = '404.html';
        }, 1500);
    });
    
    // Login form specific logic
    setupForm('login-form', 'login-success', (form) => {
        const roleSelect = form.querySelector('select');
        const emailInput = form.querySelector('input[type="email"]');
        
        if (roleSelect && emailInput) {
            const role = roleSelect.value;
            const email = emailInput.value.trim();
            
            // Default names based on role (Direct Login)
            let firstName = role === 'admin' ? 'Admin' : 'Client';
            let lastName = '';
            
            // Check if user previously signed up with this email
            const users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
            if (users[email]) {
                firstName = users[email].firstName;
                lastName = users[email].lastName;
            }
            
            // Store user info
            localStorage.setItem('currentUser', JSON.stringify({ role, email, firstName, lastName }));
            
            // Redirect based on role
            if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'client-dashboard.html';
            }
        }
    });
    
    // Signup form specific logic
    setupForm('signup-form', 'signup-success', (form) => {
        const textInputs = form.querySelectorAll('input[type="text"]');
        const firstName = textInputs[0] ? textInputs[0].value.trim() : '';
        const lastName = textInputs[1] ? textInputs[1].value.trim() : '';
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : '';
        
        if (email) {
            // Store user details in localStorage
            const users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
            users[email] = { firstName, lastName };
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
        
        form.reset();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
    
    // Redirect to 404 page after newsletter subscription
    setupForm('newsletter-form', 'newsletter-success', (form) => {
        form.reset();
        setTimeout(() => {
            window.location.href = '404.html';
        }, 1500); // Wait 1.5s so user can see the success message
    });
});
