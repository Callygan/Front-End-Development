class Validator {
    constructor(inputElement, type) {
        this.inputElement = inputElement; // HTML element to validate
        this.type = type; // Type of field (e.g., 'firstName', 'email')
        this.errorElement = document.createElement('span'); // Create an element to display errors
        this.errorElement.className = 'error-message'; // Add a class for styling
        this.inputElement.parentNode.appendChild(this.errorElement); // Add error element to DOM
    }

    validate() {
        const value = this.inputElement.value; // Get the trimmed value of the input
        let isValid = true;

        if (this.type === 'firstName') {
            if (value.length < 3 || /\s/.test(value)) {
                this.showError('First name must be at least 3 characters long and contain no spaces.');
                isValid = false;
            } else {
                this.hideError();
            }
        }

        if (this.type === 'lastName') {
            if (value.length < 3 || /\s/.test(value)) {
                this.showError('Last name must be at least 3 characters long and contain no spaces.');
                isValid = false;
            } else {
                this.hideError();
            }
        }

        if (this.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                this.showError('The email address is invalid. Please use the format: example@domain.com');
                isValid = false;
            } else {
                this.hideError();
            }
        }

        if (this.type === 'password') {
            if (value.length < 6 || /\s/.test(value)) {
                this.showError('Password must be at least 6 characters long and contain no spaces.');
                isValid = false;
            } else {
                this.hideError();
            }
        }

        if (this.type === 'cpassword') {
            if (value !== document.getElementById('password').value) {
                this.showError('Passwords do not match.');
                isValid = false;
            } else {
                this.hideError();
            }
        }

        return isValid;
    }

    showError(message) {
        this.errorElement.textContent = message; // Set the error message
        this.inputElement.classList.add('error'); // Add error class to input
    }

    hideError() {
        this.errorElement.textContent = ''; // Clear the error message
        this.inputElement.classList.remove('error'); // Remove error class
    }
}

// Array to store all validators
const validators = [];

// Function to add validation to an input field
function addValidation(inputId, type) {
    const inputElement = document.getElementById(inputId);
    if(inputElement) {
        const validator = new Validator(inputElement, type);
        validators.push(validator); // Add validator to the array
        inputElement.addEventListener('input', () => {
            validator.validate();
        });
    }
}

addValidation('fname', 'firstName');
addValidation('lname', 'lastName');
addValidation('email', 'email');
addValidation('password', 'password');
addValidation('confirm-password', 'cpassword');

// Form submission handler  
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let allValid = true;
        validators.forEach(validator => {
            if (!validator.validate()) {
                allValid = false;
            }
        });
        if (!allValid) {
            event.preventDefault(); // Prevent form submission if invalid
            alert('Please correct the errors in the form before submitting.');
        } else {
            window.location.reload(); // Reload the page on successful submission
            alert('Form submitted successfully!');
        }
    });
});